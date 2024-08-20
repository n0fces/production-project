import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
	return {
		// указываем расширения тех файлов, которым при импорте не будем указывать расширение
		extensions: ['.tsx', '.ts', '.js'],
		// делаем в приоритете абсолютные пути
		preferAbsolute: true,
		// это делаем для абсолютных импортов. абсолютные импорты будут из папки src и node_modules
		modules: [options.paths.src, 'node_modules'],
		// для каждого модуля главным файлом будет являться индекс
		mainFiles: ['index'],
		// если оставить данный объект пустым, то никаких алиасов не будет (доступ будет напрямую)
		alias: {
			'@': options.paths.src,
		},
	};
}
