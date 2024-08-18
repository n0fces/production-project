import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

export function buildPlugins({
	paths,
	isDev,
	apiUrl,
	project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
	const plugins = [
		// чтобы использовать index.html из public в качестве шаблона при сборке, используем настройку template
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		// помогает отслеживать продвижение процесса сборки
		new webpack.ProgressPlugin(),
		// как сказал улби, порядок плагинов особой роли не играет, в отличие от лоадеров
		// данный плагин нужен для того, чтобы стили у нас при сборке генерировались в css файлы
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		// с помощью этого плагина можно в само приложение прокидывать глобальные переменные
		new webpack.DefinePlugin({
			// необязательно оформлять названия именно так, но это позволяет отделить глобальные переменные вебпака от других глобальных переменных
			__IS_DEV__: JSON.stringify(isDev),
			__API__: JSON.stringify(apiUrl),
			__PROJECT__: JSON.stringify(project),
		}),
		// благодаря этому плагину мы сможем при сборке добавлять переводы
		new CopyPlugin({
			patterns: [{ from: paths.locales, to: paths.buildLocales }],
		}),
		// плагин, который будет отслеживать кольцевые зависимости и пробрасывать ошибки об этом
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true,
		}),
	];

	// Данные плагины нам нужны только в режиме разработки
	if (isDev) {
		plugins.push(
			// чтобы у нас не происходило полной перезагрузки после, например, внесения изменений в верстку
			new ReactRefreshWebpackPlugin(),
			// чтобы при изменению каких-нибудь стилей у нас происходили изменения, но страница не перезагружалась
			// добавление плагина делает этот процесс лучше
			new webpack.HotModuleReplacementPlugin(),
			// чтобы смотреть размер пакетов общей сборки
			new BundleAnalyzerPlugin({
				// теперь бандл аналайзер не будет сразу открываться, а будет только ссылка на него, если мы хотим посмотреть этот отчет
				openAnalyzer: false,
			})
		);
	}

	return plugins;
}
