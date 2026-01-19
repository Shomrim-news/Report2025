<script>
  let { yScale, innerHeight } = $props();

  const labels = $derived.by(() => {
    if (!yScale) return [];
    const ticks = yScale.domain();
    return ticks.map((t) => ({
      value: t,
      yOffset: yScale(t) + yScale.bandwidth() / 2,
      label: t === 0 ? 'Lower' : t === 1 ? 'Middle' : t === 2 ? 'Upper' : String(t),
    }));
  });
</script>

{#each labels as label}
  <text x="-30" y={label.yOffset + 4} text-anchor="end" style="font-size: 12px;">{label.label}</text
  >
{/each}
