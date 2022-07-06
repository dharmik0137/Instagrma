import { compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        localStorage.setItem('MyData', JSON.stringify(getState()));
        return result;
    };
};

const reHydrateStore = () => {
    if (localStorage.getItem('MyData') !== null) {
        return JSON.parse(localStorage.getItem('MyData')); // re-hydrate the store
    }
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(localStorageMiddleware),
})
export default store;