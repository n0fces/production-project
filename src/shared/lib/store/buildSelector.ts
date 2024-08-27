import { useSelector } from 'react-redux';
import { StateScheme } from '@/app/providers/StoreProvider';

type Selector<T> = (state: StateScheme) => T;
type Result<T> = [() => T, Selector<T>];

export function buildSelector<T>(selector: Selector<T>): Result<T> {
	const useSelectorHook = () => {
		return useSelector(selector);
	};

	return [useSelectorHook, selector];
}
