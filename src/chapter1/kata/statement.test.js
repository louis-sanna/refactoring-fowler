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
    describe('performance of a comedy', () => {
        test('should include for each performance une line describing it', () => {
            const invoice = {
                'customer': 'BigCo',
                'performances': [{ 'playID': 'hamlet', 'audience': 1 }]
            };
            const plays = { 'hamlet': { 'name': 'Hamlet', 'type': 'comedy' } };

            const output = statement(invoice, plays);

            expect(output).toBe('Statement for BigCo\n' +
              ' Hamlet: $303.00 (1 seats)\n' +
              'Amount owed is $303.00\n' +
              'You earned 0 credits\n');
        });
        test('should include the number of seat for each perfomance', () => {
            const invoice = {
                'customer': 'BigCo',
                'performances': [{ 'playID': 'hamlet', 'audience': 2 }]
            };
            const plays = { 'hamlet': { 'name': 'Hamlet', 'type': 'comedy' } };

            const output = statement(invoice, plays);

            expect(output).toBe('Statement for BigCo\n' +
              ' Hamlet: $306.00 (2 seats)\n' +
              'Amount owed is $306.00\n' +
              'You earned 0 credits\n');
        });
        test('should cost the same price per seat below 20 seats (included)', () => {
            const invoice = {
                'customer': 'BigCo',
                'performances': [{ 'playID': 'hamlet', 'audience': 20 }]
            };
            const plays = { 'hamlet': { 'name': 'Hamlet', 'type': 'comedy' } };

            const output = statement(invoice, plays);

            expect(output).toBe('Statement for BigCo\n' +
              ' Hamlet: $360.00 (20 seats)\n' +
              'Amount owed is $360.00\n' +
              'You earned 4 credits\n');
        });
        test('should cost extra per seat above 20 seats', () => {
            const invoice = {
                'customer': 'BigCo',
                'performances': [{ 'playID': 'hamlet', 'audience': 31 }]
            };
            const plays = { 'hamlet': { 'name': 'Hamlet', 'type': 'comedy' } };

            const output = statement(invoice, plays);

            expect(output).toBe('Statement for BigCo\n' +
              ' Hamlet: $548.00 (31 seats)\n' +
              'Amount owed is $548.00\n' +
              'You earned 7 credits\n');
        });

        test('should give 1 credit for every 5 attentees', () => {
            const invoice = {
                'customer': 'BigCo',
                'performances': [{ 'playID': 'hamlet', 'audience': 30 }]
            };
            const plays = { 'hamlet': { 'name': 'Hamlet', 'type': 'comedy' } };

            const output = statement(invoice, plays);

            expect(output).toBe('Statement for BigCo\n' +
              ' Hamlet: $540.00 (30 seats)\n' +
              'Amount owed is $540.00\n' +
              'You earned 6 credits\n');
        });
    });
});