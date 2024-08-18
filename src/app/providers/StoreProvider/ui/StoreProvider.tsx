import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateScheme } from '../config/StateScheme';
import { createReduxStore } from '../config/store';

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
	// если бы вот так оставили, то у нас постоянно бы вызывался хук useNavigate, а значит постоянно пересоздавался стор
	// const navigate = useNavigate();
	const store = createReduxStore(
		initialState as StateScheme,
		asyncReducers as ReducersMapObject<StateScheme>,
		// navigate
	);

	return <Provider store={store}>{children}</Provider>;
};
