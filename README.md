# Обзор проекта

О приложении

---

# Конфигурация проекта

Сборка проекта осуществляется при помощи Webpack. Есть ряд скриптов, которые позволяют разворачивать проект в development и production режимах
Для удобства разработки также используется сборщик Vite

```bash
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
npm run build:dev или npm run build:prod - сборка проекта в development и production режимах соответственно
```

---

# Используемый стек технологий

## Основные зависимости проекта

Основными библиотеками и пакетами, которые определяют структуру и архитектуру приложения являются React для создания интерфейсов, Redux Toolkit для управления глобальным состоянием приложения, React Router для реализации client side routing. Все используемые в проекте зависимости:

- **[@headlessui/react](https://headlessui.com/)**: v1.6.6 — Полностью нестилированные, полностью доступные компоненты пользовательского интерфейса.
- **[@react-spring/web](https://www.react-spring.dev/)**: v9.5.2 — React Spring - это библиотека для создания интерактивных, управляемых данными и анимированных компонентов пользовательского интерфейса.
- **[@reduxjs/toolkit](https://redux-toolkit.js.org/)**: v1.9.0 — Пакет Redux Toolkit предназначен для того, чтобы стать стандартным способом написания логики Redux.
- **[@use-gesture/react](https://use-gesture.netlify.app/)**: v10.2.19 — Это библиотека, которая позволяет вам привязывать более сложные события наведения курсора мыши и касания к любому компоненту или виду.
- **[axios](https://axios-http.com/)**: v0.26.1 — HTTP-клиент на основе promise для браузера и node.js.
- **[i18next](https://www.i18next.com/)**: v21.9.0 — Фреймворк интернационализации для JavaScript.
- **[i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)**: v6.1.3 — Определение языка пользователя для i18next в браузере.
- **[i18next-http-backend](https://github.com/i18next/i18next-http-backend)**: v1.3.2 — Загрузка переводов через HTTP для i18next.
- **[react](https://reactjs.org/)**: v18.2.0 — Библиотека для создания пользовательских интерфейсов.
- **[react-device-detect](https://github.com/duskload/react-device-detect)**: v2.2.2 — Определение устройства пользователя в React-приложениях.
- **[react-dom](https://reactjs.org/)**: v18.2.0 — Библиотека для взаимодействия React с DOM.
- **[react-i18next](https://react.i18next.com/)**: v11.18.3 — Интернационализация для React с использованием i18next.
- **[react-redux](https://react-redux.js.org/)**: v8.0.5 — Официальный биндинг для работы React с Redux.
- **[react-router-dom](https://reactrouter.com/)**: v6.2.1 — Управление маршрутизацией на стороне клиента.

## Third-party-libraries

В дополнении к основным зависимостям проекта используются следующие зависимости для разработки. Все используемые в проекте зависимости для разработки (здесь намеренно опущены зависимости, относящиеся к типам для библиотек):

- **[@babel/core](https://babeljs.io/docs/babel-core)**: v7.17.5 — Ядро Babel для трансформации кода. При всех преобразованиях будут использоваться ваши локальные конфигурационные файлы.
- **[@babel/plugin-transform-runtime](https://babeljs.io/docs/babel-plugin-transform-runtime)**: v7.18.10 — Плагин, который позволяет повторно использовать введенный вспомогательный код Babel для экономии размера кода.
- **[@babel/preset-env](https://babeljs.io/docs/babel-preset-env)**: v7.16.11 — Пресет для компиляции JavaScript под современные стандарты.
- **[@babel/preset-react](https://babeljs.io/docs/babel-preset-react)**: v7.16.7 — Пресет для поддержки React в Babel.
- **[@babel/preset-typescript](https://babeljs.io/docs/babel-preset-typescript)**: v7.16.7 — Пресет для поддержки TypeScript в Babel.
- **[@eslint/js](https://www.npmjs.com/package/@eslint/js)**: v9.11.1 — Конфигурация для включения правил ESLint для Javascript.
- **[@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)**: v0.5.5 — Плагин Webpack для включения функции "быстрого обновления" (также ранее известной как Hot Reloading) компонентов React.
- **[@storybook/addon-actions](https://github.com/storybookjs/storybook/tree/next/code/addons/actions)**: v6.5.13 — Аддон для добавления действий в Storybook.
- **[@storybook/addon-essentials](https://storybook.js.org/docs/essentials)**: v6.5.13 — Набор основных дополнений для Storybook.
- **[@storybook/addon-interactions](https://storybook.js.org/addons/@storybook/addon-interactions)**: v6.5.13 — Обеспечивают визуальную отладку взаимодействий и тестов в Storybook.
- **[@storybook/addon-links](https://storybook.js.org/addons/@storybook/addon-links)**: v6.5.13 — Плагин для добавления ссылок между историями в Storybook.
- **[@storybook/builder-webpack5](https://storybook.js.org/docs/builders/webpack)**: v6.5.13 — Webpack 5 как сборщик для Storybook.
- **[@storybook/manager-webpack5](https://www.npmjs.com/package/@storybook/manager-webpack5)**: v6.5.13 — Webpack 5 как менеджер для Storybook.
- **[@storybook/react](https://www.npmjs.com/package/@storybook/react)**: v6.5.13 — Библиотека для разработки компонентов React в Storybook.
- **[@storybook/testing-library](https://www.npmjs.com/package/@storybook/testing-library)**: v0.0.13 — Инструменты для тестирования компонентов Storybook.
- **[@svgr/webpack](https://react-svgr.com/docs/webpack/)**: v6.2.1 — Предоставляет официальный загрузчик webpack.js для импорта SVG в качестве компонентов React.
- **[@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)**: v5.16.2 — Расширения для Jest для работы с DOM.
- **[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)**: v13.4.0 — Инструменты для тестирования компонентов React.
- **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro/)**: v14.3.0 — Имитация взаимодействия пользователя для тестирования.
- **[@trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports)**: v4.3.0 — Prettier-плагин для упорядочивания импортов в коде.
- **[@types/circular-dependency-plugin](https://www.npmjs.com/package/@types/circular-dependency-plugin)**: v5.0.5 — Типы для плагина обнаружения циклических зависимостей.
- **[@types/jest](https://www.npmjs.com/package/@types/jest)**: v27.4.1 — Типы для Jest.
- **[@types/node](https://www.npmjs.com/package/@types/node)**: v17.0.21 — Типы для Node.js.
- **[@types/react](https://react.dev/learn/typescript)**: v18.0.17 — Типы для React.
- **[@types/react-dom](https://react.dev/learn/typescript)**: v18.0.6 — Типы для ReactDOM.
- **[@types/webpack](https://www.npmjs.com/package/@types/webpack)**: v5.28.0 — Типы для Webpack.
- **[@types/webpack-bundle-analyzer](https://www.npmjs.com/package/@types/webpack-bundle-analyzer)**: v4.4.1 — Типы для анализатора бандлов Webpack.
- **[@types/webpack-dev-server](https://webpack.js.org/configuration/dev-server/)**: v4.7.2 — Типы для Webpack Dev Server.
- **[@typescript-eslint/eslint-plugin](https://typescript-eslint.io/packages/eslint-plugin/)**: v8.7.0 — плагин ESLint, используемый для загрузки пользовательских правил и списков конфигураций правил из typescript-eslint.
- **[@typescript-eslint/parser](https://typescript-eslint.io/packages/parser/)**: v8.7.0 — Парсер для TypeScript для ESLint.
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)**: v2.1.0 — Плагин для Vite, добавляющий поддержку React.
- **[babel-loader](https://github.com/babel/babel-loader)**: v8.2.3 — Загрузчик для Webpack для обработки файлов с помощью Babel.
- **[babel-plugin-i18next-extract](https://github.com/gilbsgilbs/babel-plugin-i18next-extract)**: v0.8.3 — Плагин для извлечения переводов из кода.
- **[circular-dependency-plugin](https://github.com/aackerman/circular-dependency-plugin)**: v5.2.2 — Плагин для обнаружения циклических зависимостей в модулях.
- **[concurrently](https://github.com/open-cli-tools/concurrently)**: v9.0.1 — Утилита для запуска нескольких команд одновременно.
- **[copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/)**: v10.2.4 — Плагин для копирования файлов и папок в выходной каталог Webpack.
- **[css-loader](https://webpack.js.org/loaders/css-loader/)**: v6.6.0 — Загрузчик для обработки CSS в Webpack.
- **[cypress](https://www.cypress.io/)**: v11.0.0 — Инструмент для написания end-to-end тестов.
- **[eslint](https://eslint.org/)**: v9.11.1 — Статический анализаторв кода для анализа и выявления проблем.
- **[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)**: v9.1.0 — Конфигурация ESLint для отключения правил, конфликтующих с Prettier.
- **[eslint-plugin-i18next](https://github.com/edvardchen/eslint-plugin-i18next)**: v6.1.0 — Плагин ESLint для правил по проверке интернационализации.
- **[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)**: v6.10.0 — Плагин ESLint для проверки доступности JSX.
- **[eslint-plugin-path-checker-fsd-trainee](https://github.com/PathCheckerFSD-Trainee)**: v0.0.10 — Плагин ESLint для проверки путей по архитектуре Feature-Sliced Design.
- **[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)**: v7.36.1 — Плагин ESLint для проверки кода React.
- **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)**: v5.1.0-rc-fb9a90fa48-20240614 — Плагин ESLint для проверки хуков React.
- **[eslint-plugin-storybook](https://github.com/storybookjs/eslint-plugin-storybook?ref=storybookblog.ghost.io)**: v0.9.0 — Плагин ESLint для проверки Storybook.
- **[eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)**: v4.1.4 — Плагин ESLint для выявления и удаления неиспользуемых импортов.
- **[file-loader](https://webpack.js.org/loaders/file-loader/)**: v6.2.0 — Загрузчик для обработки файлов в Webpack.
- **[fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)**: v7.3.0 — Плагин для проверки типов TypeScript в Webpack в отдельном процессе.
- **[globals](https://github.com/sindresorhus/globals)**: v15.9.0 — Набор глобальных переменных для различных сред выполнения.
- **[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)**: v5.5.0 — Плагин для генерации HTML-файлов в Webpack.
- **[husky](https://typicode.github.io/husky/)**: v7.0.0 — Инструмент для управления Git хуками. Он позволяет автоматически запускать команды, например, линтеры или тесты, перед выполнением Git-коммитов, пушей и других действий.
- **[identity-obj-proxy](https://github.com/keyz/identity-obj-proxy)**: v3.0.0 — Объект идентификации, использующий прокси-серверы ES6.
- **[jest](https://jestjs.io/)**: v27.5.1 — Фреймворк для тестирования JavaScript.
- **[jest-html-reporters](https://github.com/Hazyzh/jest-html-reporters)**: v3.0.10 — Репортер для jest test framework.
- **[json-server](https://github.com/typicode/json-server)**: v0.17.0 — Инструмент для работы с фейковым REST API сервером.
- **[lint-staged](https://github.com/lint-staged/lint-staged)**: v13.0.3 — Инструмент для выполнения команд над измененными файлами.
- **[loki](https://loki.js.org/)**: v0.28.1 — Инструмент для проведения скриншотных тестов на основе Storybook.
- **[mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)**: v2.5.3 — Плагин извлекает CSS в отдельные файлы.
- **[prettier](https://prettier.io/)**: v3.3.3 — Пакет для форматирования кода.
- **[react-refresh](https://www.npmjs.com/package/react-refresh)**: v0.12.0 — Пакет позволяет редактировать компоненты React в запущенном приложении без потери их состояния.
- **[reg-cli](https://github.com/reg-viz/reg-cli)**: v0.17.6 — Инструмент визуального регрессионного тестирования.
- **[regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)**: v0.13.9 — Автономная среда выполнения для генератора, скомпилированного регенератором, и асинхронных функций.
- **[sass](https://sass-scss.ru/)**: v1.49.9 — Препроцессор для CSS.
- **[sass-loader](https://webpack.js.org/loaders/sass-loader/)**: v16.0.2 — Загружает файл Sass/SCSS и компилирует его в CSS.
- **[storybook-addon-mock](https://storybook.js.org/addons/storybook-addon-mock)**: v3.2.0 — Этот аддон позволяет имитировать запросы fetch или XMLHttpRequest в storybook.
- **[storybook-addon-themes](https://storybook.js.org/addons/storybook-addon-themes)**: v6.1.0 — Аддон для переключения между различными темами предварительного просмотра в Storybook.
- **[style-loader](https://webpack.js.org/loaders/style-loader/)**: v4.0.0 — Загрузчик для внедрения CSS в DOM.
- **[stylelint](https://stylelint.io/)**: v16.9.0 — CSS-линтер, который поможет избежать ошибок и обеспечить соблюдение соглашений.
- **[stylelint-config-prettier-scss](https://github.com/prettier/stylelint-config-prettier-scss)**: v1.0.0 — Отключает все правила CSS и SCSS, которые не нужны или могут конфликтовать с prettier.
- **[stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)**: v13.1.0 — Стандартная конфигурация SCSS для Stylelint.
- **[ts-loader](https://webpack.js.org/guides/typescript/)**: v9.4.2 — Загрузчик для обработки TypeScript в Webpack.
- **[ts-morph](https://ts-morph.com/)**: v16.0.0 — Библиотека для манипулирования над Typescript AST-деревом.
- **[ts-node](https://typestrong.org/ts-node/)**: v10.5.0 — Выполнение TypeScript и REPL для Node.js
- **[typescript](https://www.typescriptlang.org/)**: v5.6.2 — TypeScript - это строго типизированный язык программирования, основанный на JavaScript.
- **[typescript-eslint](https://typescript-eslint.io/)**: v8.7.0 — Инструмент, который позволяет ESLint и Prettier поддерживать TypeScript.
- **[vite](https://vitejs.dev/)**: v3.1.0 — Сборщик для фронтенд-приложений.
- **[vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr)**: v2.2.1 — Плагин Vite для преобразования SVG-файлов в компоненты React.
- **[webpack](https://webpack.js.org/)**: v5.69.1 — Модульный сборщик JavaScript.
- **[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)**: v4.5.0 — Плагин для анализа бандлов Webpack.
- **[webpack-cli](https://webpack.js.org/api/cli/)**: v4.9.2 — CLI для Webpack.
- **[webpack-dev-server](https://webpack.js.org/configuration/dev-server/)**: v4.7.4 — Сервер разработки для Webpack.

---

# Архитектура проекта

Проект организован в соответствии с подходом **Feature-Sliced Design**, который позволяет структурировать код в зависимости от логики и функций, а не от типов файлов. Эта архитектура помогает улучшить масштабируемость, тестируемость и управляемость приложения.

Подробнее с данной методологией можно ознакомиться на сайте [Feature-Sliced design](https://feature-sliced.design/docs/get-started/tutorial).

## Основные уровни

1. **App** — уровень инициализации приложения. Содержит глобальные конфигурации, провайдеры и настройки, такие как роутинг, темы и глобальные стили.
2. **Pages** — страницы, которые представляют собой конкретные маршруты и композиции различных сущностей, виджетов, фич и юнитов.
3. **Widgets** — большие самодостаточные куски функциональности или интерфейса, обычно реализующие целый пользовательский сценарий.
4. **Features** — повторно используемые реализации целых фич продукта, то есть действий, приносящих бизнес-ценность пользователю.
5. **Entities** — бизнес-сущности (например, пользователь, товар, заказ), с которыми работает проект.
6. **Shared** — переиспользуемые вспомогательные модули (utility-функции, компоненты), которые могут быть использованы на любом уровне приложения.

## Структура директорий

```bash
src/
├── app/                      # Слой инициализации приложения, глобальные настройки
│   ├── lib/                  # Утилиты, хелперы, использующиеся только на этом уровне
│   ├── providers/            # Провайдеры, контексты и конфигурации
│   ├── styles/               # Глобальное состояние приложения
│   ├── types/                # Глобальное состояние приложения
│   └── App.tsx               # Входная точка приложения
├── pages/                    # Слой страниц
│   ├── [PageName]/           # Пример страницы (Landing, Dashboard, Profile и т.д.)
├── widgets/                  # Страницы (Views), которые объединяют сущности и функции
│   ├── [WidgetName]/         # Пример страницы (Landing, Dashboard, Profile и т.д.)
├── features/                 # Фичи — функциональные блоки приложения
│   ├── [FeatureName]/        # Пример фичи (поисковая строка, форма входа и т.д.)
│   └── ...
├── entities/                 # Сущности доменной области (пользователь, продукт и т.д.)
│   ├── [EntityName]/         # Пример сущности (пользователь, товар)
│   └── ...
├── shared/                   # Переиспользуемые элементы
│   ├── api/                  # API-интерфейсы и запросы
│   ├── lib/                  # Утилиты, хелперы
│   ├── ui/                   # Переиспользуемые UI-компоненты (Button, Input и т.д.)
│   ├── config/               # Конфигурационные файлы
│   ├── model/                # Общие модели данных и типы
│   └── assets/               # Статические файлы, изображения, иконки
```

Схематичное представление слайсов для pages, widgets, features, entities слоев представлено в отдельных пунктах далее.

---

# Скрипты проекта

- `npm run start` - Запуск проекта на webpack dev server
- `npm run start:vite` - Запуск проекта на vite
- `npm run start:dev:server` - Запуск серверной части
- `npm run start:dev` - Запуск проекта на webpack dev server + сервер
- `npm run start:dev:vite` - Запуск проекта на vite + сервер
- `npm run build:prod` - Сборка в producction режиме
- `npm run build:dev` - Сборка в development режиме (не минимизирован)
- `npm run prettier` - Запуск форматирования кода
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов стилей линтером
- `npm run lint:scss:fix` - Исправление scss файлов стилей линтером
- `npm run test:unit` - Запуск unit тестов с jest
- `npm run test:e2e` - Запуск e2e-тестов с cypress
- `npm run test:ui` - Запуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run test:ui:json` - Генерация json-отчета для скриншотных тестов
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Сборка storybook билда
- `npm run generate:slice` - Скрипт для генерации FSD слайсов
- `npm run postinstall` - Очистка кэша при добавлении новой зависимости
- `npm run remove-feature` - Запуск скрипта для удаления конкретной фичи

---



# Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

# Тесты

В проекте используются 4 вида тестов:

1. Обычные unit тесты на jest - `npm run test:unit`
2. Тесты на компоненты с React testing library -`npm run test:unit`
3. Скриншотное тестирование с loki `npm run test:ui`
4. e2e тестирование с Cypress `npm run test:e2e`

Подробнее о тестах - [документация тестирование](/docs/tests.md)

---

# Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin _eslint-plugin-path-checker-fsd-trainee_,
который содержит 3 правила

1. path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2. layer-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entitites)
3. public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров

- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:

- `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

---

## Конфигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - ./config/build
2. Vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config

- /config/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

---

## CI pipeline и pre commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяем проект линтерами, конфиг в /.husky

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

---

### Работа с feature-flags

Разрешено использование feature flags только с помощью хелпера toggleFeatures

в него передается объект с опциями

{
name: название фича-флага,
on: функция, которая отработает после Включения фичи
of: функция, которая отработает после ВЫключения фичи
}

Для автоматического удаления фичи использовать скрипт remove-feature.ts,
который принимает 2 аргумента

1. Название удаляемого фича-флага
2. Состояние (on/off)

---

## Сущности (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Фичи (features)

- [AddCommentForm](/src/features/AddCommentForm)
- [ArticleRating](/src/features/ArticleRating)
- [ArticleRecommendationsList](/src/features/ArticleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [AvatarDropdown](/src/features/AvatarDropdown)
- [EditableProfileCard](/src/features/EditableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [NotificationButton](/src/features/NotificationButton)
- [ScrollSave](/src/features/ScrollSave)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
