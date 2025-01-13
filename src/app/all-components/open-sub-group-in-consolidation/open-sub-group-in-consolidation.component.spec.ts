import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSubGroupInConsolidationComponent } from './open-sub-group-in-consolidation.component';

describe('OpenSubGroupInConsolidationComponent', () => {
  let component: OpenSubGroupInConsolidationComponent;
  let fixture: ComponentFixture<OpenSubGroupInConsolidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenSubGroupInConsolidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenSubGroupInConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
