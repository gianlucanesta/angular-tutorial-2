import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './../../authentication/store/auth.actions';
import * as RecipeActions from './../recipes/store/recipe.actions';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [NgbDropdownModule, NgbNavModule, CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;

  isAuthenticated = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  onRecipeClick() {
    this.router.navigate(['/recipes']);
  }

  onShoppingListClick() {
    this.router.navigate(['/shopping-list']);
  }

  onAuthClick() {
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        // console.log(!user);
        // console.log('user', !!user);
        // console.log('authenticated', this.isAuthenticated);
      });
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
