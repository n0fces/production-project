import { addDecorator } from '@storybook/react';

import { FeaturesFlagsDecorator } from '../../src/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { SuspenceDecorator } from '../../src/shared/config/storybook/SuspenceDecorator/SuspenceDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/shared/const/theme';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	layout: 'fullscreen',
	// здесь описываем темы, которые есть в нашем проекте
	themes: {
		// по дефолту в сторибуке будет тема с таким имененм
		default: 'green',
		// здесь описываем классы, которые будут навешиваться для соответствующей темы
		list: [
			{ name: 'light', class: Theme.LIGHT, color: '#e8e8ea' },
			{ name: 'dark', class: Theme.DARK, color: '#090949' },
			{ name: 'green', class: Theme.GREEN, color: '#069279' },
		],
	},
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenceDecorator);
// чтобы глобаальная константа с фичами изначально переопределялась на пустой объект для каждого сторикейса
// затем уже будем конкретном сторикейсе определять, какая фича нужна
addDecorator(FeaturesFlagsDecorator({}));
