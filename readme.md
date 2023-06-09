# Пояснительная записка: проект HashSorter


## 1. Установка

Для установки и запуска проекта HashSorter вам понадобятся следующие инструменты:

- Node.js версии 18.16.0 или выше: [https://nodejs.org](https://nodejs.org)
- Пакетный менеджер Yarn: [https://yarnpkg.com](https://yarnpkg.com)

### Установка на Linux и macOS

1. Установите Node.js, следуя инструкциям на официальном сайте.
2. Откройте терминал и выполните команду `npm install -g yarn`, чтобы установить Yarn.

### Установка на Windows

1. Скачайте и установите Node.js, следуя инструкциям на официальном сайте.
2. Откройте командную строку и выполните команду `npm install -g yarn`, чтобы установить Yarn.

## 2. Загрузка проекта

1. Скачайте проект HashSorter с репозитория GitHub: [https://github.com/DotBlood/zadanie](https://github.com/DotBlood/zadanie)
2. Разархивируйте скачанный архив или склонируйте репозиторий с помощью команды `git clone https://github.com/DotBlood/zadanie.git`, если у вас установлен Git.

## 3. Установка зависимостей

1. Перейдите в корневую папку проекта HashSorter.
2. Откройте терминал или командную строку в этой папке.
3. Выполните команду `yarn install`, чтобы установить все необходимые зависимости.

## 4. Конфигурация

1. В папке проекта откройте файл `.env.example`.
2. Сохраните копию файла `.env.example` с именем `.env`.
3. Откройте файл `.env` и настройте параметры, если это необходимо (например, настройте порт сервера или подключение к базе данных).

## 4.1 Конфигурация (Dokcer)

1. В корне проекта выполните команду `docker-compose up`.
2. Если вы хотите внести изменения в `docker-compose.yml`, не забудьте также обновить соответствующие значения в файле `.env`.

## 5. Запуск

1. В корневой папке проекта выполните команду `yarn start` или `yarn dev` в терминале или командной строке.
2. Сервер приложения будет запущен и будет доступен по указанному вами порту.
