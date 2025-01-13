import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationAsComponent } from './consolidation-as.component';

describe('ConsolidationAsComponent', () => {
  let component: ConsolidationAsComponent;
  let fixture: ComponentFixture<ConsolidationAsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsolidationAsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsolidationAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
