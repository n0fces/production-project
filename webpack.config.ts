import webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';

function getApiUrl(mode: BuildMode, apiUrl?: string) {
	if (apiUrl) {
		return apiUrl;
	}
	// в качестве текущего адреса будет текущий хост
	// по текущему хосту запрос и так будет улетать, так что нет смысла его явно указывать
	if (mode === 'production') {
		return '/api';
	}
	return 'http://localhost:8000';
}

export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		locales: path.resolve(__dirname, 'public', 'locales'),
		buildLocales: path.resolve(__dirname, 'build', 'locales'),
	};

	const mode = env?.mode || 'development';
	const PORT = env?.port || 3000;
	const apiUrl = getApiUrl(mode, env?.apiUrl);

	const isDev = mode === 'development';

	const config: webpack.Configuration = buildWebpackConfig({
		mode,
		paths,
		isDev,
		port: PORT,
		apiUrl,
		// это основная среда, в которой мы ведем разработку
		project: 'frontend',
	});

	return config;
};
