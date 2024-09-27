import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';

import {
	getAddCommentFormError,
	getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import {
	addCommentFormActions,
	addCommentFormReducer,
} from '../../model/slice/addCommentForm';
import styles from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
	className?: string;
	onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
	addCommentForm: addCommentFormReducer,
};

const AddCommentForm = ({ className, onSendComment }: AddCommentFormProps) => {
	const { t } = useTranslation('article-details');
	const text = useSelector(getAddCommentFormText);
	const error = useSelector(getAddCommentFormError);
	const dispatch = useAppDispatch();

	const onCommentTextChange = useCallback(
		(value: string) => {
			dispatch(addCommentFormActions.setText(value));
		},
		[dispatch],
	);

	const onSendHandler = useCallback(() => {
		onSendComment(text || '');
		// очищаем поле после отправки комментария
		onCommentTextChange('');
	}, [onCommentTextChange, onSendComment, text]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Card padding="24" border="normal" max>
				<HStack
					data-testid="AddCommentForm"
					justify="between"
					max
					gap="16"
					className={classNames(styles.AddCommentFormRedesigned, {}, [
						className,
					])}>
					<Input
						data-testid="AddCommentForm.Input"
						className={styles.input}
						placeholder={t('Введите текст комментария')}
						value={text}
						onChange={onCommentTextChange}
					/>
					<Button data-testid="AddCommentForm.Button" onClick={onSendHandler}>
						{t('Отправить')}
					</Button>
				</HStack>
			</Card>
		</DynamicModuleLoader>
	);
};

export default AddCommentForm;
