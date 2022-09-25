import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id']; //the string 'id' is added cause this is the name we chose for the dynamic parameter in our route set up
      this.editMode = params['id'] != null; //checking if we are in edit mode
      this.initForm();
      // console.log(this.editMode);
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredientsInputArray')).push(
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
    let recipeName = '';
    let imgPath = '';
    let recipeDescription = '';
    let recipeIngredientsInputArray = new FormArray([]); //the formArray is initialized as an empty array

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.recipeId);
      recipeName = recipe.name;
      imgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredientsInputArray.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imgPath: new FormControl(imgPath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredientsInputArray: recipeIngredientsInputArray,
    });
  }
  get ingredientControls() {
    return (
      (<FormArray>this.recipeForm.get('ingredientsInputArray')) as FormArray
    ).controls;
  }
}
