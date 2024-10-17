import { useCallback, useRef } from 'react';

/**
 * Кастомный хук, который позволяет выполнить только одно событие в промежуток времени, который мы зададим
 * @param callback - функция, которую мы хотим "затротлить".
 * Функция будет вызвана с предоставленными параметрами один раз в указанную задержку
 * @param {number} delay - задержка, которая показывает время в миллисекундах, раз в которое будет
 * происходить целевое действие
 * @returns Возвращает функцию, которая будет "затротлена", то есть выполняться один раз в указанный
 * период времени. Подходит для действий, которые часто выполняются
 */
export const useThrottle = <T extends unknown[]>(
	callback: (...args: T) => void,
	delay: number,
) => {
	const throttleRef = useRef(false);

	return useCallback(
		(...args: T) => {
			if (!throttleRef.current) {
				callback(...args);
				throttleRef.current = true;

				// только спустя задержку позволяем выполнить действие
				setTimeout(() => {
					throttleRef.current = false;
				}, delay);
			}
		},
		[callback, delay],
	);
};
