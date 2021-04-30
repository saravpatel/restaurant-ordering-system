import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleItemComponent } from './single-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SingleItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SingleItemComponent]
})
export class SingleItemModule { }
