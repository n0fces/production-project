import {
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { ArticleDetailsCommentScheme } from '../types/ArticleDetailsCommentScheme';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

// нормализация стейта позволяет в некоторых случаях не дублировать объекты и выполнять изменение объекта за О(1) (имею в виду, что мы сразу можем обратить к объекту, который нужно поменят). Достигается это за счет того, что используем некоторую структуру данных, надстройку для нашего стейта. Сам стейт представляем из себя объект, ключи которого - определенные индексы, а значения изначальные объекты. Отдельно есть массив с соответствующими индексами для объекта. Эти индексы в массиве позволяет обращаться к конкретному объекту из общего нормализованного стейта
const commentsAdapter = createEntityAdapter<Comment>({
	// указываем поле, по которому будет идти нормализация
	selectId: (comment) => comment.id,
	// здесь еще можно указать поле, которое отсортирует данные по какому-то из полей
});

// делаем наш селектор
export const getArticleComments = commentsAdapter.getSelectors<StateScheme>(
	(state) =>
		state.articleDetailsPage?.comments || commentsAdapter.getInitialState()
);

const articleDetailsCommentsSlice = createSlice({
	name: 'articleDetailsCommentsSlice',
	// в getInitialState можем передать объект, чтобы задать начальное значение
	initialState: commentsAdapter.getInitialState<ArticleDetailsCommentScheme>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCommentsByArticleId.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(
				fetchCommentsByArticleId.fulfilled,
				(state, action: PayloadAction<Comment[]>) => {
					state.isLoading = false;
					state.error = undefined;
					// не будем же мы сами нормализовывать данные, поэтому используем готовую вещь из тулкита
					commentsAdapter.setAll(state, action.payload);
				}
			)
			.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articleDetailsCommentsReducer } =
	articleDetailsCommentsSlice;
