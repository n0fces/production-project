import { useTheme } from 'app/providers/ThemeProvider';
import { ReactNode, memo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import styles from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

export const Drawer = memo(
	({ className, children, isOpen, onClose }: DrawerProps) => {
		const { theme } = useTheme();
		const mods: Mods = {
			[styles.opened]: isOpen,
		};
		return (
			<Portal>
				<div
					className={classNames(styles.Drawer, mods, [
						className,
						theme,
						'app_drawer',
					])}
				>
					<Overlay onClick={onClose} />
					<div className={styles.content}>{children}</div>
				</div>
			</Portal>
		);
	}
);
