import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';
import AvatarImg from '@/shared/assets/tests/storybook.jpg';

export default {
	title: 'widgets/ArticleAdditionalInfo',
	component: ArticleAdditionalInfo,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleAdditionalInfo>;

const Template: ComponentStory<typeof ArticleAdditionalInfo> = (args) => (
	<ArticleAdditionalInfo {...args} />
);

const additionalInfo = {
	author: {
		id: '1',
		username: 'admin',
		avatar: AvatarImg,
	},
	createdAt: '22.02.2022',
	views: 100,
	id: '1',
};

export const Normal = Template.bind({});
Normal.args = additionalInfo;