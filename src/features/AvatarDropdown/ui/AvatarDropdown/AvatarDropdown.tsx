import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUserAuthData,
	isUserAdmin,
	isUserManager,
	userActions,
} from '@/entities/User';
import { RoutePath } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Dropdown } from '@/shared/ui/Popups';

interface AvatarDropdownProps {
	className?: string;
}

export const AvatarDropdown = ({ className }: AvatarDropdownProps) => {
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);
	// вот зачем нам Dropdown в shared слое я просто не понимаю
	// мы сделали popover, который по сути полностью имплементирует нужный ui для этого компонента
	// мы бы могли здесь в feature использовать этот shared компонент, а здесь уже дополнить необходимую функциональность
	// этого дропдауна аватарки. Нам не нужен Dropdown компонент в shared, потому что он слишком с натягом там
	// все дополнения относительно popover мы как раз можем сделать здесь, на уровне фичи
	const dispatch = useDispatch();
	const isAdmin = useSelector(isUserAdmin);
	const isManager = useSelector(isUserManager);
	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);
	// для обычных пользователей мы не должны давать возможность перейти в админ панель
	const isAdminPagenAvailable = isAdmin || isManager;

	if (!authData) {
		return null;
	}

	return (
		<Dropdown
			className={classNames('', {}, [className])}
			trigger={<Avatar size={30} src={authData.avatar} />}
			items={[
				...(isAdminPagenAvailable
					? [
						{
							content: t('Админ панель'),
							href: RoutePath.admin_panel,
							ItemType: AppLink,
						},
					  ]
					: []),

				{
					content: t('Профиль'),
					href: RoutePath.profile + authData.id,
					ItemType: AppLink,
				},
				{
					content: t('Выйти'),
					onClick: onLogout,
					ItemType: 'button',
				},
			]}
		/>
	);
};
