import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUserAuthData,
	isUserAdmin,
	isUserManager,
	userActions,
} from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const [isAuthModal, setIsAuthModal] = useState(false);
	const authData = useSelector(getUserAuthData);
	const dispatch = useDispatch();
	const isAdmin = useSelector(isUserAdmin);
	const isManager = useSelector(isUserManager);

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	// для обычных пользователей мы не должны давать возможность перейти в админ панель
	const isAdminPagenAvailable = isAdmin || isManager;

	if (authData) {
		return (
			<header className={classNames(cls.Navbar, {}, [className])}>
				<Text
					className={cls.appName}
					title={t('Приложение статей')}
					theme={TextTheme.INVERTED}
				/>
				<AppLink
					to={RoutePath.article_create}
					theme={AppLinkTheme.SECONDARY}
					className={cls.createBtn}
				>
					{t('Создать статью')}
				</AppLink>
				<Dropdown
					className={cls.dropdown}
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
			</header>
		);
	}

	return (
		<header className={classNames(cls.Navbar, {}, [className])}>
			<Button
				theme={ButtonTheme.CLEAR_INVERTED}
				className={cls.links}
				onClick={onShowModal}
			>
				{t('Войти')}
			</Button>
			{isAuthModal && (
				<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
			)}
		</header>
	);
});
