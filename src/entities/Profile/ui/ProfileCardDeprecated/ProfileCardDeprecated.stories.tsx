import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCardDeprecated } from './ProfileCardDeprecated';

export default {
	title: 'enitites/ProfileCardDeprecated',
	component: ProfileCardDeprecated,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfileCardDeprecated>;

const Template: ComponentStory<typeof ProfileCardDeprecated> = (args) => (
	<ProfileCardDeprecated {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
