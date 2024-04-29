import {
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountyService } from '../county-service/county-service.component';
import { ICountyBrowse } from '../data/county.browse';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-county-edit',
  templateUrl: './county-edit.component.html',
  styleUrls: ['./county-edit.component.scss'],
})
export class CountyEditComponent implements OnInit {
  countyForm: FormGroup;

  @Input() public countyBrowse: ICountyBrowse;
  public modalTitle: string;
  public countyName: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private countyService: CountyService,
    private fb: FormBuilder,
    private dialogRef: DialogRef<CountyEditComponent>
  ) {
    this.countyForm = this.fb.group({
      name: (this.dialogData.action === 'NEW') ? '' : this.dialogData.name,
      countyId: this.dialogData.countyId,
    });
  }

  ngOnInit() {
    if (this.dialogData.action === 'NEW') {
      this.modalTitle = 'Add New County';
    } 
    else {
    this.countyService.getCounty(this.dialogData.countyId).subscribe({
      next: (val: ICountyBrowse) => {
        this.countyBrowse = { countyId: val.countyId, name: val.name };
        this.modalTitle = 'Edit ' + val.name;
        this.countyName = val.name;
      },
    });
  }
  }

  public saveChanges() {
    if (
      this.countyForm.value.name !== '' &&
      this.countyForm.value.name !== null
    ) {
      if (this.dialogData.action === 'NEW') {
        this.countyService.insertCounty(this.countyForm.value.name);
      } else {
        this.countyService.updateCounty(
          this.countyForm.value.countyId,
          this.countyForm.value.name
        );
      }
      this.dialogRef.close();
    } else {
      return;
    }
  }
}
