"use strict"
const spec = require('akh.core.spec')
const ReaderMonad = require('../spec/reader')

const runReaderT = (m, r) => m._run(r)

/**
 * Reader monad transformer.
 * 
 * @param m Base monad.
 */
const ReaderT = m => {
    const Instance = function (run) {
        this._run = run
    }

    spec.Monad(Instance,
        x => new Instance(_ => m.of(x)),

        function (f) {
            return new Instance(r =>
                runReaderT(this, r).chain(a => runReaderT(f(a), r)))
        })

    spec.Monoid(Instance,
        new Instance(_ => m.zero),

        function (b) {
            return new Instance(r =>
                runReaderT(this, r).concat(runReaderT(b, r)))
        })

    spec.Transformer(Instance, m,
        t =>
            new Instance(_ => t))

    ReaderMonad(Instance, {
        asks: f => new Instance(r => m.of(f(r))),
        local: function (f) {
            return new Instance(r => runReaderT(this, f(r)))
        }
    })

    Instance.prototype.run = function (r) {
        return ReaderT.run(this, r)
    }

    return Instance
}

/**
 * Get an inner monad of an `Reader` value.
 * 
 * @param m ReaderT computation.
 */
ReaderT.run = runReaderT


module.exports = ReaderT
