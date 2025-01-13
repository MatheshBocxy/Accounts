import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedFixedSplitupComponent } from './proposed-fixed-splitup.component';

describe('ProposedFixedSplitupComponent', () => {
  let component: ProposedFixedSplitupComponent;
  let fixture: ComponentFixture<ProposedFixedSplitupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProposedFixedSplitupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProposedFixedSplitupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
