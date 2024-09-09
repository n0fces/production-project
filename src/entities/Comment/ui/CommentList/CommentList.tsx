import { useTranslation } from 'react-i18next';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

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
			<VStack gap="16" max className={className}>
				<CommentCard isLoading />
				<CommentCard isLoading />
				<CommentCard isLoading />
			</VStack>
		);
	}
	return (
		<VStack gap="16" max className={className}>
			{comments?.length ? (
				comments.map((comment) => (
					<CommentCard
						key={comment.id}
						isLoading={isLoading}
						comment={comment}
					/>
				))
			) : (
				<ToggleFeatures
					feature="isAppRedesigned"
					on={<Text text={t('Комментарии отсутствуют')} />}
					off={<TextDeprecated text={t('Комментарии отсутствуют')} />}
				/>
			)}
		</VStack>
	);
};
