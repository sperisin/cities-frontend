import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountyBrowseComponent } from './county-browse.component';

describe('CountyBrowseComponent', () => {
  let component: CountyBrowseComponent;
  let fixture: ComponentFixture<CountyBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountyBrowseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountyBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
