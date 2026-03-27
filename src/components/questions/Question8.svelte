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
    <p>Not every community gets a reporter. Shomrim chose to be one.</p>

    <p>
      38 of Shomrim's 2025 investigations — one in five — focus on marginalized and underrepresented
      communities. These are the stories that require the most deliberate choice to go looking.
      <a href="https://www.shomrim.news/hebrew/this-is-how-women-are-smuggled-for-prostitution" target="_blank">Women smuggled into Israel for
      prostitution</a>,
      their trafficking invisible until someone followed the trail. <a href="https://www.shomrim.news/hebrew/belarus-kgb" target="_blank">Belarusian exiles targeted by
      Lukashenko's KGB from thousands of miles away</a>.
      <a href="https://www.shomrim.news/hebrew/elderly-shelters" target="_blank">The elderly left behind in wartime</a>.
      Communities that no other newsroom had an eye on.
    </p>

    <p>
      Three patterns emerge. Arab and Palestinian communities appear repeatedly — land registration
      blocked, funding diverted, Bedouin villages left without bomb shelters. Haredi communities
      appear as both subject and concern — abuse covered up, school networks investigated, health
      infrastructure undermined from within. And a third cluster follows people the state created a
      crisis for and then abandoned. Most of these stories are still waiting. Presence is not the
      same as impact. But without presence, impact is impossible.
    </p>
  </div>
</div>
