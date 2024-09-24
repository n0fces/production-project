import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import styles from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';
import { ListBox, ListBoxItem } from '@/shared/ui/Popups';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

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
	const orderOptions = useMemo<ListBoxItem<SortOrder>[]>(
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
		[t],
	);
	const sortFieldOptions = useMemo<ListBoxItem<ArticleSortField>[]>(
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
		[t],
	);

	return (
		<div
			className={classNames(styles.ArticleSortSelectorRedesigned, {}, [
				className,
			])}
		>
			<VStack gap="8">
				<Text text={t('Сортировать по:')} />
				{/* можно вот так явно задавать тип для generic component */}
				<ListBox
					items={sortFieldOptions}
					value={sort}
					onChange={onChangeSort}
				/>
				<ListBox items={orderOptions} value={order} onChange={onChangeOrder} />
			</VStack>
		</div>
	);
};
