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
      In 2025, Israel's institutions were tested — by war, by political crisis, by the slow erosion
      of norms that usually go unnoticed until they're gone. Someone had to keep watching.
    </p>
    <p>
      Each mark on this canvas is a story Shomrim published this year. Not a data point — a story.
      One that required a journalist, a source, a document that someone didn't want found, and the
      decision to publish anyway. There are 175 of them. 97 generated measurable impact.
    </p>
    <p>
      Some moved quietly. Others moved mountains. <a
        href="https://www.shomrim.news/hebrew/hind-rajab"
        target="_blank"
        >An investigation into an organization systematically tracking Israeli soldiers abroad for
        potential arrest</a
      >
      saw it removed from a European conference within nine days — the foundation's own statement
      attributing the decision to reporting in the Israeli press.
      <a href="https://www.shomrim.news/hebrew/stray-dogs-western-negev" target="_blank"
        >A story about packs of stray dogs threatening communities along Israel's border</a
      >
      — families already living under the shadow of war — moved the Ministry of Agriculture to
      launch a dedicated 15 million shekel program.
      <a href="https://www.shomrim.news/hebrew/pfas-in-the-water" target="_blank"
        >A nationwide investigation into dangerous levels of toxic chemicals in Israel's drinking
        water</a
      > pushed the Ministry of Environmental Protection to open regulatory proceedings on PFAS chemicals
      — within two weeks of publication, and as a first step toward ratifying the Stockholm Convention.
    </p>
    <p>
      Three stories. Three different systems of power. All held to account. This is not a record of
      a year. It's proof of a system that worked. But not every story lands the same way.
    </p>
  </div>
</div>
