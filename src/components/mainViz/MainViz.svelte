<script>
  import { onMount } from 'svelte';
  import { csv } from 'd3-fetch';
  import { autoType } from 'd3-dsv';
  import { scaleTime, scaleBand } from 'd3-scale';
  import { min, max } from 'd3-array';

  import dataUrl from '$lib/data/data.csv?url';

  import TimeAxis from './TimeAxis.svelte';
  import YAxis from './YAxis.svelte';

  let data = $state([]);
  let error = $state(null);
  let loading = $state(true);

  const getImpact = (i) => {
    switch (true) {
      case i === undefined || i === null || i === '':
        return 0;
      case i === '1':
        return 1;
      case i === '2':
      case i === '3':
      case i === '1,2':
      case i === '1,3':
      case i === '1, 2':
      case i === '1, 3':
      case i === '2, 1':
      case i === '3, 1':
        return 3;
    }
  };

  onMount(async () => {
    try {
      // autoType converts numeric/date-ish strings into numbers/dates where possible.
      data = await csv(dataUrl, (d) => ({
        ...d,
        Date: new Date(d.Date),
        impact: getImpact(d['Impact level']),
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
  const margin = { top: 20, right: 40, bottom: 30, left: 60 };
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

  const yScale = $derived.by(() => {
    return scaleBand().domain([0, 1, 2]).range([innerHeight, 0]);
  });
</script>

{#if loading}
  <p>Loading…</p>
{:else if error}
  <p class="error">Failed to load CSV: {error}</p>
{:else}
  <svg viewBox="0 0 {width} {height}">
    <g transform="translate({margin.left}, {margin.top + innerHeight})">
      <TimeAxis {xScale} {innerWidth} />
    </g>
    <g transform="translate({margin.left}, {margin.top})">
      <YAxis {yScale} {innerHeight} />
    </g>
  </svg>
{/if}
