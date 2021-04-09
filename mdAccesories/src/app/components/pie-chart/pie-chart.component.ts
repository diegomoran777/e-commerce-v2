import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { SaleServiceService } from './../../services/sale-service/sale-service.service';
import { SessionService } from './../../services/session/session.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit {

  currentYear = new Date().getFullYear();
  years = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Enero'], ['Febrero'], ['Marzo'], ['Abril'], ['Mayo'], ['Junio'], ['Julio'], ['Agosto'], ['Septiembre'], ['Octubre'], ['Noviembre'], ['Diciembre']];
  public pieChartData: SingleDataSet = [];
  pieChartColor:any = [
    {
        backgroundColor: [
        'rgba(30, 169, 224, 0.8)',
        'rgba(241, 234, 12, 0.8)',
        'rgba(241, 234, 12, 0.8)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(139, 195, 74, 0.8)',
        'rgba(249, 130, 240, 0.8)',
        'rgba(130, 69, 239, 0.8)',
        'rgba(123, 132, 239, 0.8)',
        'rgba(251, 57, 57, 0.8)',
        'rgba(115, 255, 106, 0.8)',
        'rgba(255, 182, 71, 0.8)',
        'rgba(58, 64, 241, 0.8)'
        ],
        borderColor: ''
    }
]
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

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

  constructor(private saleService: SaleServiceService, private session: SessionService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
    this.session.verifyUser();
    this.session.verifyIsAdmin();
    this.saleService.fillYears()
    this.years = this.saleService.years;
    this.getTotalsMonthByYear(this.currentYear);
  }

  public getTotalsMonthByYear(year) {
    this.saleService.getTotalsMonthByYear(year).subscribe( response => {
      this.pieChartData = response;
    });
  }

  public getYear(event) {
    this.getTotalsMonthByYear(event.target.value);
  }

}
