<script>
  import Expand from './icons/Expand.svelte';

  let { isOpen = false, children, onclick } = $props();
</script>

<button class="flex gap-3 items-center cursor-pointer text-left" {onclick}>
  <span
    class="shrink-0 w-8 h-7.5 rounded-[7px] bg-beige-200 flex items-center justify-center"
    style="transform: rotate({isOpen ? 180 : 0}deg);"><Expand /></span
  >
  <span class="text-sm md:text-md">{@render children()}</span>
</button>
