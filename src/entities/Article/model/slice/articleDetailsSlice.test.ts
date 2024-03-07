// import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
// import { ArticleDetailsScheme } from '../types/articleDetailsScheme';
// import { articleDetailsReducer } from './articleDetailsSlice';

// const data = { id: '1', title: 'subtitle' };

// describe('profileSlice.test', () => {
// 	// Здесь мы тестируем асинхронные экшены. Все аналогично, только мы здесь явно указываем какое именно состояние тестируется у асинхронного экшена
// 	test('test update profile service pending', () => {
// 		const state: DeepPartial<ArticleDetailsScheme> = {
// 			isLoading: false,
// 			error: 'error',
// 		};

// 		expect(
// 			articleDetailsReducer(
// 				state as ArticleDetailsScheme,
// 				fetchArticleById.pending
// 			)
// 		).toEqual({
// 			isLoading: true,
// 			error: undefined,
// 		});
// 	});

// 	test('test update profile service fullfiled', () => {
// 		const state: DeepPartial<ArticleDetailsScheme> = {
// 			isLoading: true,
// 			error: 'error',
// 		};

// 		expect(
// 			articleDetailsReducer(
// 				state as ArticleDetailsScheme,
// 				fetchArticleById.fulfilled(data, '', '1')
// 			)
// 		).toEqual({
// 			isLoading: false,
// 			error: undefined,
// 			data,
// 		});
// 	});
// });
