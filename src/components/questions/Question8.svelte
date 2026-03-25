<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question8Viz from './Question8Viz.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);
</script>

<div class="mb-35">
  <div class="inner-container">
    <h2>How Shomrim gave voice to those not heard in mainstream media?</h2>
  </div>
  <div
    class="mt-10.5 relative"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <img src={Canvas} alt="Canvas background" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Question8Viz width={vizWidth} height={vizHeight} />
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
    <p class="text-amber-600">Another paragraph</p>
    <p class="text-amber-600">Another paragraph</p>
    <p class="text-amber-600">Another paragraph</p>
  </div>
</div>
