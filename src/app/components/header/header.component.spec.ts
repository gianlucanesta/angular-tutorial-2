import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { HeaderComponent } from './header.component';
import * as AuthActions from './../../authentication/store/auth.actions';
import * as RecipeActions from './../recipes/store/recipe.actions';
import * as fromApp from '../store/app.reducer';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot(fromApp.appReducer)],
      // Remove the declarations array since HeaderComponent is standalone
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not dispatch AutoLogin action on ngOnInit if user is authenticated', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    // Mocking the behavior of the store select method to return an observable of a user object
    spyOn(store, 'select').and.returnValue(of({ user: {} }));

    component.ngOnInit();

    fixture.detectChanges();

    expect(dispatchSpy).not.toHaveBeenCalledWith(jasmine.anything());
  });

  it('should dispatch StoreRecipes action when onSaveData is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onSaveData();

    expect(dispatchSpy).toHaveBeenCalledWith(new RecipeActions.StoreRecipes());
  });

  it('should dispatch FetchRecipes action when onFetchData is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onFetchData();

    expect(dispatchSpy).toHaveBeenCalledWith(new RecipeActions.FetchRecipes());
  });

  it('should dispatch Logout action when onLogOut is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onLogOut();

    expect(dispatchSpy).toHaveBeenCalledWith(new AuthActions.Logout());
  });
});
