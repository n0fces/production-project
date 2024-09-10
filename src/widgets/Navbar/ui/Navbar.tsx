import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { User, getUserAuthData } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { NavbarDeprecated } from './NavbarDeprecated';
import { NavbarRedesigned } from './NavbarRedesigned';

export interface NavbarComponentProps {
	isAuthModal: boolean;
	authData: User | undefined;
	className?: string;
	onShowModal: () => void;
	onCloseModal: () => void;
}

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
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
				<NavbarRedesigned
					authData={authData}
					isAuthModal={isAuthModal}
					onCloseModal={onCloseModal}
					onShowModal={onShowModal}
					className={className}
				/>
			}
		/>
	);
});
