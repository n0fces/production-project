import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleDetailsPageDeprecated } from './ArticleDetailsPageDeprecated';

export default {
	title: 'enitites/ArticleDetailsPageDeprecated',
	component: ArticleDetailsPageDeprecated,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleDetailsPageDeprecated>;

const Template: ComponentStory<typeof ArticleDetailsPageDeprecated> = (
	args,
) => <ArticleDetailsPageDeprecated {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
