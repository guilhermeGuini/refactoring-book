import * as business from './business.js';
import { invoices } from './invoices.js';
import { plays } from './plays.js';
import { text } from './report.js';

import { expect } from 'chai';

let data = {
    plays: plays(),
    customer: invoices()[0].customer,
    performances: business.createNewObjectWithAmount(invoices()[0].performances, plays()),
    totalAmount: business.totalAmount(invoices()[0].performances, plays()),
    totalVolumeCredits: business.totalVolumeCredits(invoices()[0].performances, plays())
}

let result = text(data);
console.log(result)
let arrResult = result.split('\n');

describe('text', function() {
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