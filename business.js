export function calcAmount(type, audience) {
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

export function calVolumeCredits(type, audience) {
    let response = Math.max(audience - 30, 0);
    if ("comedy" === type) {
        response += Math.floor(audience / 5);
    } 
    return response;
}

export function calcTotalCredits(performances, plays) {
    let response = 0;
    for (let perf of performances) {
        response += calVolumeCredits(plays[perf.playID].type, perf.audience);
    }
    return response;
}

export function calcTotalAmount(performances, plays) {
    let response = 0;

    for (let perf of performances) {
        response += calcAmount(plays[perf.playID].type, perf.audience);
    }

    return response;
}