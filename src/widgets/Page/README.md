# Widgets - Page

## Описание

Компонент для работы со страницами, который добавляет функционал сохранения позиции скролла по вертикали и выполнение какого-то действия (переданный колбэк) при достижении конца списка, например, подгрузка следующей части статей при полном просмотре все предыдущих

## Как использовать

Достаточно какую-либо страницу в данный компонент. По умолчанию будет сохраняться позиция скролла, но если это не нужно, то можно переопределить пропс `isSaveScroll: false`. `onScrollEnd` ожидает колбэк, который будет срабатывать при конца списка.