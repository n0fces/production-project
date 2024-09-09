import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import styles from './NotificationButton.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

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
		<ToggleFeatures
			feature="isAppRedesigned"
			on={<Icon Svg={NotificationIcon} onClick={onOpenDrawer} />}
			off={
				<ButtonDeprecated onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
					<IconDeprecated Svg={NotificationIconDeprecated} inverted />
				</ButtonDeprecated>
			}
		/>
	);

	return (
		<div>
			<BrowserView>
				<ToggleFeatures
					feature="isAppRedesigned"
					on={
						<Popover
							className={classNames(styles.NotificationButton, {}, [className])}
							trigger={trigger}
						>
							<NotificationList className={styles.notifications} />
						</Popover>
					}
					off={
						<PopoverDeprecated
							className={classNames(styles.NotificationButton, {}, [className])}
							trigger={trigger}
						>
							<NotificationList className={styles.notifications} />
						</PopoverDeprecated>
					}
				/>
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
