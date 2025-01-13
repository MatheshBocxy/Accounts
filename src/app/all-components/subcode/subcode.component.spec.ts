import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcodeComponent } from './subcode.component';

describe('SubcodeComponent', () => {
  let component: SubcodeComponent;
  let fixture: ComponentFixture<SubcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
