import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCashWorksComponent } from './create-cash-works.component';

describe('CreateCashWorksComponent', () => {
  let component: CreateCashWorksComponent;
  let fixture: ComponentFixture<CreateCashWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCashWorksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCashWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
