import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../../logging.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Observable<{ ingredients: Ingredient[] }>;
  private subscription!: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    this.loggingService.printLog('Hello from ShoppinglistComponent ngOnInit');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.igChangeSub.unsubscribe();
  }

  onIngredientAdded(ingredient: Ingredient) {
    // this.ingredients.push(ingredient);
    // console.log(ingredient);
  }
}
