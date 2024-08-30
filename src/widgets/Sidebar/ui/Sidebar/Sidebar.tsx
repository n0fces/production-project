import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
// ! это явно ошибка по fsd, потому мы не можем использовать модули в рамках одного слоя

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
		<aside
			data-testid="sidebar"
			className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
				className,
			])}
		>
			<Button
				data-testid="sidebar-toggle"
				onClick={onToggle}
				className={cls.collapseBtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				size={ButtonSize.L}
				square
			>
				{collapsed ? '>' : '<'}
			</Button>
			{/* Здесь можно было бы пойти другим путем и, как у меня сделано для кнопки в movies-app, сделать здесь (сразу определяем тег, который хотим использовать). Но такая реализация намного легче */}
			<VStack role="navigation" gap="8" className={cls.items}>
				{sidebarItemsList.map((item) => (
					<SidebarItem key={item.path} item={item} collapsed={collapsed} />
				))}
			</VStack>
			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} className={cls.lang} />
			</div>
		</aside>
	);
});
