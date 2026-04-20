<script>
  import { onMount } from 'svelte';
  import Canvas from '$lib/assets/canvas.jpg';

  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let VizComponent = $state(null);
  let sectionEl;

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('./Question7Viz.svelte').then((m) => (VizComponent = m.default));
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionEl} class="mb-35">
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
      {#if VizComponent}
        <VizComponent width={vizWidth} height={vizHeight} />
      {/if}
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
      For this report, we added a layer the numbers don't capture: how close each story gets to a
      human being. 76 selected stories — 63 translated investigations and 12 Hebrew-only stories
      added as a deliberate stress test — placed along a single axis from policy and power on one
      end, to lived human experience on the other, with the stories where institutional decisions
      land on real people sitting in between. Each story read not just for what it exposed, but for
      how it carried the people inside it.
    </p>

    <p>
      <a href="https://www.shomrim.news/hebrew/majdal-shams-disaster" target="_blank">The families of Majdal Shams disaster victims saying Israel has forgotten
      them</a> — intimate, unmediated, a grief
      no institution acknowledged. <a href="https://www.shomrim.news/hebrew/teacher-violence" target="_blank">Children in Haredi schools carrying silent scars from violence
      never named</a>. In the middle, where systems
      and lives meet: <a href="https://www.shomrim.news/hebrew/there-will-be-a-catastrophe" target="_blank">a ministry's decision to withhold funding from a drug harm reduction
      program</a> became a community
      without support, a story that ended with the Knesset forcing the funds' release. <a href="https://www.shomrim.news/hebrew/soldiers-and-opioids" target="_blank">Wounded Gaza
      soldiers fighting a second battle with
      opioids</a>. The human cost made visible
      only by staying close enough to see it.
    </p>

    <p>
      Empathy doesn't guarantee impact. But it guarantees presence. And some of the most powerful
      journalism in this canvas never triggered a policy change — it did something harder. It made
      people impossible to ignore.
    </p>
  </div>
</div>
