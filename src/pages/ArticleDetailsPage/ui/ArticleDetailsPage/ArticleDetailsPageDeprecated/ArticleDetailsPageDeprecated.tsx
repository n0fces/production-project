import { useTranslation } from 'react-i18next';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';
import { ArticleDetailsComments } from '../../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import styles from './ArticleDetailsPageDeprecated.module.scss';
import { ArticleDetailsPageProps } from '../ArticleDetailsPage';

interface ArticleDetailsPageDeprecatedProps extends ArticleDetailsPageProps {
	id: string;
}

export const ArticleDetailsPageDeprecated = ({
	id,
	className,
}: ArticleDetailsPageDeprecatedProps) => {
	const { t } = useTranslation('article-details');

	return (
		<Page
			className={classNames(styles.ArticleDetailsPageDeprecated, {}, [
				className,
			])}
		>
			<VStack gap="16" max>
				<ArticleDetailsPageHeader />
				<ArticleDetails id={id} />
				<ToggleFeatures
					feature="isArticleRatingEnabled"
					on={<ArticleRating articleId={id} />}
					off={<Card>{t('Оценка статей скоро появится!')}</Card>}
				/>
				<ArticleRecommendationsList />
				<ArticleDetailsComments id={id} />
			</VStack>
		</Page>
	);
};
