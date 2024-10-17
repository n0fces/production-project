import { ReactNode, useCallback, useEffect, useRef } from 'react';
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
	isSaveScroll?: boolean;
	// для разных страниц нам понадобится своя логика при работе с Intersection Observer
	onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = ({
	className,
	children,
	isSaveScroll = true,
	onScrollEnd,
	'data-testid': dataTestId,
}: PageProps) => {
	const wrapperRef = useRef<HTMLElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const scrollPosition = useSelector((state: StateScheme) =>
		getScrollSaveByPath(state, pathname),
	);

	useInfiniteScroll({
		// в новой версии остался только основной скролл, так что мы бередаем undefined, чтобы внутри присвоилось значение null
		wrapperRef: undefined,
		triggerRef,
		callback: onScrollEnd,
	});

	// так будем инициализировать скролл у страницы
	useInitialEffect(() => {
		if (isSaveScroll) {
			window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
		}
	});

	// eslint-disable-next-line react-hooks/exhaustive-deps -- Функция колбэк внутри useThrottle никаких аргументов не принимает, поэтому useThrottle по итогу просто отдаст () => void
	const onScroll = useCallback(
		useThrottle(() => {
			dispatch(
				scrollSaveActions.setScrollPosition({
					position: window.scrollY,
					path: pathname,
				}),
			);
		}, 500),
		[],
	);

	useEffect(() => {
		if (isSaveScroll) {
			window.addEventListener('scroll', onScroll);
			return () => {
				window.removeEventListener('scroll', onScroll);
			};
		}
	}, [isSaveScroll, onScroll]);

	return (
		<main
			ref={wrapperRef}
			className={classNames(styles.Page, {}, [className])}
			id={PAGE_ID}
			data-testid={dataTestId ?? 'Page'}>
			{children}
			{/* это будет триггерный элемент, за которым будем следить */}
			{onScrollEnd ? <div className={styles.trigger} ref={triggerRef} /> : null}
		</main>
	);
};
