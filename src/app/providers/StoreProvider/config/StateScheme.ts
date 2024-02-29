import {
	AnyAction,
	CombinedState,
	EnhancedStore,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CounterScheme } from 'entities/Counter';
import { ProfileScheme } from 'entities/Profile';
import { UserScheme } from 'entities/User';
import { LoginScheme } from 'features/AuthByUsername';
import { NavigateOptions, To } from 'react-router-dom';

// Здесь будет задавать тип для стейта, чтобы мы всегда понимали, с чем имеем делать
export interface StateScheme {
	counter: CounterScheme;
	user: UserScheme;

	// Асинхронные редьюсеры
	loginForm?: LoginScheme;
	profile?: ProfileScheme;
}

// получаем тип с ключами нашего стейта
export type StateSchemeKey = keyof StateScheme;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateScheme>;
	reduce: (
		state: StateScheme,
		action: AnyAction
	) => CombinedState<StateScheme>;
	add: (key: StateSchemeKey, reducer: Reducer) => void;
	remove: (key: StateSchemeKey) => void;
}

// расширяем интерфейс дефолтного стора нашим менеджером
export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void;
}

// здесь дженериком будет тип ошибки
export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
}
