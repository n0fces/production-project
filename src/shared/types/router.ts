import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/entities/User';

// расширяем пропсы, которые предоставляет нам сама библиотека

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
	roles?: UserRole[];
};
