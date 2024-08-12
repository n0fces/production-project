import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { VStack } from 'shared/ui/Stack';
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
				gap='8'
				max
				className={classNames(styles.CommentCard, {}, [
					className,
					styles.loading,
				])}
			>
				<div className={styles.header}>
					<Skeleton width={30} height={30} border='50%' />
					<Skeleton
						height={16}
						width={100}
						className={styles.username}
					/>
				</div>
				<Skeleton className={styles.text} height={50} width='100%' />
			</VStack>
		);
	}

	if (!comment) return null;

	return (
		<VStack
			gap='8'
			max
			className={classNames(styles.CommentCard, {}, [className])}
		>
			<AppLink
				to={`${RoutePath.profile}${comment.user.id}`}
				className={styles.header}
			>
				{comment.user.avatar && (
					<Avatar size={30} src={comment.user.avatar} />
				)}
				<Text
					className={styles.username}
					title={comment.user.username}
				/>
			</AppLink>
			<Text className={styles.text} text={comment.text} />
		</VStack>
	);
};
