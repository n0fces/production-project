import { User } from 'entities/User';

export interface Comment {
	id: string;
	// бэкенд благодаря связям по айди пользователя будет присылать нам всю информацию о пользователе для отображения
	user: User;
	text: string;
}
