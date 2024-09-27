import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import i18next from 'eslint-plugin-i18next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPathCheckerFsd from 'eslint-plugin-path-checker-fsd-trainee';
import storybookPlugin from 'eslint-plugin-storybook';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
	// * глобально игнорируемые директории
	// * https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
	{
		ignores: [
			'.deploy/**/*',
			'.fttemplates/**/*',
			'.github/**/*',
			'.husky/**/*',
			'.loki/**/*',
			'.vscode/**/*',
			'build/**/*',
			'docs/**/*',
			'extractedTranslations/**/*',
			'node_modules/**/*',
			'public/**/*',
			'reports/**/*',
			'storybook-static/**/*',
			'*.config.*',
			'**/*.md',
			'.browserslistrc',
			'.gitignore',
		],
	},
	{
		name: 'general',
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jest,
				__IS_DEV__: 'readonly',
				__API__: 'readonly',
				__PROJECT__: 'readonly',
			},
		},
		extends: [
			pluginJs.configs.recommended,
			...tseslint.configs.strict,
			...tseslint.configs.stylistic,
			eslintConfigPrettier,
		],
	},
	{
		name: 'react',
		files: ['**/*.{jsx,tsx}'],
		ignores: ['config/**/*'],
		extends: [
			...tseslint.configs.strictTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
			pluginReact.configs.flat.recommended,
			pluginReact.configs.flat['jsx-runtime'],
			jsxA11y.flatConfigs.strict,
		],
		plugins: {
			'react-hooks': reactHooks,
			'path-checker-fsd-trainee': eslintPluginPathCheckerFsd,
			'unused-imports': unusedImports,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		languageOptions: {
			...jsxA11y.flatConfigs.recommended.languageOptions,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			// * чтобы unused imports plugin работал
			'@typescript-eslint/no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'react/display-name': 'off',
			'path-checker-fsd-trainee/path-checker': ['error', { alias: '@' }],
			'path-checker-fsd-trainee/layer-imports': [
				'error',
				// ! а вообще можно было бы сделать типизированную версию useSelector и не использовать в селекторах тип StateScheme
				{
					alias: '@',
					ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
				},
			],
			'path-checker-fsd-trainee/public-api-imports': [
				'error',
				{
					alias: '@',
					// * указываем файлы, которые являются тестовыми (для разработки)
					testFilesPatterns: [
						'**/*.test.*',
						'**/StoreDecorator.tsx',
						'**/*.story.*',
					],
				},
			],
		},
	},
	{
		name: 'i18next',
		extends: [i18next.configs['flat/recommended']],
	},
	{
		name: 'storybook',
		files: ['**/src/**/*.{stories}.{ts,tsx}'],
		extends: [storybookPlugin.configs],
	},
	{
		name: 'overrides rules for test- and story- files',
		files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
		rules: {
			'i18next/no-literal-string': 'off',
		},
	},
);
