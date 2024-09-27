import { combineReducers } from '@reduxjs/toolkit';

import { ArticleDetailsPageScheme } from '../types';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';

// группируем редьюсеры (опять же это пример чисто в ознакомительных целях)
export const articleDetailsPageReducer =
	combineReducers<ArticleDetailsPageScheme>({
		recommendations: articleDetailsPageRecommendationsReducer,
		comments: articleDetailsCommentsReducer,
	});
