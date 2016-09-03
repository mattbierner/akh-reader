"use strict"

/**
 * Define reader monad operations
 */
const ReaderMonad = (Instance, spec) => {
    /**
     * Extract a value from the current environment.
     * 
     * @param f Function mapping environment to value.
     */
    Instance.asks = Instance.prototype.asks = spec.asks

    /**
     * Modify the current environment.
     * 
     * @param f Fucntion mapping current environment to new environment.
     */
    Instance.prototype.local = spec.local

    /**
     * Extract the current environment
     */
    Instance.ask = Instance.prototype.ask = spec.asks(x => x)

    return Instance
}

module.exports = ReaderMonad