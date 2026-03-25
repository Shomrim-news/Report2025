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

  const bandDefs = [
    {
      label: 'Accountability in Action',
      test: (s) => {
        const m = maxLevel(s);
        return m === 2 || m === 3;
      },
    },
    { label: 'Public Exposure', test: (s) => maxLevel(s) === null },
    { label: 'Media Reach', test: (s) => maxLevel(s) === 1 },
  ];

  function monthIndex(s) {
    return MONTHS.indexOf(s['Date']?.split('-')[1] ?? '');
  }

  const bandGroups = bandDefs.map((def) => {
    const byMonth = Array.from({ length: 12 }, () => []);
    stories.forEach((s) => {
      if (def.test(s)) {
        const m = monthIndex(s);
        if (m >= 0) byMonth[m].push(s);
      }
    });
    return byMonth;
  });

  // Flat atoms list
  const atoms = [];
  bandDefs.forEach((_, bandIdx) => {
    bandGroups[bandIdx].forEach((monthStories, monthIdx) => {
      monthStories.forEach((story, j) => atoms.push({ story, bandIdx, monthIdx, j }));
    });
  });

  const jitterX = atoms.map(() => (Math.random() - 0.5) * 25);
  const jitterY = atoms.map(() => (Math.random() - 0.5) * 8);

  // Same atom size as Question1Viz
  const COLS = 25;
  const OVERLAP = 24;
  const PADDING_X = 80;
  let innerWidth = $derived(width - 2 * PADDING_X);
  let colW = $derived(innerWidth / 12);
  const bandCounts = bandDefs.map((_, i) => bandGroups[i].flat().length);

  // Bands fill remaining height, leaving 48px for month labels + 30px gap above last band label
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

  // d3-force positions — re-run whenever layout dimensions change
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

  // Pre-computed theme data
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
    tids.forEach((tid, layerIdx) => {
      byTheme.get(tid)?.push({ atomIdx, layerIdx });
    });
  });

  // GSAP
  let container;
  let imgEls = [];
  let monthLabelEls = [];
  let bandLabelEls = [];
  let ctx;

  let defaultLayerRefs = [];
  let themeLayerRefs = atoms.map(() => []);
  let legendItemRefs = [];

  // Reactive active theme state
  let activeThemeId = $state(null);
  let activeThemeStories = $derived(byTheme.get(activeThemeId)?.length ?? 0);
  let activeThemePct = $derived(Math.round((activeThemeStories / atoms.length) * 100));
  let activeThemeName = $derived(
    themes.find((t) => t.id === activeThemeId)?.label.replace('\n', ' / ') ?? '',
  );

  // Tooltip (same structure as Question1Viz)
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
  let selectedThemeId = $state(null);

  function tooltipPos(idx) {
    return { x: positions[idx].x, y: positions[idx].y };
  }

  function showTooltip(atom, idx) {
    const { x, y } = tooltipPos(idx);
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
    const { x, y } = tooltipPos(idx);
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

  function runAnimation() {
    const THEME_INTERVAL = 1.5;
    const FADE_DUR = 0.6;

    ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: startCycling });
      const currentLayer = atoms.map(() => -1); // -1 = default layer

      // Month labels fade in
      tl.fromTo(
        monthLabelEls,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.07 },
        0,
      );

      // Band labels appear
      tl.fromTo(
        [...bandLabelEls].reverse(),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.3 },
        0.7,
      );

      themes.forEach((theme, themeIdx) => {
        const t = themeIdx * THEME_INTERVAL;

        // Legend item fades in
        tl.fromTo(
          legendItemRefs[themeIdx],
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          t,
        );

        // Update active theme label
        tl.call(
          () => {
            activeThemeId = theme.id;
          },
          [],
          t,
        );

        // Crossfade stories to this theme
        for (const { atomIdx, layerIdx } of byTheme.get(theme.id) ?? []) {
          if (currentLayer[atomIdx] === -1) {
            tl.to(
              defaultLayerRefs[atomIdx],
              { opacity: 0, duration: FADE_DUR, ease: 'power2.inOut' },
              t,
            );
          } else {
            tl.to(
              themeLayerRefs[atomIdx][currentLayer[atomIdx]],
              { opacity: 0, duration: FADE_DUR, ease: 'power2.inOut' },
              t,
            );
          }
          tl.to(
            themeLayerRefs[atomIdx][layerIdx],
            { opacity: 1, duration: FADE_DUR, ease: 'power2.inOut' },
            t,
          );
          currentLayer[atomIdx] = layerIdx;
        }
      });

      // Clear active theme label
      tl.call(
        () => {
          activeThemeId = null;
        },
        [],
        themes.length * THEME_INTERVAL + 1.0,
      );
    });
  }

  function startCycling() {
    const holdDur = 2;
    const transitionDur = 0.8;

    atoms.forEach((atom, atomIdx) => {
      const tids = atomThemeIds[atomIdx];
      if (tids.length < 2) return;

      const orderedLayers = themes
        .filter((t) => tids.includes(t.id))
        .map((t) => themeLayerRefs[atomIdx][tids.indexOf(t.id)]);

      const n = orderedLayers.length;
      const cycleTl = gsap.timeline({ repeat: -1, delay: Math.random() * holdDur });

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
</script>

<div bind:this={container} class="relative" style:width="{width}px" style:height="{height}px">
  {#if activeThemeId}
    {#key activeThemeId}
      <div
        in:fly={{ y: -4, duration: 200 }}
        class="absolute top-10 left-10 z-10 flex gap-2 items-end"
      >
        <div
          style:width="8px"
          style:height="60px"
          style:background-color={themes.find((theme) => theme.id === activeThemeId).color}
        ></div>
        <div class="flex flex-col -mb-1 text-md">
          <div class="font-semibold leading-8.5 whitespace-pre-line">
            {activeThemeName}
          </div>
          <div class="text-grey-800 leading-5">
            {activeThemeStories} stories · {activeThemePct}% of total stories
          </div>
        </div>
      </div>
    {/key}
  {/if}

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
      style="opacity: 0.6;"
      onmouseenter={() => {
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

  {#each bandDefs as band, bandIdx}
    <div
      bind:this={bandLabelEls[bandIdx]}
      class="absolute text-md font-medium text-center text-grey-800"
      style:top="{bandIdx * (bandH + BAND_LABEL_H + BAND_GAP) + bandH}px"
      style:left="0"
      style:width="{width}px"
      style="opacity: 0;"
    >
      {band.label} <span class="text-sm font-normal">({bandCounts[bandIdx]} Stories)</span>
    </div>
  {/each}

  {#each MONTH_LABELS as label, m}
    <div
      bind:this={monthLabelEls[m]}
      class="absolute text-[11px] text-center text-grey-800"
      style:left="{PADDING_X + m * colW}px"
      style:width="{colW}px"
      style:top="{height - 48}px"
      style="opacity: 0;"
    >
      {label}
    </div>
  {/each}

  <!-- Theme color legend: bottom-left -->
  <div class="absolute bottom-5.25 -left-40">
    <div class="mb-3.5 ml-4 text-[11px] font-semibold tracking-widest text-grey-800">THEMES</div>
    <div class="flex flex-col gap-0.5">
      {#each themes as theme, themeIdx}
        <button
          bind:this={legendItemRefs[themeIdx]}
          onclick={() => selectTheme(theme.id)}
          type="button"
          class="flex items-end gap-2 cursor-pointer bg-transparent border-none p-0 text-left"
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

  {#if tooltip.visible}
    <svelte:element
      this={tooltip.expanded ? 'a' : 'div'}
      transition:fly={{ y: 6, duration: 180 }}
      class="absolute z-10 max-w-60 px-3 py-2 text-sm leading-5"
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
