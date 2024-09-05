import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Popover } from '@/shared/ui/deprecated/Popups';
import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
	className?: string;
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
	// * Я реально не понимаю Тимура по части fsd) Можно было бы сделать Notification реально сущностью
	// * без логики запроса, а делать ее на уровне feature
	// * Надо сюда перенести логику запроса за данными, а в NotificationList просто пробрасывать нужные данные

	const [isOpen, setIsOpen] = useState(false);

	const onOpenDrawer = useCallback(() => setIsOpen(true), []);
	const onCloseDrawer = useCallback(() => setIsOpen(false), []);

	const trigger = (
		<Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
			<Icon Svg={NotificationIcon} inverted />
		</Button>
	);

	return (
		<div>
			<BrowserView>
				<Popover
					className={classNames(styles.NotificationButton, {}, [className])}
					trigger={trigger}
				>
					<NotificationList className={styles.notifications} />
				</Popover>
			</BrowserView>
			<MobileView>
				{trigger}
				<Drawer isOpen={isOpen} onClose={onCloseDrawer}>
					<NotificationList />
				</Drawer>
			</MobileView>
		</div>
	);
};
