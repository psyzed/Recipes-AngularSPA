import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'A tasty Margarita',
      'https://cdn.pixabay.com/photo/2017/12/05/20/09/pizza-3000274_960_720.jpg',
      [
        new Ingredient('Dough', 1),
        new Ingredient('Tomato Sauce', 1),
        new Ingredient('Cheese', 2),
      ]
    ),
    new Recipe(
      'Cheese Burger',
      'Very big burger filled with cheese!',
      'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Double-Cheeseburger-1:product-header-desktop?wid=829&hei=455&dpr=off',
      [
        new Ingredient('Pickles', 2),
        new Ingredient('Beef', 1),
        new Ingredient('Union', 1),
        new Ingredient('Bun', 1),
        new Ingredient('Cheese', 1),
        new Ingredient('Ketchup', 1),
        new Ingredient('Mustard', 1),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
