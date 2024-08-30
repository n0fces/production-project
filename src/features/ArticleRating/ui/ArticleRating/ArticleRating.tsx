import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import {
	useGetArticleRatingQuery,
	useRateArticleMutation,
} from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface ArticleRatingProps {
	className?: string;
	articleId: string;
}

const ArticleRating = ({ className, articleId }: ArticleRatingProps) => {
	const { t } = useTranslation('article-details');
	const userData = useSelector(getUserAuthData);
	const { data, isLoading } = useGetArticleRatingQuery({
		articleId,
		// здесь так делать безопасно, потому что если пользователь не авторизован, то он просто до этого момента не дойдет
		// мы показываем основной контент нашего приложения только авторизованным пользователям
		userId: userData?.id ?? '',
	});

	const [rateArticleMutation] = useRateArticleMutation();
	const handleRateArticleMutation = useCallback(
		(starsCount: number, feedback?: string) => {
			try {
				rateArticleMutation({
					userId: userData?.id ?? '',
					articleId,
					rate: starsCount,
					feedback,
				});
			} catch (error) {
				console.error(error);
			}
		},
		[articleId, rateArticleMutation, userData?.id],
	);
	const onCancel = useCallback(
		(starsCount: number) => {
			handleRateArticleMutation(starsCount);
		},
		[handleRateArticleMutation],
	);
	const onAccept = useCallback(
		(starsCount: number, feedback?: string) => {
			handleRateArticleMutation(starsCount, feedback);
		},
		[handleRateArticleMutation],
	);

	if (isLoading) {
		return <Skeleton width="100%" height="120px" />;
	}

	const rating = data?.[0];

	return (
		<RatingCard
			onCancel={onCancel}
			onAccept={onAccept}
			rate={rating?.rate}
			className={className}
			title={t('Оцените статью')}
			feedbackTitle={t(
				'Оставьте свой отзыв о статье, это поможет улучшить качество',
			)}
			hasFeedback
		/>
	);
};

export default ArticleRating;
