import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Site } from '../models/site.model';

@Component({
  selector: 'kendo-grid-edit-form',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.scss']
})
export class EditSiteComponent {
  public active = false;
  
  public editForm: FormGroup = new FormGroup({
      'SiteCode': new FormControl('', Validators.required),
      'SiteName': new FormControl('', Validators.required),
      'PostalCode': new FormControl('', Validators.required),
      'Address1': new FormControl('', Validators.required),
      'Address2': new FormControl('', Validators.required),
      'ContactName': new FormControl('', Validators.required),
      'ContactNumber': new FormControl('', Validators.required)
  });

  @Input() public isNew = false;

  @Input() public set model(site: Site) {
      this.editForm.reset(site);
      this.active = site !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<Site> = new EventEmitter();

  public onSave(e): void {
      e.preventDefault();
      this.save.emit(this.editForm.value);
      this.active = false;
  }

  public onCancel(e): void {
      e.preventDefault();
      this.closeForm();
  }

  private closeForm(): void {
      this.active = false;
      this.cancel.emit();
  }
}