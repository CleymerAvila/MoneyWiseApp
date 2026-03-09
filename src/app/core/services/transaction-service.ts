import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { StorageService } from './storage-service';
import { CATEGORIES, TRANSACTIONS_TYPES } from '../models/constants.model';



@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private STORAGE_KEY = 'transactions';
  private transactionsSubject = new BehaviorSubject<Transaction[]>([])
  transactions$ = this.transactionsSubject.asObservable();

  constructor(private storageService: StorageService){
    this.init();
  }

  async init(){
    const stored = await this.storageService.get<Transaction[]>(this.STORAGE_KEY);

    if(stored){
      this.transactionsSubject.next(stored);
    }
  }

  async get(id: string){
    return this.transactionsSubject.value.find(t => t.id === id);
  }

  async create(transaction: Transaction){
    const currentTransactions = this.transactionsSubject.value;
    const updatedTransactions = [...currentTransactions, transaction];
    this.transactionsSubject.next(updatedTransactions);
    await this.storageService.set(this.STORAGE_KEY, updatedTransactions);
  }

  async update(transaction: Transaction){
    const currentTransactions = this.transactionsSubject.value;
    const updatedTransactions = currentTransactions.map(t => t.id === transaction.id ? transaction : t);
    this.transactionsSubject.next(updatedTransactions);
    await this.storageService.set('transactions', updatedTransactions);
  }


  async delete(transactionId: string){
    const currentTransactions = this.transactionsSubject.value;
    const updatedTransactions = currentTransactions.filter(t => t.id !== transactionId);
    this.transactionsSubject.next(updatedTransactions);
    await this.storageService.set('transactions', updatedTransactions);
  }
}
