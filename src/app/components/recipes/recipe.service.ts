import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Hamburger di carne',
      'This is a simple description',
      'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2018/08/hamburger-di-carne/_jcr_content/header-par/image-single.img.jpg/1533820219744.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Onion', 2)]
    ),
    new Recipe(
      'Lasagne alla bolognese',
      'This is a simple description',
      'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2009/12/ricetta-lasagne-bolognese/_jcr_content/header-par/image_single.img.jpg/1462958827968.jpg',
      [
        new Ingredient('Tomatoes', 4),
        new Ingredient('Lasagne', 12),
        new Ingredient('Meat', 2),
      ]
    ),
    new Recipe(
      'Merluzzo Gratinato',
      'This is a simple description',
      'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2018/02/merluzzo-gratinato/_jcr_content/header-par/image-single.img.jpg/1519903977793.jpg',
      [new Ingredient('Fish', 2), new Ingredient('Breadcrumbs', 2)]
    ),
  ];
  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }
}
