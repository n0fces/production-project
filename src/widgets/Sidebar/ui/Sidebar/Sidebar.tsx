import { memo, useState } from 'react';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';

import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import styles from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const sidebarItemsList = useSidebarItems();

	// * Мне кажется, что Тимур слишком перебарщивает с использованием мемоизации. У нас и так все вроде декомпозировано таким образом, что лишних ререндоров не возникает. В большинстве случаем мы просто по приколу используем мемоизацию, хотя и так не возникает ререндеров. Вроде было только пару кейсов, где использование мемоизации реально имело эффект

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<aside
			data-testid="sidebar"
			className={classNames(
				styles.SidebarRedesigned,
				{ [styles.collapsedRedesigned]: collapsed },
				[className],
			)}>
			<AppLogo size={collapsed ? 30 : 50} className={styles.appLogo} />
			<VStack role="navigation" gap="8" className={styles.items}>
				{sidebarItemsList.map((item) => (
					<SidebarItem key={item.path} item={item} collapsed={collapsed} />
				))}
			</VStack>
			<Icon
				data-testid="sidebar-toggle"
				onClick={onToggle}
				className={styles.collapseBtn}
				Svg={ArrowIcon}
			/>
			{/* здесь можно было бы использовать HStack и VStack */}
			<div className={styles.switchers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} className={styles.lang} />
			</div>
		</aside>
	);
});
