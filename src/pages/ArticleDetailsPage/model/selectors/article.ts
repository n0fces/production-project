import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

export const getCanEditArticle = createSelector(
	getArticleDetailsData,
	getUserAuthData,
	(article, user) => {
		if (!article || !user) return false;
		// сравниваем id пользователя, кто написал статью, и id пользователя, который ее просматриваета
		// если совпадают, значит этот пользователь может редактировать данную статью
		return article.user.id === user.id;
	}
);
