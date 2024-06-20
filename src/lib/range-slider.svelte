<script>
	import { spring } from 'svelte/motion';
	import RangePips from './range-pips.svelte';

	/**
	 * @typedef RangeSliderProps
	 * @property {boolean|'min'|'max'} [range]
	 * Range style options
	 * ---
	 * `false` - no range styling
	 * `true`  - styles like a range with `min` and `max`
	 * `min`   - styles like a range going from `min` to `value`
	 * `max`   - styles like a range going from `value` to `max`
	 * ---
	 * Default = `false`.
	 *
	 *
	 * @property {(event: { activeHandle: number, startValue: number, previousValue: number, value: number, values: number[] }) => void} [onchange]
	 * Event handler for when the slider value changes
	 * ---
	 * event.[activeHandle]  - Index of the active handle
	 * event.[startValue]    - Value of the slider when the user started interaction
	 * event.[previousValue] - Previous value of the active handle
	 * event.[value]         - Current value of the active handle
	 * event.[values]        - The bound values array
	 *
	 *
	 * @property {(event: { activeHandle: number, value: number, values: number[] }) => void} [onstart]
	 * Event handler for when the user starts interacting with the slider
	 * ---
	 * event.[activeHandle]  - Index of the active handle
	 * event.[value]         - Current value of the active handle
	 * event.[values]        - The bound values array
	 *
	 *
	 * @property {(event: { activeHandle: number, startValue: number, value: number, values: number[] }) => void} [onstop]
	 * Event handler for when the user stops interacting with the slider
	 * ---
	 * event.[activeHandle] - Index of the active handle
	 * event.[startValue]   - Value of the slider when the user started interaction
	 * event.[value]        - Current value of the active handle
	 * event.[values]       - The bound values array
	 *
	 *
	 * @property {boolean} [pushy]
	 * If `range` is `true`, then this determines if the handles should push each other along.
	 * Default = `false`. (the handles will block each other by default).
	 *
	 *
	 * @property {number} [min]
	 * Minimum value for the slider. Should be set lower than `max`.
	 * Default = 0
	 *
	 *
	 * @property {number} [max]
	 * Maximum value for the slider. Should be set higher than `min`.
	 * Default = 100
	 *
	 *
	 * @property {string[]} [ariaLabels]
	 * An array of strings to use for the aria-label attribute on the handles.
	 * Note: The array should be the same length as the values array.
	 * Default = []
	 *
	 *
	 * @property {number} [precision]
	 * Sets the floating point precision for the slider values.
	 * Default = 2
	 *
	 *
	 * @property {number} [precision]
	 * Sets the floating point precision for the slider values.
	 * Default = 2
	 *
	 *
	 * @property {{ stiffness: number, damping: number }} [springOptions]
	 * Stiffness and damping options for the svelte motion spring.
	 * Set both to 1 for no spring effect.
	 * Default = { [stiffness]: 0.15, [damping]: 0.4  }
	 * ---
	 * See [Spring Documentation](https://learn.svelte.dev/tutorial/springs) for more info
	 *
	 *
	 * @property {string} [id]
	 * Sets the id attribute for the slider element.
	 * Default = ''
	 *
	 *
	 * @property {string} [prefix]
	 * String to prepend to all values
	 * Default = ''
	 * ---
	 * Use {@link RangeSliderProps.formatter} for more complicated formatting
	 *
	 *
	 * @property {string} [suffix]
	 * String to append to all values
	 * Default = ''
	 * ---
	 * Use {@link RangeSliderProps.formatter} for more complicated formatting
	 *
	 *
	 * @property {boolean} [pips]
	 * Whether to show pips/notches on the slider.
	 * The pips will be rendered at the pipstep value.
	 * Pips can be styled as necessary, but by default sit below the slider like a gauge.
	 * ---
	 * Default = `false`
	 *
	 *
	 * @property {number} [pipstep]
	 * Every nth step to show a pip for.
	 * This has multiple defaults depending on min, max and step properties.
	 * A sensible default is chosen, but can be overridden.
	 * Note: Value should be positive
	 * ---
	 * Default = 1
	 *
	 *
	 * @property {boolean|"pip"|"label"} [all]
	 * Whether to show a pip *for every value*.
	 * ---
	 * `false` - all values in the slider will not have a pip or label
	 * `true`  - all values in the slider will have a pip and label
	 * "pip"   - a pip (only) will be shown for all values
	 * "label" - label (and pip) is shown on all values
	 * ---
	 * Default = `false`
	 *
	 *
	 * @property {boolean|"pip"|"label"} [first]
	 * Whether to show a pip *for the first value on the slider*.
	 * ---
	 * `false` - The first value will not have a pip or label
	 * `true`  - The first value will have a pip and label
	 * "pip"   - a pip (only) will be shown for the first value
	 * "label" - label (and pip) is shown for the first values
	 * ---
	 * Default = `false`
	 *
	 *
	 * @property {boolean|"pip"|"label"} [last]
	 * Whether to show a pip *for the last value on the slider*.
	 * ---
	 * `false` - The last value will not have a pip or label
	 * `true`  - The last value will have a pip and label
	 * "pip"   - a pip (only) will be shown for the last value
	 * "label" - label (and pip) is shown for the last values
	 * ---
	 * Default = `false`
	 *
	 *
	 * @property {boolean|"pip"|"label"} [rest]
	 * Whether to show a pip *for all values except first and last values*.
	 * ---
	 * `false` - The middle values will not have a pip or label
	 * `true`  - The middle values will have a pip and label
	 * "pip"   - a pip (only) will be shown for the middle values
	 * "label" - label (and pip) is shown for middle values
	 * ---
	 * Default = `false`
	 *
	 *
	 * @property {number} [step]
	 * Every `nth` *value to allow handle to stop at*.
	 * For example, if the step is `5`, then the handle will only stop at `5`, `10`, `15`, etc.
	 * Should be a positive value.
	 * Default = 1
	 *
	 *
	 * @property {number} [value]
	 * Single value to apply on the Slider.
	 * Under the hood, the value is stored in an array.
	 * **Must be used with `bind:value`**.
	 * **Value must be defined with `$state()` rune**.
	 * **Must be a single value with `$state()` rune**.
	 *
	 *
	 * @property {number[]} [values]
	 * Array of values to apply on the Slider.
	 * **Must be used with `bind:values`**.
	 * **Values must be defined with `$state()`**.
	 *
	 * If multiple values are provided, multiple handles will be rendered.
	 * Note: A slider with `range` property can only have two values.
	 * Default = `[`50`]`
	 * ---
	 * Example:
	 * ```svelte
	 * let values = $state([10, 20, 30])
	 *
	 * <RangeSlider bind:values />
	 * ```
	 *
	 *
	 * @property {boolean} [vertical]
	 * Make the slider render vertically (lower value on bottom)
	 * Default = `false`
	 *
	 *
	 * @property {boolean} [float]
	 * Set true to add a floating label above focussed handles.
	 * This is good for displaying the current value of the Slider while interacting with it.
	 * Default = `false`
	 *
	 *
	 * @property {boolean} [reversed]
	 * Reverses the orientation of `min`/`max` values
	 * Default = `false`
	 *
	 *
	 * @property {boolean} [hoverable]
	 * Whether hover styles are enabled for both handles and pips/values
	 * Default = `true`
	 *
	 *
	 * @property {boolean} [disabled]
	 * Determine if the Slider is disabled, or enabled
	 * Default = `false`
	 *
	 *
	 * @property {(value: number, index: number, percent: number) => string} [formatter]
	 * A function to format the value of the slider.
	 * The function should return a string.
	 * ---
	 * Parameters:
	 * value: `number`   - The current value of the handle
	 * index: `number`   - The index of the handle
	 * percent: `number` - The percentage of the handle along the slider
	 * ---
	 * Default = (v) => v
	 *
	 *
	 * @property {(value: number, index: number, percent: number) => string} [handleFormatter]
	 * A function to re-format values on the handle/float before they are displayed.
	 * Defaults to the same function given to the formatter property.
	 * ---
	 * Parameters:
	 * value: `number`   - The current value of the handle
	 * index: `number`   - The index of the handle
	 * percent: `number` - The percentage of the handle along the slider
	 * ---
	 * Default = (v) => v
	 */

	/** @type {RangeSliderProps} */
	let {
		range = false,
		pushy = false,
		min = 0,
		max = 100,
		ariaLabels = [],
		precision = 2,
		springOptions = { stiffness: 0.15, damping: 0.4 },
		id = '',
		prefix = '',
		suffix = '',
		pips = false,
		pipstep,
		all,
		first,
		last,
		rest,
		step = 1,
		value = $bindable(),
		values = $bindable([(max + min) / 2]),
		vertical = false,
		float = false,
		reversed = false,
		hoverable = true,
		disabled = false,
		onchange,
		onstart,
		onstop,
		// eslint-disable-next-line no-unused-vars
		formatter = (value, index, percent) => value.toString(),
		handleFormatter = formatter,
	} = $props();

	if (value) {
		values = [value];
	}

	$inspect(values);

	/** @type {Element} */
	let slider = $state(undefined);
	let valueLength = $state(0);
	let focus = $state(false);
	let handleActivated = $state(false);
	let handlePressed = $state(false);
	let keyboardActive = $state(false);
	let activeHandle = $state(values.length - 1);

	/** @type number */
	let startValue = $state();

	/** @type number */
	let previousValue = $state();

	/**
	 * make sure the value is coerced to a float value
	 * @param {number} v the value to fix
	 * @return {number} a float version of the input
	 **/
	const fixFloat = (v) => parseFloat((+v).toFixed(precision));

	$effect(() => {
		// check that "values" is an array, or set it as array to prevent any errors in springs, or range trimming
		if (!Array.isArray(values)) {
			values = [(max + min) / 2];
			console.error("'values' prop should be an Array (https://github.com/simeydotme/svelte-range-slider-pips#slider-props)");
		}

		// trim the range so it remains as a min/max (only 2 handles)
		// and also align the handles to the steps
		const trimmedAlignedValues = trimRange(values.map((v) => alignValueToStep(v)));
		if (!(values.length === trimmedAlignedValues.length) || !values.every((element, index) => fixFloat(element) === trimmedAlignedValues[index])) {
			values = trimmedAlignedValues;
		}

		// check if the valueLength (length of values[]) has changed,
		// because if so we need to re-seed the spring function with the new values array.
		if (valueLength !== values.length) {
			// set the initial spring values when the slider initialises, or when values array length has changed
			springPositions = spring(
				values.map((v) => percentOf(v)),
				springOptions,
			);
		} else {
			// update the value of the spring function for animated handles whenever the values has updated
			springPositions.set(values.map((v) => percentOf(v)));
		}
		// set the valueLength for the next check
		valueLength = values.length;

		if (values.length > 1 && !Array.isArray(ariaLabels)) {
			console.warn(`'ariaLabels' prop should be an Array (https://github.com/simeydotme/svelte-range-slider-pips#slider-props)`);
		}
	});

	/**
	 * take in a value, and then calculate that value's percentage
	 * of the overall range (min-max);
	 * @param {number} val the value we're getting percent for
	 * @return {number} the percentage value
	 **/
	const percentOf = (/** @type {number} */ val) => {
		let percent = ((val - min) / (max - min)) * 100;

		if (isNaN(percent) || percent <= 0) {
			return 0;
		}

		if (percent >= 100) {
			return 100;
		}

		return fixFloat(percent);
	};

	/**
	 * clamp a value from the range so that it always
	 * falls within the min/max values
	 * @param {number} val the value to clamp
	 * @return {number} the value after it's been clamped
	 **/
	const clampValue = (/** @type {number} */ val) => {
		// return the min/max if outside of that range
		return val <= min ? min : val >= max ? max : val;
	};

	/**
	 * align the value with the steps so that it
	 * always sits on the closest (above/below) step
	 * @param {number} val the value to align
	 * @return {number} the value after it's been aligned
	 **/
	const alignValueToStep = (/** @type {number} */ val) => {
		// sanity check for performance
		if (val <= min) {
			return fixFloat(min);
		}

		if (val >= max) {
			return fixFloat(max);
		}

		val = fixFloat(val);

		// find the middle-point between steps and see if the value is closer to the next step, or previous step
		let remainder = (val - min) % step;
		let aligned = val - remainder;

		if (Math.abs(remainder) * 2 >= step) {
			aligned += remainder > 0 ? step : -step;
		}

		aligned = clampValue(aligned); // make sure the value is within acceptable limits

		// make sure the returned value is set to the precision desired
		// this is also because javascript often returns weird floats
		// when dealing with odd numbers and percentages
		return fixFloat(aligned);
	};

	/**
	 * the orientation of the handles/pips based on the
	 * input values of vertical and reversed
	 * @type {"top"|"bottom"|"left"|"right"} orientationStart
	 **/
	let orientationStart = $derived(vertical ? (reversed ? 'top' : 'bottom') : reversed ? 'right' : 'left');
	let orientationEnd = $derived(vertical ? (reversed ? 'bottom' : 'top') : reversed ? 'left' : 'right');

	/**
	 * helper function to get the index of an element in it's DOM container
	 * @param {Element} el dom object reference we want the index of
	 * @returns {number} the index of the input element
	 **/
	function index(el) {
		if (!el) {
			return -1;
		}

		let i = 0;
		while ((el = el.previousElementSibling)) {
			i++;
		}
		return i;
	}

	/**
	 * normalise a mouse or touch event to return the
	 * client (x/y) object for that event
	 * @param {MouseEvent|TouchEvent} e a mouse/touch event to normalise
	 * @returns {{ x: number, y: number }} normalised event client object (x,y)
	 **/
	function normalisedClient(e) {
		if (e.type.includes('touch')) {
			const touchEvent = /** @type {TouchEvent} */ (e);
			const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];
			return { x: touch.clientX, y: touch.clientY };
		}

		const mouseEvent = /** @type {MouseEvent} */ (e);
		return { x: mouseEvent.clientX, y: mouseEvent.clientY };
	}

	/**
	 * check if an element is a handle on the slider
	 * @param {Element} el dom object reference we want to check
	 * @returns {boolean}
	 **/
	function targetIsHandle(el) {
		const handles = [...slider.querySelectorAll('.handle')];
		const isHandle = handles.includes(el);
		const isChild = handles.some((handle) => handle.contains(el));
		return isHandle || isChild;
	}

	/**
	 * trim the values array based on whether the property
	 * for 'range' is 'min', 'max', or truthy. This is because we
	 * do not want more than one handle for a min/max range, and we do
	 * not want more than two handles for a true range.
	 * @param {number[]} values the input values for the rangeSlider
	 * @return {number[]} the range array for creating a rangeSlider
	 **/
	function trimRange(values) {
		if (range === 'min' || range === 'max') {
			return values.slice(0, 1);
		}
		if (range) {
			return values.slice(0, 2);
		}

		return values;
	}

	/**
	 * helper to return the slider dimensions for finding
	 * the closest handle to user interaction
	 * @return {DOMRect} the range slider DOM client rect
	 **/
	function getSliderDimensions() {
		return slider.getBoundingClientRect();
	}

	/**
	 * helper to return closest handle to user interaction
	 * @param {{ x: number, y: number }} clientPos the client{x,y} positions to check against
	 * @return {number} the index of the closest handle to clientPos
	 **/
	function getClosestHandle(clientPos) {
		// first make sure we have the latest dimensions
		// of the slider, as it may have changed size
		const dims = getSliderDimensions();
		// calculate the interaction position, percent and value
		let handlePos = 0;
		let handlePercent = 0;
		let handleVal = 0;
		if (vertical) {
			handlePos = clientPos.y - dims.top;
			handlePercent = (handlePos / dims.height) * 100;
			handlePercent = reversed ? handlePercent : 100 - handlePercent;
		} else {
			handlePos = clientPos.x - dims.left;
			handlePercent = (handlePos / dims.width) * 100;
			handlePercent = reversed ? 100 - handlePercent : handlePercent;
		}
		handleVal = ((max - min) / 100) * handlePercent + min;

		// if we have a range, and the handles are at the same
		// position, we want a simple check if the interaction
		// value is greater than return the second handle
		if (range === true && values[0] === values[1]) {
			if (handleVal > values[1]) {
				return 1;
			}

			return 0;

			// if there are multiple handles, and not a range, then
			// we sort the handles values, and return the first one closest
			// to the interaction value
		}

		return values.indexOf([...values].sort((a, b) => Math.abs(handleVal - a) - Math.abs(handleVal - b))[0]);
	}

	/**
	 * take the interaction position on the slider, convert
	 * it to a value on the range, and then send that value
	 * through to the moveHandle() method to set the active
	 * handle's position
	 * @param {{ x: number, y: number }} clientPos the client{x,y} of the interaction
	 **/
	function handleInteract(clientPos) {
		// first make sure we have the latest dimensions
		// of the slider, as it may have changed size
		const dims = getSliderDimensions();
		// calculate the interaction position, percent and value
		let handlePos = 0;
		let handlePercent = 0;
		let handleVal = 0;
		if (vertical) {
			handlePos = clientPos.y - dims.top;
			handlePercent = (handlePos / dims.height) * 100;
			handlePercent = reversed ? handlePercent : 100 - handlePercent;
		} else {
			handlePos = clientPos.x - dims.left;
			handlePercent = (handlePos / dims.width) * 100;
			handlePercent = reversed ? 100 - handlePercent : handlePercent;
		}
		handleVal = ((max - min) / 100) * handlePercent + min;
		// move handle to the value
		moveHandle(activeHandle, handleVal);
	}

	/**
	 * move a handle to a specific value, respecting the clamp/align rules
	 * @param {number} index the index of the handle we want to move
	 * @param {number} value the value to move the handle to
	 * @return {number} the value that was moved to (after alignment/clamping)
	 **/
	function moveHandle(index, value) {
		// align & clamp the value so we're not doing extra
		// calculation on an out-of-range value down below
		value = alignValueToStep(value);
		// use the active handle if handle index is not provided
		if (typeof index === 'undefined') {
			index = activeHandle;
		}
		// if this is a range slider perform special checks
		if (range) {
			// restrict the handles of a range-slider from
			// going past one-another unless "pushy" is true
			if (index === 0 && value > values[1]) {
				if (pushy) {
					values[1] = value;
				} else {
					value = values[1];
				}
			} else if (index === 1 && value < values[0]) {
				if (pushy) {
					values[0] = value;
				} else {
					value = values[0];
				}
			}
		}

		// if the value has changed, update it
		if (values[index] !== value) {
			values[index] = value;
		}

		// fire the change event when the handle moves,
		// and store the previous value for the next time
		if (previousValue !== value) {
			handleOnChange();
			previousValue = value;
		}
		return value;
	}

	/**
	 * helper to find the beginning range value for use with css style
	 * @param {number[]} values the input values for the rangeSlider
	 * @return {number} the beginning of the range
	 **/
	function rangeStart(values) {
		if (range === 'min') {
			return 0;
		}

		return values[0];
	}

	/**
	 * helper to find the ending range value for use with css style
	 * @param {array} values the input values for the rangeSlider
	 * @return {number} the end of the range
	 **/
	function rangeEnd(values) {
		if (range === 'max') {
			return 0;
		}

		if (range === 'min') {
			return 100 - values[0];
		}

		return 100 - values[1];
	}

	/**
	 * helper to take a string of html and return only the text
	 * @param {string} possibleHtml the string that may contain html
	 * @return {string} the text from the input
	 */
	function pureText(possibleHtml) {
		return `${possibleHtml}`.replace(/<[^>]*>/g, '');
	}

	/**
	 * when the user has unfocussed (blurred) from the
	 * slider, deactivate all handles
	 **/
	function sliderBlurHandle() {
		if (!keyboardActive) {
			return;
		}

		focus = false;
		handleActivated = false;
		handlePressed = false;
	}

	/**
	 * when the user focusses the handle of a slider
	 * set it to be active
	 * @param {Event} e the event from browser
	 **/
	function sliderFocusHandle(e) {
		if (disabled) {
			return;
		}

		const target = /** @type {HTMLElement} */ (e.target);
		activeHandle = index(target);
		focus = true;
	}

	/**
	 * handle the keyboard accessible features by checking the
	 * input type, and modfier key then moving handle by appropriate amount
	 * @param {KeyboardEvent} e the event from browser
	 **/
	function sliderKeydown(e) {
		if (disabled) {
			return;
		}

		const target = /** @type {HTMLElement} */ (e.target);
		const handle = index(target);
		let jump = e.ctrlKey || e.metaKey || e.shiftKey ? step * 10 : step;
		let prevent = false;

		if (e.key === 'PageDown' || e.key === 'PageUp') {
			jump *= 10;
		}

		if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
			moveHandle(handle, values[handle] + jump);
			prevent = true;
		}

		if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
			moveHandle(handle, values[handle] - jump);
			prevent = true;
		}

		if (e.key === 'Home') {
			moveHandle(handle, min);
			prevent = true;
		}

		if (e.key === 'End') {
			moveHandle(handle, max);
			prevent = true;
		}

		if (prevent) {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	/**
	 * function to run when the user touches the slider element anywhere
	 * @param {MouseEvent|TouchEvent} e the event from browser
	 **/
	function sliderInteractStart(e) {
		if (disabled) {
			return;
		}

		const element = /** @type {Element} */ (e.target);
		const clientPos = normalisedClient(e);
		// set the closest handle as active
		focus = true;
		handleActivated = true;
		handlePressed = true;
		activeHandle = getClosestHandle(clientPos);

		// fire the start event
		startValue = previousValue = alignValueToStep(values[activeHandle]);
		handleOnStart();

		// for touch devices we want the handle to instantly
		// move to the position touched for more responsive feeling
		if (e.type === 'touchstart' && !element.matches('.pipVal')) {
			handleInteract(clientPos);
		}
	}

	/**
	 * function to run when the user stops touching
	 * down on the slider element anywhere
	 * @param {event} e the event from browser
	 **/
	function sliderInteractEnd(e) {
		// fire the stop event for touch devices
		if (e.type === 'touchend') {
			handleOnStop();
		}
		handlePressed = false;
	}

	/**
	 * unfocus the slider if the user clicked off of
	 * it, somewhere else on the screen
	 * @param {MouseEvent|TouchEvent} e the event from browser
	 **/
	function bodyInteractStart(e) {
		keyboardActive = false;
		const target = /** @type {Element} */ (e.target);
		if (focus && e.target !== slider && !slider.contains(target)) {
			focus = false;
		}
	}

	/**
	 * send the clientX through to handle the interaction
	 * whenever the user moves across screen while active
	 * @param {MouseEvent|TouchEvent} e the event from browser
	 **/
	function bodyInteract(e) {
		if (!disabled) {
			if (handleActivated) {
				handleInteract(normalisedClient(e));
			}
		}
	}

	/**
	 * if user triggers mouseup on the body while
	 * a handle is active (without moving) then we
	 * trigger an interact event there
	 * @param {MouseEvent|TouchEvent} e the event from browser
	 **/
	function bodyMouseUp(e) {
		if (!disabled) {
			const el = /** @type {Element} */ (e.target);
			// this only works if a handle is active, which can
			// only happen if there was sliderInteractStart triggered
			// on the slider, already
			if (handleActivated) {
				if (el === slider || slider.contains(el)) {
					focus = true;
					// don't trigger interact if the target is a handle (no need) or
					// if the target is a label (we want to move to that value from rangePips)
					if (!targetIsHandle(el) && !el.matches('.pipVal')) {
						handleInteract(normalisedClient(e));
					}
				}
				// fire the stop event for mouse device
				// when the body is triggered with an active handle
				handleOnStop();
			}
		}
		handleActivated = false;
		handlePressed = false;
	}

	/**
	 * @param {KeyboardEvent} e
	 */
	function bodyKeyDown(e) {
		if (disabled) {
			return;
		}

		const target = /** @type {Element} */ (e.target);

		if (e.target === slider || slider.contains(target)) {
			keyboardActive = true;
		}
	}

	function handleOnStop() {
		if (disabled || !onstop || typeof onstop !== 'function') {
			return;
		}

		onstop({
			activeHandle,
			startValue,
			value: values[activeHandle],
			values: values.map((v) => alignValueToStep(v)),
		});
	}

	function handleOnStart() {
		if (disabled || !onstart || typeof onstart !== 'function') {
			return;
		}

		onstart({
			activeHandle,
			value: startValue,
			values: values.map((v) => alignValueToStep(v)),
		});
	}

	function handleOnChange() {
		if (disabled || !onchange || typeof onchange !== 'function') {
			return;
		}

		onchange({
			activeHandle,
			startValue: startValue,
			previousValue: typeof previousValue === 'undefined' ? startValue : previousValue,
			value: values[activeHandle],
			values: values.map((v) => alignValueToStep(v)),
		});
	}

	/** @type {import('svelte/motion').Spring<number[]>} */
	let springPositions = spring(
		values.map((v) => percentOf(v)),
		springOptions,
	);
</script>

<div
	{id}
	bind:this={slider}
	role="none"
	class="rangeSlider"
	class:range
	class:disabled
	class:hoverable
	class:vertical
	class:reversed
	class:focus
	class:min={range === 'min'}
	class:max={range === 'max'}
	class:pips
	class:pip-labels={all === 'label' || first === 'label' || last === 'label' || rest === 'label'}
	onmousedown={sliderInteractStart}
	onmouseup={sliderInteractEnd}
>
	{#each values as value, index}
		<span
			role="slider"
			class="rangeHandle"
			class:active={focus && activeHandle === index}
			class:press={handlePressed && activeHandle === index}
			data-handle={index}
			onblur={sliderBlurHandle}
			onfocus={sliderFocusHandle}
			onkeydown={sliderKeydown}
			style="{orientationStart}: {$springPositions[index]}%; z-index: {activeHandle === index ? 3 : 2};"
			aria-label={ariaLabels[index]}
			aria-valuemin={range === true && index === 1 ? values[0] : min}
			aria-valuemax={range === true && index === 0 ? values[1] : max}
			aria-valuenow={value}
			aria-valuetext="{prefix}{pureText(handleFormatter(value, index, percentOf(value)).toString())}{suffix}"
			aria-orientation={vertical ? 'vertical' : 'horizontal'}
			aria-disabled={disabled}
			tabindex={disabled ? -1 : 0}
		>
			<span class="rangeNub"></span>
			{#if float}
				<span class="rangeFloat">
					{#if prefix}
						<span class="rangeFloat-prefix">{prefix}</span>
					{/if}

					{handleFormatter(value, index, percentOf(value))}

					{#if suffix}
						<span class="rangeFloat-suffix">{suffix}</span>
					{/if}
				</span>
			{/if}
		</span>
	{/each}

	{#if range}
		<span
			class="rangeBar"
			style="{orientationStart}: {rangeStart($springPositions)}%; 
             {orientationEnd}: {rangeEnd($springPositions)}%;"
		></span>
	{/if}

	{#if pips}
		<RangePips
			{values}
			{min}
			{max}
			{step}
			{range}
			{vertical}
			{reversed}
			{orientationStart}
			{hoverable}
			{disabled}
			{all}
			{first}
			{last}
			{rest}
			{pipstep}
			{prefix}
			{suffix}
			{formatter}
			{focus}
			{percentOf}
			{moveHandle}
			{fixFloat}
			{normalisedClient}
		/>
	{/if}
</div>

<svelte:window onmousedown={bodyInteractStart} onmousemove={bodyInteract} onmouseup={bodyMouseUp} onkeydown={bodyKeyDown} />

<style>
	:global(.rangeSlider) {
		--slider: var(--range-slider, #d7dada);
		--handle-inactive: var(--range-handle-inactive, #99a2a2);
		--handle: var(--range-handle, #838de7);
		--handle-focus: var(--range-handle-focus, #4a40d4);
		--handle-border: var(--range-handle-border, var(--handle));
		--range-inactive: var(--range-range-inactive, var(--handle-inactive));
		--range: var(--range-range, var(--handle-focus));
		--float-inactive: var(--range-float-inactive, var(--handle-inactive));
		--float: var(--range-float, var(--handle-focus));
		--float-text: var(--range-float-text, white);
	}
	:global(.rangeSlider) {
		position: relative;
		border-radius: 100px;
		height: 0.5em;
		margin: 1em;
		transition: opacity 0.2s ease;
		user-select: none;
	}
	:global(.rangeSlider *) {
		user-select: none;
	}
	:global(.rangeSlider.pips) {
		margin-bottom: 1.8em;
	}
	:global(.rangeSlider.pip-labels) {
		margin-bottom: 2.8em;
	}
	:global(.rangeSlider.vertical) {
		display: inline-block;
		border-radius: 100px;
		width: 0.5em;
		min-height: 200px;
	}
	:global(.rangeSlider.vertical.pips) {
		margin-right: 1.8em;
		margin-bottom: 1em;
	}
	:global(.rangeSlider.vertical.pip-labels) {
		margin-right: 2.8em;
		margin-bottom: 1em;
	}
	:global(.rangeSlider .rangeHandle) {
		position: absolute;
		display: block;
		height: 1.4em;
		width: 1.4em;
		top: 0.25em;
		bottom: auto;
		transform: translateY(-50%) translateX(-50%);
		z-index: 2;
	}
	:global(.rangeSlider.reversed .rangeHandle) {
		transform: translateY(-50%) translateX(50%);
	}
	:global(.rangeSlider.vertical .rangeHandle) {
		left: 0.25em;
		top: auto;
		transform: translateY(50%) translateX(-50%);
	}
	:global(.rangeSlider.vertical.reversed .rangeHandle) {
		transform: translateY(-50%) translateX(-50%);
	}
	:global(.rangeSlider .rangeNub),
	:global(.rangeSlider .rangeHandle:before) {
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		border-radius: 10em;
		height: 100%;
		width: 100%;
		transition: box-shadow 0.2s ease;
	}
	:global(.rangeSlider .rangeHandle:before) {
		content: '';
		left: 1px;
		top: 1px;
		bottom: 1px;
		right: 1px;
		height: auto;
		width: auto;
		box-shadow: 0 0 0 0px var(--handle-border);
		opacity: 0;
	}
	:global(.rangeSlider.hoverable:not(.disabled) .rangeHandle:hover:before) {
		box-shadow: 0 0 0 8px var(--handle-border);
		opacity: 0.2;
	}
	:global(.rangeSlider.hoverable:not(.disabled) .rangeHandle.press:before),
	:global(.rangeSlider.hoverable:not(.disabled) .rangeHandle.press:hover:before) {
		box-shadow: 0 0 0 12px var(--handle-border);
		opacity: 0.4;
	}
	:global(.rangeSlider.range:not(.min):not(.max) .rangeNub) {
		border-radius: 10em 10em 10em 1.6em;
	}
	:global(.rangeSlider.range .rangeHandle:nth-of-type(1) .rangeNub) {
		transform: rotate(-135deg);
	}
	:global(.rangeSlider.range .rangeHandle:nth-of-type(2) .rangeNub) {
		transform: rotate(45deg);
	}
	:global(.rangeSlider.range.reversed .rangeHandle:nth-of-type(1) .rangeNub) {
		transform: rotate(45deg);
	}
	:global(.rangeSlider.range.reversed .rangeHandle:nth-of-type(2) .rangeNub) {
		transform: rotate(-135deg);
	}
	:global(.rangeSlider.range.vertical .rangeHandle:nth-of-type(1) .rangeNub) {
		transform: rotate(135deg);
	}
	:global(.rangeSlider.range.vertical .rangeHandle:nth-of-type(2) .rangeNub) {
		transform: rotate(-45deg);
	}
	:global(.rangeSlider.range.vertical.reversed .rangeHandle:nth-of-type(1) .rangeNub) {
		transform: rotate(-45deg);
	}
	:global(.rangeSlider.range.vertical.reversed .rangeHandle:nth-of-type(2) .rangeNub) {
		transform: rotate(135deg);
	}
	:global(.rangeSlider .rangeFloat) {
		display: block;
		position: absolute;
		left: 50%;
		top: -0.5em;
		transform: translate(-50%, -100%);
		font-size: 1em;
		text-align: center;
		opacity: 0;
		pointer-events: none;
		white-space: nowrap;
		transition: all 0.2s ease;
		font-size: 0.9em;
		padding: 0.2em 0.4em;
		border-radius: 0.2em;
	}
	:global(.rangeSlider .rangeHandle.active .rangeFloat),
	:global(.rangeSlider.hoverable .rangeHandle:hover .rangeFloat) {
		opacity: 1;
		top: -0.2em;
		transform: translate(-50%, -100%);
	}
	:global(.rangeSlider .rangeBar) {
		position: absolute;
		display: block;
		transition: background 0.2s ease;
		border-radius: 1em;
		height: 0.5em;
		top: 0;
		user-select: none;
		z-index: 1;
	}
	:global(.rangeSlider.vertical .rangeBar) {
		width: 0.5em;
		height: auto;
	}
	:global(.rangeSlider) {
		background-color: #d7dada;
		background-color: var(--slider);
	}
	:global(.rangeSlider .rangeBar) {
		background-color: #99a2a2;
		background-color: var(--range-inactive);
	}
	:global(.rangeSlider.focus .rangeBar) {
		background-color: #838de7;
		background-color: var(--range);
	}
	:global(.rangeSlider .rangeNub) {
		background-color: #99a2a2;
		background-color: var(--handle-inactive);
	}
	:global(.rangeSlider.focus .rangeNub) {
		background-color: #838de7;
		background-color: var(--handle);
	}
	:global(.rangeSlider .rangeHandle.active .rangeNub) {
		background-color: #4a40d4;
		background-color: var(--handle-focus);
	}
	:global(.rangeSlider .rangeFloat) {
		color: white;
		color: var(--float-text);
		background-color: #99a2a2;
		background-color: var(--float-inactive);
	}
	:global(.rangeSlider.focus .rangeFloat) {
		background-color: #4a40d4;
		background-color: var(--float);
	}
	:global(.rangeSlider.disabled) {
		opacity: 0.5;
	}
	:global(.rangeSlider.disabled .rangeNub) {
		background-color: #d7dada;
		background-color: var(--slider);
	}
</style>
