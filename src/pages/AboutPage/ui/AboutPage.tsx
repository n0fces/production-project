import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AboutPage = () => {
	// по умолчанию namespace называется translation
	// мы указываем конкретный namespace, чтобы разбить на чанки перевод. мы не хотим, чтобы для пользователя подгружался перевод страниц, на которые он может даже не планировал заходить
	const { t } = useTranslation('about');
	return <Page data-testid='AboutPage'>{t('О сайте')}</Page>;
};

export default AboutPage;
