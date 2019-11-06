import { Component, OnInit, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { SiteListService } from '../services/site-list.service';
import { Site } from '../models/site.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GridModule } from '@progress/kendo-angular-grid';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { GridComponent } from '@progress/kendo-angular-grid';

import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-manifests',
  templateUrl: './view-sites.component.html',
  styleUrls: ['./view-sites.component.scss']
})

@NgModule({
  declarations: [
  ],
  imports: [GridModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ViewSitesComponent  {

  constructor(private _callService: SiteListService, private http: HttpClient) {
    this.getManifests();
   }

  private sites: Site[];
  private isLoaded = false;
  private gridColumnDefs: any;
  private pageSize = 10;
  private skip = 0
  private gridData: any[];
  private view: Observable<GridDataResult>;
  private state: State = {
    skip: 0,
    take: 5
  };

  getManifests(): void {
    this._callService.getSites().subscribe(data => {
      if (data) {
        this.sites  = data.Site;
        this.isLoaded = true;
        this.gridData = this.sites;
      }
    })
  };

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

  public exportToExcel(grid: GridComponent): void {
    console.log("exportToExcel");
    grid.saveAsExcel();
  }

}
