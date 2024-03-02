import { ChangeEvent, memo, useMemo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import styles from './Select.module.scss';

export interface SelectOption {
	value: string;
	content: string;
}

// * так как мы здесь пока используем обычный селект, то можно расширяться от атрибутов обычного селекта. Если все так и останется, то потом надо будет переделать здесь
interface SelectProps {
	className?: string;
	label?: string;
	options?: SelectOption[];
	value?: string;
	onChange?: (value: string) => void;
	readOnly?: boolean;
}

export const Select = memo(
	({ className, label, options, value, onChange, readOnly }: SelectProps) => {
		const optionsList = useMemo(
			() =>
				options?.map((opt) => (
					<option
						key={opt.value}
						className={styles.option}
						value={opt.value}
					>
						{opt.content}
					</option>
				)),
			[options]
		);

		const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
			onChange?.(e.target.value);
		};

		const mods: Mods = {};

		return (
			<div className={classNames(styles.Wrapper, mods, [className])}>
				{label && <span className={styles.label}>{`${label}>`}</span>}
				<select
					className={styles.select}
					value={value}
					onChange={onChangeHandler}
					disabled={readOnly}
				>
					{optionsList}
				</select>
			</div>
		);
	}
);
