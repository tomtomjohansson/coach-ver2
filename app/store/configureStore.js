import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import {autoRehydrate} from 'redux-persist';

const middleware = __DEV__ ? applyMiddleware(thunk, reduxImmutableStateInvariant()) : applyMiddleware(thunk);

const enhancer = compose(
    middleware,
    autoRehydrate()
)

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}
