import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { ShoppingEditComponent } from './shopping-edit.component';
import * as fromApp from '../../store/app.reducer';
import { of } from 'rxjs';
import { Ingredient } from './../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';

describe('ShoppingEditComponent', () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      imports: [FormsModule, StoreModule.forRoot(fromApp.appReducer)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    // Mock store select method to return observable with editMode false
    spyOn(store, 'select').and.returnValue(of({ editedIngredientIndex: -1 }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with editMode false', () => {
    expect(component.editMode).toBeFalse();
  });

  it('should call onSubmit method when form is submitted', () => {
    const onSubmitSpy = spyOn(component, 'onSubmit').and.callThrough();
    const form: Partial<NgForm> = {
      value: { name: 'Test Ingredient', amount: 1 },
    };

    fixture.detectChanges();

    const formElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('should dispatch AddIngredient action when onSubmit is called with editMode false', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.editMode = false;

    const formValue = { name: 'Test Ingredient', amount: 1 };
    const form = { value: formValue, reset: () => {} } as NgForm;

    component.onSubmit(form);

    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.AddIngredient(
        new Ingredient('Test Ingredient', 1)
      )
    );
  });

  it('should call onClear method when Clear button is clicked', () => {
    const onClearSpy = spyOn(component, 'onClear').and.callThrough();
    const clearButton = fixture.nativeElement.querySelector('.btn-primary');

    clearButton.click();

    expect(onClearSpy).toHaveBeenCalled();
  });

  it('should dispatch StopEdit action when onClear is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onClear();

    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.StopEdit()
    );
  });

  it('should dispatch UpdateIngredient action when onSubmit is called with editMode true', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.editMode = true;
    component.editedItemIndex = 1;
    component.editedItem = new Ingredient('Edited Ingredient', 2);

    const formValue = { name: 'Updated Ingredient', amount: 3 };
    const form = { value: formValue, reset: () => {} } as NgForm;

    component.onSubmit(form);

    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.UpdateIngredient(
        new Ingredient('Updated Ingredient', 3)
      )
    );
  });

  it('should dispatch DeleteIngredient action when onDelete is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.editMode = true;
    component.editedItemIndex = 1;
    component.editedItem = new Ingredient('Edited Ingredient', 2);

    component.onDelete();

    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.DeleteIngredient(1)
    );
  });

  it('should unsubscribe from store subscription on ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
