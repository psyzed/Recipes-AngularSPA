import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;

  startedEditingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.startedEditingSubscription =
      this.shoppingListService.startedEditing.subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          //populating the inputs with the selected ingredient
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      });
  }

  onSubmit(shoppingListForm: NgForm) {
    // console.log(shoppingListForm);
    const formValues = shoppingListForm.value;
    const newIngredient = new Ingredient(formValues.name, formValues.amount);
    if (this.editMode) {
      this.shoppingListService.upDateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }
}
