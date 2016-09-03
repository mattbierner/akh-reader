# Reader Monad and Monad Transformer for [Akh Javascript Monad Library](https://github.com/mattbierner/akh)

The ReaderT transformer, `ReaderT`, adds error control to a monad. The base type, `Reader`, provides error logic on its own.

```bash
# To use as standalone package
$ npm install --save akh.reader

# To use as part of akh library
$ npm install --save akh
```

## Usage
`ReaderT` and `Reader` implement the [Fantasy Land][fl] monad, functor, and applicative functor interfaces. ``ReaderT` is also a monoid if the underlying type is.

<a href="https://github.com/fantasyland/fantasy-land">
    <img src="https://raw.github.com/fantasyland/fantasy-land/master/logo.png" align="right" width="82px" height="82px" alt="Fantasy Land logo" />
</a>

```js
// Reader monad
require('akh.reader').Reader
require('akh').Reader

// Reader monad transformer
require('akh.reader').ReaderT
require('akh').ReaderT
```

#### `Reader.run(m, r)`, `m.run(r)`
Perform a reader computation `m` in environment `r` and return result

```js
Reader.run(
    Reader.asks(r => r.a).map(x => x * 2),
    { a: 10, b: 3 }
) === 20
```

#### `ReaderT.run(t)`, `t.run()`
Same as `Reader.run` but for a monad transformer. Returns an `Reader` value inside of the inner monad.


## Reader Interface

#### `Reader.ask`
#### `ReaderT(M).ask`
Return the current environment.

#### `Reader.asks(f)`
#### `ReaderT(M).asks(f)`
Extract a value from the current environment using `f`.

#### `m.local(f)`
#### `t.local(f)`
Execute the current computation in a modified enviroment. `f` maps current enviroment to a new enviroment.


## Contributing
Contributions are welcome.

To get started:

```bash
$ cd akh-reader
$ npm install # install dev packages
$ npm test # run tests
```

[fl]: https://github.com/fantasyland/fantasy-land

