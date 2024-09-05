import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';

interface ArticleTypeTabsProps {
	className?: string;
	value: ArticleType;
	onChangeType: (type: TabItem<ArticleType>) => void;
}

export const ArticleTypeTabs = ({
	className,
	value,
	onChangeType,
}: ArticleTypeTabsProps) => {
	const { t } = useTranslation('article');
	const typeTabs = useMemo<TabItem<ArticleType>[]>(
		() => [
			{
				value: ArticleType.ALL,
				content: t('Все'),
			},
			{
				value: ArticleType.IT,
				content: t('Айти'),
			},
			{
				value: ArticleType.ECONOMICS,
				content: t('Экономика'),
			},
			{
				value: ArticleType.SCIENCE,
				content: t('Наука'),
			},
		],
		[t],
	);

	return (
		<Tabs
			tabs={typeTabs}
			value={value}
			onTabClick={onChangeType}
			className={classNames('', {}, [className])}
		/>
	);
};
