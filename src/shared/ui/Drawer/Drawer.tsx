import { useTheme } from 'app/providers/ThemeProvider';
import { ReactNode, memo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import styles from './Drawer.module.scss';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

export const Drawer = memo(
	({ className, children, isOpen, onClose, lazy }: DrawerProps) => {
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
		if (lazy && !isMounted) {
			return null;
		}
		return (
			<Portal>
				<div
					className={classNames(styles.Drawer, mods, [
						className,
						theme,
						'app_drawer',
					])}
				>
					<Overlay onClick={close} />
					<div className={styles.content}>{children}</div>
				</div>
			</Portal>
		);
	}
);
