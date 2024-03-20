import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeItemComponent } from './recipe-item.component';
import { Recipe } from '../recipe.model';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeItemComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;

    // Mock a sample recipe
    component.recipe = {
      name: 'Sample Recipe',
      description: 'This is a sample recipe description.',
      imagePath: 'sample-image.jpg',
    } as Recipe;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
