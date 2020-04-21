import { TestBed, inject } from '@angular/core/testing';
import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});