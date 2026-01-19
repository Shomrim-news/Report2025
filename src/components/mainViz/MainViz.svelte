<script>
  import { onMount } from 'svelte';
  import { csv } from 'd3-fetch';
  import { autoType } from 'd3-dsv';
  import { scaleTime } from 'd3-scale';
  import { min, max } from 'd3-array';

  import dataUrl from '$lib/data/data.csv?url';

  import TimeAxis from './TimeAxis.svelte';

  let data = $state([]);
  let error = $state(null);
  let loading = $state(true);

  onMount(async () => {
    try {
      // autoType converts numeric/date-ish strings into numbers/dates where possible.
      data = await csv(dataUrl, (d) => ({
        ...d,
        Date: new Date(d.Date),
      }));
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  });

  $inspect('data', data);

  const width = 1600;
  const height = 800;
  const margin = { top: 20, right: 40, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const minDate = $derived.by(() => {
    if (!data.length) return null;
    return min(data, (d) => d.Date);
  });
  const maxDate = $derived.by(() => {
    if (!data.length) return null;
    return max(data, (d) => d.Date);
  });
  const xScale = $derived.by(() => {
    if (!minDate || !maxDate) return null;
    return scaleTime().domain([minDate, maxDate]).range([0, 1600]);
  });
</script>

{#if loading}
  <p>Loading…</p>
{:else if error}
  <p class="error">Failed to load CSV: {error}</p>
{:else}
  <svg viewBox="0 0 {width} {height}" style="border: 1px solid cyan;">
    <g transform="translate({margin.left}, {margin.top + innerHeight})">
      <TimeAxis {xScale} {innerWidth} />
    </g>
  </svg>
{/if}
