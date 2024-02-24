import {
	AnyAction,
	Reducer,
	ReducersMapObject,
	combineReducers,
} from '@reduxjs/toolkit';
import { ReducerManager, StateScheme, StateSchemeKey } from './StateScheme';

export function createReducerManager(
	initialReducers: ReducersMapObject<StateScheme>
): ReducerManager {
	// получаем на вход дефолтные редьюсеры, которые потом собираем в корневой редьюсер
	const reducers = { ...initialReducers };

	let combinedReducer = combineReducers(reducers);

	// названия редьюсеров, которые хотим удалить
	let keysToRemove: Array<StateSchemeKey> = [];

	return {
		getReducerMap: () => reducers,

		// удаляем редьюсеры с ключами из того массива
		reduce: (state: StateScheme, action: AnyAction) => {
			if (keysToRemove.length > 0) {
				state = { ...state };
				keysToRemove.forEach((key) => {
					delete state[key];
				});
				keysToRemove = [];
			}

			return combinedReducer(state, action);
		},

		// по ключу добавляет новый редьюсер
		add: (key: StateSchemeKey, reducer: Reducer) => {
			if (!key || reducers[key]) {
				return;
			}

			reducers[key] = reducer;
			combinedReducer = combineReducers(reducers);
		},

		// по ключу удаляет редьюсер
		remove: (key: StateSchemeKey) => {
			if (!key || !reducers[key]) {
				return;
			}

			delete reducers[key];
			keysToRemove.push(key);
			combinedReducer = combineReducers(reducers);
		},
	};
}
