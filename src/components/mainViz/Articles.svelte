<script>
  import atom from '$lib/assets/atom.png';

  let { data, xScale, yScale } = $props();

  const imgWidth = 200 / 2;
  const imgHeight = 314 / 2;

  // Deterministic pseudo-random generator from a string key
  function hash01(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    // Map to [0, 1)
    return (h >>> 0) / 4294967296;
  }

  function randomYOffset(d) {
    const band = yScale.bandwidth();
    const usable = Math.max(0, band - imgHeight);

    if (usable === 0) return 0;

    const center = usable / 2;

    // Increase this for more vertical variation
    const jitter = usable * 0.45; // 45% of the available space

    const key = `${d.Date}-${d.impact}`;
    const r = hash01(key) * 2 - 1; // [-1, 1]

    return Math.max(0, Math.min(usable, center + r * jitter));
  }
</script>

{#each data as d}
  <image
    href={atom}
    x={xScale(d.Date) - imgWidth / 2}
    y={yScale(d.impact) + randomYOffset(d)}
    width={imgWidth}
    height={imgHeight}
    opacity="0.8"
    preserveAspectRatio="xMidYMid meet"
  />
{/each}
