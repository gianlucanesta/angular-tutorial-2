import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import * as RecipesActions from '../store/recipe.actions';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let routerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      declarations: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy = spyOn(component['router'], 'navigate').and.returnValue(
      Promise.resolve(true)
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch AddIngredients action when onAddToShoppingList is called', () => {
    const dispatchSpy = spyOn(component['store'], 'dispatch');
    const mockIngredients = [
      { name: 'Ingredient 1', amount: 1 },
      { name: 'Ingredient 2', amount: 2 },
    ];
    component.recipe = {
      name: 'Recipe 1',
      description: 'Description 1',
      imagePath: 'imagePath1',
      ingredients: mockIngredients,
    };

    component.onAddToShoppingList();

    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.AddIngredients(mockIngredients)
    );
  });

  it('should navigate to edit route when onEditRecipe is called', () => {
    component.recipe = {
      name: 'Test Recipe',
      description: 'Test Description',
      imagePath: 'test.jpg',
      ingredients: [],
    }; // Inizializza recipe

    component.onEditRecipe();

    expect(routerSpy).toHaveBeenCalledWith(['edit'], {
      relativeTo: component['route'],
    });
  });

  it('should dispatch DeleteRecipe action when onDeleteRecipe is called', () => {
    const dispatchSpy = spyOn(component['store'], 'dispatch');
    component.recipe = {
      name: 'Test Recipe',
      description: 'Test Description',
      imagePath: 'test.jpg',
      ingredients: [],
    }; // Inizializza recipe
    component.id = 1;

    component.onDeleteRecipe();

    expect(dispatchSpy).toHaveBeenCalledWith(
      new RecipesActions.DeleteRecipe(1)
    );
    // Verifica anche che sia chiamato il metodo navigate per navigare alla lista delle ricette
    expect(routerSpy).toHaveBeenCalledWith(['/recipes']);
  });
});
