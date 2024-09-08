import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Article } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';

export interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={<ArticleListItemRedesigned {...props} />}
			off={<ArticleListItemDeprecated {...props} />}
		/>
	);
});
