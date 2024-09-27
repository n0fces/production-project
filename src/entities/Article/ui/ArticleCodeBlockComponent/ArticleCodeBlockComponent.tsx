import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/Code';

import { ArticleCodeBlock } from '../../model/types/article';
import styles from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
	className?: string;
	block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
	({ className, block }: ArticleCodeBlockComponentProps) => {
		return (
			<div
				className={classNames(styles.ArticleCodeBlockComponent, {}, [
					className,
				])}>
				<Code text={block.code} />
			</div>
		);
	},
);
