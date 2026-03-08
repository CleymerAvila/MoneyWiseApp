import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/core/models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction-service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
  standalone: false,
})
export class TransactionDetailComponent  implements OnInit {
  transaction: Transaction | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private transactionService: TransactionService){}
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id){
      this.close()
      return;
    }

    const tFound = await this.transactionService.get(id);
    if(!tFound){
      this.close()
      return;
    }
    this.transaction = tFound;
  }

  close(){
    this.router.navigate(['../'], {relativeTo : this.route})
  }
}
