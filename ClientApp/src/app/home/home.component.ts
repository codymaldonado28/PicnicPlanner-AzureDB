import { Component, Inject, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  allAirports: any = null;
  SearchAirport: any;
  SearchedAirports: any;
  Error: any;
  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    this.SearchAirport='';
    this.Error=null;
    this.getAllAirports();
  }
  getAllAirports() {
    if(this.SearchAirport.length>0){
      this.Error=null;
      this.allAirports= null;
      console.log(this.SearchAirport)
      let obs = this._httpService.AirportSearch(this.SearchAirport)
      obs.subscribe(data => {
        console.log(data)
        this.allAirports=data;
        if(this.allAirports.length == 0){
          this.Error=`Could Not Find Airport ${this.SearchAirport}`;
          this.SearchAirport=''
          this.getAllAirports();
        }
        else{
        console.log("Searched Airports Loading")
        this.allAirports = data;
        }
      })
      }
    else{
    let obs = this._httpService.getAllAirports();
    obs.subscribe(data => {
      console.log("all Airports Loading")
      this.allAirports = data;
    }
    )}

  }
}
