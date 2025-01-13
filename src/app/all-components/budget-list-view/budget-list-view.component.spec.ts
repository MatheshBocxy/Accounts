import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetListViewComponent } from './budget-list-view.component';

describe('BudgetListViewComponent', () => {
  let component: BudgetListViewComponent;
  let fixture: ComponentFixture<BudgetListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetListViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
