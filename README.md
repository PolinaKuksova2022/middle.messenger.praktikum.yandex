# Проект Messenger

- [главная страница](https://messengerpk.netlify.app/main)
- [авторизация](https://messengerpk.netlify.app)  (только для НЕ зарегистрированных пользователей)
- [регистрация](https://messengerpk.netlify.app/sign-up) (только для НЕ зарегистрированных пользователей)
- [профиль пользователя](https://messengerpk.netlify.app/settings)  (только для зарегистрированных пользователей)
- [чат](https://messengerpk.netlify.app/messenger)  (только для зарегистрированных пользователей)
- [404](https://messengerpk.netlify.app/*)
- [505](https://messengerpk.netlify.app/internal-server-error)

Для просмотра чата без регистрации:
Логин: sdsd
Пароль: 1234567A

## Описание

Messenger - это учебный проект, предназначенный для создания собственного мессенджера. В конце работы над проектом будет реализовано полноценное приложение, которое может использоваться для общения с друзьями и близкими. 

[Описание API](https://ya-praktikum.tech/api/v2/swagger/#/)

Добавлено:
- авторизация в полном объеме (регистрация, авторизация, выход из системы);
- работа с информацией пользователя (изменять данные пользователя, изменять аватар, изменять пароль);
- работа с чатами (список чатов пользователя, создать новый чат, добавить пользователя в чат, удалить пользователя из чата);
- подключен WebSocket для работы с real-time сообщениями.

## Технологии 

- Инструмент для разработки серверных и сетевых приложений - NodeJS (v19.0.0).   
- Язык - JavaScript.
- Сборщик — Vite.
- Шаблонизатор — Handlebars.
- Препроцессор - Sass (SCSS).
- WebSocket для работы с real-time сообщениями,
- тестирование Mocha и Chai,
- Cервис для разворачивания приложения в сети интернет — Netlify.

## [Макет](https://www.figma.com/file/vVYHeAV9UkFqN2RqvlKLOZ/Chat_external_link-(Copy)?type=design&node-id=0-1&t=PGOTy4iRpVdyP5Ji-0)


## Установка

- `npm install` — установка стабильной версии,
- `npm run build` — сборка стабильной версии,
- `npm run start` — запуск версии на port 3000,
- `npm run test` - запуск тестов.
