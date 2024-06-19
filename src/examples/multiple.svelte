<script>
	import RangeSlider from '$lib/range-slider.svelte';
	let values = $state([10, 50, 90]);
	let crazy = $state([10, 20, 30, 40, 50, 60, 70, 80, 90]);
</script>

<br />
<div style="width: 400px">
	<h2 style="color: white">Multiple</h2>
	<RangeSlider bind:values />
	<RangeSlider bind:values={crazy} />
</div>
