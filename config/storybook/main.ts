import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';

import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default {
	stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		// по умолчанию добавляем несколько аддонов, которые часто используются (дефолтное решение)
		{
			name: '@storybook/addon-essentials',
			// выключим дефолтный бэкграунд, чтобы добавить свои темы
			options: {
				background: false,
			},
		},
		'@storybook/addon-interactions',
		'storybook-addon-mock',
		'storybook-addon-themes',
	],
	framework: '@storybook/react',
	core: {
		builder: 'webpack5',
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript-plugin',
	},
	webpackFinal: async (config: Configuration) => {
		const paths: BuildPaths = {
			build: '',
			html: '',
			entry: '',
			src: path.resolve(__dirname, '..', '..', 'src'),
			locales: path.resolve(__dirname, 'public', 'locales'),
			buildLocales: path.resolve(__dirname, 'build', 'locales'),
		};
		config.resolve?.modules?.push(paths.src);
		config.resolve?.extensions?.push('.ts', '.tsx');
		// после добавления алиасов в наш проект необходимо также добавить наши новые алиасы в сторибук
		if (config.resolve?.alias) {
			config.resolve.alias = {
				// необходимо развернуть старые алиасы, чтобы, возможно, не забыть встроенные алиасы в конфигурации вебпака сторибука
				...config.resolve?.alias,
				'@': paths.src,
			};
		}

		// здесь мы убираем дефолтный лоадер для свг от сторибука, а потом добавляем свой
		if (config.module?.rules) {
			config.module.rules = config.module?.rules?.map((rule) => {
				if (rule && typeof rule === 'object' && 'test' in rule) {
					if (/svg/.test(rule.test as string)) {
						return { ...rule, exclude: /\.svg$/i };
					}
				}

				return rule;
			});
		}

		config.module?.rules?.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		// сторибук у нас будет использоваться только на этапе разработки, поэтому передаем true
		config.module?.rules?.push(buildCssLoader(true));

		// чтобы мы могли использовать глобальные переменные проекта в сторибуке
		config.plugins?.push(
			new DefinePlugin({
				__IS_DEV__: JSON.stringify(true),
				// нам для сторибуков не надо передавать никакие запросы, поэтому поставили пустую строку
				__API__: JSON.stringify('https://testapi.ru'),
				// у нас есть 3 среды, которые мы можем отличать по глобальной переменной __PROJECT__
				__PROJECT__: JSON.stringify('storybook'),
			}),
		);

		return config;
	},
};
