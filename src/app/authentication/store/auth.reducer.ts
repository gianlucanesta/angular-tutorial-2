import { appReducer } from './../../components/store/app.reducer';
import { User } from './../user/user.model';
import { Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | null;
}

const initialState = {
  user: null,
};

export const authReducer = (
  state: State | undefined = initialState,
  action: Action
): State => {
  switch (action.type) {
    default:
      return state;
  }
};
