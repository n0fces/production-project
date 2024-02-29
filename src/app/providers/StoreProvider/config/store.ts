import { CombinedState, Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { NavigateOptions, To } from 'react-router-dom';
import { $api } from 'shared/api/api';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { StateScheme, ThunkExtraArg } from './StateScheme';
import { createReducerManager } from './reduceManager';

// делаем создание стора внутри этой функции
// мы сможем переиспользовать, чтобы для тестов и сторибука переиспользовать создание стора
// мы будем использовать initialState, чтобы мы могли его задавать при проведении тестов и написании сторисов
// * У Миши надо будет еще раз посмотреть, как он типизировал стор. Там все короче и удобнее
// * + надо будет сделать типизированные хуки useSelector и useDispatch. Типизированный useSelector позволит каждый раз не указывать тип стейта. Типизированный useDispatch будет знать про наши события и не позволит пердеать какую-то дичь
export function createReduxStore(
	initialState?: StateScheme,
	asyncReducers?: ReducersMapObject<StateScheme>,
	navigate?: (to: To, options?: NavigateOptions) => void
) {
	// в корневом редьюсере оставляем только те редьюсеры, которые являются обязательными
	const rootReducers: ReducersMapObject<StateScheme> = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer,
	};

	const reducerManager = createReducerManager(rootReducers);

	const extraArg: ThunkExtraArg = {
		api: $api,
		navigate,
	};

	const store = configureStore({
		// при использовании менеджера редьюсеров мы должны передавать не рут редьюсер, а стейт после выполнения данной функции редьюс
		// без этого новые редьюсеры не будут добавляться
		// Тимур сказал, что это можно пофиксить и без as, но пока оставим так, чтобы не задерживаться
		reducer: reducerManager.reduce as Reducer<CombinedState<StateScheme>>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: extraArg,
				},
			}),
	});

	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
}

// получаем тип того, что должна вернуть данная функция (эта функция у нас как раз и конфигурирует стор)
// также мы можем достать тип конкретно диспатча
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
