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
    let results = JSON.parse(localStorage.getItem(nameItemLocalStorage));
    if(results === null){
        results = [];
    }
    results.push(objectResult);
    localStorage.setItem(nameItemLocalStorage, JSON.stringify(results));
}

function getResults(){
    const nameItemLocalStorage = 'results_qallariy-App-1.0.0';
    const results = JSON.parse(localStorage.getItem(nameItemLocalStorage));

    if (results === null) {
        return [];
    } else {
        results.forEach(result => {
            result.createdAt = new Date(result.createdAt);
        });
        
    }
    
    return results;
}

function deleteByCreatedAt(createdAt) {
    const results = getResults();
    const newResults = results.filter(resultFilter => {
    const resultCreatedAt = new Date(resultFilter.createdAt);
    const targetCreatedAt = new Date(createdAt);
      return resultCreatedAt.getTime() !== targetCreatedAt.getTime();
    });
    localStorage.setItem('results_qallariy-App-1.0.0', JSON.stringify(newResults));
    console.log('newResults', newResults);
    console.log('localStorage', localStorage.getItem('results_qallariy-App-1.0.0'));
  }
export {createResult, saveResults, getResults, deleteByCreatedAt};