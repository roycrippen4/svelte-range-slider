/**
 * Event handler for when the slider value changes
 * ---
 * - `activeHandle`  - The index of the active handle.
 * - `startValue`    - Value of the slider when the user started interaction
 * - `previousValue` - Previous value of the active handle
 * - `value`         - Current value of the active handle
 * - `values`        - The bound values array
 */
export type ChangeEvent = {
	/** The index of the active handle. */
	activeHandle: number;
	/** Value of the slider when the user started interaction */
	startValue: number;
	/** Previous value of the active handle */
	previousValue: number;
	/** Current value of the active handle */
	value: number;
	/** The bound values array */
	values: number[];
};

/**
 * Event handler for when the user starts interacting with the slider
 * ---
 * - `activeHandle` - The index of the active handle.
 * - `value`        - Current value of the active handle
 * - `values`       - The bound values array
 */
export type StartEvent = {
	/** The index of the active handle. */
	activeHandle: number;
	/** Current value of the active handle */
	value: number;
	/** The bound values array */
	values: number[];
};

/**
 * Event handler for when the user stops interacting with the slider
 * ---
 * `activeHandle` - Index of the active handle
 * `startValue`   - Value of the slider when the user started interaction
 * `value`        - Current value of the active handle
 * `values`       - The bound values array
 */
export type StopEvent = {
	/** The index of the active handle. */
	activeHandle: number;
	/** Value of the slider when the user started interaction */
	startValue: number;
	/** Current value of the active handle */
	value: number;
	/** The bound values array */
	values: number[];
};

export { default as RangeSliderPips } from './range-slider.svelte';
