import { Component, OnInit } from '@angular/core';
import { WaybillListService } from '../services/waybill-list.service';
import { Waybill } from '../models/waybill.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';


@Component({
  selector: 'app-view-waybills',
  templateUrl: './view-waybills.component.html',
  styleUrls: ['./view-waybills.component.scss']
})




export class ViewWaybillsComponent implements OnInit {


  // Grid Variables
  waybills: Waybill[];
  isLoaded = false;


  public pageSize = 10;
  public skip = 0

  public gridData: any[];

  public view: Observable<GridDataResult>;
  public state: State = {
    skip: 0,
    take: 5
  };

  constructor(private _callService: WaybillListService, private http: HttpClient) {
  }

  ngOnInit() {
    this.getWaybills();
  }


  getWaybills(): void {
    this._callService.getWaybillList().subscribe(data => {
      if (data) {
        this.waybills  = data.Waybill;
        this.isLoaded = true;
        this.gridData = this.waybills;
      }
    })
  };


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }


}
