import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService
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
}
