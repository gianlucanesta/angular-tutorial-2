import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class RecipeEffects {
  baseUrl =
    'https://ng-course-recipe-book-6125d-default-rtdb.europe-west1.firebasedatabase.app/';
  recipesRoute = '/recipes';
  extJson = '.json';

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          this.baseUrl + this.recipesRoute + this.extJson
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => new RecipeActions.SetRecipes(recipes))
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
