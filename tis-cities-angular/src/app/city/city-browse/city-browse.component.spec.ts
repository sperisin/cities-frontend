import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBrowseComponent } from './city-browse.component';

describe('CityBrowseComponent', () => {
  let component: CityBrowseComponent;
  let fixture: ComponentFixture<CityBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityBrowseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
