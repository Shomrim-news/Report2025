<script>
  import logo from '$lib/assets/logo.png';
  import ExpandButton from './ExpandButton.svelte';
  import { slide } from 'svelte/transition';

  let isOpen = $state(false);
</script>

<section id="intro">
  <div class="inner-container mt-8">
    <div class="flex flex-col items-center">
      <img src={logo} alt="Shomrim Logo" class="w-61 h-auto" />
      <h1>Annual Report 2025</h1>
    </div>
    <div class="mt-15">
      <div>
        Launched in December 2019, Shomrim (The Guardians) — <span class="font-medium"
          >The Center for Media and Democracy in Israel</span
        > — is an independent, nonprofit newsroom dedicated to strengthening Israeli democracy through
        investigative journalism. Inspired by the ProPublica model, Shomrim operates free of commercial
        and political influence, providing fact-based, data-driven reporting that promotes public accountability.
        Its investigations are published in partnership with leading media outlets across print, broadcast
        and digital platforms to maximize reach and impact. Shomrim invests the time and resources required
        for rigorous investigative work and continues to follow stories beyond publication. Its mission
        is to lead investigations with social impact, amplify underrepresented voices and examine issues
        affecting communities that are often overlooked.
      </div>

      <div class="mt-5">
        <ExpandButton {isOpen} onclick={() => (isOpen = !isOpen)}>
          Learn more about Shomrim’s <span class="font-medium">unique model</span> and our work
          <span class="font-medium">beyond publication</span>.
        </ExpandButton>

        {#if isOpen}
          <div transition:slide>
            <h3>Unique Model</h3>
            <p>
              At the core of Shomrim’s founding model is the ambition to drive meaningful change by
              making reliable, in-depth information accessible to the public, enabling citizens to
              demand accountability from those in power. To achieve this goal, Shomrim operates under
              a model that is unique within the Israeli media landscape.
            </p>
            <h3>Beyond publication</h3>
            <p>
              Shomrim’s work does not end at publication; in many cases, publication marks only the
              midpoint of the investigative process. With the goal of driving meaningful, real-world
              change, Shomrim actively follows each investigation beyond the initial report, working
              to ensure that findings reach centers of power - decision-makers, regulators and
              influential actors in civil society - who are positioned to advance reform, correction,
              and accountability.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
