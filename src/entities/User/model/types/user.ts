export enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
	MANAGER = 'MANAGER',
}

export interface User {
	id: string;
	username: string;
	avatar?: string;
	roles?: UserRole[];
}

export interface UserScheme {
	authData?: User;
	_inited: boolean;
}
