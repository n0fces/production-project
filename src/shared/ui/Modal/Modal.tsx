import { ReactNode } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

export const Modal = ({
	className,
	children,
	isOpen,
	onClose,
	lazy,
}: ModalProps) => {
	const { close, isClosing, isMounted } = useModal({
		animationDelay: 300,
		isOpen,
		onClose,
	});
	const { theme } = useTheme();

	const mods: Mods = {
		[styles.opened]: isOpen,
		[styles.isClosing]: isClosing,
	};

	// * хз, зачем здесь lazy
	// * просто здесь lazy как будто бы не про то, что мы ожидаем
	// * я бы потом выпилил при рефакторинге
	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal element={document.getElementById('app') ?? document.body}>
			<div
				className={classNames(styles.Modal, mods, [
					className,
					theme,
					'app_modal',
					styles.modalNew,
				])}>
				<Overlay onClick={close} />
				<div className={styles.content}>{children}</div>
			</div>
		</Portal>
	);
};
