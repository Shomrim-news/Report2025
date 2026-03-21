<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question1Viz from './Question1Viz.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let vizWidth = $derived(containerWidth - 2 * 170);
  let vizHeight = $derived(containerHeight - 2 * 160);
</script>

<div class="mb-35">
  <div class="inner-container">
    <h2>This is how accountability journalism held power to account in Israel in 2025</h2>
  </div>
  <div
    class="mt-10.5 relative"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <img src={Canvas} alt="Canvas background" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Question1Viz width={vizWidth} height={vizHeight} />
    </div>
  </div>
  <div class="inner-container">
    <div class="quote">
      “When every mechanism meant to check government power is under siege — whether in culture,
      law, or media - journalism becomes the last line of defense. Shomrim stands firm, ensuring
      those in power remain accountable, no matter the cost.” <span class="quote-author"
        >Daniel Dolev, Investigative Reporter</span
      >
    </div>
    <p>
      In 2025, Shomrim published 175 investigative stories - each the product of sustained,
      resource-intensive work rather than rapid-cycle reporting. Producing this volume required
      months of rigorous research, careful verification and continued follow-up after publication to
      ensure accuracy, relevance, and accountability. Every investigation is supported by a
      disciplined editorial process, bringing together reporters, editors, data specialists, legal
      counsel and fact-checkers who work collaboratively at every stage.
    </p>
    <p>
      Meaningful impact is rarely immediate. In a political environment marked by fragmented public
      attention, resistance to scrutiny and slow-moving institutional change, investigative
      journalism aimed at long-term democratic impact is inherently costly and time-consuming.
      Shomrim’s work in 2025 reflects this reality - prioritizing credibility, persistence and depth
      over speed in order to produce journalism that endures and ultimately drives change.
    </p>
    <p class="text-amber-600">Another paragraph</p>
  </div>
</div>
