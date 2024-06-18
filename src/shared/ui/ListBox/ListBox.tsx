import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import styles from './ListBox.module.scss';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';

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
				<span className={readOnly ? styles.disabled : undefined}>
					{`${label}>`}
				</span>
			)}
			<HListBox
				as='div'
				disabled={readOnly}
				className={classNames(styles.ListBox, {}, [className])}
				value={value}
				onChange={onChange}
			>
				<HListBox.Button disabled={readOnly} className={styles.trigger}>
					<Button disabled={readOnly}>{value ?? defaultValue}</Button>
				</HListBox.Button>
				<HListBox.Options
					className={classNames(styles.options, {}, [
						styles[direction],
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
											[styles.active]: active,
											[styles.disabled]: item.disabled,
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
