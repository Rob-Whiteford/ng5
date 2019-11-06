import { Component, OnInit, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { WaybillListService } from '../services/waybill-list.service';
import { Waybill } from '../models/waybill.model';
import { GridOptions } from 'ag-grid-community';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GridModule } from '@progress/kendo-angular-grid';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';


@Component({
  selector: 'app-view-waybills',
  templateUrl: './view-waybills.component.html',
  styleUrls: ['./view-waybills.component.scss']
})

@NgModule({
  declarations: [
  ],
  imports: [GridModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})



export class ViewWaybillsComponent implements OnInit {
  [x: string]: any;

  // private gridApi;
  // private gridColumnApi;

  // private columnDefs;
  // private rowData;
  // private defaultColDef;
  // private pinnedTopRowData;
  // private pinnedBottomRowData;

  // Grid Variables
  waybills: Waybill[];

//   public waybillItem:  {
//     WaybillNumber:string;
//     ServiceType:string;
//     Sender: string;
//     Receiver: string;
//     TotalParcels: string;
//     TotalMass:string;
//     XRef:string;
//     WaybillDate:string;
//     Time: string;
// }
  isLoaded = false;

  // public lineItemData: Array<LineItem> = [];

  private gridOptions: GridOptions;
  // private lineItemGridOptions: GridOptions;

  private gridColumnDefs: any;
  private gridRowData: any;
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

    // this.lineItemGridOptions = <GridOptions>{};
    // this.lineItemGridOptions.rowData = this.lineItemData;
    // this.lineItemGridOptions.defaultColDef = {
    //   editable: true,
    //   resizable: true
    // };

    // this.gridOptions = <GridOptions>{};

    // this.gridOptions.pagination = true;
    // this.gridOptions.paginationPageSize = 15;
    // this.gridOptions.cacheBlockSize = 15;
    // this.gridOptions.rowHeight = 25;
    // this.gridOptions.maxBlocksInCache = 1;
  }


  getWaybills(): void {
    this._callService.getWaybillList().subscribe(data => {
      if (data) {
        //this.waybills  = data.Waybill;
        this.isLoaded = true;
        this.gridRowData = this.waybills;
        this.gridData = this.waybills;
      }
    })
  };


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  // public dataStateChange(state: DataStateChangeEvent): void {
  //     this.state = state;
  //     //this.service.query(state);
  // }

  //   getSelectedRows() {
  //     const selectedNodes = this.agGrid.api.getSelectedNodes();
  //     const selectedData = selectedNodes.map( node => node.data );
  //     const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
  //     alert(`Selected nodes: ${selectedDataStringPresentation}`);
  // }

}
