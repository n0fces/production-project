import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

// этому компоненту мы прокидываем пропсы. чтобы тс их подсказывал, нам нужно указать дженерик
export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(
	() => import('./AddCommentForm')
);
