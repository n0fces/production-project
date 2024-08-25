// чтобы мы могли предоставлять информацию о темах
// * здесь скорее исключение, чем отход от fsd
// eslint-disable-next-line path-checker-fsd-trainee/layer-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';

export const StyleDecorator = (story: () => Story) => story();
