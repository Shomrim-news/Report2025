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
    <p>Some stories land quietly. 78 of them, this year, are still waiting.</p>

    <p>
      This is what a full-spectrum journalism looks like. Not every investigation is published
      because a response is guaranteed. Some are published because the public has a right to know,
      because the record must exist, because visibility is itself a form of pressure — sustained,
      cumulative, harder to undo than any single moment of impact. <a href="https://www.shomrim.news/hebrew/end-of-civil-service" target="_blank">The legislation quietly
      dismantling Israel's civil service</a>,
      placed into the public record before the damage was done. <a href="https://www.shomrim.news/hebrew/gag-orders-inflation" target="_blank">Government offices hacked, citizens
      kept in the dark</a>, a story that kept the
      question alive long after publication. <a href="https://www.shomrim.news/hebrew/after-the-return" target="_blank">A feature on hostages and their
      families</a>, asking whether the government was
      doing enough — a question that never stopped being relevant.
    </p>

    <p>
      Power doesn't only yield when institutions respond. It yields when it cannot escape scrutiny —
      when the record is complete, when the story stays in circulation, when a journalist comes back
      to something the system would have preferred forgotten. These 78 stories didn't produce a
      formal outcome in 2025. But they produced something that outlasts any single response: a
      public record that cannot be erased, and a journalism that refused to look away.
    </p>
  </div>
</div>
