<script>
  import { onMount } from 'svelte';
  import Canvas from '$lib/assets/canvas.jpg';
  import QuestionLegend from './QuestionLegend.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let VizComponent = $state(null);
  let sectionEl;

  let activeThemes = $state(new Set());
  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('./Question4Viz.svelte').then((m) => (VizComponent = m.default));
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
    <h2>What kinds of journalism did this year require?</h2>
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
          <VizComponent width={vizWidth} height={vizHeight} {activeThemes} />
        {/if}
      </div>
    </div>
    <div class="mt-3 md:mb-13 order-first md:order-last">
      <QuestionLegend
        defaultOpen={false}
        bind:activeThemes
        text="Watch five story types take shape, bottom to top — each one reflecting a different way of working. From the speed of short-term investigations to the patience of explanatory journalism, every band reflects what that story demanded. Within each band, stories appear month by month, January through December. Click any theme spot in the legend to show or hide it. Hover any mark to discover the story behind it, click to explore it online."
      />
    </div>
  </div>
  <div class="inner-container mt-13 md:mt-0">
    <div class="quote">
      "There is a famous saying, ‘When the cannons are rumbling the muses fall silent’. In Israel,
      the canons never stop firing, resulting in many losing their voices. Shomrim makes sure that
      this doesn’t happen. We ensure the truth is told — relentlessly investigating, refusing to
      self-censor and standing firm when it matters most. Even in times of pain and chaos, we speak
      truth to power." <span class="quote-author"
        >Uri Blau, Investigative Journalist and Director of Global Investigative Projects</span
      >
    </div>
  </div>
</div>
