import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChartPieComponent } from './account-chart-pie.component';

describe('AccountChartPieComponent', () => {
  let component: AccountChartPieComponent;
  let fixture: ComponentFixture<AccountChartPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountChartPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountChartPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
