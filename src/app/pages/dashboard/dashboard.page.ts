import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from 'src/app/core/services/analytics-service';
import { Chart, registerables } from 'chart.js';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { IconCategory } from 'src/app/shared/models/icon-category.model';
import { ICON_CATEGORIES } from 'src/app/shared/constants/icon-categories';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements AfterViewInit {
  @ViewChild('expenseChart')
  chartRef!: ElementRef<HTMLCanvasElement>;
  iconCategories: IconCategory[] = ICON_CATEGORIES;

  chart!: Chart;
  totalBalance$ = this.analyticsService.totalBalance$;
  totalIncome$ = this.analyticsService.totalIncome$;
  totalExpenses$ = this.analyticsService.totalExpenses$;
  totalNeutrals$ = this.analyticsService.totalNeutrals$;
  expenseByCategory$ = this.analyticsService.expenseByCategory$;
  expenseByMonth$ = this.analyticsService.expenseByMonth$;
  recentTransactions$ = this.analyticsService.recentTransactions$;
  destroy$ = new Subject<void>();

  constructor(private analyticsService: AnalyticsService) {}
  ngAfterViewInit(): void {

    const ctx = this.chartRef.nativeElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ]
      }
    });
    
    this.analyticsService.expenseByCategory$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.chart.data.labels = data.labels;
        this.chart.data.datasets[0].data = data.values;
        this.chart.data.datasets[0].backgroundColor = data.colors;
        this.chart.update();
      })

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
