import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCodePopupformComponent } from './sub-code-popupform.component';

describe('SubCodePopupformComponent', () => {
  let component: SubCodePopupformComponent;
  let fixture: ComponentFixture<SubCodePopupformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCodePopupformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubCodePopupformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
