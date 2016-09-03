"use strict"
const assert = require('chai').assert
const Reader = require('../index').Reader

describe('Reader', () => {
    it("should return value for `of`", () => {
        assert.strictEqual(3, Reader.run(Reader.of(3), null))
        assert.strictEqual(3, Reader.of(3).run(null))
    })

    it("should return state for `ask`", () => {
        assert.strictEqual(null, Reader.run(Reader.ask, null))
    })

    it("should return mapped state value for `asks`", () => {
        assert.strictEqual(3, Reader.run(Reader.asks(r => r.x), { x: 3 }))
    })

    it("should chain basic `of` to return second value", () => {
        const c = Reader.of(3)
            .chain(x => Reader.of(x * 2))

        assert.strictEqual(6, Reader.run(c, null))
    })

    it('should chain in order', () => {
        const c = Reader.of(1)
            .chain(x => Reader.of(x + 1))
            .chain(x => Reader.of(x * 2))

        assert.strictEqual(4, Reader.run(c, null))
    })

    it('should pass same state to both value for chain', () => {
        const c = Reader.ask.local(_ => ({ x: 100 }))
            .chain(x => Reader.ask.map(y => x.x / y.x))

        assert.strictEqual(20, Reader.run(c, { x: 5}))
    })

    it("map_right", () => {
        const c = Reader.of(3)
            .map(x => x * 2)
            .chain(x => Reader.of(x / 3))

        assert.strictEqual(2, Reader.run(c, 'def'))
    })
})
