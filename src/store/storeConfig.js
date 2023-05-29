import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

// Reducers
import search from './reducers/search.reducer';
import filters from './reducers/filters.reducer';


const rootReducer = combineReducers({
    search: search,
    filters:filters
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'] // only navigation will be persisted
}

const middleware = applyMiddleware(
    promise,
    thunk,
);

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const STORE = createStore(persistedReducer, composeEnhancers(middleware));
export const PERSISTOR = persistStore(STORE);