import { classNames } from 'shared/lib/classNames/classNames';
import styles from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

// в этих компонентах мы также не будем подвязываться на определенный стейт, а будем принимать статьи извне
// данный компонент списка статей мы можем использовать на других страницах, например, рекомендаций
interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	// тема отображения списка статей
	view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
	new Array(view === ArticleView.SMALL ? 9 : 3)
		.fill(0)
		.map((_, index) => <ArticleListItemSkeleton key={index} view={view} />);

export const ArticleList = ({
	className,
	articles,
	isLoading,
	view = ArticleView.SMALL,
}: ArticleListProps) => {
	const renderArticle = (article: Article) => (
		<ArticleListItem article={article} view={view} key={article.id} />
	);

	if (isLoading) {
		return (
			<div
				className={classNames(styles.ArticleList, {}, [
					className,
					styles[view],
				])}
			>
				{getSkeletons(view)}
			</div>
		);
	}

	return (
		<div
			className={classNames(styles.ArticleList, {}, [
				className,
				styles[view],
			])}
		>
			{articles.length > 0 ? articles.map(renderArticle) : null}
		</div>
	);
};
