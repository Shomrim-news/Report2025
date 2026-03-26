<script>
  import Canvas from '$lib/assets/canvas.jpg';
  import Question5Viz from './Question5Viz.svelte';

  let containerWidth = $state(0);
  let containerHeight = $state(0);

  let vizWidth = $derived(containerWidth);
  let vizHeight = $derived(containerHeight);
</script>

<div class="mb-35">
  <div class="inner-container">
    <h2>How did Shomrim’s reporting travel beyond its newsroom?</h2>
  </div>
  <div
    class="mt-10.5 relative"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
  >
    <img src={Canvas} alt="Canvas background" />

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Question5Viz width={vizWidth} height={vizHeight} />
    </div>
  </div>
  <div class="inner-container">
    <div class="quote">
      "In a time of war and democratic decline, Shomrim calls out the failures and abuses of the
      government and stands out as a critical voice in the Israeli media landscape. Its meaningful
      contributions to cross-border investigations reveal the complexities of Israeli society to a
      global audience." <span class="quote-author">Milan Czerny, Investigative Reporter</span>
    </div>
    <p>A story doesn't end when it's published. Sometimes it's only just beginning.</p>
    <p>
      In 2025, 91 Shomrim investigations traveled beyond the newsroom, picked up by 45 media outlets
      across Israel and internationally, generating 139 republication events. More than half of
      everything published found its way into another newsroom. Some stories moved nationally. Some
      moved across borders. A few moved both at once.
    </p>
    <p>
      The largest clusters gather around the local press: Calcalist led with 22 pickups, followed by
      Ynet and Yedioth Ahronoth with 30 combined, and N12 and Mako with 27. These are the stories
      that entered the national conversation. <a href="https://www.shomrim.news/hebrew/footlilk-feldsrein" target="_blank" rel="noopener noreferrer">A Qatargate investigation revealing that Qatari
      approval was a prerequisite for a Netanyahu spokesperson
      hiring</a> landed simultaneously in Ynet,
      Yedioth Ahronoth, and Haaretz — three competing newsrooms, one story.
    </p>
    <p>
      But the reach wasn't only measured in volume. Shomrim's reporting traveled across the full
      spectrum of Israeli society: into Haredi media through Behadrei Haredim, into Arabic-language
      audiences through Bokra, into the Russian-speaking community through Reka Radio, and into
      English-speaking readers through the Times of Israel. Then there is the global cluster: 19
      international outlets in 2025, each one a story that found its right audience beyond Israel's
      borders. <a href="https://www.shomrim.news/hebrew/gaza-aid-security" target="_blank" rel="noopener noreferrer">An investigation into a US security firm recruiting Israeli intelligence operatives
      for Gaza operations</a> was picked up by Le
      Monde. <a href="https://www.shomrim.news/hebrew/kidnapping-germany" target="_blank" rel="noopener noreferrer">An investigation into the suspected Israeli operatives behind a child abduction case
      in Germany</a> was picked up exclusively by
      Der Spiegel. <a href="https://www.shomrim.news/hebrew/gaza-new-governor" target="_blank" rel="noopener noreferrer">An exposé on the Palestinian tycoon being positioned as Gaza's post-war
      governor</a> traveled to 17 outlets: from
      Corriere della Sera and La Repubblica in Italy to BBC Arabic, Al-Monitor, Kurdistan24, and Sky
      News Arabic across the Arab world and beyond.
    </p>
    <p>
      One newsroom. Forty-five outlets. One hundred and thirty-nine moments where a Shomrim story
      became someone else's front page.
    </p>
  </div>
</div>
