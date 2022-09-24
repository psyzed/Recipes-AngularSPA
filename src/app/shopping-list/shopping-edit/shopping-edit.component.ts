import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService) {}

  startedEditingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  ngOnInit(): void {
    this.startedEditingSubscription =
      this.shoppingListService.startedEditing.subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
      });
  }

  onAddItem(shoppingListForm: NgForm) {
    // console.log(shoppingListForm);
    const formValues = shoppingListForm.value;
    const newIngredient = new Ingredient(formValues.name, formValues.amount);
    this.shoppingListService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }
}
