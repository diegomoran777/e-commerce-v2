import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { SaleServiceService } from './../../services/sale-service/sale-service.service';
import { SessionService } from './../../services/session/session.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent implements OnInit {

  currentYear = new Date().getFullYear();
  years = [];
  doughnutChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  doughnutChartData = [];
  doughnutChartType: ChartType = 'doughnut';

  doughnutChartColors: any[] = [
    { backgroundColor: [
      "#c3687fb0", 
      "#ea284cc7", 
      "#c4ab66", 
      "#9434a7ab", 
      "#ffc107", 
      "#5fcc52", 
      "#f32e2ec7", 
      "#6351ce", 
      "#5ed4ceba", 
      "#8992f1bf", 
      "#ecc376", 
      "#6f45e5d9"],
      borderColor: ''
     }];

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
     this.doughnutChartData = response;
    });
  }

  public getYear(event) {
    this.getTotalsMonthByYear(event.target.value);
  }

}
