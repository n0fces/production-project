# Обзор проекта

О приложении

---

# Конфигурация проекта

Сборка проекта осуществляется при помощи webpack. Есть ряд скриптов, которые позволяют разворачивать проект в development и production режимах
Для удобства разработки также используется сборщик vite

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
npm run build:dev или npm run build:prod - сборка проекта в development и production режимах соответственно
```

---

# Используемый стек технологий

Основными библиотеками и пакетами, которые определяют структуру и архитектуру приложения являются React для создания интерфейсов, Redux Toolkit для управления глобальным состоянием приложения, React Router для реализации client side routing. Все используемые в проекте зависимости:

- **[@headlessui/react](https://headlessui.com/)**: v1.6.6 — Полностью нестилированные, полностью доступные компоненты пользовательского интерфейса.
- **[@react-spring/web](https://www.react-spring.dev/)**: v9.5.2 — React Spring - это библиотека для создания интерактивных, управляемых данными и анимированных компонентов пользовательского интерфейса.
- **[@reduxjs/toolkit](https://redux-toolkit.js.org/)**: v1.9.0 — Пакет Redux Toolkit предназначен для того, чтобы стать стандартным способом написания логики Redux.
- **[@use-gesture/react](https://use-gesture.netlify.app/)**: v10.2.19 —  Это библиотека, которая позволяет вам привязывать более сложные события наведения курсора мыши и касания к любому компоненту или виду.
- **[axios](https://axios-http.com/)**: v0.26.1 — HTTP-клиент на основе promise для браузера и node.js.
- **[concurrently](https://github.com/open-cli-tools/concurrently)**: v7.0.0 — Запуск нескольких команд одновременно.
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

В дополнении к основным зависимостям проекта используются следующие зависимости для разработки. Все используемые в проекте зависимости для разработки:

---

# Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:vite` - Запуск frontend проекта на vite
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:dev:vite` - Запуск frontend проекта на vite + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:unit` - Хапуск unit тестов с jest
- `npm run test:ui` - Хапуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Сборка storybook билда
- `npm run prepare` - прекоммит хуки
- `npm run generate:slice` - Скрипт для генерации FSD слайсов

---

# Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

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
