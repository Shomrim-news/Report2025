<script>
  import Navbar from '../components/Navbar.svelte';
  import Menu from '../components/Menu.svelte';
  import Intro from '../components/Intro.svelte';
  import Questions from '../components/questions/Questions.svelte';
  import Context from '../components/context/Context.svelte';
  import Footer from './Footer.svelte';

  let menuOpen = $state(false);
</script>

<Menu bind:open={menuOpen} onclose={() => menuOpen = false} />
<header class="sticky top-0 z-50 bg-white/60 backdrop-blur-sm border-b border-white/20">
  <Navbar onopen={() => menuOpen = true} />
</header>
<main>
  <div class="container">
    <Intro />
    <Questions />
    <Context />
  </div>
</main>
<Footer />
