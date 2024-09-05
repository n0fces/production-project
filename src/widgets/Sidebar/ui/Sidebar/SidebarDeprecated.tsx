import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import styles from './Sidebar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SidebarItemType } from '../../model/types/sidebar';

interface SidebarDeprecatedProps {
	className?: string;
	collapsed: boolean;
	onToggle: () => void;
	sidebarItemsList: SidebarItemType[];
}

export const SidebarDeprecated = ({
	onToggle,
	className,
	collapsed,
	sidebarItemsList,
}: SidebarDeprecatedProps) => (
	<aside
		data-testid="sidebar"
		className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [
			className,
		])}
	>
		<Button
			data-testid="sidebar-toggle"
			onClick={onToggle}
			className={styles.collapseBtn}
			theme={ButtonTheme.BACKGROUND_INVERTED}
			size={ButtonSize.L}
			square
		>
			{collapsed ? '>' : '<'}
		</Button>
		{/* Здесь можно было бы пойти другим путем и, как у меня сделано для кнопки в movies-app, сделать здесь (сразу определяем тег, который хотим использовать). Но такая реализация намного легче */}
		<VStack role="navigation" gap="8" className={styles.items}>
			{sidebarItemsList.map((item) => (
				<SidebarItem key={item.path} item={item} collapsed={collapsed} />
			))}
		</VStack>
		<div className={styles.switchers}>
			<ThemeSwitcher />
			<LangSwitcher short={collapsed} className={styles.lang} />
		</div>
	</aside>
);
