import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { forkJoin } from 'rxjs';
import { ActivityService } from 'src/app/activity/services/activity.service';

@Component({
  selector: 'app-dashboard-graph',
  templateUrl: './dashboard-graph.component.html',
})
export class DashboardGraphComponent implements OnInit {
  borrowedBooksNumber: number = 0;
  overdueBooksNumber: number = 0;
  activeReservationsNumber: number = 0;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    forkJoin([
      this.activityService.loadBookCount(),
      this.activityService.loadActiveReservations(),
    ]).subscribe(([bookCount, activeReservations]) => {
      this.borrowedBooksNumber = bookCount.borrowedCount;
      this.overdueBooksNumber = bookCount.overdueCount;
      this.activeReservationsNumber = activeReservations.length;
      this.updateChart();
    });
  }

  options: EChartsOption = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [] as any,
    },
    xAxis: { type: 'value' },
    yAxis: { type: 'category' },
    series: { type: 'bar' },
  };

  mergeOptions: EChartsOption;

  updateChart() {
    this.mergeOptions = {
      grid: {
        left: 10,
        top: 10,
        right: 10,
        bottom: 10,
        containLabel: true,
      },
      dataset: {
        source: [
          ['product', 'value'],
          ['Knjige u prekoračenju', this.overdueBooksNumber],
          ['Rezervisane knjige', this.activeReservationsNumber],
          ['Izdate knjige', this.borrowedBooksNumber],
        ],
      },
      xAxis: { type: 'value' },
      yAxis: { type: 'category' },
      series: [
        {
          type: 'bar',
          encode: {
            x: 'value',
            y: 'product',
          },
          itemStyle: {
            color: (params) => {
              if (params.dataIndex === 0) {
                return '#DC2626';
              } else if (params.dataIndex === 1) {
                return '#e09b00';
              } else if (params.dataIndex === 2) {
                return '#059669';
              }
            },
          },
        },
      ],
    };
  }
}
