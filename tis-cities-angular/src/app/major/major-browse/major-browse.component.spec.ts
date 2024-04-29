import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorBrowseComponent } from './major-browse.component';

describe('MajorBrowseComponent', () => {
  let component: MajorBrowseComponent;
  let fixture: ComponentFixture<MajorBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorBrowseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
