import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentCard } from './CommentCard';

export default {
	title: 'entities/Comment/CommentCard',
	component: CommentCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
	<CommentCard {...args} />
);

const normalArgs = {
	comment: {
		id: '1',
		text: 'Hello world',
		user: { id: '1', username: 'Vasya' },
	},
};

export const Normal = Template.bind({});
Normal.args = normalArgs;

export const IsLoading = Template.bind({});
IsLoading.args = {
	...normalArgs,
	isLoading: true,
};
