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
  RunwayData: any;
  FlightPath: any;
  Error: any;
  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params =>
      this.AirportId = params
    )
    console.log(this.AirportId)
    this.getAirport();
    this.getRunways();
    console.log(this.DegToDirection(300))
  }
  getAirport() {
    let obs = this._httpService.showAirport(this.AirportId)
    obs.subscribe(data => {
      console.log(data);
      if (data == null) {
        console.log("No Data")
        this.Error = "No Airport Data"
      }
      else {
      this.Airport = data;
        this.GetWeather(this.Airport.latitude_deg, this.Airport.longitude_deg)
      }
    })
  }
  getRunways() {
    this.RunwayData = false;
    let obs = this._httpService.getRunways(this.AirportId)
    obs.subscribe(data => {
      this.AirportRunways = data;
      console.log(this.AirportRunways);
      if (this.AirportRunways.length > 0) {
        console.log("THere is some data");
        for (var i = 0; i < this.AirportRunways.length; i++) {
          if (this.AirportRunways[i].le_Heading_deg != 3 || this.AirportRunways[i].he_Heading_deg != 3) {
            this.RunwayData = true;
            break;
          }
        }
      }
      console.log(this.RunwayData)
    })
  }
  GetWeather(lat, long) {
    let obs = this._httpService.getWeather(lat, long)
    obs.subscribe(data => {
      console.log(data)
      this.Weather = data;
    })
  }
  ChooseDate(date) {
    this.PicnicDate = null;
    this.PicnicDate = date;
    console.log(this.PicnicDate);
    this.WindDir = this.PicnicDate.wind.deg
    console.log(this.WindDir)
    return this.GetFlightPath()
  }
  UnChooseDate(date) {
    this.PicnicDate = null;
  }
  DegToDirection(deg) {
    var degree = deg % 360;
    if (degree >= 292.5 && degree < 337.5) {
      return "North West"
    }
    else if (degree >= 22.5 && degree < 67.5) {
      return "North East"
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return "East"
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return "South East"
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return "South"
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return "South West"
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return "West"
    }
    else {
      return "North"
    }
  }
  GetFlightPath() {
    this.FlightPath = null;
    if (this.RunwayData) {
      let degsArray: number[] = [];
      for (var i = 0; i < this.AirportRunways.length; i++) {
        if (this.PicnicDate.wind.deg > 180) {
          if (this.AirportRunways[i].le_Heading_deg != 3 && this.AirportRunways[i].le_Heading_deg < this.PicnicDate.wind.deg - 180) {
            degsArray.push(this.AirportRunways[i].le_Heading_deg + 360)
          }
          else if (this.AirportRunways[i].le_Heading_deg != 3) {
            degsArray.push(this.AirportRunways[i].le_Heading_deg)
          }
          if (this.AirportRunways[i].he_Heading_deg != 3 && this.AirportRunways[i].he_Heading_deg < this.PicnicDate.wind.deg - 180) {
            degsArray.push(this.AirportRunways[i].he_Heading_deg + 360)
          }
          else if (this.AirportRunways[i].he_Heading_deg != 3) {
            degsArray.push(this.AirportRunways[i].he_Heading_deg)
          }
        }
        else {
          if (this.AirportRunways[i].le_Heading_deg != 3 && this.AirportRunways[i].le_Heading_deg > this.PicnicDate.wind.deg + 180) {
            degsArray.push(this.AirportRunways[i].le_Heading_deg - 360)
          }
          else if (this.AirportRunways[i].le_Heading_deg != 3) {
            degsArray.push(this.AirportRunways[i].le_Heading_deg)
          }
          if (this.AirportRunways[i].he_Heading_deg != 3 && this.AirportRunways[i].he_Heading_deg > this.PicnicDate.wind.deg + 180) {
            degsArray.push(this.AirportRunways[i].he_Heading_deg - 360)
          }
          else if (this.AirportRunways[i].he_Heading_deg != 3) {
            degsArray.push(this.AirportRunways[i].he_Heading_deg)
          }
        }
      }
      console.log(degsArray);
      let min = Math.abs(this.PicnicDate.wind.deg - degsArray[0]);
      let minSpot = 0;
      for (var j = 1; j < degsArray.length; j++) {
        if (Math.abs(this.PicnicDate.wind.deg - degsArray[j]) < min) {
          min = Math.abs(this.PicnicDate.wind.deg - degsArray[j])
          minSpot = j
        }
        console.log(min)
        console.log(minSpot)
      }
      this.FlightPath = degsArray[minSpot];
      console.log(this.FlightPath);
    }
    return this.FlightPath
  }
}