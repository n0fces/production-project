import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleDetailsPageRedesigned } from './ArticleDetailsPageRedesigned';

export default {
	title: 'enitites/ArticleDetailsPageRedesigned',
	component: ArticleDetailsPageRedesigned,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleDetailsPageRedesigned>;

const Template: ComponentStory<typeof ArticleDetailsPageRedesigned> = (
	args,
) => <ArticleDetailsPageRedesigned {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
