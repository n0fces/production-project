import { Story } from '@storybook/react';
import { Suspense } from 'react';

// Нам часто придется тестировать компоненты, у которых есть ленивая подгрузка, но при этом саспенс находится где-то у родителя
// Чтобы каждый раз под сторибук не находить место, куда добавить саспенс, мы сделаем такой декоратор
export const SuspenceDecorator = (StoryComponent: Story) => (
	<Suspense>
		<StoryComponent />
	</Suspense>
);
