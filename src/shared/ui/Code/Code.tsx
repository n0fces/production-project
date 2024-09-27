import { memo, useCallback } from 'react';

import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Icon } from '../Icon';
import styles from './Code.module.scss';

interface CodeProps {
	className?: string;
	text: string;
}

export const Code = memo((props: CodeProps) => {
	const { className, text } = props;

	const onCopy = useCallback(() => {
		navigator.clipboard.writeText(text);
	}, [text]);

	return (
		<pre className={classNames(styles.CodeRedesigned, {}, [className])}>
			<Icon onClick={onCopy} className={styles.copyBtn} Svg={CopyIconNew} />
			<code>{text}</code>
		</pre>
	);
});
