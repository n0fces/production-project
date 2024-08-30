import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { ArticleDetailsScheme } from '../types/articleDetailsScheme';
import { articleDetailsReducer } from './articleDetailsSlice';

const data = { id: '1', title: 'subtitle' };

describe('profileSlice.test', () => {
	test('test update profile service pending', () => {
		const state: DeepPartial<ArticleDetailsScheme> = {
			isLoading: false,
			error: 'error',
		};

		expect(
			articleDetailsReducer(
				state as ArticleDetailsScheme,
				fetchArticleById.pending,
			),
		).toEqual({
			isLoading: true,
			error: undefined,
		});
	});

	test('test update profile service fullfiled', () => {
		const state: DeepPartial<ArticleDetailsScheme> = {
			isLoading: true,
			error: 'error',
		};

		expect(
			articleDetailsReducer(
				state as ArticleDetailsScheme,
				fetchArticleById.fulfilled(data as Article, '', '1'),
			),
		).toEqual({
			isLoading: false,
			error: undefined,
			data,
		});
	});
});
