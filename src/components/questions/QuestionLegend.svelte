<script>
  import Expand from '../icons/Expand.svelte';
  import Atom from '$lib/assets/atom.png';
  import Halos from '$lib/assets/halos_legend.png';
  import { fade } from 'svelte/transition';
  import { untrack } from 'svelte';
  import { themes } from '$lib/data/themes.js';

  let { text, activeThemes = $bindable(new Set()), defaultOpen = true } = $props();

  let isOpen = $state(untrack(() => defaultOpen));

  function toggleTheme(themeId) {
    const next = new Set(activeThemes);
    if (next.has(themeId)) {
      next.delete(themeId);
    } else {
      next.add(themeId);
    }
    activeThemes = next;
  }

  let anyActive = $derived(activeThemes.size > 0);
</script>

<div
  class="pb-3 border-grey-200 text-color-grey-800 {isOpen ? 'md:-mt-4' : 0}"
  style="border-bottom: 0.5px solid;"
>
  <div class="w-full">
    <div class="flex items-start md:items-end md:gap-12.5 w-full">
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
        <div
          class="flex flex-col md:flex-row md:items-end md:justify-between flex-1 min-w-0 gap-6.25 md:gap-0"
          in:fade={{ duration: 300, delay: 50 }}
        >
          <div class="flex items-end gap-6.75 shrink-0">
            <!-- Atom -->
            <div class="flex flex-col items-center shrink-0">
              <img src={Atom} alt="Atom" class="w-14.5 h-22.5 opacity-68 shrink-0" />
              <div class="uppercase text-xs leading-lg tracking-[4%]">story</div>
            </div>

            <!-- Halos -->
            <div class="relative flex flex-col items-center shrink-0" style="overflow-x: visible;">
              <img src={Halos} alt="Halos" class="w-34.5 h-38.5 shrink-0" />
              <div class="uppercase text-xs leading-lg tracking-[4%]">impact layers</div>

              <div class="absolute top-4 left-15.5 w-50 flex flex-col gap-3 leading-lg">
                <!-- 3 -->
                <div class="relative flex items-center gap-1.5">
                  <div class="w-3 text-center text-xs tracking-[3%]">3</div>
                  <div class="relative opacity-62" style="overflow: visible;">
                    <div class="w-2 md:w-5.5 h-[0.5px] bg-grey-900"></div>
                    <div
                      class="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-grey-900"
                    ></div>
                  </div>
                  <div class="text-[11px] uppercase tracking-[3%] pl-0.5">Real-World Change</div>
                </div>

                <!-- 2 -->
                <div class="relative flex items-center gap-1.5">
                  <div class="w-3 text-center text-xs tracking-[3%]">2</div>
                  <div class="relative opacity-62" style="overflow: visible;">
                    <div class="w-2 md:w-5.5 h-[0.5px] bg-grey-900"></div>
                    <div
                      class="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-grey-900"
                    ></div>
                  </div>
                  <div class="text-[11px] uppercase tracking-[3%] pl-0.5">Stakeholder Reaction</div>
                </div>

                <!-- 1 -->
                <div class="relative flex items-center gap-1.5">
                  <div class="w-3 text-center text-xs tracking-[3%]">1</div>
                  <div class="relative opacity-62" style="overflow: visible;">
                    <div class="w-2 md:w-5.5 h-[0.5px] bg-grey-900"></div>
                    <div
                      class="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-grey-900"
                    ></div>
                  </div>
                  <div class="text-[11px] uppercase tracking-[3%] pl-0.5">Media Amplification</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Themes -->
          <div
            class="-ml-8 pl-8 md:ml-0 md:pl-0 grid grid-cols-2 gap-y-6.25 pt-8 pb-5 border-t border-grey-200 md:border-t-0 md:pt-0 mg:pb-0 md:flex md:items-end md:gap-4"
            style="border-top-width: 0.5px;"
          >
            {#each themes as theme}
              <button
                type="button"
                class="flex items-end gap-2 shrink-0 cursor-pointer border-none bg-transparent p-0"
                style="transition: opacity 0.35s ease; opacity: {!anyActive ||
                activeThemes.has(theme.id)
                  ? 1
                  : 0.6};"
                onclick={() => toggleTheme(theme.id)}
              >
                <div
                  style:width="8px"
                  style:height="60px"
                  style:background-color={theme.color}
                ></div>
                <div
                  class="min-w-26 shrink-0 text-xs uppercase tracking-[3%] text-grey-800 max-w-14 whitespace-pre-line leading-lg pb-1.5 text-left"
                >
                  {theme.label}
                </div>
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
<div class="inner-container legend-description mt-5">{text}</div>
