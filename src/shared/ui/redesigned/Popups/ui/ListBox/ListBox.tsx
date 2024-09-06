import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../../redesigned/Stack';
import stylesPopup from '../../styles/popup.module.scss';
import styles from './ListBox.module.scss';

export interface ListBoxItem<T extends string> {
	value: string;
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
				onChange={onChange}
			>
				{/* Здесь кнопка в кнопке, что обязательно нужно исправить */}
				<HListBox.Button className={stylesPopup.trigger}>
					<Button variant="filled" disabled={readOnly}>
						{selectedItem?.content ?? defaultValue}
					</Button>
				</HListBox.Button>
				<HListBox.Options
					className={classNames(styles.options, {}, [
						stylesPopup[direction],
						stylesPopup.menu,
					])}
				>
					{items?.map((item) => (
						<HListBox.Option
							key={item.value}
							value={item.value}
							disabled={item.disabled}
							as={Fragment}
						>
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
									)}
								>
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
