import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugdetSplitUpForConsolidationComponent } from './bugdet-split-up-for-consolidation.component';

describe('BugdetSplitUpForConsolidationComponent', () => {
  let component: BugdetSplitUpForConsolidationComponent;
  let fixture: ComponentFixture<BugdetSplitUpForConsolidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugdetSplitUpForConsolidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BugdetSplitUpForConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
