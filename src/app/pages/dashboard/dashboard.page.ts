import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/core/services/analytics-service';
import { ChartConfiguration } from 'chart.js';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  totalBalance$ = this.analyticsService.totalBalance$;
  totalIncome$ = this.analyticsService.totalIncome$;
  totalExpenses$ = this.analyticsService.totalExpenses$;
  totalNeutrals$ = this.analyticsService.totalNeutrals$;
  expenseByCategory$ = this.analyticsService.expenseByCategory$;
  expenseByMonth$ = this.analyticsService.expenseByMonth$;
  recentTransactions$ = this.analyticsService.recentTransactions$;

  constructor(private analyticsService: AnalyticsService) {}

  async ngOnInit() {
    // this.listOptions = ICON_CATEGORIES
  }
}
