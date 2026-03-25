<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question6Viz from './Question6Viz.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);
</script>

<div class="mb-35">
  <div class="inner-container">
    <h2>Which investigations demanded persistence over time, and why?</h2>
  </div>
  <div
    class="mt-10.5 relative"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <img src={Canvas} alt="Canvas background" />

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Question6Viz width={vizWidth} height={vizHeight} />
    </div>
  </div>
  <div class="inner-container">
    <div class="quote">
      "Investigative journalism is not just a profession; it’s a pillar of democracy. As the media
      landscape erodes and scrutiny weakens, Shomrim not only keeps the fire burning — it leads the
      way, setting a standard for fearless, uncompromising reporting." <span class="quote-author"
        >Haim Rivlin, Investigative Reporter</span
      >
    </div>
    <p class="text-amber-600">Another paragraph</p>
    <p class="text-amber-600">Another paragraph</p>
    <p class="text-amber-600">Another paragraph</p>
  </div>
</div>
