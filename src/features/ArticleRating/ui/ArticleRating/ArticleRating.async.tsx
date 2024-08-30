import { Suspense, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/ui/Skeleton';

// сделали данный компонент ленивым, так как он находится внизу страницы, так что мы вполне может подгрузить его лениво с каким-то саспенс
const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
	<Suspense fallback={<Skeleton width="100%" height="120px" />}>
		<ArticleRatingLazy {...props} />
	</Suspense>
);
