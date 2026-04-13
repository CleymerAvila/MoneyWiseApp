import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { HeaderComponent } from './components/header/header.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { CategoryIconComponent } from './components/category-icon/category-icon.component';
import { CategoryBadgeComponent } from './components/category-badge/category-badge.component';
import { AmountDisplayComponent } from './components/amount-display/amount-display.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { DateFieldComponent } from './components/date-field/date-field.component';
import { CopCurrencyPipe } from './pipes/cop-currency-pipe';
import { RelativeDatePipe } from './pipes/relative-date-pipe';



@NgModule({
  declarations: [
    FormErrorComponent,
    FormInputComponent,
    HeaderComponent,
    TransactionItemComponent,
    CategoryIconComponent,
    CategoryBadgeComponent,
    AmountDisplayComponent,
    EmptyStateComponent,
    SelectFieldComponent,
    DateFieldComponent,
    CopCurrencyPipe,
    RelativeDatePipe,
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
    CategoryBadgeComponent,
    AmountDisplayComponent,
    EmptyStateComponent,
    SelectFieldComponent,
    DateFieldComponent,
    CopCurrencyPipe,
    RelativeDatePipe
  ]
})
export class SharedModule { }
