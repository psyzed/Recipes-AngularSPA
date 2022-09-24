import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem(shoppingListForm: NgForm) {
    // console.log(shoppingListForm);
    const formValues = shoppingListForm.value;
    const newIngredient = new Ingredient(formValues.name, formValues.amount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
