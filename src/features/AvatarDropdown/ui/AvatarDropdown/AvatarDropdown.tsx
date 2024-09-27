import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	getUserAuthData,
	isUserAdmin,
	isUserManager,
	userActions,
} from '@/entities/User';

import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
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
	const isAdminPanelAvailable = isAdmin || isManager;

	if (!authData) {
		return null;
	}

	const items = [
		...(isAdminPanelAvailable
			? [
					{
						content: t('Админ панель'),
						href: getRouteAdmin(),
					},
				]
			: []),
		{
			content: t('Профиль'),
			href: getRouteProfile(authData.id),
		},
		{
			content: t('Выйти'),
			onClick: onLogout,
		},
	];

	return (
		<Dropdown
			className={classNames('', {}, [className])}
			trigger={<Avatar size={40} src={authData.avatar} />}
			items={items}
		/>
	);
};
