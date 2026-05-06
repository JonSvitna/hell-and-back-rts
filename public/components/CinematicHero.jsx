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
    title: 'FROM\nHELL.',
    subtitle: 'Three factions. One objective. Twenty minutes to decide the war.',
  },
  {
    src: '/videos/swarm-arrives.mp4',
    title: 'THE\nSWARM.',
    subtitle: 'Overwhelming numbers. Fragile as glass. Fast as fire.',
  },
  {
    src: '/videos/final-convergence.mp4',
    title: 'BACK\nIN 20.',
    subtitle: 'No turtling. No late games. One commander walks off the rock.',
  },
];

const ROTATE_MS = 7000;
const FADE_MS   = 900;

function primeVideoEl(video) {
  if (!video) return;
  video.muted        = true;
  video.defaultMuted = true;
  video.volume       = 0;
  video.playsInline  = true;
  video.preload      = 'auto';
  video.setAttribute('muted',              '');
  video.setAttribute('playsinline',        '');
  video.setAttribute('webkit-playsinline', '');
}

function waitUntilPlayable(video) {
  return new Promise((resolve) => {
    if (!video || video.readyState >= 3) { resolve(); return; }
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      clearTimeout(tid);
      video.removeEventListener('loadeddata', done);
      video.removeEventListener('canplay',    done);
      video.removeEventListener('error',      done);
      resolve();
    };
    video.addEventListener('loadeddata', done);
    video.addEventListener('canplay',    done);
    video.addEventListener('error',      done, { once: true });
    const tid = setTimeout(done, 12000);
  });
}

function makeVideoRef(refs, index) {
  return (el) => {
    if (el) primeVideoEl(el);
    refs.current[index] = el;
  };
}

function CinematicHero() {
  const [activeIndex,   setActiveIndex]   = useState(0);
  const [nextIndex,     setNextIndex]     = useState(1);
  const [isFading,      setIsFading]      = useState(false);
  const [visibleLayer,  setVisibleLayer]  = useState(0);
  const [layerSources,  setLayerSources]  = useState([SCENES[0].src, SCENES[1].src]);
  const [playBlocked,   setPlayBlocked]   = useState(false);
  const [textVisible,   setTextVisible]   = useState(true);

  const videoRefs           = useRef([null, null]);
  const fadeTimeoutRef      = useRef(null);
  const rotationIntervalRef = useRef(null);
  const textFadeRef         = useRef(null);

  const activeIndexRef  = useRef(activeIndex);
  const visibleLayerRef = useRef(visibleLayer);
  const isFadingRef     = useRef(isFading);

  useEffect(() => { activeIndexRef.current  = activeIndex;  }, [activeIndex]);
  useEffect(() => { visibleLayerRef.current = visibleLayer; }, [visibleLayer]);
  useEffect(() => { isFadingRef.current     = isFading;     }, [isFading]);

  const displayIndex = isFading ? nextIndex : activeIndex;
  const scene        = SCENES[displayIndex];

  const tryPlayAll = useCallback(() => {
    const plays = videoRefs.current.map((video) => {
      if (!video) return Promise.resolve(true);
      primeVideoEl(video);
      return video.play().then(() => true).catch(() => false);
    });
    Promise.all(plays).then((results) => {
      const allBlocked = results.every(r => r === false);
      setPlayBlocked(allBlocked);
    });
  }, []);

  useLayoutEffect(() => { tryPlayAll(); }, [layerSources, tryPlayAll]);

  useEffect(() => {
    tryPlayAll();
    const unlock = () => {
      setPlayBlocked(false);
      tryPlayAll();
      document.removeEventListener('click',      unlock);
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('keydown',    unlock);
    };
    document.addEventListener('click',      unlock, { passive: true });
    document.addEventListener('touchstart', unlock, { passive: true });
    document.addEventListener('keydown',    unlock, { passive: true });
    return () => {
      document.removeEventListener('click',      unlock);
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('keydown',    unlock);
    };
  }, [tryPlayAll]);

  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === 'visible') tryPlayAll(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [tryPlayAll]);

  const ensureVideoReady = useCallback(async (video) => {
    if (!video) return;
    primeVideoEl(video);
    try { video.currentTime = 0; } catch (_) {}
    await waitUntilPlayable(video);
    primeVideoEl(video);
    await video.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    rotationIntervalRef.current = setInterval(() => {
      if (isFadingRef.current) return;

      const currentActive  = activeIndexRef.current;
      const currentVisible = visibleLayerRef.current;
      const upcoming       = (currentActive + 1) % SCENES.length;
      const hiddenLayer    = currentVisible === 0 ? 1 : 0;

      setNextIndex(upcoming);
      setLayerSources((prev) => {
        const copy = [...prev];
        copy[hiddenLayer] = SCENES[upcoming].src;
        return copy;
      });

      setTextVisible(false);
      if (textFadeRef.current) clearTimeout(textFadeRef.current);
      textFadeRef.current = setTimeout(() => setTextVisible(true), FADE_MS * 0.55);

      requestAnimationFrame(() => requestAnimationFrame(async () => {
        await ensureVideoReady(videoRefs.current[hiddenLayer]);
        setIsFading(true);
        isFadingRef.current = true;

        if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = setTimeout(() => {
          setActiveIndex(upcoming);
          setVisibleLayer(hiddenLayer);
          activeIndexRef.current  = upcoming;
          visibleLayerRef.current = hiddenLayer;
          setIsFading(false);
          isFadingRef.current     = false;
        }, FADE_MS);
      }));
    }, ROTATE_MS);

    return () => {
      clearInterval(rotationIntervalRef.current);
      clearTimeout(fadeTimeoutRef.current);
      clearTimeout(textFadeRef.current);
    };
  }, [ensureVideoReady]);

  const layerVisibilityClass = (layer) => {
    if (!isFading) return layer === visibleLayer ? 'ch-v-show' : 'ch-v-hide';
    const hiddenLayer = visibleLayer === 0 ? 1 : 0;
    return layer === hiddenLayer ? 'ch-v-show' : 'ch-v-hide';
  };

  return (
    <section className="ch" id="top" aria-label="Hero">

      <div className="ch-videos" aria-hidden="true">
        {[0, 1].map((i) => (
          <video
            key={i}
            ref={makeVideoRef(videoRefs, i)}
            className={`ch-video ${layerVisibilityClass(i)}`}
            src={layerSources[i]}
            autoPlay muted loop playsInline preload="auto"
          />
        ))}
      </div>

      <div className="ch-overlay-left"   aria-hidden="true"/>
      <div className="ch-overlay-bottom" aria-hidden="true"/>
      <div className="ch-scanlines"      aria-hidden="true"/>

      {playBlocked && (
        <button
          className="ch-tap-prompt"
          onClick={tryPlayAll}
          aria-label="Tap to play video"
        >
          <svg viewBox="0 0 56 56" width="52" height="52" fill="none" aria-hidden="true">
            <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="1.5" opacity="0.45"/>
            <path d="M22 19l16 9-16 9V19z" fill="currentColor"/>
          </svg>
          <span className="mono">TAP TO PLAY</span>
        </button>
      )}

      <div className="ch-corner tl" aria-hidden="true"/>
      <div className="ch-corner tr" aria-hidden="true"/>
      <div className="ch-corner bl" aria-hidden="true"/>
      <div className="ch-corner br" aria-hidden="true"/>

      <div className="ch-content">
        <div className={`ch-inner${textVisible ? '' : ' ch-text-hide'}`}>

          <div className="ch-hud-row">
            <span className="ch-live-dot" aria-hidden="true"/>
            <span className="mono ch-live-label">LIVE &nbsp;·&nbsp; {displayIndex + 1} / {SCENES.length}</span>
            <div className="ch-prog-track" aria-hidden="true">
              <div
                key={displayIndex}
                className="ch-prog-fill"
                style={{ animationDuration: `${ROTATE_MS}ms` }}
              />
            </div>
          </div>

          <h1 className="ch-title">{scene.title}</h1>
          <p  className="ch-sub">{scene.subtitle}</p>

          <div className="ch-actions">
            <a href="#early-access" className="btn btn-primary">
              Request Early Access
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </a>
            <a href="#factions" className="btn btn-ghost">Meet the Factions</a>
          </div>

          <div className="ch-dots" role="tablist" aria-label="Video scenes">
            {SCENES.map((_, i) => (
              <span
                key={i}
                role="tab"
                aria-selected={i === displayIndex}
                className={`ch-dot${i === displayIndex ? ' ch-dot-on' : ''}`}
              />
            ))}
          </div>

        </div>
      </div>

      <div className="ch-scroll" aria-hidden="true">
        <span className="mono">SCROLL</span>
        <span className="ch-scroll-line"/>
      </div>

    </section>
  );
}

window.CinematicHero = CinematicHero;
