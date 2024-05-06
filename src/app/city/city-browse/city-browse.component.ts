import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CityService } from '../city-service/city-service.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICityBrowse } from '../data/city.browse';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { CityEditComponent } from '../city-edit/city-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-city-browse',
  templateUrl: './city-browse.component.html',
  styleUrls: ['./city-browse.component.scss'],
})
export class CityBrowseComponent implements OnInit {
  private cityEdit: ICityBrowse;
  private city: ICityBrowse;
  public cityGrid: any;
  faTrashCan = faTrashCan;
  faPencil = faPencil;
  dataSource!: MatTableDataSource<ICityBrowse>;
  displayedColumns: string[] = [
    'id',
    'name',
    'postCode',
    'major',
    'noOfCitizens',
    'county',
    'action',
  ];
  constructor(
    private readonly cityService: CityService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCities();
  }

  public getCities(): void {
    this.cityService.getCities().subscribe({
      next: (val: ICityBrowse[]) => {
        this.dataSource = new MatTableDataSource(val);
      },
      complete: () => {
        this.dataSource._updateChangeSubscription();
      },
    });
  }

  public openEditDialog(cityId: number): void {
    this.cityService.getCity(cityId).subscribe({
      next: (val: ICityBrowse) => {
        this.cityEdit = val;
      },
      complete: () => {
        let editDialog = this.dialog
          .open(CityEditComponent, {
            height: '550px',
            width: '425px',
            data: {
              city: this.cityEdit,
              action: 'EDIT',
            },
          })
          .afterClosed()
          .subscribe({
            complete: () => {
              this.getCities();
              this.dataSource._updateChangeSubscription();
            },
          });
      },
    });
  }

  public openNewDialog(): void {
    let newDialog = this.dialog
      .open(CityEditComponent, {
        height: '550px',
        width: '425px',
        data: {
          action: 'NEW',
        },
      })
      .afterClosed()
      .subscribe({
        complete: () => {
          this.getCities();
          this.dataSource._updateChangeSubscription();
        },
      });
  }

  public deleteCity(cityId: number, cityName: string): void {
    if (confirm('Do you want to delete city ' + cityName + '?')) {
      const cityToDelete = this.getCity(cityId);
      const index = this.dataSource.data.indexOf(cityToDelete);
      this.cityService.deleteCity(cityId);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    } else {
      return;
    }
  }

  public searchcitiesByNamePostCode(searchTerm: string) {
    this.cityService.searchCity(searchTerm).subscribe({
      next: (val: ICityBrowse[]) => {
        this.dataSource = new MatTableDataSource(val);
      },
      complete: () => {
        this.dataSource._updateChangeSubscription();
      },
    });
  }

  public cancelSearch(): void {
    this.getCities();
  }

  public getCity(cityId: number): any {
    this.cityService.getCity(cityId).subscribe({
      next: (val: ICityBrowse) => {
        this.city = val;
      },
    });
  }
}
