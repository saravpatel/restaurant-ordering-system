import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  menuItems = ['Burger', 'Steak'];
  submitted = false;
  hasSelectedItem = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([]),
      specialRequest: [null]
    });
    this.buildItems();
  }
  get items() {
    return this.form.get('items') as FormArray;
  }
  buildItems() {
    this.menuItems.forEach(single => {
      this.items.push(this.buildSingleItem(single));
    });
  }
  buildSingleItem(itemName: string) {
    return this.formBuilder.group({
      name: [itemName],
      quantity: [null, [Validators.pattern('^[0-9]{1,6}$')]],
      sides: this.formBuilder.group({
        selectedSide: [null],
        sideOption: [null]
      }),
      condiments: this.formBuilder.array([]),
      doneness: [null],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let totalQty = 0;
    this.items.controls.forEach(single => {
      totalQty += single.get('quantity')?.value;
    });
    if (totalQty < 1) {
      this.hasSelectedItem = false;
      return;
    } else {
      this.hasSelectedItem = true;
    }
    this.items.controls.forEach((single, idx) => {
      if (!single.get('quantity')?.value || single.get('quantity')?.value < 1) {
        this.items.removeAt(idx);
      }
    });
    sessionStorage.setItem('order', JSON.stringify(this.form.value));
    this.router.navigateByUrl('order-summary');
  }

}
