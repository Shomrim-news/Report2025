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

  import { marginalizedStories } from '$lib/data/marginalized.js';
  import { stories } from '$lib/data/stories.js';
  import { themes, getThemeIds } from '$lib/data/themes.js';

  let { width = 0, height = 0 } = $props();

  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const MONTH_LABELS = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const ASPECT = 88 / 56;
  const BAND_LABEL_H = 10;
  const BAND_GAP = 20;

  // Join marginalized stories with main stories by # / _2025 for theme IDs and journalist/URL
  const storyById = new Map(stories.map((s) => [s['_2025'], s]));

  function hasImpact(story, level) {
    return (story['Impact level'] || '')
      .split(',')
      .map((x) => x.trim())
      .includes(String(level));
  }

  function maxLevel(s) {
    const levels = (s['Impact level'] || '')
      .split(',')
      .map((x) => parseInt(x.trim()))
      .filter((n) => !isNaN(n));
    return levels.length > 0 ? Math.max(...levels) : null;
  }

  // Handles both "D-Mon-YYYY" and "DD/MM/YYYY" date formats
  function monthIndex(s) {
    const date = s['Date'] || '';
    if (date.includes('/')) {
      const m = parseInt(date.split('/')[1]);
      return isNaN(m) ? -1 : m - 1;
    }
    return MONTHS.indexOf(date.split('-')[1] ?? '');
  }

  const bandDefs = [
    {
      label: 'Accountability in Action',
      test: (s) => {
        const m = maxLevel(s);
        return m === 2 || m === 3;
      },
    },
    { label: 'Media Reach', test: (s) => maxLevel(s) === 1 },
    { label: 'Public Exposure', test: (s) => maxLevel(s) === null },
  ];

  // Build enriched atoms list joining marginalized CSV with main stories
  const enrichedStories = marginalizedStories.map((s) => {
    const full = storyById.get(s['#']);
    return {
      ...s,
      themeIds: full ? getThemeIds(full) : [],
      journalist: full?.['Journalist'] ?? '',
      url: full?.['URL Shomrim'] ?? '',
    };
  });

  const bandGroups = bandDefs.map((def) => {
    const byMonth = Array.from({ length: 12 }, () => []);
    enrichedStories.forEach((s) => {
      if (def.test(s)) {
        const m = monthIndex(s);
        if (m >= 0) byMonth[m].push(s);
      }
    });
    return byMonth;
  });

  const atoms = [];
  bandDefs.forEach((_, bandIdx) => {
    bandGroups[bandIdx].forEach((monthStories, monthIdx) => {
      monthStories.forEach((story) => atoms.push({ story, bandIdx, monthIdx }));
    });
  });

  const bandCounts = bandDefs.map((_, i) => bandGroups[i].flat().length);
  const jitterX = atoms.map(() => (Math.random() - 0.5) * 25);
  const jitterY = atoms.map(() => (Math.random() - 0.5) * 8);

  // Theme image lookup tables
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

  const byTheme = new Map(themes.map((t) => [t.id, []]));
  atoms.forEach(({ story }, atomIdx) => {
    story.themeIds.forEach((tid, layerIdx) => byTheme.get(tid)?.push({ atomIdx, layerIdx }));
  });

  // ── Layout ────────────────────────────────────────────────────────────
  const COLS = 25;
  const OVERLAP = 24;
  const PADDING_X = 80;

  let innerWidth = $derived(width - 2 * PADDING_X);
  let colW = $derived(innerWidth / 12);
  let bandH = $derived(
    (height - 58 - bandDefs.length * (BAND_LABEL_H + BAND_GAP)) / bandDefs.length,
  );
  let atomW = $derived(((width + OVERLAP * (COLS - 1)) / COLS) * 0.8);
  let atomH = $derived(atomW * ASPECT);
  let scale = $derived(atomW / 56);
  let halo1W = $derived(92 * scale);
  let halo1H = $derived(102 * scale);
  let halo2W = $derived(122 * scale);
  let halo2H = $derived(136 * scale);
  let halo3W = $derived(162 * scale);
  let halo3H = $derived(180 * scale);

  let positions = $state(atoms.map(() => ({ x: 0, y: 0 })));

  $effect(() => {
    if (width === 0 || height === 0) return;
    const halfH = atomH / 2;
    const nodes = atoms.map((atom) => {
      const bandTop = atom.bandIdx * (bandH + BAND_LABEL_H + BAND_GAP);
      const tx = PADDING_X + atom.monthIdx * colW + colW / 2;
      const ty = bandTop + bandH / 2;
      return { x: tx, y: ty, tx, ty, bandTop, bandBottom: bandTop + bandH };
    });
    forceSimulation(nodes)
      .force('x', forceX((d) => d.tx).strength(1))
      .force('y', forceY((d) => d.ty).strength(0.1))
      .force('collide', forceCollide(24))
      .force('bound', () => {
        for (const node of nodes) {
          node.y = Math.max(node.bandTop + halfH, Math.min(node.bandBottom - halfH, node.y));
        }
      })
      .stop()
      .tick(300);
    positions = nodes.map(({ x, y, bandTop, bandBottom }, i) => ({
      x: x + jitterX[i],
      y: Math.max(bandTop + halfH, Math.min(bandBottom - halfH, y + jitterY[i])),
    }));
  });

  // ── GSAP refs ─────────────────────────────────────────────────────────
  let container;
  let imgEls = [];
  let monthLabelEls = [];
  let bandLabelEls = [];
  let defaultLayerRefs = [];
  let themeLayerRefs = atoms.map(() => []);
  let legendItemRefs = [];
  let themesHeaderEl;
  let deactivateBtnEl;
  let ctx;
  let themeCycleTls = [];
  let activateTl = null;
  let deactivateTl = null;

  let animationReady = $state(false);
  let themesActivated = $state(false);
  let selectedThemeId = $state(null);

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
  });
  let clickedIndex = $state(-1);

  function tooltipPos(idx) {
    return { x: positions[idx].x, y: positions[idx].y };
  }

  function showTooltip(atom, idx) {
    const { x, y } = tooltipPos(idx);
    tooltip = { ...tooltip, visible: true, text: atom.story['Title'], x, y };
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
    const { x, y } = tooltipPos(idx);
    tooltip = {
      ...tooltip,
      visible: true,
      expanded: true,
      text: atom.story['Title'],
      journalist: atom.story.journalist,
      date: atom.story['Date'],
      url: atom.story.url,
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
    };
  });

  // ── Animation ─────────────────────────────────────────────────────────
  function runAnimation() {
    const byMonth = Array.from({ length: 12 }, () => []);
    atoms.forEach((atom, idx) => byMonth[atom.monthIdx].push(imgEls[idx]));

    ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: breathe });

      tl.fromTo(
        monthLabelEls,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.07 },
        0,
      );
      tl.fromTo(
        [...bandLabelEls].reverse(),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.3 },
        0.7,
      );
      byMonth.forEach((els, m) => {
        if (els.length === 0) return;
        tl.fromTo(
          els,
          { opacity: 0, y: 10 },
          { opacity: 0.6, y: 0, duration: 1, ease: 'power2.out' },
          1.8 + m * 0.18,
        );
      });
    });
  }

  function breathe() {
    animationReady = true;
    gsap.killTweensOf(imgEls);
    gsap.to(imgEls, {
      y: '+=10',
      opacity: 0.45,
      duration: 3.5,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'center' },
      repeat: -1,
      yoyo: true,
    });
  }

  // ── Theme activation ──────────────────────────────────────────────────
  function activateThemes() {
    deactivateTl?.kill();
    deactivateTl = null;
    themesActivated = true;
    gsap.killTweensOf(imgEls);
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
    atoms.forEach(({ story }, atomIdx) => {
      const themeIds = story.themeIds;
      if (themeIds.length < 2) return;
      const orderedLayers = themes
        .filter((t) => themeIds.includes(t.id))
        .map((t) => themeLayerRefs[atomIdx][themeIds.indexOf(t.id)]);
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
      atoms.forEach(({ story }, idx) => {
        gsap.to(imgEls[idx], {
          opacity: story.themeIds.includes(themeId) ? 0.8 : 0.15,
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
    gsap.to(imgEls, {
      x: 0,
      y: 0,
      ...(themesActivated ? {} : { opacity: 0.6 }),
      duration: 0.25,
      overwrite: true,
    });
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
      const ax = positions[idx].x + curX;
      const ay = positions[idx].y + curY;
      if (Math.sqrt((ax - mx) ** 2 + (ay - my) ** 2) < HOVER_ZONE) return;

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
      ...(themesActivated ? {} : { opacity: 0.6 }),
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
      onComplete: () => {
        if (!spreading && !themesActivated) breathe();
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
          alt={atom.story['Title']}
          class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4"
          style:width="{atomW}px"
          style:height="{atomH}px"
        />
      </div>
      <!-- Theme layers -->
      {#each atom.story.themeIds as tid, t}
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

  <!-- Band labels -->
  {#each bandDefs as band, bandIdx}
    <div
      bind:this={bandLabelEls[bandIdx]}
      class="absolute text-[16px] font-medium text-center text-grey-800 tracking-[3%]"
      style:top="{bandIdx * (bandH + BAND_LABEL_H + BAND_GAP) + bandH}px"
      style:left="0"
      style:width="{width}px"
      style="opacity: 0;"
    >
      {band.label}
      <span class="text-sm font-normal">({bandCounts[bandIdx]} Stories)</span>
    </div>
  {/each}

  <!-- Month labels -->
  {#each MONTH_LABELS as label, m}
    <div
      bind:this={monthLabelEls[m]}
      class="absolute text-[11px] text-center text-grey-800 tracking-[3%]"
      style:left="{PADDING_X + m * colW}px"
      style:width="{colW}px"
      style:top="{height - 48}px"
      style="opacity: 0;"
    >
      {label}
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
      class="absolute z-50 bottom-5.25 -left-40 text-[11px] font-semibold text-grey-800 tracking-[3%] uppercase border border-grey-800 px-3 py-1.5 cursor-pointer bg-transparent hover:-translate-y-1 transition-transform duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
            class="whitespace-pre-line text-left text-[11px] leading-4.5 text-grey-800 uppercase pb-1 max-w-25"
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
      this={tooltip.expanded && tooltip.url ? 'a' : 'div'}
      transition:fly={{ y: 6, duration: 180 }}
      class="tooltip absolute z-10 max-w-60 px-3 py-2 text-sm leading-5"
      class:pointer-events-none={!tooltip.expanded}
      class:cursor-pointer={tooltip.expanded && !!tooltip.url}
      href={tooltip.expanded && tooltip.url ? tooltip.url : undefined}
      target={tooltip.expanded && tooltip.url ? '_blank' : undefined}
      rel={tooltip.expanded && tooltip.url ? 'noopener noreferrer' : undefined}
      style:left="{tooltip.x}px"
      style:top="{tooltip.y + 10}px"
      style="transform: translate(0%, -50%);"
    >
      {tooltip.text}
      {#if tooltip.expanded}
        <div style="width: 68px; height: 1px;" class="my-2 bg-grey-400"></div>
        <div class="mt-1.5">
          {#if tooltip.journalist}By <span class="font-semibold">{tooltip.journalist}</span
            >,{' '}{/if}{tooltip.date}
        </div>
      {/if}
    </svelte:element>
  {/if}
</div>
