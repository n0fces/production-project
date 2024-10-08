import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Drawer } from './Drawer';

export default {
	title: 'entities/Drawer',
	component: Drawer,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
