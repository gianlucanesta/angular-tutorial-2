import { createReducer, on } from '@ngrx/store';
import { increment } from './counter.actions';

export const initialState = 0;

export const counterReducer = createReducer<number>(
  initialState,
  on(increment, (state, action) => state + action.value)
);
