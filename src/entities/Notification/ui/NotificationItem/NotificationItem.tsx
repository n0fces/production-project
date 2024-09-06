import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Notifications } from '../../model/types/notifications';
import styles from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
	className?: string;
	item: Notifications;
}

export const NotificationItem = ({
	className,
	item,
}: NotificationItemProps) => {
	const content = (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<Card
					variant="outlined"
					className={classNames(styles.NotificationItem, {}, [className])}
				>
					<Text title={item.title} text={item.description} />
				</Card>
			}
			off={
				<CardDeprecated
					theme={CardTheme.OUTLINED}
					className={classNames(styles.NotificationItem, {}, [className])}
				>
					<TextDeprecated title={item.title} text={item.description} />
				</CardDeprecated>
			}
		/>
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
