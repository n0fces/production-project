import { createSelector } from '@reduxjs/toolkit';
import { RoutePath } from '@/shared/const/router';
import AboutIcon from '@/shared/assets/icons/about.svg';
import MainIcon from '@/shared/assets/icons/main.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
	const sidebarItemsList: SidebarItemType[] = [
		{
			path: RoutePath.main,
			Icon: MainIcon,
			text: 'Главная',
		},
		{
			path: RoutePath.about,
			Icon: AboutIcon,
			text: 'О сайте',
		},
	];

	// делаем эти два маршрута доступными только для авторизованных пользователей
	if (userData) {
		sidebarItemsList.push(
			{
				path: RoutePath.profile + userData.id,
				Icon: ProfileIcon,
				text: 'Профиль',
				authOnly: true,
			},
			{
				path: RoutePath.articles,
				Icon: ArticleIcon,
				text: 'Статьи',
				authOnly: true,
			}
		);
	}

	return sidebarItemsList;
});
