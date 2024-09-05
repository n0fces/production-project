import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { useGetNotificationsQuery } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import styles from './NotificationList.module.scss';

interface NotificationListProps {
	className?: string;
}

export const NotificationList = ({ className }: NotificationListProps) => {
	const { data: notifications, isLoading } = useGetNotificationsQuery(null, {
		// если мы держим открытыми уведомления в течение 10 секунд, то у нас будет отправляться повторный запрос
		// за получением новых данных
		pollingInterval: 10000,
	});
	if (isLoading) {
		return (
			<VStack
				gap="16"
				max
				className={classNames(styles.NotificationList, {}, [className])}
			>
				<Skeleton width="100%" border="8px" height="80px" />
				<Skeleton width="100%" border="8px" height="80px" />
				<Skeleton width="100%" border="8px" height="80px" />
			</VStack>
		);
	}
	return (
		<VStack
			gap="16"
			max
			className={classNames(styles.NotificationList, {}, [className])}
		>
			{notifications?.map((item) => (
				<NotificationItem key={item.id} item={item} />
			))}
		</VStack>
	);
};
