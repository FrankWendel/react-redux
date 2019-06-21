import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore(initialStore) {
  // adding support for redux dev tools
  const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialStore,
    composeEnhanchers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
