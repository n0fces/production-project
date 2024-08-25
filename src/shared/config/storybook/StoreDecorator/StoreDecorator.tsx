import { Story } from '@storybook/react';
import { StateScheme, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { addCommentFormReducer } from '@/features/AddCommentForm/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { profileReducer } from '@/features/EditableProfileCard/testing';

const defaultAsyncReducers: ReducersList = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
	addCommentForm: addCommentFormReducer,
	articleDetailsPage: articleDetailsPageReducer,
};

// не знаю, почему мы сделали так, что можем дополнительно пробрасывать еще асинхронных редьюсер, ведь сверху мы сделали объект, который по сути является костылем для всего этого. То есть мы передаем объект с асинхронными редьюсерами, чтобы у нас в сторибуках работало отображение нормально. Мы можем просто туда закидывать эти асинхроонные редьюсеры. Но нет, мы еще сделали возможность добавлять дополнительно асинхронный редьюсер. Короче странно решение для меня
export const StoreDecorator =
	(state: DeepPartial<StateScheme>, asyncReducers?: ReducersList) =>
		(StoryComponent: Story) =>
			(
				<StoreProvider
					initialState={state}
					asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
				>
					<StoryComponent />
				</StoreProvider>
			);
