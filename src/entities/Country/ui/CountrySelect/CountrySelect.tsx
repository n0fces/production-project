import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
	className?: string;
	value?: string;
	onChange?: (value: Country) => void;
	readOnly?: boolean;
}

const options = [
	{ value: Country.Armenia, content: Country.Armenia },
	{ value: Country.Belarus, content: Country.Belarus },
	{ value: Country.Kazakhstan, content: Country.Kazakhstan },
	{ value: Country.Russia, content: Country.Russia },
	{ value: Country.Ukrain, content: Country.Ukrain },
];

export const CountrySelect = memo(
	({ className, value, onChange, readOnly }: CountrySelectProps) => {
		const { t } = useTranslation('profile');

		const onChangeHandler = useCallback(
			(value: string) => {
				// * костыль, мне кажется) Но в принципе логично, так как здесь конкретно речь идет только про Country
				onChange?.(value as Country);
			},
			[onChange],
		);

		const props = {
			value,
			className,
			defaultValue: t('Укажите страну'),
			label: t('Укажите страну'),
			onChange: onChangeHandler,
			items: options,
			readOnly,
			direction: 'bottomRight' as const,
		};
		return (
			<ToggleFeatures
				feature="isAppRedesigned"
				on={<ListBox {...props} />}
				off={<ListBoxDeprecated {...props} />}
			/>
		);
	},
);
