import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditArticleButton } from './EditArticleButton';

export default {
	title: 'features/EditArticleButton',
	component: EditArticleButton,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof EditArticleButton>;

const Template: ComponentStory<typeof EditArticleButton> = (args) => (
	<EditArticleButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
