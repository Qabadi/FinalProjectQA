import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'Chart.js/auto';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'pb-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
      {
        data: [100, 50, 200],
        backgroundColor: [
          'pink',
          '#32CD32',
          '#87CEEB'
        ],
      }
    ],
    labels: [] as string[]
  };
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) { }


  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
        this.createChart();
      });
  }

  createChart() {

    if (isPlatformBrowser(this.platformId)) {
      const ctx = <HTMLCanvasElement>document.getElementById('myChart');
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
      });
    }


  }
}
