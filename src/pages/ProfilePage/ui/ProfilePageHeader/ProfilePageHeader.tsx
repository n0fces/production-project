import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import {
	getProfileReadonly,
	profileActions,
	updateProfileData,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import styles from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
	className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
	const { t } = useTranslation('profile');
	const readonly = useSelector(getProfileReadonly);
	const dispatch = useAppDispatch();

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly(false));
	}, [dispatch]);

	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit());
	}, [dispatch]);

	const onSave = useCallback(() => {
		dispatch(updateProfileData());
	}, [dispatch]);

	return (
		<div className={classNames(styles.ProfilePageHeader, {}, [className])}>
			<Text title={t('Профиль')} />
			{readonly ? (
				<Button
					theme={ButtonTheme.OUTLINE}
					className={styles.editBtn}
					onClick={onEdit}
				>
					{t('Редактировать')}
				</Button>
			) : (
				<>
					<Button
						theme={ButtonTheme.OUTLINE_RED}
						className={styles.editBtn}
						onClick={onCancelEdit}
					>
						{t('Отменить')}
					</Button>
					<Button
						theme={ButtonTheme.OUTLINE}
						className={styles.saveBtn}
						onClick={onSave}
					>
						{t('Сохранить')}
					</Button>
				</>
			)}
		</div>
	);
};
