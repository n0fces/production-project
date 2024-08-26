import { useTranslation } from 'react-i18next';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { Avatar } from '@/shared/ui/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Profile } from '../../model/types/profile';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
	className?: string;
	data?: Profile;
	error?: string;
	isLoading?: boolean;
	readonly?: boolean;
	// сделали все эти колбэки необязательными, потому что потом затрахаемся со сторибуком
	onChangeFirstname?: (value?: string) => void;
	onChangeLastname?: (value?: string) => void;
	onChangeAge?: (value?: string) => void;
	onChangeCity?: (value?: string) => void;
	onChangeUsername?: (value?: string) => void;
	onChangeAvatar?: (value?: string) => void;
	onChangeCurrency?: (currency: Currency) => void;
	onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = ({
	className,
	data,
	error,
	isLoading,
	readonly,
	onChangeFirstname,
	onChangeLastname,
	onChangeAge,
	onChangeCity,
	onChangeUsername,
	onChangeAvatar,
	onChangeCurrency,
	onChangeCountry,
}: ProfileCardProps) => {
	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<HStack
				justify='center'
				max
				className={classNames(styles.ProfileCard, {}, [
					className,
					styles.loading,
				])}
			>
				<Loader />
			</HStack>
		);
	}

	if (error) {
		return (
			<HStack
				justify='center'
				max
				className={classNames(styles.ProfileCard, {}, [
					className,
					styles.error,
				])}
			>
				<Text
					theme={TextTheme.ERROR}
					title={t('Произошла ошибка при загрузке пользователя')}
					text={t('Попробуйте обновить страницу')}
					align={TextAlign.CENTER}
				/>
			</HStack>
		);
	}

	const mods: Mods = {
		[styles.editing]: !readonly,
	};

	// * Потом надо будет сделать тестирование всех инпутов
	return (
		<VStack
			gap='8'
			max
			className={classNames(styles.ProfileCard, mods, [className])}
		>
			{data?.avatar && (
				<HStack justify='center' max className={styles.avatarWrapper}>
					<Avatar src={data?.avatar} alt={data.username} />
				</HStack>
			)}
			<Input
				value={data?.first}
				placeholder={t('Ваше имя')}
				className={styles.input}
				onChange={onChangeFirstname}
				readOnly={readonly}
				data-testid='ProfileCard.firstname'
			/>
			<Input
				value={data?.lastname}
				placeholder={t('Ваша фамилия')}
				className={styles.input}
				onChange={onChangeLastname}
				readOnly={readonly}
				data-testid='ProfileCard.lastname'
			/>
			<Input
				value={data?.age}
				type='number'
				min={1}
				placeholder={t('Ваш возраст')}
				className={styles.input}
				onChange={onChangeAge}
				readOnly={readonly}
			/>
			<Input
				value={data?.city}
				placeholder={t('Ваш город')}
				className={styles.input}
				onChange={onChangeCity}
				readOnly={readonly}
			/>
			<Input
				value={data?.username}
				placeholder={t('Ваш пользовательское имя')}
				className={styles.input}
				onChange={onChangeUsername}
				readOnly={readonly}
			/>
			<Input
				value={data?.avatar}
				placeholder={t('Ваш аватар')}
				className={styles.input}
				onChange={onChangeAvatar}
				readOnly={readonly}
			/>
			<CurrencySelect
				className={styles.input}
				value={data?.currency}
				onChange={onChangeCurrency}
				readOnly={readonly}
			/>
			<CountrySelect
				onChange={onChangeCountry}
				value={data?.country}
				readOnly={readonly}
				className={styles.input}
			/>
		</VStack>
	);
};
