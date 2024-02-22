import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { StateScheme } from './StateScheme';

// делаем создание стора внутри этой функции
// мы сможем переиспользовать, чтобы для тестов и сторибука переиспользовать создание стора
// мы будем использовать initialState, чтобы мы могли его задавать при проведении тестов и написании сторисов
export function createReduxStore(initialState?: StateScheme) {
	return configureStore<StateScheme>({
		reducer: {
			counter: counterReducer,
		},
		devTools: __IS_DEV__,
		preloadedState: initialState,
	});
}
