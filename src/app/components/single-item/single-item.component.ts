import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {

  @Input() singleItem: FormGroup = new FormGroup({});

  condiments = ['Ketchup', 'Mustard', 'Lettuce', 'Tomato'];
  doneness = ['Rare', 'Medium', 'Well-done'];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get f() { return this.singleItem.controls; }

  condimentsChanged(event: any) {
    const formArray: FormArray = this.singleItem.get('condiments') as FormArray;

    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    } else{
      formArray.controls.forEach((single, idx) => {
        if (single.value === event.target.value) {
          formArray.removeAt(idx);
          return;
        }
      });
    }
  }

  sideClicked(event: any) {
    const sidesFg = this.singleItem.get('sides') as FormGroup;
    sidesFg.get('sideOption')?.reset();
    if (sidesFg.get('selectedSide')?.value === event.target.value) {
      sidesFg.reset();
    } else if (event.target.value === 'Baked Potato') {
      sidesFg.get('sideOption')?.setValidators([Validators.required, Validators.pattern('^[0-9]{1,6}$')]);
      sidesFg.get('sideOption')?.updateValueAndValidity();
    }
  }

}
