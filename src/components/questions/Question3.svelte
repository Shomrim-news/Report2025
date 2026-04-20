<script>
  import { onMount } from 'svelte';
  import Canvas from '$lib/assets/canvas.jpg';
  import QuestionLegend from './QuestionLegend.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let VizComponent = $state(null);
  let sectionEl;

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('./Question3Viz.svelte').then((m) => (VizComponent = m.default));
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
    <h2>Which themes shaped Shomrim's investigations in 2025?</h2>
  </div>
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
  <div class="mt-3 mb-13">
    <QuestionLegend
      text="Watch each theme emerge and find its stories — eight themes, each in its own color. Stories shared between themes shift and cycle, reflecting the reality that no investigation lives in just one world. Click any theme spot in the legend to show or hide it. Hover any mark to discover the story behind it, click to explore it online."
    />
  </div>
  <div class="inner-container">
    <div class="quote">
      "Investigative journalism exists to uncover what those in power want to hide. At a time when
      democracy is under real threat, when even the freedom of elections is uncertain, Shomrim's
      role is to preserve the last embers of democratic values, ensuring they will one day
      reignite." <span class="quote-author">Shuki Sade, Investigative Reporter</span>
    </div>
  </div>
</div>
