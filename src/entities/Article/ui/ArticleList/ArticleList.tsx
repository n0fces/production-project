import { HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import styles from './ArticleList.module.scss';

// в этих компонентах мы также не будем подвязываться на определенный стейт, а будем принимать статьи извне
// данный компонент списка статей мы можем использовать на других страницах, например, рекомендаций
interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	// тема отображения списка статей
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
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
	target,
}: ArticleListProps) => {
	const { t } = useTranslation('article');

	if (!isLoading && !articles.length) {
		return (
			<div
				className={classNames(styles.ArticleList, {}, [
					className,
					styles[view],
				])}
			>
				<Text size={TextSize.L} title={t('Статьи не найдены')} />
			</div>
		);
	}

	// * СЮДА ВПОСЛЕДСТВИИ НАДО ВПИСАТЬ СОВРЕМЕННОЕ РЕШЕНИЕ ДЛЯ ВИРТУАЛИЗАЦИИ СПИСКОВ. СЕЙЧАС ВИПИЛИЛИ REACT-VIRTUALIZED,
	// * ПОТОМУ ЧТО СЛИШКОМ УСТАРЕВШЕЕ РЕШЕНИЕ
	return (
		<div
			className={classNames(styles.ArticleList, {}, [
				className,
				styles[view],
			])}
		>
			{articles.map((article) => (
				<ArticleListItem
					article={article}
					view={view}
					key={article.id}
					target={target}
					className={styles.card}
				/>
			))}

			{isLoading && getSkeletons(view)}
		</div>
	);
};
