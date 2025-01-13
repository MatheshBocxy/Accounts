import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JvListViewComponent } from './jv-list-view.component';

describe('JvListViewComponent', () => {
  let component: JvListViewComponent;
  let fixture: ComponentFixture<JvListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JvListViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JvListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
