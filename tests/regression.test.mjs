import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function load(relativePath) {
  const source = await readFile(new URL(relativePath, import.meta.url), 'utf8');
  return import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
}
const {calculateProfitOfEachPartner: calculate} = await load('../script/app.js');
test('rejects zero capital and inconsistent contributions', () => {
  assert.throws(() => calculate({totalInvestmentCapital: 0, netProfit: 1, listPartners: []}));
  assert.throws(() => calculate({totalInvestmentCapital: 100, netProfit: 10, listPartners: [{investmentCapital: 40}, {investmentCapital: 50}]}));
});
test('preserves cents and does not mutate contributors', () => {
  const partners = [{investmentCapital: 1}, {investmentCapital: 1}, {investmentCapital: 1}];
  const result = calculate({totalInvestmentCapital: 3, netProfit: 0.01, listPartners: partners});
  assert.equal(result.reduce((sum, item) => sum + Math.round(item.netProfitPartner * 100), 0), 1);
  assert.equal(partners[0].percentageProfit, undefined);
});
const {getResults} = await load('../script/resultsApp.js');
test('handles corrupt saved history', () => {
  const previous = globalThis.localStorage;
  try {
    globalThis.localStorage = {getItem: () => '{broken'};
    assert.deepEqual(getResults(), []);
    globalThis.localStorage = {getItem: () => '{}'};
    assert.deepEqual(getResults(), []);
  } finally { globalThis.localStorage = previous; }
});
test('small distributions never create negative positive-profit shares', () => {
  const listPartners = Array.from({length: 4}, () => ({investmentCapital: 1}));
  const result = calculate({totalInvestmentCapital: 4, netProfit: 0.02, listPartners});
  assert.equal(result.reduce((sum, partner) => sum + Math.round(partner.netProfitPartner * 100), 0), 2);
  assert.ok(result.every(partner => partner.netProfitPartner >= 0));
});
