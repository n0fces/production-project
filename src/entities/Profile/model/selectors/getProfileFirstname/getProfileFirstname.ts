import { StateScheme } from 'app/providers/StoreProvider';

export const getProfileFirstname = (state: StateScheme) =>
	state.profile?.data?.first || '';
