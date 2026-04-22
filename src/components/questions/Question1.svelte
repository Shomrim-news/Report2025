<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import Canvas from '$lib/assets/canvas.jpg';
  import Question1Legend from './Question1Legend.svelte';
  import ArrowRight from '../icons/ArrowRight.svelte';
  import ArrowDown from '../icons/ArrowDown.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let VizComponent = $state(null);
  let canvasVisible = $state(false);
  let sectionEl;
  let canvasEl;

  // Proportional frame border, capped at the original 170/160px for large screens
  let horizPad = $derived(Math.min(170, containerWidth * (170 / 1536)));
  let vertPad = $derived(Math.min(160, containerHeight * (160 / 1024)));
  let vizWidth = $derived(containerWidth - 2 * horizPad);
  let vizHeight = $derived(containerHeight - 2 * vertPad);

  onMount(() => {
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('./Question1Viz.svelte').then((m) => (VizComponent = m.default));
          preloadObserver.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    preloadObserver.observe(sectionEl);

    const hintsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          canvasVisible = true;
          hintsObserver.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    hintsObserver.observe(canvasEl);

    return () => {
      preloadObserver.disconnect();
      hintsObserver.disconnect();
    };
  });
</script>

<div bind:this={sectionEl} class="mb-35">
  <div class="inner-container">
    <h2>This is Shomrim's newsroom in 2025</h2>
  </div>
  <div class="flex flex-col">
    <div class="overflow-x-auto -mt-10 pt-10">
      <div
        bind:this={canvasEl}
        class="mt-10.5 relative min-w-225"
        bind:clientWidth={containerWidth}
        bind:clientHeight={containerHeight}
      >
        <img src={Canvas} alt="Canvas background" />
        <div class="absolute inset-0 flex items-center justify-center z-10">
          {#if VizComponent}
            <VizComponent width={vizWidth} height={vizHeight} />
          {/if}
        </div>

        {#if canvasVisible}
          <div
            in:fly={{ y: -6, duration: 2000, delay: 0 }}
            class="absolute top-6 left-2 flex flex-col gap-2 min-[900px]:hidden"
          >
            <div class="flex items-center gap-2">
              <div>Swipe each canvas to explore</div>
              <span class="arrow-nudge-right"><ArrowRight /></span>
            </div>
            <div class="flex items-center gap-2">
              <div>Scroll down to continue</div>
              <span class="arrow-nudge-down"><ArrowDown /></span>
            </div>
          </div>
        {/if}
      </div>
    </div>
    <div class="mt-6 min-[900px]:mt-3 min-[900px]:mb-13 order-first min-[900px]:order-last">
      <Question1Legend />
    </div>
  </div>
  <div class="inner-container mt-13 md:mt-0">
    <p>
      In 2025, Israel's institutions were tested by war, by political crisis, by the slow erosion of
      norms that usually go unnoticed until they're gone. Each mark on this canvas is a story
      Shomrim published this year. One that required a journalist, multiple sources, a document that
      someone maybe didn't want found, vigorous work of verifying and confirming and finally the
      decision to publish. There are 175 of them. 97 generated measurable impact.
    </p>
    <div class="quote">
      "When every mechanism meant to check government power is under siege — whether in culture,
      law, or media - journalism becomes the last line of defense. Shomrim stands firm, ensuring
      those in power remain accountable, no matter the cost." <span class="quote-author"
        >Daniel Dolev, Investigative Reporter</span
      >
    </div>
  </div>
</div>

<style>
  @keyframes nudge-right {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(5px);
    }
  }
  @keyframes nudge-down {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
  }
  .arrow-nudge-right {
    display: inline-flex;
    animation: nudge-right 2s ease-in-out infinite;
  }
  .arrow-nudge-down {
    display: inline-flex;
    animation: nudge-down 2s ease-in-out infinite;
    animation-delay: 0.7s;
  }
</style>
