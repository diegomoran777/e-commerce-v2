import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SaleServiceService } from './../../services/sale-service/sale-service.service';
import { SessionService } from './../../services/session/session.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {

  totals:any[] = [];
  years = [];
  currentYear = new Date().getFullYear();
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  barChartColors: Color[] = [
    {
      borderColor: 'black',
      //backgroundColor: 'rgba(99, 81, 206, 0.60)',
      backgroundColor: 'rgba(135, 239, 116, 0.60)',
    },
  ];

  chartOptions = {
    legend: {
      labels: { fontColor: 'white' }
    },
    scales: {
      xAxes: [{
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      }],
      yAxes: [{
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      }]
    }
  }

  constructor(
    private saleService: SaleServiceService,
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.session.verifyIsAdmin();
    this.saleService.fillYears();
    this.years = this.saleService.years;
    this.getTotalsMonthByYear(this.currentYear);
  }

  public getTotalsMonthByYear(year) {
    this.saleService.getTotalsMonthByYear(year).subscribe( response => {
      this.barChartData = [{ data: response, label: 'Mejores meses' }];
    });
  }

  public getYear(event) {
    this.getTotalsMonthByYear(event.target.value);
  }

}
