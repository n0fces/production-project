import React, {
	InputHTMLAttributes,
	memo,
	useEffect,
	useRef,
	useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange'
>;

export interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
}

// не очень понимаю, к чему здесь memo, потому что у нас сверху будет пробрасываться состояние, которое будет меняться при вводе постоянно
export const Input = memo(
	({
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autoFocus,
		...otherProps
	}: InputProps) => {
		const ref = useRef<HTMLInputElement>(null);
		const [isFocused, setIsFocused] = useState(false);
		const [caretPosition, setCaretPosition] = useState(0);

		useEffect(() => {
			if (autoFocus) {
				setIsFocused(true);
				ref.current.focus();
			}
		}, [autoFocus]);

		const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
			onChange?.(e.target.value);
			setCaretPosition(e.target.value.length);
		};

		const onBlur = () => {
			setIsFocused(false);
		};

		const onFocus = () => {
			setIsFocused(true);
		};

		const onSelect = (e: any) => {
			setCaretPosition(e?.target?.selectionStart || 0);
		};

		return (
			<div className={classNames(styles.InputWrapper, {}, [className])}>
				{placeholder && (
					<div className={styles.placeholder}>
						{`${placeholder}>`}
					</div>
				)}
				<div className={styles.caretWrapper}>
					<input
						ref={ref}
						type={type}
						value={value}
						onChange={onChangeHandler}
						className={styles.input}
						onFocus={onFocus}
						onBlur={onBlur}
						onSelect={onSelect}
						{...otherProps}
					/>
					{isFocused && (
						<span
							className={styles.caret}
							style={{ left: `${caretPosition * 9}px` }}
						/>
					)}
				</div>
			</div>
		);
	}
);
