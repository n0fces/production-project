import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { createReduxStore } from '../config/store';
import { StateScheme } from '../config/StateScheme';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: DeepPartial<StateScheme>;
	// по большому счету добавили их для сторис. На момент работы сторибука он не знает про эти асинхронные редьюсеры
	asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>;
}

export const StoreProvider = ({
	children,
	initialState,
	asyncReducers,
}: StoreProviderProps) => {
	const navigate = useNavigate();
	const store = createReduxStore(
		initialState as StateScheme,
		asyncReducers as ReducersMapObject<StateScheme>,
		navigate
	);

	return <Provider store={store}>{children}</Provider>;
};
