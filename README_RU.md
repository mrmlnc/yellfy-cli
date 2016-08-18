# yellfy-cli

> Утилита командной строки для [Yellfy](https://github.com/mrmlnc/yellfy).

[![Travis](https://img.shields.io/travis/mrmlnc/yellfy-cli.svg?style=flat-square)](https://travis-ci.org/mrmlnc/yellfy-cli)
[![NPM version](https://img.shields.io/npm/v/yellfy-cli.svg?style=flat-square)](https://www.npmjs.com/package/yellfy-cli)

Yellfy CLI - это утилита командной строки, позволяющая упростить процесс развёртывания нового экземпляра Yellfy и последующей работы с ним.

![gif](https://cloud.githubusercontent.com/assets/7034281/17782945/75c02e8e-657e-11e6-9937-d33b45996629.gif)

## Установка

```shell
$ npm i -g yellfy-cli
```

## Использование

```shell
Использование:
  $ yellfy [<options>]

Опции:
  -h, --help       Показать помощь
  -d, --dir        Развернуть новый экземпляр Yellfy в указанную директорию
  -t, --tag        Развёртывание нового экземпляра Yellfy указанной версии
  -i, --install    После развёртывания нового экземпляра, начать установку зависимостей
  -p, --page       Создать страницу
  -с, --component  Создать компонент
  -r, --rewrite    Перезаписать страницу или компонент, если они уже существуют

Примеры:
  $ yellfy -d tmp/yellfy -i
  $ yellfy -t 2.0.0
  $ yellfy -p features
  $ yellfy -c adsense
```

## Имеет отношение

  * [yellfy](https://github.com/mrmlnc/yellfy)

## История изменений

Для получения полной информации о каждой версии перейдите в [раздел релизов нашего проекта на GitHub](https://github.com/mrmlnc/yellfy-cli/releases).

## Лицензия

Это программное обеспечение распространяется по условиям лицензии MIT.
