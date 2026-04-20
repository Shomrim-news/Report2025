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
          import('./Question7Viz.svelte').then((m) => (VizComponent = m.default));
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
    <h2>Can empathy be another means of impact?</h2>
  </div>
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
  <div class="mt-3 mb-13">
    <QuestionLegend
      bind:activeThemes
      text="Three groups, one spectrum — from policy and power on the left, to lived human experience on the right, with the stories where systems and lives collide in between. Watch each group emerge and fill with its stories. Click any theme spot in the legend to show or hide it. Hover any mark to discover the story behind it, click to explore it online."
    />
  </div>
  <div class="inner-container">
    <div class="quote">
      "The true power of journalism lies beyond the headlines — it’s in the stories that would
      otherwise remain invisible. When people feel unheard, Shomrim ensures their voices rise,
      making the unseen seen." <span class="quote-author">Chen Shalita, Investigative Reporter</span
      >
    </div>
  </div>
</div>
