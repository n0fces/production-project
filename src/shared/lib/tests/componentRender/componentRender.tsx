import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { MemoryRouter } from 'react-router-dom';
import { StateScheme, StoreProvider } from 'app/providers/StoreProvider';

export interface ComponentRenderOptions {
	route?: string;
	// чтобы могли инициализировать начальное состояие не сразу всего стора, а только чего-то конкретного и нужного нам
	initialState?: DeepPartial<StateScheme>;
}

export function componentRender(
	component: ReactNode,
	options: ComponentRenderOptions = {}
) {
	const { route = '/', initialState } = options;
	return render(
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider initialState={initialState}>
				<I18nextProvider i18n={i18nForTests}>
					{component}
				</I18nextProvider>
			</StoreProvider>
		</MemoryRouter>
	);
}
