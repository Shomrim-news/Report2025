<script>
  let { xScale, innerWidth } = $props();

  const labels = $derived.by(() => {
    if (!xScale) return [];
    const ticks = xScale.ticks(12);
    return ticks.map((t) => ({
      value: t,
      xOffset: xScale(t),
      label: xScale.tickFormat(12, '%b')(t),
    }));
  });
  $inspect('labels', labels);
</script>

<line x1="0" y1="0" x2={innerWidth} y2="0" stroke="black" />
{#each labels as label}
  <line x1={label.xOffset} y1="0" x2={label.xOffset} y2="6" stroke="black" />
  <text x={label.xOffset} y="20" text-anchor="middle">{label.label}</text>
{/each}
