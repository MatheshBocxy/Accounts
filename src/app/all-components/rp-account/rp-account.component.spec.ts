import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpAccountComponent } from './rp-account.component';

describe('RpAccountComponent', () => {
  let component: RpAccountComponent;
  let fixture: ComponentFixture<RpAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RpAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RpAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
