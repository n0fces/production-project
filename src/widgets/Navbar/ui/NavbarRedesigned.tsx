import { useTranslation } from 'react-i18next';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NavbarComponentProps } from './Navbar';
import styles from './Navbar.module.scss';

export const NavbarRedesigned = ({
	authData,
	isAuthModal,
	onCloseModal,
	onShowModal,
	className,
}: NavbarComponentProps) => {
	const { t } = useTranslation();
	return authData ? (
		<header className={classNames(styles.NavbarRedesigned, {}, [className])}>
			<HStack gap="16" className={styles.actions}>
				<NotificationButton />
				<AvatarDropdown />
			</HStack>
		</header>
	) : (
		<header className={classNames(styles.NavbarRedesigned, {}, [className])}>
			<Button variant="clear" className={styles.links} onClick={onShowModal}>
				{t('Войти')}
			</Button>
			{isAuthModal && (
				<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
			)}
		</header>
	);
};
