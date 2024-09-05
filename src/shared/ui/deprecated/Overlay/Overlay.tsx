import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Overlay.module.scss';

interface OverlayProps {
	className?: string;
	onClick?: () => void;
}

// отвечает за затемнение бэкграунда для различный элементов по типу Modal, Drawer
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Overlay = memo(({ className, onClick }: OverlayProps) => {
	return (
		<div
			onClick={onClick}
			className={classNames(styles.Overlay, {}, [className])}
		/>
	);
});
