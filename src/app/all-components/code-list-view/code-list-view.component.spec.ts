import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeListViewComponent } from './code-list-view.component';

describe('CodeListViewComponent', () => {
  let component: CodeListViewComponent;
  let fixture: ComponentFixture<CodeListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeListViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
