"use strict"
const ReaderT = require('./trans/reader');
const Reader = require('./type/reader');

module.exports = {
    ReaderT: ReaderT,
    Reader: Reader,

    trans: { reader: ReaderT },
    type: { reader: Reader }
};
