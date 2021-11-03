import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { offline, createOffline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import ReduxOfflineReducer from '../reducers/reduxOffline';
import ReceiptsReducer from '../reducers/receipts';

const reducer = combineReducers({
  reduxOffline: ReduxOfflineReducer,
  receipts: ReceiptsReducer,
});

const config = {
  ...defaultConfig,
  retry(_action, retries) {
    return (retries + 1) * 1000;
  },
  returnPromises: true,
};

function tickMiddleware(store) {
  return (next) => (action) => {
    if (action.type === 'Offline/SCHEDULE_RETRY') {
      const intervalId = setInterval(() => {
        store.dispatch({ type: 'TICK' });
      }, 1000);
      setTimeout(() => clearInterval(intervalId), action.payload.delay);
    }
    return next(action);
  };
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let newStore;
if (process.env.REACT_APP_OFFLINE_API === 'alternative') {
  const { middleware, enhanceReducer, enhanceStore } = createOffline(config);
  newStore = createStore(
    enhanceReducer(reducer),
    undefined,
    composeEnhancers(applyMiddleware(middleware, tickMiddleware), enhanceStore)
  );
} else {
  newStore = createStore(
    reducer,
    composeEnhancers(offline(config), applyMiddleware(tickMiddleware))
  );
}

const store = newStore;
export default store;
