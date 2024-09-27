/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	semi: true,
	singleQuote: true,
	bracketSpacing: true,
	useTabs: true,
	arrowParens: 'always',
	trailingComma: 'all',
	bracketSameLine: true,
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: [
		'<THIRD_PARTY_MODULES>',
		'^@/app',
		'^@/pages',
		'^@/widgets',
		'^@/features',
		'^@/entities',
		'^@/shared',
		'^[.]',
		'.scss$',
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	overrides: [
		{
			files: '*.svg',
			options: {
				parser: 'html',
			},
		},
	],
};

export default config;
