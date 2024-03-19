import { ArticleDetailsCommentScheme } from './ArticleDetailsCommentScheme';
import { ArticleDetailsPageRecommendationsScheme } from './articleDetailsPageRecommendationsScheme';

// то, что мы здесь делали (объединение редьюсеров) чисто пример для обучения. На самом деле лучше все разбивать по фичам и виджетам, чтобы такого не пришлось делать
export interface ArticleDetailsPageScheme {
	comments: ArticleDetailsCommentScheme;
	recommendations: ArticleDetailsPageRecommendationsScheme;
}
