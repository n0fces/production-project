import { ArticleDetails } from 'entities/Article';
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import { VStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page/Page';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
	className?: string;
}

// комбинируем для одной страницы сразу два редьюсера
const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>();
	// данная тулкитовая абстрация позволяет нам даже не писать свои собственные селекторы во многих случаях, так как базовые и наиболее часто используемые кейсы уже имплементированы

	if (!id) {
		return (
			<Page
				className={classNames(styles.ArticleDetailsPage, {}, [
					className,
				])}
			>
				{t('Статья не найдена')}
			</Page>
		);
	}

	return (
		// Здесь DynamicModuleLoader нужен для работы с асинхронным экшеном под комментарии конкретной статьи (articleDetailsCommentsReducer)
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page
				className={classNames(styles.ArticleDetailsPage, {}, [
					className,
				])}
			>
				<VStack gap='16' max>
					<ArticleDetailsPageHeader />
					<ArticleDetails id={id} />
					<ArticleRecommendationsList />
					<ArticleDetailsComments id={id} />
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};

// * опять же вообще не уверен, что здесь целесообразно применять memo. Ну вот навряд ли у нас будут изменяться пропсы, но мы все равно зачем-то запоминаем
export default memo(ArticleDetailsPage);
