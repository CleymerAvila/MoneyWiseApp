import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransactionsPageRoutingModule } from './transactions-routing.module';
import { TransactionsPage } from './transactions.page';
import { SharedModule } from "src/app/shared/shared-module";
import { TransactionsListPageComponent } from './transactions-list-page/transactions-list-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TransactionsPageRoutingModule,
    SharedModule
],
  declarations: [
    TransactionsPage,
    TransactionsListPageComponent
  ]
})
export class TransactionsPageModule {}
