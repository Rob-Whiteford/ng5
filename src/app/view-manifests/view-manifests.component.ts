import { Component, OnInit, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ManifestListService } from '../services/manifest-list.service';
import { Manifest } from '../models/manifest.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GridModule } from '@progress/kendo-angular-grid';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-manifests',
  templateUrl: './view-manifests.component.html',
  styleUrls: ['./view-manifests.component.scss']
})

@NgModule({
  declarations: [
  ],
  imports: [GridModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ViewManifestsComponent  {

  constructor(private _callService: ManifestListService, private http: HttpClient) {
    this.getManifests();
   }

  private manifests: Manifest[];
  private isLoaded = false;
  private gridColumnDefs: any;
  private gridRowData: any;
  private pageSize = 10;
  private skip = 0
  private gridData: any[];
  private view: Observable<GridDataResult>;
  private state: State = {
    skip: 0,
    take: 5
  };

  getManifests(): void {
    this._callService.getManifestList().subscribe(data => {
      if (data) {
      this.manifests  = data.Manifest;
        this.isLoaded = true;
        this.gridRowData = this.manifests;
        this.gridData = this.manifests;
      }
    })
  };

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

}
