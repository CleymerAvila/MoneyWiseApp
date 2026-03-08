import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { HeaderComponent } from './components/header/header.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { CategoryIconComponent } from './components/category-icon/category-icon.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';



@NgModule({
  declarations: [
    FormErrorComponent,
    FormInputComponent,
    HeaderComponent,
    TransactionItemComponent,
    CategoryIconComponent,
    TransactionDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormErrorComponent,
    FormInputComponent,
    HeaderComponent,
    TransactionItemComponent,
    CategoryIconComponent,
    TransactionDetailComponent
  ]
})
export class SharedModule { }
