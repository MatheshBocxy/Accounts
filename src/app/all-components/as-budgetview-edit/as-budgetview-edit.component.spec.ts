import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASBudgetviewEditComponent } from './as-budgetview-edit.component';

describe('ASBudgetviewEditComponent', () => {
  let component: ASBudgetviewEditComponent;
  let fixture: ComponentFixture<ASBudgetviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ASBudgetviewEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ASBudgetviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
