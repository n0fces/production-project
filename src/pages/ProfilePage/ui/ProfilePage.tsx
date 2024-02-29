import { useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import {
	ProfileCard,
	fetchProfileData,
	profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const reducers: ReducersList = {
	profile: profileReducer,
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProfileData());
	}, [dispatch]);

	return (
		// * На этом моменте даже приятно удивился, насколько легко мы подключили логику асинхронного подключения редьюсеров) Просто использовали уже созданные вещи. Тогда долго сидели, чтобы сейчас просто использовать
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames('', {}, [className])}>
				<ProfileCard />
			</div>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
