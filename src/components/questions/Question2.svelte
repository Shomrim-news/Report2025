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
    <h2>Where did reporting remain in public space, and where did it trigger response?</h2>
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
    <p>Not every story lands the same way. But every story lands.</p>
    <p>
      <a href="https://www.shomrim.news/hebrew/police-under-warning" target="_blank"
        >In February, an investigation revealed that political corruption in Israel hadn't
        disappeared — the police investigations had</a
      >. A systematic dismantling, documented and placed into the public record. No committee
      convened, no formal response came. And yet the story is here, in the center band of Public
      Exposure, carrying its weight quietly, part of the permanent record that a functioning
      democracy draws from. Some marks now glow with one halo, two, three, or carry them in
      combination — each one a measure of how far a story traveled, from media amplification to
      stakeholder reaction, to real-world change.
    </p>
    <p>
      78 marks hold that center. Not because they fell short, but because presence is its own form
      of power. Around them, the system breathes in both directions. Below, Media Reach — 80
      investigations that traveled. <a
        href="https://www.shomrim.news/hebrew/american-base-gaza-border"
        target="_blank"
        >When Shomrim revealed that the United States was planning a large military base on the Gaza
        border</a
      >, the story landed in Bloomberg, Yedioth Ahronoth, Calcalist, and the Times of Israel — a
      domestic scoop that became an international conversation. And rising above, Accountability in
      Action — 17 marks where the halos signal consequence.
      <a href="https://www.shomrim.news/hebrew/ari-arms-cancelled" target="_blank"
        >A Shomrim investigation revealed that the winning company in a tender to supply tens of
        thousands of assault rifles to the IDF had been represented by a consultant who had recently
        served as a senior legal official in the Defense Ministry</a
      >
      — real-world change: the Ministry canceled the award, and the entire tender.
      <a href="https://www.shomrim.news/hebrew/periphery-collapse" target="_blank"
        >An investigation into overflowing hospital wards and the impossible workload facing medical
        residents in Israel's periphery</a
      > prompted the Ministry of Health to establish a working team to overhaul the residency framework.
    </p>
    <p>
      This is a living system — constantly in motion, each mark connected to the next. But impact is
      only one dimension of the story.
    </p>
  </div>
</div>
