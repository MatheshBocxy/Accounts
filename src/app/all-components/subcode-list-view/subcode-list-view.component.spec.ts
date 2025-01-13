import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcodeListViewComponent } from './subcode-list-view.component';

describe('SubcodeListViewComponent', () => {
  let component: SubcodeListViewComponent;
  let fixture: ComponentFixture<SubcodeListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcodeListViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcodeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
