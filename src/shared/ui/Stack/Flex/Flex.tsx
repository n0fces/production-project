import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import styles from './Flex.module.scss';

export type FLexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

// описываем сопоставлепния того пропса, который нам пришел, с классом, который необходимо применить
const justifyClasses: Record<FLexJustify, string> = {
	start: styles.justifyStart,
	center: styles.justifyCenter,
	end: styles.justifyEnd,
	between: styles.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
	start: styles.alignStart,
	center: styles.alignCenter,
	end: styles.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
	row: styles.directionRow,
	column: styles.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
	4: styles.gap4,
	8: styles.gap8,
	16: styles.gap16,
	32: styles.gap32,
};

type DivProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export interface FlexProps extends DivProps {
	className?: string;
	children: ReactNode;
	justify?: FLexJustify;
	align?: FlexAlign;
	direction?: FlexDirection;
	gap?: FlexGap;
	max?: boolean;
}

export const Flex = ({
	className,
	children,
	justify = 'start',
	align = 'center',
	direction = 'row',
	gap,
	max,
}: FlexProps) => {
	// на компонент будут навешиваться нужные классы в соответствии с переданными пропсами. Помимо этого, мы не забыли про className, который может передаваться извне для уточнения некоторых стилей
	const classes = [
		className,
		justifyClasses[justify],
		alignClasses[align],
		directionClasses[direction],
		gap && gapClasses[gap],
	];

	const mods: Mods = {
		[styles.max]: max,
	};

	return (
		<div className={classNames(styles.Flex, mods, classes)}>{children}</div>
	);
};
