import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import styles from './Code.module.scss';
import { Icon } from '../Icon';

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
