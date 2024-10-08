import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import stylesPopup from '../../styles/popup.module.scss';
import styles from './Popover.module.scss';

interface PopoverProps {
	className?: string;
	trigger?: ReactNode;
	direction?: DropdownDirection;
	children: ReactNode;
}

export const Popover = ({
	className,
	direction = 'bottomRight',
	trigger,
	children,
}: PopoverProps) => {
	return (
		<HPopover
			className={classNames(styles.Popover, {}, [
				className,
				stylesPopup.popup,
			])}>
			<HPopover.Button as="div" className={stylesPopup.trigger}>
				{trigger}
			</HPopover.Button>
			<HPopover.Panel
				className={classNames(styles.panel, {}, [
					stylesPopup[direction],
					stylesPopup.menu,
				])}>
				{children}
			</HPopover.Panel>
		</HPopover>
	);
};
