import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { id } = useParams<{ id: string }>();

	return (
		// * На этом моменте даже приятно удивился, насколько легко мы подключили логику асинхронного подключения редьюсеров) Просто использовали уже созданные вещи. Тогда долго сидели, чтобы сейчас просто использовать
		<Page className={classNames('', {}, [className])}>
			<VStack gap='16' max>
				<EditableProfileCard id={id} />
			</VStack>
		</Page>
	);
};

export default ProfilePage;
