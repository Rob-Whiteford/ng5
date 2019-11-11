import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Manifest } from '../models/manifest.model';


@Injectable({
  providedIn: 'root'
})

//export interface WaybillApiModel {
//  Waybill: Waybills[];
//}

export class ManifestListService {

  private baseUrl =  'https://api.myjson.com/bins/9vtcs';

  constructor(private _http: HttpClient) { }

  getManifestList(): Observable <Manifest[]> {
    const params = new HttpParams()
      .set("Date","2019/10/16");
      //.set(); example of multiple params
      return this._http.get<Manifest[]>(this.baseUrl, {params})
  }


  
}

