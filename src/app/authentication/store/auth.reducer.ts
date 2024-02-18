import { User } from './../user/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | null;
}

const initialState = {
  user: null,
};

export const authReducer = (
  state: State = initialState,
  action: AuthActions.AuthActions
): State => {
  console.log(state);
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
