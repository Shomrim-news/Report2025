<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question2Viz from './Question2Viz.svelte';
  import Question2Legend from './Question2Legend.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);
</script>

<div class="mb-35">
  <div class="inner-container">
    <h2>
      Different layers of impact: Where did reporting remain in the public space, and where did it
      trigger response?
    </h2>
  </div>
  <div
    class="mt-10.5 relative"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <img src={Canvas} alt="Canvas background" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Question2Viz width={vizWidth} height={vizHeight} />
    </div>
  </div>
  <div class="mt-3 mb-13">
    <Question2Legend />
  </div>
  <div class="inner-container">
    <p>Not every story lands the same way. But every story lands.</p>
    <p>
      It has been a complex year for Shomrim’s reporting. Yet Shomrim continues to demand
      accountability and systematically track the impact of its work beyond publication, recognizing
      that a story’s life often begins, rather than ends, when it is published. Some stories only
      Shomrim can bring to light; even without immediate or visible outcomes, placing them in the
      public domain holds inherent value.
    </p>
    <p>
      In 2025, 78 stories reached the level of public exposure. For example, a February
      investigation showed that <a
        href="figma.com/exit?url=https%3A%2F%2Fwww.shomrim.news%2Fhebrew%2Fpolice-under-warning"
        target="_blank"
        >political corruption in Israel had not disappeared — rather, police investigations into it
        had</a
      >. While no formal response followed, the reporting placed the issue firmly on the public
      agenda. Other stories gained wider media reach:
      <a href="https://www.shomrim.news/hebrew/american-base-gaza-border" target="_blank"
        >Shomrim’s reporting on U.S. plans for a military base near Gaza</a
      >
      was followed up by Bloomberg and published in Yedioth Ahronoth and Calcalist. At the highest level,
      some investigations led to concrete outcomes, showing Accountability in Action.
      <a href="https://www.shomrim.news/hebrew/ari-arms-cancelled" target="_blank"
        >A conflict-of-interest exposé in a Defense Ministry procurement</a
      >
      process resulted in the cancellation of a tender, while reporting on
      <a href="https://www.shomrim.news/hebrew/periphery-collapse" target="_blank"
        >hospital wards and medical residents in Israel’s periphery</a
      > prompted the Ministry of Health to establish a working group to reform the residency system.
    </p>

    <div class="quote">
      “Impact is vital for investigative journalism, turning revelations into real-world change. It
      drives accountability, influences policy, and builds trust, ensuring the work remains relevant
      and powerful. This is the core mission of Shomrim.” <span class="quote-author"
        >Doron Sela, COO</span
      >
    </div>
  </div>
</div>
