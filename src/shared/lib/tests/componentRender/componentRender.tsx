// ! надо потом исключить в eslintrc данный файл из рассмотрения

/* eslint-disable path-checker-fsd-trainee/layer-imports */
import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { StateScheme, StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';

import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { Theme } from '@/shared/const/theme';

export interface ComponentRenderOptions {
	route?: string;
	// чтобы могли инициализировать начальное состояие не сразу всего стора, а только чего-то конкретного и нужного нам
	initialState?: DeepPartial<StateScheme>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>;
	theme?: Theme;
}

interface TestProviderProps {
	children: ReactNode;
	options?: ComponentRenderOptions;
}

// отдельный провайдер, чтобы использовать его также в е2е тестах (нам не нужно использовать render из @testing-library/react)
export const TestProvider = (props: TestProviderProps) => {
	const { children, options = {} } = props;
	const { route = '/', initialState, asyncReducers, theme } = options;
	return (
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
				<I18nextProvider i18n={i18nForTests}>
					<ThemeProvider initialTheme={theme}>
						<div className={`app ${theme}`}>{children}</div>
					</ThemeProvider>
				</I18nextProvider>
			</StoreProvider>
		</MemoryRouter>
	);
};

export function componentRender(
	component: ReactNode,
	options: ComponentRenderOptions = {},
) {
	return render(<TestProvider options={options}>{component}</TestProvider>);
}
