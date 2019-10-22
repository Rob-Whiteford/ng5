import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {Waybill} from '../models/waybill';


@Injectable({
  providedIn: 'root'
})

//export interface WaybillApiModel {
//  Waybill: Waybills[];
//}

export class WaybillListService {

  private baseUrl = 'https://api.myjson.com/bins/1fq7dc';

  constructor(private _http: HttpClient) { }

  getWaybillList(): Observable <Waybill[]> {
    const params = new HttpParams()
      .set("Date","2019/10/16");
      //.set(); example of multiple params
      return this._http.get<Waybill[]>(this.baseUrl, {params})
  }

  saveWaybill(waybill:Waybill){
    return this._http.put(`https://api.myjson.com/bins/m43qo/${waybill.WaybillNumber}`, waybill);
  }

}
