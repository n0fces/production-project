import { DeepPartial } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';

export const StoreDecorator = (state: DeepPartial<StateScheme>) => (StoryComponent: Story) =>
	(
		<StoreProvider initialState={state}>
			<StoryComponent />
		</StoreProvider>
	);
