import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
	page?: number;
}

export const fetchArticlesList = createAsyncThunk<
	Article[],
	FetchArticlesListProps,
	ThunkConfig<string>
>(
	'articlesPage/fetchArticlesList',
	async ({ page = 1 }, { rejectWithValue, getState, extra: { api } }) => {
		const limit = getArticlesPageLimit(getState());
		try {
			const response = await api.get<Article[]>('/articles', {
				params: {
					// нужно, чтобы отрисовывать аватарку пользователя, который написал статью при формате отображения статей BIG
					_expand: 'user',
					// согласно документации json-server пагинация реализуется таким обарзом
					_limit: limit,
					_page: page,
				},
			});
			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (error) {
			return rejectWithValue('error');
		}
	}
);
