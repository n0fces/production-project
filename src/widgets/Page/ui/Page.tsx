import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScrollSaveByPath, scrollSaveActions } from '@/features/ScrollSave';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { StateScheme } from '@/app/providers/StoreProvider';
import styles from './Page.module.scss';
import { TestProps } from '@/shared/types/tests';

interface PageProps extends TestProps {
	className?: string;
	children?: ReactNode;
	// для разных страниц нам понадобится своя логика при работе с интерсекши обсервер
	onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = (props: PageProps) => {
	const {
		className,
		children,
		onScrollEnd,
		'data-testid': dataTestId,
	} = props;
	const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const scrollPosition = useSelector((state: StateScheme) =>
		getScrollSaveByPath(state, pathname)
	);

	useInfiniteScroll({
		wrapperRef,
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
			})
		);
	}, 500);

	return (
		<main
			ref={wrapperRef}
			className={classNames(styles.Page, {}, [className])}
			onScroll={onScroll}
			id={PAGE_ID}
			data-testid={dataTestId ?? 'Page'}
		>
			{children}
			{/* это будет триггерный элемент, за которым будем следить */}
			{onScrollEnd ? (
				<div className={styles.trigger} ref={triggerRef} />
			) : null}
		</main>
	);
};
