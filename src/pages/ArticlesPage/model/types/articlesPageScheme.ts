import { EntityState } from '@reduxjs/toolkit';

import {
	Article,
	ArticleSortField,
	ArticleType,
	ArticleView,
} from '@/entities/Article';

import { SortOrder } from '@/shared/types/sort';

export interface ArticlesPageScheme extends EntityState<Article> {
	isLoading?: boolean;
	error?: string;
	// pagination
	page: number;
	limit: number;
	hasMore: boolean;
	// filters
	view: ArticleView;
	order: SortOrder;
	sort: ArticleSortField;
	search: string;
	type: ArticleType;

	// инициализировался ли стейт или нет
	_inited: boolean;
}
