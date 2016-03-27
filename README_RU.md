<p align="right"><a href="README.md">English description</a> | Описание на русском</p>

# Yellfy CLI

> Утилита командной строки для [Yellfy](https://github.com/mrmlnc/yellfy).

[![Travis](https://img.shields.io/travis/mrmlnc/yellfy-cli.svg?style=flat-square)](https://travis-ci.org/mrmlnc/yellfy-cli)
[![NPM version](https://img.shields.io/npm/v/yellfy-cli.svg?style=flat-square)](https://www.npmjs.com/package/yellfy-cli)
[![devDependency Status](https://img.shields.io/david/mrmlnc/yellfy-cli.svg?style=flat-square)](https://david-dm.org/mrmlnc/yellfy-cli#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/mrmlnc/yellfy-cli.svg?style=flat-square)](https://david-dm.org/mrmlnc/yellfy-cli#info=devDependencies)

Эта утилита командной строки предназначена для упрощения и ускорения развертывания нового экземпляра Yellfy.

![Yellfy CLI](https://cloud.githubusercontent.com/assets/7034281/12374689/78c4b532-bcb4-11e5-8d04-ad14d0dfd83c.png)

## Использование

```shell
$ yellfy [--dir, --tag, -i, --install, ...]
```

#### --dir

Развертывание экземпляра Yellfy в указанном каталоге.

```shell
$ yellfy --dir=tmp/yellfy
```

#### --tag

По умолчанию, после установки вы получите последнюю стабильную версию Yellfy. Для установки любой версии вы можете использовать опцию `--тегом`.

```shell
$ yellfy --tag=1.0.0-a
```

#### -i, --install

Начать установку зависимостей после развертывания экземпляра Yellfy.

```shell
$ yellfy -i
```

#### --page

Создание новой страницы.

```shell
$ yellfy --page=features
```

Опционально:

  * `--sass, --scss`
  * `--stylus, --styl`

#### --comp, --component

Создание нового компонента.

```shell
$ yellfy --component=jumbotron
```

Опционально:

  * `--sass, --scss`
  * `--stylus, --styl`

#### -r

Перезаписать существующую страницу или компонент.

```shell
$ yellfy --page=features -r
$ yellfy --component=jumbotron -r
```

## Лицензия

MIT.
