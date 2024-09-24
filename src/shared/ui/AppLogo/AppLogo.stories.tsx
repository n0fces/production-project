import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppLogo } from './AppLogo';

export default {
	title: 'entities/AppLogo',
	component: AppLogo,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof AppLogo>;

const Template: ComponentStory<typeof AppLogo> = (args) => (
	<AppLogo {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
