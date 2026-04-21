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
        text="Watch the canvas fill band by band, bottom to top — this time, only the 25 stories Shomrim returned to after first publication. Within each band, stories appear month by month, January through December. The lower band holds follow-ups that kept an issue in the public space, the middle those that reached other media, and the top those that triggered real response. Click any theme spot in the legend to show or hide it. Hover any mark to discover the story behind it, click to explore it online."
      />
    </div>
  </div>
  <div class="inner-container mt-13 md:mt-0">
    <p>By refusing to treat a story as a one-time event.</p>
    <p>
      The issues Shomrim covers cannot be reduced to a single publication; they require depth,
      context, and sustained attention to fully understand and address. Shomrim’s approach is to
      uncover the layers of a story and stay with it—returning again and again to deepen the
      reporting, add new perspectives, and push toward real-world outcomes.
    </p>
    <p>
      In a fast-paced media environment like Israel’s, where attention quickly shifts and breaking
      news dominates, this kind of persistence is rare. But it is essential. Accountability is not
      achieved through exposure alone -it requires follow-up, pressure, and continuity over time.
    </p>
    <p>
      In practice, this means tracking issues long after publication. In 2025, for example, Shomrim
      continued to follow the growing use of opioids in Israel, examining how the war in Gaza
      <a href="https://www.shomrim.news/eng/opioid-soldiers" target="_blank">introduced new risks through the treatment of injured
      soldiers</a>. In another case, Shomrim <a href="https://www.shomrim.news/eng/rug-harm-reduction-program-could-be-closed" target="_blank">revealed</a> that the Ministry of
      National Security had withheld funding from a drug addiction treatment program, putting it at
      risk of closure. The investigation led to a Knesset discussion, and through continued
      follow-up, the funding was ultimately approved and released.
    </p>
    <p>
      This is how reporting becomes accountability: through persistence, continuity, and a
      commitment to see stories through until change begins to take shape.
    </p>

    <div class="quote">
      "Investigative journalism is not just a profession; it’s a pillar of democracy. As the media
      landscape erodes and scrutiny weakens, Shomrim not only keeps the fire burning — it leads the
      way, setting a standard for fearless, uncompromising reporting." <span class="quote-author"
        >Haim Rivlin, Investigative Reporter</span
      >
    </div>
  </div>
</div>
