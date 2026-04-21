<script>
  import Expand from '../icons/Expand.svelte';
  import Atom from '$lib/assets/atom.png';
  import Halos from '$lib/assets/halos_legend.png';
  import { fade } from 'svelte/transition';

  let isOpen = $state(true);
</script>

<div
  class="pb-3 border-grey-200 text-color-grey-800 {isOpen ? 'md:-mt-4' : 0}"
  style="border-bottom: 0.5px solid;"
>
  <div class="grid items-end" style="grid-template-columns: 1fr auto 1fr;">
    <div class="flex items-start md:gap-12.5">
      <button class="flex items-center gap-3 cursor-pointer" onclick={() => (isOpen = !isOpen)}>
        <span class="h-7.5 rounded-[7px] bg-beige-200 flex items-center justify-center gap-1.5 w-8">
          <span
            class="transition-all duration-200"
            style="transform: rotate({isOpen ? 180 : 0}deg); transition: transform 200ms;"
            ><Expand /></span
          >
        </span>
        {#if isOpen}
          <span class="sr-only">Close legend</span>
        {:else}
          <span class="italic text-sm leading-lg tracking-[3%]" in:fade={{ duration: 150 }}
            >Open Legend</span
          >
        {/if}
      </button>

      {#if isOpen}
        <div class="flex items-end gap-6.75" in:fade={{ duration: 300, delay: 50 }}>
          <!-- Atom -->
          <div class="flex flex-col items-center shrink-0">
            <img src={Atom} alt="Atom" class="w-14.5 h-22.5 opacity-68 shrink-0" />
            <div class="uppercase text-xs leading-lg tracking-[4%]">story</div>
          </div>

          <!-- Halos -->
          <div class="relative flex flex-col items-center shrink-0" style="overflow-x: visible;">
            <img src={Halos} alt="Halos" class="w-34.5 h-38.5" />
            <div class="uppercase text-xs leading-lg tracking-[4%]">impact layers</div>

            <div class="absolute top-4 left-15.5 w-50 flex flex-col gap-3 leading-lg">
              <!-- 3 -->
              <div class="relative flex items-center gap-1.5">
                <div class="w-3 text-center text-xs tracking-[3%]">3</div>
                <div class="relative opacity-62" style="overflow: visible;">
                  <div class="w-2 md:w-5.5 h-[0.5px] bg-grey-900"></div>
                  <div class="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-grey-900"></div>
                </div>
                <div class="text-[11px] uppercase tracking-[3%] pl-0.5">Real-World Change</div>
              </div>

              <!-- 2 -->
              <div class="relative flex items-center gap-1.5">
                <div class="w-3 text-center text-xs tracking-[3%]">2</div>
                <div class="relative opacity-62" style="overflow: visible;">
                  <div class="w-2 md:w-5.5 h-[0.5px] bg-grey-900"></div>
                  <div class="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-grey-900"></div>
                </div>
                <div class="text-[11px] uppercase tracking-[3%] pl-0.5">Stakeholder Reaction</div>
              </div>

              <!-- 1 -->
              <div class="relative flex items-center gap-1.5">
                <div class="w-3 text-center text-xs tracking-[3%]">1</div>
                <div class="relative opacity-62" style="overflow: visible;">
                  <div class="w-2 md:w-5.5 h-[0.5px] bg-grey-900"></div>
                  <div class="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-grey-900"></div>
                </div>
                <div class="text-[11px] uppercase tracking-[3%] pl-0.5">Media Amplification</div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    {#if isOpen}
      <div
        class="hidden md:block legend-description max-w-135 self-start mt-20"
        in:fade={{ duration: 300, delay: 50 }}
      >
        A story's halo reflects its impact — from media attention to real-world change. Some stories
        carry more than one.
      </div>
    {/if}
  </div>
</div>

{#if isOpen}
  <p class="md:hidden legend-description mt-5">
    A story's halo reflects its impact — from media attention to real-world change. Some stories
    carry more than one.
  </p>
{/if}

<div class="inner-container legend-description mt-5">
  In 2025 Shomrim published 175 investigations. Each mark on the canvas represents a story: equal in
  presence, but each carrying its own weight, urgency, and outcome. Together, they trace a year of
  reporting. By hovering on any mark, you can discover the story behind it. Click on it to explore
  further. From here, the report opens up further layers of Shomrim’s work, like the impact these
  stories generated, the themes that shaped our reporting, and the audiences they reached.
</div>
