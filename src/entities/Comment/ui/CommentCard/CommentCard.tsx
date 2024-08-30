import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { VStack } from '@/shared/ui/Stack';
import styles from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

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
		<VStack
			data-testid="CommentCard.Content"
			gap="8"
			max
			className={classNames(styles.CommentCard, {}, [className])}
		>
			<AppLink to={getRouteProfile(comment.user.id)} className={styles.header}>
				{comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
				<Text className={styles.username} title={comment.user.username} />
			</AppLink>
			<Text className={styles.text} text={comment.text} />
		</VStack>
	);
};
