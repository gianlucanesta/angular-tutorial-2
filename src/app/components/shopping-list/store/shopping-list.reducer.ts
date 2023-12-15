import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';

interface ShoppingListState {
  ingredients: Ingredient[];
}

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(
  state: ShoppingListState = initialState,
  action: ShoppingListAction.AddIngredient
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload!],
      };
    default:
      return state;
  }
}
