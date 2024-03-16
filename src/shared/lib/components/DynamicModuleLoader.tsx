import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemeKey } from 'app/providers/StoreProvider/config/StateScheme';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

// вполне возможно, что у нас могут быть сложные модули, которые будут требовать подключения нескольких асинхронных редьюсеров. Здесь мы как раз реализовали и такое
export type ReducersList = {
	[name in StateSchemeKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
	children: ReactNode;
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

// очевидно, что писать во многих компонентах этот страшный useEffect по подключению асинхронный редьюсеров не хочется, поэтому мы вынесем эту логику в отдельный компонент
export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
	const { children, reducers, removeAfterUnmount } = props;
	const dispatch = useDispatch();
	// благодаря этому хуку мы получаем стор, который создавали
	const store = useStore() as ReduxStoreWithManager;
	// в момент монтирования компонента нам с помощью редьюсер менеджера нужно добавить редьюсер
	useEffect(() => {
		// получаем объект с вмонтированными редьюсерами
		const mountedReducers = store.reducerManager.getMountedReducers();
		Object.entries(reducers).forEach(([name, reducer]) => {
			// по ключу достаем нужный нам редьюсер
			const mounted = mountedReducers[name as StateSchemeKey];
			// проверяем, вмонтирован ли этот редьюсер или нет (false или true там в качестве значения для соответствующего ключа)
			if (!mounted) {
				store.reducerManager.add(name as StateSchemeKey, reducer);
				// добавили эти штуки только для отслеживания
				dispatch({ type: `@INIT ${name} reducer` });
			}
		});

		// при размонтировании компонента мы удалим этот редьюсер
		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name]) => {
					store.reducerManager.remove(name as StateSchemeKey);
					// добавили эти штуки только для отслеживания
					dispatch({ type: `@DESTROY ${name} reducer` });
				});
			}
		};
		// eslint-disable-next-line
	}, []);

	// * не ну это конкретный костылик)
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{children}</>;
};
