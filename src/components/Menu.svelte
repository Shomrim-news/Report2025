<script>
  import Close from './Close.svelte';
  import logo from '$lib/assets/logo.png';

  let { open = $bindable(), onclose } = $props();

  $effect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  });
</script>

{#if open}
  <div
    class="fixed inset-0 z-100 bg-white flex flex-col items-center justify-center transition-opacity duration-300"
    class:opacity-0={!open}
    class:opacity-100={open}
  >
    <div class="absolute top-6 right-6">
      <button onclick={onclose}>
        <Close />
      </button>
    </div>

    <nav>
      <ul class="flex flex-col items-center gap-8 list-none text-lg md:text-xl">
        <li>
          <a href="#intro" onclick={onclose}>
            <img src={logo} alt="Home" class="w-40 md:w-64 h-auto" />
          </a>
        </li>
        <li><a href="#questions" onclick={onclose}>2025 in Review</a></li>
        <li><a href="#our-work" onclick={onclose}>Our Work</a></li>
        <li><a href="#team" onclick={onclose}>Our Team</a></li>
        <li><a href="#finances" onclick={onclose}>Financial overview</a></li>
        <li><a href="#partners" onclick={onclose}>Our Partners</a></li>
      </ul>
    </nav>
  </div>
{/if}
