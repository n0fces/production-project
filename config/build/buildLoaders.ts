import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	// Чтобы можно было импортировать svg иконки, как реакт компоненты. он предназначен только для свг
	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};
	// этот урок по бабелю был опциональным. штука позволяет автоматически при сборке вытаскивать ключи для переводов в отдельный файл. мы сделали это только для того, чтобы рассмотреть, как подключать бабель
	const babelLoader = buildBabelLoader(isDev);
	// порядок, при котором лоадеры возвращаются в массиве, имеет значение, поэтому вот так будем выносить лоадеры, чтобы потом легче было ориентироваться
	const cssLoader = buildCssLoader(isDev);

	// Если не используем тайпскрипт - нужен babel-loader
	// Этот лоадер уже умеет обрабатывать jsx
	// если бы мы писали на нативном jsx, то нам понадобился бы еще babel-loader
	const typescriptLoader = {
		// данная регулярка будет ловить ts и tsx
		test: /\.tsx?$/,
		// указываем лоадер, который будет использоваться для найденных файлов
		use: 'ts-loader',
		// обрабатывать файлы из node_modules не будем
		exclude: /node_modules/,
	};

	// для импорта других файлов
	const fileLoader = {
		test: /\.(png|jpe?g|gif|woff2|woff)$/i,
		use: [
			{
				loader: 'file-loader',
			},
		],
	};

	return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
