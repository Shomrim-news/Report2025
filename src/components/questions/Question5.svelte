<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question5Viz from './Question5Viz.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);
</script>

<div class="mb-35">
  <div class="inner-container">
    <h2>How did Shomrim’s reporting travel beyond its newsroom?</h2>
  </div>
  <div
    class="mt-10.5 relative"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <img src={Canvas} alt="Canvas background" />

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Question5Viz width={vizWidth} height={vizHeight} />
    </div>
  </div>
  <div class="inner-container">
    <div class="quote">
      "In a time of war and democratic decline, Shomrim calls out the failures and abuses of the
      government and stands out as a critical voice in the Israeli media landscape. Its meaningful
      contributions to cross-border investigations reveal the complexities of Israeli society to a
      global audience." <span class="quote-author">Milan Czerny, Investigative Reporter</span>
    </div>
    <p class="text-amber-600">Another paragraph</p>
    <p class="text-amber-600">Another paragraph</p>
    <p class="text-amber-600">Another paragraph</p>
  </div>
</div>
