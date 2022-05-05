import * as business from './business.js';
import { invoices } from './invoices.js';
import { plays } from './plays.js';
import { statement } from './core.js';

let data = {
    plays: plays(),
    customer: invoices()[0].customer,
    performances: business.createNewObjectWithAmount(invoices()[0].performances, plays()),
    totalAmount: business.totalAmount(invoices()[0].performances, plays()),
    totalVolumeCredits: business.totalVolumeCredits(invoices()[0].performances, plays())
}

let result = statement(data);
console.log(result)

let arrResult = result.split('\n');

console.assert(arrResult[0] === 'Statement for BigCo');
console.assert(arrResult[1] === ' Hamlet: $650.00 (55 seats)');
console.assert(arrResult[2] === ' As You Like It: $580.00 (35 seats)');
console.assert(arrResult[3] === ' Othello: $500.00 (40 seats)');
console.assert(arrResult[4] === 'Amount owed is $1,730.00');
console.assert(arrResult[5] === 'You earned 47 credits');
console.assert(arrResult[6] === '');