# HEL-1 — RTS Camera QA checklist

**Linear:** [HEL-1](https://linear.app/vulnaguard/issue/HEL-1/phase-1-rts-camera-controller-pan-zoom-bounds)  
**Component:** `RTS_CameraController` (`Assets/_Project/Scripts/Camera/RTS_CameraController.cs`)

Use this after wiring the camera in a scene (see XML doc on the component for setup steps).

## Environment

- [ ] **Unity Editor — Play Mode** (desktop: left-drag pan, scroll zoom)
- [ ] **Mobile preview or device** (one-finger pan, two-finger pinch zoom), or Editor with touch injection if you use it

## Pan (smooth, in bounds)

- [ ] Drag/pan moves the view in the expected horizontal direction (finger/mouse “pushes” the map; no inverted feel unless you intend it).
- [ ] Motion feels **smooth**, without visible **jitter** when holding a steady drag.
- [ ] Releasing the drag stops adding movement; no runaway drift.
- [ ] When the camera reaches **map bounds**, it **does not** keep sliding past the playable area (clamps to `Map Bounds Min` / `Map Bounds Max` on X/Z).

## Zoom (clamped)

- [ ] **Mouse scroll** changes zoom in the expected direction (scroll “up” zooms in for the default wiring).
- [ ] **Pinch** (two fingers) zooms in/out responsively.
- [ ] Zoom **stops** at **min** and **max** (orthographic: min/max `orthographicSize`; perspective: min/max camera height per Inspector).

## Constants (Inspector documentation)

- [ ] **`Pan Speed`**, **`Zoom Speed`**, **`Min`/`Max`** zoom fields behave as expected when tweaked live in Play Mode.
- [ ] **Map bounds** correctly cage the camera over your terrain — adjust min/max until corners of the map are reachable but the void is not.

## Regression guard (HEL-1 scope)

- [ ] No dependency on selection, pathfinding, combat, UI panels, networking, or fog — camera-only.

## Sign-off

| Result | Tester | Date |
|--------|--------|------|
| Pass / Fail |        |      |

Notes (device, resolution, frame rate):
