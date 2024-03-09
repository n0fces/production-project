import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

// этому компоненту мы прокидываем пропсы. чтобы тс их подсказывал, нам нужно указать дженерик
export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(
	() =>
		new Promise((resolve) => {
			// @ts-ignore
			// ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
			setTimeout(() => resolve(import('./AddCommentForm')), 1500);
		})
);
