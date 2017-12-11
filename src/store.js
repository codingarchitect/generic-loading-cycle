/* eslint fp/no-unused-expression: 1 */
/* eslint fp/no-mutation: 1 */
/* eslint fp/no-let: 1 */
/* eslint better/no-ifs: 1 */
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { createCycleMiddleware, combineCycles } from 'redux-cycles';
import { run } from '@cycle/run';
import { makeHTTPDriver } from '@cycle/http';
import { timeDriver } from '@cycle/time';
import customerSearchCycle from './search-cycle';
import customerGetCycle from './get-cycle';
import searchStore from './search-store';
import fixtures from './tests/customer-data-mock';
import mockSuperAgent from './utils/superagent';

mockSuperAgent([{
  pattern: 'http://localhost:8080/Customers(.*)',
  fixtures,
  callback: (match, data) => ({ body: data }),
}]);

const cycleMiddleware = createCycleMiddleware();
const { makeActionDriver, makeStateDriver } = cycleMiddleware;

// ======================================================
// Store Enhancers
// ======================================================
const enhancers = [];
let composeEnhancers = compose;

const composeWithDevToolsExtension =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line no-underscore-dangle
if (typeof composeWithDevToolsExtension === 'function') {
  composeEnhancers = composeWithDevToolsExtension;
}


const store = createStore(
  combineReducers({ search: searchStore.reducer }),
  {},
  composeEnhancers(applyMiddleware(cycleMiddleware), ...enhancers));

function attachCycle(cycle) {
  return run(cycle, {
    ACTION: makeActionDriver(),
    STATE: makeStateDriver(),
    Time: timeDriver,
    HTTP: makeHTTPDriver(),
  });
}

function main(sources) {
  const pong$ = sources.ACTION
    .filter(action => action.type === 'PING')
    .mapTo({ type: 'PONG' })
    .debug();
  return {
    ACTION: pong$,
  };
}

attachCycle(combineCycles(main, customerSearchCycle, customerGetCycle));

export default store;
