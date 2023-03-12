export function calculateProfitOfEachPartner({totalInvestmentCapital, netProfit, listPartners}) {
    const total = Math.round(Number(totalInvestmentCapital) * 100);
    const profit = Math.round(Number(netProfit) * 100);
    if (!Number.isSafeInteger(total) || total <= 0 || !Number.isSafeInteger(profit) ||
        !Array.isArray(listPartners) || !listPartners.length) throw new Error('Capital inválido');
    const amounts = listPartners.map(partner => Math.round(Number(partner.investmentCapital) * 100));
    if (amounts.some(amount => !Number.isSafeInteger(amount) || amount <= 0) ||
        amounts.reduce((sum, amount) => sum + amount, 0) !== total) throw new Error('Aportes inconsistentes');
    const sign = profit < 0 ? -1 : 1;
    const numerator = BigInt(Math.abs(profit));
    const denominator = BigInt(total);
    const shares = amounts.map((amount, index) => {
        const weighted = numerator * BigInt(amount);
        return {index, cents: Number(weighted / denominator), remainder: weighted % denominator};
    });
    let remaining = Math.abs(profit) - shares.reduce((sum, share) => sum + share.cents, 0);
    const ranked = [...shares].sort((a, b) => a.remainder === b.remainder ? a.index - b.index : a.remainder > b.remainder ? -1 : 1);
    for (const share of ranked) {
        if (remaining <= 0) break;
        share.cents += 1;
        remaining -= 1;
    }
    return listPartners.map((partner, index) => ({...partner,
        percentageProfit: Number((100 * amounts[index] / total).toFixed(2)),
        netProfitPartner: sign * shares[index].cents / 100
    }));
}
