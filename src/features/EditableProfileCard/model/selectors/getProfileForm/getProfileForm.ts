import { StateScheme } from '@/app/providers/StoreProvider';

// может показаться, что мы зря дублируем данные, которые приходят с сервера (размещаем их в data и form). однако такая реализация позволит при отмене изменений не делать лишний запрос, а просто брать "по соседству)
export const getProfileForm = (state: StateScheme) => state.profile?.form;
