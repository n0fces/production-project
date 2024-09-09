import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import styles from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Text } from '@/shared/ui/redesigned/Text';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

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
	const Skeleton = toggleFeatures({
		name: 'isAppRedesigned',
		on: () => SkeletonRedesigned,
		off: () => SkeletonDeprecated,
	});

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
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<Card padding="24" border="round" max>
					<VStack
						data-testid="CommentCard.Content"
						gap="8"
						max
						className={classNames(styles.CommentCardRedesigned, {}, [
							className,
						])}
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
			}
			off={
				<VStack
					data-testid="CommentCard.Content"
					gap="8"
					max
					className={classNames(styles.CommentCard, {}, [className])}
				>
					<AppLinkDeprecated
						to={getRouteProfile(comment.user.id)}
						className={styles.header}
					>
						{comment.user.avatar ? (
							<AvatarDeprecated size={30} src={comment.user.avatar} />
						) : null}
						<TextDeprecated
							className={styles.username}
							title={comment.user.username}
						/>
					</AppLinkDeprecated>
					<TextDeprecated className={styles.text} text={comment.text} />
				</VStack>
			}
		/>
	);
};
