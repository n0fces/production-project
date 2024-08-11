import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
	Comment[],
	string | undefined,
	ThunkConfig<string>
>(
	'articleDetailsPage/fetchCommentsByArticleId',
	async (articleId, { rejectWithValue, extra: { api } }) => {
		if (!articleId) {
			return rejectWithValue('error');
		}
		try {
			// такой параметр в запросе специфичен из-за использование json-server. Мы хотим запросить комментарии для конкретной статьи
			const response = await api.get<Comment[]>('/comments', {
				params: {
					articleId,
					// мы хотим по айди пользователя получить полную о нем информацию (мы же отображаем аватар + его некоторые данные)
					_expand: 'user',
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
