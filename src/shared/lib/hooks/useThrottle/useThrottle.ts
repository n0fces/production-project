import { useCallback, useRef } from 'react';

// позволяет выполнить только одно событие в промежуток времени, который мы зададим
export const useThrottle = (
	callback: (...args: any[]) => void,
	delay: number
) => {
	// хранит булевое значение, которое показывает, можно ли выполнять действие или нет
	const throttleRef = useRef(false);
	return useCallback((...args: any[]) => {
		if (!throttleRef.current) {
			callback(...args);
			throttleRef.current = true;

			// только спустя задержку позволяем выполнить действие
			setTimeout(() => {
				throttleRef.current = false;
			}, delay);
		}
	}, [callback, delay]);
};
