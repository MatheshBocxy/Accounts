import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrl: './create-receipt.component.css'
})
export class CreateReceiptComponent implements OnInit {
  showAlloteeFields: boolean = false;
  division: string;
  role: string;
  id: any
  mode: any
  dropdownOptions: any[] = ['Allotee', 'Staff', 'Contractor', 'Others'];
  RecepitForm: FormGroup;
  paymentType: string;
  constructor(
    private fb: FormBuilder,
    private apiCall: ApiservicesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) {
    this.division = sessionStorage.getItem('division');
    this.role = sessionStorage.getItem('role');

    this.route.params.subscribe((params) => {
      this.id = params['receiptNo'];
      console.log("iddddd", this.id);

      this.mode = params['mode'];
      console.log(this.id);
      console.log(this.mode);
    });
  }
  arrayScheduleDropDown: any
  ngOnInit() {
    this.RecepitForm = this.fb.group({
      ReceiptNumber: ['', Validators.required],
      ReceiptFor: ['', Validators.required],
      rentalType: ['', Validators.required],
      schemeName: ['', Validators.required],
      unitNumber: ['', Validators.required],
      allotteName: ['', Validators.required],
      paymentType: ['', Validators.required],
      NeftPay: ['', Validators.required],
      chequePay: ['', Validators.required],
      ddPay: ['', Validators.required],
      jvPay: ['', Validators.required],
      neftDate: ['', Validators.required],
      ChequeDate: ['', Validators.required],
      ddDate: ['', Validators.required],
      jvDate: ['', Validators.required],
      totalAmount: ['', Validators.required],
      assetNo: ['', Validators.required],
      assetNoName: ['', Validators.required],
      toPerson: ['', Validators.required],
      scheme: ['', Validators.required],
      block: ['', Validators.required],
      floor: ['', Validators.required],
      bank: ['', Validators.required],

      receiptRemarks: ['', Validators.required],
      receiptDate: ['', Validators.required],

      receiptArrays: this.fb.array([]),
    });
    // ---- array function -----
    this.addReceiptArray();
    this.getByid(this.id)
  }

  paymentTypeChange(event: any) {
    this.paymentType = event.target.value;
    console.log(this.paymentType, '--- payment Type ----');
  }

  get receiptPayment() {
    return this.RecepitForm.get('receiptArrays') as FormArray
  }

  addReceiptArray(data: any = { accountCode: '', amount: '' }) {
    const receiptArray = this.fb.group({
      accountCode: [data.accountCode, Validators.required],
      amount: [data.amount, Validators.required],
    });
    this.receiptPayment.push(receiptArray);
  }

  removePayment(index: number) {
    this.receiptPayment.removeAt(index);
  }

  onReceiptForChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.showAlloteeFields = selectedValue === 'Allotee';
  }
  getByid(id: any) {
    this.apiCall.getReceiptById(id).subscribe((response) => {
      if (response && response.responseObject) {
        const data = response.responseObject;

        const formattedDate = new Date(data.receiptDate).toISOString().split('T')[0];

        console.log(formattedDate, 'formattedDate');


        this.RecepitForm.patchValue({
          ReceiptNumber: data.receiptNo || '',
          receiptDate: formattedDate || '',
          totalAmount: (+data.amount).toFixed(2) || '',
          schemeName: data.scheme || '',
          unitNumber: data.assetNo || '',
          allotteName: data.toPerson || '',
          paymentType: data.paymentType || '',
          receiptRemarks: data.narration || '',
          ReceiptFor: data.userType || '',
          assetNo: data.assetNo,
          assetNoName: data.assetNoName,
          toPerson: data.toPerson,
          scheme: data.scheme,
          block: data.block,
          floor: data.floor,
          bank: data.bank,
        });

        this.receiptPayment.clear();
        if (data.componentsListAllDTOList.length > 0) {
          data.componentsListAllDTOList.forEach((component: any) => {
            this.addReceiptArray({
              accountCode: `${component.accountCode} - ${component.description}` || '',
              amount: component.amount || '',
            });

          });
          this.RecepitForm.disable();

        }
      } else {
        console.error('No valid response object found for receipt.');
      }
    });
  }

}
