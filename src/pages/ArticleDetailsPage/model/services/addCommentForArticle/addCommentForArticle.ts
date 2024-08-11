import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article';
import { getUserAuthData } from 'entities/User';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
	Comment,
	string,
	ThunkConfig<string>
>(
	'articleDetailsPage/addCommentForArticle',
	async (text, { rejectWithValue, getState, dispatch, extra: { api } }) => {
		// инфо о пользователе, который оставляет комментарий
		const userData = getUserAuthData(getState());
		// достаем содержимое комментария
		// id статьи, к которой пишется комментарий
		const article = getArticleDetailsData(getState());

		if (!userData || !text || !article) {
			return rejectWithValue('no data');
		}

		try {
			const response = await api.post<Comment>('/comments', {
				articleId: article.id,
				userId: userData.id,
				text,
			});
			if (!response.data) {
				throw new Error();
			}
			// после добавления нового комментария будем делать запрос заново за комментариями, хотя решение с обновлением стета без повторного запроса на сервер мне нравится больше
			dispatch(fetchCommentsByArticleId(article.id));

			return response.data;
		} catch (error) {
			return rejectWithValue('error');
		}
	}
);

// НАПИШИ ТЕСТЫ НА НОВЫЕ СЕЛЕКТОРЫ, СЛАЙСЫ И АСИНХРОННЫЕ ФАНКИ
