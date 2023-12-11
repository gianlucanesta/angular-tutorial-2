import { createReducer, on, Action } from '@ngrx/store';
import { increment } from './counter.actions';

export const initialState = 0;

export const counterReducer = createReducer<number>(
  initialState,
  on(increment, (state) => state + 1)
);
