<script>
  import Navbar from '../components/Navbar.svelte';
  import Intro from '../components/Intro.svelte';
  import Context from '../components/context/Context.svelte';
</script>

<header class="sticky top-0 z-50 bg-white/60 backdrop-blur-sm border-b border-white/20">
  <Navbar />
</header>
<main>
  <div class="container">
    <Intro />
    <section id="exploratory-journey"></section>
    <section id="context">
      <Context />
    </section>
  </div>
</main>
