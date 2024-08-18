import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore, AppDispatch } from './config/store';
import type {
	StateScheme,
	ReduxStoreWithManager,
	ThunkConfig,
} from './config/StateScheme';

export { StoreProvider, createReduxStore };

export type { AppDispatch, ThunkConfig, StateScheme, ReduxStoreWithManager };
