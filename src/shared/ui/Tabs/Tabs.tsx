import { ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem<T extends string> {
	value: T;
	content: ReactNode;
}

interface TabsProps<T extends string> {
	className?: string;
	tabs: TabItem<T>[];
	value: T;
	onTabClick: (tab: TabItem<T>) => void;
}

export const Tabs = <T extends string>({
	className,
	tabs,
	value,
	onTabClick,
}: TabsProps<T>) => {
	const clickHandle = useCallback(
		(tab: TabItem<T>) => {
			return () => {
				onTabClick(tab as TabItem<T>);
			};
		},
		[onTabClick]
	);

	return (
		<div className={classNames(styles.Tabs, {}, [className])}>
			{tabs.map((tab) => (
				<Card
					theme={
						tab.value === value
							? CardTheme.NORMAL
							: CardTheme.OUTLINED
					}
					key={tab.value}
					className={styles.tab}
					onClick={clickHandle(tab)}
				>
					{tab.content}
				</Card>
			))}
		</div>
	);
};
