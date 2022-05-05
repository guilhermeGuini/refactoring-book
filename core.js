function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
                             { style: "currency", currency: "USD",
                               minimumFractionDigits: 2 }).format;

    function calcAmount(type, audience) {
        let amountResponse;
        switch (type) {
        case "tragedy":
            amountResponse = 40000;
            if (audience > 30) {
                amountResponse += 1000 * (audience - 30);
            }
            break;
        case "comedy":
            amountResponse = 30000;
            if (audience > 20) {
                amountResponse += 10000 + 500 * (audience - 20);
            }
            amountResponse += 300 * audience;
            break;
        default: 
            throw new Error(`unknown type: ${type}`);
        }

        return amountResponse;
    }

    function calVolumeCredits(type, audience) {
         let response = Math.max(audience - 30, 0);
         if ("comedy" === type) {
            response += Math.floor(audience / 5);
         } 
         return response;
    }

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = calcAmount(play.type, perf.audience);
        volumeCredits += calVolumeCredits(play.type, perf.audience);

        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

let invoices = require('./invoices.json');
let plays = require('./plays.json');

let result = statement(invoices[0], plays);
console.log(result)

arrResult = result.split('\n');

console.assert(arrResult[0] === 'Statement for BigCo');
console.assert(arrResult[1] === ' Hamlet: $650.00 (55 seats)');
console.assert(arrResult[2] === ' As You Like It: $580.00 (35 seats)');
console.assert(arrResult[3] === ' Othello: $500.00 (40 seats)');
console.assert(arrResult[4] === 'Amount owed is $1,730.00');
console.assert(arrResult[5] === 'You earned 47 credits');
console.assert(arrResult[6] === '');