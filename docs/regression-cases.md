# Regression cases

Prepared for this change. **Not executed.** Tests, manual checks, lint and builds require explicit user authorization. Use isolated fixtures; never run destructive cases against production.

| Case | Input or setup | Expected outcome |
| --- | --- | --- |
| Capital | Initial capital=0, NaN, negative, or unsafe amount | Rejected before distribution |
| Contributions | Total=100 with partners [40,50]; zero or negative partner | Inconsistent contributions rejected |
| Rounding | Total=3; profit=0.01; three partners contributing 1 | Allocated shares sum to exactly 0.01 |
| Storage | Malformed JSON, wrong shape, invalid dates or invalid partner objects | History renders safely |
| Templates | Activity or partner name contains <img onerror=...> | Displayed as text; no markup execution |
| Chart cleanup | Open/close result repeatedly then resize | Previous Chart destroyed; resize listeners do not accumulate |

Automated cases are prepared in `tests/regression.test.mjs`. After authorization, run `node --test tests/regression.test.mjs`. They have not been executed.

## Additional cases (not executed)

| Case | Input or setup | Expected outcome |
| --- | --- | --- |
| Unavailable storage | setItem throws on saving or deleting a result | UI displays failure; history is not reported as saved or deleted |
| Result table | Open current and previous results repeatedly | One tbody, valid rows, no duplicate IDs; September date has a two-digit month |
