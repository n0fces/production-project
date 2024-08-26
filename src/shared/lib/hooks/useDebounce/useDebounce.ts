import { MutableRefObject, useCallback, useRef } from 'react';

/**
 * The useDebounce function in TypeScript allows you to debounce a callback function with a specified
 * delay.
 * @param callback - The `callback` parameter is a function that will be called after the debounce
 * delay has passed.
 * @param {number} delay - The `delay` parameter specifies the amount of time in milliseconds to wait
 * before invoking the `callback` function after the last debounced function call.
 * @returns The `useDebounce` function is returning a debounced version of the provided callback
 * function. This debounced function will delay invoking the original callback until a specified amount
 * of time has passed without the function being called again.
 */
export const useDebounce = (
	callback: (...args: any[]) => void,
	delay: number
) => {
	const timer = useRef() as MutableRefObject<any>;

	return useCallback(
		(...args: any[]) => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
			timer.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);
};
