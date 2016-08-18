<p align="right">English description | <a href="README_RU.md">Описание на русском</a></p>

# yellfy-cli

> CLI interface for [Yellfy](https://github.com/mrmlnc/yellfy).

[![Travis](https://img.shields.io/travis/mrmlnc/yellfy-cli.svg?style=flat-square)](https://travis-ci.org/mrmlnc/yellfy-cli)
[![NPM version](https://img.shields.io/npm/v/yellfy-cli.svg?style=flat-square)](https://www.npmjs.com/package/yellfy-cli)

Yellfy CLI is a command-line utility that simplifies the process of deploying a new instance Yellfy and then work with it.

![gif](https://cloud.githubusercontent.com/assets/7034281/17782945/75c02e8e-657e-11e6-9937-d33b45996629.gif)

## Install

```shell
$ npm i -g yellfy-cli
```

## Usage

```shell
Usage:
  $ yellfy [<options>]

Options:
  -h, --help       Show help
  -d, --dir        The deployment instance Yellfy in the specified directory
  -t, --tag        Install the specified version
  -i, --install    Start the installation dependencies after you deploy an instance Yellfy
  -p, --page       Creating a page (templates + styles)
  -СЃ, --component  Creating a component (template + styles)
  -r, --rewrite    Overwrite the page or component

Examples:
  $ yellfy -d tmp/yellfy -i
  $ yellfy -t 2.0.0
  $ yellfy -p features
  $ yellfy -c adsense
```

## Related

  * [yellfy](https://github.com/mrmlnc/yellfy)

## Changelog

See the [Releases section of our GitHub project](https://github.com/mrmlnc/yellfy-cli/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
