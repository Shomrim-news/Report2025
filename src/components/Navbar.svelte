<script>
  let { onopen } = $props();

  const navLinks = [
    { label: 'About Shomrim', href: '#intro', id: 'intro' },
    { label: 'Our Work in 2025', href: '#questions', id: 'questions' },
    { label: 'Key Events in 2025', href: '#key-events', id: 'key-events' },
    { label: 'Looking Ahead', href: '#looking-ahead', id: 'looking-ahead' },
    { label: 'Team and Partners', href: '#team', id: 'team' },
    { label: 'Financial Overview', href: '#finances', id: 'finances' },
  ];

  const questionTitles = [
    'This is Shomrim’s newsroom in 2025',
    'Different layers of impact: Where did reporting remain in the public space, and where did it trigger response?',
    'Which themes shaped Shomrim’s investigations in 2025?',
    'What kinds of journalism did this year require?',
    "How did Shomrim's reporting travel beyond its newsroom?",
    'How do you turn reporting into accountability?',
    'Can empathy be another means of impact?',
    'How Shomrim gave voice to those not heard in mainstream media?',
  ];

  let scrolled = $state(false);
  let menuExpanded = $state(false);
  let activeSection = $state('intro');
  let activeQuestionIndex = $state(0);

  let activeSectionLabel = $derived(
    activeSection === 'questions'
      ? `Our Work in 2025 — ${questionTitles[activeQuestionIndex]}`
      : (navLinks.find((l) => l.id === activeSection)?.label ?? ''),
  );

  $effect(() => {
    function updateActive() {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      // When near the bottom, use the full viewport as the detection zone so
      // sections that can't scroll to the top (e.g. Financial Overview) still activate.
      const isNearBottom = scrollY + viewportHeight >= scrollHeight - 50;
      // 64px = sticky navbar height. A section is "active" when its top clears the header.
      // When near the bottom of the page, open the zone to the full viewport so sections
      // that can never scroll to the top (e.g. Financial Overview) still activate.
      const threshold = isNearBottom ? viewportHeight : 64;

      let current = 'intro';
      let currentQ = 0;

      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = link.id;
        }
      }

      if (current === 'questions') {
        for (let i = 0; i < 9; i++) {
          const el = document.getElementById(`question-${i + 1}`);
          if (el && el.getBoundingClientRect().top <= threshold) {
            currentQ = i;
          }
        }
      }

      activeSection = current;
      activeQuestionIndex = currentQ;
    }

    function handleScroll() {
      scrolled = window.scrollY > 10;
      if (!scrolled) menuExpanded = false;
      updateActive();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scrollend', updateActive, { passive: true });
    updateActive();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', updateActive);
    };
  });
</script>

<div class="container">
  <div class="inner-container h-16 flex items-center">
    <!-- Desktop nav (md and up) -->
    <div
      class="hidden md:flex items-center w-full font-medium text-[16px] leading-5 tracking-[2%] text-grey-800"
    >
      {#if !scrolled || menuExpanded}
        <nav class="flex gap-16 items-center flex-1">
          {#each navLinks as link}
            <a
              href={link.href}
              class="nav-link whitespace-nowrap"
              onclick={() => {
                menuExpanded = false;
                activeSection = link.id;
                activeQuestionIndex = 0;
              }}>{link.label}</a
            >
          {/each}
        </nav>
        {#if menuExpanded}
          <button class="cursor-pointer ml-4 shrink-0" onclick={() => (menuExpanded = false)}
            >Close</button
          >
        {/if}
      {:else}
        <span class="truncate flex-1 min-w-0">
          {#if activeSection === 'questions'}
            Our Work in 2025<em>{questionTitles[activeQuestionIndex]}</em>
          {:else}
            {activeSectionLabel}
          {/if}
        </span>
        <button class="cursor-pointer ml-4 shrink-0" onclick={() => (menuExpanded = true)}
          >Menu</button
        >
      {/if}
    </div>

    <!-- Mobile nav (below md) -->
    <div class="flex md:hidden items-center w-full">
      {#if scrolled}
        <span class="text-sm truncate flex-1 min-w-0 mr-4">
          {#if activeSection === 'questions'}
            Our Work in 2025<em>{questionTitles[activeQuestionIndex]}</em>
          {:else}
            {activeSectionLabel}
          {/if}
        </span>
      {/if}
      <button class="cursor-pointer text-grey-800 shrink-0 ml-auto text-sm" onclick={onopen}
        >Menu</button
      >
    </div>
  </div>
</div>

<style>
  .nav-link {
    position: relative;
    text-decoration: none;
    color: var(--color-grey-800);
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: currentColor;
    transition: width 0.3s ease;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  span em {
    margin-left: 8px;
    font-size: 0.875rem;
    font-weight: 400;
    font-style: italic;
    letter-spacing: 3%;
  }
</style>
