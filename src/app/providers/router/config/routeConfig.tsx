import { UserRole } from '@/entities/User';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
import {
	AppRoutes,
	getRouteAbout,
	getRouteAdmin,
	getRouteArticleCreate,
	getRouteArticleEdit,
	getRouteArticles,
	getRouteArticleDetails,
	getRouteForbidden,
	getRouteMain,
	getRouteProfile,
	getRouteSettings,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <MainPage />,
	},
	[AppRoutes.SETTINGS]: {
		path: getRouteSettings(),
		element: <SettingsPage />,
	},
	[AppRoutes.ABOUT]: {
		path: getRouteAbout(),
		element: <AboutPage />,
	},
	[AppRoutes.PROFILE]: {
		path: getRouteProfile(':id'),
		element: <ProfilePage />,
		// если данное поле равно true, то данный маршрут будет доступен только авторизованным пользователям
		authOnly: true,
	},
	[AppRoutes.ARTICLES]: {
		path: getRouteArticles(),
		element: <ArticlesPage />,
		// доступ к статьям сделаем только для авторизованных пользователей
		authOnly: true,
	},
	[AppRoutes.ARTICLE_DETAILS]: {
		// здесь задаем переменную для id, которая показывает, что данный путь является динамическим
		path: getRouteArticleDetails(':id'),
		element: <ArticleDetailsPage />,
		// доступ к статьям сделаем только для авторизованных пользователей
		authOnly: true,
	},
	[AppRoutes.ARTICLE_CREATE]: {
		path: getRouteArticleCreate(),
		element: <ArticleEditPage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLE_EDIT]: {
		path: getRouteArticleEdit(':id'),
		element: <ArticleEditPage />,
		authOnly: true,
	},
	[AppRoutes.ADMIN_PANEL]: {
		path: getRouteAdmin(),
		element: <AdminPanelPage />,
		authOnly: true,
		// Указываем роли, для которых данная страница будет доступна
		roles: [UserRole.ADMIN, UserRole.MANAGER],
	},
	[AppRoutes.FORBIDDEN]: {
		path: getRouteForbidden(),
		element: <ForbiddenPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: '*',
		element: <NotFoundPage />,
	},
};
