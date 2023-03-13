// Declarar la función calculateProfitOfEachPartner para determinar la ganancia de cada socio inversionista
function calculateProfitOfEachPartner(objResult){

    const {totalInvestmentCapital, netProfit, listPartners} = objResult; 
    // Agrego las propiedades de ganancia, porcentaje y ganancia neta a cada socio inversionista
    listPartners.map(partner => {
        const percetageProfit = (100/totalInvestmentCapital) * partner.investmentCapital;
        const netProfitPartner = netProfit * percetageProfit / 100;
        partner.percentageProfit = percetageProfit;
        partner.netProfitPartner = netProfitPartner;
        // redondeo a dos decimales
        partner.percentageProfit = parseFloat(partner.percentageProfit.toFixed(2));
        partner.netProfitPartner = parseFloat(partner.netProfitPartner.toFixed(2));
        return partner;
    });
    return listPartners;
}

export {calculateProfitOfEachPartner};