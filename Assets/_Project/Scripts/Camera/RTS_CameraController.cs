using UnityEngine;

namespace HellAndBackRTS.CameraControl
{
    /// <summary>
    /// HEL-1: RTS camera foundation — pan, zoom, and axis-aligned map bounds.
    /// <para>
    /// <b>Beginner setup (Unity Editor)</b><br/>
    /// 1. Select your scene’s <see cref="Camera"/> (or create one: GameObject → Camera).<br/>
    /// 2. Add this component (Add Component → RTS Camera Controller).<br/>
    /// 3. Choose <see cref="_projectionMode"/>: <b>Orthographic</b> is typical for a readable RTS-board feel;
    ///    <b>Perspective</b> is fine if you already use an angled rig.<br/>
    /// 4. Set <see cref="_groundPlaneY"/> to the height of your “floor” (usually <b>0</b>).<br/>
    /// 5. Set <see cref="_mapBoundsMin"/> / <see cref="_mapBoundsMax"/> to wrap your playable map in X/Z
    ///    (Y is ignored; use any consistent Y for the vectors, e.g. 0).<br/>
    /// 6. Tune <see cref="_panSpeed"/>, <see cref="_zoomSpeed"/>, and min/max zoom in Play Mode until it feels right.
    /// </para>
    /// <para>
    /// <b>Controls</b> — Desktop test: <b>left-click drag</b> pans; <b>mouse scroll</b> zooms.<br/>
    /// Mobile test: <b>one finger drag</b> pans; <b>two-finger pinch</b> zooms.
    /// </para>
    /// </summary>
    [DisallowMultipleComponent]
    [RequireComponent(typeof(Camera))]
    public sealed class RTS_CameraController : MonoBehaviour
    {
        public enum ProjectionMode
        {
            AutoDetect,
            OrthographicZoom,
            PerspectiveHeightZoom
        }

        [Header("Map & ground")]
        [Tooltip("World Y of the ground plane used to turn screen drags into stable horizontal pans.")]
        [SerializeField] private float _groundPlaneY;

        [Tooltip("South-west corner of the playable map (uses X and Z).")]
        [SerializeField] private Vector3 _mapBoundsMin = new Vector3(-200f, 0f, -200f);

        [Tooltip("North-east corner of the playable map (uses X and Z).")]
        [SerializeField] private Vector3 _mapBoundsMax = new Vector3(200f, 0f, 200f);

        [Header("Sensitivity")]
        [SerializeField] private float _panSpeed = 1f;

        [SerializeField] private float _zoomSpeed = 4f;

        [Header("Zoom limits")]
        [Tooltip("Orthographic: smallest orthographicSize (= most zoomed IN). Unity uses size, not FOV.")]
        [SerializeField] private float _minOrthographicSize = 8f;

        [Tooltip("Orthographic: largest orthographicSize (= most zoomed OUT).")]
        [SerializeField] private float _maxOrthographicSize = 40f;

        [Tooltip("Perspective: closest camera height Y (= most zoomed IN) when using height-based zoom.")]
        [SerializeField] private float _minCameraHeight = 10f;

        [Tooltip("Perspective: farthest camera height Y (= most zoomed OUT) when using height-based zoom.")]
        [SerializeField] private float _maxCameraHeight = 45f;

        [Header("Projection")]
        [SerializeField] private ProjectionMode _projectionMode = ProjectionMode.AutoDetect;

        [Header("Smoothing (reduces jitter)")]
        [Tooltip("Seconds for SmoothDamp to follow pan targets. Lower = snappier, higher = smoother.")]
        [SerializeField] private float _positionSmoothTime = 0.12f;

        [Tooltip("Seconds for SmoothDamp zoom. Should match feel of pan.")]
        [SerializeField] private float _zoomSmoothTime = 0.12f;

        [Tooltip("Max units/frame the pan can chase (0 = unlimited). Helps cap spikes.")]
        [SerializeField] private float _maxPanSpeed = 5000f;

        [SerializeField] private float _pinchZoomSensitivity = 0.01f;

        private Camera _camera;
        private Vector3 _panVelocity;
        private float _orthographicSizeVelocity;

        private Vector3 _targetPosition;
        private float _targetOrthoSize;
        private float _targetHeight;

        private bool _usesOrthographicZoom;

        // Desktop drag state (world on ground plane)
        private bool _mousePanning;
        private Vector3 _lastMouseGroundPoint;

        // Touch drag / pinch state
        private bool _touchPanning;
        private Vector3 _lastTouchGroundPoint;
        private float _lastPinchDistance;

        private Plane _groundPlane;

        private void Awake()
        {
            _camera = GetComponent<Camera>();
            RebuildGroundPlane();

            _targetPosition = transform.position;
            ResolveProjectionMode();

            if (_usesOrthographicZoom)
            {
                _targetOrthoSize = Mathf.Clamp(_camera.orthographicSize, _minOrthographicSize, _maxOrthographicSize);
            }
            else
            {
                _targetHeight = Mathf.Clamp(transform.position.y, _minCameraHeight, _maxCameraHeight);
            }
        }

        private void RebuildGroundPlane()
        {
            _groundPlane = new Plane(Vector3.up, new Vector3(0f, _groundPlaneY, 0f));
        }

        private void OnValidate()
        {
            // Keep serialized ranges sane while editing in the Inspector.
            _maxOrthographicSize = Mathf.Max(_maxOrthographicSize, _minOrthographicSize);
            _maxCameraHeight = Mathf.Max(_maxCameraHeight, _minCameraHeight);
            if (_positionSmoothTime < 0.01f) _positionSmoothTime = 0.01f;
            if (_zoomSmoothTime < 0.01f) _zoomSmoothTime = 0.01f;
            RebuildGroundPlane();
        }

        private void LateUpdate()
        {
            ResolveProjectionMode();

            if (TryPinchZoom())
            {
                _touchPanning = false;
                _mousePanning = false;
            }
            else if (TryMousePan())
            {
                // handled
            }
            else if (TryTouchPan())
            {
                // handled
            }
            else
            {
                EndMousePanIfNeeded();
                EndTouchPanIfNeeded();
            }

            ApplyScrollZoom();
            ClampTargetPositionToBounds();
            ClampTargetZoom();
            SmoothFollow();
        }

        private void ResolveProjectionMode()
        {
            switch (_projectionMode)
            {
                case ProjectionMode.OrthographicZoom:
                    _usesOrthographicZoom = true;
                    break;
                case ProjectionMode.PerspectiveHeightZoom:
                    _usesOrthographicZoom = false;
                    break;
                default:
                    _usesOrthographicZoom = _camera.orthographic;
                    break;
            }
        }

        private bool TryMousePan()
        {
            if (Input.touchCount > 0)
            {
                return false;
            }

            var mouse = Input.mousePosition;

            if (Input.GetMouseButtonDown(0))
            {
                if (TryProjectGround(mouse, out var ground))
                {
                    _mousePanning = true;
                    _lastMouseGroundPoint = ground;
                }
            }

            if (!Input.GetMouseButton(0))
            {
                if (!_mousePanning)
                {
                    return false;
                }

                _mousePanning = false;
                return false;
            }

            if (!_mousePanning)
            {
                return false;
            }

            if (!TryProjectGround(mouse, out var currentGround))
            {
                return false;
            }

            var worldDelta = (_lastMouseGroundPoint - currentGround) * _panSpeed;
            _targetPosition += new Vector3(worldDelta.x, 0f, worldDelta.z);
            _lastMouseGroundPoint = currentGround;
            return true;
        }

        private void EndMousePanIfNeeded()
        {
            if (!Input.GetMouseButton(0))
            {
                _mousePanning = false;
            }
        }

        private bool TryTouchPan()
        {
            if (Input.touchCount != 1)
            {
                _touchPanning = false;
                return false;
            }

            var touch = Input.GetTouch(0);

            if (touch.phase == TouchPhase.Began)
            {
                if (TryProjectGround(touch.position, out var ground))
                {
                    _touchPanning = true;
                    _lastTouchGroundPoint = ground;
                }
            }
            else if (touch.phase == TouchPhase.Moved && _touchPanning)
            {
                if (TryProjectGround(touch.position, out var currentGround))
                {
                    var worldDelta = (_lastTouchGroundPoint - currentGround) * _panSpeed;
                    _targetPosition += new Vector3(worldDelta.x, 0f, worldDelta.z);
                    _lastTouchGroundPoint = currentGround;
                    return true;
                }
            }
            else if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
            {
                _touchPanning = false;
            }

            return _touchPanning && touch.phase == TouchPhase.Moved;
        }

        private void EndTouchPanIfNeeded()
        {
            if (Input.touchCount == 0)
            {
                _touchPanning = false;
            }
        }

        private bool TryPinchZoom()
        {
            if (Input.touchCount < 2)
            {
                _lastPinchDistance = 0f;
                return false;
            }

            var t0 = Input.GetTouch(0);
            var t1 = Input.GetTouch(1);
            var currentDistance = Vector2.Distance(t0.position, t1.position);

            if (t0.phase == TouchPhase.Began || t1.phase == TouchPhase.Began ||
                _lastPinchDistance <= Mathf.Epsilon)
            {
                _lastPinchDistance = currentDistance;
                return true;
            }

            var delta = currentDistance - _lastPinchDistance;
            _lastPinchDistance = currentDistance;

            ApplyZoomDelta(delta * _pinchZoomSensitivity * _zoomSpeed);
            return true;
        }

        private void ApplyScrollZoom()
        {
            var scroll = Input.GetAxisRaw("Mouse ScrollWheel");
            if (Mathf.Abs(scroll) <= Mathf.Epsilon)
            {
                return;
            }

            // Scroll "up" (positive) zooms in for typical RTS feel.
            ApplyZoomDelta(-scroll * _zoomSpeed * 8f);
        }

        private void ApplyZoomDelta(float delta)
        {
            if (_usesOrthographicZoom)
            {
                // Positive delta => increase orthographicSize => zoom OUT.
                _targetOrthoSize += delta;
            }
            else
            {
                // Positive delta => raise height => zoom OUT for top-down style rigs.
                _targetHeight += delta;
            }
        }

        private void ClampTargetZoom()
        {
            if (_usesOrthographicZoom)
            {
                _targetOrthoSize = Mathf.Clamp(_targetOrthoSize, _minOrthographicSize, _maxOrthographicSize);
            }
            else
            {
                _targetHeight = Mathf.Clamp(_targetHeight, _minCameraHeight, _maxCameraHeight);
            }
        }

        private void ClampTargetPositionToBounds()
        {
            var minX = Mathf.Min(_mapBoundsMin.x, _mapBoundsMax.x);
            var maxX = Mathf.Max(_mapBoundsMin.x, _mapBoundsMax.x);
            var minZ = Mathf.Min(_mapBoundsMin.z, _mapBoundsMax.z);
            var maxZ = Mathf.Max(_mapBoundsMin.z, _mapBoundsMax.z);

            _targetPosition.x = Mathf.Clamp(_targetPosition.x, minX, maxX);
            _targetPosition.z = Mathf.Clamp(_targetPosition.z, minZ, maxZ);
        }

        private void SmoothFollow()
        {
            if (_usesOrthographicZoom)
            {
                _camera.orthographic = true;
                _camera.orthographicSize = Mathf.SmoothDamp(
                    _camera.orthographicSize,
                    _targetOrthoSize,
                    ref _orthographicSizeVelocity,
                    _zoomSmoothTime,
                    Mathf.Infinity,
                    Time.unscaledDeltaTime);

                var desiredPosition = new Vector3(_targetPosition.x, transform.position.y, _targetPosition.z);
                transform.position = Vector3.SmoothDamp(
                    transform.position,
                    desiredPosition,
                    ref _panVelocity,
                    _positionSmoothTime,
                    _maxPanSpeed,
                    Time.unscaledDeltaTime);
            }
            else
            {
                _camera.orthographic = false;
                var desiredPosition = new Vector3(_targetPosition.x, _targetHeight, _targetPosition.z);
                transform.position = Vector3.SmoothDamp(
                    transform.position,
                    desiredPosition,
                    ref _panVelocity,
                    _positionSmoothTime,
                    _maxPanSpeed,
                    Time.unscaledDeltaTime);
            }
        }

        private bool TryProjectGround(Vector2 screenPosition, out Vector3 groundPoint)
        {
            var ray = _camera.ScreenPointToRay(screenPosition);
            if (!_groundPlane.Raycast(ray, out var distance))
            {
                groundPoint = default;
                return false;
            }

            groundPoint = ray.GetPoint(distance);
            return true;
        }
    }
}
