import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { EMPTY, catchError, map, pipe, take, tap } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  baseUrl =
    'https://ng-course-recipe-book-6125d-default-rtdb.europe-west1.firebasedatabase.app/';
  recipesRoute = '/recipes';
  extJson = '.json';

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http
      .put(this.baseUrl + this.recipesRoute + this.extJson, recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(this.baseUrl + this.recipesRoute + this.extJson)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipesService.setRecipes(recipes);
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        }),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
