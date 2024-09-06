import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import {
	addCommentFormActions,
	addCommentFormReducer,
} from '../../model/slice/addCommentForm';
import {
	getAddCommentFormError,
	getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
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
			<HStack
				data-testid="AddCommentForm"
				justify="between"
				max
				className={classNames(styles.AddCommentForm, {}, [className])}
			>
				<Input
					data-testid="AddCommentForm.Input"
					className={styles.input}
					placeholder={t('Введите текст комментария')}
					value={text}
					onChange={onCommentTextChange}
				/>
				<Button
					data-testid="AddCommentForm.Button"
					theme={ButtonTheme.OUTLINE}
					onClick={onSendHandler}
				>
					{t('Отправить')}
				</Button>
			</HStack>
		</DynamicModuleLoader>
	);
};

export default AddCommentForm;
