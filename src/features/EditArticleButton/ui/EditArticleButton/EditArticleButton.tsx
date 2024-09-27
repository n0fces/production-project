import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getRouteArticleEdit } from '@/shared/const/router';
import { Button } from '@/shared/ui/Button';

interface EditArticleButtonProps {
	className?: string;
	id: string;
}

export const EditArticleButton = memo(
	({ className, id }: EditArticleButtonProps) => {
		const { t } = useTranslation('article-details');
		const navigate = useNavigate();

		const onEditArticle = useCallback(() => {
			navigate(getRouteArticleEdit(id));
		}, [id, navigate]);

		return (
			<Button className={className} onClick={onEditArticle}>
				{t('Редактировать')}
			</Button>
		);
	},
);
