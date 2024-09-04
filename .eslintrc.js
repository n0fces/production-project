module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:i18next/recommended',
		'plugin:storybook/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'i18next',
		'react-hooks',
		'path-checker-fsd-trainee',
		'unused-imports',
	],
	rules: {
		'unused-imports/no-unused-imports': 'error',
		'arrow-body-style': 'off',
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.tsx'] },
		],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'warn',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'warn',
		'react/function-component-definition': 'off',
		'no-shadow': 'off',
		'import/extensions': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-underscore-dangle': 'off',
		'i18next/no-literal-string': [
			'error',
			{
				markupOnly: true,
				ignoreAttribute: [
					'as',
					'role',
					'data-testid',
					'to',
					'name',
					'target',
					'direction',
					'justify',
					'align',
					'gap',
					'border',
					'feature',
				],
			},
		],
		'object-curly-newline': 'off',
		'comma-dangle': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'implicit-arrow-linebreak': 'off',
		'no-param-reassign': 'off',
		'operator-linebreak': 'off',
		'lines-between-class-members': 'off',
		'no-undef': 'off',
		'react/no-array-index-key': 'off',
		'function-paren-newline': 'off',
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
				// указываем файлы, которые являются тестовыми (для разработки)
				testFilesPatterns: [
					'**/*.test.*',
					'**/StoreDecorator.tsx',
					'**/*.story.*',
				],
			},
		],
		'react/no-unstable-nested-components': 'warn',
	},
	globals: {
		__IS_DEV__: true,
		__API__: true,
		__PROJECT__: true,
	},
	overrides: [
		{
			files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
			rules: {
				'i18next/no-literal-string': 'off',
				'max-len': 'off',
			},
		},
	],
};
