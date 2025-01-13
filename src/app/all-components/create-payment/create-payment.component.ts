import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ApiservicesService } from '../../service/apiservices.service';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrl: './create-payment.component.css'
})
export class CreatePaymentComponent implements OnInit {

  paymentForm: FormGroup;
  addTaxesForm: FormGroup;
  lessTaxesForm: FormGroup;
  voucherForm: FormGroup;
  // accountCode: any;
  codeName: any;
  creditCode: any;
  bankCode: any;
  sgstCal: any;
  sgstPer: any;
  sgstAmt: any;
  debitAmount: any;
  addTaxAmount: any;
  lessTaxAmount: any;
  debitAmountTotal: any;
  netTotalAmount: any;
  amountAddTotal: any;
  userDivision: any;
  budgetAllocationValueBE: any;
  budgetAllocationValueRBE: any;
  billNumber: any;
  // division: string;
  role: string;
  todaysDate: string = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  jwfValue: any;
  billnumber: any;
  accountCode: any[] = [];
  selectedBudgetId: any;
  selectedCodeIds: string[] = [];
  selectedCodeId: string | null = null;
  division: string;
  budgetallocation: void;
  berbe: any;
  codeId: any;

  constructor(

    private fb: FormBuilder,
    private apiCall: ApiservicesService,
    private router: Router,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe,

  ) {
    this.userDivision = sessionStorage.getItem('division');
    this.role = sessionStorage.getItem('role');
    console.log("roleeeeeeeee", this.role);

  }

  ngOnInit(): void {

    this.paymentForm = this.fb.group({
      billNumber: [{ value: '', disabled: true }],
      billDate: ['', Validators.required],
      fileNo: ['', Validators.required],

      passedTotalAmount: ['', Validators.required],
      passedAddTaxes: ['', Validators.required],
      passedLessTaxes: ['', Validators.required],
      passedNetTotal: ['', Validators.required],

      paymentArrays: this.fb.array([]),
      paymentStatus: this.fb.array([]),

    });

    // this.billNoGenarate();
    // this.getAccountingCode();
    this.addPayment();
    this.addPaymentStatus();
    this.getBillnumber();
    this.getDebitCode();

    const formPaymentArray = this.paymentForm.get('paymentArrays') as FormArray;
    formPaymentArray.valueChanges.subscribe(_ => this.updateTotalAmount());
    console.log(this.todaysDate);

    this.paymentForm.get('billDate').patchValue(this.todaysDate);
    this.patchTodaysDate();

    this.formPayment.controls.forEach((group: any, index: any) => {
      this.setupFormListeners(group, index);
    });

  }

  patchTodaysDate() {
    this.paymentStatusArray.controls.forEach((control) => {
      control.get('saRemarksDate').patchValue(this.todaysDate);
      control.get('assDivRemarksDate').patchValue(this.todaysDate);
      control.get('daRemarksDate').patchValue(this.todaysDate);
    });
  }

  updateTotalAmount() {
    const formPaymentArray = this.paymentForm.get('paymentArrays') as FormArray;
    let totalAmount = 0;
    let netTotal = 0;
    let addTaxes = 0;
    let lessTaxes = 0;

    formPaymentArray.controls.forEach(control => {
      totalAmount += parseFloat(control.get('debitAmount').value) || 0;
      addTaxes += parseFloat(control.get('addTaxes').value) || 0;
      lessTaxes += parseFloat(control.get('lessTaxes').value) || 0;
      netTotal = totalAmount + addTaxes - lessTaxes
    });

    this.paymentForm.patchValue({
      passedTotalAmount: totalAmount,
      passedAddTaxes: addTaxes,
      passedLessTaxes: lessTaxes,
      passedNetTotal: netTotal
    });
  }

  get formPayment() {
    return this.paymentForm.get('paymentArrays') as FormArray;
  }

  get paymentStatusArray() {
    return this.paymentForm.get('paymentStatus') as FormArray;
  }

  addPaymentStatus() {
    const paymentStatus = this.fb.group({

      saSignature: [''],
      saRemarks: [''],
      saRemarksDate: [''],

      soSignature: [''],
      soRemarks: [''],
      soRemarksDate: [''],

      asSignature: [''],
      asRemarks: [''],
      asRemarksDate: [''],

      dsSignature: [''],
      dsRemarks: [''],
      dsRemarksDate: [''],

      spoSignature: [''],
      spoRemarks: [''],
      spoRemarksDate: [''],

      daSignature: [''],
      daRemarks: [''],
      daRemarksDate: [''],

      dcaoSignature: [''],
      dcaoRemarks: [''],
      dcaoRemarksDate: [''],

      faSignature: [''],
      faRemarks: [''],
      faRemarksDate: [''],

      assDivSignature: [''],
      assDivRemarks: [''],
      assDivRemarksDate: [''],

      daDivSignature: [''],
      daDivRemarks: [''],
      daDivRemarksDate: [''],

      eeDivSignature: [''],
      eeDivRemarks: [''],
      eeDivRemarksDate: [''],

    });
    this.paymentStatusArray.push(paymentStatus);
  }

  addPayment() {
    const payment = this.fb.group({
      debitCode: [''],
      budgetAllocation: [{ value: '', disabled: true }], // Set as read-only initially
      balance: [{ value: '', disabled: true }], // Set as read-only initially
      mrMs: [''],
      paymentName: [''],
      gstNo: [''],
      panNo: [''],
      bankName: [''],
      bankBranch: [''],
      accountName: [''],
      accountNo: [''],
      ifscCode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
        ]
      ],
      jws: [''],
      others: [''],
      debitAmount: [''],
      addTaxes: [''],
      sgstPercentage: [''],
      sgstAmount: [''],
      cgstPercentage: [''],
      cgstAmount: [''],
      igstPercentage: [''],
      iggstAmount: [''],
      debitGrossTotal: [''],
      lessTaxes: [''],
      itrDedPercentage: [''],
      itrDedAmount: [''],
      gstDedPercentage: [''],
      gstDedAmount: [''],
      gstTdsPercentage: [''],
      gstTdsAmount: [''],
      debitNetTotal: [''],
    });

    this.formPayment.push(payment);
    this.setupFormListeners(payment, this.formPayment.length - 1);
  }
  get ifscCodeControl() {
    return this.paymentForm.get('ifscCode');
  }

  removePayment(index: number) {
    this.formPayment.removeAt(index);
  }
  getDebitCode() {
    this.apiCall.apiPostCall('api/code/getAll', {}).subscribe((data) => {
      console.log("data for debit code", data);

      if (data && data.responseObject) {
        this.accountCode = data.responseObject.map((item: any) => {
          return { codeAndDescription: `${item.codeNumber} - ${item.codeName}`, id: item.id };
        });
      }
    });
  }



  // submit() {
  //   let payload = {
  //     billNumber: this.paymentForm.get('billNumber').value,
  //     billDate: this.paymentForm.get('billDate').value,
  //     fileNo: this.paymentForm.get('fileNo').value,

  //     totalAmount: this.paymentForm.get('passedTotalAmount').value,
  //     passedForAddTaxes: this.paymentForm.get('passedAddTaxes').value,
  //     passedForLessTaxes: this.paymentForm.get('passedLessTaxes').value,
  //     passedForNetTotal: this.paymentForm.get('passedNetTotal').value,

  //     division: this.userDivision,
  //     divisionUser: this.role,

  //     saStatus: '',
  //     soStatus: '',
  //     asStatus: '',
  //     dsStatus: '',
  //     spoStatus: '',
  //     daStatus: '',
  //     dcaoStatus: '',
  //     faStatus: '',
  //     assDivStatus: "Active",
  //     daDivStatus: "Pending",
  //     eeDivStatus: "Pending",
  //     flowStatus: '',
  //     asDsStatus:'',
  //     billRiseMember: this.role,

  //     paymentArray: [],
  //     paymentStatus: [],
  //   }

  //   this.paymentStatusArray.controls.forEach(paymentStatusArray => {
  //     payload.paymentStatus.push({
  //       saSignature: paymentStatusArray.get('saSignature').value,
  //       saRemarks: paymentStatusArray.get('saRemarks').value,
  //       saRemarksDate: paymentStatusArray.get('saRemarksDate').value,

  //       soSignature: paymentStatusArray.get('soSignature').value,
  //       soRemarks: paymentStatusArray.get('soRemarks').value,
  //       soRemarksDate: paymentStatusArray.get('soRemarksDate').value,

  //       asSignature: paymentStatusArray.get('asSignature').value,
  //       asRemarks: paymentStatusArray.get('asRemarks').value,
  //       asRemarksDate: paymentStatusArray.get('asRemarksDate').value,

  //       dsSignature: paymentStatusArray.get('dsSignature').value,
  //       dsRemarks: paymentStatusArray.get('dsRemarks').value,
  //       dsRemarksDate: paymentStatusArray.get('dsRemarksDate').value,

  //       spoSignature: paymentStatusArray.get('spoSignature').value,
  //       spoRemarks: paymentStatusArray.get('spoRemarks').value,
  //       spoRemarksDate: paymentStatusArray.get('spoRemarksDate').value,

  //       daSignature: paymentStatusArray.get('daSignature').value,
  //       daRemarks: paymentStatusArray.get('daRemarks').value,
  //       daRemarksDate: paymentStatusArray.get('daRemarksDate').value,

  //       dcaoSignature: paymentStatusArray.get('dcaoSignature').value,
  //       dcaoRemarks: paymentStatusArray.get('dcaoRemarks').value,
  //       dcaoRemarksDate: paymentStatusArray.get('dcaoRemarksDate').value,

  //       faSignature: paymentStatusArray.get('faSignature').value,
  //       faRemarks: paymentStatusArray.get('faRemarks').value,
  //       faRemarksDate: paymentStatusArray.get('faRemarksDate').value,

  //       assDivSignature: paymentStatusArray.get('assDivSignature').value,
  //       assDivRemarks: paymentStatusArray.get('assDivRemarks').value,
  //       assDivRemarksDate: paymentStatusArray.get('assDivRemarksDate').value,

  //       daDivSignature: paymentStatusArray.get('daDivSignature').value,
  //       daDivRemarks: paymentStatusArray.get('daDivRemarks').value,
  //       daDivRemarksDate: paymentStatusArray.get('daDivRemarksDate').value,

  //       eeDivSignature: paymentStatusArray.get('eeDivSignature').value,
  //       eeDivRemarks: paymentStatusArray.get('eeDivRemarks').value,
  //       eeDivRemarksDate: paymentStatusArray.get('eeDivRemarksDate').value,
  //     });
  //   });

  //   this.formPayment.controls.forEach(paymentGroup => {
  //     let paymentName = paymentGroup.get('mrMs').value + '.' + paymentGroup.get('paymentName').value;
  //     payload.paymentArray.push({
  //       debitCode: paymentGroup.get('debitCode').value,
  //       budgetAllocation: paymentGroup.get('budgetAllocation').value,
  //       balance: paymentGroup.get('balance').value,
  //       mrMs: paymentGroup.get('mrMs').value,
  //       paymentName: paymentGroup.get('paymentName').value,
  //       gstNo: paymentGroup.get('gstNo').value,
  //       panNo: paymentGroup.get('panNo').value,
  //       bankName: paymentGroup.get('bankName').value,
  //       branchName: paymentGroup.get('branchName').value,
  //       accountName: paymentGroup.get('accountName').value,
  //       accountNo: paymentGroup.get('accountNo').value,
  //       ifscCode: paymentGroup.get('ifscCode').value,
  //       jws: paymentGroup.get('jws').value,
  //       others: paymentGroup.get('others').value,
  //       debitAmount: paymentGroup.get('debitAmount').value,
  //       addTaxes: paymentGroup.get('addTaxes').value,
  //       sgstPercentage: paymentGroup.get('sgstPercentage').value,
  //       sgstAmount: paymentGroup.get('sgstAmount').value,
  //       cgstPercentage: paymentGroup.get('cgstPercentage').value,
  //       cgstAmount: paymentGroup.get('cgstAmount').value,
  //       igstPercentage: paymentGroup.get('igstPercentage').value,
  //       iggstAmount: paymentGroup.get('iggstAmount').value,
  //       debitGrossTotal: paymentGroup.get('debitGrossTotal').value,
  //       lessTaxes: paymentGroup.get('lessTaxes').value,
  //       itrDedPercentage: paymentGroup.get('itrDedPercentage').value,
  //       itrDedAmount: paymentGroup.get('itrDedAmount').value,
  //       gstDedPercentage: paymentGroup.get('gstDedPercentage').value,
  //       gstDedAmount: paymentGroup.get('gstDedAmount').value,
  //       gstTdsPercentage: paymentGroup.get('gstTdsPercentage').value,
  //       gstTdsAmount: paymentGroup.get('gstTdsAmount').value,
  //       debitNetTotal: paymentGroup.get('debitNetTotal').value,
  //       codeId: paymentGroup.get('codeId').value, // Adding codeId from the form
  //     });
  //   });

  //   console.log(payload);

  //   this.apiCall.apiPostCall('api/payment/create', payload).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.router.navigate(['/famodule/home/payment']);
  //       this.snackbar.open('Payment created successfully!', 'close', {
  //         duration: 3000,
  //       });
  //       this.billNumberStatus();
  //     },
  //     (err) => {
  //       console.log(err);
  //       this.snackbar.open('Enter all fields!', 'close', {
  //         duration: 3000,
  //       });
  //     }
  //   );
  // }

  submit2() {
    let payload = {
      billNumber: this.paymentForm.get('billNumber').value,
      billDate: this.paymentForm.get('billDate').value,
      fileNo: this.paymentForm.get('fileNo').value,

      totalAmount: this.paymentForm.get('passedTotalAmount').value,
      passedForAddTaxes: this.paymentForm.get('passedAddTaxes').value,
      passedForLessTaxes: this.paymentForm.get('passedLessTaxes').value,
      passedForNetTotal: this.paymentForm.get('passedNetTotal').value,

      division: this.userDivision,

      divisionUser: this.role,

      saStatus: '',
      soStatus: '',
      asStatus: '',
      dsStatus: '',
      spoStatus: '',
      daStatus: '',
      dcaoStatus: '',
      faStatus: '',
      assDivStatus: "Active",
      daDivStatus: "Pending",
      eeDivStatus: "Pending",
      billRiseMember: this.role,
      flowStatus: '',

      paymentArrays: [],
      paymentStatus: [],
    }

    this.paymentStatusArray.controls.forEach(paymentStatusArray => {

      payload.paymentStatus.push({

        saSignature: paymentStatusArray.get('saSignature').value,
        saRemarks: paymentStatusArray.get('saRemarks').value,
        saRemarksDate: paymentStatusArray.get('saRemarksDate').value,

        soSignature: paymentStatusArray.get('soSignature').value,
        soRemarks: paymentStatusArray.get('soRemarks').value,
        soRemarksDate: paymentStatusArray.get('soRemarksDate').value,

        asSignature: paymentStatusArray.get('asSignature').value,
        asRemarks: paymentStatusArray.get('asRemarks').value,
        asRemarksDate: paymentStatusArray.get('asRemarksDate').value,

        dsSignature: paymentStatusArray.get('dsSignature').value,
        dsRemarks: paymentStatusArray.get('dsRemarks').value,
        dsRemarksDate: paymentStatusArray.get('dsRemarksDate').value,

        spoSignature: paymentStatusArray.get('spoSignature').value,
        spoRemarks: paymentStatusArray.get('spoRemarks').value,
        spoRemarksDate: paymentStatusArray.get('spoRemarksDate').value,

        daSignature: paymentStatusArray.get('daSignature').value,
        daRemarks: paymentStatusArray.get('daRemarks').value,
        daRemarksDate: paymentStatusArray.get('daRemarksDate').value,

        dcaoSignature: paymentStatusArray.get('dcaoSignature').value,
        dcaoRemarks: paymentStatusArray.get('dcaoRemarks').value,
        dcaoRemarksDate: paymentStatusArray.get('dcaoRemarksDate').value,

        faSignature: paymentStatusArray.get('faSignature').value,
        faRemarks: paymentStatusArray.get('faRemarks').value,
        faRemarksDate: paymentStatusArray.get('faRemarksDate').value,

        assDivSignature: paymentStatusArray.get('assDivSignature').value,
        assDivRemarks: paymentStatusArray.get('assDivRemarks').value,
        assDivRemarksDate: paymentStatusArray.get('assDivRemarksDate').value,

        daDivSignature: paymentStatusArray.get('daDivSignature').value,
        daDivRemarks: paymentStatusArray.get('daDivRemarks').value,
        daDivRemarksDate: paymentStatusArray.get('daDivRemarksDate').value,

        eeDivSignature: paymentStatusArray.get('eeDivSignature').value,
        eeDivRemarks: paymentStatusArray.get('eeDivRemarks').value,
        eeDivRemarksDate: paymentStatusArray.get('eeDivRemarksDate').value,

      });
    });

    this.formPayment.controls.forEach(paymentGroup => {
      // let paymentName = paymentGroup.get('mrMs').value + '.' + paymentGroup.get('paymentName').value
      payload.paymentArrays.push({
        debitCode: paymentGroup.get('debitCode').value,
        budgetAllocation: paymentGroup.get('budgetAllocation').value,
        balance: paymentGroup.get('balance').value,
        mrMs: paymentGroup.get('mrMs').value,
        paymentName: paymentGroup.get('paymentName').value,
        // paymentName: paymentName,
        gstNo: paymentGroup.get('gstNo').value,
        panNo: paymentGroup.get('panNo').value,

        bankName: paymentGroup.get('bankName').value,
        bankBranch: paymentGroup.get('bankBranch').value,
        accountName: paymentGroup.get('accountName').value,
        accountNo: paymentGroup.get('accountNo').value,
        ifscCode: paymentGroup.get('ifscCode').value,
        jws: paymentGroup.get('jws').value,
        others: paymentGroup.get('others').value,

        debitAmount: paymentGroup.get('debitAmount').value,
        addTaxes: paymentGroup.get('addTaxes').value,
        sgstPercentage: paymentGroup.get('sgstPercentage').value,
        sgstAmount: paymentGroup.get('sgstAmount').value,
        cgstPercentage: paymentGroup.get('cgstPercentage').value,
        cgstAmount: paymentGroup.get('cgstAmount').value,
        igstPercentage: paymentGroup.get('igstPercentage').value,
        iggstAmount: paymentGroup.get('iggstAmount').value,
        debitGrossTotal: paymentGroup.get('debitGrossTotal').value,
        lessTaxes: paymentGroup.get('lessTaxes').value,
        itrDedPercentage: paymentGroup.get('itrDedPercentage').value,
        itrDedAmount: paymentGroup.get('itrDedAmount').value,
        gstDedPercentage: paymentGroup.get('gstDedPercentage').value,
        gstDedAmount: paymentGroup.get('gstDedAmount').value,
        gstTdsPercentage: paymentGroup.get('gstTdsPercentage').value,
        gstTdsAmount: paymentGroup.get('gstTdsAmount').value,
        debitNetTotal: paymentGroup.get('debitNetTotal').value,
      });
    });
    console.log(payload);

    this.apiCall.apiPostCall('finance/paymentCreation', payload).subscribe(
      (responce) => {
        console.log(responce);
        this.router.navigate(['/famodule/home/payment']);
        this.snackbar.open('Payment created successfully!', 'close', {
          duration: 3000,
        });
        this.billNumberStatus();
      }, (err) => {
        console.log(err);
        this.snackbar.open('Enter all fields!', 'close', {
          duration: 3000,
        });
      });
  }

  daHeadsubmit() {
    let payload = {
      billNumber: this.paymentForm.get('billNumber').value,
      billDate: this.paymentForm.get('billDate').value,
      fileNo: this.paymentForm.get('fileNo').value,

      totalAmount: this.paymentForm.get('passedTotalAmount').value,
      passedForAddTaxes: this.paymentForm.get('passedAddTaxes').value,
      passedForLessTaxes: this.paymentForm.get('passedLessTaxes').value,
      passedForNetTotal: this.paymentForm.get('passedNetTotal').value,

      division: this.userDivision,

      divisionUser: this.role,

      saStatus: '',
      soStatus: '',
      asStatus: '',
      dsStatus: '',
      spoStatus: '',
      daStatus: 'Active',
      dcaoStatus: 'Pending',
      faStatus: 'Pending',
      assDivStatus: "",
      daDivStatus: "",
      eeDivStatus: "",
      billRiseMember: this.role,
      flowStatus: 'Head_office',

      paymentArrays: [],
      paymentStatus: [],
    }

    this.paymentStatusArray.controls.forEach(paymentStatusArray => {

      payload.paymentStatus.push({

        saSignature: paymentStatusArray.get('saSignature').value,
        saRemarks: paymentStatusArray.get('saRemarks').value,
        saRemarksDate: paymentStatusArray.get('saRemarksDate').value,

        soSignature: paymentStatusArray.get('soSignature').value,
        soRemarks: paymentStatusArray.get('soRemarks').value,
        soRemarksDate: paymentStatusArray.get('soRemarksDate').value,

        asSignature: paymentStatusArray.get('asSignature').value,
        asRemarks: paymentStatusArray.get('asRemarks').value,
        asRemarksDate: paymentStatusArray.get('asRemarksDate').value,

        dsSignature: paymentStatusArray.get('dsSignature').value,
        dsRemarks: paymentStatusArray.get('dsRemarks').value,
        dsRemarksDate: paymentStatusArray.get('dsRemarksDate').value,

        spoSignature: paymentStatusArray.get('spoSignature').value,
        spoRemarks: paymentStatusArray.get('spoRemarks').value,
        spoRemarksDate: paymentStatusArray.get('spoRemarksDate').value,

        daSignature: paymentStatusArray.get('daSignature').value,
        daRemarks: paymentStatusArray.get('daRemarks').value,
        daRemarksDate: paymentStatusArray.get('daRemarksDate').value,

        dcaoSignature: paymentStatusArray.get('dcaoSignature').value,
        dcaoRemarks: paymentStatusArray.get('dcaoRemarks').value,
        dcaoRemarksDate: paymentStatusArray.get('dcaoRemarksDate').value,

        faSignature: paymentStatusArray.get('faSignature').value,
        faRemarks: paymentStatusArray.get('faRemarks').value,
        faRemarksDate: paymentStatusArray.get('faRemarksDate').value,

        assDivSignature: paymentStatusArray.get('assDivSignature').value,
        assDivRemarks: paymentStatusArray.get('assDivRemarks').value,
        assDivRemarksDate: paymentStatusArray.get('assDivRemarksDate').value,

        daDivSignature: paymentStatusArray.get('daDivSignature').value,
        daDivRemarks: paymentStatusArray.get('daDivRemarks').value,
        daDivRemarksDate: paymentStatusArray.get('daDivRemarksDate').value,

        eeDivSignature: paymentStatusArray.get('eeDivSignature').value,
        eeDivRemarks: paymentStatusArray.get('eeDivRemarks').value,
        eeDivRemarksDate: paymentStatusArray.get('eeDivRemarksDate').value,

      });
    });

    this.formPayment.controls.forEach(paymentGroup => {
      // let paymentName = paymentGroup.get('mrMs').value + '.' + paymentGroup.get('paymentName').value
      payload.paymentArrays.push({
        debitCode: paymentGroup.get('debitCode').value,
        budgetAllocation: paymentGroup.get('budgetAllocation').value,
        balance: paymentGroup.get('balance').value,
        mrMs: paymentGroup.get('mrMs').value,
        paymentName: paymentGroup.get('paymentName').value,
        // paymentName: paymentName,
        gstNo: paymentGroup.get('gstNo').value,
        panNo: paymentGroup.get('panNo').value,

        bankName: paymentGroup.get('bankName').value,
        bankBranch: paymentGroup.get('bankBranch').value,
        accountName: paymentGroup.get('accountName').value,
        accountNo: paymentGroup.get('accountNo').value,
        ifscCode: paymentGroup.get('ifscCode').value,
        jws: paymentGroup.get('jws').value,
        others: paymentGroup.get('others').value,

        debitAmount: paymentGroup.get('debitAmount').value,
        addTaxes: paymentGroup.get('addTaxes').value,
        sgstPercentage: paymentGroup.get('sgstPercentage').value,
        sgstAmount: paymentGroup.get('sgstAmount').value,
        cgstPercentage: paymentGroup.get('cgstPercentage').value,
        cgstAmount: paymentGroup.get('cgstAmount').value,
        igstPercentage: paymentGroup.get('igstPercentage').value,
        iggstAmount: paymentGroup.get('iggstAmount').value,
        debitGrossTotal: paymentGroup.get('debitGrossTotal').value,
        lessTaxes: paymentGroup.get('lessTaxes').value,
        itrDedPercentage: paymentGroup.get('itrDedPercentage').value,
        itrDedAmount: paymentGroup.get('itrDedAmount').value,
        gstDedPercentage: paymentGroup.get('gstDedPercentage').value,
        gstDedAmount: paymentGroup.get('gstDedAmount').value,
        gstTdsPercentage: paymentGroup.get('gstTdsPercentage').value,
        gstTdsAmount: paymentGroup.get('gstTdsAmount').value,
        debitNetTotal: paymentGroup.get('debitNetTotal').value,
      });
    });
    console.log(payload);

    this.apiCall.apiPostCall('finance/paymentCreation', payload).subscribe(
      (responce) => {
        console.log(responce);
        this.router.navigate(['/famodule/home/payment']);
        this.snackbar.open('Payment created successfully!', 'close', {
          duration: 3000,
        });
        this.billNumberStatus();
      }, (err) => {
        console.log(err);
        this.snackbar.open('Enter all fields!', 'close', {
          duration: 3000,
        });
      });
  }

  saHeadsubmit() {
    let payload = {
      billNumber: this.paymentForm.get('billNumber').value,
      billDate: this.paymentForm.get('billDate').value,
      fileNo: this.paymentForm.get('fileNo').value,

      totalAmount: this.paymentForm.get('passedTotalAmount').value,
      passedForAddTaxes: this.paymentForm.get('passedAddTaxes').value,
      passedForLessTaxes: this.paymentForm.get('passedLessTaxes').value,
      passedForNetTotal: this.paymentForm.get('passedNetTotal').value,

      division: this.userDivision,

      divisionUser: 'SO_Head_office',

      saStatus: 'Active',
      soStatus: 'Pending',
      asStatus: 'Pending',
      dsStatus: 'Pending',
      spoStatus: 'Pending',
      daStatus: 'Pending',
      dcaoStatus: 'Pending',
      faStatus: 'Pending',
      assDivStatus: '',
      daDivStatus: '',
      eeDivStatus: '',
      billRiseMember: this.role,

      flowStatus: 'Head_office',

      paymentArrays: [],
      paymentStatus: [],
    }

    this.paymentStatusArray.controls.forEach(paymentStatusArray => {

      payload.paymentStatus.push({

        saSignature: paymentStatusArray.get('saSignature').value,
        saRemarks: paymentStatusArray.get('saRemarks').value,
        saRemarksDate: paymentStatusArray.get('saRemarksDate').value,

        soSignature: paymentStatusArray.get('soSignature').value,
        soRemarks: paymentStatusArray.get('soRemarks').value,
        soRemarksDate: paymentStatusArray.get('soRemarksDate').value,

        asSignature: paymentStatusArray.get('asSignature').value,
        asRemarks: paymentStatusArray.get('asRemarks').value,
        asRemarksDate: paymentStatusArray.get('asRemarksDate').value,

        dsSignature: paymentStatusArray.get('dsSignature').value,
        dsRemarks: paymentStatusArray.get('dsRemarks').value,
        dsRemarksDate: paymentStatusArray.get('dsRemarksDate').value,

        spoSignature: paymentStatusArray.get('spoSignature').value,
        spoRemarks: paymentStatusArray.get('spoRemarks').value,
        spoRemarksDate: paymentStatusArray.get('spoRemarksDate').value,

        daSignature: paymentStatusArray.get('daSignature').value,
        daRemarks: paymentStatusArray.get('daRemarks').value,
        daRemarksDate: paymentStatusArray.get('daRemarksDate').value,

        dcaoSignature: paymentStatusArray.get('dcaoSignature').value,
        dcaoRemarks: paymentStatusArray.get('dcaoRemarks').value,
        dcaoRemarksDate: paymentStatusArray.get('dcaoRemarksDate').value,

        faSignature: paymentStatusArray.get('faSignature').value,
        faRemarks: paymentStatusArray.get('faRemarks').value,
        faRemarksDate: paymentStatusArray.get('faRemarksDate').value,

        assDivSignature: paymentStatusArray.get('assDivSignature').value,
        assDivRemarks: paymentStatusArray.get('assDivRemarks').value,
        assDivRemarksDate: paymentStatusArray.get('assDivRemarksDate').value,

        daDivSignature: paymentStatusArray.get('daDivSignature').value,
        daDivRemarks: paymentStatusArray.get('daDivRemarks').value,
        daDivRemarksDate: paymentStatusArray.get('daDivRemarksDate').value,

        eeDivSignature: paymentStatusArray.get('eeDivSignature').value,
        eeDivRemarks: paymentStatusArray.get('eeDivRemarks').value,
        eeDivRemarksDate: paymentStatusArray.get('eeDivRemarksDate').value,

      });
    });

    this.formPayment.controls.forEach(paymentGroup => {
      // let paymentName = paymentGroup.get('mrMs').value + '.' + paymentGroup.get('paymentName').value
      payload.paymentArrays.push({
        debitCode: paymentGroup.get('debitCode').value,
        budgetAllocation: paymentGroup.get('budgetAllocation').value,
        balance: paymentGroup.get('balance').value,
        mrMs: paymentGroup.get('mrMs').value,
        paymentName: paymentGroup.get('paymentName').value,
        // paymentName: paymentName,
        gstNo: paymentGroup.get('gstNo').value,
        panNo: paymentGroup.get('panNo').value,

        bankName: paymentGroup.get('bankName').value,
        bankBranch: paymentGroup.get('bankBranch').value,
        accountName: paymentGroup.get('accountName').value,
        accountNo: paymentGroup.get('accountNo').value,
        ifscCode: paymentGroup.get('ifscCode').value,
        jws: paymentGroup.get('jws').value,
        others: paymentGroup.get('others').value,

        debitAmount: paymentGroup.get('debitAmount').value,
        addTaxes: paymentGroup.get('addTaxes').value,
        sgstPercentage: paymentGroup.get('sgstPercentage').value,
        sgstAmount: paymentGroup.get('sgstAmount').value,
        cgstPercentage: paymentGroup.get('cgstPercentage').value,
        cgstAmount: paymentGroup.get('cgstAmount').value,
        igstPercentage: paymentGroup.get('igstPercentage').value,
        iggstAmount: paymentGroup.get('iggstAmount').value,
        debitGrossTotal: paymentGroup.get('debitGrossTotal').value,
        lessTaxes: paymentGroup.get('lessTaxes').value,
        itrDedPercentage: paymentGroup.get('itrDedPercentage').value,
        itrDedAmount: paymentGroup.get('itrDedAmount').value,
        gstDedPercentage: paymentGroup.get('gstDedPercentage').value,
        gstDedAmount: paymentGroup.get('gstDedAmount').value,
        gstTdsPercentage: paymentGroup.get('gstTdsPercentage').value,
        gstTdsAmount: paymentGroup.get('gstTdsAmount').value,
        debitNetTotal: paymentGroup.get('debitNetTotal').value,
      });
    });
    console.log(payload);

    this.apiCall.apiPostCall('finance/paymentCreation', payload).subscribe(
      (responce) => {
        console.log(responce);
        this.router.navigate(['/famodule/home/payment']);
        this.snackbar.open('Payment created successfully!', 'close', {
          duration: 3000,
        });
        this.billNumberStatus();
      }, (err) => {
        console.log(err);
        this.snackbar.open('Enter all fields!', 'close', {
          duration: 3000,
        });
      });
  }

  // getAccountingCode() {
  //   this.apiCall.apiGetCall('finance/getAllCodeAndSName').subscribe(
  //     (Response) => {
  //       console.log("getAccountingCode === ", Response);
  //       this.accountCode = Response.data
  //     },
  //     (Error) => {
  //       console.log("Error === ", Error);
  //     });
  // }

  setCodeName() {
    const accCode = this.paymentForm.controls['accountingCode'].value;
    const selectedCode = this.accountCode.find(item => item.codeNumber === accCode);
    if (selectedCode) {
      this.paymentForm.patchValue({
        codeName: selectedCode.codeName
      });
    }
    if (selectedCode) {
      this.voucherForm.patchValue({
        creditCode: selectedCode.codeNumber,
        bankCode: selectedCode.codeNumber
      });
    }
  }

  paymentCalculation(index: number) {

    const formArray = this.paymentForm.get('paymentArrays') as FormArray;

    const sgstPercentage = formArray.at(index).get('sgstPercentage').value;
    const debitAmount = formArray.at(index).get('debitAmount').value;
    const sgstAmount = (parseInt(debitAmount) * parseInt(sgstPercentage)) / 100;

    console.log(sgstAmount + '---- sgstAmount');

    formArray.at(index).get('sgstAmount').setValue(sgstAmount);

    const sgstAmountTotal = formArray.at(index).get('sgstAmount').value;
    const cgstAmountTotal = formArray.at(index).get('cgstAmount').value;
    const igstAmountTotal = formArray.at(index).get('iggstAmount').value;

    console.log(sgstAmountTotal, cgstAmountTotal, igstAmountTotal, "gfbdfdf");

    this.addTaxAmount = parseInt(sgstAmountTotal) + parseInt(cgstAmountTotal) + parseInt(igstAmountTotal);
    console.log(this.addTaxAmount, "this.addTaxAmount");
    formArray.at(index).get('addTaxes').setValue(this.addTaxAmount);

    const debitAmountTotal = formArray.at(index).get('debitAmount').value;
    this.debitAmountTotal = parseInt(this.addTaxAmount) + parseInt(debitAmountTotal);
    formArray.at(index).get('debitGrossTotal').setValue(this.debitAmountTotal);

    // cgst calulation

    const cgstPercentage = formArray.at(index).get('cgstPercentage').value;
    const cgstAmount = (debitAmount * cgstPercentage) / 100;
    formArray.at(index).get('cgstAmount').setValue(cgstAmount);

    this.addTaxAmount = parseInt(sgstAmountTotal) + parseInt(cgstAmountTotal) + parseInt(igstAmountTotal);
    formArray.at(index).get('addTaxes').setValue(this.addTaxAmount);

    this.debitAmountTotal = parseInt(this.addTaxAmount) + parseInt(debitAmountTotal)
    formArray.at(index).get('debitGrossTotal').setValue(this.debitAmountTotal);

    // igst calulation

    const igstPercentage = formArray.at(index).get('igstPercentage').value;
    const igstAmount = (debitAmount * igstPercentage) / 100;

    formArray.at(index).get('iggstAmount').setValue(igstAmount);
    this.addTaxAmount = sgstAmountTotal + cgstAmountTotal + igstAmountTotal;

    formArray.at(index).get('addTaxes').setValue(this.addTaxAmount);
    this.debitAmountTotal = parseInt(this.addTaxAmount) + parseInt(debitAmountTotal)

    formArray.at(index).get('debitGrossTotal').setValue(this.debitAmountTotal);

    // itr calculartions

    const itrDedPercentage = formArray.at(index).get('itrDedPercentage').value;
    const itrDedAmount = formArray.at(index).get('debitAmount').value;
    const itrAmount = (itrDedAmount * itrDedPercentage) / 100;
    formArray.at(index).get('itrDedAmount').setValue(itrAmount);

    const itrDedAmountTotal = formArray.at(index).get('itrDedAmount').value;
    const gstDedAmountTotal = formArray.at(index).get('gstDedAmount').value;
    const gstTdsAmountTotal = formArray.at(index).get('gstTdsAmount').value;

    this.lessTaxAmount = itrDedAmountTotal + gstDedAmountTotal + gstTdsAmountTotal;
    formArray.at(index).get('lessTaxes').setValue(this.lessTaxAmount);

    const debitGrossTotal = formArray.at(index).get('debitGrossTotal').value;
    this.netTotalAmount = (debitGrossTotal) - (itrDedAmountTotal) - (gstDedAmountTotal) - (gstTdsAmountTotal);
    formArray.at(index).get('debitNetTotal').setValue(this.netTotalAmount);

    //gst ded calculation

    const gstDedPercentage = formArray.at(index).get('gstDedPercentage').value;
    const gstDedAmount = formArray.at(index).get('debitAmount').value;

    const gstAmountPer = (gstDedAmount * gstDedPercentage) / 100;
    formArray.at(index).get('gstDedAmount').setValue(gstAmountPer);

    this.lessTaxAmount = itrDedAmountTotal + gstDedAmountTotal + gstTdsAmountTotal;
    formArray.at(index).get('lessTaxes').setValue(this.lessTaxAmount);

    this.netTotalAmount = (debitGrossTotal) - (itrDedAmountTotal) - (gstDedAmountTotal) - (gstTdsAmountTotal);
    formArray.at(index).get('debitNetTotal').setValue(this.netTotalAmount);

    // gst tds calculations

    const gstTdsPercentage = formArray.at(index).get('gstTdsPercentage').value;
    const gstTdsAmount = formArray.at(index).get('debitAmount').value;

    const gstAmountper = (gstTdsAmount * gstTdsPercentage) / 100;
    formArray.at(index).get('gstTdsAmount').setValue(gstAmountper);

    this.lessTaxAmount = itrDedAmountTotal + gstDedAmountTotal + gstTdsAmountTotal;
    formArray.at(index).get('lessTaxes').setValue(this.lessTaxAmount);

    this.netTotalAmount = (debitGrossTotal) - (itrDedAmountTotal) - (gstDedAmountTotal) - (gstTdsAmountTotal);
    formArray.at(index).get('debitNetTotal').setValue(this.netTotalAmount);

    //jws
    const jwsAmount = formArray.at(index).get('jws').value;
    this.lessTaxAmount = itrDedAmountTotal + gstDedAmountTotal + gstTdsAmountTotal + jwsAmount;
    console.log(jwsAmount, 'jwsjwsjwsjws----');

  }

  // budgetAllocation(event: any) {
  //   let division = event.target.value
  //   let divisionVAlue = division.split('-').map(value => parseInt(value, 10))[0]
  //   console.log(divisionVAlue);
  //   console.log(division,'division');
  //   let dateValue
  //   let date = this.paymentForm.get('billDate').value;

  //   let dateValueday = date.split('-').map(value => parseInt(value, 10))[0];
  //   let dateValueMonth = date.split('-').map(value => parseInt(value, 10))[1];
  //   let dateValueYear = date.split('-').map(value => parseInt(value, 10))[2];

  //   console.log(date);
  //   console.log(dateValueYear);
  //   console.log(dateValueMonth);
  //   console.log(dateValueday);

  //   let dateMonth = 3;
  //   let dateDay = 31;
  //   let formattedDate = `${dateDay}-${'0' + dateMonth}-${dateValueYear}`; // dynamic year - 3 - 31
  //   console.log(formattedDate);
  //   console.log(dateMonth + '<--->' + dateValueMonth);

  //   // dateMonth > dateValueMonth;
  //   if (dateMonth < dateValueMonth) {
  //     dateValue = (parseInt(dateValueYear)) + '-' + (parseInt(dateValueYear) + 1);
  //     console.log(dateValue + '-------------------- 1');
  //   }
  //   else {
  //     dateValue = (parseInt(dateValueYear) - 1) + '-' + dateValueYear
  //     console.log(dateValue + '------------------- 2');
  //   }



  //   let payload = {
  //     division: this.userDivision,
  //     code: divisionVAlue,
  //     rbeYear: dateValue
  //   }

  //   this.apiCall.getPaymentData('finance/getBudgetCodeWiseRBE', payload).subscribe(
  //     (responce) => {
  //       console.log(responce.data);
  //       this.budgetAllocationValueRBE = responce.data.lastRbeFixed

  //     });
  // }

  budgetAllocation(event: any, paymentIndex: number) {
    const codeNumber = event.target.value; // Get the selected code number from the dropdown
    console.log(codeNumber, 'codeNumber');

    let date = this.paymentForm.get('billDate').value;
    let dateParts = date.split('-').map(value => parseInt(value, 10));
    let [dateValueday, dateValueMonth, dateValueYear] = dateParts;

    let dateMonth = 3;
    let dateDay = 31;
    let formattedDate = `${dateDay}-0${dateMonth}-${dateValueYear}`; // Dynamic year - 3 - 31

    let dateValue;
    if (dateMonth < dateValueMonth) {
      dateValue = `${parseInt(dateValueYear)}-${parseInt(dateValueYear) + 1}`;
    } else {
      dateValue = `${parseInt(dateValueYear) - 1}-${dateValueYear}`;
    }

    // Prepare payload
    let payload = {
      division: this.userDivision,
      codeNumber: codeNumber, // Use the selected code number
      year: dateValue
      // year:'2022-2023'
    };

    // Call the getPaymentData method with correct parameters
    this.apiCall.getPaymentData(payload.codeNumber.toString(), payload.year, payload.division).subscribe(
      (response) => {
        console.log("Full API Response:", response);

        this.selectedCodeId = response.id;
        console.log("Selected ID:", this.selectedCodeId);
        this.berbe = response.berbe;
        console.log("beeeeeerbeeeeeeeee", this.berbe);
        this.codeId = response.code.id;
        console.log("codeeeeeee id", this.codeId);

        const paymentGroup = this.formPayment.at(paymentIndex) as FormGroup;

        paymentGroup.patchValue({
          budgetAllocation: response.budgetAllocation || 0,
          // balance: response.budgetAllocation || 0 // Initialize balance with the same value
        });

        console.log("Budget Allocation:", response.budgetAllocation);
      },
      (error) => {
        console.error("Error fetching payment data:", error);
      }
    );
  }

  updateBalance(paymentIndex: number) {
    const paymentGroup = this.formPayment.at(paymentIndex) as FormGroup;
    const debitAmount = paymentGroup.get('debitAmount').value || 0;
    const budgetAllocation = paymentGroup.get('budgetAllocation').value || 0;

    const balance = budgetAllocation - debitAmount;
    paymentGroup.patchValue({ balance });
  }







  // submit() {
  //   let payload = {
  //     billNumber: this.paymentForm.get('billNumber').value,
  //     billDate: this.paymentForm.get('billDate').value,
  //     fileNo: this.paymentForm.get('fileNo').value,

  //     totalAmount: this.paymentForm.get('passedTotalAmount').value,
  //     passedForAddTaxes: this.paymentForm.get('passedAddTaxes').value,
  //     passedForLessTaxes: this.paymentForm.get('passedLessTaxes').value,
  //     passedForNetTotal: this.paymentForm.get('passedNetTotal').value,

  //     division: this.userDivision,

  //     divisionUser: this.role,

  //     saStatus: '',
  //     soStatus: '',
  //     asStatus: '',
  //     dsStatus: '',
  //     spoStatus: '',
  //     daStatus: '',
  //     dcaoStatus: '',
  //     faStatus: '',
  //     assDivStatus: "Active",
  //     daDivStatus: "Pending",
  //     eeDivStatus: "Pending",
  //     flowStatus: '',
  //     asDsStatus:'',
  //     billRiseMember: this.role,

  //     paymentArray: [],
  //     paymentStatus: [],
  //   }

  //   this.paymentStatusArray.controls.forEach(paymentStatusArray => {

  //     payload.paymentStatus.push({

  //       saSignature: paymentStatusArray.get('saSignature').value,
  //       saRemarks: paymentStatusArray.get('saRemarks').value,
  //       saRemarksDate: paymentStatusArray.get('saRemarksDate').value,

  //       soSignature: paymentStatusArray.get('soSignature').value,
  //       soRemarks: paymentStatusArray.get('soRemarks').value,
  //       soRemarksDate: paymentStatusArray.get('soRemarksDate').value,

  //       asSignature: paymentStatusArray.get('asSignature').value,
  //       asRemarks: paymentStatusArray.get('asRemarks').value,
  //       asRemarksDate: paymentStatusArray.get('asRemarksDate').value,

  //       dsSignature: paymentStatusArray.get('dsSignature').value,
  //       dsRemarks: paymentStatusArray.get('dsRemarks').value,
  //       dsRemarksDate: paymentStatusArray.get('dsRemarksDate').value,

  //       spoSignature: paymentStatusArray.get('spoSignature').value,
  //       spoRemarks: paymentStatusArray.get('spoRemarks').value,
  //       spoRemarksDate: paymentStatusArray.get('spoRemarksDate').value,

  //       daSignature: paymentStatusArray.get('daSignature').value,
  //       daRemarks: paymentStatusArray.get('daRemarks').value,
  //       daRemarksDate: paymentStatusArray.get('daRemarksDate').value,

  //       dcaoSignature: paymentStatusArray.get('dcaoSignature').value,
  //       dcaoRemarks: paymentStatusArray.get('dcaoRemarks').value,
  //       dcaoRemarksDate: paymentStatusArray.get('dcaoRemarksDate').value,

  //       faSignature: paymentStatusArray.get('faSignature').value,
  //       faRemarks: paymentStatusArray.get('faRemarks').value,
  //       faRemarksDate: paymentStatusArray.get('faRemarksDate').value,

  //       assDivSignature: paymentStatusArray.get('assDivSignature').value,
  //       assDivRemarks: paymentStatusArray.get('assDivRemarks').value,
  //       assDivRemarksDate: paymentStatusArray.get('assDivRemarksDate').value,

  //       daDivSignature: paymentStatusArray.get('daDivSignature').value,
  //       daDivRemarks: paymentStatusArray.get('daDivRemarks').value,
  //       daDivRemarksDate: paymentStatusArray.get('daDivRemarksDate').value,

  //       eeDivSignature: paymentStatusArray.get('eeDivSignature').value,
  //       eeDivRemarks: paymentStatusArray.get('eeDivRemarks').value,
  //       eeDivRemarksDate: paymentStatusArray.get('eeDivRemarksDate').value,

  //     });
  //   });

  //   this.formPayment.controls.forEach(paymentGroup => {
  //     let paymentName = paymentGroup.get('mrMs').value + '.' + paymentGroup.get('paymentName').value
  //     payload.paymentArray.push({

  //       debitCode: paymentGroup.get('debitCode').value,
  //       budgetAllocation: paymentGroup.get('budgetAllocation').value,
  //       balance: paymentGroup.get('balance').value,
  //       mrMs: paymentGroup.get('mrMs').value,
  //       paymentName: paymentGroup.get('paymentName').value,
  //       // paymentName: paymentName,
  //       gstNo: paymentGroup.get('gstNo').value,
  //       panNo: paymentGroup.get('panNo').value,

  //       bankName: paymentGroup.get('bankName').value,
  //       branchName: paymentGroup.get('branchName').value,
  //       accountName: paymentGroup.get('accountName').value,
  //       accountNo: paymentGroup.get('accountNo').value,
  //       ifscCode: paymentGroup.get('ifscCode').value,
  //       jws: paymentGroup.get('jws').value,
  //       others: paymentGroup.get('others').value,

  //       debitAmount: paymentGroup.get('debitAmount').value,
  //       addTaxes: paymentGroup.get('addTaxes').value,
  //       sgstPercentage: paymentGroup.get('sgstPercentage').value,
  //       sgstAmount: paymentGroup.get('sgstAmount').value,
  //       cgstPercentage: paymentGroup.get('cgstPercentage').value,
  //       cgstAmount: paymentGroup.get('cgstAmount').value,
  //       igstPercentage: paymentGroup.get('igstPercentage').value,
  //       iggstAmount: paymentGroup.get('iggstAmount').value,
  //       debitGrossTotal: paymentGroup.get('debitGrossTotal').value,
  //       lessTaxes: paymentGroup.get('lessTaxes').value,
  //       itrDedPercentage: paymentGroup.get('itrDedPercentage').value,
  //       itrDedAmount: paymentGroup.get('itrDedAmount').value,
  //       gstDedPercentage: paymentGroup.get('gstDedPercentage').value,
  //       gstDedAmount: paymentGroup.get('gstDedAmount').value,
  //       gstTdsPercentage: paymentGroup.get('gstTdsPercentage').value,
  //       gstTdsAmount: paymentGroup.get('gstTdsAmount').value,
  //       debitNetTotal: paymentGroup.get('debitNetTotal').value,
  //       // codeId: paymentGroup.get('codeId').value, // Adding codeId from the form

  //     });
  //   });
  //   console.log(payload);

  //   this.apiCall.apiPostCall('api/payment/create', payload).subscribe(
  //     (responce) => {
  //       console.log(responce);
  //       this.router.navigate(['/famodule/home/payment']);
  //       this.snackbar.open('Payment created successfully!', 'close', {
  //         duration: 3000,
  //       });
  //       this.billNumberStatus();
  //     }, (err) => {
  //       console.log(err);
  //       this.snackbar.open('Enter all fields!', 'close', {
  //         duration: 3000,
  //       });
  //     });
  // }
  submit() {
    const responseStatus = true; // or false, depending on the logic

    let payload = {
      billNumber: this.paymentForm.get('billNumber').value,
      billDate: this.paymentForm.get('billDate').value,
      fileNo: this.paymentForm.get('fileNo').value,

      totalAmount: this.paymentForm.get('passedTotalAmount').value,
      passedForAddTaxes: this.paymentForm.get('passedAddTaxes').value,
      passedForLessTaxes: this.paymentForm.get('passedLessTaxes').value,
      passedForNetTotal: this.paymentForm.get('passedNetTotal').value,

      division: this.userDivision,
      divisionUser: this.role,

      saStatus: '',
      soStatus: '',
      asStatus: '',
      dsStatus: '',
      spoStatus: '',
      daStatus: '',
      dcaoStatus: '',
      faStatus: '',
      assDivStatus: "Active",
      daDivStatus: "Pending",
      eeDivStatus: "Pending",
      flowStatus: '',
      asDsStatus: '',
      billRiseMember: this.role,

      paymentArray: [],
      paymentStatus: [],
    }

    this.paymentStatusArray.controls.forEach(paymentStatusArray => {
      payload.paymentStatus.push({
        saSignature: paymentStatusArray.get('saSignature').value,
        saRemarks: paymentStatusArray.get('saRemarks').value,
        saRemarksDate: paymentStatusArray.get('saRemarksDate').value,

        soSignature: paymentStatusArray.get('soSignature').value,
        soRemarks: paymentStatusArray.get('soRemarks').value,
        soRemarksDate: paymentStatusArray.get('soRemarksDate').value,

        asSignature: paymentStatusArray.get('asSignature').value,
        asRemarks: paymentStatusArray.get('asRemarks').value,
        asRemarksDate: paymentStatusArray.get('asRemarksDate').value,

        dsSignature: paymentStatusArray.get('dsSignature').value,
        dsRemarks: paymentStatusArray.get('dsRemarks').value,
        dsRemarksDate: paymentStatusArray.get('dsRemarksDate').value,

        spoSignature: paymentStatusArray.get('spoSignature').value,
        spoRemarks: paymentStatusArray.get('spoRemarks').value,
        spoRemarksDate: paymentStatusArray.get('spoRemarksDate').value,

        daSignature: paymentStatusArray.get('daSignature').value,
        daRemarks: paymentStatusArray.get('daRemarks').value,
        daRemarksDate: paymentStatusArray.get('daRemarksDate').value,

        dcaoSignature: paymentStatusArray.get('dcaoSignature').value,
        dcaoRemarks: paymentStatusArray.get('dcaoRemarks').value,
        dcaoRemarksDate: paymentStatusArray.get('dcaoRemarksDate').value,

        faSignature: paymentStatusArray.get('faSignature').value,
        faRemarks: paymentStatusArray.get('faRemarks').value,
        faRemarksDate: paymentStatusArray.get('faRemarksDate').value,

        assDivSignature: paymentStatusArray.get('assDivSignature').value,
        assDivRemarks: paymentStatusArray.get('assDivRemarks').value,
        assDivRemarksDate: paymentStatusArray.get('assDivRemarksDate').value,

        daDivSignature: paymentStatusArray.get('daDivSignature').value,
        daDivRemarks: paymentStatusArray.get('daDivRemarks').value,
        daDivRemarksDate: paymentStatusArray.get('daDivRemarksDate').value,

        eeDivSignature: paymentStatusArray.get('eeDivSignature').value,
        eeDivRemarks: paymentStatusArray.get('eeDivRemarks').value,
        eeDivRemarksDate: paymentStatusArray.get('eeDivRemarksDate').value,
      });
    });

    this.formPayment.controls.forEach(paymentGroup => {
      let paymentName = paymentGroup.get('mrMs').value + '.' + paymentGroup.get('paymentName').value;
      payload.paymentArray.push({
        debitCode: paymentGroup.get('debitCode').value,
        budgetAllocation: paymentGroup.get('budgetAllocation').value,
        balance: paymentGroup.get('balance').value,
        mrMs: paymentGroup.get('mrMs').value,
        paymentName: paymentGroup.get('paymentName').value,
        gstNo: paymentGroup.get('gstNo').value,
        panNo: paymentGroup.get('panNo').value,

        bankName: paymentGroup.get('bankName').value,
        bankBranch: paymentGroup.get('bankBranch').value,
        accountName: paymentGroup.get('accountName').value,
        accountNo: paymentGroup.get('accountNo').value,
        ifscCode: paymentGroup.get('ifscCode').value,
        jws: paymentGroup.get('jws').value,
        others: paymentGroup.get('others').value,

        debitAmount: paymentGroup.get('debitAmount').value,
        addTaxes: paymentGroup.get('addTaxes').value,
        sgstPercentage: paymentGroup.get('sgstPercentage').value,
        sgstAmount: paymentGroup.get('sgstAmount').value,
        cgstPercentage: paymentGroup.get('cgstPercentage').value,
        cgstAmount: paymentGroup.get('cgstAmount').value,
        igstPercentage: paymentGroup.get('igstPercentage').value,
        iggstAmount: paymentGroup.get('iggstAmount').value,
        debitGrossTotal: paymentGroup.get('debitGrossTotal').value,
        lessTaxes: paymentGroup.get('lessTaxes').value,
        itrDedPercentage: paymentGroup.get('itrDedPercentage').value,
        itrDedAmount: paymentGroup.get('itrDedAmount').value,
        gstDedPercentage: paymentGroup.get('gstDedPercentage').value,
        gstDedAmount: paymentGroup.get('gstDedAmount').value,
        gstTdsPercentage: paymentGroup.get('gstTdsPercentage').value,
        gstTdsAmount: paymentGroup.get('gstTdsAmount').value,
        debitNetTotal: paymentGroup.get('debitNetTotal').value,
        codeId: this.codeId,
        berbeId: this.selectedCodeId,
        berbe: this.berbe
      });
    });

    console.log(payload);

    this.apiCall.apiPostCall('api/payment/create', payload).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/famodule/home/payment']);
        this.snackbar.open('Payment created successfully!', 'close', {
          duration: 3000,
        });
        this.updateBillNumber(responseStatus);
      }, (err) => {
        console.log(err);
        this.snackbar.open('Enter all fields!', 'close', {
          duration: 3000,
        });
      });
  }



  updateBillNumber(responseStatus: boolean) {
    this.apiCall.updateBillNo(this.billNumber, this.userDivision, responseStatus.toString()).subscribe(
      (response) => {
        console.log('Bill number updated:', response);
      },
      (error) => {
        console.error('Error updating bill number:', error);
      }
    );
  }
  getBillnumber() {
    // let division=sessionStorage.getItem('division')
    var divison: { [key: string]: string } = {}
    divison['division'] = sessionStorage.getItem('division')
    this.apiCall.apiPostCall_Query('api/payment/getByBillDivision', divison).subscribe((response) => {
      console.log("response for bill number", response);
      this.billNumber = response.billNo;
      console.log("bill number", this.billNumber);

      this.paymentForm.patchValue({ billNumber: this.billNumber });
    });
  }

  // billNoGenarate() {
  //   this.apiCall.apiGetCall(`finance/billNumber/${this.userDivision}`).subscribe(
  //     (responce) => {
  //       console.log(responce);
  //       this.billNumber = responce.data.billNumber;
  //       this.paymentForm.patchValue({ billNumber: this.billNumber });
  //     },
  //     (err) => {
  //       console.error(err.message);
  //     });
  // }

  billNumberStatus() {
    let payload = {
      division: this.userDivision,
      status: "Success"
    }
    this.apiCall.apiPostCall('finance/billNumber/Status', payload).subscribe(
      (responce) => {
        console.log(responce.data);
      },
      (error) => {
        console.log(error.message);
      });
  }

  setupFormListeners(group: FormGroup, index: number) {
    group.get('debitAmount').valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.calculateTaxes(group, index);
    });

    group.get('sgstPercentage').valueChanges.subscribe(() => {
      this.calculateTaxes(group, index);
    });

    group.get('cgstPercentage').valueChanges.subscribe(() => {
      this.calculateTaxes(group, index);
    });

    group.get('igstPercentage').valueChanges.subscribe(() => {
      this.calculateTaxes(group, index);
    });

    group.get('itrDedPercentage').valueChanges.subscribe(() => {
      this.calculateDeductions(group, index);
    });

    group.get('gstDedPercentage').valueChanges.subscribe(() => {
      this.calculateDeductions(group, index);
    });

    group.get('gstTdsPercentage').valueChanges.subscribe(() => {
      this.calculateDeductions(group, index);
    });

    group.get('jws').valueChanges.subscribe(() => {
      this.calculateDeductions(group, index);
    });
  }

  calculateTaxes(group: FormGroup, index: number) {

    const debitAmount = parseFloat(group.get('debitAmount').value) || 0;
    const sgstPercentage = parseFloat(group.get('sgstPercentage').value) || 0;
    const cgstPercentage = parseFloat(group.get('cgstPercentage').value) || 0;
    const igstPercentage = parseFloat(group.get('igstPercentage').value) || 0;

    const sgstAmount = (debitAmount * sgstPercentage) / 100;
    const cgstAmount = (debitAmount * cgstPercentage) / 100;
    const igstAmount = (debitAmount * igstPercentage) / 100;

    const addTaxes = sgstAmount + cgstAmount + igstAmount;
    const debitGrossTotal = debitAmount + addTaxes;

    group.patchValue({
      sgstAmount,
      cgstAmount,
      iggstAmount: igstAmount,
      addTaxes,
      debitGrossTotal
    });

    this.calculateDeductions(group, index);
  }

  calculateDeductions(group: FormGroup, index: number) {
    const lessTaxAmount = parseFloat(group.get('lessTaxes').value) || 0;
    const grossTotal = parseFloat(group.get('debitGrossTotal').value) || 0;
    const debitAmount = parseFloat(group.get('debitAmount').value) || 0;
    const itrDedPercentage = parseFloat(group.get('itrDedPercentage').value) || 0;
    const gstDedPercentage = parseFloat(group.get('gstDedPercentage').value) || 0;
    const gstTdsPercentage = parseFloat(group.get('gstTdsPercentage').value) || 0;
    const jws = parseFloat(group.get('jws').value) || 0;

    console.log(jws, "JWS JWS");
    console.log(lessTaxAmount, "=== lessTaxAmount lessTaxAmount");

    const itrDedAmount = (debitAmount * itrDedPercentage) / 100;
    const gstDedAmount = (debitAmount * gstDedPercentage) / 100;
    const gstTdsAmount = (debitAmount * gstTdsPercentage) / 100;

    // this.jwfFunction(this.jwfValue);
    // const lessTaxes = itrDedAmount + gstDedAmount + gstTdsAmount + this.jwfValue;
    const lessTaxes = itrDedAmount + gstDedAmount + gstTdsAmount + jws;
    const debitNetTotal = grossTotal - lessTaxAmount;

    group.patchValue({
      itrDedAmount,
      gstDedAmount,
      gstTdsAmount,
      lessTaxes,
      debitNetTotal
    });
  }

  formatValue() {
    let value = this.paymentForm.get('jws').value;
    console.log(value);

    if (value) {
      const formattedValue = parseFloat(value).toFixed(2);
      this.paymentForm.get('jws').setValue(formattedValue, { emitEvent: false });
    }
  }

  //decimal codes

  decimalInput(formArrayName: string, controlName: string, index: number) {
    const formArray = this.paymentForm.get(formArrayName) as FormArray; // Access the FormArray
    if (formArray) {
      const formGroup = formArray.at(index) as FormGroup; // Access the specific FormGroup within the FormArray
      const control = formGroup.get(controlName);
      if (control) {
        let value = control.value;
        // Remove all non-numeric characters except the first decimal point
        value = value.replace(/[^0-9.]/g, '');
        // Handle multiple decimal points
        const parts = value.split('.');
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('');
        }
        // Validate with regex for up to 2 decimal places
        const regex = /^\d*\.?\d{0,2}$/;
        if (regex.test(value)) {
          control.setValue(value, { emitEvent: false });
        } else {
          control.setValue('', { emitEvent: false }); // Reset the value if not valid
        }
      }
    }
  }

  formatToTwoDecimals(formArrayName: string, controlName: string, index: number) {
    const formArray = this.paymentForm.get(formArrayName) as FormArray; // Access the FormArray
    if (formArray) {
      const formGroup = formArray.at(index) as FormGroup; // Access the specific FormGroup within the FormArray
      const control = formGroup.get(controlName);
      if (control) {
        let value = control.value;
        // Parse and format only if the input is valid
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          control.setValue(numericValue.toFixed(2), { emitEvent: false });
        }
      }
    }
  }



  // getDebitCode() {
  //   this.apiCall.apiPostCall('api/code/getAll', {}).subscribe((data) => {
  //     console.log("data for debit code", data);

  //     // Process the response to combine codeName and codeNumber
  //     if (data && data.responseObject) {
  //       this.accountCode = data.responseObject.map((item: any) => {
  //         return {
  //           codeAndDescription: `${item.codeNumber} - ${item.codeName}`, 
  //           ...item 
  //         };
  //       });
  //     }
  //   });
  // }

}
