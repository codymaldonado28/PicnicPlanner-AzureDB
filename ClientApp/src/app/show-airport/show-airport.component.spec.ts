import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAirportComponent } from './show-airport.component';
import { HttpService } from '../http.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'

describe('ShowAirportComponent', () => {
  let component: ShowAirportComponent;
  let fixture: ComponentFixture<ShowAirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAirportComponent ],
      providers: [HttpService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('if input modulis 360 is between 337.5 and 22.5 it should return North', () => {
    const result = component.DegToDirection(Math.random()*(382 - 338) + 338 );
    expect(result).toContain("North")
  });

  it('if input modulis 360 is between 22.5 and 67.5 it should return North East', () => {
    const result = component.DegToDirection(Math.random()*(67 - 23) + 23);
    expect(result).toContain("North East")
  });

  it('if input modulis 360 is between 67.5 and 112.5 it should return North East', () => {
    const result = component.DegToDirection(Math.random()*(112 - 68) + 68);
    expect(result).toContain("East")
  });

  it('if input modulis 360 is between 112.5 and 157.5 it should return North', () => {
    const result = component.DegToDirection(Math.random()*(157 - 113) + 113);
    expect(result).toContain("South East")
  });

  it('if input modulis 360 is between 157.5 and 202.5 it should return North', () => {
    const result = component.DegToDirection(Math.random()*(202 - 158) + 158);
    expect(result).toContain("South")
  });

  it('if input modulis 360 is between 202.5 and 247.5 it should return North', () => {
    const result = component.DegToDirection(Math.random()*(247 - 203) + 203);
    expect(result).toContain("South West")
  });

  it('if input modulis 360 is between 247.5 and 292.5 it should return North', () => {
    const result = component.DegToDirection(Math.random()*(292 - 248) + 248);
    expect(result).toContain("West")
  });

  it('if input modulis 360 is between 292.5 and 337.5 it should return North', () => {
    const result = component.DegToDirection(Math.random()*(337 - 293) + 293);
    expect(result).toContain("North West")
  });

  it('if date chosen and there is no runway data it should return null', () => {
    component.RunwayData = null;
    const testDate = {
      "dt": 1585342800,
      "main": {
          "temp": -45.98,
          "feels_like": -54.02,
          "temp_min": -45.98,
          "temp_max": -45.98,
          "pressure": 1021,
          "sea_level": 1021,
          "grnd_level": 615,
          "humidity": 43,
          "temp_kf": 0
      },
      "weather": [
          {
              "id": 803,
              "main": "Clouds",
              "description": "broken clouds",
              "icon": "04n"
          }
      ],
      "clouds": {
          "all": 83
      },
      "wind": {
          "speed": 1.57,
          "deg": 123
      },
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2020-03-27 21:00:00"
  }
    const result = component.ChooseDate( testDate )
    expect(result).toBeNull;
  })

  it('if date chosen and there is runway data it should return runway header degree closest to wind deg', () => {
    component.RunwayData = true;
    component.AirportRunways= [{runwayId: 244433, le_Heading_deg: 100, he_Heading_deg: 0, airportId: 3673}, {runwayId: 244433, le_Heading_deg: 99, he_Heading_deg: 0, airportId: 3673},{runwayId: 244433, le_Heading_deg: 141, he_Heading_deg: 0, airportId: 3673}]
    const testDate = {
      "dt": 1585342800,
      "main": {
          "temp": -45.98,
          "feels_like": -54.02,
          "temp_min": -45.98,
          "temp_max": -45.98,
          "pressure": 1021,
          "sea_level": 1021,
          "grnd_level": 615,
          "humidity": 43,
          "temp_kf": 0
      },
      "weather": [
          {
              "id": 803,
              "main": "Clouds",
              "description": "broken clouds",
              "icon": "04n"
          }
      ],
      "clouds": {
          "all": 83
      },
      "wind": {
          "speed": 1.57,
          "deg": 120
      },
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2020-03-27 21:00:00"
  }
    const result = component.ChooseDate( testDate )
    expect(result).toBe(100);
  })

  it('if date chosen and there is runway data it should return runway header degree closest to wind deg', () => {
    component.RunwayData = true;
    component.AirportRunways= [{runwayId: 244433, le_Heading_deg: 1, he_Heading_deg: 357, airportId: 3673}, {runwayId: 244433, le_Heading_deg: 2, he_Heading_deg: 350, airportId: 3673},{runwayId: 244433, le_Heading_deg: 2, he_Heading_deg: 99, airportId: 3673}]
    const testDate = {
      "dt": 1585342800,
      "main": {
          "temp": -45.98,
          "feels_like": -54.02,
          "temp_min": -45.98,
          "temp_max": -45.98,
          "pressure": 1021,
          "sea_level": 1021,
          "grnd_level": 615,
          "humidity": 43,
          "temp_kf": 0
      },
      "weather": [
          {
              "id": 803,
              "main": "Clouds",
              "description": "broken clouds",
              "icon": "04n"
          }
      ],
      "clouds": {
          "all": 83
      },
      "wind": {
          "speed": 1.57,
          "deg": 359
      },
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2020-03-27 21:00:00"
  }
    const result = component.ChooseDate( testDate )
    expect(result).toBe(361);
  })

  it('if date chosen and there is runway data it should return runway header degree closest to wind deg', () => {
    component.RunwayData = true;
    component.AirportRunways= [{runwayId: 244433, le_Heading_deg: 180, he_Heading_deg: 300, airportId: 3673}, {runwayId: 244433, le_Heading_deg: 280, he_Heading_deg: 101, airportId: 3673},{runwayId: 244433, le_Heading_deg: 150, he_Heading_deg: 110, airportId: 3673}]
    const testDate = {
      "dt": 1585342800,
      "main": {
          "temp": -45.98,
          "feels_like": -54.02,
          "temp_min": -45.98,
          "temp_max": -45.98,
          "pressure": 1021,
          "sea_level": 1021,
          "grnd_level": 615,
          "humidity": 43,
          "temp_kf": 0
      },
      "weather": [
          {
              "id": 803,
              "main": "Clouds",
              "description": "broken clouds",
              "icon": "04n"
          }
      ],
      "clouds": {
          "all": 83
      },
      "wind": {
          "speed": 1.57,
          "deg": 20
      },
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2020-03-27 21:00:00"
  }
    const result = component.ChooseDate( testDate )
    expect(result).toBe(-60);
  })
  
});
