import { Menu } from '@headlessui/react';
import { ElementType, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import stylesPopup from '../../styles/popup.module.scss';
import styles from './Dropdown.module.scss';

export interface DropdownItem {
	disabled?: boolean;
	content: ReactNode;
	onClick?: () => void;
	ItemType?: ElementType;
	href?: string;
}

interface DropdownProps {
	className?: string;
	items: DropdownItem[];
	trigger?: ReactNode;
	direction?: DropdownDirection;
}

export const Dropdown = ({
	className,
	items,
	trigger,
	direction = 'bottomRight',
}: DropdownProps) => {
	return (
		<Menu
			as="div"
			className={classNames(styles.Dropdown, {}, [
				className,
				stylesPopup.popup,
			])}
		>
			<Menu.Button className={stylesPopup.trigger}>{trigger}</Menu.Button>
			<Menu.Items
				as="ul"
				className={classNames(styles.menu, {}, [stylesPopup[direction]])}
			>
				{items.map(
					({ content, ItemType = 'div', disabled, href, onClick }, index) => (
						<Menu.Item
							as="li"
							disabled={disabled}
							key={`dropdown-key-${index}`}
						>
							{({ active }) => (
								<ItemType
									onClick={onClick}
									href={ItemType === 'a' ? href : undefined}
									to={ItemType === AppLink ? href : undefined}
									className={classNames(
										styles.item,
										{ [stylesPopup.active]: active },
										[],
									)}
								>
									{content}
								</ItemType>
							)}
						</Menu.Item>
					),
				)}
			</Menu.Items>
		</Menu>
	);
};
