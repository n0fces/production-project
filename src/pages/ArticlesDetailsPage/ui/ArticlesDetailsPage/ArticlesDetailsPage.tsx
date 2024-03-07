import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';

interface ArticlesDetailsPageProps {
	className?: string;
}

const ArticlesDetailsPage = ({ className }: ArticlesDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return (
			<div className={classNames('', {}, [className])}>
				{t('Статья не найдена')}
			</div>
		);
	}

	return (
		<div className={classNames('', {}, [className])}>
			<ArticleDetails id={id} />
		</div>
	);
};

// * опять же вообще не уверен, что здесь целесообразно применять memo. Ну вот навряд ли у нас будут изменяться пропсы, но мы все равно зачем-то запоминаем
export default memo(ArticlesDetailsPage);
