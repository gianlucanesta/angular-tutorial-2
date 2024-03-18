import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import * as fromApp from './components/store/app.reducer';
import * as AuthActions from './authentication/store/auth.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store); // Ottieni un'istanza del servizio Store
    spyOn(store, 'dispatch'); // Spy sul metodo dispatch per verificare se viene chiamato
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch AutoLogin action on ngOnInit', () => {
    component.ngOnInit(); // Chiamata esplicita al metodo ngOnInit

    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.AutoLogin()); // Verifica che l'azione AutoLogin sia stata dispatcata
  });
});
