<script>
  import Expand from './icons/Expand.svelte';

  let { isOpen = false, children, onclick } = $props();
</script>

<button class="flex gap-3 cursor-pointer items-center" {onclick}>
  <span
    class="w-8 h-7.5 rounded-[7px] bg-beige-200 flex items-center justify-center"
    style="transform: rotate({isOpen ? 0 : 180}deg);"><Expand /></span
  >
  <span>{@render children()}</span>
</button>
