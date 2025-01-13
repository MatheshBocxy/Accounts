import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASBudgetTabeComponent } from './as-budget-tabe.component';

describe('ASBudgetTabeComponent', () => {
  let component: ASBudgetTabeComponent;
  let fixture: ComponentFixture<ASBudgetTabeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ASBudgetTabeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ASBudgetTabeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
