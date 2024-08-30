import { createAsyncThunk } from '@reduxjs/toolkit';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { Article, ArticleType } from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
	getArticlesPageLimit,
	getArticlesPageNum,
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface fetchArticlesListProps {
	replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
	Article[],
	fetchArticlesListProps,
	ThunkConfig<string>
>(
	'articlesPage/fetchArticlesList',
	async (_, { rejectWithValue, getState, extra: { api } }) => {
		const limit = getArticlesPageLimit(getState());
		const sort = getArticlesPageSort(getState());
		const order = getArticlesPageOrder(getState());
		const search = getArticlesPageSearch(getState());
		const page = getArticlesPageNum(getState());
		const type = getArticlesPageType(getState());

		try {
			// мне не нравится, что у нас разу по умолчанию в адресной строке будет большое количество параметром, которые пользователь даже еще не формировал. Это выглядит не очень что ли
			addQueryParams({
				sort,
				order,
				search,
				type,
			});
			const response = await api.get<Article[]>('/articles', {
				params: {
					// нужно, чтобы отрисовывать аватарку пользователя, который написал статью при формате отображения статей BIG
					_expand: 'user',
					// согласно документации json-server пагинация реализуется таким обарзом
					_limit: limit,
					_page: page,
					_sort: sort,
					_order: order,
					q: search,
					type: type === ArticleType.ALL ? undefined : type,
				},
			});
			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (error) {
			return rejectWithValue('error');
		}
	},
);
