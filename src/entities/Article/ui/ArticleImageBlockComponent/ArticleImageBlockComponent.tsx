import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/deprecated/Text';
import styles from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
	className?: string;
	block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
	({ className, block }: ArticleImageBlockComponentProps) => {
		return (
			<div
				className={classNames(styles.ArticleImageBlockComponent, {}, [
					className,
				])}
			>
				{/* вообще картинка с подписью делается через специальные теги. Надо будет это потом поправить */}
				<img src={block.src} alt={block.title} className={styles.image} />
				{block.title && <Text text={block.title} align={TextAlign.CENTER} />}
			</div>
		);
	},
);
