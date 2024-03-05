import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

// здесь будет собираться весь конфиг
export function buildWebpackConfig(
	options: BuildOptions
): webpack.Configuration {
	const { paths, mode, isDev } = options;

	return {
		// устанавливаем мод нашей сборки
		// если указать development, то сборка не будет так сильно минимизироватсья, как для продакшен версии. В продакшн версии у нас пропадут все лишние отступы и пробелы, комментарии
		mode,
		// стартовая точка нашего приложения
		// харкодить пути не очень, потому что на разных ОС они работают по-разному
		// resolve - склеивает участки нашего пути
		// __dirname - папка, в которой мы находимся (файл webpack.confing)
		entry: paths.entry,
		// куда будем делать сборку нашео приложения
		output: {
			// можешь указывать динамические названия наших файлов при помощи name
			// по дефолту будет main. название можно поправить и даже указать несколько энтри поинтов (указываем в entry)
			// браузер хэширует файл с определенным названием, чтобы постоянно не дергать сервер. что если мы выкатили новую версию нашего приложения. можно добавить [contenthash]. в зависимости от содержимого файла будут генерироваться файлы
			filename: '[name].[contenthash].js',
			path: paths.build,
			// при каждой сборке генерируется большое количество файлов. эта настройка помогает убрать все лишнее
			clean: true,
			// на каждый файл, помещенный в ваш output.path каталог, будет ссылка из этого output.publicPath местоположения
			publicPath: '/',
		},
		plugins: buildPlugins(options),
		module: {
			// конфигурируем лоадеры, предназначенные для обработки файлов, которые выходят за рамки js (сюда входит и в ts)
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
		// эти карты нужны для того, чтобы мы могли отследить файл, именно в котором первоначально произошла ошибка, а не в каком-то головном файле
		// В продакшен сборке нам не нужны эти вещи, поэтому используем нашу переменную isDev. Каждый символ определенное кол-во байт, поэтому нам нужно исключать даже всякие комментарии
		devtool: isDev ? 'inline-source-map' : undefined,
		// эта штука нужна для того, чтобы при дев режиме у нас автоматически пересобиралась сборка. без этой штуки нам придется самим каждый раз пересобирать сборку
		devServer: isDev ? buildDevServer(options) : undefined,
	};
}
