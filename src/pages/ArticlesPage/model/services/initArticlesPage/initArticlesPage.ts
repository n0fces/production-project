import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
	void,
	void,
	ThunkConfig<string>
>('articlesPage/initArticlesPage', async (_, { dispatch, getState }) => {
	const inited = getArticlesPageInited(getState());
	// * потом надо написать тест на то, что после инициализации данные диспачи не отработают (а в неинициализированном, наоборот, отрабатывают)
	if (!inited) {
		// сначала инициализируем нужное значение лимит и отображение списка статей, а потом делаем запрос на сервер за нужным количеством статей
		dispatch(articlesPageActions.initState());
		dispatch(
			fetchArticlesList({
				page: 1,
			})
		);
	}
});
