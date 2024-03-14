import { MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import styles from './Page.module.scss';

interface PageProps {
	className?: string;
	children?: ReactNode;
	// для разных страниц нам понадобится своя логика при работе с интерсекши обсервер
	onlScrollEnd?: () => void;
}

export const Page = ({ className, children, onlScrollEnd }: PageProps) => {
	const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

	useInfiniteScroll({
		wrapperRef,
		triggerRef,
		callback: onlScrollEnd,
	});

	return (
		<section
			ref={wrapperRef}
			className={classNames(styles.Page, {}, [className])}
		>
			{children}
			{/* это будет триггерный элемент, за которым будем следить */}
			<div ref={triggerRef} />
		</section>
	);
};
