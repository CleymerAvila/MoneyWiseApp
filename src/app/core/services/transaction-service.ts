import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { StorageService } from './storage-service';
import { CATEGORIES, TRANSACTIONS_TYPES } from '../models/constants.model';


const transactions: Transaction[] = [
  {
    id: '121302392u44288340',
    type: TRANSACTIONS_TYPES.INCOME,
    category: CATEGORIES.SALARY,
    issueDate: '10/04/2005',
    amount: 400000,
    description: 'lANDING PAGE BIEN HECHA Y PAGADA',
    proofImage: '../../../assets/buy-for-cash.png'
  },
  {
    id: '1213023aslk2324288340',
    type: TRANSACTIONS_TYPES.SPENDING,
    category: CATEGORIES.TRANSPORTATION,
    issueDate: '10/04/2005',
    amount: 10000,
    description: 'El transcaribe estaba full taqueado y me toco coger moto pa que fue eso',
    proofImage: '../../../assets/buy-for-cash.png'
  },
  {
    id: 'asdfasf2392u44288340',
    type: TRANSACTIONS_TYPES.SPENDING,
    category: CATEGORIES.FOOD,
    issueDate: '10/04/2005',
    amount: 23000,
    description: 'Me compre cule salchipapa de 23lukas que cule vaina sabrosa',
    proofImage: '../../../assets/buy-for-cash.png'
  }
]
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([])
  transactions$ = this.transactionsSubject.asObservable();

  constructor(private storageService: StorageService){
    this.storageService.set('transactions', transactions);
    this.loadTransactions();
  }

  async loadTransactions(){
    const transactions = await this.storageService.get<Transaction[]>('transactions') || [];

    console.log('Esta es la cantidad de transacciones registradas hasta ahora', transactions);
    this.transactionsSubject.next(transactions);
  }

  async get(id: string){
    const transactions = await this.storageService.get<Transaction[]>('transactions');
    return transactions.find(t => t.id === id);
  }

  async create(transaction: Transaction){
    const currentTransactions = this.transactionsSubject.value;
    const updatedTransactions = [...currentTransactions, transaction];
    await this.storageService.set('transactions', updatedTransactions);
    this.transactionsSubject.next(updatedTransactions);
  }

  async update(transaction: Transaction){
    const currentTransactions = this.transactionsSubject.value;

    const updatedTransactions = currentTransactions.map(t => t.id === transaction.id ? transaction : t);

    await this.storageService.set('transactions', updatedTransactions);

    this.transactionsSubject.next(updatedTransactions);
  }


  async delete(transactionId: string){
    const currentTransactions = this.transactionsSubject.value;
    const updatedTransactions = currentTransactions.filter(t => t.id !== transactionId);

    await this.storageService.set('transactions', updatedTransactions);
    this.transactionsSubject.next(updatedTransactions);
  }
}
