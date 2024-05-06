import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityService } from '../city-service/city-service.component';
import { ICityBrowse } from '../data/city.browse';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSelectModule } from '@angular/material/select';
import { IMajorBrowse } from 'src/app/major/data/major.browse';
import { ICountyBrowse } from 'src/app/county/data/county.browse';
import { CountyService } from 'src/app/county/county-service/county-service.component';
import { MajorService } from 'src/app/major/major-service/major-service.component';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss'],
})
export class CityEditComponent implements OnInit {
  cityForm: FormGroup;

  @Input() public cityBrowse: ICityBrowse;
  public modalTitle: string;
  public cityName: string = '';
  public cityPostCode: any = '';
  public cityMajor: any = {};
  public cityNoOfCitizens: any = '';
  public cityCounty: any = {};
  public majorDropdown: IMajorBrowse[];
  public countyDropdown: ICountyBrowse[];
  private cityId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private cityService: CityService,
    private countyService: CountyService,
    private majorService: MajorService,
    private fb: FormBuilder,
    private dialogRef: DialogRef<CityEditComponent>
  ) {
    this.cityForm = this.fb.group({
      name: this.dialogData.action === 'NEW' ? '' : this.cityName,
      postCode: this.dialogData.action === 'NEW' ? '' : this.cityPostCode,
      major: this.dialogData.action === 'NEW' ? '' : this.cityMajor,
      noOfCitizens:
        this.dialogData.action === 'NEW' ? '' : this.cityNoOfCitizens,
      county: this.dialogData.action === 'NEW' ? '' : this.cityCounty,
    });
  }

  ngOnInit() {
    this.countyService.getCounties().subscribe({
      next: (val: ICountyBrowse[]) => {
        this.countyDropdown = val;
      },
    });
    this.majorService.getMajors().subscribe({
      next: (val: IMajorBrowse[]) => {
        this.majorDropdown = val;
      },
    });
    if (this.dialogData.action === 'NEW') {
      this.modalTitle = 'Add New City';
    } else {
      this.cityService.getCity(this.dialogData.city.cityId).subscribe({
        next: (val: ICityBrowse) => {
          this.modalTitle = 'Edit ' + val.name;
          this.cityId = val.cityId;
          this.cityName = val.name;
          this.cityPostCode = val.postCode;
          this.cityMajor = val.major;
          this.cityCounty = val.county;
          this.cityNoOfCitizens = val.noOfCitizens;
        },
      });
    }
  }

  public saveChanges() {
    if (
      this.cityForm.value.name !== '' &&
      this.cityForm.value.name !== null &&
      this.cityForm.value.postCode !== null &&
      this.cityForm.value.major !== null &&
      this.cityForm.value.noOfCitizens !== null &&
      this.cityForm.value.county !== null
    ) {
      if (this.dialogData.action === 'NEW') {
        this.cityService.insertCity(
          this.cityForm.value.name,
          this.cityForm.value.postCode,
          this.cityForm.value.major.majorId,
          this.cityForm.value.noOfCitizens,
          this.cityForm.value.county.countyId
        );
      } else {
        this.cityService.updateCity(
          this.cityId,
          this.cityForm.value.name,
          this.cityForm.value.postCode,
          this.cityForm.value.major.majorId,
          this.cityForm.value.noOfCitizens,
          this.cityForm.value.county.countyId
        );
      }
      this.dialogRef.close();
    } else {
      return;
    }
  }
}
