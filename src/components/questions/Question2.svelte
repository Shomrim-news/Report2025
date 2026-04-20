<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question2Viz from './Question2Viz.svelte';

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
  <div class="inner-container">
    <div class="quote">
      “Impact is vital for investigative journalism, turning revelations into real-world change. It
      drives accountability, influences policy, and builds trust, ensuring the work remains relevant
      and powerful. This is the core mission of Shomrim.” <span class="quote-author"
        >Doron Sela, COO</span
      >
    </div>
    <p>Not every mark lands the same way. But every mark lands.</p>

    <p>
      <a href="https://www.shomrim.news/hebrew/police-under-warning" target="_blank"
        >In February, an investigation revealed that political corruption in Israel hadn't
        disappeared — the police investigations had.</a
      > No committee convened, no formal response came. And yet the story is here, in the center band
      of Public Exposure, carrying its weight quietly, part of the permanent record that a functioning
      democracy draws from. Some marks now glow with one halo, two, three, or carry them in combination,
      each one a measure of how far a story traveled, from media amplification to stakeholder reaction,
      to real-world change.
    </p>

    <p>
      78 marks hold that center. Not because they fell short, but because presence is its own form
      of power. Below them, Media Reach: <a
        href="https://www.shomrim.news/hebrew/american-base-gaza-border"
        target="_blank">when Shomrim revealed US plans for a military base on the Gaza border</a
      >, the story landed in Bloomberg, Yedioth Ahronoth, and Calcalist, a domestic scoop that
      became an international conversation. And rising above, Accountability in Action:
      <a href="https://www.shomrim.news/hebrew/ari-arms-cancelled" target="_blank"
        >a conflict-of-interest exposé inside a Defense Ministry procurement process</a
      >
      ended with the Ministry canceling the award and the entire tender, while
      <a href="https://www.shomrim.news/hebrew/periphery-collapse" target="_blank"
        >an investigation into hospital wards and medical residents in Israel's periphery</a
      > moved the Ministry of Health to establish a working team to overhaul the residency framework.
    </p>

    <p>
      This is a living system, constantly in motion, each mark connected to the next. But impact is
      only one dimension of the story.
    </p>
  </div>
</div>
