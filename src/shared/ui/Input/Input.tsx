import React, {
	InputHTMLAttributes,
	ReactNode,
	memo,
	useEffect,
	useRef,
} from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../Stack';
import { Text } from '../Text';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	label?: string;
	onChange?: (value: string) => void;
	autofocus?: boolean;
	readOnly?: boolean;
	addonLeft?: ReactNode;
	addonRight?: ReactNode;
	size?: InputSize;
}

// не очень понимаю, к чему здесь memo, потому что у нас сверху будет пробрасываться состояние, которое будет меняться при вводе постоянно
export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		label,
		onChange,
		type = 'text',
		placeholder,
		autofocus,
		readOnly,
		addonLeft,
		addonRight,
		size = 'm',
		...otherProps
	} = props;
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (autofocus) {
			ref.current?.focus();
		}
	}, [autofocus]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	const mods: Mods = {
		[styles.readonly]: readOnly,
		[styles.withAddonLeft]: Boolean(addonLeft),
		[styles.withAddonRight]: Boolean(addonRight),
	};

	const input = (
		<div
			className={classNames(styles.InputWrapper, mods, [
				className,
				styles[size],
			])}>
			{addonLeft && <div className={styles.addonLeft}>{addonLeft}</div>}
			<input
				ref={ref}
				type={type}
				value={value}
				onChange={onChangeHandler}
				className={styles.input}
				readOnly={readOnly}
				placeholder={placeholder}
				{...otherProps}
			/>
			{addonRight && <div className={styles.addonRight}>{addonRight}</div>}
		</div>
	);

	return label ? (
		<HStack max gap="8">
			{/* ! инпут и подпись к нему должны быть связаны через label! */}
			<Text text={label} />
			{input}
		</HStack>
	) : (
		input
	);
});
