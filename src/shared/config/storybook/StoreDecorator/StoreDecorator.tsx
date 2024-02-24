import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateScheme>> = {
	loginForm: loginReducer,
};

// не знаю, почему мы сделали так, что можем дополнительно пробрасывать еще асинхронных редьюсер, ведь сверху мы сделали объект, который по сути является костылем для всего этого. То есть мы передаем объект с асинхронными редьюсерами, чтобы у нас в сторибуках работало отображение нормально. Мы можем просто туда закидывать эти асинхроонные редьюсеры. Но нет, мы еще сделали возможность добавлять дополнительно асинхронный редьюсер. Короче странно решение для меня
export const StoreDecorator =
	(
		state: DeepPartial<StateScheme>,
		asyncReducers?: ReducersMapObject<StateScheme>
	) => (StoryComponent: Story) =>
		(
			<StoreProvider
				initialState={state}
				asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
			>
				<StoryComponent />
			</StoreProvider>
		);
