<script>
	import RangeSlider from '$lib/range-slider.svelte';
	let firstValues = $state([25]);
	let secondValues = $state([50]);
	let thirdValues = $state([75]);
</script>

<div style="width: 400px">
	<h2 style="color: white">Simple</h2>
	<RangeSlider bind:values={firstValues} />
	<RangeSlider bind:values={secondValues} />
	<RangeSlider bind:values={thirdValues} />
</div>
