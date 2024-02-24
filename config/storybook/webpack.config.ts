import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

// у сторибука есть своя вебпак конфигурация, но нашу конфигурацию мы можем переопределять под свои нужды
export default ({ config }: { config: webpack.Configuration }) => {
	const paths: BuildPaths = {
		build: '',
		html: '',
		entry: '',
		src: path.resolve(__dirname, '..', '..', 'src'),
	};
	config.resolve?.modules?.push(paths.src);
	config.resolve?.extensions?.push('.ts', '.tsx');

	// здесь мы убираем дефолтный лоадер для свг от сторибука, а потом добавляем свой
	// eslint-disable-next-line no-param-reassign
	config.module!.rules = config.module?.rules?.map((rule: RuleSetRule) => {
		if (/svg/.test(rule.test as string)) {
			return { ...rule, exclude: /\.svg$/i };
		}

		return rule;
	});

	config.module?.rules?.push({
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	});
	// сторибук у нас будет использоваться только на этапе разработки, поэтому передаем true
	config.module?.rules?.push(buildCssLoader(true));

	// чтобы мы могли использовать глобальные переменные проекта в сторибуке
	config.plugins?.push(
		new DefinePlugin({
			__IS_DEV__: true,
		})
	);

	return config;
};
