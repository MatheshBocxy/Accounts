import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstPageTwoComponent } from './gst-page-two.component';

describe('GstPageTwoComponent', () => {
  let component: GstPageTwoComponent;
  let fixture: ComponentFixture<GstPageTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GstPageTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GstPageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
