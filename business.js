export function amount(type, audience) {
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

export function volumeCredits(type, audience) {
    let response = Math.max(audience - 30, 0);
    if ("comedy" === type) {
        response += Math.floor(audience / 5);
    } 
    return response;
}

export function totalVolumeCredits(performances, plays) {
    let response = 0;
    for (let perf of performances) {
        response += volumeCredits(plays[perf.playID].type, perf.audience);
    }
    return response;
}

export function totalAmount(performances, plays) {
    let response = 0;

    for (let perf of performances) {
        response += amount(plays[perf.playID].type, perf.audience);
    }

    return response;
}

export function createNewObjectWithAmount(performances, plays) {
    let performancesCopy = [];
    Object.assign(performancesCopy, performances);
    for (let perf of performancesCopy) {
        perf.amount = amount(plays[perf.playID].type, perf.audience); 
    }
    return performancesCopy;
}