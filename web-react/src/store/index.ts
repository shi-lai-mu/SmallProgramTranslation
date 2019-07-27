import { createStore, combineReducers } from 'redux';
import config from '../config/default';


const defaultReducer = (store: any = {}, action: any) => {
  return {
    cart: [
      {
        product: 'bread 700g',
        quantity: 2,
        unitCost: 90
      },
      {
        product: 'milk 500ml',
        quantity: 1,
        unitCost: 47
      }
    ]
  };
}

const rootReducer = combineReducers({
  defaultReducer,
  config,
});
const store = createStore(rootReducer);

export {
  store
};
console.log('initial state: ', store.getState());