import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types';
import styles from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '../../model/types/article';

interface ArticleSortSelectorProps {
	className?: string;
	sort: ArticleSortField;
	order: SortOrder;
	onChangeOrder: (newOrder: SortOrder) => void;
	onChangeSort: (newOrder: ArticleSortField) => void;
}
export const ArticleSortSelector = ({
	className,
	sort,
	order,
	onChangeOrder,
	onChangeSort,
}: ArticleSortSelectorProps) => {
	const { t } = useTranslation('article');
	const orderOptions = useMemo<SelectOption<SortOrder>[]>(
		() => [
			{
				value: 'asc',
				content: t('возрастанию'),
			},
			{
				value: 'desc',
				content: t('убыванию'),
			},
		],
		[t]
	);
	const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
		() => [
			{
				value: ArticleSortField.CREATED,
				content: t('дате создания'),
			},
			{
				value: ArticleSortField.TITLE,
				content: t('названию'),
			},
			{
				value: ArticleSortField.VIEWS,
				content: t('просмотрам'),
			},
		],
		[t]
	);

	return (
		<div
			className={classNames(styles.ArticleSortSelector, {}, [className])}
		>
			{/* можно вот так явно задавать тип для generic component */}
			<Select<ArticleSortField>
				options={sortFieldOptions}
				label={t('Сортировать по')}
				value={sort}
				onChange={onChangeSort}
			/>
			<Select
				options={orderOptions}
				label={t('по')}
				value={order}
				onChange={onChangeOrder}
				className={styles.order}
			/>
		</div>
	);
};
