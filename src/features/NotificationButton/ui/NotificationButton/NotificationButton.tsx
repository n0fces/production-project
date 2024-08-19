import { NotificationList } from 'entities/Notification';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';
import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
	className?: string;
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
	// * Я реально не понимаю Тимура по части fsd) Можно было бы сделать Notification реально сущностью
	// * без логики запроса, а делать ее на уровне feature
	// * Надо сюда перенести логику запроса за данными, а в NotificationList просто пробрасывать нужные данные
	return (
		<Popover
			className={classNames(styles.NotificationButton, {}, [className])}
			trigger={(
				<Button theme={ButtonTheme.CLEAR}>
					<Icon Svg={NotificationIcon} inverted />
				</Button>
			)}
		>
			<NotificationList className={styles.notifications} />
		</Popover>
	);
};
