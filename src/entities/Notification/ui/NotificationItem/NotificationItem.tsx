import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/deprecated/Text';
import { Notifications } from '../../model/types/notifications';
import styles from './NotificationItem.module.scss';

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
			theme={CardTheme.OUTLINED}
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
