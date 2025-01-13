import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASBeRbeBudgetComponent } from './as-be-rbe-budget.component';

describe('ASBeRbeBudgetComponent', () => {
  let component: ASBeRbeBudgetComponent;
  let fixture: ComponentFixture<ASBeRbeBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ASBeRbeBudgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ASBeRbeBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
