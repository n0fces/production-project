import { useTranslation } from 'react-i18next';
import { User } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import styles from './Navbar.module.scss';

interface NavbarDeprecatedProps {
	isAuthModal: boolean;
	authData: User | undefined;
	className?: string;
	onShowModal: () => void;
	onCloseModal: () => void;
}

export const NavbarDeprecated = ({
	authData,
	isAuthModal,
	onCloseModal,
	onShowModal,
	className,
}: NavbarDeprecatedProps) => {
	const { t } = useTranslation();
	return authData ? (
		<header className={classNames(styles.Navbar, {}, [className])}>
			<Text
				className={styles.appName}
				title={t('Приложение статей')}
				theme={TextTheme.INVERTED}
			/>
			<AppLink
				to={getRouteArticleCreate()}
				theme={AppLinkTheme.SECONDARY}
				className={styles.createBtn}
			>
				{t('Создать статью')}
			</AppLink>
			<HStack gap="16" className={styles.actions}>
				<NotificationButton />
				<AvatarDropdown />
			</HStack>
		</header>
	) : (
		<header className={classNames(styles.Navbar, {}, [className])}>
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
	);
};
