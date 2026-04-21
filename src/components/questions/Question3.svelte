<script>
  import { onMount } from 'svelte';
  import Canvas from '$lib/assets/canvas.jpg';
  import QuestionLegend from './QuestionLegend.svelte';
  import { themes } from '$lib/data/themes.js';

  let containerWidth = $state(0);
  let containerHeight = $state(0);
  let VizComponent = $state(null);
  let sectionEl;

  let activeThemes = $state(new Set());
  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);

  function handleAnimationComplete() {
    activeThemes = new Set(themes.map((t) => t.id));
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('./Question3Viz.svelte').then((m) => (VizComponent = m.default));
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
    <h2>Which themes shaped Shomrim's investigations in 2025?</h2>
  </div>
  <div class="flex flex-col">
    <div
      class="mt-10.5 relative"
      bind:clientWidth={containerWidth}
      bind:clientHeight={containerHeight}
    >
      <img src={Canvas} alt="Canvas background" />

      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {#if VizComponent}
          <VizComponent
            width={vizWidth}
            height={vizHeight}
            {activeThemes}
            onAnimationComplete={handleAnimationComplete}
          />
        {/if}
      </div>
    </div>
    <div class="mt-6 md:mt-3 md:mb-13 order-first md:order-last">
      <QuestionLegend
        bind:activeThemes
        text="Watch each theme emerge and find its stories — eight themes, each in its own color. Stories shared between themes shift and cycle, reflecting the reality that no investigation lives in just one world. Click any theme to show or hide it. Hover any mark to discover the story behind it, click to explore it online."
      />
    </div>
  </div>
  <div class="inner-container mt-13 md:mt-0">
    <p>
      The same 175 stories, viewed through different lens. This time, the canvas reveals which
      themes each story engages. Ten thematic areas emerge. Each theme highlights its stories in a
      distinct color, though many stories span multiple themes, reflecting the interconnected nature
      of power.
    </p>
    <p>
      In 2025, the events of October 7 and their long-term societal consequences continued to shape
      Israeli institutions, public discourse, and Shomrim’s newsroom priorities.
    </p>
    <p>
      Across all areas of coverage—whether environmental issues, democratic institutions and the
      rule of law, marginalized communities, or social welfare—Shomrim’s reporting was guided by a
      consistent democratic lens: safeguarding citizens’ rights in relation to institutions and
      those in positions of power.
    </p>
    <p>
      At its core, Shomrim’s work engaged with the fabric of Israeli democracy at a time when it is
      being actively challenged. In a country engaged in an ongoing struggle over its democratic
      character, bringing these issues to light is not only journalistic work—it is part of the
      broader effort to defend and uphold democratic foundations.
    </p>

    <div class="quote">
      "Investigative journalism exists to uncover what those in power want to hide. At a time when
      democracy is under real threat, when even the freedom of elections is uncertain, Shomrim's
      role is to preserve the last embers of democratic values, ensuring they will one day
      reignite." <span class="quote-author">Shuki Sade, Investigative Reporter</span>
    </div>
  </div>
</div>
