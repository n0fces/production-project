import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { LoginFormRedesigned } from './LoginFormRedesigned';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormComponentProps {
	className?: string;
	password: string;
	error: string | undefined;
	username: string;
	onChangeUsername: (value: string) => void;
	onChangePassword: (value: string) => void;
	onLoginClick: () => Promise<void>;
	isLoading: boolean;
}

export interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
}

// мы вытащили этот объект с начальными редьюсерами для того, чтобы на каждый рендер компонента не создавалась новая ссылка на объект
const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
	const dispatch = useAppDispatch();
	// * Вообще запомни, что при использовании редакса нужно стараться писать селекторы, как можно более точно. Нам не нужно писать широкие селекоры, потому что при изменении используемой части стора у нас будет происходить ререндер компонента
	// мы написали несколько селекторов, чтобы не здавать какой-то стейт по умолчанию (у нас асинхронно подгружается этот редьюсер), а сразу написать для каждого селектор, где будет значение по умолчанию
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);
	const forceUpdate = useForceUpdate();

	// * Вообще по ходу курса Тимур все оборачивает в эти хуки, связанные с мемоизацией. Мне кажется, что во многих случаях это избыточно. Короче по окончании курса надо самому пройтись и подумать, надо ли во многих местах использовать мемоизацию
	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch],
	);
	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch],
	);
	const onLoginClick = useCallback(async () => {
		const result = await dispatch(loginByUsername({ username, password }));
		// за счет того, что мы используем типзированный useDispatch, ts подсказывает нам, что мы можем достать из этого result
		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess();
			forceUpdate();
		}
	}, [dispatch, username, password, onSuccess, forceUpdate]);

	const props = {
		error,
		isLoading,
		onChangePassword,
		onChangeUsername,
		onLoginClick,
		password,
		username,
		className,
	};

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<LoginFormRedesigned {...props} />
		</DynamicModuleLoader>
	);
});

export default LoginForm;
