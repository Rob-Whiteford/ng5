import { Component, OnInit, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { SiteListService } from '../services/site-list.service';
import { Site } from '../models/site.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators';
import { EditSiteComponent } from '../edit-site/edit-site.component';

@Component({
  selector: 'app-manifests',
  templateUrl: './view-sites.component.html',
  styleUrls: ['./view-sites.component.scss']
})

@NgModule({
  declarations: [
    EditSiteComponent,
  ],
  imports: [
    ReactiveFormsModule,
    GridModule,
    DialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ViewSitesComponent {

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
  private gridState: State = {
    skip: 0,
    take: 10
  };
  public editDataItem: Site;
  public isNew: boolean;
  private editService: SiteListService;

  getManifests(): void {
    this._callService.getSites().subscribe(data => {
      if (data) {
        //this.sites = data.Site;
        this.isLoaded = true;
        this.gridData = this.sites;
      }
    })
  };

  public onStateChange(state: State) {
    this.gridState = state;

    //this.editService.read();
  }

  public addHandler() {
    this.editDataItem = new Site();
    this.isNew = true;
  }

  public editHandler({ dataItem }) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }

  public saveHandler(site: Site) {
    this._callService.saveSite(site, this.isNew);

    this.editDataItem = undefined;
  }

  public removeHandler({dataItem}) {
    this._callService.deleteSite(dataItem);
}

  public cancelHandler() {
    this.editDataItem = undefined;
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

  public exportToExcel(grid: GridComponent): void {
    console.log("exportToExcel");
    grid.saveAsExcel();
  }

}
