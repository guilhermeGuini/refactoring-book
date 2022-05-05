export function text(data) {
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
        result += ` ${data.plays[perf.playID].name}: ${format(perf.amount/100)} (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${format(data.totalAmount/100)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
}

export function hml(data) {
    let result = `<h1>Statement for ${data.customer}</h1>`;

    for (let perf of data.performances) {
        result += `<p>${data.plays[perf.playID].name}: ${format(perf.amount/100)} (${perf.audience} seats)</p>`;
    }

    result += `<p>Amount owed is ${format(data.totalAmount/100)}</p>`;
    result += `<p>You earned ${data.totalVolumeCredits} credits</p>`;
    return result;
}

function format(amount) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD",
                                            minimumFractionDigits: 2 }).format(amount);
}