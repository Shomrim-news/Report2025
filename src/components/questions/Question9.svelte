<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question9Viz from './Question9Viz.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);
</script>

<div class="mb-35">
  <div class="inner-container">
    <h2>How did accountability stay public all along?</h2>
  </div>
  <div
    class="mt-10.5 relative"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <img src={Canvas} alt="Canvas background" />

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Question9Viz width={vizWidth} height={vizHeight} />
    </div>
  </div>
  <div class="inner-container">
    <div class="quote">
      "Shomrim was born in turbulent times, but 2024 pushed us further than ever before. Through
      war, political crisis and deep societal rifts, we held our ground, proving that independent
      journalismis not just necessary —it’s indispensable." <span class="quote-author"
        >Eyal Abrahami, Editor-in-Chief</span
      >
    </div>
    <p class="text-amber-600">Another paragraph</p>
    <p class="text-amber-600">Another paragraph</p>
    <p class="text-amber-600">Another paragraph</p>
  </div>
</div>
