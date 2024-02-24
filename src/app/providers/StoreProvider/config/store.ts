import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import { StateScheme } from './StateScheme';

// делаем создание стора внутри этой функции
// мы сможем переиспользовать, чтобы для тестов и сторибука переиспользовать создание стора
// мы будем использовать initialState, чтобы мы могли его задавать при проведении тестов и написании сторисов
// * У Миши надо будет еще раз посмотреть, как он типизировал стор. Там все короче и удобнее
// * + надо будет сделать типизированные хуки useSelector и useDispatch. Типизированный useSelector позволит каждый раз не указывать тип стейта. Типизированный useDispatch будет знать про наши события и не позволит пердеать какую-то дичь
export function createReduxStore(initialState?: StateScheme) {
	const rootReducers: ReducersMapObject<StateScheme> = {
		counter: counterReducer,
		user: userReducer,
		loginForm: loginReducer,
	};

	return configureStore<StateScheme>({
		reducer: rootReducers,
		devTools: __IS_DEV__,
		preloadedState: initialState,
	});
}
