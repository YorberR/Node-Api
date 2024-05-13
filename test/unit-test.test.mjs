import { assert } from 'chai';

function addValue(a, b) {
    return a + b;
}

describe('api test', () => {
    it('test', () => {
        let data = addValue(1, 2);
        assert.equal(data, 3);
    });
});

