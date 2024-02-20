// чтобы мы могли предоставлять информацию о темах
import 'app/styles/index.scss';
import { Story } from '@storybook/react';

export const StyleDecorator = (story: () => Story) => story();
