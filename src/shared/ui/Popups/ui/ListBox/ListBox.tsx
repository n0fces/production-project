import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import stylesPopup from '../../styles/popup.module.scss';
import styles from './ListBox.module.scss';

export interface ListBoxItem {
	value: string;
	content: ReactNode;
	disabled?: boolean;
}

interface ListBoxProps {
	className?: string;
	items?: ListBoxItem[];
	value?: string;
	// значение по умолчанию, когда у нас не выбран еще какой-то value
	defaultValue?: string;
	onChange: (value: string) => void;
	readOnly?: boolean;
	direction?: DropdownDirection;
	label?: string;
}

export const ListBox = ({
	className,
	items,
	value,
	defaultValue,
	onChange,
	readOnly,
	direction = 'bottomRight',
	label,
}: ListBoxProps) => {
	// потом, если будет время, можно перейти на более свежую версию данной библиотеки
	return (
		<HStack gap='4'>
			{label && (
				<span className={readOnly ? stylesPopup.disabled : undefined}>
					{`${label}>`}
				</span>
			)}
			<HListBox
				as='div'
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
					<Button disabled={readOnly}>{value ?? defaultValue}</Button>
				</HListBox.Button>
				<HListBox.Options
					className={classNames(styles.options, {}, [
						stylesPopup[direction],
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
										},
										[]
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
