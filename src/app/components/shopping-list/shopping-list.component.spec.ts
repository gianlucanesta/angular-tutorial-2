import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListComponent } from './shopping-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { LoggingService } from '../../logging.service';
import * as fromApp from '../../components/store/app.reducer';
import { of } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Import the CUSTOM_ELEMENTS_SCHEMA

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingListComponent],
      providers: [LoggingService],
      imports: [StoreModule.forRoot(fromApp.appReducer)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add CUSTOM_ELEMENTS_SCHEMA to suppress the error
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    // Mock the store select method to return an observable of an array of ingredients
    spyOn(store, 'select').and.returnValue(
      of({ ingredients: [{ name: 'Ingredient 1', amount: 1 }] })
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch StartEdit action when onEditItem is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const index = 0;

    component.onEditItem(index);

    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.StartEdit(index)
    );
  });

  // You can add more tests for other component methods and behaviors if needed
});
