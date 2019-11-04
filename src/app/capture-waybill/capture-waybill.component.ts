import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceTypeService } from '../services/service-type.service';
import { ServiceType } from '../models/servicetype';
import { SiteListService } from '../services/site-list.service';
import { LineItem } from '../models/lineitem.model';
import { Observable, of, from } from 'rxjs';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { switchMap, tap, delay, map } from 'rxjs/operators';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-capture-waybill',
  templateUrl: './capture-waybill.component.html',
  styleUrls: ['./capture-waybill.component.scss'
  ]
})
export class CaptureWaybillComponent implements OnInit {
  @ViewChild("SenderList", { static: false }) senderList;
  @ViewChild("ReceiverList", { static: false }) receiverList;
  @ViewChild("WaybillItems", { static: false }) waybillItems;
  @ViewChild(DataBindingDirective, { static: false }) dataBinding: DataBindingDirective;

  public siteListSource: Array<{ SiteName: string, SiteCode: string }> = [];
  public siteListData: Array<{ SiteName: string, SiteCode: string }>;

  public DefaultWaybillDate: Date = new Date();
  public serviceTypes: ServiceType[];
  public serviceType: ServiceType;
  lineItem: LineItem[];

  public lineItemData: Array<LineItem> = [];
  public gridData: any[];
  isLoaded = false;

  private editedRowIndex: number;
  private editedLineItem: LineItem;

  constructor(private _httpServiceTypeService: ServiceTypeService, private _httpSiteService: SiteListService, private formBuilder: FormBuilder) {
    this.siteListData = this.siteListSource.slice();
  }

  ngOnInit() {
    this.refreshPage();
  }

  addLineItem(dataItem: any) {
    console.log('addLineItem');
    this.lineItemData.push({ ItemQuantity: dataItem.ItemQuantity, ItemDescription: dataItem.ItemDescription, ItemLength: dataItem.ItemLength, ItemWidth: dataItem.ItemWidth, ItemHeight: dataItem.ItemHeight, ItemMass: dataItem.ItemMass });
    this.refreshGrid();
  }

  deleteLineItem(rowIndex: number) {
    this.lineItemData.splice (rowIndex, 1);
    this.refreshGrid();
  }

  ngAfterViewInit() {
    const contains = value => s => s.SiteName.toLowerCase().indexOf(value.toLowerCase()) !== -1;

    this.senderList.filterChange.asObservable().pipe(
      switchMap(value => from([this.siteListSource]).pipe(
        tap(() => this.senderList.loading = true),
        delay(100),
        map((data) => data.filter(contains(value)))
      ))
    )
      .subscribe(x => {
        this.siteListData = x;
        this.senderList.loading = false;
      });

    this.receiverList.filterChange.asObservable().pipe(
      switchMap(value => from([this.siteListSource]).pipe(
        tap(() => this.receiverList.loading = true),
        delay(100),
        map((data) => data.filter(contains(value)))
      ))
    )
      .subscribe(x => {
        this.siteListData = x;
        this.receiverList.loading = false;
      });

  }

  refreshPage() {
    this.refreshGrid();
    this.getServiceTypes();
    this.getSites();
  }

  getServiceTypes(): void {
    this._httpServiceTypeService.getServiceTypes().subscribe(data => {
      if (data) {
        //this.serviceTypes = data.ServiceType;
        this.isLoaded = true;
        //console.log('List of Service Types', this.serviceTypes);
      }
    });
  }

  getSites(): void {
    this._httpSiteService.getSites().subscribe(data => {
      if (data) {
        //this.siteListSource = data.Site;
        this.isLoaded = true;
        //console.log('List of Sites', this.siteListSource);
      }
    });
  }

  public createFormGroup(dataItem: any): FormGroup {

    return this.formBuilder.group({
      'ItemQuantity': dataItem.ItemQuantity,
      'ItemDescription': [dataItem.ItemDescription, Validators.required],
      'ItemLength': [dataItem.ItemLength, Validators.required],
      'ItemWidth': [dataItem.ItemWidth, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])],
      'ItemHeight': dataItem.ItemHeight,
      'ItemMass': dataItem.ItemMass,
    });

  }

  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };

  public onStateChange(state: State) {
    this.gridState = state;
  }


  public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    if (!isEdited) {
      sender.editCell(rowIndex, columnIndex, this.createFormGroup(dataItem));
    }
  }

  public cellCloseHandler(args: any) {
    const { formGroup, dataItem } = args;

    if (!formGroup.valid) {
      // prevent closing the edited cell if there are invalid values.
      args.preventDefault();
    } else if (formGroup.dirty) {
      //this.editService.assignValues(dataItem, formGroup.value);
      //this.editService.update(dataItem);
    }
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    // close the previously edited item
    this.closeEditor(sender);
    //console.log('editHandler:', dataItem)
    // track the most recently edited row
    // it will be used in `closeEditor` for closing the previously edited row
    this.editedRowIndex = rowIndex;

    // clone the current - `[(ngModel)]` will modify the original item
    // use this copy to revert changes
    this.editedLineItem = Object.assign({}, dataItem);

    // edit the row
    sender.editRow(rowIndex);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    sender.addRow(this.createFormGroup(new LineItem()));
  }
  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);

    // revert the data item to original state
    //this.editService.resetItem(this.editedProduct, rowIndex);

    // reset the helpers
    this.editedRowIndex = undefined;
    this.editedLineItem = undefined;
  }
  public cancelHandler({ sender, rowIndex }) {
    sender.closeRow(rowIndex);
  }

  public saveHandler({ sender, rowIndex, dataItem, isNew }) {
    //console.log('saveHandler:', isNew);
    if (isNew) {
      this.addLineItem(dataItem);
    }
    else{
      //Update line
    }
    sender.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.editedLineItem = undefined;
  }

  public removeHandler({ sender, dataItem, rowIndex }) {
    //this.editService.remove(dataItem);
    //console.log('removeHandler:', rowIndex);
    this.deleteLineItem(rowIndex);
    sender.cancelCell();
  }

  public saveChanges(grid: any): void {
    grid.closeCell();
    grid.cancelCell();

    //this.editService.saveChanges();
  }

  public cancelChanges(grid: any): void {
    grid.cancelCell();

    //this.editService.cancelChanges();
  }

  refreshGrid(): void {
    this.gridData = this.lineItemData;
    this.gridData = this.gridData.slice(0, 10);
    //this.dataBinding.skip = 0;
    console.log('refreshGrid:lineItemData', this.lineItemData);
    console.log('refreshGrid:gridData:', this.gridData);
  }

}
