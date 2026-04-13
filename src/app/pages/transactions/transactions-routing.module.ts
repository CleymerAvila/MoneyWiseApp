import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsPage } from './transactions.page';
import { TransactionsListPageComponent } from './transactions-list-page/transactions-list-page.component';
import { TransactionsFormComponent } from './transactions-form/transactions-form.component';
import { TransactionSearchComponent } from './transaction-search/transaction-search.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsPage,
    children: [
      {
        path:'list',
        component: TransactionsListPageComponent
      },
      {
        path: 'search',
        component: TransactionSearchComponent
      },
      {
        path: 'detail/:id',
        component: TransactionDetailComponent
      },
      {
        path: 'create',
        component: TransactionsFormComponent
      },
      {
        path: 'edit/:id',
        component: TransactionsFormComponent
      },
      {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsPageRoutingModule {}
