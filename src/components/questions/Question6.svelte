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
    <p>Some stories close. Others open.</p>
    <p>
      Of the 25 follow-up investigations in this canvas, 15 are still moving, carried in Public
      Exposure not because they failed to land but because the systems they described haven't
      finished responding. Accountability is not always an event. Sometimes it's a vigil. <a href="https://www.shomrim.news/hebrew/lod-follow" target="_blank" rel="noopener noreferrer">An
      investigation into negligence, discrimination, and an unlivable reality in
      Lod</a> appeared in the appendices of the
      municipality's formal petition against the Israel Police. <a href="https://www.shomrim.news/hebrew/ishr-program-continues" target="_blank" rel="noopener noreferrer">A follow-up into drug addiction
      funding</a> forced the release of
      withheld funds entirely. The follow-up is where the door opens further.
    </p>
    <p>
      Water & Infrastructure accounts for 7 follow-ups from just 26 total stories in that theme, one
      in four, because these are systems that corrode slowly, that resist single moments of
      exposure, that require a journalist to return until the record is impossible to ignore. <a href="https://www.shomrim.news/hebrew/pollution-continues" target="_blank" rel="noopener noreferrer">A
      return to the ongoing pollution of the Shikma
      Stream</a> came back to a story the system
      had moved on from, because the pollution hadn't. Gatekeepers and Democratic Values account for
      14 and 10 follow-ups respectively, a reminder that institutional failure is rarely a single
      incident.
    </p>
    <p>
      Five follow-ups reached media amplification. Five moved further, into stakeholder reaction,
      systemic change, or both. <a href="https://www.shomrim.news/hebrew/dankner-ichilov-donation" target="_blank" rel="noopener noreferrer">An investigation into the Dankner family court
      case</a> carries a double
      classification in this canvas, a short-term investigation with enough follow-up weight that
      the database couldn't hold it in a single category. It sits between bands, as it should.
    </p>
    <p>
      This is what persistence looks like in practice. The system may not respond today. But the
      story is there, verified and timestamped, waiting.
    </p>
  </div>
</div>
