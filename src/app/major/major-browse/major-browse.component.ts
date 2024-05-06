import { Component, OnInit, AfterContentInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MajorService } from '../major-service/major-service.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IMajorBrowse } from '../data/major.browse';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { MajorEditComponent } from '../major-edit/major-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-major-browse',
  templateUrl: './major-browse.component.html',
  styleUrls: ['./major-browse.component.scss']
})
export class MajorBrowseComponent implements OnInit {
  faTrashCan = faTrashCan;
  faPencil = faPencil;
  dataSource!: MatTableDataSource<IMajorBrowse>;
  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'action'
  ];
  constructor(
    private readonly majorService: MajorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getMajors();
  }

  public getMajors(): void {
    this.majorService.getMajors().subscribe(
      { 
        next: (val: IMajorBrowse[]) => {
          this.dataSource = new MatTableDataSource(val);
        },
        complete: () => {
          this.dataSource._updateChangeSubscription();
        }
      }
    );
  }

  public openEditDialog(majorId: number): void {
    let editDialog = this.dialog.open(MajorEditComponent, {
      height: '325px',
      width: '400px',
      data: {
        majorId: majorId,
        action: 'EDIT'
      }
    }
    ).afterClosed().subscribe({
      complete: () => {
        this.getMajors(); 
      }
    });
  }

  public openNewDialog(): void {
    let newDialog = this.dialog.open(MajorEditComponent, {
      height: '325px',
      width: '400px',
      data: {
        action: 'NEW'
      }
    }).afterClosed().subscribe({
      complete: () => {
        this.getMajors(); 
      }
    });
  }

  public deleteMajor(majorId: number, majorName: string, majorSurname: string): void {
    if (confirm('Do you want to delete major ' + majorName + ' ' + majorSurname + '?')) {
      this.majorService.deleteMajor(majorId);
      const majorToDelete: IMajorBrowse = { majorId: majorId, name: majorName, surname: majorSurname };
      const index = this.dataSource.data.indexOf(majorToDelete);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    } else {
      return;
    }
  }

  public searchMajorsByNameSurname(searchTerm: string) {
    this.majorService.searchMajor(searchTerm).subscribe({
      next: (val: IMajorBrowse[]) => {
        this.dataSource = new MatTableDataSource(val);
      },
      complete: () => {
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  public cancelSearch(): void {
    
    this.getMajors();
  }
}
