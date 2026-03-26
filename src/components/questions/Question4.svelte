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
    <p>Accountability journalism is not one thing — and this year, that mattered.</p>
    <p>
      Some stories demand speed. Others demand time, the kind that takes months of source-building
      and documents and a chain of evidence no single conversation could establish. Some demand
      both. Some demand proximity — sitting with people long enough to understand what rebuilding
      actually looks like. And some demand the clarity to explain not just what happened, but why it
      was allowed to happen at all.
    </p>
    <p>
      The largest band — 60 Short-Term Investigations — reflects a year that moved fast and demanded
      constant vigilance. But volume alone doesn't tell the story. <a
        href="https://www.shomrim.news/hebrew/the-black-market-of-dangerous-drugs"
        target="_blank"
        >A long-form investigation into a black market for dangerous drugs — bought from HMOs and
        resold at massive profit</a
      >
      required months of careful, painstaking work.
      <a href="https://www.shomrim.news/hebrew/water-pollution" target="_blank"
        >A short-term investigation into a pollution crisis threatening one of Israel's water
        reservoirs</a
      >
      moved fast enough to trigger a Knesset committee discussion within weeks.
      <a href="https://www.shomrim.news/hebrew/nova-survivors-struggling" target="_blank"
        >A feature on Nova Festival survivors</a
      >
      — their battles with the state, their daily fear, their attempts to piece together a life —
      required time and proximity that no investigation ever could.
      <a href="https://www.shomrim.news/hebrew/ktzaa-mevaker-report" target="_blank"
        >A follow-up on safety failures in the Eilat-Ashkelon pipeline</a
      >
      required persistence — going back to a story the system would have preferred forgotten, until
      it was cited in a Knesset committee.
      <a href="https://www.shomrim.news/hebrew/shabak-conflict" target="_blank"
        >And an explanatory piece on the systematic dismantling of Israel's gatekeeping institutions</a
      > didn't break a story — it built the frame that made all the other stories make sense.
    </p>
    <p>
      Two stories in this canvas drift between bands — a feature with such investigative depth it
      pulls toward the Investigative band below it, and a short-term investigation so persistent it
      drifts toward Follow-up. The categories are honest about their own limits. This year required
      all of it.
    </p>
  </div>
</div>
