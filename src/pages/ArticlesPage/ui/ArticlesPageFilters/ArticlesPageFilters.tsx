import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { TabItem } from '@/shared/ui/Tabs';
import {
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import styles from './ArticlesPageFilters.module.scss';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';

interface ArticlesPageFiltersProps {
	className?: string;
}

export const ArticlesPageFilters = ({
	className,
}: ArticlesPageFiltersProps) => {
	const { t } = useTranslation('article');
	const view = useSelector(getArticlesPageView);
	const sort = useSelector(getArticlesPageSort);
	const order = useSelector(getArticlesPageOrder);
	const search = useSelector(getArticlesPageSearch);
	const type = useSelector(getArticlesPageType);

	const dispatch = useAppDispatch();
	const fetchData = useCallback(() => {
		dispatch(
			fetchArticlesList({
				replace: true,
			}),
		);
	}, [dispatch]);
	const debouncedFetchData = useDebounce(fetchData, 500);
	const onChangeView = useCallback(
		(view: ArticleView) => {
			dispatch(articlesPageActions.setView(view));
		},
		[dispatch],
	);
	const onChangeSort = useCallback(
		(newSort: ArticleSortField) => {
			dispatch(articlesPageActions.setSort(newSort));
			dispatch(articlesPageActions.setPage(1));
			fetchData();
		},
		[dispatch, fetchData],
	);
	const onChangeOrder = useCallback(
		(newOrder: SortOrder) => {
			dispatch(articlesPageActions.setOrder(newOrder));
			dispatch(articlesPageActions.setPage(1));
			fetchData();
		},
		[dispatch, fetchData],
	);
	const onChangeSearch = useCallback(
		(search: string) => {
			dispatch(articlesPageActions.setSearch(search));
			dispatch(articlesPageActions.setPage(1));
			debouncedFetchData();
		},
		[dispatch, debouncedFetchData],
	);
	const onChangeType = useCallback(
		(tab: TabItem<ArticleType>) => {
			dispatch(articlesPageActions.setType(tab.value));
			dispatch(articlesPageActions.setPage(1));
			fetchData();
		},
		[dispatch, fetchData],
	);

	return (
		<div className={classNames(styles.ArticlesPageFilters, {}, [className])}>
			<div className={styles.sortWrapper}>
				<ArticleSortSelector
					sort={sort}
					order={order}
					onChangeOrder={onChangeOrder}
					onChangeSort={onChangeSort}
				/>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
			</div>
			<Card className={styles.search}>
				<Input
					onChange={onChangeSearch}
					value={search}
					placeholder={t('Поиск')}
				/>
			</Card>
			<ArticleTypeTabs
				onChangeType={onChangeType}
				value={type}
				className={styles.tabs}
			/>
		</div>
	);
};
