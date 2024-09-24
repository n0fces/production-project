import { Suspense, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { MainLayout } from '@/shared/layouts/MainLayout/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

const App = memo(() => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const inited = useSelector(getUserInited);
	const toolbar = useAppToolbar();

	// при входе в приложение будем проверять, авторизован ли пользователь
	useEffect(() => {
		if (!inited) {
			dispatch(initAuthData());
		}
	}, [dispatch, inited]);

	// AppRouter у нас рендерится раньше, чем мы инициализируем данные о пользователе, потому что логика по инициализации данных о пользователе происходит в хуке useEffect. Решили пойти следующим образом. Мы будем отрисовывать AppRouter только тогда, когда произошла инициализацию пользователя
	if (!inited) {
		return (
			<div id="app" className={classNames('app', {}, [theme])}>
				<AppLoaderLayout />{' '}
			</div>
		);
	}

	return (
		<div id="app" className={classNames('app', {}, [theme])}>
			<Suspense fallback="">
				<MainLayout
					content={<AppRouter />}
					header={<Navbar />}
					sidebar={<Sidebar />}
					toolbar={toolbar}
				/>
			</Suspense>
		</div>
	);
});

export default withTheme(App);
