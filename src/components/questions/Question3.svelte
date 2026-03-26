<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question3Viz from './Question3Viz.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);
</script>

<div class="mb-35">
  <div class="inner-container">
    <h2>Which themes shaped Shomrim's investigations in 2025?</h2>
  </div>
  <div
    class="mt-10.5 relative"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <img src={Canvas} alt="Canvas background" />

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Question3Viz width={vizWidth} height={vizHeight} />
    </div>
  </div>
  <div class="inner-container">
    <div class="quote">
      "Investigative journalism exists to uncover what those in power want to hide. At a time when
      democracy is under real threat, when even the freedom of elections is uncertain, Shomrim's
      role is to preserve the last embers of democratic values, ensuring they will one day
      reignite." <span class="quote-author">Shuki Sade, Investigative Reporter</span>
    </div>
    <p>
      The same 175 marks. This time, ask what system each one was really about — there are eight of
      them. Gatekeepers who failed. Democratic norms under pressure. Water that wasn't safe. Land
      that wasn't free. A military stretched to its human limits. Courts deciding who justice is
      for. Arab citizens navigating a state that too often looks past them. And a society absorbing
      the weight of a war that never stayed on the battlefield. Each theme arrives in sequence,
      lighting up its stories across the canvas — and with every new color, the picture grows.
      Stories tagged with more than one theme cycle between their colors, because these systems
      rarely fail in isolation.
    </p>
    <p>
      Two themes dominate the field: Democratic Values and Institutional Norms appear in 119
      stories, Gatekeepers and Watchdog Institutions in 112. Together they exceed 100% of the
      corpus, because they are, in practice, inseparable. <a href="https://www.shomrim.news/hebrew/the-ministry-of-education-will-finance-the-channel-14-conference" target="_blank" rel="noopener noreferrer">When the Education Ministry allocated
      $70,000 of public funds to a conference promoting a partisan political
      identity</a>,
      the story touched three systems at once: a gatekeeper that failed, a democratic norm violated,
      a court ultimately petitioned for an injunction.
    </p>
    <p>
      138 out of 175 stories carry more than one theme. That's not an editorial quirk, it's an
      accurate reflection of how power actually operates. <a href="https://www.shomrim.news/hebrew/soldier-suicide" target="_blank" rel="noopener noreferrer">An investigation into a surge in soldier
      suicides — mostly reservists</a> sits at the
      intersection of the military system, extreme social phenomena, and a state's democratic
      obligation to those it sends to fight. <a href="https://www.shomrim.news/hebrew/battles-of-the-estates" target="_blank" rel="noopener noreferrer">A May exposé on nepotism and corruption in rural land
      allocations</a> crossed three systems:
      gatekeepers, land, and democratic norms, and moved the Registrar of Cooperative Societies to
      open a formal investigation.
    </p>
    <p>
      This is what Shomrim's coverage looks like when you ask what it was about. Not one thing.
      Never just one thing.
    </p>
  </div>
</div>
