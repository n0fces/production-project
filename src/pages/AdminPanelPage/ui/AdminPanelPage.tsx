import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AdminPanelPage = () => {
	// по умолчанию namespace называется translation
	// мы указываем конкретный namespace, чтобы разбить на чанки перевод. мы не хотим, чтобы для пользователя подгружался перевод страниц, на которые он может даже не планировал заходить
	const { t } = useTranslation('admin-panel');
	return <Page data-testid='AdminPanelPage'>{t('Админ панель')}</Page>;
};

export default AdminPanelPage;
