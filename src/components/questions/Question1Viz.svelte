<script>
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  import Atom from '$lib/assets/atom.png';
  import { stories as data } from '$lib/data/stories.js';

  let { width = 0, height = 0 } = $props();

  const offsets = data.map(() => 2 + Math.random() * 6);

  const COLS = 25;
  const ROWS = 7;
  const ASPECT = 88 / 56;
  const OVERLAP = 24;

  let atomW = $derived((width + OVERLAP * (COLS - 1)) / COLS);
  let atomH = $derived(atomW * ASPECT);
  let stepX = $derived(atomW - OVERLAP);
  let stepY = $derived((height - atomH) / (ROWS - 1));

  const lastCol = (data.length - 1) % COLS;
  let decLeft = $derived(lastCol * stepX + atomW + 10);

  let container;
  let imgEls = [];
  let janEl;
  let decEl;
  let ctx;

  let tooltip = $state({
    visible: false,
    text: '',
    x: 0,
    y: 0,
    expanded: false,
    journalist: '',
    date: '',
  });
  let clickedIndex = $state(-1);
  let animationReady = $state(false);
  let intersected = $state(false);
  let animationStarted = false;

  $effect(() => {
    if (intersected && width > 0 && height > 0 && !animationStarted) {
      animationStarted = true;
      runAnimation();
    }
  });

  function showTooltip(e, item, col, row, i) {
    tooltip = {
      ...tooltip,
      visible: true,
      text: item['Name (ENG - free translation) '],
      x: col * stepX + atomW / 2,
      y: row * stepY + offsets[i],
    };
  }

  function hideTooltip(i) {
    if (clickedIndex !== i) tooltip = { ...tooltip, visible: false };
  }

  function closeIfFocused() {
    if (clickedIndex === -1) return;
    gsap.to(imgEls[clickedIndex], { opacity: 0.6, duration: 0.4, overwrite: 'auto' });
    clickedIndex = -1;
    tooltip = { ...tooltip, expanded: false, visible: false };
  }

  function clickTooltip(item, col, row, i) {
    if (clickedIndex === i) {
      gsap.to(imgEls[i], { opacity: 0.6, duration: 0.4, overwrite: 'auto' });
      clickedIndex = -1;
      tooltip = { ...tooltip, expanded: false, visible: false };
      return;
    }
    if (clickedIndex !== -1) {
      gsap.to(imgEls[clickedIndex], { opacity: 0.6, duration: 0.4, overwrite: 'auto' });
    }
    {
      gsap.to(imgEls[i], { opacity: 1, duration: 0.3, overwrite: 'auto' });
      clickedIndex = i;
      tooltip = {
        ...tooltip,
        visible: true,
        expanded: true,
        text: item['Name (ENG - free translation) '],
        journalist: item['Journalist'],
        date: item['Date'],
        url: item['URL Shomrim'],
        x: col * stepX + atomW / 2,
        y: row * stepY + offsets[i],
      };
    }
  }

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

  function runAnimation() {
    const STAGGER_AMOUNT = 2.5;

    ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: breathe });

      // JAN: appears just before the first atom
      tl.fromTo(janEl, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' }, 0);

      // Atoms: left to right, chronological order, starting 0.2s after JAN
      tl.fromTo(
        imgEls,
        { opacity: 0, y: 10 },
        {
          opacity: 0.6,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: { amount: STAGGER_AMOUNT, from: 'start' },
        },
        0.2,
      );

      // DEC: appears just as the last atom fades in
      tl.fromTo(
        decEl,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        0.2 + STAGGER_AMOUNT,
      );
    });
  }

  function breathe() {
    animationReady = true;
    // Subtle global wave radiating from center
    gsap.to(imgEls, {
      y: '+=10',
      opacity: 0.45,
      duration: 3.5,
      ease: 'sine.inOut',
      stagger: { amount: 2, from: 'center', grid: [ROWS, COLS] },
      repeat: -1,
      yoyo: true,
    });
  }
</script>

<div bind:this={container} class="relative" style:width="{width}px" style:height="{height}px">
  {#each data as item, i}
    {@const col = i % COLS}
    {@const row = Math.floor(i / COLS)}
    <button
      type="button"
      class="absolute cursor-pointer border-none bg-transparent p-0"
      style:left="{col * stepX}px"
      style:top="{row * stepY + offsets[i]}px"
      style:width="{atomW}px"
      style:height="{atomH}px"
      onmouseenter={(e) => {
        if (!animationReady) return;
        if (clickedIndex !== -1 && clickedIndex !== i) return;
        gsap.to(imgEls[i], { opacity: 1, duration: 0.3, overwrite: 'auto' });
        showTooltip(e, item, col, row, i);
      }}
      onmouseleave={() => {
        if (clickedIndex !== -1 && clickedIndex !== i) return;
        if (clickedIndex === i) return;
        gsap.to(imgEls[i], { opacity: 0.6, duration: 0.4, overwrite: 'auto' });
        hideTooltip(i);
      }}
      onclick={(e) => {
        e.stopPropagation();
        clickTooltip(item, col, row, i);
      }}
    >
      <img
        bind:this={imgEls[i]}
        src={Atom}
        alt={item['Name (ENG - free translation) ']}
        class="w-full h-full"
        style="opacity: 0;"
      />
    </button>
  {/each}

  <span
    bind:this={janEl}
    class="absolute text-xs tracking-widest text-grey-800"
    style:top="{atomH / 2 + 6}px"
    style="opacity: 0; left: -10px; transform: translate(-100%, -50%);">JAN</span
  >

  <span
    bind:this={decEl}
    class="absolute text-xs tracking-widest text-grey-800"
    style:left="{decLeft}px"
    style:top="{(ROWS - 1) * stepY + atomH / 2 + 6}px"
    style="opacity: 0; transform: translateY(-50%);">DEC</span
  >

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
