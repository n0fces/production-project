import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BuildBabelLoaderProps extends BuildOptions {
	// чтобы мы могли отдельно работать с ts и tsx файлами (с ними нужно работать иначе относительно друг друга)
	isTsx: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
	const isProd = !isDev;
	return {
		test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				// будем использовать кэширование для тех файлов, которые редко меняются
				// то есть babel лоадеру уже не придется ре-билдить большую часть файлов, так как они буудт браться из кэша
				// опять же это ускоряет ре-билд при разработке
				cacheDirectory: true,
				presets: ['@babel/preset-env'],
				plugins: [
					[
						'@babel/plugin-transform-typescript',
						{
							isTsx,
						},
					],
					'@babel/plugin-transform-runtime',
					// добавили свой babel-plugin, который будет удалять те атрибуты в jsx-нодах, которые мы захотим
					// для обычных ts файлов никакого смысла прогонять этот плагин нет. Только увеличим время сборки
					// нам нужно удалять data-testid у tsx файлов именно в проде (в дев режиме они нам не мешают, но зато мы ускорим сборку в дев режиме, так как этот плагин не будет отрабатывать)
					isTsx &&
						isProd && [
						babelRemovePropsPlugin,
						{
							props: ['data-testid'],
						},
					],
					// нужен для того, чтобы при изменении, например, верстки/стилей у нас не происходила полная перезагрузка страницы
					isDev && require.resolve('react-refresh/babel'),
					// filter нужен для того, чтобы при не дев режиме в массиве плагинов у нас не было false
				].filter(Boolean),
			},
		},
	};
}
