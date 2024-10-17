import { RefObject, useEffect, useRef } from 'react';

interface useInfiniteScrollProps {
	callback?: () => void;
	triggerRef: RefObject<HTMLElement>;
	wrapperRef?: RefObject<HTMLElement>;
}

/**
 * Кастомный хук для реализации выполнения переданного колбэка при срабатывании триггера в Intersection Observer API
 * (в частности, для реализации бесконечной ленты с подгрузкой)
 * @param {Object} useInfiniteScrollProps - Объект принимаемых аргументов
 * @param {Function} params.callback - функция, которая будет вызываться при срабатывании обсервера
 * @param {React.RefObject<HTMLElement>} params.triggerRef - компонент, на который будем триггериться
 * @param {React.RefObject<HTMLElement | undefined>} [params.wrapperRef] - компонент, который определяет область видимости для Intersection Observer API.
 * Согласно документации Intersection Observer, если рут null, то отслеживание будет относительно window
 * @returns {void}
 */
export const useInfiniteScroll = ({
	callback,
	triggerRef,
	wrapperRef,
}: useInfiniteScrollProps) => {
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		// useEffect отрабатывает эффекты после основных действий. При попытке перейти на другую страницу мы хотим, чтобы уходили обсерверы с определенных нод. Но так как сначала происходит размонтирование, а потом эффекты, у нас возникает ошибка. Поэтому мы сохраняем эти ноды, а потом с них снимаем обсерв
		const wrapperElement = wrapperRef?.current || null;
		const triggerElement = triggerRef.current;
		if (callback && triggerElement) {
			const options = {
				root: wrapperElement,
				rootMargin: '0px',
				threshold: 1.0,
			};

			observer.current = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					// нужно потому, что иначе в сторибуке будет ломаться страница со статьями
					if (__PROJECT__ !== 'storybook') {
						callback();
					}
				}
			}, options);

			// указываем элемент, за которым будем следить
			observer.current.observe(triggerElement);
		}

		return () => {
			if (observer.current && triggerElement) {
				observer.current.unobserve(triggerElement);
			}
		};
	}, [callback, triggerRef, wrapperRef]);
};
