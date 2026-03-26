<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question7Viz from './Question7Viz.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);
</script>

<div class="mb-35">
  <div class="inner-container">
    <h2>Does empathy empower accountability, and how?</h2>
  </div>
  <div
    class="mt-10.5 relative"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <img src={Canvas} alt="Canvas background" />

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Question7Viz width={vizWidth} height={vizHeight} />
    </div>
  </div>
  <div class="inner-container">
    <div class="quote">
      "The true power of journalism lies beyond the headlines — it’s in the stories that would
      otherwise remain invisible. When people feel unheard, Shomrim ensures their voices rise,
      making the unseen seen." <span class="quote-author">Chen Shalita, Investigative Reporter</span
      >
    </div>
    <p>Not every story that matters moves an institution. Some move people.</p>
    <p>
      For this explanatory report, we added a layer the numbers don't capture: how close each story
      gets to a human being. 76 selected stories, placed along a single axis — from institutional
      and structural on one side, to personal and intimate on the other, and in between, the stories
      where systems and bodies meet, where policy lands on a person. Each story read not just for
      what it exposed, but for how it carried the people inside it. 63 are translated
      investigations, 12 Hebrew-only stories added as a deliberate stress test, to see whether the
      pattern held across language and form. It did.
    </p>
    <p>
      Here, the organizing principle is human. Stories swarm toward the human experience they
      contain. <a href="https://www.shomrim.news/hebrew/majdal-shams-disaster" target="_blank" rel="noopener noreferrer">The families of Majdal Shams disaster victims saying Israel has forgotten
      them</a> live on one end — intimate,
      unmediated, a grief that no institution acknowledged. <a href="https://www.shomrim.news/hebrew/teacher-violence" target="_blank" rel="noopener noreferrer">Children in Haredi schools carrying
      silent scars from violence never named</a> live
      there too. What these stories share is not a subject — it's a proximity to welfare, health,
      education, and the communities the state most often fails to see.
    </p>
    <p>
      That middle space — where systems and lives meet — is where <a href="https://www.shomrim.news/hebrew/there-will-be-a-catastrophe" target="_blank" rel="noopener noreferrer">a ministry's decision to withhold
      funding from a drug harm reduction
      program</a> lives: a budget line
      that became a community without support, a story that ended with the Knesset forcing the
      funds' release. Where <a href="https://www.shomrim.news/hebrew/soldiers-and-opioids" target="_blank" rel="noopener noreferrer">wounded Gaza soldiers fighting a second battle with
      opioids</a> live, and where <a href="https://www.shomrim.news/hebrew/palestinians-lgbtq" target="_blank" rel="noopener noreferrer">Palestinian
      LGBTQ people caught between a society that rejects them and a border that closes on
      them</a> live. The human cost made visible
      only by staying close enough to see it.
    </p>
    <p>
      The data reveals something counterintuitive. High empathy stories travel widely — they reach
      audiences, generate conversation, create visibility. But institutional response doesn't
      cluster where human proximity is highest. It appears across the full spectrum. Empathy and
      accountability are not the same force. They work together, but neither replaces the other. A
      story can move people without moving institutions. A story can move institutions without
      moving people. The most powerful journalism in this corpus does both.
    </p>
    <p>
      The empathy layer doesn't replace the impact scale. It completes it. Some of the most powerful
      journalism in this canvas never triggered a policy change. It did something harder, it made
      people impossible to ignore.
    </p>
  </div>
</div>
