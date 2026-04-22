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
          import('./Question5Viz.svelte').then((m) => (VizComponent = m.default));
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
    <h2>How did Shomrim’s reporting travel beyond its newsroom?</h2>
  </div>
  <div class="flex flex-col">
    <div class="overflow-x-auto overflow-y-hidden min-[900px]:overflow-visible">
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
        text="Explore the full landscape of where Shomrim's reporting traveled — international media above, Israeli media below. Stories drift softly across the field, reflecting the diversity of outlets that carried this journalism further. Click any theme spot in the legend to show or hide it. Hover any mark to discover the story behind it, click to explore it further."
      />
    </div>
  </div>
  <div class="inner-container mt-13 md:mt-0">
    <p>A story doesn't end when it's published. Sometimes it's only just beginning.</p>
    <p>
      In 2025, 91 Shomrim investigations extended beyond the newsroom, reaching 45 media outlets in
      Israel and abroad and generating 139 republications. More than half of Shomrim’s reporting was
      picked up by additional outlets, significantly expanding its reach and influence.
    </p>
    <p>
      Shomrim’s work also reached diverse audiences across Israeli society: Haredi readers through
      <a href="https://www.bhol.co.il/news/1710057" target="_blank">Behadrei Haredim</a>,
      Arabic-speaking audiences through
      <a href="https://bokra.net/Article-1571290" target="_blank">Bokra</a>, Russian-speaking
      listeners via Reka Radio, and English-speaking readers through
      <a
        href="https://www.timesofisrael.com/liveblog_entry/us-said-planning-to-build-major-base-near-gaza-for-international-forces/"
        target="_blank">The Times of Israel</a
      >.
    </p>
    <p>
      Shomrim’s reporting also gained international traction. In 2025, its investigations were
      featured in 19 global media outlets. A story on <a
        href="https://www.shomrim.news/eng/gazas-post-war-governor"
        target="_blank"
        >a Palestinian businessman positioned as a potential post-war leader in Gaza</a
      >
      was picked up by 17 outlets worldwide, including
      <a href="https://www.bbc.com/arabic/articles/cp3eqvnrd4vo" target="_blank">BBC Arabic</a>,
      <a
        href="https://www.repubblica.it/esteri/2025/08/12/news/samirhulileh_chi_e_palestinese_nuovo_governatore_gaza-424785891/"
        target="_blank">La repubblica</a
      >, and
      <a
        href="https://www.skynewsarabia.com/middle-east/1813471-%D8%A7%D9%84%D8%B1%D9%8A%D9%94%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D9%81%D9%84%D8%B3%D8%B7%D9%8A%D9%86%D9%8A%D8%A9-%D8%AA%D9%86%D9%81%D9%8A-%D8%AA%D8%B9%D9%8A%D9%8A%D9%86-%D8%B1%D8%AC%D9%84-%D8%A7%D9%94%D8%B9%D9%85%D8%A7%D9%84-%D9%84%D8%AD%D9%83%D9%85-%D9%82%D8%B7%D8%A7%D8%B9-%D8%BA%D8%B2%D8%A9?q=%D8%AD%D9%84%D9%8A%D9%84%D8%A9&r=1813490"
        target="_blank">Sky News Arabic</a
      >. Another story exposing suspected Israeli involvement in a child abduction case in Germany,
      was featured exclusively by
      <a
        href="https://www.spiegel.de/panorama/justiz/fall-christina-block-der-ex-agent-und-seine-kampfsportfreunde-a-c3b7534e-23b3-488f-8a6d-ac813921580e?sara_ref=re-so-app-sh"
        target="_blank">Der Spiegel</a
      >.
    </p>
    <p>
      Together, this reflects a consistent pattern: one newsroom producing work that resonates far
      beyond its walls, shaping public discourse across multiple platforms, languages, and
      countries.
    </p>

    <div class="quote">
      "In a time of war and democratic decline, Shomrim calls out the failures and abuses of the
      government and stands out as a critical voice in the Israeli media landscape. Its meaningful
      contributions to cross-border investigations reveal the complexities of Israeli society to a
      global audience." <span class="quote-author">Milan Czerny, Investigative Reporter</span>
    </div>
  </div>
</div>
