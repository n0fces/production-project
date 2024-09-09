import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import styles from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';

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
					<ToggleFeatures
						feature="isAppRedesigned"
						on={<Text text={block.title} align="center" />}
						off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
					/>
				)}
			</div>
		);
	},
);
