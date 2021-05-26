import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import RootReducer from './rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'data',
    storage: storage,
};
const pReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(
    pReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default { store, persistor };
