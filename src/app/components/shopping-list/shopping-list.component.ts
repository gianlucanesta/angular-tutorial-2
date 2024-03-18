import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../../logging.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../components/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Observable<{ ingredients: Ingredient[] }>;
  private subscription!: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    this.loggingService.printLog('Hello from ShoppinglistComponent ngOnInit');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
