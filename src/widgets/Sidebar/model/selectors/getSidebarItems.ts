import { createSelector } from '@reduxjs/toolkit';
import {
	getRouteAbout,
	getRouteArticles,
	getRouteMain,
	getRouteProfile,
} from '@/shared/const/router';
import AboutIcon from '@/shared/assets/icons/about.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
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

	// делаем эти два маршрута доступными только для авторизованных пользователей
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
});
