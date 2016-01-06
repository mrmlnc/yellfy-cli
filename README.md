This is a **DEVELOPER PREVIEW** intended for developers and testers only.

# Yellfy CLI

> Command line utility to install [Yellfy](https://github.com/mrmlnc/yellfy).

[![Travis](https://img.shields.io/travis/mrmlnc/yellfy-cli.svg?style=flat-square)](https://travis-ci.org/mrmlnc/yellfy-cli)
[![NPM version](https://img.shields.io/npm/v/yellfy-cli.svg?style=flat-square)](https://www.npmjs.com/package/yellfy-cli)
[![devDependency Status](https://img.shields.io/david/mrmlnc/yellfy-cli.svg?style=flat-square)](https://david-dm.org/mrmlnc/yellfy-cli#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/mrmlnc/yellfy-cli.svg?style=flat-square)](https://david-dm.org/mrmlnc/yellfy-cli#info=devDependencies)

This command-line utility is designed to simplify and accelerate the deployment of a new instance of Yellfy.

![Yellfy CLI](https://cloud.githubusercontent.com/assets/7034281/12154330/eb5e162a-b4cf-11e5-99ae-edd2cdcb2da3.png)

## Usage

```shell
$ yellfy [--dir, --tag, -i, --install]
```

#### `--dir`

The deployment instance Yellfy in the specified directory.

For example:

```shell
$ yellfy --dir=tmp/yellfy
```

#### `--tag`

By default, after installation you get latest stable version Yellfy. To install any available version you can use the option `--tag`.

For example:

```shell
$ yellfy --tag=1.0.0-a
```

#### `-i` (install)

Start the installation dependencies after you deploy an instance Yellfy.

For example:

```shell
$ yellfy -i
```

## License

MIT.
