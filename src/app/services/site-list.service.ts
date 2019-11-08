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

  private baseUrl = 'https://api.myjson.com/bins/17cszg';

  constructor(private _http: HttpClient) { }

  getSites(): Observable<Site[]> {
    return this._http.get<Site[]>(this.baseUrl);
  }

  saveSite(site:Site, isNew?: boolean){
    return this._http.put(`` + this.baseUrl + `/${site.SiteCode}`, site);
  }

  deleteSite(site:Site){
    return this._http.delete(`${this.baseUrl}?/${site.SiteCode}`);
  }

  private serializeModels(data?: any): string {
    return data ? `&models=${JSON.stringify([data])}` : '';
}

}