import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAirportComponent } from './show-airport.component';

describe('ShowAirportComponent', () => {
  let component: ShowAirportComponent;
  let fixture: ComponentFixture<ShowAirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAirportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
