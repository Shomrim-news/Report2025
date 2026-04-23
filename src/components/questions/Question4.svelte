<script>
  import { onMount } from 'svelte';
  import Canvas from '$lib/assets/canvas.jpg';
  import QuestionLegend from './QuestionLegend.svelte';
  import { themes } from '$lib/data/themes.js';

  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let VizComponent = $state(null);
  let sectionEl;

  let activeThemes = $state(new Set(themes.map((t) => t.id)));
  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('./Question4Viz.svelte').then((m) => (VizComponent = m.default));
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<div bind:this={sectionEl}>
  <div class="inner-container">
    <h2>What kinds of journalism did this year require?</h2>
  </div>
  <div class="flex flex-col">
    <div class="overflow-x-auto overflow-y-hidden">
      <div
        class="mt-2 relative min-w-225"
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
    <div class="mt-6 min-[900px]:mt-3 min-[900px]:mb-13 order-first min-[900px]:order-last">
      <QuestionLegend
        defaultOpen={false}
        bind:activeThemes
        text="Watch five story types take shape, bottom to top — each one reflecting a different way of working. From the speed of short-term investigations to the patience of explanatory journalism, every band reflects what that story demanded. Within each band, stories appear month by month, January through December. Some stories move between bands, showing the versatility of Shomrim's work. Click any theme spot in the legend to show or hide it. Hover any mark to discover the story behind it, click to explore it further."
      />
    </div>
  </div>
  <div class="inner-container mt-13 md:mt-0">
    <p>Accountability journalism is not a single method and this year underscored that reality.</p>
    <p>
      Some stories demand speed; others require time measured in months of source-building, document
      gathering, and carefully constructed evidence. Some call for both. Some require proximity-
      spending time with people to understand lived realities, while others demand analytical
      clarity to explain not only what happened - but why it was allowed to happen.
    </p>
    <p>
      The largest category, 60 short-term investigations, reflects a year that moved quickly and
      required constant vigilance and responsiveness.
    </p>
    <p>
      A <a
        href="https://www.shomrim.news/hebrew/the-black-market-of-dangerous-drugs"
        target="_blank">long-form investigation into a black market for dangerous drugs</a
      >
      - required sustained, meticulous reporting. A fast-moving investigation into a
      <a href="https://www.shomrim.news/eng/a-reservoir-in-peril" target="_blank"
        >pollution threat to a major water reservoir</a
      > led to a Knesset committee discussion within weeks, while still requiring ongoing follow-up.
    </p>
    <p>
      A feature on <a
        href="https://www.shomrim.news/hebrew/nova-survivors-struggling"
        target="_blank">Nova Festival survivors</a
      >
      demanded time and close engagement to document their ongoing struggles.
      <a href="https://www.shomrim.news/eng/nova-survivors-struggles" target="_blank"
        >A follow-up on safety failures in the Eilat-Ashkelon pipeline</a
      >
      required persistence in revisiting an issue the system might have preferred to overlook, until
      it reached parliamentary attention. And an explanatory piece on the
      <a href="https://www.shomrim.news/hebrew/shabak-conflict" target="_blank"
        >systematic weakening of Israel’s gatekeeping institutions</a
      > provided the broader context that helped make sense of many of the year’s investigations.
    </p>

    <div class="quote">
      "There is a famous saying, ‘When the cannons are rumbling the muses fall silent’. In Israel,
      the canons never stop firing, resulting in many losing their voices. Shomrim makes sure that
      this doesn’t happen. We ensure the truth is told — relentlessly investigating, refusing to
      self-censor and standing firm when it matters most. Even in times of pain and chaos, we speak
      truth to power." <span class="quote-author"
        >Uri Blau, Investigative Journalist and Director of Global Investigative Projects</span
      >
    </div>
  </div>
</div>
