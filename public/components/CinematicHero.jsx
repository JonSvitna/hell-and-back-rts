const { useCallback, useEffect, useMemo, useRef, useState } = React;

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

/**
 * Mirrors logic in `components/CinematicHero.tsx` (TypeScript source of truth).
 * Two stacked videos, always mounted; crossfade via opacity only.
 */
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
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.currentTime = 0;

    if (video.readyState >= 3) {
      await video.play().catch(() => undefined);
      return;
    }

    await new Promise((resolve) => {
      const onCanPlay = () => {
        video.removeEventListener('canplay', onCanPlay);
        resolve();
      };
      video.addEventListener('canplay', onCanPlay, { once: true });
      video.load();
    });

    await video.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    const preloaders = SCENES.map((item) => {
      const v = document.createElement('video');
      v.src = item.src;
      v.preload = 'auto';
      v.muted = true;
      v.playsInline = true;
      v.load();
      return v;
    });
    return () => {
      preloaders.forEach((v) => { v.pause(); v.src = ''; });
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
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
    }, ROTATE_MS);

    return () => {
      if (rotationIntervalRef.current) window.clearInterval(rotationIntervalRef.current);
      if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
    };
  }, [ensureVideoReady]);

  const layerOpacity = (layer) => {
    if (!isFading) return layer === visibleLayer ? 'opacity-100' : 'opacity-0';
    const hiddenLayer = visibleLayer === 0 ? 1 : 0;
    return layer === hiddenLayer ? 'opacity-100' : 'opacity-0';
  };

  const layerScale = (layer) => {
    if (!isFading && layer === visibleLayer) return 'scale-105';
    if (isFading) {
      const hiddenLayer = visibleLayer === 0 ? 1 : 0;
      if (layer === hiddenLayer) return 'scale-105';
    }
    return 'scale-100';
  };

  return (
    <section className="cinematic-hero relative w-full overflow-hidden bg-black" id="top">

      {/* Video layers */}
      <div className="absolute inset-0">
        <video
          ref={(el) => { videoRefs.current[0] = el; }}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-in-out ${layerOpacity(0)} ${layerScale(0)}`}
          src={layerSources[0]}
          autoPlay muted loop playsInline preload="auto"
          aria-hidden="true"
        />
        <video
          ref={(el) => { videoRefs.current[1] = el; }}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-in-out ${layerOpacity(1)} ${layerScale(1)}`}
          src={layerSources[1]}
          autoPlay muted loop playsInline preload="auto"
          aria-hidden="true"
        />
      </div>

      {/* Scanlines — hidden by :root.no-scan */}
      <div className="cinematic-scanlines pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Directional gradients — left for readability, bottom to blend into next section */}
      <div className="cinematic-grad-left pointer-events-none absolute inset-0" />
      <div className="cinematic-grad-bottom pointer-events-none absolute inset-0" />

      {/* HUD corner brackets — hidden by :root.no-corners */}
      <div className="cinematic-corner tl" aria-hidden="true" />
      <div className="cinematic-corner tr" aria-hidden="true" />
      <div className="cinematic-corner bl" aria-hidden="true" />
      <div className="cinematic-corner br" aria-hidden="true" />

      {/* Overlay content */}
      <div className="cinematic-content relative">
        <div className="cinematic-content-inner">

          {/* HUD scene indicator with progress bar */}
          <div className="cinematic-hud-label">
            <span>◤ BROADCAST {sceneNum}/{SCENES.length} · LIVE</span>
            <div className="cinematic-progress-track">
              <div
                key={activeIndex}
                className="cinematic-progress-fill"
                style={{ animationDuration: ROTATE_MS + 'ms' }}
              />
            </div>
          </div>

          {/* Scene title */}
          <h1 className="cinematic-title">{scene.title}</h1>

          {/* Scene subtitle */}
          <p className="cinematic-subtitle">{scene.subtitle}</p>

          {/* CTAs — reuse site button classes for visual consistency */}
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

      {/* Scroll indicator */}
      <div className="hero-scroll" style={{ zIndex: 10 }}>
        <span>SCROLL</span>
        <span className="hero-scroll-line" />
      </div>

    </section>
  );
}

window.CinematicHero = CinematicHero;
