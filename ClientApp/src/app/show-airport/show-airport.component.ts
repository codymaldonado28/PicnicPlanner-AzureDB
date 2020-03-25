import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router'

@Component({
  selector: 'app-show-airport',
  templateUrl: './show-airport.component.html',
  styleUrls: ['./show-airport.component.css']
})
export class ShowAirportComponent implements OnInit {
  AirportId: any;
  Airport: any;
  Weather: any;
  PicnicDate: any;
  AirportRunways: any;
  WindDir: any;
  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => 
    this.AirportId=params
    )
    console.log(this.AirportId)
    this.getAirport();
    this.getRunways();
  }
  getAirport(){
    let obs = this._httpService.showAirport(this.AirportId)
    obs.subscribe(data => {
      console.log(data)
      this.Airport=data;
      this.GetWeather(this.Airport.latitude_deg, this.Airport.longitude_deg)
    })
  }
  getRunways(){
    let obs = this._httpService.getRunways(this.AirportId)
    obs.subscribe(data => {
      this.AirportRunways = data;
      console.log(this.AirportRunways);
    })
  }
  GetWeather(lat,long){
    let obs = this._httpService.getWeather(lat, long)
      obs.subscribe(data => {
        console.log(data)
        this.Weather=data;
      })
  }
  ChooseDate(date){
    this.PicnicDate=null;
    this.PicnicDate=date;
    console.log(this.PicnicDate);
    this.WindDir = this.DegToDirection(this.PicnicDate.wind.deg)
    console.log(this.WindDir)
    this.GetFlightPath()
  }
  DegToDirection(deg){
    var degree = deg % 360;
    if (degree < 22.5){
      return "South"
    }
    else if (degree >= 22.5 && degree < 67.5){
      return "South East"
    }
    else if(degree >= 67.5 && degree < 112.5){
      return "East"
    }
    else if (degree >= 112.5 && degree < 157.5 ){
      return "North East"
    }
    else if (degree >= 157.5 && degree < 202.5){
      return "North"
    }
    else if(degree >= 202.5 && degree < 247.5){
      return "North West"
    }
    else if (degree >= 247.5 && degree < 292.5){
      return "West"
    }
    else{
      return "South West"
    }
    
    }
  }
