import { useTheme } from 'app/providers/ThemeProvider';
import React, {
	MutableRefObject,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import styles from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = ({
	className,
	children,
	isOpen,
	onClose,
	lazy,
}: ModalProps) => {
	const [isClosing, setIsClosing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const { theme } = useTheme();
	const timerRef = useRef() as MutableRefObject<
		ReturnType<typeof setTimeout>
	>;

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	const mods: Mods = {
		[styles.opened]: isOpen,
		[styles.isClosing]: isClosing,
	};

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') closeHandler();
		},
		[closeHandler]
	);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}
		return () => {
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	// * хз, зачем здесь lazy
	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div
				className={classNames(styles.Modal, mods, [
					className,
					theme,
					'app_modal',
				])}
			>
				<Overlay onClick={closeHandler} />
				<div className={styles.content}>
					{children}
				</div>
			</div>
		</Portal>
	);
};
