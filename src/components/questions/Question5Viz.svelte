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
  import Halo3Impact2 from '$lib/assets/halo_theme_3_impact_2.png';
  import Halo4Impact1 from '$lib/assets/halo_theme_4_impact_1.png';
  import Halo4Impact2 from '$lib/assets/halo_theme_4_impact_2.png';
  import Halo4Impact3 from '$lib/assets/halo_theme_4_impact_3.png';
  import Halo5Impact1 from '$lib/assets/halo_theme_5_impact_1.png';
  import Halo5Impact2 from '$lib/assets/halo_theme_5_impact_2.png';
  import Halo6Impact1 from '$lib/assets/halo_theme_6_impact_1.png';
  import Halo6Impact2 from '$lib/assets/halo_theme_6_impact_2.png';
  import Halo6Impact3 from '$lib/assets/halo_theme_6_impact_3.png';
  import Halo7Impact1 from '$lib/assets/halo_theme_7_impact_1.png';
  import Halo8Impact1 from '$lib/assets/halo_theme_8_impact_1.png';
  import Halo8Impact3 from '$lib/assets/halo_theme_8_impact_3.png';

  import { stories } from '$lib/data/stories.js';
  import { themes, getThemeIds } from '$lib/data/themes.js';

  let { width = 0, height = 0 } = $props();

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
    "B\u2019Hadrei Haredim": 'OtherLocal',
    'Channel Knesset': 'OtherLocal',
    'Galatz (Army Radio)': 'OtherLocal',
    'KAN 11': 'OtherLocal',
    Maariv: 'OtherLocal',
    'Reka Radio (KAN)': 'OtherLocal',
    'The Hottest Place in Hell': 'OtherLocal',
    'The Times of Israel': 'OtherLocal',
    Walla: 'OtherLocal',
    'Annahar (Lebanon)': 'OtherGlobal',
    'Channel 10': 'OtherLocal',
    'Channel 7 (Arutz Sheva)': 'OtherLocal',
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

  // Slots define the label text and outlet key for each side, in display order.
  // Outlets appearing on multiple sides (Calcalist, TheMarker, etc.) will produce
  // multiple target positions — atoms cycle between them.
  const TOP_SLOTS = [
    { key: 'Calcalist', label: 'Calcalist' },
    { key: 'N12_Mako', label: 'N12/Mako' },
    { key: 'Haaretz', label: 'Haaretz/\nHaaretz ENG' },
    { key: 'TheMarker', label: 'The Marker' },
  ];
  const BOTTOM_SLOTS = [
    { key: 'LaRepubblica', label: 'La Repubblica' },
    { key: 'LeMonde', label: 'Le Monde' },
    { key: 'Bloomberg', label: 'Bloomberg' },
    { key: 'DerSpiegel', label: 'Der Spiegel' },
    { key: 'Profil', label: 'Profil' },
    { key: 'AlMonitor', label: 'Al-Monitor' },
    { key: 'BBCArabic', label: 'BBC Arabic' },
    { key: 'SkyNewsArabic', label: 'Sky News Arabic' },
  ];
  const LEFT_SLOTS = [
    { key: 'Ynet', label: 'Ynet/Yedioth\nAhronoth' },
    { key: 'CorriereDellaSera', label: 'Corriere\ndella Sera' },
    { key: 'TheJapanTimes', label: 'The Japan\nTimes' },
  ];
  const RIGHT_SLOTS = [
    { key: 'OtherLocal', label: 'Other Local\nOutlets' },
    { key: 'OtherGlobal', label: 'Other Global\nOutlets' },
    { key: 'ICIJ', label: 'ICIJ' },
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

  // Count stories per outlet key (for label display)
  const storyCounts = {};
  atoms.forEach((atom) => {
    atom.outletKeys.forEach((key) => {
      storyCounts[key] = (storyCounts[key] || 0) + 1;
    });
  });

  function slotLabel(slot) {
    const n = storyCounts[slot.key] || 0;
    return n > 1 ? `${slot.label} (${n})` : slot.label;
  }

  function hasImpact(story, level) {
    return (story['Impact level'] || '')
      .split(',')
      .map((x) => x.trim())
      .includes(String(level));
  }

  // ── Layout constants ─────────────────────────────────────────────────
  const ASPECT = 88 / 56;
  const LABEL_MARGIN = 80; // labels live within 80px of each edge
  const CLUSTER_DEPTH = LABEL_MARGIN + 30; // cluster center is LABEL_MARGIN + CLUSTER_DEPTH from edge
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

  // ── Position state ──────────────────────────────────────────────────
  // positions[idx] = primary CSS position (first outlet slot, or center for no-outlet atoms)
  let positions = $state(atoms.map(() => ({ x: 0, y: 0 })));
  // allTargetPositions[idx] = all outlet slot positions for this atom (incl. primary at [0])
  let allTargetPositions = atoms.map(() => []);
  // centerOffsets[idx] = GSAP x/y offset to place atom at center visually
  let centerOffsets = atoms.map(() => ({ dx: 0, dy: 0 }));

  // Slot label positions (for rendering)
  let topSlotPos = $state(TOP_SLOTS.map(() => ({ lx: 0, ly: 0 })));
  let bottomSlotPos = $state(BOTTOM_SLOTS.map(() => ({ lx: 0, ly: 0 })));
  let leftSlotPos = $state(LEFT_SLOTS.map(() => ({ lx: 0, ly: 0 })));
  let rightSlotPos = $state(RIGHT_SLOTS.map(() => ({ lx: 0, ly: 0 })));

  let lastW = 0;
  let lastH = 0;

  $effect(() => {
    const w = Math.round(width);
    const h = Math.round(height);
    if (w === 0 || h === 0) return;
    if (w === lastW && h === lastH) return;
    lastW = w;
    lastH = h;

    const iW = w - 2 * LABEL_MARGIN;
    const iH = h - 6 * LABEL_MARGIN;

    // Compute slot positions (label center + cluster center)
    function slotPos(side, idx, total) {
      const frac = total === 1 ? 0.5 : idx / (total - 1);
      if (side === 'top') {
        return {
          lx: LABEL_MARGIN + frac * iW,
          ly: LABEL_MARGIN,
          cx: LABEL_MARGIN + frac * iW,
          cy: LABEL_MARGIN + CLUSTER_DEPTH,
        };
      }
      if (side === 'bottom') {
        return {
          lx: LABEL_MARGIN + frac * iW,
          ly: h - LABEL_MARGIN,
          cx: LABEL_MARGIN + frac * iW,
          cy: h - LABEL_MARGIN - CLUSTER_DEPTH + 30,
        };
      }
      if (side === 'left') {
        return {
          lx: 4 * LABEL_MARGIN,
          ly: 4 * LABEL_MARGIN + frac * iH,
          cx: LABEL_MARGIN + CLUSTER_DEPTH,
          cy: 4 * LABEL_MARGIN + frac * iH,
        };
      }
      // right
      return {
        lx: w - 2 * LABEL_MARGIN,
        ly: 4 * LABEL_MARGIN + frac * iH,
        cx: w - LABEL_MARGIN - CLUSTER_DEPTH,
        cy: 4 * LABEL_MARGIN + frac * iH,
      };
    }

    const topDefs = TOP_SLOTS.map((s, i) => ({
      ...s,
      side: 'top',
      ...slotPos('top', i, TOP_SLOTS.length),
    }));
    const botDefs = BOTTOM_SLOTS.map((s, i) => ({
      ...s,
      side: 'bottom',
      ...slotPos('bottom', i, BOTTOM_SLOTS.length),
    }));
    const FIRST_SIDE_OFFSET = 100;
    const sideTopCy = 4 * LABEL_MARGIN + FIRST_SIDE_OFFSET;        // Ynet / OtherLocal
    const calcalistCy = LABEL_MARGIN + CLUSTER_DEPTH;              // top-left anchor
    const gapTop = sideTopCy - calcalistCy;                        // Calcalist → Ynet gap
    const corriereCy = sideTopCy + gapTop;                         // same gap below Ynet
    const laRepubblicaLy = h - LABEL_MARGIN;                       // bottom label position
    const smallGap = (laRepubblicaLy - corriereCy) / 2;
    const japanTimesCy = corriereCy + smallGap;                     // midpoint Corriere → LaRepubblica

    const sideCys = [sideTopCy, corriereCy, japanTimesCy];

    const leftDefs = LEFT_SLOTS.map((s, i) => {
      const pos = slotPos('left', i, LEFT_SLOTS.length);
      pos.cy = sideCys[i];
      pos.ly = sideCys[i];
      return { ...s, side: 'left', ...pos };
    });
    const rightDefs = RIGHT_SLOTS.map((s, i) => {
      const pos = slotPos('right', i, RIGHT_SLOTS.length);
      pos.cy = sideCys[i];
      pos.ly = sideCys[i];
      return { ...s, side: 'right', ...pos };
    });

    topSlotPos = topDefs.map(({ lx, ly }) => ({ lx, ly }));
    bottomSlotPos = botDefs.map(({ lx, ly }) => ({ lx, ly }));
    leftSlotPos = leftDefs.map(({ lx, ly }) => ({ lx, ly }));
    rightSlotPos = rightDefs.map(({ lx, ly }) => ({ lx, ly }));

    const allSlotDefs = [...topDefs, ...botDefs, ...leftDefs, ...rightDefs];

    // d3-force simulation per slot
    const slotPosMap = new Map(); // `${side}-${key}` → Map(atomIdx → {x, y})
    allSlotDefs.forEach((slot) => {
      const id = `${slot.side}-${slot.key}`;
      const slotIdxs = atoms
        .map((a, i) => (a.outletKeys.includes(slot.key) ? i : -1))
        .filter((i) => i >= 0);
      if (slotIdxs.length === 0) return;
      const nodes = slotIdxs.map(() => ({
        x: slot.cx + (Math.random() - 0.5) * 30,
        y: slot.cy + (Math.random() - 0.5) * 30,
      }));
      const PAD = 30;
      forceSimulation(nodes)
        .force('x', forceX(slot.cx).strength(0.8))
        .force('y', forceY(slot.cy).strength(0.8))
        .force('collide', forceCollide(26))
        .force('bound', () => {
          for (const node of nodes) {
            node.x = Math.max(PAD, Math.min(w - PAD, node.x));
            node.y = Math.max(PAD, Math.min(h - PAD, node.y));
          }
        })
        .stop()
        .tick(200);
      const m = new Map();
      slotIdxs.forEach((atomIdx, ni) => m.set(atomIdx, { x: nodes[ni].x, y: nodes[ni].y }));
      slotPosMap.set(id, m);
    });

    // Center cluster for all atoms (migration starting point)
    const cx = w / 2;
    const cy = h / 2;
    const centerNodes = atoms.map(() => ({
      x: cx + (Math.random() - 0.5) * 20,
      y: cy + (Math.random() - 0.5) * 20,
    }));
    forceSimulation(centerNodes)
      .force('x', forceX(cx).strength(0.4))
      .force('y', forceY(cy).strength(0.4))
      .force('collide', forceCollide(26))
      .stop()
      .tick(300);

    // Build per-atom arrays
    const newPositions = [];
    const newAllTargets = [];
    const newCenterOffsets = [];

    atoms.forEach((atom, idx) => {
      const targets = [];
      allSlotDefs.forEach((slot) => {
        const pos = slotPosMap.get(`${slot.side}-${slot.key}`)?.get(idx);
        if (pos) targets.push({ x: pos.x, y: pos.y });
      });
      const primary =
        targets.length > 0 ? targets[0] : { x: centerNodes[idx].x, y: centerNodes[idx].y };
      newPositions.push(primary);
      newAllTargets.push(targets);
      newCenterOffsets.push({
        dx: centerNodes[idx].x - primary.x,
        dy: centerNodes[idx].y - primary.y,
      });
    });

    positions = newPositions;
    allTargetPositions = newAllTargets;
    centerOffsets = newCenterOffsets;
  });

  // ── Theme data ───────────────────────────────────────────────────────
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

  // ── GSAP refs ────────────────────────────────────────────────────────
  let container;
  let imgEls = [];
  let topLabelEls = [];
  let bottomLabelEls = [];
  let leftLabelEls = [];
  let rightLabelEls = [];
  let defaultLayerRefs = [];
  let themeLayerRefs = atoms.map(() => []);
  let legendItemRefs = [];
  let themesHeaderEl;
  let deactivateBtnEl;
  let ctx;
  let outletCycleTls = [];
  let themeCycleTls = [];
  let activateTl = null;
  let deactivateTl = null;

  let themesActivated = $state(false);
  let animationReady = $state(false);

  // ── Tooltip ──────────────────────────────────────────────────────────
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
  let selectedThemeId = $state(null);

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

  // ── Lifecycle ────────────────────────────────────────────────────────
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
    };
  });

  // ── Animation ────────────────────────────────────────────────────────
  function runAnimation() {
    // Place all atoms at center visually via GSAP x/y offset
    atoms.forEach((_, idx) => {
      gsap.set(imgEls[idx], { x: centerOffsets[idx].dx, y: centerOffsets[idx].dy, opacity: 0 });
    });

    const allLabelEls = [...topLabelEls, ...bottomLabelEls, ...leftLabelEls, ...rightLabelEls];

    ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: afterMigration });
      // Labels fade in
      tl.fromTo(allLabelEls, { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.04 }, 0);
      // Atoms appear at center
      tl.to(imgEls, { opacity: 0.6, duration: 0.8, ease: 'power2.out', stagger: 0.01 }, 0.6);
      // Migrate to outlet positions (x/y → 0 = CSS left/top position)
      tl.to(imgEls, { x: 0, y: 0, duration: 2.5, ease: 'power2.inOut', stagger: 0.008 }, 2);
    });
  }

  function afterMigration() {
    animationReady = true;
    breathe();
    startOutletCycling();
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

  function startOutletCycling() {
    const HOLD = 4;
    const TRANSITION = 2;
    atoms.forEach((_, idx) => {
      const targets = allTargetPositions[idx];
      if (!targets || targets.length < 2) return;
      const primary = positions[idx];
      // Express all targets as GSAP x/y offsets from the primary CSS position
      const offsets = targets.map((t) => ({ x: t.x - primary.x, y: t.y - primary.y }));
      const n = offsets.length;
      const cycleTl = gsap.timeline({ repeat: -1, delay: Math.random() * HOLD });
      outletCycleTls.push(cycleTl);
      for (let i = 0; i < n; i++) {
        const next = offsets[(i + 1) % n];
        cycleTl.to(
          imgEls[idx],
          { x: next.x, y: next.y, duration: TRANSITION, ease: 'sine.inOut' },
          i * (HOLD + TRANSITION) + HOLD,
        );
      }
    });
  }

  // ── Theme activation ─────────────────────────────────────────────────
  function activateThemes() {
    deactivateTl?.kill();
    deactivateTl = null;
    themesActivated = true;
    gsap.killTweensOf(imgEls);
    outletCycleTls.forEach((tl) => tl.kill());
    outletCycleTls = [];
    gsap.set(imgEls, { x: 0, y: 0, opacity: 0.6 });

    const THEME_INTERVAL = 0.7;
    const FADE_DUR = 0.6;
    const currentLayer = atoms.map(() => -1);
    activateTl = gsap.timeline({ onComplete: startThemeCycling });

    activateTl.fromTo(
      [themesHeaderEl, deactivateBtnEl],
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      0,
    );
    themes.forEach((theme, themeIdx) => {
      const t = themeIdx * THEME_INTERVAL;
      activateTl.fromTo(
        legendItemRefs[themeIdx],
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        t,
      );
      for (const { atomIdx, layerIdx } of byTheme.get(theme.id) ?? []) {
        if (currentLayer[atomIdx] === -1) {
          activateTl.to(
            defaultLayerRefs[atomIdx],
            { opacity: 0, duration: FADE_DUR, ease: 'power2.inOut' },
            t,
          );
        } else {
          activateTl.to(
            themeLayerRefs[atomIdx][currentLayer[atomIdx]],
            { opacity: 0, duration: FADE_DUR, ease: 'power2.inOut' },
            t,
          );
        }
        activateTl.to(
          themeLayerRefs[atomIdx][layerIdx],
          { opacity: 1, duration: FADE_DUR, ease: 'power2.inOut' },
          t,
        );
        currentLayer[atomIdx] = layerIdx;
      }
    });
  }

  function startThemeCycling() {
    const holdDur = 2;
    const transitionDur = 0.8;
    atoms.forEach((_, atomIdx) => {
      const tids = atomThemeIds[atomIdx];
      if (tids.length < 2) return;
      const orderedLayers = themes
        .filter((t) => tids.includes(t.id))
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

  function deactivateThemes() {
    deactivateTl?.kill();
    activateTl?.kill();
    activateTl = null;
    themeCycleTls.forEach((tl) => tl.kill());
    themeCycleTls = [];

    const FADE_DUR = 0.5;
    deactivateTl = gsap.timeline({
      onComplete: () => {
        deactivateTl = null;
        themesActivated = false;
        selectedThemeId = null;
        gsap.set(imgEls, { x: 0, y: 0 });
        breathe();
        startOutletCycling();
      },
    });
    const tl = deactivateTl;
    tl.to(
      [themesHeaderEl, deactivateBtnEl, ...legendItemRefs],
      { opacity: 0, duration: 0.3, stagger: 0.03 },
      0,
    );
    atoms.forEach((_, atomIdx) => {
      tl.to(
        defaultLayerRefs[atomIdx],
        { opacity: 1, duration: FADE_DUR, ease: 'power2.inOut' },
        0.2,
      );
      themeLayerRefs[atomIdx].forEach((el) => {
        if (el) tl.to(el, { opacity: 0, duration: FADE_DUR, ease: 'power2.inOut' }, 0.2);
      });
    });
  }

  function selectTheme(themeId) {
    if (selectedThemeId === themeId) {
      selectedThemeId = null;
      gsap.to(imgEls, { opacity: 0.6, duration: 0.4, overwrite: 'auto' });
      gsap.to(legendItemRefs, { opacity: 1, duration: 0.4, overwrite: 'auto' });
    } else {
      selectedThemeId = themeId;
      atoms.forEach((_, idx) => {
        gsap.to(imgEls[idx], {
          opacity: atomThemeIds[idx].includes(themeId) ? 0.8 : 0.15,
          duration: 0.4,
          overwrite: 'auto',
        });
      });
      themes.forEach((theme, themeIdx) => {
        gsap.to(legendItemRefs[themeIdx], {
          opacity: theme.id === themeId ? 1 : 0.15,
          duration: 0.4,
          overwrite: 'auto',
        });
      });
    }
  }

  // ── Spread-on-hover ───────────────────────────────────────────────────
  const SPREAD_RADIUS = 80;
  const SPREAD_MAX = 38;
  const HOVER_ZONE = 40;

  let spreading = false;

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
        if (!spreading && !themesActivated) {
          outletCycleTls.forEach((tl) => tl.kill());
          outletCycleTls = [];
          breathe();
          startOutletCycling();
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

  <!-- Top outlet labels -->
  {#each TOP_SLOTS as slot, i}
    {@const isFirst = i === 0}
    {@const isLast = i === TOP_SLOTS.length - 1}
    <div
      bind:this={topLabelEls[i]}
      class="absolute text-[16px] leading-5 font-medium text-grey-800 whitespace-pre-line pointer-events-none"
      class:text-left={isFirst}
      class:text-right={isLast}
      class:text-center={!isFirst && !isLast}
      style:left={isLast ? null : `${isFirst ? LABEL_MARGIN : topSlotPos[i].lx}px`}
      style:right={isLast ? `${LABEL_MARGIN}px` : null}
      style:top="{topSlotPos[i].ly}px"
      style="transform: {isFirst || isLast ? 'translateY(-50%)' : 'translate(-50%, -50%)'}; opacity: 0;"
    >
      {slotLabel(slot)}
    </div>
  {/each}

  <!-- Bottom outlet labels -->
  {#each BOTTOM_SLOTS as slot, i}
    {@const isFirst = i === 0}
    {@const isLast = i === BOTTOM_SLOTS.length - 1}
    <div
      bind:this={bottomLabelEls[i]}
      class="absolute text-[16px] leading-5 font-medium text-grey-800 whitespace-pre-line pointer-events-none"
      class:text-left={isFirst}
      class:text-right={isLast}
      class:text-center={!isFirst && !isLast}
      style:left={isLast ? null : `${isFirst ? LABEL_MARGIN : bottomSlotPos[i].lx}px`}
      style:right={isLast ? `${LABEL_MARGIN}px` : null}
      style:top="{bottomSlotPos[i].ly}px"
      style="transform: {isFirst || isLast ? 'translateY(-50%)' : 'translate(-50%, -50%)'}; opacity: 0;"
    >
      {slotLabel(slot)}
    </div>
  {/each}

  <!-- Left outlet labels -->
  {#each LEFT_SLOTS as slot, i}
    <div
      bind:this={leftLabelEls[i]}
      class="absolute text-[16px] leading-5 font-medium text-left text-grey-800 whitespace-pre-line pointer-events-none"
      style:left="{LABEL_MARGIN}px"
      style:top="{leftSlotPos[i].ly}px"
      style="transform: translateY(-50%); opacity: 0;"
    >
      {slotLabel(slot)}
    </div>
  {/each}

  <!-- Right outlet labels -->
  {#each RIGHT_SLOTS as slot, i}
    <div
      bind:this={rightLabelEls[i]}
      class="absolute text-[16px] leading-5 font-medium text-right text-grey-800 whitespace-pre-line pointer-events-none"
      style:right="{LABEL_MARGIN}px"
      style:top="{rightSlotPos[i].ly}px"
      style="transform: translateY(-50%); opacity: 0;"
    >
      {slotLabel(slot)}
    </div>
  {/each}

  <!-- "Activate themes" button -->
  {#if !themesActivated}
    <button
      in:fly={{ y: 4, duration: 300 }}
      out:fly={{ y: -4, duration: 300 }}
      onclick={activateThemes}
      type="button"
      disabled={!animationReady}
      class="absolute z-50 bottom-5.25 -left-40 text-[11px] font-semibold tracking-widest text-grey-800 uppercase border border-grey-800 px-3 py-1.5 cursor-pointer bg-transparent hover:-translate-y-1 transition-transform duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
    >
      Activate themes
    </button>
  {/if}

  <!-- Theme legend — always in DOM so GSAP can animate it; starts invisible -->
  <div class="absolute bottom-5.25 -left-40">
    <div class="mb-3.5 flex items-center gap-2">
      <button
        bind:this={deactivateBtnEl}
        onclick={deactivateThemes}
        type="button"
        class="text-grey-800 text-[11px] leading-none cursor-pointer bg-transparent border-none p-0"
        style="opacity: 0;"
        aria-label="Deactivate themes">✕</button
      >
      <div
        bind:this={themesHeaderEl}
        class="text-[11px] font-semibold tracking-widest text-grey-800"
        style="opacity: 0;"
      >
        THEMES
      </div>
    </div>
    <div class="flex flex-col gap-0.5">
      {#each themes as theme, themeIdx}
        <button
          bind:this={legendItemRefs[themeIdx]}
          onclick={() => selectTheme(theme.id)}
          disabled={!themesActivated}
          type="button"
          class="flex items-end gap-2 bg-transparent border-none p-0 text-left"
          class:cursor-pointer={themesActivated}
          class:cursor-default={!themesActivated}
          style="opacity: 0;"
        >
          <div style:width="8px" style:height="60px" style:background-color={theme.color}></div>
          <div
            class="whitespace-pre-line text-left text-[11px] leading-4.5 text-grey-800 uppercase pb-1"
          >
            {theme.label}
          </div>
        </button>
      {/each}
    </div>
  </div>

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
