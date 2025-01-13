import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGeneralLedgerComponent } from './create-general-ledger.component';

describe('CreateGeneralLedgerComponent', () => {
  let component: CreateGeneralLedgerComponent;
  let fixture: ComponentFixture<CreateGeneralLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGeneralLedgerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGeneralLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
