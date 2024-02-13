import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';
import { Action } from '@ngrx/store';

interface ShoppingListState {
  ingredients: Ingredient[];
}

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListAction.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListAction.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...action.payload.ingredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: [],
      };
    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== action.payload;
        }),
      };
    case ShoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}
