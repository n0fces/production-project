import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticleEditPage } from 'pages/ArticleEditPage';

// расширяем пропсы, которые предоставляет нам сама библиотека
export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
};

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	ARTICLES = 'articles',
	ARTICLES_DETAILS = 'articles_details',
	ARTICLE_CREATE = 'article_create',
	ARTICLE_EDIT = 'article_edit',
	// last
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.ABOUT]: '/about',
	[AppRoutes.PROFILE]: '/profile/', // + id
	[AppRoutes.ARTICLES]: '/articles',
	[AppRoutes.ARTICLES_DETAILS]: '/articles/', // + id
	[AppRoutes.ARTICLE_CREATE]: '/articles/new',
	[AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit', // + id
	// последний
	[AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.ABOUT]: {
		path: RoutePath.about,
		element: <AboutPage />,
	},
	[AppRoutes.PROFILE]: {
		path: `${RoutePath.profile}:id`,
		element: <ProfilePage />,
		// если данное поле равно true, то данный маршрут будет доступен только авторизованным пользователям
		authOnly: true,
	},
	[AppRoutes.ARTICLES]: {
		path: RoutePath.articles,
		element: <ArticlesPage />,
		// доступ к статьям сделаем только для авторизованных пользователей
		authOnly: true,
	},
	[AppRoutes.ARTICLES_DETAILS]: {
		// здесь задаем переменную для id, которая показывает, что данный путь является динамическим
		path: `${RoutePath.articles_details}:id`,
		element: <ArticleDetailsPage />,
		// доступ к статьям сделаем только для авторизованных пользователей
		authOnly: true,
	},
	[AppRoutes.ARTICLE_CREATE]: {
		path: `${RoutePath.article_create}`,
		element: <ArticleEditPage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLE_EDIT]: {
		path: `${RoutePath.article_edit}`,
		element: <ArticleEditPage />,
		authOnly: true,
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
