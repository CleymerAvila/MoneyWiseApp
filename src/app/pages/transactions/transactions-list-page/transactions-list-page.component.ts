import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/core/models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction-service';
import { TransactionDetailComponent } from 'src/app/shared/components/transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transactions-list-page',
  templateUrl: './transactions-list-page.component.html',
  styleUrls: ['./transactions-list-page.component.scss'],
  standalone: false,
})
export class TransactionsListPageComponent  implements OnInit {
  transactions: Transaction[] = [];
  isDetailOpen: boolean = false;

  constructor(private transactionService: TransactionService, private router: Router) { }

  ngOnInit() {
    this.transactionService.transactions$.subscribe({
      next: (response) => {
        this.transactions = response;
      }
    })
  }

  onClickedItem(event: any){
   this.router.navigate(['./tabs/transactions/detail', event])
  }

}
