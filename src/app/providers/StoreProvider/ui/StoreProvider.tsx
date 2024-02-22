import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { DeepPartial } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import { StateScheme } from '../config/StateScheme';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: DeepPartial<StateScheme>;
}

export const StoreProvider = ({
	children,
	initialState,
}: StoreProviderProps) => {
	const store = createReduxStore(initialState as StateScheme);

	return <Provider store={store}>{children}</Provider>;
};
