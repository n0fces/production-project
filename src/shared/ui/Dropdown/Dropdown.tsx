import { ElementType, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import styles from './Dropdown.module.scss';
import { AppLink } from '../AppLink/AppLink';

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
		<Menu as='div' className={classNames(styles.Dropdown, {}, [className])}>
			<Menu.Button className={styles.btn}>{trigger}</Menu.Button>
			<Menu.Items
				as='ul'
				className={classNames(styles.menu, {}, [styles[direction]])}
			>
				{items.map(
					({
						content,
						ItemType = 'div',
						disabled,
						href,
						onClick,
					}) => (
						<Menu.Item as='li' disabled={disabled}>
							{({ active }) => (
								<ItemType
									onClick={onClick}
									href={ItemType === 'a' ? href : undefined}
									to={ItemType === AppLink ? href : undefined}
									className={classNames(
										styles.item,
										{ [styles.active]: active },
										[]
									)}
								>
									{content}
								</ItemType>
							)}
						</Menu.Item>
					)
				)}
			</Menu.Items>
		</Menu>
	);
};
