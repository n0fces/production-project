import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
	test('success', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: false,
				hasMore: true,
			},
		});
		await thunk.callThunk(undefined);

		// проверяем, что отработал pending, fullfilled и два диспатча
		expect(thunk.dispatch).toBeCalledTimes(4);
		// после срабатывания страница должна стать больше на 1
		expect(fetchArticlesList).toHaveBeenCalledWith({});
	});

	// кейс, когда данные закончились и мы больше не можем запросить данные
	test('fetchArticleList not called', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: false,
				hasMore: false,
			},
		});
		await thunk.callThunk(undefined);

		expect(thunk.dispatch).toBeCalledTimes(2);
		expect(fetchArticlesList).not.toHaveBeenCalled();
	});
});
