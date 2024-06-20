<script>
	import RangeSlider from '$lib/range-slider.svelte';
	let firstValues = $state([25]);
	let secondValues = $state([50]);
	let thirdValues = $state([75]);
	let value = $state(50);
</script>

<div style="width: 400px">
	<h2 style="color: white">Simple</h2>
	<RangeSlider bind:values={firstValues} />
	<RangeSlider bind:values={secondValues} />
	<RangeSlider bind:values={thirdValues} />
	<div>
		<span style="color: white">Single value binding</span>
		<RangeSlider bind:value />
	</div>
</div>
