import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsPage } from './transactions.page';
import { TransactionsListPageComponent } from './transactions-list-page/transactions-list-page.component';
import { TransactionDetailComponent } from 'src/app/shared/components/transaction-detail/transaction-detail.component';
import { TransactionsFormComponent } from './transactions-form/transactions-form.component';

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
