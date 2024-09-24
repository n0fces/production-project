import { memo } from 'react';
import { useParams } from 'react-router-dom';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageRedesigned } from './ArticleDetailsPageRedesigned/ArticleDetailsPageRedesigned';

export interface ArticleDetailsPageProps {
	className?: string;
}

// комбинируем для одной страницы сразу два редьюсера
const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { id } = useParams<{ id: string }>();

	// данная тулкитовая абстрация позволяет нам даже не писать свои собственные селекторы во многих случаях, так как базовые и наиболее часто используемые кейсы уже имплементированы

	// вообще в нашей ситуации не может быть такого, что нет id
	if (!id) {
		return null;
	}

	return (
		// Здесь DynamicModuleLoader нужен для работы с асинхронным экшеном под комментарии конкретной статьи (articleDetailsCommentsReducer)
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<ArticleDetailsPageRedesigned className={className} id={id} />
		</DynamicModuleLoader>
	);
};

// * опять же вообще не уверен, что здесь целесообразно применять memo. Ну вот навряд ли у нас будут изменяться пропсы, но мы все равно зачем-то запоминаем
export default memo(ArticleDetailsPage);
