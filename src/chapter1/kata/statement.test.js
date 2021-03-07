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
    test('should return a string', () => {
        const invoice = {
            'customer': 'BigCo',
            'performances': []
        };
        const plays = {};

        expect(statement(invoice, plays)).toBe('Statement for BigCo\nAmount owed is $0.00\nYou earned 0 credits\n');
    });
});