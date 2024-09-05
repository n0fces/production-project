import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import styles from './Sidebar.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { SidebarDeprecated } from './SidebarDeprecated';
import { AppLogo } from '@/shared/ui/deprecated/AppLogo';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const sidebarItemsList = useSelector(getSidebarItems);

	// * Мне кажется, что Тимур слишком перебарщивает с использованием мемоизации. У нас и так все вроде декомпозировано таким образом, что лишних ререндоров не возникает. В большинстве случаем мы просто по приколу используем мемоизацию, хотя и так не возникает ререндеров. Вроде было только пару кейсов, где использование мемоизации реально имело эффект

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
				<aside
					data-testid="sidebar"
					className={classNames(
						styles.SidebarRedesigned,
						{ [styles.collapsed]: collapsed },
						[className],
					)}
				>
					<AppLogo className={styles.appLogo} />
				</aside>
			}
			off={
				<SidebarDeprecated
					sidebarItemsList={sidebarItemsList}
					onToggle={onToggle}
					className={className}
					collapsed={collapsed}
				/>
			}
		/>
	);
});
