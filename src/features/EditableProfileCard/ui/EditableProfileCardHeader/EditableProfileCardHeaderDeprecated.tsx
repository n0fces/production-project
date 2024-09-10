import { useTranslation } from 'react-i18next';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { EditableProfileCardHeaderComponent } from './EditableProfileCardHeader';

export const EditableProfileCardHeaderDeprecated = ({
	canEdit,
	onCancelEdit,
	onEdit,
	onSave,
	readonly,
	className,
}: EditableProfileCardHeaderComponent) => {
	const { t } = useTranslation('profile');
	return (
		<HStack max justify="between" className={className}>
			<TextDeprecated title={t('Профиль')} />
			{canEdit && readonly ? (
				<ButtonDeprecated
					theme={ButtonTheme.OUTLINE}
					onClick={onEdit}
					data-testid="EditableProfileCardHeader.EditButton"
				>
					{t('Редактировать')}
				</ButtonDeprecated>
			) : (
				<HStack gap="8">
					<ButtonDeprecated
						theme={ButtonTheme.OUTLINE_RED}
						onClick={onCancelEdit}
						data-testid="EditableProfileCardHeader.CancelButton"
					>
						{t('Отменить')}
					</ButtonDeprecated>
					<ButtonDeprecated
						theme={ButtonTheme.OUTLINE}
						onClick={onSave}
						data-testid="EditableProfileCardHeader.SaveButton"
					>
						{t('Сохранить')}
					</ButtonDeprecated>
				</HStack>
			)}
		</HStack>
	);
};
