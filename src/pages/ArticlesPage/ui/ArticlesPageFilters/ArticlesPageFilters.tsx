import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import styles from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
	className?: string;
}

// это старая реализация фильтров, поэтому она здесь осталась
// ! однако при такой реализации весь этот блок можно вынести в виджеты и декомпозировать на три части, каждой из которых
// ! будет происходить работа только с нужным набором данных
export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const {
		onChangeSort,
		onChangeType,
		sort,
		type,
		onChangeSearch,
		search,
		onChangeView,
		view,
		onChangeOrder,
		order,
	} = useArticleFilters();

	return (
		<div className={classNames(styles.ArticlesPageFilters, {}, [className])}>
			<div className={styles.sortWrapper}>
				<ArticleSortSelector
					order={order}
					sort={sort}
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
				value={type}
				onChangeType={onChangeType}
				className={styles.tabs}
			/>
		</div>
	);
});
