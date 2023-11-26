import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { EMPTY, exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
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
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (user) {
          const authToken = user.token ? user.token : '';
          return this.http.get<Recipe[]>(
            this.baseUrl + this.recipesRoute + this.extJson,
            {
              params: new HttpParams().set('auth', authToken),
            }
          );
        } else {
          return EMPTY;
        }
      }),
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
      })
    );
  }
}
