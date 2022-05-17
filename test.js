import { invoices } from './invoices.js';
import { plays } from './plays.js';
import { statement } from './core.js';

import { expect } from 'chai';

describe('core', function() {
    let result = statement(invoices()[0], plays());
    console.log(result)
    let arrResult = result.split('\n');

    it('customerName', function() {
        expect(arrResult[0]).equal('Statement for BigCo');
    });

    it('plays', function() {
        expect(arrResult[1]).equal(' Hamlet: $650.00 (55 seats)');
        expect(arrResult[2]).equal(' As You Like It: $580.00 (35 seats)');
        expect(arrResult[3]).equal(' Othello: $500.00 (40 seats)');
    });

    it('totalAmount', function() {
        expect(arrResult[4]).equal('Amount owed is $1,730.00');
    });

    it ('totalCredits', function() {
        expect(arrResult[5]).equal('You earned 47 credits');
    });
});