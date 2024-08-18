import babelRemovePropsPlugin from '../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BuildBabelLoaderProps extends BuildOptions {
	// чтобы мы могли отдельно работать с ts и tsx файлами (с ними нужно работать иначе относительно друг друга)
	isTsx: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
	return {
		test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: [
					[
						'i18next-extract',
						{
							locales: ['ru', 'en'],
							keyAsDefaultValue: true,
						},
					],
					[
						'@babel/plugin-transform-typescript',
						{
							isTsx,
						},
					],
					'@babel/plugin-transform-runtime',
					// добавили свой babel-plugin, который будет удалять те атрибуты в jsx-нодах, которые мы захотим
					// для обычных ts файлов никакого смысла прогонять этот плагин нет. Только увеличим время сборки
					isTsx && [
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
