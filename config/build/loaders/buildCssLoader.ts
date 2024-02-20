import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoader(isDev: boolean) {
	return {
		// настроено на sass, scss (то есть сразу для предпроцессоров)
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			// в дев режиме не будем генерировать отдельные css файлы
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			// лоадеры можно передавать как обычной строкой, так и объект, но чтобы вебпак понимал, что это за лоадер, нужно указать, с чем мы работаем
			{
				loader: 'css-loader',
				options: {
					// подключаем работу модулей
					modules: {
						// будем применять модульный подход только для тех файлов, которые в названии содержат .module.
						auto: (resPath: string) => Boolean(resPath.includes('.module.')),
						// те файлы, которые не модули, будут обрабатываться, как обычные scss файлы
						// хотим, чтобы в продакшн сборке у нас были сгенерированные названия, а в дев режиме были самые обычные и простые названия для чтения. названия можно генерировать по шаблонам
						localIdentName: isDev
						// мне кажется, что [name]__[local]--[hash:base64:5] будет красивее
							? '[path][name]__[local]--[hash:base64:5]'
							: '[hash:base64:8]',
					},
				},
			},
			// Compiles Sass to CSS
			'sass-loader',
		],
	};
}
