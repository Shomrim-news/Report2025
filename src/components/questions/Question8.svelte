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
          import('./Question8Viz.svelte').then((m) => (VizComponent = m.default));
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
    <h2>How Shomrim gave voice to those not heard in mainstream media?</h2>
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
        text="Watch the canvas fill band by band, bottom to top — 38 stories focused on marginalized and underrepresented communities. Within each band, stories appear month by month, January through December. The lower band holds stories that placed these communities in the public space, the middle those that reached other media, and the top those that triggered real response. Click any theme spot in the legend to show or hide it. Hover any mark to discover the story behind it, click to explore it online."
      />
    </div>
  </div>
  <div class="inner-container">
    <div class="quote">
      “Being a Druze journalist is not easy, and working as an investigative reporter is even more
      challenging. Shomrim provides me with the tools and support I need to pursue this work despite
      the obstacles. The path I am paving is difficult, but I believe it is essential. I hope others
      from my community will recognize its importance and follow in my footsteps.” <span
        class="quote-author">Fadi Amun, Investigative Reporter and Photographer</span
      >
    </div>
  </div>
</div>
