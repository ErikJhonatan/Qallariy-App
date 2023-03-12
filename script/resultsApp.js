function createResult(nameActivity, totalInvestmentCapital, capitalFinal, listPartners = []) {
    const now = new Date();
    const netProfit = parseFloat(capitalFinal) - parseFloat(totalInvestmentCapital);
    const result = {
        nameActivity: nameActivity,
        totalInvestmentCapital: parseFloat(totalInvestmentCapital),
        capitalFinal: parseFloat(capitalFinal),
        netProfit: netProfit,
        listPartners: listPartners,
        createdAt: now
    };
    return result;
}
function saveResults(objectResult){
    const nameItemLocalStorage = 'results_qallariy-App-1.0.0';
    let results = getResults();
    if(results === null){
        results = [];
    }
    results.push(objectResult);
    localStorage.setItem(nameItemLocalStorage, JSON.stringify(results));
}

function getResults() {
    try {
        const results = JSON.parse(localStorage.getItem('results_qallariy-App-1.0.0'));
        if (!Array.isArray(results)) return [];
        return results.filter(result => result && Array.isArray(result.listPartners) &&
            Number.isFinite(result.totalInvestmentCapital) && Number.isFinite(result.netProfit) && result.listPartners.every(partner => partner && typeof partner.name === 'string' && Number.isFinite(partner.investmentCapital) && Number.isFinite(partner.netProfitPartner) && Number.isFinite(partner.percentageProfit)) &&
            Number.isFinite(new Date(result.createdAt).getTime()))
            .map(result => ({...result, createdAt: new Date(result.createdAt)}));
    } catch { return []; }
}

function deleteByCreatedAt(createdAt) {
    const results = getResults();
    const newResults = results.filter(resultFilter => {
    const resultCreatedAt = new Date(resultFilter.createdAt);
    const targetCreatedAt = new Date(createdAt);
      return resultCreatedAt.getTime() !== targetCreatedAt.getTime();
    });
    localStorage.setItem('results_qallariy-App-1.0.0', JSON.stringify(newResults));
  }
export {createResult, saveResults, getResults, deleteByCreatedAt};
