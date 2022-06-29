import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsmindComponent } from './jsmind.component';

describe('JsmindComponent', () => {
  let component: JsmindComponent;
  let fixture: ComponentFixture<JsmindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsmindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsmindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
