import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ApiservicesService } from '../../service/apiservices.service';

@Component({
  selector: 'app-payment-list-view',
  templateUrl: './payment-list-view.component.html',
  styleUrl: './payment-list-view.component.css'
})
export class PaymentListViewComponent implements OnInit {

  userDivision: any;
  paymentForm: FormGroup;
  accountCode: any;
  addTaxAmount: any;
  debitAmountTotal: any;
  lessTaxAmount: any;
  netTotalAmount: any;
  mode: string;
  viewMode: boolean;
  id: number;
   arrayId: any[] = [];
  arrayStatusId: any[] = [];
  formattedDate: string;
  role: string;
  panelOpenState = false;
  revertStatusDA: any;
  saStatus: any;
  soStatus: any;
  asStatus: any;
  dsStatus: any;
  spoStatus: any;
  daStatus: any;
  dcaoStatus: any;
  faStatus: any;
  assDivStatus: any;
  daDivStatus: any;
  eeDivStatus: any;
  billRiseMember: any;
  flowStatus: any;
  berbe: any;
  codeId: any;
  berbeId: any;
  paymentArrayId: number | null = null;
  paymentStatusId: number | null = null;
  paymentArrayIds: any[];
  paymentStatusIds: any[];
  codeID: any;
  selectedCodeId: string | null = null;
 constructor(private apiCall: ApiservicesService,
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {
    this.userDivision = sessionStorage.getItem('division');
    this.role = sessionStorage.getItem('role');
    console.log("roleeeeeeeee",this.role);

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      billNumber: ['', Validators.required],
      billDate: ['', Validators.required],
      fileNo: ['', Validators.required],

      totalAmount: ['', Validators.required],
      passedForAddTaxes: ['', Validators.required],
      passedForLessTaxes: ['', Validators.required],
      passedForNetTotal: ['', Validators.required],

      paymentArrayDTO: this.fb.array([]),
      paymentStatusDTO: this.fb.array([]),

    });

    const formPaymentArray = this.paymentForm.get('paymentArrayDTO') as FormArray;
    formPaymentArray.valueChanges.subscribe(_ => this.updateTotalAmount());

    this.getByIdPayment();
  this.getDebitCode();
    this.mode = this.route.snapshot.paramMap.get('mode');
    this.viewMode = this.mode !== 'edit';

    this.formPayment.controls.forEach((group: any, index: any) => {
      this.setupFormListeners(group, index);
    });
  }
  isViewMode(): boolean {
    return this.mode === 'edit';
  }
  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const [yyyy, mm, dd] = value.split('-');
    const formattedValue = `${dd}-${mm}-${yyyy}`;
    this.el.nativeElement.value = formattedValue;
  }
  updateTotalAmount() {
    const formPaymentArray = this.paymentForm.get('paymentArrayDTO') as FormArray;
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
       console.log("total",totalAmount+"add taxes "+addTaxes+"lessTaxes"+lessTaxes+"netTotal0000"+netTotal);
       
    this.paymentForm.patchValue({
      totalAmount: totalAmount,
      passedForAddTaxes: addTaxes,
      passedForLessTaxes: lessTaxes,
      passedForNetTotal: netTotal
    });
  }

  get formPayment() {
    return this.paymentForm.get('paymentArrayDTO') as FormArray;
  }
  get paymentStatusArray() {
    return this.paymentForm.get('paymentStatusDTO') as FormArray;
  }
  addPaymentStatus() {

    const paymentStatusDTO = this.fb.group({

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
    this.paymentStatusArray.push(paymentStatusDTO);

  }

  addPayment() {
    const payment = this.fb.group({
      debitCode: [''],
      budgetAllocation: [''],
      balance: [''],
      mrMs: [''],
      paymentName: [''],
      gstNo: [''],
      panNo: [''],
      bankName: [''],
      bankBranch: [''],
      accountName: [''],
      accountNo: [''],
      ifscCode: [''],
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
  removePayment(index: number) {
    this.formPayment.removeAt(index);
  }
  getByIdPayment() {
    this.apiCall.apiGetCall_get(`api/payment/getById/${this.id}`).subscribe(
      (res) => {
        console.log("Full Response Object:", res);
  
        const responseObject = res?.responseObject;
        console.log("Response Object:", responseObject);
  
        if (responseObject) {
          this.paymentArrayIds = [];
          this.paymentStatusIds = [];
  
          if (responseObject.paymentArrayDTO && responseObject.paymentArrayDTO.length > 0) {
            responseObject.paymentArrayDTO.forEach(() => this.addPayment());
  
            const firstPayment = responseObject.paymentArrayDTO[0];
            
            this.codeId = firstPayment?.code?.id ?? null; // Use optional chaining and nullish coalescing
            this.berbe = firstPayment?.berbe ?? null; 
            this.berbeId = firstPayment?.berbedata?.id ?? null; // Use optional chaining and nullish coalescing
  
            console.log("Code ID:", this.codeId);
            console.log("Berbe876543:", this.berbe);
            console.log("Berbe ID:", this.berbeId);
  
            this.paymentArrayIds = responseObject.paymentArrayDTO.map((item: any) => item?.id ?? null);
            console.log("Payment Array IDs:", this.paymentArrayIds);
          }
  
          if (responseObject.paymentStatusDTO && responseObject.paymentStatusDTO.length > 0) {
            responseObject.paymentStatusDTO.forEach(() => this.addPaymentStatus());
  
            this.paymentStatusIds = responseObject.paymentStatusDTO.map((item: any) => item?.id ?? null);
            console.log("Payment Status IDs:", this.paymentStatusIds);
          }
  
          this.revertStatusDA = responseObject.daStatus ?? null;
          console.log("Revert Status DA:", this.revertStatusDA);
  
          this.paymentForm.patchValue({
            ...responseObject
          });
  
          (this.paymentForm.get('formPayment') as FormArray).setValue(responseObject.paymentArrayDTO || []);
          (this.paymentForm.get('formPaymentArrays') as FormArray).setValue(responseObject.paymentStatusDTO || []);
  
        } else {
          console.error("Response Object is undefined");
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
  
  
  submit() {
  
    let payload = {
      id: Number(this.id),
      billNumber: this.paymentForm.get('billNumber')?.value || '',
      billDate: this.paymentForm.get('billDate')?.value || '',
      fileNo: this.paymentForm.get('fileNo')?.value || '',
      totalAmount: this.paymentForm.get('totalAmount')?.value || 0,
      passedForAddTaxes: this.paymentForm.get('passedForAddTaxes')?.value || 0,
      passedForLessTaxes: this.paymentForm.get('passedForLessTaxes')?.value || 0,
      passedForNetTotal: this.paymentForm.get('passedForNetTotal')?.value || 0,
      division: this.userDivision,
      divisionUser: 'AO',
      saStatus: 'Active',
      soStatus: 'Active',
      asStatus: 'Pending',
      dsStatus: 'Pending',
      spoStatus: 'Pending',
      daStatus: 'Pending',
      dcaoStatus: 'Pending',
      faStatus: 'Pending',
      assDivStatus: "Active",
      daDivStatus: "",
      eeDivStatus: "",
      flowStatus: 'Head_office',
      billRiseMember: this.role,
      paymentArrayDTO: [], 
      paymentStatusDTO: [],    }
  
    this.paymentStatusArray.controls.forEach((paymentStatusArray,i) => {
      payload.paymentStatusDTO.push({
        id:this.paymentStatusIds[i],
        saSignature: paymentStatusArray.get('saSignature')?.value || '',
        saRemarks: paymentStatusArray.get('saRemarks')?.value || '',
        saRemarksDate: paymentStatusArray.get('saRemarksDate')?.value || '',
  
        soSignature: paymentStatusArray.get('soSignature')?.value || '',
        soRemarks: paymentStatusArray.get('soRemarks')?.value || '',
        soRemarksDate: paymentStatusArray.get('soRemarksDate')?.value || '',
  
        asSignature: paymentStatusArray.get('asSignature')?.value || '',
        asRemarks: paymentStatusArray.get('asRemarks')?.value || '',
        asRemarksDate: paymentStatusArray.get('asRemarksDate')?.value || '',
  
        dsSignature: paymentStatusArray.get('dsSignature')?.value || '',
        dsRemarks: paymentStatusArray.get('dsRemarks')?.value || '',
        dsRemarksDate: paymentStatusArray.get('dsRemarksDate')?.value || '',
  
        spoSignature: paymentStatusArray.get('spoSignature')?.value || '',
        spoRemarks: paymentStatusArray.get('spoRemarks')?.value || '',
        spoRemarksDate: paymentStatusArray.get('spoRemarksDate')?.value || '',
  
        daSignature: paymentStatusArray.get('daSignature')?.value || '',
        daRemarks: paymentStatusArray.get('daRemarks')?.value || '',
        daRemarksDate: paymentStatusArray.get('daRemarksDate')?.value || '',
  
        dcaoSignature: paymentStatusArray.get('dcaoSignature')?.value || '',
        dcaoRemarks: paymentStatusArray.get('dcaoRemarks')?.value || '',
        dcaoRemarksDate: paymentStatusArray.get('dcaoRemarksDate')?.value || '',
  
        faSignature: paymentStatusArray.get('faSignature')?.value || '',
        faRemarks: paymentStatusArray.get('faRemarks')?.value || '',
        faRemarksDate: paymentStatusArray.get('faRemarksDate')?.value || '',
  
        assDivSignature: paymentStatusArray.get('assDivSignature')?.value || '',
        assDivRemarks: paymentStatusArray.get('assDivRemarks')?.value || '',
        assDivRemarksDate: paymentStatusArray.get('assDivRemarksDate')?.value || '',
  
        daDivSignature: paymentStatusArray.get('daDivSignature')?.value || '',
        daDivRemarks: paymentStatusArray.get('daDivRemarks')?.value || '',
        daDivRemarksDate: paymentStatusArray.get('daDivRemarksDate')?.value || '',
  
        eeDivSignature: paymentStatusArray.get('eeDivSignature')?.value || '',
        eeDivRemarks: paymentStatusArray.get('eeDivRemarks')?.value || '',
        eeDivRemarksDate: paymentStatusArray.get('eeDivRemarksDate')?.value || '',
      });
    });
  
    this.formPayment.controls.forEach((paymentGroup, i) => {
      payload.paymentArrayDTO.push({
        id: this.paymentArrayIds[i],
        debitCode: paymentGroup.get('debitCode')?.value || '',
        budgetAllocation: paymentGroup.get('budgetAllocation')?.value || 0,
        balance: paymentGroup.get('balance')?.value || 0,
        paymentName: paymentGroup.get('paymentName')?.value || '',
        mrMs: paymentGroup.get('mrMs')?.value || '',
        gstNo: paymentGroup.get('gstNo')?.value || '',
        panNo: paymentGroup.get('panNo')?.value || '',
  
        bankName: paymentGroup.get('bankName')?.value || '',
        bankBranch: paymentGroup.get('bankBranch')?.value || '',
        accountName: paymentGroup.get('accountName')?.value || '',
        accountNo: paymentGroup.get('accountNo')?.value || '',
        ifscCode: paymentGroup.get('ifscCode')?.value || '',
        jws: paymentGroup.get('jws')?.value || '',
        others: paymentGroup.get('others')?.value || '',
  
        debitAmount: paymentGroup.get('debitAmount')?.value || 0,
        addTaxes: paymentGroup.get('addTaxes')?.value || 0,
        sgstPercentage: paymentGroup.get('sgstPercentage')?.value || 0,
        sgstAmount: paymentGroup.get('sgstAmount')?.value || 0,
        cgstPercentage: paymentGroup.get('cgstPercentage')?.value || 0,
        cgstAmount: paymentGroup.get('cgstAmount')?.value || 0,
        igstPercentage: paymentGroup.get('igstPercentage')?.value || 0,
        iggstAmount: paymentGroup.get('iggstAmount')?.value || 0,
        debitGrossTotal: paymentGroup.get('debitGrossTotal')?.value || 0,
        lessTaxes: paymentGroup.get('lessTaxes')?.value || 0,
        itrDedPercentage: paymentGroup.get('itrDedPercentage')?.value || 0,
        itrDedAmount: paymentGroup.get('itrDedAmount')?.value || 0,
        gstDedPercentage: paymentGroup.get('gstDedPercentage')?.value || 0,
        gstDedAmount: paymentGroup.get('gstDedAmount')?.value || 0,
        gstTdsPercentage: paymentGroup.get('gstTdsPercentage')?.value || 0,
        gstTdsAmount: paymentGroup.get('gstTdsAmount')?.value || 0,
        debitNetTotal: paymentGroup.get('debitNetTotal')?.value || 0,
        berbe: this.berbe || '', 
        codeId: this.codeId || 0,
        berbeId: this.berbeId || 0 
      
      });
    });
  
    console.log(payload);
  
    this.apiCall.apiPostCall('api/payment/edit', payload).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/famodule/home/payment']);
        this.snackbar.open('Payment Updated successfully!', 'close', {
          duration: 3000,
        });
      },
      (error) => {
        console.log(error);
        this.snackbar.open('Enter all fields!', 'close', {
          duration: 3000,
        });
      }
    );
  }

  filterNumericInput(event: any): void {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, '');  
    this.paymentForm.get('accountName')?.setValue(event.target.value); 
  }
  
  budgetAllocation(event: any, paymentIndex: number) {
    const codeNumber = event.target.value; 
    console.log(codeNumber, 'codeNumber');
  
    let date = this.paymentForm.get('billDate').value;
    let dateParts = date.split('-').map(value => parseInt(value, 10));
    let [dateValueday, dateValueMonth, dateValueYear] = dateParts;
  
    let dateMonth = 3;
    let dateDay = 31;
    let formattedDate = `${dateDay}-0${dateMonth}-${dateValueYear}`;
  
    let dateValue;
    if (dateMonth < dateValueMonth) {
      dateValue = `${parseInt(dateValueYear)}-${parseInt(dateValueYear) + 1}`;
    } else {
      dateValue = `${parseInt(dateValueYear) - 1}-${dateValueYear}`;
    }
  
    // Prepare payload
    let payload = {
      division: this.userDivision,
      codeNumber: codeNumber, 
      year: dateValue
    };
  
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
          balance: response.budgetAllocation || 0 // Initialize balance when budget allocation is set
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
   
  paymentCalculation(index: number) {
    const formArray = this.paymentForm.get('paymentArrayDTO') as FormArray;
    const group = formArray.at(index) as FormGroup;

    const debitAmount = parseFloat(group.get('debitAmount').value) || 0;
    const sgstPercentage = parseFloat(group.get('sgstPercentage').value) || 0;
    const cgstPercentage = parseFloat(group.get('cgstPercentage').value) || 0;
    const igstPercentage = parseFloat(group.get('igstPercentage').value) || 0;

    const sgstAmount = (debitAmount * sgstPercentage) / 100;
    const cgstAmount = (debitAmount * cgstPercentage) / 100;
    const igstAmount = (debitAmount * igstPercentage) / 100;

    group.get('sgstAmount').setValue(sgstAmount);
    group.get('cgstAmount').setValue(cgstAmount);
    group.get('iggstAmount').setValue(igstAmount);

    const addTaxes = sgstAmount + cgstAmount + igstAmount;
    group.get('addTaxes').setValue(addTaxes);

    const debitGrossTotal = debitAmount + addTaxes;
    group.get('debitGrossTotal').setValue(debitGrossTotal);

    const itrDedPercentage = parseFloat(group.get('itrDedPercentage').value) || 0;
    const gstDedPercentage = parseFloat(group.get('gstDedPercentage').value) || 0;
    const gstTdsPercentage = parseFloat(group.get('gstTdsPercentage').value) || 0;

    const itrDedAmount = (debitAmount * itrDedPercentage) / 100;
    const gstDedAmount = (debitAmount * gstDedPercentage) / 100;
    const gstTdsAmount = (debitAmount * gstTdsPercentage) / 100;

    group.get('itrDedAmount').setValue(itrDedAmount);
    group.get('gstDedAmount').setValue(gstDedAmount);
    group.get('gstTdsAmount').setValue(gstTdsAmount);

    const lessTaxes = itrDedAmount + gstDedAmount + gstTdsAmount;
    group.get('lessTaxes').setValue(lessTaxes);

    const debitNetTotal = debitGrossTotal - lessTaxes;
    group.get('debitNetTotal').setValue(debitNetTotal);

    const jwsAmount = parseFloat(group.get('jws').value) || 0;
    const finalLessTaxes = lessTaxes + jwsAmount;
    group.get('lessTaxes').setValue(finalLessTaxes);

    const finalNetTotal = debitGrossTotal - finalLessTaxes;
    group.get('debitNetTotal').setValue(finalNetTotal);
}
//  setupFormListeners(group: FormGroup, index: number) {
//     group.get('debitAmount').valueChanges.pipe(debounceTime(300)).subscribe(() => {
//       this.calculateTaxes(group, index);
//     });

//     group.get('sgstPercentage').valueChanges.subscribe(() => {
//       this.calculateTaxes(group, index);
//     });

//     group.get('cgstPercentage').valueChanges.subscribe(() => {
//       this.calculateTaxes(group, index);
//     });

//     group.get('igstPercentage').valueChanges.subscribe(() => {
//       this.calculateTaxes(group, index);
//     });

//     group.get('itrDedPercentage').valueChanges.subscribe(() => {
//       this.calculateDeductions(group, index);
//     });

//     group.get('gstDedPercentage').valueChanges.subscribe(() => {
//       this.calculateDeductions(group, index);
//     });

//     group.get('gstTdsPercentage').valueChanges.subscribe(() => {
//       this.calculateDeductions(group, index);
//     });

//     group.get('jws').valueChanges.subscribe(() => {
//       this.calculateDeductions(group, index);
//     });
//   }
setupFormListeners(group: FormGroup, index: number) {
  group.get('debitAmount').valueChanges.pipe(debounceTime(300)).subscribe(() => {
    this.calculateTaxes(group, index);
    this.updateTotalAmount(); 
  });

  group.get('sgstPercentage').valueChanges.subscribe(() => {
    this.calculateTaxes(group, index);
    this.updateTotalAmount();
  });

  group.get('cgstPercentage').valueChanges.subscribe(() => {
    this.calculateTaxes(group, index);
    this.updateTotalAmount();
  });

  group.get('igstPercentage').valueChanges.subscribe(() => {
    this.calculateTaxes(group, index);
    this.updateTotalAmount();
  });

  group.get('itrDedPercentage').valueChanges.subscribe(() => {
    this.calculateDeductions(group, index);
    this.updateTotalAmount();
  });

  group.get('gstDedPercentage').valueChanges.subscribe(() => {
    this.calculateDeductions(group, index);
    this.updateTotalAmount();
  });

  group.get('gstTdsPercentage').valueChanges.subscribe(() => {
    this.calculateDeductions(group, index);
    this.updateTotalAmount();
  });

  group.get('jws').valueChanges.subscribe(() => {
    this.calculateDeductions(group, index);
    this.updateTotalAmount();
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

    console.log(jws, "jws jws");
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
  getDebitCode() {
    this.apiCall.apiPostCall('api/code/getAll', {}).subscribe((data) => {
      console.log("data for debit code", data);
  
      if (data && data.responseObject) {
        this.accountCode = data.responseObject.map((item: any) => {
          return {
            codeAndDescription: `${item.codeNumber} - ${item.codeName}`, 
            id: item.id,
            ...item 
          };
        });
      }
    });
  } 

}
