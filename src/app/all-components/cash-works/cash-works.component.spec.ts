import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashWorksComponent } from './cash-works.component';

describe('CashWorksComponent', () => {
  let component: CashWorksComponent;
  let fixture: ComponentFixture<CashWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashWorksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
