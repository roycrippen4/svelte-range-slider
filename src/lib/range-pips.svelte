<script>
	/**
	 * @typedef PipsProps
	 * @property {number}   [min]
	 * @property {number}   [max]
	 * @property {number}   [step]
	 * @property {number[]} [values]
	 * @property {boolean}  [vertical]
	 * @property {boolean}  [reversed]
	 * @property {boolean}  [hoverable]
	 * @property {boolean}  [disabled]
	 * @property {number}   [pipstep]
	 * @property {string}   [prefix]
	 * @property {string}   [suffix]
	 * @property {boolean}  [focus]
	 * @property {boolean|'min'|'max'}   [range]
	 * @property {boolean|'pip'|'label'} [all]
	 * @property {boolean|'pip'|'label'} [first]
	 * @property {boolean|'pip'|'label'} [last]
	 * @property {boolean|'pip'|'label'} [rest]
	 * @property {(v: number) => number} percentOf
	 * @property {(v: number) => number} fixFloat
	 * @property {'top'|'bottom'|'left'|'right'} [orientationStart]
	 * @property {'top'|'bottom'|'left'|'right'} [orientationEnd]
	 * @property {(v: number, i: number, p: number) => string} [formatter]
	 * @property {(index: number, value: number) => number} moveHandle
	 * @property {(e: MouseEvent|TouchEvent) => { x: number, y: number }} normalisedClient
	 */

	/** @type {PipsProps} */
	let {
		range = false,
		min = 0,
		max = 100,
		step = 1,
		values = [(max + min) / 2],
		vertical = false,
		reversed = false,
		hoverable = true,
		disabled = false,
		pipstep,
		all = true,
		first,
		last,
		rest,
		prefix = '',
		suffix = '',
		focus,
		orientationStart,
		// eslint-disable-next-line no-unused-vars
		formatter = (v, i, p) => v.toString(),
		percentOf,
		moveHandle,
		fixFloat,
		normalisedClient,
	} = $props();

	let clientStart = $state({ x: 0, y: 0 });
	let pipStep = $derived(pipstep || ((max - min) / step >= (vertical ? 50 : 100) ? (max - min) / (vertical ? 10 : 20) : 1));
	let pipCount = $derived(parseInt(((max - min) / (step * pipStep)).toString(), 10));
	let pipVal = $derived((/** @type {number} */ val) => fixFloat(min + val * step * pipStep));
	let isSelected = $derived((/** @type {number} */ val) => values.some((v) => fixFloat(v) === fixFloat(val)));
	let inRange = $derived((/** @type {number} */ val) => {
		if (range === 'min') {
			return values[0] > val;
		}
		if (range === 'max') {
			return values[0] < val;
		}
		if (range) {
			return values[0] < val && values[1] > val;
		}
	});

	/**
	 * function to run when the user clicks on a label
	 * we store the original client position so we can check if the user has moved the mouse/finger
	 * @param {MouseEvent} e the event from browser
	 **/
	const labelDown = (e) => {
		clientStart = { x: e.clientX, y: e.clientY };
	};

	/**
	 * function to run when the user releases the mouse/finger
	 * we check if the user has moved the mouse/finger, if not we "click" the label
	 * and move the handle it to the label position
	 * @param {number} val the value of the label
	 * @param {MouseEvent|TouchEvent} e the event from browser
	 */
	function labelUp(val, e) {
		if (disabled) {
			return;
		}

		const clientPos = normalisedClient(e);
		const distanceMoved = Math.sqrt(Math.pow(clientStart.x - clientPos.x, 2) + Math.pow(clientStart.y - clientPos.y, 2));

		if (clientStart && distanceMoved <= 5) {
			moveHandle(undefined, val);
		}
	}
</script>

<div class="rangePips" class:disabled class:hoverable class:vertical class:reversed class:focus>
	{#if (all && first !== false) || first}
		<span
			class="pip first"
			class:selected={isSelected(min)}
			class:in-range={inRange(min)}
			style="{orientationStart}: 0%;"
			onpointerdown={labelDown}
			onpointerup={(e) => labelUp(min, e)}
		>
			{#if all === 'label' || first === 'label'}
				<span class="pipVal">
					{prefix}{formatter(fixFloat(min), 0, 0)}{suffix}
				</span>
			{/if}
		</span>
	{/if}

	{#if (all && rest !== false) || rest}
		<!-- eslint-disable-next-line no-unused-vars -->
		{#each Array(pipCount + 1) as _, i}
			{#if pipVal(i) !== min && pipVal(i) !== max}
				<span
					class="pip"
					class:selected={isSelected(pipVal(i))}
					class:in-range={inRange(pipVal(i))}
					style="{orientationStart}: {percentOf(pipVal(i))}%;"
					onpointerdown={labelDown}
					onpointerup={(e) => labelUp(pipVal(i), e)}
				>
					{#if all === 'label' || rest === 'label'}
						<span class="pipVal">
							{prefix}{formatter(pipVal(i), i, percentOf(pipVal(i)))}{suffix}
						</span>
					{/if}
				</span>
			{/if}
		{/each}
	{/if}

	{#if (all && last !== false) || last}
		<span
			class="pip last"
			class:selected={isSelected(max)}
			class:in-range={inRange(max)}
			style="{orientationStart}: 100%;"
			onpointerdown={labelDown}
			onpointerup={(e) => labelUp(max, e)}
		>
			{#if all === 'label' || last === 'label'}
				<span class="pipVal">
					{prefix}{formatter(fixFloat(max), pipCount, 100)}{suffix}
				</span>
			{/if}
		</span>
	{/if}
</div>

<style>
	:global(.rangeSlider) {
		--pip: var(--range-pip, lightslategray);
		--pip-text: var(--range-pip-text, var(--pip));
		--pip-active: var(--range-pip-active, darkslategrey);
		--pip-active-text: var(--range-pip-active-text, var(--pip-active));
		--pip-hover: var(--range-pip-hover, darkslategrey);
		--pip-hover-text: var(--range-pip-hover-text, var(--pip-hover));
		--pip-in-range: var(--range-pip-in-range, var(--pip-active));
		--pip-in-range-text: var(--range-pip-in-range-text, var(--pip-active-text));
	}
	:global(.rangePips) {
		position: absolute;
		height: 1em;
		left: 0;
		right: 0;
		bottom: -1em;
	}
	:global(.rangePips.vertical) {
		height: auto;
		width: 1em;
		left: 100%;
		right: auto;
		top: 0;
		bottom: 0;
	}
	:global(.rangePips .pip) {
		height: 0.4em;
		position: absolute;
		top: 0.25em;
		width: 1px;
		white-space: nowrap;
	}
	:global(.rangePips.vertical .pip) {
		height: 1px;
		width: 0.4em;
		left: 0.25em;
		top: auto;
		bottom: auto;
	}
	:global(.rangePips .pipVal) {
		position: absolute;
		top: 0.4em;
		transform: translate(-50%, 25%);
	}
	:global(.rangePips.vertical .pipVal) {
		position: absolute;
		top: 0;
		left: 0.4em;
		transform: translate(25%, -50%);
	}
	:global(.rangePips .pip) {
		transition: all 0.15s ease;
	}
	:global(.rangePips .pipVal) {
		transition:
			all 0.15s ease,
			font-weight 0s linear;
	}
	:global(.rangePips .pip) {
		color: lightslategray;
		color: var(--pip-text);
		background-color: lightslategray;
		background-color: var(--pip);
	}
	:global(.rangePips .pip.selected) {
		color: darkslategrey;
		color: var(--pip-active-text);
		background-color: darkslategrey;
		background-color: var(--pip-active);
	}
	:global(.rangePips.hoverable:not(.disabled) .pip:hover) {
		color: darkslategrey;
		color: var(--pip-hover-text);
		background-color: darkslategrey;
		background-color: var(--pip-hover);
	}
	:global(.rangePips .pip.in-range) {
		color: darkslategrey;
		color: var(--pip-in-range-text);
		background-color: darkslategrey;
		background-color: var(--pip-in-range);
	}
	:global(.rangePips .pip.selected) {
		height: 0.75em;
	}
	:global(.rangePips.vertical .pip.selected) {
		height: 1px;
		width: 0.75em;
	}
	:global(.rangePips .pip.selected .pipVal) {
		font-weight: bold;
		top: 0.75em;
	}
	:global(.rangePips.vertical .pip.selected .pipVal) {
		top: 0;
		left: 0.75em;
	}
	:global(.rangePips.hoverable:not(.disabled) .pip:not(.selected):hover) {
		transition: none;
	}
	:global(.rangePips.hoverable:not(.disabled) .pip:not(.selected):hover .pipVal) {
		transition: none;
		font-weight: bold;
	}
</style>
