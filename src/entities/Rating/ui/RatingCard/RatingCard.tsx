import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import {
	Button as ButtonDeprecated,
	ButtonSize,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

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
		[hasFeedback, onAccept],
	);

	const formContent = (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<>
					<Text title={feedbackTitle} />
					<Input
						data-testid="RatingCard.Input"
						value={feedback}
						onChange={setFeedback}
						placeholder={t('Ваш отзыв')}
					/>
				</>
			}
			off={
				<>
					<TextDeprecated title={feedbackTitle} />
					<InputDeprecated
						data-testid="RatingCard.Input"
						value={feedback}
						onChange={setFeedback}
						placeholder={t('Ваш отзыв')}
					/>
				</>
			}
		/>
	);

	const content = (
		<>
			<VStack align="center" gap="8" max>
				<ToggleFeatures
					feature="isAppRedesigned"
					on={<Text title={starsCount ? t('Спасибо за оценку!') : title} />}
					off={
						<TextDeprecated
							title={starsCount ? t('Спасибо за оценку!') : title}
						/>
					}
				/>

				<StarRating
					selectedStars={starsCount}
					size={40}
					onSelect={onSelectStars}
				/>
			</VStack>
			<BrowserView>
				<Modal isOpen={isModalOpen} onClose={cancelHandle} lazy>
					<VStack gap="32" max>
						{formContent}
						<ToggleFeatures
							feature="isAppRedesigned"
							on={
								<HStack justify="end" gap="16" max>
									<Button data-testid="RatingCard.Close" onClick={cancelHandle}>
										{t('Закрыть')}
									</Button>
									<Button data-testid="RatingCard.Send" onClick={acceptHandle}>
										{t('Отправить')}
									</Button>
								</HStack>
							}
							off={
								<HStack justify="end" gap="16" max>
									<ButtonDeprecated
										data-testid="RatingCard.Close"
										onClick={cancelHandle}
										theme={ButtonTheme.OUTLINE_RED}
									>
										{t('Закрыть')}
									</ButtonDeprecated>
									<ButtonDeprecated
										data-testid="RatingCard.Send"
										onClick={acceptHandle}
									>
										{t('Отправить')}
									</ButtonDeprecated>
								</HStack>
							}
						/>
					</VStack>
				</Modal>
			</BrowserView>
			<MobileView>
				<Drawer isOpen={isModalOpen} onClose={cancelHandle}>
					<VStack gap="32">
						{formContent}
						<ToggleFeatures
							feature="isAppRedesigned"
							on={
								<Button onClick={acceptHandle} size="l" fullWidth>
									{t('Отправить')}
								</Button>
							}
							off={
								<ButtonDeprecated
									onClick={acceptHandle}
									size={ButtonSize.L}
									fullWidth
								>
									{t('Отправить')}
								</ButtonDeprecated>
							}
						/>
					</VStack>
				</Drawer>
			</MobileView>
		</>
	);

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<Card data-testid="RatingCard" max padding="24" border="round">
					{content}
				</Card>
			}
			off={
				<CardDeprecated data-testid="RatingCard" className={className} max>
					{content}
				</CardDeprecated>
			}
		/>
	);
};
