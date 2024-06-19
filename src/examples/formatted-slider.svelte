<script>
	import RangeSlider from '$lib/range-slider.svelte';

	let values = $state([1000]);
	const currency = new Intl.NumberFormat('jp', { style: 'currency', currency: 'JPY' });
	const short = new Intl.NumberFormat('jp', {
		style: 'currency',
		currency: 'JPY',
		notation: 'compact',
	});

	/** @param {number} value */
	const handleFormatter = (value) => currency.format(value);

	/** @param {number} value */
	const formatter = (value) => short.format(value);

	const max = 10000000;
</script>

<br />
<div style="width: 400px">
	<h2 style="color: white">Formatting</h2>
	<RangeSlider {formatter} {handleFormatter} {max} pipstep={max / 2} step={1} float pips all="label" bind:values />
</div>
