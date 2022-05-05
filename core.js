import * as business from './business.js';
import { invoices } from './invoices.js';
import { plays } from './plays.js';

function statement(invoice, plays, data) {
    let result = `Statement for ${data.customer}\n`;

    function format(amount) {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD",
                                                minimumFractionDigits: 2 }).format(amount);
    }

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = business.calcAmount(play.type, perf.audience);
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
    }

    let volumeCredits = business.calcTotalCredits(invoice.performances, plays);
    let totalAmount = business.calcTotalAmount(invoice.performances, plays);

    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

let data = {
    customer: invoices()[0].customer,
    performances: invoices()[0].performances
}

let result = statement(invoices()[0], plays(), data);
console.log(result)

let arrResult = result.split('\n');

console.assert(arrResult[0] === 'Statement for BigCo');
console.assert(arrResult[1] === ' Hamlet: $650.00 (55 seats)');
console.assert(arrResult[2] === ' As You Like It: $580.00 (35 seats)');
console.assert(arrResult[3] === ' Othello: $500.00 (40 seats)');
console.assert(arrResult[4] === 'Amount owed is $1,730.00');
console.assert(arrResult[5] === 'You earned 47 credits');
console.assert(arrResult[6] === '');