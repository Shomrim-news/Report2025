<script>
  import { onMount } from 'svelte';
  import Canvas from '$lib/assets/canvas.jpg';
  import Question1Legend from './Question1Legend.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let VizComponent = $state(null);
  let sectionEl;

  let vizWidth = $derived(containerWidth - 2 * 170);
  let vizHeight = $derived(containerHeight - 2 * 160);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('./Question1Viz.svelte').then((m) => (VizComponent = m.default));
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionEl} class="mb-35">
  <div class="inner-container">
    <h2>This is Shomrim’s newsroom in 2025</h2>
  </div>
  <div class="flex flex-col">
    <div
      class="mt-10.5 relative"
      bind:clientWidth={containerWidth}
      bind:clientHeight={containerHeight}
    >
      <img src={Canvas} alt="Canvas background" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {#if VizComponent}
          <VizComponent width={vizWidth} height={vizHeight} />
        {/if}
      </div>
    </div>
    <div class="mt-3 md:mb-13 order-first md:order-last">
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
      “When every mechanism meant to check government power is under siege — whether in culture,
      law, or media - journalism becomes the last line of defense. Shomrim stands firm, ensuring
      those in power remain accountable, no matter the cost.” <span class="quote-author"
        >Daniel Dolev, Investigative Reporter</span
      >
    </div>
  </div>
</div>
