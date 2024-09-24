import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import styles from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
	className?: string;
	block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
	(props: ArticleImageBlockComponentProps) => {
		const { className, block } = props;

		return (
			<div
				className={classNames(styles.ArticleImageBlockComponent, {}, [
					className,
				])}
			>
				<img src={block.src} alt={block.title} className={styles.img} />
				{block.title && (
					// {/* вообще картинка с подписью делается через специальные теги. Надо будет это потом поправить */}
					<Text text={block.title} align="center" />
				)}
			</div>
		);
	},
);
