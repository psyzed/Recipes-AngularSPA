import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id']; //the string 'id' is added cause this is the name we chose for the dynamic parameter in our route set up
      this.editMode = params['id'] != null; //checking if we are in edit mode
      // console.log(this.editMode);
    });
  }
}
