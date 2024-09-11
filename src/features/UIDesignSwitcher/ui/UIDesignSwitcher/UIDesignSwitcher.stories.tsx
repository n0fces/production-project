import { ComponentMeta, ComponentStory } from '@storybook/react';

import { UIDesignSwitcher } from './UIDesignSwitcher';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
	title: 'features/UIDesignSwitcher',
	component: UIDesignSwitcher,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof UIDesignSwitcher>;

const Template: ComponentStory<typeof UIDesignSwitcher> = (args) => (
	<UIDesignSwitcher {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
