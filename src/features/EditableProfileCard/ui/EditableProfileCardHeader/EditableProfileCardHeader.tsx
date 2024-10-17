import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { EditableProfileCardHeaderRedesigned } from './EditableProfileCardHeaderRedesigned';

export interface EditableProfileCardHeaderComponent {
	className?: string;
	canEdit: boolean;
	readonly: boolean | undefined;
	onCancelEdit: () => void;
	onSave: () => void;
	onEdit: () => void;
}

interface EditableProfileCardHeaderProps {
	className?: string;
}

export const EditableProfileCardHeader = ({
	className,
}: EditableProfileCardHeaderProps) => {
	const authData = useSelector(getUserAuthData);
	const profileData = useSelector(getProfileData);
	// здесь мы смотрим, совпадает ли авторизованный пользователь со профилем пользователя, который сейчас открыт. Если да, то мы делаем доступным функционал редактирования
	const canEdit = authData?.id === profileData?.id;
	const readonly = useSelector(getProfileReadonly);
	const dispatch = useAppDispatch();

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly(false));
	}, [dispatch]);

	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit());
	}, [dispatch]);

	const onSave = useCallback(() => {
		void dispatch(updateProfileData());
	}, [dispatch]);

	const props = {
		className,
		canEdit,
		readonly,
		onEdit,
		onCancelEdit,
		onSave,
	};

	return <EditableProfileCardHeaderRedesigned {...props} />;
};
