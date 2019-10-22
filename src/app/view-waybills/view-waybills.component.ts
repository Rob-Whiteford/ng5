import { Component, OnInit, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WaybillListService } from '../services/waybill-list.service';
import { Waybill } from '../models/waybill';
// import { GridOptions } from 'ag-grid-community';


@Component({
  selector: 'app-view-waybills',
  templateUrl: './view-waybills.component.html',
  styleUrls: ['./view-waybills.component.scss']
})

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ViewWaybillsComponent implements OnInit {

  waybills : Waybill[];
  isLoaded = false;

  // private gridOptions: GridOptions;


  constructor(private _callService: WaybillListService) {


   }

  ngOnInit() {

    this.getWaybills();

    // this.gridOptions = <GridOptions>{};
    // this.gridOptions.columnDefs = [
    //           {
    //               headerName: "ID",
    //               field: "id",
    //               width: 100
    //           },
    //           {
    //               headerName: "Value",
    //               field: "value",
    //               width: 100
    //           },

    //       ];
    //   this.gridOptions.rowData = [
    //           {id: 5, value: 10},
    //           {id: 10, value: 15},
    //           {id: 15, value: 20}
    //       ]


  }

  getWaybills(): void {
    this._callService.getWaybillList().subscribe(data => {
      if(data) {
        this.waybills  = data.Waybill;
        this.isLoaded = true;
        console.log('List of Waybills', this.waybills);
      }
    })
  };

}
