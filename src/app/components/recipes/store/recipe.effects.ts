import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import {
  catchError,
  switchMap,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  baseUrl =
    'https://ng-course-recipe-book-6125d-default-rtdb.europe-west1.firebasedatabase.app/';
  recipesRoute = '/recipes';
  extJson = '.json';

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      tap(() => console.log('Before HTTP Request')),
      switchMap(() =>
        this.http
          .get<Recipe[]>(this.baseUrl + this.recipesRoute + this.extJson)
          .pipe(
            catchError((error) => {
              return of([]);
            })
          )
      ),
      switchMap((recipes) => {
        if (recipes == null) {
          return of([]);
        } else {
          return of(
            recipes.map((recipe) => ({
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            }))
          );
        }
      }),
      map((recipes) => new RecipeActions.SetRecipes(recipes))
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(
            this.baseUrl + this.recipesRoute + this.extJson,
            recipesState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
