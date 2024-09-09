import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@/entities/User';
import { EditArticleButton } from '@/features/EditArticleButton';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleAdditionalInfoProps {
	className?: string;
	author: User;
	createdAt: string;
	views: number;
	id: string;
}

export const ArticleAdditionalInfo = memo(
	({ className, author, createdAt, views, id }: ArticleAdditionalInfoProps) => {
		const { t } = useTranslation('article-details');

		return (
			<VStack gap="32" className={className}>
				<HStack gap="8">
					<Avatar src={author.avatar} size={32} />
					<Text text={author.username} bold />
					<Text text={createdAt} />
				</HStack>
				<EditArticleButton id={id} />
				{/* здесь используются плюральные переводы в зависимости от окончаниям слова */}
				{/* для русского языка это важно */}
				<Text text={t('{{count}} просмотров', { count: views })} />
			</VStack>
		);
	},
);
