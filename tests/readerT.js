"use strict"
const assert = require('chai').assert
const ReaderT = require('../index').ReaderT
const List = require('akh.list').List

const M = ReaderT(List)

const run = (m, r) =>
    List.run(ReaderT.run(m, r))

describe('ReaderT', () => {
    it("should return value for `of`", () => {
        assert.deepEqual([3], run(M.of(3), null))
    })

    it("should return state for `ask`", () => {
        assert.deepEqual([null], run(M.ask, null))
    })

    it("should return mapped state value for `asks`", () => {
        assert.deepEqual([3], run(M.asks(r => r.x), { x: 3 }))
    })

    it("should chain basic `of` to return second value", () => {
        const c = M.of(3)
            .chain(x => M.of(x * 2))

        assert.deepEqual([6], run(c, null))
    })

    it('should chain in order', () => {
        const c = M.of(1)
            .chain(x => M.of(x + 1))
            .chain(x => M.of(x * 2))

        assert.deepEqual([4], run(c, null))
    })

    it('should pass same state to both value for `chain`', () => {
        const c = M.ask.local(_ => ({ x: 100 }))
            .chain(x => M.ask.map(y => x.x / y.x))

        assert.deepEqual([20], run(c, { x: 5 }))
    })

    it("should return empty for `mzero`", () => {
        assert.deepEqual([], run(M.zero))
    })

    it("should concat", () => {
        assert.deepEqual([1, 2], run(M.of(1).concat(M.of(2))))
    })

    it("should pass same state to concats", () => {
        assert.deepEqual([2, 5], run(
            ((M.ask.local(_ => ({ x: 2 })))
                .concat(M.ask)).map(x => x.x),
            {x: 5}))

    })
})
