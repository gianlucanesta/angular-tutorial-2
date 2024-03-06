import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import * as RecipesActions from '../store/recipe.actions';
import { Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;
  private storeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {
    this.recipeForm = this.formBuilder.group({
      ingredients: this.formBuilder.array([]),
    });
  }

  get ingredientsFormArray(): FormArray | null {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  onSubmit() {
    const recipeValue = this.recipeForm.value;

    if (this.editMode) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          index: this.id,
          newRecipe: recipeValue,
        })
      );
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(recipeValue));
    }

    this.storeSub = this.actions$
      .pipe(
        ofType(
          RecipesActions.UPDATE_RECIPE_SUCCESS,
          RecipesActions.ADD_RECIPE_SUCCESS
        ),
        take(1)
      )
      .subscribe(() => {
        console.log('Ricetta aggiornata o aggiunta con successo');
        this.onCancel();
      });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$'),
        ]),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    this.store
      .select('recipes')
      .pipe(
        map((recipesState) => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => {
        this.recipeForm = this.formBuilder.group({
          name: [recipe?.name || '', Validators.required],
          imagePath: [recipe?.imagePath || '', Validators.required],
          description: [recipe?.description || '', Validators.required],
          ingredients: this.buildIngredientsFormArray(
            recipe?.ingredients || []
          ),
        });
      });
  }

  private buildIngredientsFormArray(ingredients: Ingredient[]): FormArray {
    return this.formBuilder.array(
      ingredients.map((ingredient) =>
        this.formBuilder.group({
          name: ingredient.name || '',
          amount: ingredient.amount || '',
        })
      )
    );
  }
}
