import { memo } from 'react';

import { ScrollToTopButton } from '@/features/ScrollToTopButton';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';

import styles from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
	className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
	const { className } = props;

	return (
		<VStack
			justify="center"
			align="center"
			max
			className={classNames(styles.ScrollToolbar, {}, [className])}>
			<ScrollToTopButton />
		</VStack>
	);
});
