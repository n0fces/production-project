import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout/StickyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';
import { ArticleDetailsComments } from '../../ArticleDetailsComments/ArticleDetailsComments';
import styles from './ArticleDetailsPageRedesigned.module.scss';
import { AdditionalInfoContainer } from '../../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleDetailsPageProps } from '../ArticleDetailsPage';

interface ArticleDetailsPageRedesignedProps extends ArticleDetailsPageProps {
	id: string;
}

export const ArticleDetailsPageRedesigned = ({
	id,
	className,
}: ArticleDetailsPageRedesignedProps) => {
	return (
		<StickyContentLayout
			content={
				<Page
					className={classNames(styles.ArticleDetailsPageRedesigned, {}, [
						className,
					])}
				>
					<VStack gap="16" max>
						<ArticleDetails id={id} />
						<ArticleRating articleId={id} />
						<ArticleRecommendationsList />
						<ArticleDetailsComments id={id} />
					</VStack>
				</Page>
			}
			right={<AdditionalInfoContainer />}
		/>
	);
};
