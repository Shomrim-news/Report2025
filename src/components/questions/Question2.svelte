<script>
  import { onMount } from 'svelte';
  import Canvas from '$lib/assets/canvas.jpg';
  import Question2Legend from './Question2Legend.svelte';

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
          import('./Question2Viz.svelte').then((m) => (VizComponent = m.default));
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
    <h2>
      Different layers of impact: Where did reporting remain in the public space, and where did it
      trigger response?
    </h2>
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
            <VizComponent width={vizWidth} height={vizHeight} />
          {/if}
        </div>
      </div>
    </div>
    <div class="mt-6 min-[900px]:mt-3 min-[900px]:mb-13 order-first min-[900px]:order-last">
      <Question2Legend />
    </div>
  </div>
  <div class="inner-container mt-13 md:mt-0">
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
        href="https://www.shomrim.news/hebrew/police-under-warning"
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
