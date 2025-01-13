import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationAsTableComponent } from './consolidation-as-table.component';

describe('ConsolidationAsTableComponent', () => {
  let component: ConsolidationAsTableComponent;
  let fixture: ComponentFixture<ConsolidationAsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsolidationAsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsolidationAsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
