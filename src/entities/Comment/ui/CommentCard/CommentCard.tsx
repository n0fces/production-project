import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/Skeleton';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/Stack';
import styles from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { Card } from '@/shared/ui/Card';
import { AppLink } from '@/shared/ui/AppLink';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';

interface CommentCardProps {
	className?: string;
	comment?: Comment;
	isLoading?: boolean;
}

export const CommentCard = ({
	className,
	comment,
	isLoading,
}: CommentCardProps) => {
	const Skeleton = SkeletonRedesigned;

	if (isLoading) {
		return (
			<VStack
				data-testid="CommentCard.Loading"
				gap="8"
				max
				className={classNames(styles.CommentCard, {}, [
					className,
					styles.loading,
				])}
			>
				<div className={styles.header}>
					<Skeleton width={30} height={30} border="50%" />
					<Skeleton height={16} width={100} className={styles.username} />
				</div>
				<Skeleton className={styles.text} height={50} width="100%" />
			</VStack>
		);
	}

	if (!comment) return null;

	return (
		<Card padding="24" border="normal" max>
			<VStack
				data-testid="CommentCard.Content"
				gap="8"
				max
				className={classNames(styles.CommentCardRedesigned, {}, [className])}
			>
				<AppLink to={getRouteProfile(comment.user.id)}>
					<HStack gap="8">
						{comment.user.avatar ? (
							<Avatar size={30} src={comment.user.avatar} />
						) : null}
						<Text text={comment.user.username} bold />
					</HStack>
				</AppLink>
				<Text text={comment.text} />
			</VStack>
		</Card>
	);
};
