import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getArticleDetailsData } from '@/entities/Article';

import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
	className?: string;
}

export const ArticleDetailsPageHeader = ({
	className,
}: ArticleDetailsPageHeaderProps) => {
	const { t } = useTranslation('article-details');
	const navigate = useNavigate();
	const canEdit = useSelector(getCanEditArticle);
	const article = useSelector(getArticleDetailsData);

	const onBackToList = useCallback(() => {
		navigate(getRouteArticles());
	}, [navigate]);

	const onEditArticle = useCallback(() => {
		if (article) {
			navigate(getRouteArticleEdit(article.id));
		}
	}, [article, navigate]);

	return (
		<HStack max justify="between" className={className}>
			<Button onClick={onBackToList}>{t('Назад к списку')}</Button>
			{canEdit && <Button onClick={onEditArticle}>{t('Редактировать')}</Button>}
		</HStack>
	);
};
