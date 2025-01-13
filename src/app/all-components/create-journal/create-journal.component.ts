import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';

@Component({
  selector: 'app-create-journal',
  templateUrl: './create-journal.component.html',
  styleUrl: './create-journal.component.css'
})
export class CreateJournalComponent implements OnInit {

  journalForm: FormGroup;
  paymentRows: any;
  userDivision: string;
  division: string;
  allAccountCode: any;
  todaysDate: string = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  billNumberGen: any;
  accountCode: any[] = [];  // Store both code and ID
  codeIds: number[] = []; // Variable to store IDs
  divisionValue: string;
  jvNumberData: any;
  jvNumber: any;
  billNumbers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private apiCall: ApiservicesService,
    private router: Router,
    private datePipe: DatePipe,
    private snackbar: MatSnackBar,
  ) {
    this.userDivision = sessionStorage.getItem('division');
    this.division = sessionStorage.getItem('role');
  }

  ngOnInit() {
    this.journalForm = this.fb.group({
      jvNo: ['', Validators.required],
      fileNo: ['', Validators.required],
      jvDate: ['', Validators.required],
      totalDebit: ['', Validators.required],
      totalCredit: ['', Validators.required],
      billNumberjv: ['', Validators.required],

      reqJournalArrayDTOList: this.fb.array([]),
      reqJournalRemarkDTOList: this.fb.array([]),

    });
    this.getJVnumber()
    // this.getAllAccountCodes();
    this.getBill_number()
    this.addPaymentRow();
    this.addRemarksArray();
    // bill number generation
    // this.billNumberDropDown();
    // this.jvNoAutoGen();
    this.getDebitCode()

    this.journalForm.get('jvDate').patchValue(this.todaysDate);

    this.journalArray.valueChanges.subscribe(values => {
      this.calculateTotalDebit();
      this.calculateTotalCredit();
    });
    this.addValueChangeListeners(0);

  }

  jvNoAutoGen() {
    this.apiCall.apiGetCall(`finance/jvNumber/${this.userDivision}`).subscribe(
      (responce) => {
        console.log(responce);
        this.journalForm.patchValue({ jvNo: responce.data.jvNumber });
      },
      (err) => {
        console.error(err.message);
      });
  }

  billNumberStatus() {
    let payload = {
      division: this.userDivision,
      jvStatus: "Success"
    }
    this.apiCall.apiPostCall('finance/jvNumber/Status', payload).subscribe(
      (responce) => {
        console.log(responce.data);
      },
      (error) => {
        console.log(error.message);
      });
  }

  get journalArray() {
    return this.journalForm.get('reqJournalArrayDTOList') as FormArray;
  }

  get journalRamarksArray() {
    return this.journalForm.get('reqJournalRemarkDTOList') as FormArray;
  }

  addPaymentRow() {
    const journalArray = this.fb.group({
      accCode: [''],
      debit: [''],
      credit: [''],
    });
    this.journalArray.push(journalArray);
    this.addValueChangeListeners(this.journalArray.length - 1);

  }

  addRemarksArray() {
    const remarksArray = this.fb.group({
      narration: [''],
      signature: [''],
      date: ['']
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

  saveJV() {
    let payload = {
      division: this.userDivision,
      jvNo: this.journalForm.get('jvNo').value,
      fileNo: this.journalForm.get('fileNo').value,
      jvDate: this.journalForm.get('jvDate').value,
      totalDebit: this.journalForm.get('totalDebit').value,
      totalCredit: this.journalForm.get('totalCredit').value,
      billNumberjv: String(this.journalForm.get('billNumberjv').value),
      reqJournalArrayDTOList: [],
      reqJournalRemarkDTOList: [],
    };
    console.log("Payload:", payload);

    // Process journal array entries
    this.journalArray.controls.forEach(jvArray => {
      let accCode = jvArray.get('accCode').value;
      let codeNumberSplit = accCode.split('-');
      let codeNumber = codeNumberSplit[0];
      let codeDisc = codeNumberSplit[1];
      console.log(codeNumber, 'Code Number');
      console.log(codeDisc, 'Code Description');
      console.log(accCode, 'Account Code');

      // Find the ID for the given accCode
      const account = this.accountCode.find(ac => ac.codeAndDescription === accCode);
      const codeId = account ? account.id : null;  // Retrieve the ID or set it to null if not found

      payload.reqJournalArrayDTOList.push({
        accCode: jvArray.get('accCode').value,
        debit: jvArray.get('debit').value,
        credit: jvArray.get('credit').value,
        codeId: codeId  // Pass the ID as a number
      });
    });

    // Process journal remarks entries
    this.journalRamarksArray.controls.forEach(jvremarksArray => {
      payload.reqJournalRemarkDTOList.push({
        narration: jvremarksArray.get('narration').value,
        signature: jvremarksArray.get('signature').value,
        date: jvremarksArray.get('date').value,
      });
    });

    this.apiCall.apiPostCall('api/journal/create', payload).subscribe(
      (response) => {
        console.log("Journal created successfully!", response);
        this.apiCall.updateJvNo(this.userDivision, 'Success').subscribe(
          (updateResponse) => {
            console.log('JV number status updated successfully!', updateResponse);
            this.router.navigate(['/famodule/home/journal']);
            this.snackbar.open('Journal created and JV status updated successfully!', 'close', { duration: 3000 });
          },
          (updateError) => {
            console.error('Error updating JV number status:', updateError);
            this.snackbar.open('Error updating JV status!', 'close', { duration: 3000 });
          }
        );
      },
      (err) => {
        console.error('Error creating journal:', err.message);
        this.snackbar.open('Please ensure all fields are filled!', 'close', { duration: 3000 });
      }
    );
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

  decimalInput(formArrayName: string, controlName: string, index: number) {
    const formArray = this.journalForm.get(formArrayName) as FormArray; // Access the FormArray
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
    const formArray = this.journalForm.get(formArrayName) as FormArray; // Access the FormArray
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

  //     if (data && data.responseObject) {
  //       this.accountCode = data.responseObject.map((item: any) => {
  //         this.codeIds.push(item.id); // Store the ID
  //         return {
  //           codeAndDescription: `${item.codeNumber} - ${item.codeName}`,
  //           ...item
  //         };
  //       });
  //     }
  //   });
  // }
  getDebitCode() {
    this.apiCall.apiPostCall('api/code/getAll', {}).subscribe((data) => {
      console.log("data for debit code", data);

      if (data && data.responseObject) {
        this.accountCode = data.responseObject.map((item: any) => {
          return {
            codeAndDescription: `${item.codeNumber} - ${item.codeName}`,
            id: item.id  // Store ID along with description
          };
        });
      }
    });
  }
  getJVnumber() {
    // Retrieve the division value from session storage
    this.divisionValue = sessionStorage.getItem('division');

    if (this.divisionValue) {
      this.apiCall.getJvNumber(this.divisionValue).subscribe(
        (data) => {
          console.log("JV number:", data);
          this.jvNumber = data.responseObject.jvNo;
          this.journalForm.get('jvNo')?.setValue(this.jvNumber);
        },
        (error) => {
          console.error('Error fetching JV number:', error);
        }
      );
    } else {
      console.error('Division is not available in session storage.');
    }
  }
  getBill_number() {
    this.apiCall.apiGetCall_get('api/payment/bill-numbers').subscribe(
      (response: string[]) => {  // Assuming the response is an array of strings
        console.log("Response:", response);
        this.billNumbers = response; // Store the response in the billNumbers array
      },
      (error) => {
        console.error("Error fetching bill numbers:", error);
      }
    );
  }

}
