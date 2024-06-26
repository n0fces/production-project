export {
	Profile,
	ProfileScheme,
	ValidateProfileError,
} from './model/types/profile';
export { profileReducer, profileActions } from './model/slice/profileSlice';
// опять же все махинации со стейтом было бы лучше делать на уровне страниц, а этот компонент в энтити оставить в покое, но раз мы уже сделали здесь, то не будем переносить
export { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
export { updateProfileData } from './model/services/updateProfileData/updateProfileData';

export { ProfileCard } from './ui/ProfileCard/ProfileCard';
export { getProfileData } from './model/selectors/getProfileData/getProfileData';
export { getProfileIsLoading } from './model/selectors/getProfileIsLoading/getProfileIsLoading';
export { getProfileError } from './model/selectors/getProfileError/getProfileError';
export { getProfileReadonly } from './model/selectors/getProfileReadonly/getProfileReadonly';
export { getProfileForm } from './model/selectors/getProfileForm/getProfileForm';
export { getProfileValidateErrors } from './model/selectors/getProfileValidateErrors/getProfileValidateErrors';
