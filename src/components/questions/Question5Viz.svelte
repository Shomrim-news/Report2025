<script>
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

  import Atom from '$lib/assets/atom.png';
  import HaloImpact1 from '$lib/assets/halo_impact_1.png';
  import HaloImpact2 from '$lib/assets/halo_impact_2.png';
  import HaloImpact3 from '$lib/assets/halo_impact_3.png';

  import Atom1 from '$lib/assets/atom_theme_1.png';
  import Atom2 from '$lib/assets/atom_theme_2.png';
  import Atom3 from '$lib/assets/atom_theme_3.png';
  import Atom4 from '$lib/assets/atom_theme_4.png';
  import Atom5 from '$lib/assets/atom_theme_5.png';
  import Atom6 from '$lib/assets/atom_theme_6.png';
  import Atom7 from '$lib/assets/atom_theme_7.png';
  import Atom8 from '$lib/assets/atom_theme_8.png';

  import Halo1Impact1 from '$lib/assets/halo_theme_1_impact_1.png';
  import Halo1Impact2 from '$lib/assets/halo_theme_1_impact_2.png';
  import Halo1Impact3 from '$lib/assets/halo_theme_1_impact_3.png';
  import Halo2Impact1 from '$lib/assets/halo_theme_2_impact_1.png';
  import Halo2Impact2 from '$lib/assets/halo_theme_2_impact_2.png';
  import Halo2Impact3 from '$lib/assets/halo_theme_2_impact_3.png';
  import Halo3Impact1 from '$lib/assets/halo_theme_3_impact_1.png';
  import Halo3Impact2 from '$lib/assets/halo_theme_3_impact_2_temp.png';
  import Halo4Impact1 from '$lib/assets/halo_theme_4_impact_1.png';
  import Halo4Impact2 from '$lib/assets/halo_theme_4_impact_2.png';
  import Halo4Impact3 from '$lib/assets/halo_theme_4_impact_3_temp.png';
  import Halo5Impact1 from '$lib/assets/halo_theme_5_impact_1.png';
  import Halo5Impact2 from '$lib/assets/halo_theme_5_impact_2.png';
  import Halo6Impact1 from '$lib/assets/halo_theme_6_impact_1.png';
  import Halo6Impact2 from '$lib/assets/halo_theme_6_impact_2_temp.png';
  import Halo6Impact3 from '$lib/assets/halo_theme_6_impact_3_temp.png';
  import Halo7Impact1 from '$lib/assets/halo_theme_7_impact_1.png';
  import Halo8Impact1 from '$lib/assets/halo_theme_8_impact_1.png';
  import Halo8Impact3 from '$lib/assets/halo_theme_8_impact_3.png';

  import { stories } from '$lib/data/stories.js';
  import { themes, getThemeIds } from '$lib/data/themes.js';

  let { width = 0, height = 0, activeThemes = new Set() } = $props();

  const storiesToUse = stories.filter(
    (story) =>
      (story['Additional outlets – tier A (ENG)'] &&
        story['Additional outlets – tier A (ENG)'].length > 0) ||
      (story['Additional outlets – tier B (ENG)'] &&
        story['Additional outlets – tier B (ENG)'].length > 0),
  );

  // ── Outlet configuration ─────────────────────────────────────────────
  const CSV_TO_OUTLET_KEY = {
    Calcalist: 'Calcalist',
    N12: 'N12_Mako',
    Mako: 'N12_Mako',
    Haaretz: 'Haaretz',
    'Haaretz (English edition)': 'Haaretz',
    'Haaretz ENG': 'Haaretz',
    TheMarker: 'TheMarker',
    Ynet: 'Ynet',
    'Ynet ENG': 'OtherLocal',
    'Yedioth Ahronoth': 'Ynet',
    'La Repubblica (IT)': 'LaRepubblica',
    'Le Monde': 'LeMonde',
    Bloomberg: 'Bloomberg',
    'Der Spiegel (Germany)': 'DerSpiegel',
    'Profil (AS)': 'Profil',
    'Al-Monitor': 'AlMonitor',
    'BBC Arabic': 'BBCArabic',
    'Sky News Arabic': 'SkyNewsArabic',
    'Corriere della Sera (IT)': 'CorriereDellaSera',
    'The Japan Times': 'TheJapanTimes',
    ICIJ: 'ICIJ',
    Bokra: 'OtherGlobal',
    "B'Hadrei Haredim": 'OtherLocal',
    'B\u2019Hadrei Haredim': 'OtherLocal',
    'Channel Knesset': 'OtherLocal',
    'Galatz (Army Radio)': 'OtherLocal',
    Galatz: 'OtherLocal',
    'KAN 11': 'OtherLocal',
    Maariv: 'OtherLocal',
    'Reka Radio (KAN)': 'OtherLocal',
    'The Hottest Place in Hell': 'OtherLocal',
    'The Times of Israel': 'OtherLocal',
    Walla: 'OtherLocal',
    'Annahar (Lebanon)': 'OtherGlobal',
    'Channel 10': 'OtherLocal',
    'Channel 7 (Arutz Sheva)': 'OtherLocal',
    'Channel 7': 'OtherLocal',
    DoctorsOnly: 'OtherLocal',
    'Erem News': 'OtherGlobal',
    'Haredim 10': 'OtherLocal',
    'KAN Arabic': 'OtherLocal',
    Kurdistan24: 'OtherGlobal',
    'The New Arab (UK)': 'OtherGlobal',
    'Radio Tzafon': 'OtherLocal',
    TimeOut: 'OtherLocal',
    'Turkish Daily': 'OtherGlobal',
    'Under the Radar': 'OtherLocal',
    arabi21: 'OtherGlobal',
    i24News: 'OtherGlobal',
  };

  const GLOBAL_OUTLET_KEYS = new Set([
    'AlMonitor',
    'OtherGlobal',
    'TheJapanTimes',
    'SkyNewsArabic',
    'Profil',
    'LeMonde',
    'LaRepubblica',
    'ICIJ',
    'DerSpiegel',
    'CorriereDellaSera',
    'Bloomberg',
    'BBCArabic',
  ]);
  const LOCAL_OUTLET_KEYS = new Set([
    'Calcalist',
    'Ynet',
    'N12_Mako',
    'TheMarker',
    'Haaretz',
    'OtherLocal',
  ]);

  // ── Label columns ─────────────────────────────────────────────────────
  const GLOBAL_LEFT_LABELS = [
    'Al-Monitor',
    'Kurdistan24',
    'arabi21',
    'Turkish Daily',
    'The New Arab',
    'The Japan Times',
    'Sky News Arabic',
    'Profil',
    'Le Monde',
  ];
  const GLOBAL_RIGHT_LABELS = [
    'La Repubblica',
    'ICIJ',
    'Annahar',
    'Der Spiegel',
    'Corriere della Sera',
    'Bokra',
    'Bloomberg',
    'BBC Arabic',
    'i24News',
  ];
  const LOCAL_LEFT_LABELS = [
    'Calcalist',
    'Ynet',
    'Haaretz',
    'TheMarker',
    'Galatz',
    'Yedioth Ahronoth',
    'Mako',
    'N12',
    'Haaretz ENG',
  ];
  const LOCAL_CENTER_LABELS = [
    'KAN 11',
    'Times of Israel',
    'Under the Radar',
    'Channel 10',
    "B'Hadrei Haredim",
    'Haredim 10',
    'Channel 7',
    'Hottest Place in Hell',
  ];
  const LOCAL_RIGHT_LABELS = [
    'KAN Arabic',
    'Maariv',
    'Reka Radio',
    'Radio Tzafon',
    'Walla',
    'DoctorsOnly',
    'Channel Knesset',
    'Ynet ENG',
    'TimeOut',
  ];

  function parseOutletKeys(story) {
    const keys = new Set();
    const raw = [
      story['Additional outlets \u2013 tier A (ENG)'] || '',
      story['Additional outlets \u2013 tier B (ENG)'] || '',
    ].join(',');
    for (const o of raw.split(/[\n,]/)) {
      const k = CSV_TO_OUTLET_KEY[o.trim()];
      if (k) keys.add(k);
    }
    return [...keys];
  }

  const atoms = storiesToUse.map((story) => ({ story, outletKeys: parseOutletKeys(story) }));

  // Classify each atom into a display zone
  const atomZones = atoms.map((atom) => {
    const hasGlobal = atom.outletKeys.some((k) => GLOBAL_OUTLET_KEYS.has(k));
    const hasLocal = atom.outletKeys.some((k) => LOCAL_OUTLET_KEYS.has(k));
    if (hasGlobal && !hasLocal) return 'global';
    if (!hasGlobal && hasLocal) return 'local';
    if (hasGlobal && hasLocal) return 'both';
    return 'none';
  });

  function hasImpact(story, level) {
    return (story['Impact level'] || '')
      .split(',')
      .map((x) => x.trim())
      .includes(String(level));
  }

  // ── Layout constants ─────────────────────────────────────────────────
  const ASPECT = 88 / 56;
  const COLS = 25;
  const OVERLAP = 24;

  let atomW = $derived(((width + OVERLAP * (COLS - 1)) / COLS) * 0.8);
  let atomH = $derived(atomW * ASPECT);
  let scale = $derived(atomW / 56);
  let halo1W = $derived(92 * scale);
  let halo1H = $derived(102 * scale);
  let halo2W = $derived(122 * scale);
  let halo2H = $derived(136 * scale);
  let halo3W = $derived(162 * scale);
  let halo3H = $derived(180 * scale);

  // ── Position state ────────────────────────────────────────────────────
  let positions = $state(atoms.map(() => ({ x: 0, y: 0 })));
  let centerOffsets = atoms.map(() => ({ dx: 0, dy: 0 }));

  let globalLeftPositions = $state(GLOBAL_LEFT_LABELS.map(() => ({ x: 0, y: 0 })));
  let globalRightPositions = $state(GLOBAL_RIGHT_LABELS.map(() => ({ x: 0, y: 0 })));
  let localLeftPositions = $state(LOCAL_LEFT_LABELS.map(() => ({ x: 0, y: 0 })));
  let localCenterPositions = $state(LOCAL_CENTER_LABELS.map(() => ({ x: 0, y: 0 })));
  let localRightPositions = $state(LOCAL_RIGHT_LABELS.map(() => ({ x: 0, y: 0 })));

  let lastW = 0;
  let lastH = 0;

  $effect(() => {
    const w = Math.round(width);
    const h = Math.round(height);
    if (w === 0 || h === 0) return;
    if (w === lastW && h === lastH) return;
    lastW = w;
    lastH = h;

    const PAD_X = 40;
    const ROW_H = 36;
    const TOP_Y = 30;
    const BOTTOM_Y = h - 30;

    // Global labels: top-aligned, left and right columns
    globalLeftPositions = GLOBAL_LEFT_LABELS.map((_, i) => ({ x: PAD_X, y: TOP_Y + i * ROW_H }));
    globalRightPositions = GLOBAL_RIGHT_LABELS.map((_, i) => ({
      x: w - PAD_X,
      y: TOP_Y + i * ROW_H,
    }));

    // Local labels: bottom-aligned, left, center, right columns
    const localLeftN = LOCAL_LEFT_LABELS.length;
    localLeftPositions = LOCAL_LEFT_LABELS.map((_, i) => ({
      x: PAD_X,
      y: BOTTOM_Y - (localLeftN - 1 - i) * ROW_H,
    }));
    const localCenterN = LOCAL_CENTER_LABELS.length;
    localCenterPositions = LOCAL_CENTER_LABELS.map((_, i) => ({
      x: w / 2,
      y: BOTTOM_Y - (localCenterN - 1 - i) * ROW_H,
    }));
    const localRightN = LOCAL_RIGHT_LABELS.length;
    localRightPositions = LOCAL_RIGHT_LABELS.map((_, i) => ({
      x: w - PAD_X,
      y: BOTTOM_Y - (localRightN - 1 - i) * ROW_H,
    }));

    // ── Zone-based atom placement via force simulation ─────────────────
    // Labels sit at the left/right edges, so atoms can span the full canvas height
    const globalMaxRows = Math.max(GLOBAL_LEFT_LABELS.length, GLOBAL_RIGHT_LABELS.length);
    const localMaxRows = Math.max(
      LOCAL_LEFT_LABELS.length,
      LOCAL_CENTER_LABELS.length,
      LOCAL_RIGHT_LABELS.length,
    );
    const freeMinY = TOP_Y + 10;
    const freeMaxY = BOTTOM_Y - 10;
    const freeH = freeMaxY - freeMinY;
    const cx = w / 2;
    const atomPad = 36; // distance from canvas left/right edges

    // Zone targets: global at mid-height of global labels, local at mid-height of local labels
    const globalZoneCY = TOP_Y + ((globalMaxRows - 1) * ROW_H) / 2;
    const localZoneCY = BOTTOM_Y - ((localMaxRows - 1) * ROW_H) / 2;
    const freeCY = (freeMinY + freeMaxY) / 2;
    const bothZoneCY = globalZoneCY + (freeCY - globalZoneCY) * 0.65;

    // Expose for drift animation
    driftBounds = { minX: atomPad, maxX: w - atomPad, minY: freeMinY, maxY: freeMaxY };
    atomZoneTargetY = atoms.map((_, idx) =>
      atomZones[idx] === 'global'
        ? globalZoneCY
        : atomZones[idx] === 'local'
          ? localZoneCY
          : bothZoneCY,
    );

    const allNodes = atoms.map((_, idx) => {
      const targetY = atomZoneTargetY[idx];
      return {
        x: cx + (Math.random() - 0.5) * (w * 0.8),
        y: targetY + (Math.random() - 0.5) * freeH * 0.5,
        targetY,
      };
    });

    forceSimulation(allNodes)
      .force('x', forceX(cx).strength(0.01))
      .force('y', forceY((d) => d.targetY).strength(0.3))
      .force('collide', forceCollide(44))
      .force('bound', () => {
        for (const node of allNodes) {
          node.x = Math.max(atomPad, Math.min(w - atomPad, node.x));
          node.y = Math.max(freeMinY, Math.min(freeMaxY, node.y));
        }
      })
      .stop()
      .tick(300);

    // Two starting clusters: global atoms from globalZoneCY, local from localZoneCY
    const allCenterNodes = atoms.map((_, idx) => {
      const startY =
        atomZones[idx] === 'global'
          ? globalZoneCY
          : atomZones[idx] === 'local'
            ? localZoneCY
            : freeCY;
      return { x: cx + (Math.random() - 0.5) * 20, y: startY + (Math.random() - 0.5) * 20 };
    });
    forceSimulation(allCenterNodes)
      .force('x', forceX(cx).strength(0.4))
      .force(
        'y',
        forceY((_, i) =>
          atomZones[i] === 'global'
            ? globalZoneCY
            : atomZones[i] === 'local'
              ? localZoneCY
              : freeCY,
        ).strength(0.4),
      )
      .force('collide', forceCollide(26))
      .stop()
      .tick(300);

    const newPositions = [];
    const newCenterOffsets = [];

    atoms.forEach((_, idx) => {
      const pos = { x: allNodes[idx].x, y: allNodes[idx].y };
      newPositions.push(pos);
      newCenterOffsets.push({
        dx: allCenterNodes[idx].x - pos.x,
        dy: allCenterNodes[idx].y - pos.y,
      });
    });

    positions = newPositions;
    centerOffsets = newCenterOffsets;
  });

  // ── Theme data ────────────────────────────────────────────────────────
  const ATOM_IMGS = [null, Atom1, Atom2, Atom3, Atom4, Atom5, Atom6, Atom7, Atom8];
  const HALO_IMGS = [
    null,
    { 1: Halo1Impact1, 2: Halo1Impact2, 3: Halo1Impact3 },
    { 1: Halo2Impact1, 2: Halo2Impact2, 3: Halo2Impact3 },
    { 1: Halo3Impact1, 2: Halo3Impact2 },
    { 1: Halo4Impact1, 2: Halo4Impact2, 3: Halo4Impact3 },
    { 1: Halo5Impact1, 2: Halo5Impact2 },
    { 1: Halo6Impact1, 2: Halo6Impact2, 3: Halo6Impact3 },
    { 1: Halo7Impact1 },
    { 1: Halo8Impact1, 3: Halo8Impact3 },
  ];

  const atomThemeIds = atoms.map((a) => getThemeIds(a.story));
  const byTheme = new Map(themes.map((t) => [t.id, []]));
  atomThemeIds.forEach((tids, atomIdx) => {
    tids.forEach((tid, layerIdx) => byTheme.get(tid)?.push({ atomIdx, layerIdx }));
  });

  // ── GSAP refs ─────────────────────────────────────────────────────────
  let container;
  let imgEls = $state([]);
  let globalLeftLabelEls = [];
  let globalRightLabelEls = [];
  let localLeftLabelEls = [];
  let localCenterLabelEls = [];
  let localRightLabelEls = [];
  let defaultLayerRefs = [];
  let themeLayerRefs = atoms.map(() => []);
  let ctx;
  let themeCycleTls = [];

  let animationReady = $state(false);
  let wasThemesActive = false;

  // ── Tooltip ───────────────────────────────────────────────────────────
  let tooltip = $state({
    visible: false,
    text: '',
    x: 0,
    y: 0,
    expanded: false,
    journalist: '',
    date: '',
    url: '',
    themeIds: [],
  });
  let clickedIndex = $state(-1);

  function getTooltipPos(idx) {
    if (!container || !imgEls[idx]) return { x: 0, y: 0 };
    const cR = container.getBoundingClientRect();
    const eR = imgEls[idx].getBoundingClientRect();
    return { x: eR.left - cR.left + eR.width / 2, y: eR.top - cR.top + eR.height / 2 };
  }

  function showTooltip(atom, idx) {
    const { x, y } = getTooltipPos(idx);
    tooltip = {
      ...tooltip,
      visible: true,
      text: atom.story['Name (ENG - free translation) '],
      x,
      y,
    };
  }

  function hideTooltip(idx) {
    if (clickedIndex !== idx) tooltip = { ...tooltip, visible: false };
  }

  function closeIfFocused() {
    if (clickedIndex === -1) return;
    gsap.to(imgEls[clickedIndex], { opacity: 0.6, duration: 0.4, overwrite: 'auto' });
    clickedIndex = -1;
    tooltip = { ...tooltip, expanded: false, visible: false };
  }

  function clickTooltip(atom, idx) {
    if (clickedIndex === idx) {
      gsap.to(imgEls[idx], { opacity: 0.6, duration: 0.4, overwrite: 'auto' });
      clickedIndex = -1;
      tooltip = { ...tooltip, expanded: false, visible: false };
      return;
    }
    if (clickedIndex !== -1)
      gsap.to(imgEls[clickedIndex], { opacity: 0.6, duration: 0.4, overwrite: 'auto' });
    gsap.to(imgEls[idx], { opacity: 1, duration: 0.3, overwrite: 'auto' });
    clickedIndex = idx;
    const { x, y } = getTooltipPos(idx);
    tooltip = {
      ...tooltip,
      visible: true,
      expanded: true,
      text: atom.story['Name (ENG - free translation) '],
      journalist: atom.story['Journalist'],
      date: atom.story['Date'],
      url: atom.story['URL Shomrim'],
      themeIds: atomThemeIds[idx],
      x,
      y,
    };
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(container);
    document.addEventListener('click', closeIfFocused);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', closeIfFocused);
      ctx?.revert();
      themeCycleTls.forEach((tl) => tl.kill());
    };
  });

  // ── Animation ─────────────────────────────────────────────────────────
  function runAnimation() {
    atoms.forEach((_, idx) => {
      gsap.set(imgEls[idx], { x: centerOffsets[idx].dx, y: centerOffsets[idx].dy, opacity: 0 });
    });

    const allLabelEls = [
      ...globalLeftLabelEls,
      ...globalRightLabelEls,
      ...localLeftLabelEls,
      ...localCenterLabelEls,
      ...localRightLabelEls,
    ].filter(Boolean);

    ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: afterMigration });
      tl.fromTo(allLabelEls, { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.04 }, 0);
      tl.to(imgEls, { opacity: 0.6, duration: 0.8, ease: 'power2.out', stagger: 0.01 }, 0.6);
      tl.to(imgEls, { x: 0, y: 0, duration: 2.5, ease: 'power2.inOut', stagger: 0.008 }, 2);
    });
  }

  function afterMigration() {
    animationReady = true;
    breathe();
    startDrift();
  }

  function breathe() {
    gsap.killTweensOf(imgEls);
    gsap.to(imgEls, {
      opacity: 0.45,
      duration: 3.5,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'center' },
      repeat: -1,
      yoyo: true,
    });
  }

  function stopDrift() {
    atoms.forEach((_, idx) => {
      if (imgEls[idx]) gsap.killTweensOf(imgEls[idx], 'x,y');
    });
  }

  function startDrift() {
    stopDrift();
    atoms.forEach((_, idx) => scheduleDrift(idx, Math.random() * 4));
  }

  function scheduleDrift(idx, delay = 0) {
    const { minX, maxX, minY, maxY } = driftBounds;
    if (minX === maxX) return; // not yet initialised
    const tY = atomZoneTargetY[idx];
    const range = maxY - minY;
    const newX = minX + Math.random() * (maxX - minX);
    const newY = Math.max(minY, Math.min(maxY, tY + (Math.random() - 0.5) * range * 0.18));
    gsap.to(imgEls[idx], {
      x: newX - positions[idx].x,
      y: newY - positions[idx].y,
      duration: 35 + Math.random() * 25,
      delay,
      ease: 'sine.inOut',
      overwrite: 'auto',
      onComplete: () => scheduleDrift(idx),
    });
  }

  // ── Theme layer control ────────────────────────────────────────────────
  function startCyclingForActive(active) {
    const holdDur = 4;
    const transitionDur = 0.8;
    atoms.forEach((_, atomIdx) => {
      const tids = atomThemeIds[atomIdx];
      const activeTids = tids.filter((tid) => active.has(tid));
      if (activeTids.length < 2) return;
      const orderedLayers = themes
        .filter((t) => activeTids.includes(t.id))
        .map((t) => themeLayerRefs[atomIdx][tids.indexOf(t.id)]);
      const n = orderedLayers.length;
      const cycleTl = gsap.timeline({ repeat: -1, delay: Math.random() * holdDur });
      themeCycleTls.push(cycleTl);
      for (let i = 0; i < n; i++) {
        const fromLayer = orderedLayers[(n - 1 + i) % n];
        const toLayer = orderedLayers[i % n];
        const stepStart = i * (holdDur + transitionDur);
        cycleTl.to(
          fromLayer,
          { opacity: 0, duration: transitionDur, ease: 'sine.inOut' },
          stepStart + holdDur,
        );
        cycleTl.to(
          toLayer,
          { opacity: 1, duration: transitionDur, ease: 'sine.inOut' },
          stepStart + holdDur,
        );
      }
    });
  }

  $effect(() => {
    const active = activeThemes;
    if (!animationReady) return;

    const isActive = active.size > 0;
    const FADE_DUR = 0.45;

    themeCycleTls.forEach((tl) => tl.kill());
    themeCycleTls = [];

    if (!isActive) {
      if (wasThemesActive) {
        atoms.forEach((_, atomIdx) => {
          gsap.to(defaultLayerRefs[atomIdx], { opacity: 1, duration: FADE_DUR, overwrite: 'auto' });
          themeLayerRefs[atomIdx].forEach((el) => {
            if (el) gsap.to(el, { opacity: 0, duration: FADE_DUR, overwrite: 'auto' });
          });
        });
      }
      wasThemesActive = false;
    } else {
      wasThemesActive = true;
      atoms.forEach((_, atomIdx) => {
        const tids = atomThemeIds[atomIdx];
        const activeTids = tids.filter((tid) => active.has(tid));
        if (activeTids.length === 0) {
          gsap.to(defaultLayerRefs[atomIdx], { opacity: 1, duration: FADE_DUR, overwrite: 'auto' });
          tids.forEach((_, t) => {
            gsap.to(themeLayerRefs[atomIdx][t], {
              opacity: 0,
              duration: FADE_DUR,
              overwrite: 'auto',
            });
          });
        } else {
          gsap.to(defaultLayerRefs[atomIdx], { opacity: 0, duration: FADE_DUR, overwrite: 'auto' });
          const firstActiveTid = themes.find((t) => activeTids.includes(t.id))?.id;
          tids.forEach((tid, t) => {
            gsap.to(themeLayerRefs[atomIdx][t], {
              opacity: tid === firstActiveTid ? 1 : 0,
              duration: FADE_DUR,
              overwrite: 'auto',
            });
          });
        }
      });
      startCyclingForActive(active);
    }
  });

  // ── Spread-on-hover ────────────────────────────────────────────────────
  const SPREAD_RADIUS = 80;
  const SPREAD_MAX = 38;
  const HOVER_ZONE = 40;

  let spreading = false;
  let driftBounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  let atomZoneTargetY = atoms.map(() => 0);

  function handleContainerMouseEnter() {
    if (!animationReady) return;
    spreading = true;
    gsap.killTweensOf(imgEls);
    gsap.to(imgEls, { x: 0, y: 0, opacity: 0.6, duration: 0.25, overwrite: true });
  }

  function handleContainerMouseMove(e) {
    if (!spreading) return;
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    atoms.forEach((_, idx) => {
      const el = imgEls[idx];
      const curX = Number(gsap.getProperty(el, 'x')) || 0;
      const curY = Number(gsap.getProperty(el, 'y')) || 0;
      const distCur = Math.sqrt(
        (positions[idx].x + curX - mx) ** 2 + (positions[idx].y + curY - my) ** 2,
      );
      if (distCur < HOVER_ZONE) return;

      const dx = positions[idx].x - mx;
      const dy = positions[idx].y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < SPREAD_RADIUS && dist > 0) {
        const t = 1 - dist / SPREAD_RADIUS;
        gsap.to(el, {
          x: (dx / dist) * SPREAD_MAX * t,
          y: (dy / dist) * SPREAD_MAX * t,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      }
    });
  }

  function handleContainerMouseLeave() {
    if (!spreading) return;
    spreading = false;
    gsap.to(imgEls, {
      x: 0,
      y: 0,
      opacity: 0.6,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
      onComplete: () => {
        if (!spreading) {
          breathe();
          startDrift();
        }
      },
    });
  }
</script>

<div
  bind:this={container}
  class="relative"
  style:width="{width}px"
  style:height="{height}px"
  role="region"
  aria-label="Stories visualization"
  onmouseenter={handleContainerMouseEnter}
  onmousemove={handleContainerMouseMove}
  onmouseleave={handleContainerMouseLeave}
>
  <!-- Atoms -->
  {#each atoms as atom, idx}
    {@const has1 = hasImpact(atom.story, 1)}
    {@const has2 = hasImpact(atom.story, 2)}
    {@const has3 = hasImpact(atom.story, 3)}
    {@const btnW = has3 ? halo3W : has2 ? halo2W : has1 ? halo1W : atomW}
    {@const btnH = has3 ? halo3H : has2 ? halo2H : has1 ? halo1H : atomH}
    <button
      bind:this={imgEls[idx]}
      type="button"
      class="absolute border-none bg-transparent p-0 cursor-pointer"
      style:left="{positions[idx].x - btnW / 2}px"
      style:top="{positions[idx].y + atomH / 2 - btnH}px"
      style:width="{btnW}px"
      style:height="{btnH}px"
      style="opacity: 0;"
      onmouseenter={() => {
        if (!animationReady) return;
        if (clickedIndex !== -1 && clickedIndex !== idx) return;
        gsap.to(imgEls[idx], { opacity: 1, duration: 0.3, overwrite: 'auto' });
        showTooltip(atom, idx);
      }}
      onmouseleave={() => {
        if (clickedIndex !== -1 && clickedIndex !== idx) return;
        if (clickedIndex === idx) return;
        gsap.to(imgEls[idx], { opacity: 0.6, duration: 0.4, overwrite: 'auto' });
        hideTooltip(idx);
      }}
      onclick={(e) => {
        e.stopPropagation();
        clickTooltip(atom, idx);
      }}
    >
      <!-- Default layer -->
      <div bind:this={defaultLayerRefs[idx]} class="absolute inset-0 pointer-events-none">
        {#if has3}
          <img
            src={HaloImpact3}
            alt=""
            class="absolute bottom-0 left-1/2 -translate-x-1/2"
            style:width="{halo3W}px"
            style:height="{halo3H}px"
          />
        {/if}
        {#if has2}
          <img
            src={HaloImpact2}
            alt=""
            class="absolute bottom-0 left-1/2 -translate-x-1/2"
            style:width="{halo2W}px"
            style:height="{halo2H}px"
          />
        {/if}
        {#if has1}
          <img
            src={HaloImpact1}
            alt=""
            class="absolute bottom-0 left-1/2 -translate-x-1/2"
            style:width="{halo1W}px"
            style:height="{halo1H}px"
          />
        {/if}
        <img
          src={Atom}
          alt={atom.story['Name (ENG - free translation) ']}
          class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4"
          style:width="{atomW}px"
          style:height="{atomH}px"
        />
      </div>
      <!-- Theme layers -->
      {#each atomThemeIds[idx] as tid, t}
        <div
          bind:this={themeLayerRefs[idx][t]}
          class="absolute inset-0 pointer-events-none"
          style="opacity: 0;"
        >
          {#if has3 && HALO_IMGS[tid]?.[3]}
            <img
              src={HALO_IMGS[tid][3]}
              alt=""
              class="absolute bottom-0 left-1/2 -translate-x-1/2"
              style:width="{halo3W}px"
              style:height="{halo3H}px"
            />
          {/if}
          {#if has2 && HALO_IMGS[tid]?.[2]}
            <img
              src={HALO_IMGS[tid][2]}
              alt=""
              class="absolute bottom-0 left-1/2 -translate-x-1/2"
              style:width="{halo2W}px"
              style:height="{halo2H}px"
            />
          {/if}
          {#if has1 && HALO_IMGS[tid]?.[1]}
            <img
              src={HALO_IMGS[tid][1]}
              alt=""
              class="absolute bottom-0 left-1/2 -translate-x-1/2"
              style:width="{halo1W}px"
              style:height="{halo1H}px"
            />
          {/if}
          <img
            src={ATOM_IMGS[tid]}
            alt=""
            class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4"
            style:width="{atomW}px"
            style:height="{atomH}px"
          />
        </div>
      {/each}
    </button>
  {/each}

  <!-- Global outlet labels: top-left -->
  {#each GLOBAL_LEFT_LABELS as label, i}
    <div
      bind:this={globalLeftLabelEls[i]}
      class="absolute text-[16px] leading-9 font-medium text-grey-800 whitespace-nowrap tracking-[3%] pointer-events-none text-left"
      style:left="{globalLeftPositions[i].x}px"
      style:top="{globalLeftPositions[i].y}px"
      style="transform: translate(0%, -50%); opacity: 0;"
    >
      {label}
    </div>
  {/each}

  <!-- Global outlet labels: top-right -->
  {#each GLOBAL_RIGHT_LABELS as label, i}
    <div
      bind:this={globalRightLabelEls[i]}
      class="absolute text-[16px] leading-9 font-medium text-grey-800 whitespace-nowrap tracking-[3%] pointer-events-none text-right"
      style:left="{globalRightPositions[i].x}px"
      style:top="{globalRightPositions[i].y}px"
      style="transform: translate(-100%, -50%); opacity: 0;"
    >
      {label}
    </div>
  {/each}

  <!-- Local outlet labels: bottom-left -->
  {#each LOCAL_LEFT_LABELS as label, i}
    <div
      bind:this={localLeftLabelEls[i]}
      class="absolute text-[16px] leading-9 font-medium text-grey-800 whitespace-nowrap tracking-[3%] pointer-events-none text-left"
      style:left="{localLeftPositions[i].x}px"
      style:top="{localLeftPositions[i].y}px"
      style="transform: translate(0%, -50%); opacity: 0;"
    >
      {label}
    </div>
  {/each}

  <!-- Local outlet labels: bottom-center -->
  {#each LOCAL_CENTER_LABELS as label, i}
    <div
      bind:this={localCenterLabelEls[i]}
      class="absolute text-[16px] leading-9 font-medium text-grey-800 whitespace-nowrap tracking-[3%] pointer-events-none text-center"
      style:left="{localCenterPositions[i].x}px"
      style:top="{localCenterPositions[i].y}px"
      style="transform: translate(-50%, -50%); opacity: 0;"
    >
      {label}
    </div>
  {/each}

  <!-- Local outlet labels: bottom-right -->
  {#each LOCAL_RIGHT_LABELS as label, i}
    <div
      bind:this={localRightLabelEls[i]}
      class="absolute text-[16px] leading-9 font-medium text-grey-800 whitespace-nowrap tracking-[3%] pointer-events-none text-right"
      style:left="{localRightPositions[i].x}px"
      style:top="{localRightPositions[i].y}px"
      style="transform: translate(-100%, -50%); opacity: 0;"
    >
      {label}
    </div>
  {/each}

  <!-- Tooltip -->
  {#if tooltip.visible}
    <svelte:element
      this={tooltip.expanded ? 'a' : 'div'}
      transition:fly={{ y: 6, duration: 180 }}
      class="tooltip absolute z-10 max-w-60 px-3 py-2 text-sm leading-5"
      class:pointer-events-none={!tooltip.expanded}
      class:cursor-pointer={tooltip.expanded}
      href={tooltip.expanded ? tooltip.url : undefined}
      target={tooltip.expanded ? '_blank' : undefined}
      rel={tooltip.expanded ? 'noopener noreferrer' : undefined}
      style:left="{tooltip.x}px"
      style:top="{tooltip.y + 10}px"
      style="transform: translate(0%, -50%);"
    >
      {tooltip.text}
      {#if tooltip.expanded}
        {#if tooltip.themeIds?.length}
          <div style="width: 68px; height: 1px;" class="my-2 bg-grey-400"></div>
          <div class="mt-2 flex flex-col gap-1">
            {#each tooltip.themeIds as tid}
              {@const theme = themes.find((t) => t.id === tid)}
              <div class="flex items-center gap-1.5">
                <span>{theme.label.replace('\n', ' ')}</span>
              </div>
            {/each}
          </div>
        {/if}
        <div style="width: 68px; height: 1px;" class="my-2 bg-grey-400"></div>
        <div class="mt-1.5">
          By <span class="font-semibold">{tooltip.journalist}</span>, {tooltip.date}
        </div>
      {/if}
    </svelte:element>
  {/if}
</div>
