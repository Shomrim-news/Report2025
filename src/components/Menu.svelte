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
        <li><a href="#questions" onclick={onclose}>Our Work in 2025</a></li>
        <li><a href="#key-events" onclick={onclose}>Key Events in 2025</a></li>
        <li><a href="#looking-ahead" onclick={onclose}>Looking Ahead</a></li>
        <li><a href="#team" onclick={onclose}>Team and Partners</a></li>
        <li><a href="#finances" onclick={onclose}>Financial Overview</a></li>
      </ul>
    </nav>
  </div>
{/if}

<style>
  nav a {
    text-decoration: none;
  }
</style>
