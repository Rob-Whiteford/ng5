import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceType } from '../models/servicetype';

@Injectable({
  providedIn: 'root'
})

//export interface ServiceTypeApiModel {
//  ServiceType: ServiceType[];
//}

export class ServiceTypeService {

  private baseUrl = 'https://api.myjson.com/bins/1dfxy8';

  constructor(private _http: HttpClient) { }

    getServiceTypes(): Observable<ServiceType[]> {
    return this._http.get<ServiceType[]>(this.baseUrl);
    }
  }