import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import { Icon } from '../../../Icon';
import { HStack } from '../../../Stack';
import stylesPopup from '../../styles/popup.module.scss';
import styles from './ListBox.module.scss';
import { ListBoxButton } from './ui/ListBoxButton/ListBoxButton';

export interface ListBoxItem<T extends string> {
	value: T;
	content: ReactNode;
	disabled?: boolean;
}

interface ListBoxProps<T extends string> {
	items?: ListBoxItem<T>[];
	className?: string;
	value?: T;
	// значение по умолчанию, когда у нас не выбран еще какой-то value
	defaultValue?: string;
	onChange: (value: T) => void;
	readOnly?: boolean;
	direction?: DropdownDirection;
	label?: string;
}

export const ListBox = <T extends string>({
	className,
	items,
	value,
	defaultValue,
	onChange,
	readOnly,
	direction = 'bottomRight',
	label,
}: ListBoxProps<T>) => {
	const selectedItem = items?.find((item) => item.value === value);
	// потом, если будет время, можно перейти на более свежую версию данной библиотеки
	return (
		<HStack gap="4">
			{label && (
				<span className={readOnly ? stylesPopup.disabled : undefined}>
					{`${label}>`}
				</span>
			)}
			<HListBox
				as="div"
				disabled={readOnly}
				className={classNames(styles.ListBox, {}, [
					className,
					stylesPopup.popup,
				])}
				value={value}
				onChange={onChange}>
				<ListBoxButton
					variant="filled"
					disabled={readOnly}
					addonRight={<Icon Svg={ArrowIcon} />}
					className={stylesPopup.trigger}>
					{selectedItem?.content ?? defaultValue}
				</ListBoxButton>
				<HListBox.Options
					className={classNames(styles.options, {}, [
						stylesPopup[direction],
						stylesPopup.menu,
					])}>
					{items?.map((item) => (
						<HListBox.Option
							key={item.value}
							value={item.value}
							disabled={item.disabled}
							as={Fragment}>
							{({ active, selected }) => (
								<li
									className={classNames(
										styles.item,
										{
											[stylesPopup.active]: active,
											[stylesPopup.disabled]: item.disabled,
											[styles.selected]: selected,
										},
										[],
									)}>
									{item.content}
								</li>
							)}
						</HListBox.Option>
					))}
				</HListBox.Options>
			</HListBox>
		</HStack>
	);
};
