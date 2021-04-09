import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SaleServiceService } from './../../services/sale-service/sale-service.service';
import { SessionService } from './../../services/session/session.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  currentYear = new Date().getFullYear();
  years = [];
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Mejores meses' },
  ];

  lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: '',
      backgroundColor: 'rgba(211, 111, 253, 0.85)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

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
  ) {}

  ngOnInit(): void {
    this.session.verifyUser();
    this.session.verifyIsAdmin();
    this.saleService.fillYears();
    this.years = this.saleService.years;
    this.getTotalsMonthByYear(this.currentYear);
  }

  public getTotalsMonthByYear(year) {
    this.saleService.getTotalsMonthByYear(year).subscribe( response => {
      this.lineChartData = [{ data: response, label: 'Mejores meses' }];
    });
  }

  public getYear(event) {
    this.getTotalsMonthByYear(event.target.value);
  }

}
