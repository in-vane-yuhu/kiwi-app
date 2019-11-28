import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const createStoreWithMW = applyMiddleware(thunk)(createStore);
const store = createStoreWithMW(reducers);

export default store;
