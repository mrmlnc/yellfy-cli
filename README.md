<p align="right">English description | <a href="README_RU.md">Описание на русском</a></p>

# Yellfy CLI

[![Greenkeeper badge](https://badges.greenkeeper.io/mrmlnc/yellfy-cli.svg)](https://greenkeeper.io/)

> Command line utility to install [Yellfy](https://github.com/mrmlnc/yellfy).

[![Travis](https://img.shields.io/travis/mrmlnc/yellfy-cli.svg?style=flat-square)](https://travis-ci.org/mrmlnc/yellfy-cli)
[![NPM version](https://img.shields.io/npm/v/yellfy-cli.svg?style=flat-square)](https://www.npmjs.com/package/yellfy-cli)
[![devDependency Status](https://img.shields.io/david/mrmlnc/yellfy-cli.svg?style=flat-square)](https://david-dm.org/mrmlnc/yellfy-cli#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/mrmlnc/yellfy-cli.svg?style=flat-square)](https://david-dm.org/mrmlnc/yellfy-cli#info=devDependencies)

This command-line utility is designed to simplify and accelerate the deployment of a new instance of Yellfy.

![Yellfy CLI](https://cloud.githubusercontent.com/assets/7034281/12374689/78c4b532-bcb4-11e5-8d04-ad14d0dfd83c.png)

## Usage

```shell
$ yellfy [--dir, --tag, -i, --install, ...]
```

#### --dir

The deployment instance Yellfy in the specified directory.

```shell
$ yellfy --dir=tmp/yellfy
```

#### --tag

By default, after installation you get latest stable version Yellfy. To install any available version you can use the option `--tag`.

```shell
$ yellfy --tag=1.0.0-a
```

#### -i, --install

Start the installation dependencies after you deploy an instance Yellfy.

```shell
$ yellfy -i
```

#### --page

Creating a new page.

```shell
$ yellfy --page=features
```

Optional:

  * `--sass, --scss`
  * `--stylus, --styl`

#### --comp, --component

Creating a new component.

```shell
$ yellfy --component=jumbotron
```

Optional:

  * `--sass, --scss`
  * `--stylus, --styl`

#### -r

Overwrite an existing page or component.

```shell
$ yellfy --page=features -r
$ yellfy --component=jumbotron -r
```

## License

MIT.
