// Definir la variable que contendrá a la capital total de inversión 
let totalInvestmentCapital;

// Definir la variable que contendrá el nombre de la actividad
let nameActivity;

// Definir el array que contendra a los investment partners (Socios inversionistas);
const investmentPartners = [];

// Definir la variable que contendrá la utilidad neta de la actividad
let netProfit;

// Declarar la función calculateProfitOfEachPartner para determinar la ganancia de cada socio inversionista
function calculateProfitOfEachPartner(totalInvestmentCapital, investmentPartners, netProfit){
    // Agrego las propiedades de ganancia, porcentaje y ganancia neta a cada socio inversionista
    investmentPartners.forEach(partner => {
        
        // Redondeo a 2 decimales
        partner.profit = (partner.investmentCapital * netProfit) / totalInvestmentCapital;
        partner.percentage = (partner.investmentCapital * 100) / totalInvestmentCapital;
        partner.netProfit = partner.profit - partner.investmentCapital;

        // Redondeo a 2 decimales
        partner.profit = parseFloat(partner.profit.toFixed(2));
        partner.percentage = parseFloat(partner.percentage.toFixed(2));
        partner.netProfit = parseFloat(partner.netProfit.toFixed(2));
    });
}