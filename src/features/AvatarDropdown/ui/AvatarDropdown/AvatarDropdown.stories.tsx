import { ComponentMeta, ComponentStory } from '@storybook/react';

import { UserRole } from '@/entities/User';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { AvatarDropdown } from './AvatarDropdown';

export default {
	title: 'features/AvatarDropdown',
	component: AvatarDropdown,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
	<AvatarDropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
	StoreDecorator({
		user: {
			authData: {
				id: '1',
				username: 'admin',
				roles: [UserRole.ADMIN],
				avatar:
					'https://image.spreadshirtmedia.net/image-server/v1/compositions/T6A1PA5835PT17X67Y83D175825012W17698H15087/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/wednesday-frog-mens-t-shirt.jpg',
			},
		},
	}),
];
