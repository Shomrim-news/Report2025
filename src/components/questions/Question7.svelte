<script>
  import { onMount } from 'svelte';
  import Canvas from '$lib/assets/canvas.jpg';
  import QuestionLegend from './QuestionLegend.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let VizComponent = $state(null);
  let sectionEl;

  let activeThemes = $state(new Set());
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
    <h2>Can empathy be another means of impact?</h2>
  </div>
  <div class="flex flex-col">
    <div class="overflow-x-auto overflow-y-hidden">
      <div
        class="mt-10.5 relative min-w-225"
        bind:clientWidth={containerWidth}
        bind:clientHeight={containerHeight}
      >
        <img src={Canvas} alt="Canvas background" class="w-full" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {#if VizComponent}
            <VizComponent width={vizWidth} height={vizHeight} {activeThemes} />
          {/if}
        </div>
      </div>
    </div>
    <div class="mt-6 md:mt-3 md:mb-13 order-first md:order-last">
      <QuestionLegend
        defaultOpen={false}
        bind:activeThemes
        text="Three groups, one spectrum — from policy and power on the left, to lived human experience on the right, with the stories where systems and lives collide in between. Watch each group emerge and fill with its stories. Click any theme spot in the legend to show or hide it. Hover any mark to discover the story behind it, click to explore it online."
      />
    </div>
  </div>
  <div class="inner-container mt-13 md:mt-0">
    <p>Some stories don’t change institutions - they change how people see reality</p>
    <p>
      Not every story that matters leads to an immediate institutional response. Some investigations
      drive policy change - but others create a different kind of impact by moving people.
    </p>
    <p>
      To better understand this dimension, we introduced an additional lens: human proximity. We
      mapped 76 selected stories along a spectrum - from policy and power at one end, to lived human
      experience at the other. In between are the stories where institutional decisions directly
      shape people’s lives. Each story was assessed not only for what it exposed, but for how
      closely it captured the human reality behind it.
    </p>
    <p>
      At one end are deeply personal accounts: <a
        href="https://www.shomrim.news/eng/majdal-shams-disaster"
        target="_blank">families of the Majdal Shams victims</a
      >
      expressing grief that has gone unacknowledged by institutions, or
      <a href="https://www.shomrim.news/eng/silent-scars" target="_blank"
        >children in Haredi schools</a
      > carrying the silent consequences of violence. At the center are stories where systems and lives
      intersect: a government decision to withhold funding from a drug harm-reduction program became
      a community left without support - until public attention led to a Knesset intervention and the
      restoration of funds. Similarly, reporting on wounded soldiers revealed a second, less visible
      struggle - with opioid dependency emerging during rehabilitation.
    </p>
    <p>
      Empathy does not always produce immediate policy outcomes. But it creates presence. It brings
      people into focus and makes their reality visible in ways that cannot be ignored. Some of the
      most powerful journalism in this body of work did not trigger formal decisions - it did
      something just as essential: it ensured that those affected were seen, heard, and accounted
      for.
    </p>

    <div class="quote">
      "The true power of journalism lies beyond the headlines — it’s in the stories that would
      otherwise remain invisible. When people feel unheard, Shomrim ensures their voices rise,
      making the unseen seen." <span class="quote-author">Chen Shalita, Investigative Reporter</span
      >
    </div>
  </div>
</div>
