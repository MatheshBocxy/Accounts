import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIeAccountComponent } from './create-ie-account.component';

describe('CreateIeAccountComponent', () => {
  let component: CreateIeAccountComponent;
  let fixture: ComponentFixture<CreateIeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateIeAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateIeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
