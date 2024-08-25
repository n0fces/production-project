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
	],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'no-tabs': 'off',
		'arrow-body-style': 'off',
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.tsx'] },
		],
		quotes: 'off',
		'jsx-quotes': ['error', 'prefer-single'],
		semi: ['error', 'always'],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
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
				],
			},
		],
		'max-len': ['error', { ignoreComments: true, code: 125 }],
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
		'path-checker-fsd-trainee/public-api-imports': ['error', { alias: '@' }],
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
