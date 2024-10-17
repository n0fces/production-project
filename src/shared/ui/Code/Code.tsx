import { memo, useCallback, useState } from 'react';

import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import { Icon } from '../Icon';
import styles from './Code.module.scss';

interface CodeProps {
	className?: string;
	text: string;
}

export const Code = memo((props: CodeProps) => {
	const [isMessage, setIsMessage] = useState<boolean>();
	const { className, text } = props;

	const onCopy = useCallback(() => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setIsMessage(true);
			})
			.catch(() => {
				setIsMessage(false);
			});
	}, [text]);

	const mods: Mods = {
		[styles.isCopied]: isMessage === true,
		[styles.isFailed]: isMessage === false,
	};

	return (
		<pre className={classNames(styles.Code, {}, [className])}>
			<Icon
				onClick={onCopy}
				className={classNames(styles.copyBtn, mods, [])}
				Svg={CopyIconNew}
			/>
			<code>{text}</code>
		</pre>
	);
});
