import {
	CreateSliceOptions,
	SliceCaseReducers,
	bindActionCreators,
	createSlice,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export function buildSlice<
	State,
	CaseReducers extends SliceCaseReducers<State>,
	Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
	const slice = createSlice(options);

	// указываем, что данный хук возвращает экшены, которые связаны с этим слайсом
	const useActions = (): typeof slice.actions => {
		const dispatch = useDispatch();
		// первыым аргументом передаем сами экшены, а вторым - dispatch
		// этот dispatch к каждому экшену будет прибинджен
		// @ts-expect-error -- необходимо возвращать CaseReducerActions<CaseReducers, Name>, так как это тип actions, которые отдает slice из createSlice
		return useMemo(
			// @ts-expect-error -- bindActionCreators ожидает ActionCreatorsMapObject<A = any>, но все равно работает с CaseReducerActions<CaseReducers, Name>
			() => bindActionCreators(slice.actions, dispatch),
			[dispatch],
		);
	};

	return {
		...slice,
		useActions,
	};
}
