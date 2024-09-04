import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';

function App() {
	const { theme } = useTheme();
	const dispatch = useDispatch();
	const inited = useSelector(getUserInited);

	// при входе в приложение будем проверять, авторизован ли пользователь
	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	return (
		<div className={classNames('app', {}, [theme])}>
			<Suspense fallback="">
				<Navbar />
				<div className="content-page">
					<Sidebar />
					{/* AppRouter у нас рендерится раньше, чем мы инициализируем данные о пользователе, потому что логика по инициализации данных о пользователе происходит в хуке useEffect. Решили пойти следующим образом. Мы будем отрисовывать AppRouter только тогда, когда произошла инициализацию пользователя */}
					{inited && <AppRouter />}
				</div>
			</Suspense>
		</div>
	);
}

export default App;
