import { Component, OnInit, AfterContentInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CountyService } from '../county-service/county-service.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICountyBrowse } from '../data/county.browse';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { CountyEditComponent } from '../county-edit/county-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-county-browse',
  templateUrl: './county-browse.component.html',
  styleUrls: ['./county-browse.component.scss']
})
export class CountyBrowseComponent implements OnInit {
  faTrashCan = faTrashCan;
  faPencil = faPencil;
  dataSource!: MatTableDataSource<ICountyBrowse>;
  displayedColumns: string[] = [
    'id',
    'name',
    'action'
  ];
  constructor(
    private readonly countyService: CountyService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCounties();
  }

  public getCounties(): void {
    this.countyService.getCounties().subscribe(
      { 
        next: (val: ICountyBrowse[]) => {
          this.dataSource = new MatTableDataSource(val);
        },
        complete: () => {
          this.dataSource._updateChangeSubscription();
        }
      }
    );
  }

  public openEditDialog(countyId: number): void {
    let editDialog = this.dialog.open(CountyEditComponent, {
      height: '250px',
      width: '400px',
      data: {
        countyId: countyId,
        action: 'EDIT'
      }
    }
    ).afterClosed().subscribe({
      complete: () => {
        this.getCounties(); 
      }
    });
  }

  public openNewDialog(): void {
    let newDialog = this.dialog.open(CountyEditComponent, {
      height: '250px',
      width: '400px',
      data: {
        action: 'NEW'
      }
    }).afterClosed().subscribe({
      complete: () => {
        this.getCounties(); 
      }
    });
  }

  public deleteCounty(countyId: number, countyName: string): void {
    if (confirm('Do you want to delete county ' + countyName + '?')) {
      this.countyService.deleteCounty(countyId);
      const countyToDelete: ICountyBrowse = { countyId: countyId, name: countyName };
      const index = this.dataSource.data.indexOf(countyToDelete);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    } else {
      return;
    }
  }

  public searchCountiesByName(searchTerm: string) {
    this.countyService.searchCounty(searchTerm).subscribe({
      next: (val: ICountyBrowse[]) => {
        this.dataSource = new MatTableDataSource(val);
      },
      complete: () => {
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  public cancelSearch(): void {
    
    this.getCounties();
  }
}
