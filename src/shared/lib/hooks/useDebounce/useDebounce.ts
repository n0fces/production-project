import { useCallback, useRef } from 'react';

/**
 * Кастомный хук, который позволяет выполнить действие только тогда, когда пройдет время delay
 * @param callback - функция, которая должна выполниться после delay
 * delay has passed.
 * @param {number} delay - задержка, которая указывает время в миллисекундах и
 * только после которой выполнится callback
 * @returns Возвращает debounced функцию
 */
export const useDebounce = <T extends unknown[]>(
	callback: (...args: T) => void,
	delay: number,
) => {
	const timer = useRef<NodeJS.Timeout>();

	return useCallback(
		(...args: T) => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
			timer.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);
};
