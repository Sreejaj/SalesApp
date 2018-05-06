import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtdetailsComponent } from './debtdetails.component';

describe('DebtdetailsComponent', () => {
  let component: DebtdetailsComponent;
  let fixture: ComponentFixture<DebtdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
