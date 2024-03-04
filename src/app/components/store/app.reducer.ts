import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../../authentication/store/auth.reducer';
import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { ShoppingListActions } from '../shopping-list/store/shopping-list.actions';
import * as fromRecipes from '../recipes/store/recipe.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState, ShoppingListActions> = {
  shoppingList: fromShoppingList.shoppingListReducer as ActionReducer<
    fromShoppingList.State,
    Action
  >,
  auth: fromAuth.authReducer as ActionReducer<fromAuth.State, Action>,
  recipes: fromRecipes.recipesReducer as ActionReducer<
    fromRecipes.State,
    Action
  >,
};
