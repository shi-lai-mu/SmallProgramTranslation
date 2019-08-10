import { createStore, combineReducers } from 'redux';


const defaultReducer = () => {
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
});
const store = createStore(rootReducer);

export {
  store
};
console.log('initial state: ', store.getState());