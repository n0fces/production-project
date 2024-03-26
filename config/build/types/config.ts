// мы сделали механизм, чтобы конфигурировать конфиг извне. здесь описали типы опций для сборки

export type BuildMode = 'production' | 'development';

export interface BuildPaths {
	entry: string;
	build: string;
	html: string;
	src: string;
	// здесь будем указывать путь до папки с переводами
	locales: string;
	// куда нам эти переводы необходимо перемещать
	buildLocales: string;
}

export interface BuildEnv {
	mode: BuildMode;
	port: number;
	apiUrl: string;
}

export interface BuildOptions {
	mode: BuildMode;
	paths: BuildPaths;
	// чисто для удобства добавили
	isDev: boolean;
	port: number;
	apiUrl: string;
	// для всех трех у нас своя конфигурация среды
	project: 'storybook' | 'frontend' | 'jest';
}
