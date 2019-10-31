import { Component, OnInit, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { WaybillListService } from '../services/waybill-list.service';
import { Waybill } from '../models/waybill';
import { GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import {HttpClient, HttpParams} from '@angular/common/http';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { GridModule } from '@progress/kendo-angular-grid';
import { GridDataResult, DataStateChangeEvent , PageChangeEvent} from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { LineItem } from '../models/lineitem.model';

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

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private rowData;
  private defaultColDef;
  private pinnedTopRowData;
  private pinnedBottomRowData;

  // Grid Variables
  waybills : Waybill[];
  isLoaded = false;

  public lineItemData: Array<LineItem> = [];

  private gridOptions: GridOptions;
  private gridColumnDefs : any;
  private gridRowData : any;
  public pageSize = 10;
  public skip = 0

  public gridData: any[] ;

public view: Observable<GridDataResult>;
    public state: State = {
        skip: 0,
        take: 5
    };

  // Toolbar Variables
  public splitButtonData: Array<any> = [{
      text: 'Option 1'
  }, {
      text: 'Option 2',
  }, {
      text: 'Option 3',
  }];

  public dropdownButtonData: Array<any> = [{
      text: 'Option 1'
  }, {
      text: 'Option 2',
  }, {
      text: 'Option 3',
  }];


  
  constructor(private _callService: WaybillListService, private http: HttpClient) {


      var list = ["foo", "bar"];
      list.push("baz", "qux", "etcetera");
 

    let myLineItem: LineItem[]=[];
    this.myLineItem = [];

    this.lineItemData.push({ItemQuantity: "1",ItemDescription: "1",ItemLength: "1",ItemWidth: "1",ItemHeight: "1",ItemMass: "1"});
    this.lineItemData.push({ItemQuantity: "2",ItemDescription: "2",ItemLength: "2",ItemWidth: "2",ItemHeight: "2",ItemMass: "2"});



    //this.pinnedTopRowData = getPinnedTopData();
    //this.pinnedBottomRowData = getPinnedBottomData();

   }


   
  ngOnInit() {

    this.getWaybills();


    this.lineItemGridOptions = <GridOptions>{};
    this.lineItemGridOptions.columnDefs = [
      {
        headerName: 'Quantity',
        field: "ItemQuantity",
        width: 100,
        cellStyle: {border: 'solid', borderTopWidth: '0.1px', borderRightWidth: '0.1px', borderLeftWidth: '0.1px', borderBottomWidth: '0.1px'}
 
      },
      {
        headerName: 'Item Description',
        field: "ItemDescription",
        width: 100,
        cellStyle: {border: 'solid', borderTopWidth: '0.1px', borderRightWidth: '0.1px', borderLeftWidth: '0.1px', borderBottomWidth: '0.1px'}
      },
      {
        headerName: 'Length',
        field: "ItemLength",
        width: 90,
        cellStyle: {border: 'solid', borderTopWidth: '0.1px', borderRightWidth: '0.1px', borderLeftWidth: '0.1px', borderBottomWidth: '0.1px'}
 
      },
      {
        headerName: 'Width',
        field: "ItemWidth",
        width: 70,
        cellStyle: {border: 'solid', borderTopWidth: '0.1px', borderRightWidth: '0.1px', borderLeftWidth: '0.1px', borderBottomWidth: '0.1px'}
 
      },
      {
        headerName: 'Height',
        field: "ItemHeight",
        width: 70,
        cellStyle: {border: 'solid', borderTopWidth: '0.1px', borderRightWidth: '0.1px', borderLeftWidth: '0.1px', borderBottomWidth: '0.1px'}
 
      },
      {
        headerName: 'Mass',
        title: "Mass",
        field: "ItemMass",
        width: 70,
        cellStyle: {border: 'solid', borderTopWidth: '0.1px', borderRightWidth: '0.1px', borderLeftWidth: '0.1px', borderBottomWidth: '0.1px'}
 
      }
    ];



    this.lineItemGridOptions.rowData =  this.lineItemData;

    // this.lineItemGridOptions.rowData = [
    //   {
    //     ItemQty: "",
    //     ItemDesc: "",
    //     ItemLen: "",
    //     ItemBth: "",
    //     ItemHgt: "",
    //     ItemMass:"",
    //   },
    //   {
    //     ItemQty: "",
    //     ItemDesc: "",
    //     ItemLen: "",
    //     ItemBth: "",
    //     ItemHgt: "",
    //     ItemMass:"",
    //   },
    //   {
    //     ItemQty: "",
    //     ItemDesc: "",
    //     ItemLen: "",
    //     ItemBth: "",
    //     ItemHgt: "",
    //     ItemMass:"",
    //   }, 
    //   {
    //     ItemQty: "",
    //     ItemDesc: "",
    //     ItemLen: "",
    //     ItemBth: "",
    //     ItemHgt: "",
    //     ItemMass:"",
    //   }, 
    //   {
    //     ItemQty: "",
    //     ItemDesc: "",
    //     ItemLen: "",
    //     ItemBth: "",
    //     ItemHgt: "",
    //     ItemMass:"",
    //   }      
    // ];

    this.lineItemGridOptions.defaultColDef = {
      editable: true,
      resizable: true
    };

    this.gridOptions = <GridOptions>{};



    this.gridOptions.pagination = true;
    this.gridOptions.paginationPageSize = 15;
    this.gridOptions.cacheBlockSize = 15;
    this.gridOptions.rowHeight = 25;
    this.gridOptions.maxBlocksInCache = 1;

           this.gridColumnDefs = [
          {
              headerName: "Waybill Number",
              field: "WaybillNumber",
              width: 150,
              sortable: true, 
              filter: true,
              checkboxSelection: true
          },
          {
            headerName: "Waybill Date",
            field: "WaybillDate",
            width: 100,
            sortable: true, 
            filter: true
          },
          {
            headerName: "Sender",
            field: "Sender",
            width: 100,
            sortable: true, 
            filter: true
          },
          {
            headerName: "Receiver",
            field: "Receiver",
            width: 100,
            sortable: true, 
            filter: true
          }  ,
          {
            headerName: "ServiceType",
            field: "ServiceType",
            width: 150,
            sortable: true, 
            filter: true                
          },
          {
            headerName: "Reference",
            field: "CustomerReference",
            width: 100,
            sortable: true, 
            filter: true              
          }                             
        ];

      
  }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadItems();
    }

  getWaybills(): void {
    this._callService.getWaybillList().subscribe(data => {
      if(data) {
        //this.waybills  = data.Waybill;
        this.isLoaded = true;
        console.log('List of Waybills', this.waybills);
        this.gridRowData = this.waybills;
        this.gridData = this.waybills;
        console.log('Populate the grid', this.gridRowData);

      }
    })
  };

  loopThru(): void {

    console.log('nodessss ');
    this.lineItemGridOptions.api.forEachNode( function(rowNode, index) {
      console.log('node ' + rowNode.data.ItemDesc + ' is in the grid');
  });
    
  };

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
