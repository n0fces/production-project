import { useSelector } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UIDesignSwitcherProps {
	className?: string;
}

export const UIDesignSwitcher = memo(({ className }: UIDesignSwitcherProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation('settings-page');
	const dispatch = useAppDispatch();
	const authData = useSelector(getUserAuthData);

	const isAppRedesigned = getFeatureFlag('isAppRedesigned');

	const items = [
		{
			content: t('Новый'),
			value: 'new',
		},
		{
			content: t('Старый'),
			value: 'old',
		},
	];

	const onChange = useCallback(
		async (value: string) => {
			if (authData) {
				setIsLoading(true);
				await dispatch(
					updateFeatureFlag({
						userId: authData?.id,
						newFeatures: {
							isAppRedesigned: value === 'new',
						},
					}),
				).unwrap();
				setIsLoading(false);
			}
		},
		[authData, dispatch],
	);

	// ! потом надо добавить в ui библиотекуу компонент тоглера
	return (
		<HStack>
			<Text text={t('Вариант интерфейса')} />
			{isLoading ? (
				<Skeleton width={100} height={40} />
			) : (
				<ListBox
					items={items}
					onChange={onChange}
					value={isAppRedesigned ? 'new' : 'old'}
					className={className}
				/>
			)}
		</HStack>
	);
});
