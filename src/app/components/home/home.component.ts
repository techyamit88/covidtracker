import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed=0;
  totalActive=0;
  totalDeaths=0;
  totalRecovered=0;
  globaldata:GlobalDataSummary[];
  pieChart:GoogleChartInterface={
  chartType:'PieChart'
  }

  constructor(private dataService:DataServiceService) { }

  initChart(){

let datatable = [];
datatable.push(["country","cases"])
this.globaldata.forEach(cs=>{
  datatable.push([
    cs.country,cs.confirmed
  ])
})
console.log(datatable);
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
  options: {height:500},
};
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      {
        next:(result)=>{
          console.log(result);
          this.globaldata=result;

          result.forEach(cs=>
            {
              if(!Number.isNaN(cs.confirmed))
              {
                this.totalActive=cs.active
                this.totalConfirmed=cs.confirmed
                this.totalRecovered=cs.recovered
                this.totalDeaths=cs.deaths
              }


            })
            this.initChart();
        }
      }
    )
  }


}
