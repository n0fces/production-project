import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import styles from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
	className?: string;
	block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
	({ className, block }: ArticleTextBlockComponentProps) => {
		return (
			<div
				className={classNames(styles.ArticleTextBlockComponent, {}, [
					className,
				])}
			>
				{block.title && <Text title={block.title} className={styles.title} />}
				{block.paragraphs.map((paragraph) => (
					<Text key={paragraph} text={paragraph} className={styles.paragraph} />
				))}
			</div>
		);
	},
);
