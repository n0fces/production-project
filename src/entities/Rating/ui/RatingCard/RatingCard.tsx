import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Text } from '@/shared/ui/Text';

interface RatingCardProps {
	className?: string;
	title?: string;
	feedbackTitle?: string;
	// иногда нужен только рейтинг, иногда нужен и рейтинг, и отзыв пользователя
	hasFeedback?: boolean;
	// отменить отзыв
	onCancel?: (starsCount: number) => void;
	// отправить отзыв
	onAccept?: (starsCount: number, feedback?: string) => void;
	rate?: number;
}

// это просто карточка рейтинга, которая не привязана к какой-то бизнес логике,
// например, оценки статей, оценка профилей пользователей и так далее
// использование данной карточки + реализация оценки статей = фича по оценке статей
// * Вообще эту "сюжетную арку" с выставление рейтинга Тимур сделал классно
// * здесь мы даже практически не пишем стилей
export const RatingCard = ({
	className,
	feedbackTitle,
	// вообще если мы задаем feedbakcTitle, то это уже означает, что мы предполагаем модалку
	// хотя с другой стороны использование hasFeedback более наглядно
	hasFeedback,
	onAccept,
	onCancel,
	title,
	rate = 0,
}: RatingCardProps) => {
	const { t } = useTranslation('');
	// весь стейт здесь у нас получается локальный, он не привязывается к какой-либо реализации
	// взаимодействие с внешним миром будет посредством колбэком onAccept, onCancel
	// с помощью этих колбэков мы будем передавать данные дальше, чтобы там уже сверху реализовывалась какая-то бизнес-логика
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [starsCount, setStarsCount] = useState(rate);
	const [feedback, setFeedback] = useState('');

	// пользователь оставил какой-то письменный feedback
	const acceptHandle = useCallback(() => {
		setIsModalOpen(false);
		onAccept?.(starsCount, feedback);
	}, [feedback, onAccept, starsCount]);

	// пользователь не захотел оставлять еще письменный feedback
	const cancelHandle = useCallback(() => {
		setIsModalOpen(false);
		onCancel?.(starsCount);
	}, [onCancel, starsCount]);

	const onSelectStars = useCallback(
		(selectedStarsCount: number) => {
			setStarsCount(selectedStarsCount);
			if (hasFeedback) {
				setIsModalOpen(true);
			} else {
				// если модалки нет, то мы просто отправляем рейтинг, который выставил пользователь
				onAccept?.(selectedStarsCount);
			}
		},
		[hasFeedback, onAccept]
	);

	const formContent = (
		<>
			<Text title={feedbackTitle} />
			<Input
				value={feedback}
				onChange={setFeedback}
				placeholder={t('Ваш отзыв')}
			/>
		</>
	);

	return (
		<Card className={className} max>
			<VStack align='center' gap='8' max>
				<Text title={starsCount ? t('Спасибо за оценку!') : title} />
				<StarRating
					selectedStars={starsCount}
					size={40}
					onSelect={onSelectStars}
				/>
			</VStack>
			<BrowserView>
				<Modal isOpen={isModalOpen} onClose={cancelHandle} lazy>
					<VStack gap='32' max>
						{formContent}
						<HStack justify='end' gap='16' max>
							<Button
								onClick={cancelHandle}
								theme={ButtonTheme.OUTLINE_RED}
							>
								{t('Закрыть')}
							</Button>
							<Button onClick={acceptHandle}>
								{t('Отправить')}
							</Button>
						</HStack>
					</VStack>
				</Modal>
			</BrowserView>
			<MobileView>
				<Drawer isOpen={isModalOpen} onClose={cancelHandle}>
					<VStack gap='32'>
						{formContent}
						<Button
							onClick={acceptHandle}
							size={ButtonSize.L}
							fullWidth
						>
							{t('Отправить')}
						</Button>
					</VStack>
				</Drawer>
			</MobileView>
		</Card>
	);
};
