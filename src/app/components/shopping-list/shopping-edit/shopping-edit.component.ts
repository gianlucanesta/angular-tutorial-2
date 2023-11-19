import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.slService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
  }
}