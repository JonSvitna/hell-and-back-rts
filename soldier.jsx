/* 3D armored soldier — Three.js + UnrealBloomPass + AfterimagePass.
   Built from primitives. Replaces the previous SVG turntable. */

const { useEffect, useRef } = React;

/* ---------- Battlefield backdrop (SVG, behind the canvas) ---------- */
const Battlefield = () => (
  <svg className="battlefield" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.18 0.03 40)"/>
        <stop offset="55%" stopColor="oklch(0.22 0.06 50)"/>
        <stop offset="100%" stopColor="oklch(0.10 0.02 30)"/>
      </linearGradient>
      <radialGradient id="sun" cx="0.72" cy="0.55" r="0.35">
        <stop offset="0%" stopColor="oklch(0.85 0.18 70)" stopOpacity="0.9"/>
        <stop offset="60%" stopColor="oklch(0.55 0.14 50)" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="oklch(0.20 0.05 40)" stopOpacity="0"/>
      </radialGradient>
      <pattern id="scan" width="3" height="3" patternUnits="userSpaceOnUse">
        <rect width="3" height="1" fill="oklch(0 0 0)" opacity="0.18"/>
      </pattern>
    </defs>
    <rect width="1600" height="700" fill="url(#sky)"/>
    <rect width="1600" height="700" fill="url(#sun)"/>
    <g opacity="0.45" fill="oklch(0.12 0.02 30)">
      <ellipse cx="220" cy="380" rx="180" ry="40"/>
      <ellipse cx="240" cy="340" rx="120" ry="30"/>
      <ellipse cx="1180" cy="370" rx="220" ry="48"/>
      <ellipse cx="1200" cy="320" rx="160" ry="36"/>
    </g>
    <path d="M0,440 L260,400 L560,410 L900,385 L1260,385 L1600,390 L1600,700 L0,700 Z" fill="oklch(0.13 0.02 35)"/>
    <path d="M0,490 L260,470 L600,470 L900,460 L1280,455 L1600,465 L1600,700 L0,700 Z" fill="oklch(0.10 0.015 30)"/>
    <rect width="1600" height="700" fill="url(#scan)"/>
  </svg>
);

/* ---------- Three.js soldier built from primitives ---------- */
function buildSoldier(THREE) {
  const root = new THREE.Group();

  const armor = new THREE.MeshStandardMaterial({ color: 0x1a1d24, metalness: 0.85, roughness: 0.38 });
  const armorDark = new THREE.MeshStandardMaterial({ color: 0x0d0f14, metalness: 0.7, roughness: 0.55 });
  const trim = new THREE.MeshStandardMaterial({
    color: 0xff7a2a, metalness: 0.3, roughness: 0.4, emissive: 0xff5a1c, emissiveIntensity: 0.6,
  });
  const visor = new THREE.MeshStandardMaterial({
    color: 0x081018, metalness: 0.9, roughness: 0.15, emissive: 0x4dd0ff, emissiveIntensity: 2.6,
  });
  const gun = new THREE.MeshStandardMaterial({ color: 0x14171c, metalness: 0.9, roughness: 0.3 });

  const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    root.add(m);
    return m;
  };

  // boots
  add(new THREE.BoxGeometry(0.42, 0.18, 0.6), armorDark, -0.22, 0.09, 0.05);
  add(new THREE.BoxGeometry(0.42, 0.18, 0.6), armorDark,  0.22, 0.09, 0.05);
  // shins
  add(new THREE.CylinderGeometry(0.16, 0.18, 0.85, 12), armor, -0.22, 0.6, 0);
  add(new THREE.CylinderGeometry(0.16, 0.18, 0.85, 12), armor,  0.22, 0.6, 0);
  // knees
  add(new THREE.SphereGeometry(0.2, 16, 12), armor, -0.22, 1.0, 0.08);
  add(new THREE.SphereGeometry(0.2, 16, 12), armor,  0.22, 1.0, 0.08);
  // thighs
  add(new THREE.CylinderGeometry(0.2, 0.18, 0.7, 12), armor, -0.22, 1.35, 0);
  add(new THREE.CylinderGeometry(0.2, 0.18, 0.7, 12), armor,  0.22, 1.35, 0);

  // pelvis
  add(new THREE.BoxGeometry(0.8, 0.28, 0.55), armor, 0, 1.78, 0);
  add(new THREE.BoxGeometry(0.22, 0.14, 0.05), trim, 0, 1.78, 0.31);

  // chest plate
  add(new THREE.BoxGeometry(0.95, 0.85, 0.6), armor, 0, 2.36, 0);
  add(new THREE.BoxGeometry(0.95, 0.18, 0.62), armorDark, 0, 2.72, 0);
  add(new THREE.BoxGeometry(0.05, 0.7, 0.05), trim, 0, 2.36, 0.31);

  // backpack / power unit
  add(new THREE.BoxGeometry(0.7, 0.7, 0.3), armorDark, 0, 2.45, -0.42);
  add(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 10), trim, -0.18, 2.45, -0.6, Math.PI / 2);
  add(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 10), trim,  0.18, 2.45, -0.6, Math.PI / 2);

  // pauldrons
  const pauldronGeo = new THREE.SphereGeometry(0.32, 18, 14, 0, Math.PI * 2, 0, Math.PI / 2);
  add(pauldronGeo, armor, -0.62, 2.78, 0);
  add(pauldronGeo, armor,  0.62, 2.78, 0);

  // upper arms
  add(new THREE.CylinderGeometry(0.14, 0.14, 0.55, 12), armor, -0.62, 2.42, 0, 0, 0, 0.05);
  add(new THREE.CylinderGeometry(0.14, 0.14, 0.55, 12), armor,  0.62, 2.42, 0, 0, 0, -0.05);
  // forearms (held forward gripping rifle)
  add(new THREE.CylinderGeometry(0.13, 0.13, 0.55, 12), armor, -0.45, 2.05, 0.35, Math.PI / 2.4, 0, 0);
  add(new THREE.CylinderGeometry(0.13, 0.13, 0.55, 12), armor,  0.45, 2.05, 0.35, Math.PI / 2.4, 0, 0);
  // gloves
  add(new THREE.BoxGeometry(0.18, 0.16, 0.18), armorDark, -0.32, 1.95, 0.55);
  add(new THREE.BoxGeometry(0.18, 0.16, 0.18), armorDark,  0.32, 1.95, 0.55);

  // neck
  add(new THREE.CylinderGeometry(0.13, 0.15, 0.18, 12), armorDark, 0, 2.92, 0);

  // helmet
  const helmetShell = new THREE.SphereGeometry(0.36, 24, 20, 0, Math.PI * 2, 0, Math.PI / 1.6);
  const helmet = add(helmetShell, armor, 0, 3.18, 0);
  helmet.scale.set(1, 1, 1.05);
  add(new THREE.BoxGeometry(0.06, 0.18, 0.55), trim, 0, 3.45, -0.05);

  // visor (the BLUE)
  const v = add(new THREE.BoxGeometry(0.55, 0.13, 0.15), visor, 0, 3.18, 0.32);
  v.rotation.x = -0.05;

  // jaw guard
  add(new THREE.BoxGeometry(0.5, 0.22, 0.4), armorDark, 0, 2.98, 0.18);
  // ear vents
  add(new THREE.BoxGeometry(0.04, 0.18, 0.18), armorDark, -0.36, 3.05, 0);
  add(new THREE.BoxGeometry(0.04, 0.18, 0.18), armorDark,  0.36, 3.05, 0);
  // antenna
  add(new THREE.CylinderGeometry(0.012, 0.012, 0.55, 6), armorDark, 0.28, 3.65, -0.05, 0, 0, -0.2);
  add(new THREE.SphereGeometry(0.03, 8, 6), trim, 0.36, 3.92, -0.06);

  // rifle held diagonally across chest
  const rifle = new THREE.Group();
  rifle.add(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 1.0), gun));
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.6, 10), gun);
  barrel.rotation.x = Math.PI / 2;
  barrel.position.set(0, 0.02, 0.7);
  rifle.add(barrel);
  const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.12, 10), armorDark);
  muzzle.rotation.x = Math.PI / 2;
  muzzle.position.set(0, 0.02, 1.05);
  rifle.add(muzzle);
  const scope = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.28), armorDark);
  scope.position.set(0, 0.18, 0.05);
  rifle.add(scope);
  const scopeLens = new THREE.Mesh(new THREE.CircleGeometry(0.04, 16), trim);
  scopeLens.position.set(0, 0.18, 0.2);
  rifle.add(scopeLens);
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.1), armorDark);
  grip.position.set(0, -0.2, -0.1);
  rifle.add(grip);
  const mag = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.28, 0.16), armorDark);
  mag.position.set(0, -0.22, 0.15);
  rifle.add(mag);
  rifle.position.set(0, 2.0, 0.5);
  rifle.rotation.set(0.1, -0.35, -0.5);
  root.add(rifle);

  // glowing chest core
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 12),
    new THREE.MeshStandardMaterial({
      color: 0x4dd0ff, emissive: 0x4dd0ff, emissiveIntensity: 3, metalness: 0.2, roughness: 0.2,
    })
  );
  core.position.set(0, 2.55, 0.32);
  root.add(core);

  // ground disc
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(1.4, 1.6, 0.04, 48),
    new THREE.MeshStandardMaterial({ color: 0x0a0c10, metalness: 0.7, roughness: 0.5 })
  );
  disc.position.y = -0.01;
  root.add(disc);
  const discRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.45, 0.012, 8, 64),
    new THREE.MeshStandardMaterial({
      color: 0xff7a2a, emissive: 0xff5a1c, emissiveIntensity: 1.4, metalness: 0.4, roughness: 0.4,
    })
  );
  discRing.rotation.x = Math.PI / 2;
  discRing.position.y = 0.02;
  root.add(discRing);

  return root;
}

const SoldierCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = null;

    const start = () => {
      if (cancelled || !mountRef.current) return;
      const THREE = window.THREE;
      const { EffectComposer, RenderPass, UnrealBloomPass, AfterimagePass, OutputPass } = window.THREE_POST;

      const mount = mountRef.current;
      const w = mount.clientWidth || 600;
      const h = mount.clientHeight || 600;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0a0a10, 0.06);

      const camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 50);
      camera.position.set(0, 2.2, 7.2);
      camera.lookAt(0, 2.0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      // Lights
      scene.add(new THREE.HemisphereLight(0xffb070, 0x101820, 0.55));
      const key = new THREE.DirectionalLight(0xffb070, 2.2);
      key.position.set(4, 6, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x4dd0ff, 1.8);
      rim.position.set(-5, 4, -4);
      scene.add(rim);
      const fill = new THREE.PointLight(0xff5a1c, 1.6, 10, 2);
      fill.position.set(0, 1.2, 4);
      scene.add(fill);
      const visorGlow = new THREE.PointLight(0x4dd0ff, 1.2, 3, 2);
      visorGlow.position.set(0, 3.18, 0.6);
      scene.add(visorGlow);

      // Subject
      const soldier = buildSoldier(THREE);
      scene.add(soldier);

      // Post: Afterimage = motion-blur trail, UnrealBloom = the glow
      const composer = new EffectComposer(renderer);
      composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      composer.setSize(w, h);
      composer.addPass(new RenderPass(scene, camera));
      const afterimage = new AfterimagePass(0.82);
      composer.addPass(afterimage);
      const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 1.4, 0.7, 0.55);
      composer.addPass(bloom);
      composer.addPass(new OutputPass());

      const ro = new ResizeObserver(() => {
        const cw = mount.clientWidth, ch = mount.clientHeight;
        if (!cw || !ch) return;
        camera.aspect = cw / ch;
        camera.updateProjectionMatrix();
        renderer.setSize(cw, ch);
        composer.setSize(cw, ch);
        bloom.setSize(cw, ch);
      });
      ro.observe(mount);

      let raf;
      const t0 = performance.now();
      const tick = () => {
        const t = (performance.now() - t0) / 1000;
        soldier.rotation.y += 0.018;
        soldier.position.y = Math.sin(t * 1.2) * 0.05;
        soldier.rotation.z = Math.sin(t * 0.7) * 0.03;
        composer.render();
        raf = requestAnimationFrame(tick);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        scene.traverse(o => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            mats.forEach(m => m.dispose());
          }
        });
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    };

    if (window.THREE && window.THREE_POST) start();
    else window.addEventListener('three-ready', start, { once: true });

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  return <div ref={mountRef} className="soldier-canvas" />;
};

const Soldier = () => (
  <div className="soldier-stage" aria-label="3D rotating armored marine over destroyed battlefield">
    <Battlefield />
    <div className="soldier-grid" />
    <div className="soldier-platform">
      <div className="platform-ring outer" />
      <div className="platform-ring inner" />
      <div className="platform-disc" />
    </div>
    <SoldierCanvas />
    <div className="soldier-vignette" />
    <div className="soldier-hud">
      <span className="hud-tag tl">◤ UNIT-7741</span>
      <span className="hud-tag tr">CLASS // INFANTRY ◥</span>
      <span className="hud-tag bl">◣ 33.2°N · 117.4°W</span>
      <span className="hud-tag br">SCAN ACTIVE ◢</span>
    </div>
  </div>
);

window.Soldier = Soldier;
