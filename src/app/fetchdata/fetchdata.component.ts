import { Component, Inject } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import { ServiceType } from '../models/servicetype';
 
@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {

  serviceTypes: ServiceType[];
  isLoaded = false;

 constructor(private _testService: FetchdataService) { }

 getServiceTypes(): void {
   this._testService.getServiceTypes().subscribe(data => {
     if(data) {
       this.serviceTypes = data.ServiceType;
       this.isLoaded = true;
       console.log('List of Service Types', this.serviceTypes);
     }
   } );
 }

 ngOnInit() {
   this.getServiceTypes();
 }
}