import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox } from '@/shared/ui/Popups';

import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
	className?: string;
	value?: string;
	onChange?: (value: Currency) => void;
	readOnly?: boolean;
}

const options = [
	{ value: Currency.RUB, content: Currency.RUB },
	{ value: Currency.EUR, content: Currency.EUR },
	{ value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
	({ className, value, onChange, readOnly }: CurrencySelectProps) => {
		const { t } = useTranslation('profile');

		const onChangeHandler = useCallback(
			(value: string) => {
				// * костыль, мне кажется) Но в принципе логично, так как здесь конкретно речь идет только про Currency
				onChange?.(value as Currency);
			},
			[onChange],
		);

		const props = {
			value,
			className,
			defaultValue: t('Укажите валюту'),
			label: t('Укажите валюту'),
			onChange: onChangeHandler,
			items: options,
			readOnly,
			// необходимо задать as const, так как иначе по коду можно будет сделать props.direction = newValue
			direction: 'bottomRight' as const,
		};

		return <ListBox {...props} />;
	},
);
