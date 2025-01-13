import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBudgetListAndViewComponent } from './new-budget-list-and-view.component';

describe('NewBudgetListAndViewComponent', () => {
  let component: NewBudgetListAndViewComponent;
  let fixture: ComponentFixture<NewBudgetListAndViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBudgetListAndViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewBudgetListAndViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
