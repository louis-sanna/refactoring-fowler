module.exports = { statement };

function statement(invoice, plays) {
    const performancesData = buildPerformancesData();
    const totalCredits = computeTotalCredits();
    const totalPrice = computeTotalPrice();
    return buildStatement(performancesData, totalCredits, totalPrice);

    function buildPerformancesData() {
        const result = [];
        for (let performance of invoice.performances) {
            result.push({
                performance,
                play: getPlay(performance.playID),
                price: computePerformancePrice(performance)
            });
        }
        return result;
    }

    function getPlay(playID) {
        return plays[playID];
    }

    function computePerformancePrice(performance) {
        let result = 0;
        const play = getPlay(performance.playID);
        switch (play.type) {
        case 'tragedy':
            result = 40000;
            if (performance.audience > 30) {
                result += 1000 * (performance.audience - 30);
            }
            break;
        case 'comedy':
            result = 30000;
            if (performance.audience > 20) {
                result += 10000 + 500 * (performance.audience - 20);
            }
            result += 300 * performance.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
        }
        return result;
    }

    function computeTotalCredits() {
        let result = 0;
        for (let performance of invoice.performances) {
            result += computeCredits(performance);
        }
        return result;
    }

    function computeCredits(performance) {
        let result = 0;
        result += Math.max(performance.audience - 30, 0);
        if ('comedy' === getPlay(performance.playID).type) result += Math.floor(performance.audience / 5);
        return result;
    }

    function computeTotalPrice() {
        let result = 0;
        for (let performance of invoice.performances) {
            result += computePerformancePrice(performance);
        }
        return result;
    }

    function buildStatement(performancesData, totalCredits, totalPrice) {
        let result = `Statement for ${invoice.customer}\n`;
        for (let { performance, play, price } of performancesData) {
            result += ` ${play.name}: ${formatPrice(price)} (${performance.audience} seats)\n`;
        }
        result += `Amount owed is ${formatPrice(totalPrice)}\n`;
        result += `You earned ${totalCredits} credits\n`;
        return result;
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD',
                minimumFractionDigits: 2 }).format(price/100);
    }
}
