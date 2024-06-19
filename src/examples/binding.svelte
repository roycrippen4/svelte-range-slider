<script>
	import RangeSlider from '$lib/range-slider.svelte';
	let values = $state([11]);
	let myValues = $state([69]);
</script>

<br />
<div style="width: 400px; display: flex; flex-direction: column; border-color: gray; border-width: 2px;">
	<h2 style="color: white">Binding</h2>
	<RangeSlider bind:values disabled />
	<span style="background-color: gray; padding: 0.5rem; width: fit-content; border-radius: 2px;">bind:values ( {values} )</span>
	<RangeSlider bind:values={myValues} />
	<span style="background-color: gray; padding: 0.5rem; width: fit-content; border-radius: 2px;">bind:values={'{'}myValues{'}'} ( {myValues} )</span>
</div>
