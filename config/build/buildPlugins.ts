import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
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
	const isProd = !isDev;
	const plugins = [
		// чтобы использовать index.html из public в качестве шаблона при сборке, используем настройку template
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		// помогает отслеживать продвижение процесса сборки
		new webpack.ProgressPlugin(),
		// с помощью этого плагина можно в само приложение прокидывать глобальные переменные
		new webpack.DefinePlugin({
			// необязательно оформлять названия именно так, но это позволяет отделить глобальные переменные вебпака от других глобальных переменных
			__IS_DEV__: JSON.stringify(isDev),
			__API__: JSON.stringify(apiUrl),
			__PROJECT__: JSON.stringify(project),
		}),
		// плагин, который будет отслеживать кольцевые зависимости и пробрасывать ошибки об этом
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true,
		}),
		// добавляем чекер типов ts, который работает в отдельном потоке
		// сборка нашего основного проекта не занимается проверкой типов
		// это происходит в отдельном потоке, отчего сборка проходит заметно быстрее
		// без этого плагина мало того что при сборке в основном потоке проходила проверка типов при использовании ts-loader,
		// так и после отказа от ts-loader у нас в принципе пропала проверка типов, так что теперь вот так ее добавляем
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
				},
				mode: 'write-references',
			},
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

	// нам не имеет смысла использовать данный плагин в дев моде (он используется только в продакшн моде)
	if (isProd) {
		plugins.push(
			// как сказал улби, порядок плагинов особой роли не играет, в отличие от лоадеров
			// данный плагин нужен для того, чтобы стили у нас при сборке генерировались в css файлы
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			}),
			// благодаря этому плагину мы сможем при сборке добавлять переводы в папку build
			// нужен только для продакшн сборки
			new CopyPlugin({
				patterns: [{ from: paths.locales, to: paths.buildLocales }],
			})
		);
	}

	return plugins;
}
