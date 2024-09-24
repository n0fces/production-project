import { classNames } from '@/shared/lib/classNames/classNames';
import { Notifications } from '../../model/types/notifications';
import styles from './NotificationItem.module.scss';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

interface NotificationItemProps {
	className?: string;
	item: Notifications;
}

export const NotificationItem = ({
	className,
	item,
}: NotificationItemProps) => {
	const content = (
		<Card
			variant="outlined"
			className={classNames(styles.NotificationItem, {}, [className])}
		>
			<Text title={item.title} text={item.description} />
		</Card>
	);

	return item.href ? (
		<a
			href={item.href}
			target="_blank"
			rel="noreferrer"
			className={styles.link}
		>
			{content}
		</a>
	) : (
		content
	);
};
