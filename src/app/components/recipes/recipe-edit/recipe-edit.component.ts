import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder
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

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  private initForm() {
    const recipe = this.editMode ? this.recipeService.getRecipe(this.id) : null;

    this.recipeForm = this.formBuilder.group({
      name: [recipe?.name || '', Validators.required],
      imagePath: [recipe?.imagePath || '', Validators.required],
      description: [recipe?.description || '', Validators.required],
      ingredients: this.buildIngredientsFormArray(recipe?.ingredients || []),
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
