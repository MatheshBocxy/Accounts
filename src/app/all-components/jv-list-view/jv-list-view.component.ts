import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';

@Component({
  selector: 'app-jv-list-view',
  templateUrl: './jv-list-view.component.html',
  styleUrl: './jv-list-view.component.css'
})
export class JvListViewComponent implements OnInit {

  journalForm: FormGroup;
  division: string;
  role: string;
  billNumberGen: any;
  allAccountCode: any;
  id: any;
  arrayId: any;
  journalArrayStatusId: any[] = [];
  journalArrayId: any[] = [];
  journalId: any;
  mode: any;
  journalObjId: any;
  accCode: any[] = [];
  billNumber: any;
  fileNo: any;
  jvDate: any;
  jvNo: any;
  arrayRemark: any[]=[];
  arrayJournal: any[]=[];
  accountCode: any[] = [];
  billNumbers: string[] = [];

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
      this.id = params['id'];
      this.mode = params['mode'];
      console.log(this.id);
      console.log(this.mode);
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.mode = params['mode'];
      console.log(this.id);
      console.log(this.mode);

      this.getJournalDetails(this.id);
    });
    this.journalForm = this.fb.group({
      jvNo: ['', Validators.required],
      fileNo: ['', Validators.required],
      jvDate: ['', Validators.required],
      totalDebit: ['', Validators.required],
      totalCredit: ['', Validators.required],
      billNumberjv: ['', Validators.required],

      resJournalArrayDTOList: this.fb.array([]),
      resJournalRemarkDTOList: this.fb.array([]),

    });

    // this.getByIdJournal();
    // this.billNumberDropDown();
    // this.getAllAccountCodes();
   this.getDebitCode()
    this.journalArray.valueChanges.subscribe(values => {
      this.calculateTotalDebit();
      this.calculateTotalCredit();
    });
    this.getBill_number();

  }
  getByIdJournal(id:number) {
    this.apiCall.getJournalById(this.id).subscribe(
      (res) => {
        this.journalObjId = res.data.id
        // this.accCode = res.data.accCode
        console.log(this.accCode, '--accCode--');

        console.log(this.journalObjId, '----------id-----------');

        console.log(res);

        const formJournal = res?.data.resJournalArrayDTOList.map((data) => {
          this.accCode.push(data.accCode);
          console.log(this.accCode, '--accCode--');

          this.journalArrayId.push(data.id);
          console.log(this.journalArrayId, 'id data');
          this.addPaymentRow();
          return { formJournal: data };
        });

        const formJournalArrays = res?.data.resJournalRemarkDTOList.map((data) => {
          this.journalArrayStatusId.push(data.id);
          console.log(this.journalArrayStatusId, 'id data');

          this.addRemarksArray();
          return { formPaymentArrays: data };
        });
        this.journalForm.patchValue({ ...res.data, formJournal });
        this.journalForm.patchValue({ ...res.data, formJournalArrays });
        console.log(this.arrayId);

      }, (err) => {
        console.error(err.message);
      });
  }
  saveJV() {
    let payload = {
      id: this.journalObjId,
      jvNo: this.journalForm.get('jvNo').value,
      fileNo: this.journalForm.get('fileNo').value,
      jvDate: this.journalForm.get('jvDate').value,
      totalDebit: this.journalForm.get('totalDebit').value,
      totalCredit: this.journalForm.get('totalCredit').value,
      billNumberjv: String(this.journalForm.get('billNumberjv').value),
      reqJournalArrayDTOList: [],
      reqJournalRemarkDTOList: [],
    };
  
    const journalArray = this.journalForm.get('resJournalArrayDTOList') as FormArray;
    journalArray.controls.forEach((jvArray, i) => {
      payload.reqJournalArrayDTOList.push({
        id: this.arrayJournal[i], // Include ID from arrayJournal
        debit: jvArray.get('debit')?.value,
        credit: jvArray.get('credit')?.value,
        accCode: jvArray.get('accCode')?.value,
      });
    });
  
    const remarksArray = this.journalForm.get('resJournalRemarkDTOList') as FormArray;
    remarksArray.controls.forEach((jvremarksArray, i) => {
      payload.reqJournalRemarkDTOList.push({
        id: this.arrayRemark[i], // Include ID from arrayRemark
        narration: jvremarksArray.get('narration')?.value,
        signature: jvremarksArray.get('signature')?.value,
        date: jvremarksArray.get('date')?.value,
      });
    });
  
    this.apiCall.apiPostCall('api/journal/update', payload).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/famodule/home/journal']);
        this.snackbar.open('Journal created successfully!', 'close', {
          duration: 3000,
        });
      },
      (err) => {
        console.error(err.message);
        this.snackbar.open('Enter all fields are Entered !', 'close', {
          duration: 3000,
        });
      }
    );
  }
  
  

  get journalArray() {
    return this.journalForm.get('resJournalArrayDTOList') as FormArray;
  }

  get journalRamarksArray() {
    return this.journalForm.get('resJournalRemarkDTOList') as FormArray;
  }

  addPaymentRow() {
    const journalArray = this.fb.group({
      accCode: [''],
      debit: [''],
      credit: [''],
    });
    this.journalArray.push(journalArray);
    this.addValueChangeListeners(this.journalArray.length - 1);
    this.addValueChangeListeners(0);
  }

  addRemarksArray() {
    const remarksArray = this.fb.group({
      // saSignature: [''],
      // saRemarks: [''],
      // saRemarksDate: [''],
      // saPresent: [''],
      // soSignature: [''],
      // soRemarks: [''],
      // soRemarksDate: [''],
      // soPresent: [''],
      // asSignature: [''],
      // asRemarks: [''],
      // asRemarksDate: [''],
      // asPresent: [''],
      // dsSignature: [''],
      // dsRemarks: [''],
      // dsRemarksDate: [''],
      // dsPresent: [''],
      // spoSignature: [''],
      // spoRemarks: [''],
      // spoRemarksDate: [''],
      // spoPresent: [''],
      // daPresent: [''],
      // daSignature: [''],
      // daRemarks: [''],
      // daRemarksDate: [''],
      // dcaoSignature: [''],
      // dcaoRemarks: [''],
      // dcaoRemarksDate: [''],
      // dcaoPresent: [''],
      // faSignature: [''],
      // faRemarks: [''],
      // faRemarksDate: [''],
      // faPresent: ['']
      narration: [''],
      signature:[''],
      date: [''],

    });
    this.journalRamarksArray.push(remarksArray);
  }

  removePaymentRow(index: number): void {
    if (this.journalArray.length > 1) {
      this.journalArray.removeAt(index);
    }

    this.calculateTotalDebit();
    this.calculateTotalCredit();
  }

  calculateTotalDebit() {
    const totalDebit = this.journalArray.controls.reduce((sum, control) => {
      const debit = control.get('debit').value;
      return sum + (parseFloat(debit) || 0);
    }, 0);
    this.journalForm.get('totalDebit').setValue(totalDebit.toFixed(2));
  }

  calculateTotalCredit() {
    const totalCredit = this.journalArray.controls.reduce((sum, control) => {
      const credit = control.get('credit').value;
      return sum + (parseFloat(credit) || 0);
    }, 0);
    this.journalForm.get('totalCredit').setValue(totalCredit.toFixed(2));
  }

  addValueChangeListeners(index: number) {
    const row = this.journalArray.at(index);

    row.get('debit').valueChanges.subscribe(debitValue => {
      if (debitValue) {
        row.get('credit').disable({ emitEvent: false });
      } else {
        row.get('credit').enable({ emitEvent: false });
      }
    });

    row.get('credit').valueChanges.subscribe(creditValue => {
      if (creditValue) {
        row.get('debit').disable({ emitEvent: false });
      } else {
        row.get('debit').enable({ emitEvent: false });
      }
    });
  }

  //decimal codes

  decimalInput(formName: string, controlName: string, index: number) {
    const formArray = this[formName].get('resJournalArrayDTOList') as FormArray;
    const control = formArray.at(index).get(controlName);
    if (control) {
      let value = control.value;
      value = value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }
      const regex = /^\d*\.?\d{0,2}$/;
      if (regex.test(value)) {
        control.setValue(value, { emitEvent: false });
      } else {
        control.setValue('', { emitEvent: false });
      }
    }
  }

  formatToTwoDecimals(formName: string, controlName: string, index: number) {
    const formArray = this[formName].get('resJournalArrayDTOList') as FormArray;
    const control = formArray.at(index).get(controlName);
    if (control) {
      let value = control.value;
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        control.setValue(numericValue.toFixed(2), { emitEvent: false });
      }
    }
  }

  // billNumberDropDown() {
  //   let payload = {
  //     division: this.division
  //   }
  //   this.apiCall.apiPostCall('finance/getBillNumberOnly', payload).subscribe(
  //     (responce) => {
  //       this.billNumberGen = responce.data;
  //     }, (err) => {
  //       console.error(err.message);
  //     });
  // }

  // getAllAccountCodes() {
  //   this.apiCall.apiGetCall('finance/getAllCodeAndSName').subscribe(
  //     (responce) => {
  //       this.allAccountCode = responce.data;
  //       console.log(this.allAccountCode);
  //     }, (err) => {
  //       console.error(err.message);
  //     });
  // }


  // getJournalDetails(id: number) {
  //   this.apiCall.getJournalById(id).subscribe(
  //     (response) => {
  //       console.log('API Response for the journal view:', response);
  //       this.billNumber = response.responseObject.billNumberjv;
  //       this.fileNo=response.responseObject.fileNo
  //       this.jvDate=response.responseObject.jvDate
  //       this.jvNo=response.responseObject.jvNo
  //       // this.patchFormData(response);
  //     },
  //     (error) => {
  //       console.error('Error fetching journal details:', error);
  //     }
  //   );
  // }
  getJournalDetails(id: number): void {
    this.apiCall.getJournalById(id).subscribe(
      (response) => {
        console.log('API Response for the journal view:', response);
        this.patchFormData(response.responseObject);
      },
      (error) => {
        console.error('Error fetching journal details:', error);
      }
    );
  }
  patchFormData(data: any): void {
    this.journalObjId = data.id;

    // Patch main form values
    this.journalForm.patchValue({
      jvNo: data.jvNo,
      fileNo: data.fileNo,
      jvDate: data.jvDate,
      billNumberjv: data.billNumberjv,
      totalDebit: data.totalDebit,
      totalCredit: data.totalCredit
    });
  
    // Handle resJournalArrayDTOList
    const journalArray = this.journalForm.get('resJournalArrayDTOList') as FormArray;
  
    // Clear existing controls
    while (journalArray.length) {
      journalArray.removeAt(0);
    }
  
    // Populate FormArray with new data
    if (data.resJournalArrayDTOList && Array.isArray(data.resJournalArrayDTOList)) {
      data.resJournalArrayDTOList.forEach((item: any) => {
        journalArray.push(this.fb.group({
          id: [item.id || ''], // Add ID field
          accCode: [item.accCode || ''],
          debit: [item.debit || ''],
          credit: [item.credit || ''],
          codeDTO: [item.codeDTO || '']
        }));
  
        // Save IDs for later use
        this.arrayJournal.push(item.id);
      });
    }
  
    // Handle resJournalRemarkDTOList
    const remarksArray = this.journalForm.get('resJournalRemarkDTOList') as FormArray;
  
    // Clear existing controls
    while (remarksArray.length) {
      remarksArray.removeAt(0);
    }
  
    // Populate FormArray with new data
    if (data.resJournalRemarkDTOList && Array.isArray(data.resJournalRemarkDTOList)) {
      data.resJournalRemarkDTOList.forEach((remark: any) => {
        remarksArray.push(this.fb.group({
          id: [remark.id || ''], // Add ID field
          narration: [remark.narration || ''],
          signature: [remark.signature || ''],
          date: [remark.date || '']
        }));
  
        // Save IDs for later use
        this.arrayRemark.push(remark.id);
      });
    }
  }
  getDebitCode() {
    this.apiCall.apiPostCall('api/code/getAll', {}).subscribe((data) => {
      console.log("data for debit code", data);
  
      if (data && data.responseObject) {
        this.accountCode = data.responseObject.map((item: any) => {
          return {
            codeAndDescription: `${item.codeNumber} - ${item.codeName}`, 
            id: item.id, // Store the id here
            ...item 
          };
        });
      }
    });
  } 
  getBill_number() {
    this.apiCall.apiGetCall_get('api/payment/bill-numbers').subscribe(
      (response: string[]) => {  
        console.log("Response:", response);
        this.billNumbers = response;
        console.log("this.billNumbers:", this.billNumbers);
        
      },
      (error) => {
        console.error("Error fetching bill numbers:", error);
      }
    );
  }
 
  

}
