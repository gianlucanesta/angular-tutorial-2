import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Hamburger di carne',
  //     'Facili e veloci da realizzare gli hamburger di carne sono un secondo piatto gustoso.',
  //     'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2018/08/hamburger-di-carne/_jcr_content/header-par/image-single.img.jpg/1533820219744.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('Onion', 2)]
  //   ),
  //   new Recipe(
  //     'Lasagne alla bolognese',
  //     'Le lasagne alla bolognese sono un primo piatto tradizionale emiliano, un grande classico gustoso',
  //     'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2009/12/ricetta-lasagne-bolognese/_jcr_content/header-par/image_single.img.jpg/1462958827968.jpg',
  //     [
  //       new Ingredient('Tomatoes', 4),
  //       new Ingredient('Lasagne', 12),
  //       new Ingredient('Meat', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Merluzzo Gratinato',
  //     'This is a simple description',
  //     'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2018/02/merluzzo-gratinato/_jcr_content/header-par/image-single.img.jpg/1519903977793.jpg',
  //     [new Ingredient('Fish', 2), new Ingredient('Breadcrumbs', 2)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromShoppingList.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);

    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
