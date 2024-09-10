import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { EditableProfileCardHeaderComponent } from './EditableProfileCardHeader';

export const EditableProfileCardHeaderRedesigned = ({
	canEdit,
	onCancelEdit,
	onEdit,
	onSave,
	readonly,
	className,
}: EditableProfileCardHeaderComponent) => {
	const { t } = useTranslation('profile');
	return (
		<Card padding="24" max border="normal">
			<HStack max justify="between" className={className}>
				<Text title={t('Профиль')} />
				{canEdit && (
					<div>
						{readonly ? (
							<Button
								onClick={onEdit}
								data-testid="EditableProfileCardHeader.EditButton"
							>
								{t('Редактировать')}
							</Button>
						) : (
							<HStack gap="8">
								<Button
									onClick={onCancelEdit}
									data-testid="EditableProfileCardHeader.CancelButton"
									color="error"
								>
									{t('Отменить')}
								</Button>
								<Button
									onClick={onSave}
									data-testid="EditableProfileCardHeader.SaveButton"
									color="success"
								>
									{t('Сохранить')}
								</Button>
							</HStack>
						)}
					</div>
				)}
			</HStack>
		</Card>
	);
};
