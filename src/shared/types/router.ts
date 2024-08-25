import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line path-checker-fsd-trainee/layer-imports
import { UserRole } from '@/entities/User';

// расширяем пропсы, которые предоставляет нам сама библиотека

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
	roles?: UserRole[];
};
