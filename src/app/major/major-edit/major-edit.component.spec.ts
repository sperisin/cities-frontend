import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorEditComponent } from './major-edit.component';

describe('MajorEditComponent', () => {
  let component: MajorEditComponent;
  let fixture: ComponentFixture<MajorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
