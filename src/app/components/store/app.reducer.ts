import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../../authentication/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { ShoppingListActions } from '../shopping-list/store/shopping-list.actions';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState, ShoppingListActions> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
};
