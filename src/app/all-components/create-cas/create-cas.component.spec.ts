import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCasComponent } from './create-cas.component';

describe('CreateCasComponent', () => {
  let component: CreateCasComponent;
  let fixture: ComponentFixture<CreateCasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
