import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import styles from './Navbar.module.scss';
import { NavbarDeprecated } from './NavbarDeprecated';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const [isAuthModal, setIsAuthModal] = useState(false);
	const authData = useSelector(getUserAuthData);

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			off={
				<NavbarDeprecated
					authData={authData}
					isAuthModal={isAuthModal}
					onCloseModal={onCloseModal}
					onShowModal={onShowModal}
					className={className}
				/>
			}
			on={
				authData ? (
					<header
						className={classNames(styles.NavbarRedesigned, {}, [className])}
					>
						<HStack gap="16" className={styles.actions}>
							<NotificationButton />
							<AvatarDropdown />
						</HStack>
					</header>
				) : (
					<header
						className={classNames(styles.NavbarRedesigned, {}, [className])}
					>
						<Button
							theme={ButtonTheme.CLEAR_INVERTED}
							className={styles.links}
							onClick={onShowModal}
						>
							{t('Войти')}
						</Button>
						{isAuthModal && (
							<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
						)}
					</header>
				)
			}
		/>
	);
});
