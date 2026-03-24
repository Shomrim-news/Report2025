<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question4Viz from './Question4Viz.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);
</script>

<div class="mb-35">
  <div class="inner-container">
    <h2>What kinds of journalism did this year require?</h2>
  </div>
  <div
    class="mt-10.5 relative"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <img src={Canvas} alt="Canvas background" />

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Question4Viz width={vizWidth} height={vizHeight} />
    </div>
  </div>
  <div class="inner-container">
    <div class="quote">
      "There is a famous saying, ‘When the cannons are rumbling the muses fall silent’. In Israel,
      the canons never stop firing, resulting in many losing their voices. Shomrim makes sure that
      this doesn’t happen. We ensure the truth is told — relentlessly investigating, refusing to
      self-censor and standing firm when it matters most. Even in times of pain and chaos, we speak
      truth to power." <span class="quote-author"
        >Uri Blau, Investigative Journalist and Director of Global Investigative Projects</span
      >
    </div>
    <p class="text-amber-600">Another paragraph</p>
    <p class="text-amber-600">Another paragraph</p>
    <p class="text-amber-600">Another paragraph</p>
  </div>
</div>
