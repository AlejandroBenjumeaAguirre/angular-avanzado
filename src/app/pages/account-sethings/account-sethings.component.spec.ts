import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSethingsComponent } from './account-sethings.component';

describe('AccountSethingsComponent', () => {
  let component: AccountSethingsComponent;
  let fixture: ComponentFixture<AccountSethingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSethingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSethingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
