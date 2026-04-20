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
          import('./Question6Viz.svelte').then((m) => (VizComponent = m.default));
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
    <h2>How do you turn reporting into accountability?</h2>
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
      text="Watch the canvas fill band by band, bottom to top — this time, only the 25 stories Shomrim returned to after first publication. Within each band, stories appear month by month, January through December. The lower band holds follow-ups that kept an issue in the public space, the middle those that reached other media, and the top those that triggered real response. Click any theme spot in the legend to show or hide it. Hover any mark to discover the story behind it, click to explore it online."
    />
  </div>
  <div class="inner-container">
    <div class="quote">
      "Investigative journalism is not just a profession; it’s a pillar of democracy. As the media
      landscape erodes and scrutiny weakens, Shomrim not only keeps the fire burning — it leads the
      way, setting a standard for fearless, uncompromising reporting." <span class="quote-author"
        >Haim Rivlin, Investigative Reporter</span
      >
    </div>
  </div>
</div>
