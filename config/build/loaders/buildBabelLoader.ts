export function buildBabelLoader(isDev: boolean) {
	return {
		test: /\.(js|jsx|tsx)$/,
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
					// нужен для того, чтобы при изменении, например, верстки/стилей у нас не происходила полная перезагрузка страницы
					isDev && require.resolve('react-refresh/babel'),
					// filter нужен для того, чтобы при не дев режиме в массиве плагинов у нас не было false
				].filter(Boolean),
			},
		},
	};
}
