import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGstComponent } from './create-gst.component';

describe('CreateGstComponent', () => {
  let component: CreateGstComponent;
  let fixture: ComponentFixture<CreateGstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
