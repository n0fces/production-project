import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Drawer } from '@/shared/ui/Drawer';
import styles from './NotificationButton.module.scss';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popups';

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

	const trigger = <Icon Svg={NotificationIcon} onClick={onOpenDrawer} />;

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
