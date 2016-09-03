"use strict"
const Identity = require('akh.identity').Identity
const ReaderT = require('../trans/reader')

/**
 * Reader monad
 */
const Reader = ReaderT(Identity)

/**
 * Extract result from Reader monad.
 * 
 * @param m Reader.
 * @param r State
 */
Reader.run = (m, r) =>
    Identity.run(ReaderT.run(m, r))

Reader.prototype.run = function(r) {
    return Reader.run(this, r)
}

module.exports = Reader
