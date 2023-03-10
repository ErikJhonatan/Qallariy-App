function createResult(nameActivity, startUpCapital, endCapital, investmentPartners){
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    const createdAt = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
    const netProfit = endCapital - startUpCapital;
    const result = {
        nameActivity : nameActivity,
        startUpCapital : startUpCapital,
        endCapital : endCapital,
        investmentPartners : investmentPartners,
        netProfit : netProfit,
        createdAt: new Date(createdAt)
    };
    return result;
}
function saveResults(nameItemLocalStorage, objectResult){
    if(localStorage.getItem(nameItemLocalStorage) === null){
        localStorage.setItem(nameItemLocalStorage, JSON.stringify([]));
    }
    const results = getResults(nameItemLocalStorage);
    results.push(objectResult);
    localStorage.setItem(nameItemLocalStorage, JSON.stringify(results));
}
function getResults(nameItemLocalStorage){
    const results = localStorage.getItem(nameItemLocalStorage);
    const resultParse = JSON.parse(results);
    resultParse.map(result => {
        result.createdAt = new Date(result.createdAt);
        return result;
    });
    return resultParse;
}