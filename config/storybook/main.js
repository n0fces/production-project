module.exports = {
	stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		// по умолчанию добавляем несколько аддонов, которые часто используются (дефолтное решение)
		{
			name: '@storybook/addon-essentials',
			// выключим дефолтный бэкграунд, чтобы добавить свои темы
			options: {
				background: false,
			},
		},
		'@storybook/addon-interactions',
		'storybook-addon-mock/register',
		'storybook-addon-themes',
	],
	framework: '@storybook/react',
	core: {
		builder: 'webpack5',
	},
};
