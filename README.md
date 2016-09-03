# Reader Monad and Monad Transformer for [Akh Javascript Monad Library](https://github.com/mattbierner/akh)

The ReaderT transformer, `ReaderT`, adds error control to a monad. The base type, `Reader`, provides error logic on its own.

```bash
# To use as standalone package
$ npm install --save akh.maybe

# To use as part of akh library
$ npm install --save akh
```

## Usage
`ReaderT` and `Reader` implement the [Fantasy Land][fl] monad, monoid, functor, and applicative functor interfaces.

<a href="https://github.com/fantasyland/fantasy-land">
    <img src="https://raw.github.com/fantasyland/fantasy-land/master/logo.png" align="right" width="82px" height="82px" alt="Fantasy Land logo" />
</a>

```js
// Reader monad
require('akh.maybe').Reader
require('akh').Reader

// Reader monad transformer
require('akh.maybe').ReaderT
require('akh').ReaderT
```

#### `Reader.run(m)`, `m.run()`
Perform a error computation `m` and return a maybe object result

```js
Reader.run(Reader.just(3).map(x => -x)) === { just: true, value: -3 }
Reader.run(Reader.nothing.map(x => -x)) === { nothing: true }
```

#### `ReaderT.run(t)`, `t.run()`
Same as `Reader.run` but for a monad transformer. Returns an `Reader` value inside of the inner monad.


#### `Reader.maybe(m, def)`, `m.maybe(def)`
Perform an maybe computation `m` and return the result if it succeeds and `def` if it fails.


## Reader Interface

#### `Reader.just(x)`
#### `ReaderT(m).just(x)`
Same as `Reader.of`. Success value.

#### `Reader.nothing`
#### `ReaderT(m).nothing`
Error value


## Contributing
Contributions are welcome.

To get started:

```bash
$ cd akh-maybe
$ npm install # install dev packages
$ npm test # run tests
```

[fl]: https://github.com/fantasyland/fantasy-land

