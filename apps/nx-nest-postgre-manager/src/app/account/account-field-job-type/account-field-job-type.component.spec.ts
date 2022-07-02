import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFieldJobTypeComponent } from './account-field-job-type.component';

describe('AccountFieldJobTypeComponent', () => {
  let component: AccountFieldJobTypeComponent;
  let fixture: ComponentFixture<AccountFieldJobTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountFieldJobTypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFieldJobTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
