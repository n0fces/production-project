import { Listbox } from '@headlessui/react';
import type { ComponentType } from 'react';

import { Button, ButtonProps } from '../../../../../Button';

export type ExtractProps<T> = T extends ComponentType<infer P> ? P : T;

type ListBoxButtonProps = ExtractProps<typeof Listbox.Button> & ButtonProps;

export const ListBoxButton = ({ children, ...props }: ListBoxButtonProps) => {
	return (
		<Listbox.Button as={Button} {...props}>
			{children}
		</Listbox.Button>
	);
};
