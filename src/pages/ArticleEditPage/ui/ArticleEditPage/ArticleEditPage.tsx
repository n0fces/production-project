import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';

interface ArticleEditPageProps {
	className?: string;
}

// у нас страница создания и редактирования практически не будет отличаться, поэтому здесь делаем проверку, есть ли у нас в строке поиска id.
// если он есть, то это страница редактирования
const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
	const { id } = useParams<{ id: string }>();
	const isEdit = Boolean(id);

	// логику по редактированию и созданию статей нужно будет сделать самим по окончании курса. сейчас нет смысла, потому что на данный момент по ходу курса мы сделали ряд архитектурных ошибок, которые далее будем исправлять

	return (
		<Page className={classNames('', {}, [className])}>
			{isEdit
				? `Редактирование статьи с ID = ${id}`
				: 'Создание новой статьи'}
		</Page>
	);
};

export default ArticleEditPage;
