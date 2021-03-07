const { statement } = require('./statement');

describe('statement', () => {
    test('should return a basic statement', () => {
        const invoice = {
            'customer': 'BigCo',
            'performances': []
        };
        const plays = {};

        const output = statement(invoice, plays);

        expect(output).toBe('Statement for BigCo\nAmount owed is $0.00\nYou earned 0 credits\n');
    });
    describe('performance of a tragedy', () => {
        test('should include for each performance une line describing it', () => {
            const invoice = {
                'customer': 'BigCo',
                'performances': [{ 'playID': 'hamlet', 'audience': 1 }]
            };
            const plays = { 'hamlet': { 'name': 'Hamlet', 'type': 'tragedy' } };

            const output = statement(invoice, plays);

            expect(output).toBe('Statement for BigCo\n' +
              ' Hamlet: $400.00 (1 seats)\n' +
              'Amount owed is $400.00\n' +
              'You earned 0 credits\n');
        });
        test('should include the number of seat for each perfomance', () => {
            const invoice = {
                'customer': 'BigCo',
                'performances': [{ 'playID': 'hamlet', 'audience': 2 }]
            };
            const plays = { 'hamlet': { 'name': 'Hamlet', 'type': 'tragedy' } };

            const output = statement(invoice, plays);

            expect(output).toBe('Statement for BigCo\n' +
              ' Hamlet: $400.00 (2 seats)\n' +
              'Amount owed is $400.00\n' +
              'You earned 0 credits\n');
        });
        test('should cost the same price below 30 seats (included)', () => {
            const invoice = {
                'customer': 'BigCo',
                'performances': [{ 'playID': 'hamlet', 'audience': 30 }]
            };
            const plays = { 'hamlet': { 'name': 'Hamlet', 'type': 'tragedy' } };

            const output = statement(invoice, plays);

            expect(output).toBe('Statement for BigCo\n' +
              ' Hamlet: $400.00 (30 seats)\n' +
              'Amount owed is $400.00\n' +
              'You earned 0 credits\n');
        });
        test('should cost extra above 30 seats', () => {
            const invoice = {
                'customer': 'BigCo',
                'performances': [{ 'playID': 'hamlet', 'audience': 31 }]
            };
            const plays = { 'hamlet': { 'name': 'Hamlet', 'type': 'tragedy' } };

            const output = statement(invoice, plays);

            expect(output).toBe('Statement for BigCo\n' +
              ' Hamlet: $410.00 (31 seats)\n' +
              'Amount owed is $410.00\n' +
              'You earned 1 credits\n');
        });

        test('should give 1 credit for each seat beyond 30', () => {
            const invoice = {
                'customer': 'BigCo',
                'performances': [{ 'playID': 'hamlet', 'audience': 35 }]
            };
            const plays = { 'hamlet': { 'name': 'Hamlet', 'type': 'tragedy' } };

            const output = statement(invoice, plays);

            expect(output).toBe('Statement for BigCo\n' +
              ' Hamlet: $450.00 (35 seats)\n' +
              'Amount owed is $450.00\n' +
              'You earned 5 credits\n');
        });
    });
});