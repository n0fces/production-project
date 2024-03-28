import { MutableRefObject, useEffect, useRef } from 'react';

interface useInfiniteScrollProps {
	// функция, которая будет вызываться при срабатывании обсервера
	callback?: () => void;
	// компонент, на который будем триггериться
	triggerRef: MutableRefObject<HTMLElement>;
	wrapperRef: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = ({
	callback,
	triggerRef,
	wrapperRef,
}: useInfiniteScrollProps) => {
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		// useEffect отрабатывает эффекты после основных действий. При попытке перейти на другую страницу мы хотим, чтобы уходили обсерверы с определенных нод. Но так как сначала происходит размонтирование, а потом эффекты, у нас возникает ошибка. Поэтому мы сохраняем эти ноды, а потом с них снимаем обсерв
		const wrapperElement = wrapperRef.current;
		const triggerElement = triggerRef.current;
		if (callback) {
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
