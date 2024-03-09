import { EntityState } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

// В отличие от сущности Article, которая является очень специфичной и самостоятельной для приложения, для комментариев мы будем запрашивать и хранить данные на уровне ArticleDetailsPage, потому что сущность комментариев может быть использована много где. Мы хотим извне задавать значения для комментариев, тем самым сделаем данную сущность удобной для использования в других местах

// здесь мы берем EntityState, который сразу задает нам нужный тип для нормализованной части стейта, а дальше мы расширяем это нашими нужными полями
export interface ArticleDetailsCommentScheme extends EntityState<Comment> {
	isLoading?: boolean;
	error?: string;
}
