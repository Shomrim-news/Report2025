<script>
  let { yScale, innerHeight } = $props();

  const labels = $derived.by(() => {
    if (!yScale) return [];
    const ticks = yScale.domain();
    return ticks.map((t) => ({
      value: t,
      yOffset: yScale(t) + yScale.bandwidth() / 2,
      label: t === 0 ? 'Low' : t === 1 ? 'Medium' : t === 2 ? 'High' : String(t),
    }));
  });
</script>

<line x1="0" y1="0" x2="0" y2={innerHeight} stroke="black" />
{#each labels as label}
  <line x1="0" y1={label.yOffset} x2="-6" y2={label.yOffset} stroke="black" />
  <text x="-10" y={label.yOffset + 4} text-anchor="end" style="font-size: 12px;">{label.label}</text
  >
{/each}
