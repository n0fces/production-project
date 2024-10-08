import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateScheme } from '@/app/providers/StoreProvider';

import { getScrollSaveByPath, scrollSaveActions } from '@/features/ScrollSave';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';

import styles from './Page.module.scss';

interface PageProps extends TestProps {
	className?: string;
	children?: ReactNode;
	// для разных страниц нам понадобится своя логика при работе с интерсекши обсервер
	onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = (props: PageProps) => {
	const { className, children, onScrollEnd, 'data-testid': dataTestId } = props;
	const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const scrollPosition = useSelector((state: StateScheme) =>
		getScrollSaveByPath(state, pathname),
	);

	useInfiniteScroll({
		// в новой версии остался только основной скролл, так что мы бередаем undefined, чтобы внутри присвоилось значение null
		// согласно документации Intersection Observer, если рут null, то отслеживание будет относительно window
		wrapperRef: undefined,
		triggerRef,
		callback: onScrollEnd,
	});

	// так будем инициализировать скролл у страницы
	useInitialEffect(() => {
		wrapperRef.current.scrollTop = scrollPosition;
	});

	// не очень понимаю, почему нельзя сохранять скролл только в момент перехода на другую странцу, то есть в момент размонтирования
	// сейчас мы подписываемся на событие скролл
	// короче оставлю пока так, а потом по завершении курса переделаю так, как мне нравится
	const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
		dispatch(
			scrollSaveActions.setScrollPosition({
				position: e.currentTarget.scrollTop,
				path: pathname,
			}),
		);
	}, 500);

	const cls = styles.PageRedesigned;

	return (
		<main
			ref={wrapperRef}
			className={classNames(cls, {}, [className])}
			onScroll={onScroll}
			id={PAGE_ID}
			data-testid={dataTestId ?? 'Page'}>
			{children}
			{/* это будет триггерный элемент, за которым будем следить */}
			{onScrollEnd ? <div className={styles.trigger} ref={triggerRef} /> : null}
		</main>
	);
};
