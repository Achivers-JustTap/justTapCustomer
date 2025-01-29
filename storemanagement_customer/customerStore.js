import { createStore, applyMiddleware, combineReducers } from 'redux';
import customerReducer from './reducers_customer/customerReducer';

// Combine Reducers
const rootReducer = combineReducers({
    customer: customerReducer
});

// Create Store with Middleware
const customerStore = createStore(rootReducer);

export default customerStore;
