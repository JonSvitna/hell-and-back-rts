import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Scene = {
  src: string;
  title: string;
  subtitle: string;
};

const SCENES: Scene[] = [
  {
    src: '/videos/war-begins.mp4',
    title: 'Command the Battle.',
    subtitle: 'Three factions. One battlefield. Total war begins now.',
  },
  {
    src: '/videos/swarm-arrives.mp4',
    title: 'Survive the Swarm.',
    subtitle: 'Overwhelming forces collide with tactical command.',
  },
  {
    src: '/videos/final-convergence.mp4',
    title: 'Rewrite the War.',
    subtitle: 'Discipline. Chaos. Precision.',
  },
];

const ROTATE_MS = 6000;
const FADE_MS = 1000;

/**
 * Full-screen hero with two always-mounted video layers. Crossfade is opacity-only.
 * Runtime for this repo: mirrored in `public/components/CinematicHero.jsx` (Babel in browser).
 *
 * Asset note: encode all clips at the same resolution (e.g. 1080p) and frame rate (e.g. 24fps)
 * for most consistent decode and transitions.
 */
export default function CinematicHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const [visibleLayer, setVisibleLayer] = useState<0 | 1>(0);
  const [layerSources, setLayerSources] = useState<[string, string]>([
    SCENES[0].src,
    SCENES[1].src,
  ]);

  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([
    null,
    null,
  ]);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rotationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeIndexRef = useRef(activeIndex);
  const visibleLayerRef = useRef(visibleLayer);
  const isFadingRef = useRef(isFading);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);
  useEffect(() => {
    visibleLayerRef.current = visibleLayer;
  }, [visibleLayer]);
  useEffect(() => {
    isFadingRef.current = isFading;
  }, [isFading]);

  const scene = useMemo(() => SCENES[activeIndex], [activeIndex]);

  const ensureVideoReady = useCallback(async (video: HTMLVideoElement | null) => {
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.currentTime = 0;

    if (video.readyState >= 3) {
      await video.play().catch(() => undefined);
      return;
    }

    await new Promise<void>((resolve) => {
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
      preloaders.forEach((v) => {
        v.pause();
        v.src = '';
      });
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
      const hiddenLayer: 0 | 1 = currentVisible === 0 ? 1 : 0;

      setNextIndex(upcoming);
      setLayerSources((prev) => {
        const copy: [string, string] = [...prev] as [string, string];
        copy[hiddenLayer] = SCENES[upcoming].src;
        return copy;
      });

      requestAnimationFrame(() => {
        void (async () => {
          await ensureVideoReady(videoRefs.current[hiddenLayer]);
          setIsFading(true);
          isFadingRef.current = true;

          if (fadeTimeoutRef.current) {
            window.clearTimeout(fadeTimeoutRef.current);
          }

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
      if (rotationIntervalRef.current) {
        window.clearInterval(rotationIntervalRef.current);
      }
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [ensureVideoReady]);

  const layerOpacity = (layer: 0 | 1) => {
    if (!isFading) {
      return layer === visibleLayer ? 'opacity-100' : 'opacity-0';
    }
    const hiddenLayer: 0 | 1 = visibleLayer === 0 ? 1 : 0;
    if (layer === hiddenLayer) return 'opacity-100';
    return 'opacity-0';
  };

  const layerScale = (layer: 0 | 1) => {
    if (!isFading && layer === visibleLayer) return 'scale-105';
    if (isFading) {
      const hiddenLayer: 0 | 1 = visibleLayer === 0 ? 1 : 0;
      if (layer === hiddenLayer) return 'scale-105';
    }
    return 'scale-100';
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-black"
      id="top"
    >
      <div className="absolute inset-0">
        <video
          ref={(el) => {
            videoRefs.current[0] = el;
          }}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-in-out ${layerOpacity(
            0,
          )} ${layerScale(0)}`}
          src={layerSources[0]}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <video
          ref={(el) => {
            videoRefs.current[1] = el;
          }}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-in-out ${layerOpacity(
            1,
          )} ${layerScale(1)}`}
          src={layerSources[1]}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="max-w-2xl text-left text-white">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/70">
            Scene {isFading ? nextIndex + 1 : activeIndex + 1}
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {scene.title}
          </h1>
          <p className="mt-5 text-base text-white/90 sm:text-lg lg:text-xl">
            {scene.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#early-access"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90"
            >
              Join Early Access
            </a>
            <a
              href="#factions"
              className="inline-flex items-center justify-center rounded-md border border-white/50 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/15"
            >
              View Factions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
