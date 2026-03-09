import { Transaction } from 'src/app/core/models/transaction.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionService } from 'src/app/core/services/transaction-service';
@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: false,
})
export class TransactionItemComponent  implements OnInit {
  @Input({required: true}) transaction!: Transaction;
  @Output() onDetail = new EventEmitter<string>();

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {}

  onClicked(){
    this.onDetail.emit(this.transaction.id);
  }

  async handleDelete(){
    await this.transactionService.delete(this.transaction.id);
  }
}
