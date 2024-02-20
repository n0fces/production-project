// Переименовали, чтобы не было путаницы из Configuration из webpack
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port,
		// будет автоматически в браузере открывать старницу с нашим приложением
		open: true,
		// allows proxy requests through a specified index page
		historyApiFallback: true,
		// чтобы при изменению каких-нибудь стилей у нас происходили изменения, но страница не перезагружалась
		hot: true,
	};
}
