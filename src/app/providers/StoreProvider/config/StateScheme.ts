import {
	AnyAction,
	CombinedState,
	EnhancedStore,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsScheme } from 'entities/Article';
import { CounterScheme } from 'entities/Counter';
import { ProfileScheme } from 'entities/Profile';
import { UserScheme } from 'entities/User';
import { AddCommentFormScheme } from 'features/AddCommentForm';
import { LoginScheme } from 'features/AuthByUsername';
import { ArticleDetailsCommentScheme } from 'pages/ArticlesDetailsPage';
import { ArticlesPageScheme } from 'pages/ArticlesPage';

// Здесь будет задавать тип для стейта, чтобы мы всегда понимали, с чем имеем делать
export interface StateScheme {
	counter: CounterScheme;
	user: UserScheme;

	// Асинхронные редьюсеры
	loginForm?: LoginScheme;
	profile?: ProfileScheme;
	articleDetails?: ArticleDetailsScheme;
	articleDetailsComments?: ArticleDetailsCommentScheme;
	addCommentForm?: AddCommentFormScheme;
	articlesPage?: ArticlesPageScheme;
}

// получаем тип с ключами нашего стейта
export type StateSchemeKey = keyof StateScheme;

export type MountedReducers = OptionalRecord<StateSchemeKey, boolean>;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateScheme>;
	reduce: (
		state: StateScheme,
		action: AnyAction
	) => CombinedState<StateScheme>;
	add: (key: StateSchemeKey, reducer: Reducer) => void;
	remove: (key: StateSchemeKey) => void;
	// true - вмонтирован, false - демонтирован или не
	// не все редьюсеры у нас являются обязательными, поэтому мы сделали свой тип для рекорда, где некоторые поля могут быть необязательными
	getMountedReducers: () => MountedReducers;
}

// расширяем интерфейс дефолтного стора нашим менеджером
export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

// здесь дженериком будет тип ошибки
export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	// при задании этого типа у нас getState будет показывать, что возвращает наш стейт
	state: StateScheme;
}
