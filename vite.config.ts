import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svgr({
			// по умолчанию используется именованный экспорт, а мы в проекте используем экспорт по дефолту иконок
			exportAsDefault: true,
		}),
		react(),
	],
	resolve: {
		// как и вебпаке нужно указать алиасы, с которыми мы работаем
		// можем также указать список различных алиасов, которые мы используем
		alias: [{ find: '@', replacement: '/src' }],
	},
	// также может определять глобальные переменные
	// для is dev устанавливаем четко true, потому что используем vite для быстрого процесса разработки
	// важно, чтобы мы передавали JSON объекты
	define: {
		__IS_DEV__: JSON.stringify(true),
		__API__: JSON.stringify('http://localhost:8000'),
		__PROJECT__: JSON.stringify('frontend'),
	},
});
