// мы сделали механизм, чтобы конфигурировать конфиг извне. здесь описали типы опций для сборки

export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    // чисто для удобства добавили
    isDev: boolean;
    port: number;
}