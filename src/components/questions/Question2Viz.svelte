<script>
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

  import Atom from '$lib/assets/atom.png';
  import HaloImpact1 from '$lib/assets/halo_impact_1.png';
  import HaloImpact2 from '$lib/assets/halo_impact_2.png';
  import HaloImpact3 from '$lib/assets/halo_impact_3.png';
  import { stories } from '$lib/data/stories.js';

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
    { label: 'Media Reach', test: (s) => maxLevel(s) === 1 },
    { label: 'Public Exposure', test: (s) => maxLevel(s) === null },
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

  // GSAP
  let container;
  let imgEls = [];
  let monthLabelEls = [];
  let bandLabelEls = [];
  let ctx;

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
  let animationReady = $state(false);

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
    // Group imgEls by month for the column-by-column reveal
    const byMonth = Array.from({ length: 12 }, () => []);
    atoms.forEach((atom, idx) => byMonth[atom.monthIdx].push(imgEls[idx]));

    ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: breathe });

      // 1. Month labels fade in left to right
      tl.fromTo(
        monthLabelEls,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.07 },
        0,
      );

      // 2. Band labels appear bottom to top
      tl.fromTo(
        [...bandLabelEls].reverse(),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.3 },
        0.7,
      );

      // 3. Stories enter month by month (Jan → Dec), all bands simultaneously
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

  // ── Spread-on-hover ───────────────────────────────────────────────────
  const SPREAD_RADIUS = 80;
  const SPREAD_MAX = 38;
  const HOVER_ZONE = 40; // px — dead zone: atom won't flee once cursor is this close

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

      // Current rendered center of this atom (accounts for GSAP offset)
      const curX = Number(gsap.getProperty(el, 'x')) || 0;
      const curY = Number(gsap.getProperty(el, 'y')) || 0;
      const ax = positions[idx].x + curX;
      const ay = positions[idx].y + curY;
      const distCur = Math.sqrt((ax - mx) ** 2 + (ay - my) ** 2);

      // Dead zone: cursor is close enough to the atom's current position — stop fleeing
      if (distCur < HOVER_ZONE) return;

      // Repulsion from home position
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
        if (!spreading) breathe();
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
    </button>
  {/each}

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
        <div style="width: 68px; height: 1px;" class="my-2 bg-grey-400"></div>
        <div class="mt-1.5">
          By <span class="font-semibold">{tooltip.journalist}</span>, {tooltip.date}
        </div>
      {/if}
    </svelte:element>
  {/if}
</div>
