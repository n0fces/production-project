import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import styles from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleTextBlockComponentProps {
	className?: string;
	block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
	(props: ArticleTextBlockComponentProps) => {
		const { className, block } = props;

		return (
			<div
				className={classNames(styles.ArticleTextBlockComponent, {}, [
					className,
				])}
			>
				{block.title && (
					<ToggleFeatures
						feature="isAppRedesigned"
						on={<Text title={block.title} className={styles.title} />}
						off={
							<TextDeprecated title={block.title} className={styles.title} />
						}
					/>
				)}
				{block.paragraphs.map((paragraph, index) => (
					<ToggleFeatures
						feature="isAppRedesigned"
						on={
							<Text key={index} text={paragraph} className={styles.paragraph} />
						}
						off={
							<TextDeprecated
								key={index}
								text={paragraph}
								className={styles.paragraph}
							/>
						}
					/>
				))}
			</div>
		);
	},
);
