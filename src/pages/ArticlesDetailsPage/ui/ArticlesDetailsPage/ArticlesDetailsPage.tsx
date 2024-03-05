import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './ArticlesDetailsPage.module.scss';

interface ArticlesDetailsPageProps {
	className?: string;
}

const ArticlesDetailsPage = ({ className }: ArticlesDetailsPageProps) => {
	const { t } = useTranslation('article');
	return (
		<div
			className={classNames(styles.ArticlesDetailsPage, {}, [className])}
		>
			ARTICLE DETAILS
		</div>
	);
};

// * опять же вообще не уверен, что здесь целесообразно применять memo. Ну вот навряд ли у нас будут изменяться пропсы, но мы все равно зачем-то запоминаем
export default memo(ArticlesDetailsPage);
