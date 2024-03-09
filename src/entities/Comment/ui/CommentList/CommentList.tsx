import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import styles from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
}

export const CommentList = ({
	className,
	comments,
	isLoading,
}: CommentListProps) => {
	const { t } = useTranslation('');
	return (
		<div className={classNames(styles.CommentList, {}, [className])}>
			{comments?.length ? (
				comments.map((comment) => (
					<CommentCard
						key={comment.id}
						isLoading={isLoading}
						className={styles.comment}
						comment={comment}
					/>
				))
			) : (
				<Text text={t('Комментарии отсутствуют')} />
			)}
		</div>
	);
};
