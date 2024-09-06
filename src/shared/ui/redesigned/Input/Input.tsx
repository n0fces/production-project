import React, {
	InputHTMLAttributes,
	memo,
	ReactNode,
	useEffect,
	useRef,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	autofocus?: boolean;
	readonly?: boolean;
	addonLeft?: ReactNode;
	addonRight?: ReactNode;
}

// не очень понимаю, к чему здесь memo, потому что у нас сверху будет пробрасываться состояние, которое будет меняться при вводе постоянно
export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autofocus,
		readonly,
		addonLeft,
		addonRight,
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
		[styles.readonly]: readonly,
		[styles.withAddonLeft]: Boolean(addonLeft),
		[styles.withAddonRight]: Boolean(addonRight),
	};

	return (
		<div className={classNames(styles.InputWrapper, mods, [className])}>
			{addonLeft && <div className={styles.addonLeft}>{addonLeft}</div>}
			<input
				ref={ref}
				type={type}
				value={value}
				onChange={onChangeHandler}
				className={styles.input}
				readOnly={readonly}
				placeholder={placeholder}
				{...otherProps}
			/>
			{addonRight && <div className={styles.addonRight}>{addonRight}</div>}
		</div>
	);
});
