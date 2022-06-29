import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieCustomDataComponent } from './pie-custom-data.component';

describe('PieCustomDataComponent', () => {
  let component: PieCustomDataComponent;
  let fixture: ComponentFixture<PieCustomDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieCustomDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieCustomDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
