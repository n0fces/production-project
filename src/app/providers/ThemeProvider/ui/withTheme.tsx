import React from 'react';

import { useJsonSettings } from '@/entities/User';

import { ThemeProvider } from './ThemeProvider';

// благодаря данному хоку удалось решить проблему того, что в ThemeProvider мы взаимодействовали везде с redux (даже там, где на самом деле нет)
// теперь вынесли логику получения темы пользователя на уровень выше, а далее уже пробрасываем ее по пропсам в ThemeProvider
export const withTheme = (Component: React.ComponentType) => {
	return () => {
		const { theme: defaultTheme } = useJsonSettings();
		return (
			<ThemeProvider initialTheme={defaultTheme}>
				<Component />
			</ThemeProvider>
		);
	};
};
