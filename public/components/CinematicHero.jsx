const {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} = React;

const SCENES = [
  {
    src: '/videos/war-begins.mp4',
    title: 'FROM HELL.',
    subtitle: 'Three factions. One objective. Twenty minutes to decide the war.',
  },
  {
    src: '/videos/swarm-arrives.mp4',
    title: 'THE SWARM ARRIVES.',
    subtitle: 'Overwhelming numbers. Fragile as glass. Fast as fire.',
  },
  {
    src: '/videos/final-convergence.mp4',
    title: 'BACK IN 20.',
    subtitle: 'No turtling. No late games. One commander walks off the rock.',
  },
];

const ROTATE_MS = 6000;
const FADE_MS = 1000;

/** Autoplay-safe priming for iOS/Safari/Chrome muted inline policy */
function primeVideoEl(video) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.playsInline = true;
  video.preload = 'auto';
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
}

/**
 * Wait for decoded frames without calling video.load() (React src already triggers load).
 * Extra load() was aborting in-flight buffers and stalled canplay on some browsers.
 */
function waitUntilPlayable(video) {
  return new Promise((resolve) => {
    if (!video || video.readyState >= 3) {
      resolve();
      return;
    }
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(tid);
      video.removeEventListener('loadeddata', done);
      video.removeEventListener('canplay', done);
      video.removeEventListener('error', onErr);
      resolve();
    };
    const onErr = () => done();
    video.addEventListener('loadeddata', done);
    video.addEventListener('canplay', done);
    video.addEventListener('error', onErr, { once: true });
    const tid = window.setTimeout(done, 15000);
  });
}

function CinematicHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const [visibleLayer, setVisibleLayer] = useState(0);
  const [layerSources, setLayerSources] = useState([SCENES[0].src, SCENES[1].src]);

  const videoRefs = useRef([null, null]);
  const fadeTimeoutRef = useRef(null);
  const rotationIntervalRef = useRef(null);

  const activeIndexRef = useRef(activeIndex);
  const visibleLayerRef = useRef(visibleLayer);
  const isFadingRef = useRef(isFading);

  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);
  useEffect(() => { visibleLayerRef.current = visibleLayer; }, [visibleLayer]);
  useEffect(() => { isFadingRef.current = isFading; }, [isFading]);

  const scene = useMemo(() => SCENES[activeIndex], [activeIndex]);
  const sceneNum = (isFading ? nextIndex : activeIndex) + 1;

  const ensureVideoReady = useCallback(async (video) => {
    if (!video) return;
    primeVideoEl(video);
    try {
      video.currentTime = 0;
    } catch (_) {
      /* seeking before metadata can throw; ignore */
    }
    await waitUntilPlayable(video);
    primeVideoEl(video);
    await video.play().catch(() => undefined);
  }, []);

  /* After React commits new src, sync playback (before paint = fewer black frames). */
  useLayoutEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      primeVideoEl(video);
      video.play().catch(() => undefined);
    });
  }, [layerSources]);

  useEffect(() => {
    rotationIntervalRef.current = window.setInterval(() => {
      if (isFadingRef.current) return;

      const currentActive = activeIndexRef.current;
      const currentVisible = visibleLayerRef.current;
      const upcoming = (currentActive + 1) % SCENES.length;
      const hiddenLayer = currentVisible === 0 ? 1 : 0;

      setNextIndex(upcoming);
      setLayerSources((prev) => {
        const copy = [...prev];
        copy[hiddenLayer] = SCENES[upcoming].src;
        return copy;
      });

      /* Double rAF: run after React commits src + layout to hidden layer. */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          void (async () => {
            await ensureVideoReady(videoRefs.current[hiddenLayer]);
            setIsFading(true);
            isFadingRef.current = true;

            if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);

            fadeTimeoutRef.current = window.setTimeout(() => {
              setActiveIndex(upcoming);
              setVisibleLayer(hiddenLayer);
              activeIndexRef.current = upcoming;
              visibleLayerRef.current = hiddenLayer;
              setIsFading(false);
              isFadingRef.current = false;
            }, FADE_MS);
          })();
        });
      });
    }, ROTATE_MS);

    return () => {
      if (rotationIntervalRef.current) window.clearInterval(rotationIntervalRef.current);
      if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
    };
  }, [ensureVideoReady]);

  const layerVisibilityClass = (layer) => {
    if (!isFading) return layer === visibleLayer ? 'is-visible' : 'is-hidden';
    const hiddenLayer = visibleLayer === 0 ? 1 : 0;
    return layer === hiddenLayer ? 'is-visible' : 'is-hidden';
  };

  const layerScaleClass = (layer) => {
    if (!isFading && layer === visibleLayer) return 'is-zoom';
    if (isFading) {
      const hiddenLayer = visibleLayer === 0 ? 1 : 0;
      if (layer === hiddenLayer) return 'is-zoom';
    }
    return 'is-scale-1';
  };

  return (
    <section className="cinematic-hero" id="top">

      <div className="cinematic-hero-videos">
        <video
          ref={(el) => { videoRefs.current[0] = el; }}
          className={`cinematic-hero-video ${layerVisibilityClass(0)} ${layerScaleClass(0)}`}
          src={layerSources[0]}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <video
          ref={(el) => { videoRefs.current[1] = el; }}
          className={`cinematic-hero-video ${layerVisibilityClass(1)} ${layerScaleClass(1)}`}
          src={layerSources[1]}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>

      <div className="cinematic-scanlines cinematic-fx-fill" aria-hidden="true" />

      <div className="cinematic-grad-left cinematic-fx-fill" aria-hidden="true" />
      <div className="cinematic-grad-bottom cinematic-fx-fill" aria-hidden="true" />

      <div className="cinematic-corner tl" aria-hidden="true" />
      <div className="cinematic-corner tr" aria-hidden="true" />
      <div className="cinematic-corner bl" aria-hidden="true" />
      <div className="cinematic-corner br" aria-hidden="true" />

      <div className="cinematic-content">
        <div className="cinematic-content-inner">

          <div className="cinematic-hud-label">
            <span>◤ BROADCAST {sceneNum}/{SCENES.length} · LIVE</span>
            <div className="cinematic-progress-track">
              <div
                key={activeIndex}
                className="cinematic-progress-fill"
                style={{ animationDuration: `${ROTATE_MS}ms` }}
              />
            </div>
          </div>

          <h1 className="cinematic-title">{scene.title}</h1>

          <p className="cinematic-subtitle">{scene.subtitle}</p>

          <div className="hero-actions">
            <a href="#early-access" className="btn btn-primary">
              Request Early Access
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </a>
            <a href="#factions" className="btn btn-ghost">Meet the Factions</a>
          </div>

        </div>
      </div>

      <div className="hero-scroll">
        <span>SCROLL</span>
        <span className="hero-scroll-line" />
      </div>

    </section>
  );
}

window.CinematicHero = CinematicHero;
