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

  import { empathyStories } from '$lib/data/empathy.js';
  import { stories } from '$lib/data/stories.js';
  import { themes, getThemeIds } from '$lib/data/themes.js';

  let { width = 0, height = 0 } = $props();

  // ── Orientation zones ─────────────────────────────────────────────────
  const ORIENTATIONS = [
    {
      key: 'Systems-oriented',
      title: 'Systems',
      align: 'left',
      desc: 'Institution-heavy stories where policy and power stay mostly above the surface of everyday life.',
    },
    {
      key: 'Collision zone',
      title: 'Where systems touch bodies',
      align: 'center',
      desc: 'Stories where institutional decisions land on real people. This is where empathy peaks.',
    },
    {
      key: 'Bodies-oriented',
      title: 'Bodies',
      align: 'right',
      desc: 'Lived-experience stories rooted in vulnerability, with hardly systems presence.',
    },
  ];

  // Join empathy stories with main stories (by ID) to get theme data
  const storyById = new Map(stories.map((s) => [s['_2025'], s]));

  const atoms = empathyStories
    .map((story) => {
      const fullStory = storyById.get(story['ID']);
      return {
        story,
        orientIdx: ORIENTATIONS.findIndex((o) => o.key === story['Narrative orientation']),
        themeIds: fullStory ? getThemeIds(fullStory) : [],
      };
    })
    .filter((a) => a.orientIdx !== -1);

  const counts = ORIENTATIONS.map((_, oi) => atoms.filter((a) => a.orientIdx === oi).length);

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
  atoms.forEach(({ themeIds }, atomIdx) => {
    themeIds.forEach((tid, layerIdx) => byTheme.get(tid)?.push({ atomIdx, layerIdx }));
  });

  function hasImpact(story, level) {
    return (story['Impact level'] || '')
      .split(',')
      .map((x) => x.trim())
      .includes(String(level));
  }

  // ── Layout constants ──────────────────────────────────────────────────
  const ASPECT = 88 / 56;
  const LABEL_MARGIN = 80;
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

  // Cluster centers: x at 15/50/85% width, y at 40% height + per-cluster offset
  const CLUSTER_XS = [0.15, 0.5, 0.85];
  const CLUSTER_Y_BASE = 0.4;
  const CLUSTER_Y_OFFSETS = [250, 100, 100];

  let positions = $state(atoms.map(() => ({ x: 0, y: 0 })));
  let lastW = 0;
  let lastH = 0;

  $effect(() => {
    const w = Math.round(width);
    const h = Math.round(height);
    if (w === 0 || h === 0) return;
    if (w === lastW && h === lastH) return;
    lastW = w;
    lastH = h;

    const labelAreaTop = h - 200;
    const PAD = 30;
    const newPositions = atoms.map(() => ({ x: 0, y: 0 }));

    ORIENTATIONS.forEach((_, oi) => {
      const idxs = atoms.map((a, i) => (a.orientIdx === oi ? i : -1)).filter((i) => i >= 0);
      if (idxs.length === 0) return;
      const cx = w * CLUSTER_XS[oi];
      const cy = h * CLUSTER_Y_BASE + CLUSTER_Y_OFFSETS[oi];
      const nodes = idxs.map(() => ({
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 40,
      }));
      forceSimulation(nodes)
        .force('x', forceX(cx).strength(0.4))
        .force('y', forceY(cy).strength(0.3))
        .force('collide', forceCollide(40))
        .force('bound', () => {
          for (const node of nodes) {
            node.x = Math.max(PAD, Math.min(w - PAD, node.x));
            node.y = Math.max(PAD, Math.min(labelAreaTop, node.y));
          }
        })
        .stop()
        .tick(200);
      idxs.forEach((atomIdx, ni) => {
        newPositions[atomIdx] = { x: nodes[ni].x, y: nodes[ni].y };
      });
    });

    positions = newPositions;
  });

  // ── GSAP refs ─────────────────────────────────────────────────────────
  let container;
  let imgEls = [];
  let labelEls = [];
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
  let intersected = $state(false);
  let animationStarted = false;

  $effect(() => {
    if (intersected && width > 0 && height > 0 && !animationStarted) {
      animationStarted = true;
      runAnimation();
    }
  });

  // ── Tooltip ───────────────────────────────────────────────────────────
  let tooltip = $state({
    visible: false,
    text: '',
    x: 0,
    y: 0,
    expanded: false,
    empathyScore: '',
  });
  let clickedIndex = $state(-1);

  function getTooltipPos(idx) {
    if (!container || !imgEls[idx]) return { x: 0, y: 0 };
    const cR = container.getBoundingClientRect();
    const eR = imgEls[idx].getBoundingClientRect();
    return { x: eR.left - cR.left + eR.width / 2, y: eR.top - cR.top + eR.height / 2 };
  }

  function showTooltip(idx) {
    const { x, y } = getTooltipPos(idx);
    tooltip = { ...tooltip, visible: true, text: atoms[idx].story['Title'], x, y };
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

  function clickTooltip(idx) {
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
    const story = atoms[idx].story;
    tooltip = {
      ...tooltip,
      visible: true,
      expanded: true,
      text: story['Title'],
      empathyScore: story['Empathy score'],
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
          intersected = true;
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
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: breathe });
      tl.fromTo(labelEls, { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.2 }, 0);
      tl.fromTo(
        imgEls,
        { opacity: 0, y: 10 },
        {
          opacity: 0.6,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: { amount: 2, from: 'start' },
        },
        0.5,
      );
    });
  }

  function breathe() {
    animationReady = true;
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
    atoms.forEach(({ themeIds }, atomIdx) => {
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
      atoms.forEach(({ themeIds }, idx) => {
        gsap.to(imgEls[idx], {
          opacity: themeIds.includes(themeId) ? 0.8 : 0.15,
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

  // ── Repulsion on hover ────────────────────────────────────────────────
  const SPREAD_RADIUS = 80;
  const SPREAD_MAX = 38;
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
  aria-label="Narrative orientation visualization"
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
        showTooltip(idx);
      }}
      onmouseleave={() => {
        if (clickedIndex !== -1 && clickedIndex !== idx) return;
        if (clickedIndex === idx) return;
        gsap.to(imgEls[idx], { opacity: 0.6, duration: 0.4, overwrite: 'auto' });
        hideTooltip(idx);
      }}
      onclick={(e) => {
        e.stopPropagation();
        clickTooltip(idx);
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
      {#each atom.themeIds as tid, t}
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

  <!-- Bottom labels -->
  {#each ORIENTATIONS as orient, i}
    <div
      bind:this={labelEls[i]}
      class="absolute pointer-events-none"
      class:text-left={orient.align === 'left'}
      class:text-center={orient.align === 'center'}
      class:text-right={orient.align === 'right'}
      style:left={orient.align === 'right'
        ? null
        : orient.align === 'center'
          ? `${width / 2}px`
          : `${LABEL_MARGIN}px`}
      style:right={orient.align === 'right' ? `${LABEL_MARGIN}px` : null}
      style:bottom="{LABEL_MARGIN}px"
      style="transform: {orient.align === 'center' ? 'translateX(-50%)' : 'none'}; opacity: 0;"
    >
      <div class="text-[16px] leading-5 font-semibold text-grey-800">{orient.title}</div>
      <div class="text-[14px] text-grey-600 mt-0.5">
        ({counts[i]}{counts[i] === 1 ? ' Story' : ' Stories'})
      </div>
      <div class="text-[11px] text-grey-500 mt-1.5 italic leading-4 max-w-37.5 mx-auto">
        {orient.desc}
      </div>
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

  <!-- Tooltip -->
  {#if tooltip.visible}
    <div
      transition:fly={{ y: 6, duration: 180 }}
      class="absolute z-10 max-w-60 px-3 py-2 text-sm leading-5"
      class:pointer-events-none={!tooltip.expanded}
      style:left="{tooltip.x}px"
      style:top="{tooltip.y + 10}px"
      style="transform: translate(0%, -50%);"
    >
      {tooltip.text}
      {#if tooltip.expanded}
        <div style="width: 68px; height: 1px;" class="my-2 bg-grey-400"></div>
        <div class="mt-1 text-xs text-grey-600">Empathy score: {tooltip.empathyScore}</div>
      {/if}
    </div>
  {/if}
</div>
