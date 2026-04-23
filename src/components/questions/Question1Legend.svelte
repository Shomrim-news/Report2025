<script>
  import Expand from '../icons/Expand.svelte';
  import Atom from '$lib/assets/atom.png';
  import { fade } from 'svelte/transition';

  let isOpen = $state(true);
</script>

<div
  class="pb-3 border-grey-200 text-color-grey-800 {isOpen ? '2xl:pt-13.5' : ''}"
  style="border-bottom: 0.5px solid;"
>
  <div class="2xl:grid 2xl:items-end" style="grid-template-columns: 1fr auto 1fr;">
    <div class="flex items-start 2xl:items-end gap-12.5 w-full">
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
          <span
            class="italic text-sm leading-lg tracking-[3%] text-grey-200"
            in:fade={{ duration: 150 }}>Open Legend</span
          >
        {/if}
      </button>

      {#if isOpen}
        <div class="flex flex-1 min-w-0 gap-8 2xl:gap-17" in:fade={{ duration: 300, delay: 50 }}>
          <div class="relative flex flex-col items-center shrink-0" style="overflow: visible;">
            <img src={Atom} alt="Atom icon" class="w-14.5 h-22.5 opacity-68" />
            <div class="uppercase text-xs leading-lg tracking-[4%]">story</div>

            <div class="absolute top-10.75 left-7.75">
              <div class="w-10 2xl:w-19.5 h-[0.5px] bg-grey-200"></div>
              <div
                class="absolute top-[-2.5px] right-[-2.5px] w-1.25 h-1.25 bg-grey-300 rounded-full"
              ></div>
            </div>
          </div>
          <div class="text-sm leading-lg italic tracking-[3%] max-w-30 2xl:max-w-35 mt-6 flex-1">
            One ink mark is one published story
          </div>
        </div>
      {/if}
    </div>

    {#if isOpen}
      <div
        class="hidden 2xl:block legend-description max-w-135 self-start mt-4.5"
        in:fade={{ duration: 300, delay: 50 }}
      >
        This legend explains every visual element you'll encounter. It evolves as you move through
        the report. Below, a short guide walks you through each canvas.
      </div>
    {/if}
  </div>
</div>

{#if isOpen}
  <p class="2xl:hidden inner-container legend-description mt-5">
    This legend explains every visual element you'll encounter. It evolves as you move through the
    report. Below, a short guide walks you through each canvas.
  </p>
{/if}

<div class="inner-container legend-description mt-5 mb-5 lg:mb-0">
  In 2025 Shomrim published 175 investigations. Each mark on the canvas represents a story: equal in
  presence, but each carrying its own weight, urgency, and outcome. Together, they trace a year of
  reporting. By hovering on any mark, you can discover the story behind it. Click on it to explore
  further. From here, the report opens up further layers of Shomrim’s work, like the impact these
  stories generated, the themes that shaped our reporting, and the audiences they reached
</div>
