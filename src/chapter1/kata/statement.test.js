const { statement } = require('./statement');

describe('statement', () => {
    test('should return a string', () => {
        const invoice = {
            'customer': 'BigCo',
            'performances': []
        };
        const plays = {};

        expect(typeof statement(invoice, plays)).toBe('string');
    });
});