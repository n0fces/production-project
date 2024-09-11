import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout/AppLoaderLayout';

function App() {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const inited = useSelector(getUserInited);

	// при входе в приложение будем проверять, авторизован ли пользователь
	useEffect(() => {
		if (!inited) {
			dispatch(initAuthData());
		}
	}, [dispatch, inited]);

	// AppRouter у нас рендерится раньше, чем мы инициализируем данные о пользователе, потому что логика по инициализации данных о пользователе происходит в хуке useEffect. Решили пойти следующим образом. Мы будем отрисовывать AppRouter только тогда, когда произошла инициализацию пользователя
	if (!inited) {
		return (
			<ToggleFeatures
				feature="isAppRedesigned"
				on={
					<div id="app" className={classNames('app_redesigned', {}, [theme])}>
						<AppLoaderLayout />{' '}
					</div>
				}
				off={<PageLoader />}
			/>
		);
	}

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			off={
				<div id="app" className={classNames('app', {}, [theme])}>
					<Suspense fallback="">
						<Navbar />
						<div className="content-page">
							<Sidebar />
							<AppRouter />
						</div>
					</Suspense>
				</div>
			}
			on={
				<div id="app" className={classNames('app_redesigned', {}, [theme])}>
					<Suspense fallback="">
						<MainLayout
							content={<AppRouter />}
							header={<Navbar />}
							sidebar={<Sidebar />}
							toolbar={<div>123</div>}
						/>
					</Suspense>
				</div>
			}
		/>
	);
}

export default App;
