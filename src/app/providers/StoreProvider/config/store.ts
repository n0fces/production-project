import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { StateScheme } from './StateScheme';

// делаем создание стора внутри этой функции
// мы сможем переиспользовать, чтобы для тестов и сторибука переиспользовать создание стора
// мы будем использовать initialState, чтобы мы могли его задавать при проведении тестов и написании сторисов
export function createReduxStore(initialState?: StateScheme) {
	const rootReducers: ReducersMapObject<StateScheme> = {
		counter: counterReducer,
		user: userReducer,
	};

	return configureStore<StateScheme>({
		reducer: rootReducers,
		devTools: __IS_DEV__,
		preloadedState: initialState,
	});
}
