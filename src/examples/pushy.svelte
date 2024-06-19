<script>
	import RangeSlider from '$lib/range-slider.svelte';

	let values = $state([40, 60]);
</script>

<br />
<div style="width: 400px">
	<h2 style="color: white">Multiple</h2>
	<div data-grid>
		<RangeSlider range pushy pips bind:values />
		<RangeSlider range pips bind:values />
	</div>
</div>
