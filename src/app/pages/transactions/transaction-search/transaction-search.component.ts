import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/core/models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction-service';

@Component({
  selector: 'app-transaction-search',
  templateUrl: './transaction-search.component.html',
  styleUrls: ['./transaction-search.component.scss'],
  standalone: false,
})
export class TransactionSearchComponent  implements OnInit {

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedType: 'all' | 'income' | 'expense' | 'neutral' = 'all';
  selectedCategory: string | null = null;
  searchText = '';

  constructor(private transactionService: TransactionService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.transactionService.transactions$.subscribe((transactions) => {
      this.transactions= transactions;
      this.filteredTransactions= transactions;
    })
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter(t => {
      const matchType =
      this.selectedType === 'all' ||   t.type === (this.selectedType as any);

      const matchCategory =
      !this.selectedCategory ||
      t.category === this.selectedCategory;

      const matchSearch =
      !this.searchText ||
      t.description
      ?.toLowerCase()
      .includes(this.searchText.toLocaleLowerCase())
      return matchType && matchCategory && matchSearch;
    })
  }

  onTypeChange(event: any){
    const typeFromEvent = event.detail.value;
    this.selectedType = typeFromEvent;
    this.applyFilters();
  }

  onCategoryChange(category: string){
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearch(event: any){
    this.searchText = event;
    this.applyFilters();
  }

  handleClick(event: any){
    this.router.navigate(['./tabs/transactions/', event])
  }

  ionViewWillEnter(){
    this.transactionService.transactions$
    .subscribe(data => this.transactions = data);
  }

  onClickedItem(event: any){
   this.router.navigate(['./tabs/transactions/detail', event])
  }

  handleAction(event: any){
    this.router.navigate(['../', event], { relativeTo: this.route})
  }

}
