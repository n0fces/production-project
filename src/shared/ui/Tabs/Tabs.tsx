import { ReactNode, useCallback } from 'react';
import styles from './Tabs.module.scss';
import { Card } from '../Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem<T extends string> {
	value: T;
	content: ReactNode;
}

interface TabsProps<T extends string> {
	className?: string;
	tabs: TabItem<T>[];
	value: T;
	onTabClick: (tab: TabItem<T>) => void;
	direction?: FlexDirection;
}

export const Tabs = <T extends string>({
	className,
	tabs,
	value,
	onTabClick,
	direction = 'row',
}: TabsProps<T>) => {
	const clickHandle = useCallback(
		(tab: TabItem<T>) => {
			return () => {
				onTabClick(tab);
			};
		},
		[onTabClick],
	);

	return (
		<Flex gap="8" align="start" direction={direction} className={className}>
			{tabs.map((tab) => {
				const isSelected = tab.value === value;
				return (
					<Card
						variant={isSelected ? 'light' : 'normal'}
						className={styles.tab}
						key={tab.value}
						onClick={clickHandle(tab)}
						border="normal"
					>
						{tab.content}
					</Card>
				);
			})}
		</Flex>
	);
};
