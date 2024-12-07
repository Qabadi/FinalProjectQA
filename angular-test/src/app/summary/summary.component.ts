import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'Chart.js/auto';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'pb-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  public dataSource = {
    datasets: [
      {
        data: [10, 16, 15],
        backgroundColor: [
          'orange',
          'yellow',
          'purple'
        ],
      }
    ],
    labels: [] as string[]
  };

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) { }


  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/price')
      .subscribe((res: any) => {
        for (var i = 0; i < res.myPrice.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myPrice[i].price;
          this.dataSource.labels[i] = res.myPrice[i].title;
        }
        this.createChart();
      });
  }

  createChart() {

    if (isPlatformBrowser(this.platformId)) {
      const ctx = <HTMLCanvasElement>document.getElementById('myChart');
      var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: this.dataSource
      });
    }


  }
}
