import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import { profileReducer } from 'entities/Profile';
import styles from './ProfilePage.module.scss';

const reducers: ReducersList = {
	profile: profileReducer,
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	return (
		// * На этом моменте даже приятно удивился, насколько легко мы подключили логику асинхронного подключения редьюсеров) Просто использовали уже созданные вещи. Тогда долго сидели, чтобы сейчас просто использовать
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames('', {}, [className])}>777</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
