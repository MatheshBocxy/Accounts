import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAsBeRbeFormComponent } from './pop-up-as-be-rbe-form.component';

describe('PopUpAsBeRbeFormComponent', () => {
  let component: PopUpAsBeRbeFormComponent;
  let fixture: ComponentFixture<PopUpAsBeRbeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpAsBeRbeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpAsBeRbeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
