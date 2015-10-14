# Yellfy cli

Command line utility to install Yellfy.

This command-line utility is designed to simplify and accelerate the deployment of a new instance of Yellfy.

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
