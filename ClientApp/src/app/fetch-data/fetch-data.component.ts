import { Component, Inject, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  allAirports: any;

  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    this.getAllAirports();
  }
  getAllAirports() {
    let obs = this._httpService.getAllAirports();
    obs.subscribe(data => {
      console.log(data)
      this.allAirports = data;
    })
  }
}
