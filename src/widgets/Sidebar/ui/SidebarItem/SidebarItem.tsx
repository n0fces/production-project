import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon';

import { SidebarItemType } from '../../model/types/sidebar';
import styles from './SidebarItem.module.scss';

interface SidebarItemProps {
	item: SidebarItemType;
	collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
	const { t } = useTranslation();
	const isAuth = useSelector(getUserAuthData);

	if (item.authOnly && !isAuth) {
		return null;
	}

	return (
		<AppLink
			to={item.path}
			className={classNames(styles.itemRedesigned, {
				[styles.collapsedRedesigned]: collapsed,
			})}
			activeClassName={styles.active}>
			<Icon Svg={item.Icon} />
			<span className={styles.link}>{t(item.text)}</span>
		</AppLink>
	);
});
