import { Component, OnInit, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { WaybillListService } from '../services/waybill-list.service';
import { Waybill } from '../models/waybill';
import { GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import {HttpClient, HttpParams} from '@angular/common/http';
import { async } from '@angular/core/testing';

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
  [x: string]: any;

  waybills : Waybill[];
  isLoaded = false;

  private gridOptions: GridOptions;


  constructor(private _callService: WaybillListService, private http: HttpClient) {


   }

  ngOnInit() {

    this.getWaybills();

    this.gridOptions = <GridOptions>{};

    this.gridOptions.pagination = true;
    this.gridOptions.paginationPageSize = 15;
    this.gridOptions.cacheBlockSize = 15;
    this.gridOptions.rowHeight = 25;
    this.gridOptions.maxBlocksInCache = 1;

    // this.gridOptions.columnDefs = [
    //           {
    //               headerName: "Waybill Number",
    //               field: "WaybillNumber",
    //               width: 150,
    //               sortable: true, 
    //               filter: true,
    //               checkboxSelection: true
    //           },
    //           {
    //             headerName: "Waybill Date",
    //             field: "WaybillDate",
    //             width: 100,
    //             sortable: true, 
    //             filter: true
    //           }
    //           {
    //               headerName: "Sender",
    //               field: "Sender",
    //               width: 150,
    //               sortable: true, 
    //               filter: true
    //           },
    //           {
    //             headerName: "ServiceType",
    //             field: "ServiceType",
    //             width: 150,
    //             sortable: true, 
    //             filter: true                
    //           },
    //           {
    //             headerName: "Time",
    //             field: "Time",
    //             width: 100,
    //             sortable: true, 
    //             filter: true              
    //         },
    //         {
    //           headerName: "TotalMass",
    //           field: "TotalMass",
    //           width: 100,
    //           sortable: true, 
    //           filter: true              
    //       },
    //       {
    //       headerName: "TotalParcels",
    //       field: "TotalParcels",
    //       width: 100,
    //       sortable: true, 
    //       filter: true              
    //    },
    //     {
    //       headerName: "WaybillNumber",
    //      field: "WaybillNumber",
    //      width: 100,
    //       sortable: true, 
    //       filter: true              
    //   },
    //   {
    //     headerName: "TotalParcels",
    //     field: "TotalParcels",
    //     width: 100,
    //     sortable: true, 
    //     filter: true 
    //   },  
    //   {
    //     headerName: "XRef",
    //     field: "XRef",
    //     width: 100,
    //     sortable: true, 
    //     filter: true              
    // }                   
         
    //];
     
      // this.gridOptions.rowData = [
      //         {WaybillNumber: 'WB001254', WaybillDate: '2019/10/21', Sender: 'Puma', Receiver: 'Edgars', ServiceType: 'SDX'},
      //         {WaybillNumber: 'WB001255', WaybillDate: '2019/10/22', Sender: 'Clover', Receiver: 'Checkers', ServiceType: 'ONX'},
      //         {WaybillNumber: 'WB001256', WaybillDate: '2019/10/22', Sender: 'I n J', Receiver: 'Pick n Pay', ServiceType: 'ECO'},
      //         {WaybillNumber: 'WB001257', WaybillDate: '2019/10/23', Sender: 'Nestle', Receiver: 'SPAR', ServiceType: 'ONX'}
      //     ];

        //   this.gridOptions.rowData = [
        //     {WaybillNumber: '111', WaybillDate: '2019/10/21', Sender: 'Puma', Receiver: 'Edgars', ServiceType: 'SDX'},
        //     {WaybillNumber: '222', WaybillDate: '2019/10/22', Sender: 'Clover', Receiver: 'Checkers', ServiceType: 'ONX'},
        //     {WaybillNumber: '333', WaybillDate: '2019/10/22', Sender: 'I n J', Receiver: 'Pick n Pay', ServiceType: 'ECO'},
        //     {WaybillNumber: '444', WaybillDate: '2019/10/23', Sender: 'Nestle', Receiver: 'SPAR', ServiceType: 'ONX'}
        // ];          

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
          // {
          //   headerName: "TotalMass",
          //   field: "TotalMass",
          //   width: 100,
          //   sortable: true, 
          //   filter: true              
          // },
          // {
          //   headerName: "TotalParcels",
          //   field: "TotalParcels",
          //   width: 100,
          //   sortable: true, 
          //   filter: true              
          // },
          {
            headerName: "Reference",
            field: "CustomerReference",
            width: 100,
            sortable: true, 
            filter: true              
          }                             
        ];

      //   this.gridRowData = [
      //     {WaybillNumber: 'ccc', WaybillDate: '2019/10/21', Sender: 'Puma', Receiver: 'Edgars', ServiceType: 'SDX'},
      //     {WaybillNumber: 'vvv', WaybillDate: '2019/10/22', Sender: 'Clover', Receiver: 'Checkers', ServiceType: 'ONX'},
      //     {WaybillNumber: 'nnn', WaybillDate: '2019/10/22', Sender: 'I n J', Receiver: 'Pick n Pay', ServiceType: 'ECO'},
      //     {WaybillNumber: 'mmm', WaybillDate: '2019/10/23', Sender: 'Nestle', Receiver: 'SPAR', ServiceType: 'ONX'}
      // ];   
         
        //   this.gridOptions.rowData =[{
        //     "Waybill": [
        //       {
        //         "WaybillNumber": "WB001777",
        //         "WaybillDate": "2019/10/16"
        //       },
        //       {
        //         "WaybillNumber": "WB001778",
        //         "WaybillDate": "2019/10/22"
        //       },
        //       {
        //         "WaybillNumber": "WB001779",
        //         "WaybillDate": "2019/10/23"
        //       }
        //     ]
        //   }
        // ]

        // this.gridOptions.rowData = [
        //     {
        //       "WaybillNumber": "WB001291",
        //       "WaybillDate": "2019/10/16"
        //     },
        //     {
        //       "WaybillNumber": "WB001292",
        //       "WaybillDate": "2019/10/22"
        //     },
        //     {
        //       "WaybillNumber": "WB001293",
        //       "WaybillDate": "2019/10/23"
        //     }
        //   ]


         // var myJSON = JSON.stringify(this.waybills);
          //this.gridOptions.rowData = myJSON.toString();
          //console.log('this.waybills', this.waybills)


          //this.gridRowData = this.waybills.values;

         

  }

  getWaybills(): void {
    this._callService.getWaybillList().subscribe(data => {
      if(data) {
        this.waybills  = data.Waybill;
        //this.gridOptions.rowData = data.Waybill.json;
        //var myJson =  data.Waybill;
        //console.log('myJson', this.waybills);
        this.isLoaded = true;
        console.log('List of Waybills', this.waybills);
        //this.gridOptions.rowData = data.Waybill;
        //console.log('Populate grid', JSON.stringify(myJson));
      
        this.gridRowData = this.waybills;
        console.log('Populate the grid', this.gridRowData);

      }
    })
  };

//   getSelectedRows() {
//     const selectedNodes = this.agGrid.api.getSelectedNodes();
//     const selectedData = selectedNodes.map( node => node.data );
//     const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
//     alert(`Selected nodes: ${selectedDataStringPresentation}`);
// }

}
