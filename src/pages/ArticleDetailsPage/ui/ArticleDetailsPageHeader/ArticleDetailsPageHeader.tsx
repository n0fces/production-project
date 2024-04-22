import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from '../../model/selectors/article';
import styles from './ArticleDetailsPageHeader.module.scss';

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
		navigate(RoutePath.articles);
	}, [navigate]);

	const onEditArticle = useCallback(() => {
		navigate(`${RoutePath.articles}/${article?.id}/edit`);
	}, [article?.id, navigate]);

	return (
		<div
			className={classNames(styles.ArticleDetailsPageHeader, {}, [
				className,
			])}
		>
			<Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
				{t('Назад к списку')}
			</Button>
			{canEdit && (
				<Button
					theme={ButtonTheme.OUTLINE}
					onClick={onEditArticle}
					className={styles.editBtn}
				>
					{t('Редактировать')}
				</Button>
			)}
		</div>
	);
};
