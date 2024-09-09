import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import styles from './Code.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
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
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<pre className={classNames(styles.CodeRedesigned, {}, [className])}>
					<Icon onClick={onCopy} className={styles.copyBtn} Svg={CopyIconNew} />
					<code>{text}</code>
				</pre>
			}
			off={
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
			}
		/>
	);
});
