import { ComponentStory, ComponentMeta } from '@storybook/react';
import avatar from 'shared/assets/tests/storybook.jpg';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from './ProfileCard';

export default {
	title: 'features/ProfileCard',
	component: ProfileCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
	<ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	data: {
		first: 'Ilya',
		lastname: 'Abzalov',
		age: 21,
		currency: Currency.RUB,
		country: Country.Russia,
		city: 'Saint-Petersburg',
		username: 'admin',
		avatar,
	},
};

export const withError = Template.bind({});
withError.args = {
	error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
	isLoading: true,
};
