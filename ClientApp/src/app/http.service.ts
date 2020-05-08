import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParseErrorLevel } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getAllAirports(){
    return this._http.get('https://picnicplan2.azurewebsites.net/api/airports');
  }
  showAirport(airportId){
    console.log(airportId);
    var airportid = airportId.airportId;
    console.log(airportid);
    return this._http.get(`https://picnicplan2.azurewebsites.net/api/airport/${airportid}`)
  }
  AirportSearch(search){
    console.log(search);
    return this._http.get(`https://picnicplan2.azurewebsites.net/api/airport/search/${search}`)
  }
  getRunways(airportId){
    console.log(airportId);
    var airportid = airportId.airportId;
    console.log(airportid);
    return this._http.get(`https://picnicplan2.azurewebsites.net/api/runways/${airportid}`)
  }
  getWeather(airportLat, airportLong){
    return this._http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${airportLat}&lon=${airportLong}&units=imperial&appid=9e2b9f940e6b4d113e7c1872cf312d69`)
  }
}
