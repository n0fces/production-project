import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import AboutIcon from '@/shared/assets/icons/Info.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import {
	getRouteAbout,
	getRouteArticles,
	getRouteMain,
	getRouteProfile,
} from '@/shared/const/router';

import { SidebarItemType } from '../types/sidebar';

export const useSidebarItems = () => {
	const userData = useSelector(getUserAuthData);
	const sidebarItemsList: SidebarItemType[] = [
		{
			path: getRouteMain(),
			Icon: MainIcon,
			text: 'Главная',
		},
		{
			path: getRouteAbout(),
			Icon: AboutIcon,
			text: 'О сайте',
		},
	];

	if (userData) {
		sidebarItemsList.push(
			{
				path: getRouteProfile(userData.id),
				Icon: ProfileIcon,
				text: 'Профиль',
				authOnly: true,
			},
			{
				path: getRouteArticles(),
				Icon: ArticleIcon,
				text: 'Статьи',
				authOnly: true,
			},
		);
	}

	return sidebarItemsList;
};
