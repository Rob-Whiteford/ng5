import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../models/site.model';

@Injectable({
  providedIn: 'root'
})

//export interface ServiceTypeApiModel {
//  ServiceType: ServiceType[];
//}

export class SiteListService {

  private baseUrl = 'https://api.myjson.com/bins/ipkv0';

  constructor(private _http: HttpClient) { }

    getSites(): Observable<Site[]> {
    return this._http.get<Site[]>(this.baseUrl);
    }
  }