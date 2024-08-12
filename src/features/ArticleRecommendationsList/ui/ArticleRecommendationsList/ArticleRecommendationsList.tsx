import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { useGetArticleRecommendationsListQuery } from '../../api/articleRecommendationsApi';

// ! Мне очень не нравится, как Тимур воспринимает fsd, так что после окончания курса нужно обязательно сделать полный рефактор по этой части
// ! Он как будто не различает виджеты и фичи

interface ArticleRecommendationsListProps {
	className?: string;
}

export const ArticleRecommendationsList = memo(
	(props: ArticleRecommendationsListProps) => {
		const { className } = props;
		const { t } = useTranslation();
		const {
			data: articles,
			isLoading,
			error,
		} = useGetArticleRecommendationsListQuery(3);

		// * сомнительная заглушка)
		if (isLoading || error || !articles) {
			return null;
		}

		return (
			<VStack gap='8' className={classNames('', {}, [className])}>
				<Text size={TextSize.L} title={t('Рекомендуем')} />
				<ArticleList
					articles={articles}
					target='_blank'
					virtualized={false}
				/>
			</VStack>
		);
	}
);