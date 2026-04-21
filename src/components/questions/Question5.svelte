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
          import('./Question5Viz.svelte').then((m) => (VizComponent = m.default));
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
    <h2>How did Shomrim’s reporting travel beyond its newsroom?</h2>
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
        text="Explore the full landscape of where Shomrim's reporting traveled — international media above, Israeli media below. Stories drift softly across the field, reflecting the diversity of outlets that carried this journalism further. Click any theme spot in the legend to show or hide it. Hover any mark to discover the story behind it, click to explore it online."
      />
    </div>
  </div>
  <div class="inner-container mt-13 md:mt-0">
    <div class="quote">
      "In a time of war and democratic decline, Shomrim calls out the failures and abuses of the
      government and stands out as a critical voice in the Israeli media landscape. Its meaningful
      contributions to cross-border investigations reveal the complexities of Israeli society to a
      global audience." <span class="quote-author">Milan Czerny, Investigative Reporter</span>
    </div>
  </div>
</div>
