import { Component, OnInit, Input, Output } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  @Input('Labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('Data') doughnutChartData: MultiDataSet = [ [350, 450, 100]];
  @Input('Type') doughnutChartType: ChartType = 'doughnut';



  constructor() { }

  ngOnInit(): void {
  }

}
