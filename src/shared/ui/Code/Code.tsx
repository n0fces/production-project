import { ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy.svg';
import styles from './Code.module.scss';
import { Button, ButtonTheme } from '../Button/Button';

interface CodeProps {
	className?: string;
	text: string;
}

export const Code = ({ className, text }: CodeProps) => {
	const onCopy = useCallback(() => {
		navigator.clipboard.writeText(text);
	}, [text]);

	return (
		<pre className={classNames(styles.Code, {}, [className])}>
			<Button
				onClick={onCopy}
				className={styles.copyBtn}
				theme={ButtonTheme.CLEAR}
			>
				<CopyIcon className={styles.copyIcon} />
			</Button>
			<code>{text}</code>
		</pre>
	);
};
