import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/core/models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction-service';

@Component({
  selector: 'app-transactions-list-page',
  templateUrl: './transactions-list-page.component.html',
  styleUrls: ['./transactions-list-page.component.scss'],
  standalone: false,
})
export class TransactionsListPageComponent  implements OnInit {
  transactions: Transaction[] = [];
  segmentSelected: string  = 'list';

  constructor(private transactionService: TransactionService, private router: Router) { }

  async ngOnInit() {
    this.loadTransactions();
  }

  async loadTransactions(){
    this.transactionService.transactions$.subscribe({
      next: (transactions) => {
        this.transactions = transactions.sort((a, b) =>
          new Date(b.issueDate).getTime() -
          new Date(a.issueDate).getTime()
        )
      }
    })
  }

  ionViewWillEnter(){
    this.loadTransactions();
  }

  handleClick(event: any){
    this.router.navigate(['./tabs/transactions/', event])
  }

  onClickedItem(event: any){
   this.router.navigate(['./tabs/transactions/detail', event])
  }

  handleAction(event: any){
    this.router.navigate(['./tabs/', event])
  }

}
