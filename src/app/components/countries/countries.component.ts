import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  totalConfirmed=0;
  totalActive=0;
  totalDeaths=0;
  totalRecovered=0;
  globaldata:GlobalDataSummary[];
  data:GlobalDataSummary[];
  countries:String[]=[];

  constructor(private service:DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result=>{
      this.data=result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
    })
    })
  }
updateValues(country:String)
  {
    console.log(country);

      this.data.forEach(cs=>{
        if(cs.country==country){
          this.totalActive=cs.active
          this.totalDeaths=cs.deaths
          this.totalRecovered=cs.recovered
          this.totalConfirmed=cs.confirmed
        }
      })
    }
  }

