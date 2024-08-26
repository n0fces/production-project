import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
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
	if (isLoading) {
		return (
			<VStack gap='16' max className={className}>
				<CommentCard isLoading />
				<CommentCard isLoading />
				<CommentCard isLoading />
			</VStack>
		);
	}
	return (
		<VStack gap='16' max className={className}>
			{comments?.length ? (
				comments.map((comment) => (
					<CommentCard
						key={comment.id}
						isLoading={isLoading}
						comment={comment}
					/>
				))
			) : (
				<Text text={t('Комментарии отсутствуют')} />
			)}
		</VStack>
	);
};
