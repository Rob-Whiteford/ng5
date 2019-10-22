import { Component, Inject } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import { ServiceType } from '../models/servicetypes';
 
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
   // fetch all the service types
   this.getServiceTypes();
   //this.serviceType = this.serviceTypes;
 }
}