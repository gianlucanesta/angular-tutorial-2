import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Hamburger di carne',
      'This is a simple description',
      'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2018/08/hamburger-di-carne/_jcr_content/header-par/image-single.img.jpg/1533820219744.jpg'
    ),
    new Recipe(
      'Lasagne alla bolognese',
      'This is a simple description',
      'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2009/12/ricetta-lasagne-bolognese/_jcr_content/header-par/image_single.img.jpg/1462958827968.jpg'
    ),
    new Recipe(
      'Merluzzo Gratinato',
      'This is a simple description',
      'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2018/02/merluzzo-gratinato/_jcr_content/header-par/image-single.img.jpg/1519903977793.jpg'
    ),
  ];
  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }
}
