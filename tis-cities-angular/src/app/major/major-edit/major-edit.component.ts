import {
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MajorService } from '../major-service/major-service.component';
import { IMajorBrowse } from '../data/major.browse';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-Major-edit',
  templateUrl: './major-edit.component.html',
  styleUrls: ['./major-edit.component.scss'],
})
export class MajorEditComponent implements OnInit {
  majorForm: FormGroup;

  @Input() public majorBrowse: IMajorBrowse;
  public modalTitle: string;
  public majorName: string = '';
  public majorSurname: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private majorService: MajorService,
    private fb: FormBuilder,
    private dialogRef: DialogRef<MajorEditComponent>
  ) {
    this.majorForm = this.fb.group({
      name: (this.dialogData.action === 'NEW') ? '' : this.dialogData.name,
      majorId: this.dialogData.majorId,
      surname: (this.dialogData.action === 'NEW') ? '' : this.dialogData.surname
    });
  }

  ngOnInit() {
    if (this.dialogData.action === 'NEW') {
      this.modalTitle = 'Add New Major';
    } 
    else {
    this.majorService.getMajor(this.dialogData.majorId).subscribe({
      next: (val: IMajorBrowse) => {
        this.majorBrowse = { majorId: val.majorId, name: val.name, surname: val.surname };
        this.modalTitle = 'Edit ' + val.name + ' ' + val.surname;
        this.majorName = val.name;
        this.majorSurname = val.surname;
      },
    });
  }
  }

  public saveChanges() {
    if (
      this.majorForm.value.name !== '' &&
      this.majorForm.value.name !== null
    ) {
      if (this.dialogData.action === 'NEW') {
        this.majorService.insertMajor(this.majorForm.value.name, this.majorForm.value.surname);
      } else {
        this.majorService.updateMajor(
          this.majorForm.value.majorId,
          this.majorForm.value.name,
          this.majorForm.value.surname
        );
      }
      this.dialogRef.close();
    } else {
      return;
    }
  }
}
