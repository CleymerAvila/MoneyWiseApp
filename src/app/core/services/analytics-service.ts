import { Injectable } from '@angular/core';
import { TransactionService } from './transaction-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  transactions$ = this.transactionService.transactions$;

  constructor(private transactionService: TransactionService) {}

  totalBalance$ = this.transactions$.pipe(
    map((transactions) =>
      transactions.reduce((acc, t) => {
        return t.type === 'Ingreso'
         ? Number(acc) + Number(t.amount)
         : (t.type === 'Gasto'
            ? Number(acc) - Number(t.amount)
            : 0
          );
      }, 0),
    ),
  );

  expenseByCategory$ = this.transactions$.pipe(
    map((transactions) => {
      const stats: Record<string, number> = {};

      transactions
        .filter((t) => t.type === 'Gasto')
        .forEach((t) => {
          if (!stats[t.category]) {
            stats[t.category] = 0;
          }

          stats[t.category] += Number(t.amount);
        });

      return stats;
    }),
  );

  expenseByMonth$ = this.transactions$.pipe(
    map((transactions) => {
      const stats: Record<string, number> = {};

      transactions.forEach((t) => {
        const month = new Date(t.issueDate).toLocaleString('default', {
          month: 'short',
        });

        if (!stats[month]) {
          stats[month] = 0;
        }

        if(t.type === 'Gasto'){
          stats[month] += Number(t.amount);
        }
      });

      return stats;
    }),
  );

  recentTransactions$ = this.transactions$.pipe(
    map(transactions =>
      [...transactions]
        .sort((a, b) =>
          new Date(b.issueDate).getTime() -
          new Date(a.issueDate).getTime()
        )
        .slice(0, 5)
    )
  )

  totalIncome$ = this.transactions$.pipe(
    map(transactions =>
      transactions.filter(t => t.type === 'Ingreso')
      .reduce((sum, t) => sum + Number(t.amount), 0)
    )
  );


  totalExpenses$ = this.transactions$.pipe(
    map(transactions =>
      transactions
          .filter(t => t.type === 'Gasto')
          .reduce((sum, t) => sum + Number(t.amount), 0)
    )
  )

  totalNeutrals$ = this.transactions$.pipe(
    map(transactions =>
      transactions
          .filter(t => t.type === 'Neutral')
          .reduce((sum, t) => sum + Number(t.amount), 0)
    )
  )


}
