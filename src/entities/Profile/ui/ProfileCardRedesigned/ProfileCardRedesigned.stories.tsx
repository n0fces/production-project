import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCardRedesigned } from './ProfileCardRedesigned';

export default {
	title: 'entities/ProfileCardRedesigned',
	component: ProfileCardRedesigned,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfileCardRedesigned>;

const Template: ComponentStory<typeof ProfileCardRedesigned> = (args) => (
	<ProfileCardRedesigned {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
