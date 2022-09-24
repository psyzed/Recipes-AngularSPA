import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomato', 1),
    new Ingredient('Potato', 2),
  ];

  getIngredients() {
    //getting a copy of the ingredients array
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    //getting the ingredient that we want to select and edit from the array
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    //adding a new ingredient and nexting that the ingredients array has changed
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    //adding multiple ingredients and nexting that the ingredients array has changed!
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  upDateIngredient(index: number, newIngredient: Ingredient) {
    //updating the ingredient and nexting a copy of it
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    //this deletes an ingredient from the array with the splice method, it starts at the index and deletes 1 item.
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
