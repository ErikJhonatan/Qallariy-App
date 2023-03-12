// Declarar la función calculateProfitOfEachPartner para determinar la ganancia de cada socio inversionista
function calculateProfitOfEachPartner(totalInvestmentCapital, netProfit, listPartners){
    // Agrego las propiedades de ganancia, porcentaje y ganancia neta a cada socio inversionista
    listPartners.forEach(partner => {
        // Redondeo a 2 decimales
        const profit = (partner.investmentCapital * netProfit) / totalInvestmentCapital;
        partner.percentageProfit = (partner.investmentCapital * 100) / totalInvestmentCapital;
        partner.netProfitPartner = profit - partner.investmentCapital;

        // Redondeo a 2 decimales
        partner.profit = parseFloat(partner.profit.toFixed(2));
        partner.percentageProfit = parseFloat(partner.percentage.toFixed(2));
        partner.netProfitPartner = parseFloat(partner.netProfit.toFixed(2));
    });
    return listPartners;
}
export {calculateProfitOfEachPartner};