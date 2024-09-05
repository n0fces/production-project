import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MainLayout } from './MainLayout';

export default {
	title: 'shared/MainLayout',
	component: MainLayout,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof MainLayout>;

const Template: ComponentStory<typeof MainLayout> = (args) => (
	<MainLayout {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
