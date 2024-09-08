import { HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import styles from './ArticleList.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

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
		.map((_, index) => (
			<ArticleListItemSkeleton
				className={styles.card}
				key={index}
				view={view}
			/>
		));

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
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<HStack
					wrap="wrap"
					gap="16"
					className={classNames(styles.ArticleListRedesigned, {}, [])}
					data-testid="ArticleList"
				>
					{articles.map((item) => (
						<ArticleListItem
							article={item}
							view={view}
							target={target}
							key={item.id}
							className={styles.card}
						/>
					))}
					{isLoading && getSkeletons(view)}
				</HStack>
			}
			off={
				<div
					className={classNames(styles.ArticleList, {}, [
						className,
						styles[view],
					])}
					data-testid="ArticleList"
				>
					{articles.map((item) => (
						<ArticleListItem
							article={item}
							view={view}
							target={target}
							key={item.id}
							className={styles.card}
						/>
					))}
					{isLoading && getSkeletons(view)}
				</div>
			}
		/>
	);
};
