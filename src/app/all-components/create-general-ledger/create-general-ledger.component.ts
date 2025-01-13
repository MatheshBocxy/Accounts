import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface PeriodicElement {

  position: number;
  Date: string;
  documentReference: any;
  description: any;
  debit: any;
  credit: any;
  closingBalance: any;
}

const ELEMENT_DATA = [
  { position: 1, Date: '05-02-2024', documentNo: 'RPT', voucherNo: 37, description: '110 Flat Avadi', debit: 321990, credit: 0, closingBalance: 650000 },
  { position: 2, Date: '16-03-2024', documentNo: 'PYT', voucherNo: 101, description: 'M/s.Krishnan & Co', debit: 0, credit: 450000, closingBalance: 200000 },
  { position: 3, Date: '20-04-2024', documentNo: 'JV', voucherNo: 32, description: '548-HIG Flats', debit: 117890, credit: 0, closingBalance: 317890 },
  { position: 4, Date: '08-05-2024', documentNo: 'RPT', voucherNo: 49, description: '90 Flat Anna Nagar', debit: 200000, credit: 0, closingBalance: 517890 },
  { position: 5, Date: '10-06-2024', documentNo: 'JV', voucherNo: 40, description: '290-Miscellaneous Expenses', debit: 0, credit: 100000, closingBalance: 417890 },

];

@Component({
  selector: 'app-create-general-ledger',
  templateUrl: './create-general-ledger.component.html',
  styleUrl: './create-general-ledger.component.css'
})
export class CreateGeneralLedgerComponent implements OnInit {

  GendralLedgerForm: FormGroup

  displayedColumns: string[] = ['position', 'Date', 'documentNo', 'voucherNo', 'description', 'debit', 'credit', 'closingBalance'];
  dataSource = ELEMENT_DATA;

  constructor(
    // private httpserv: HttpService,
    private fb: FormBuilder,
  ) {
  }
  // getRequestMethod() {
  //   this.httpserv.getMethod().subscribe(
  //     (responce) => {
  //       console.log(responce);
  //       console.log("hello world");
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   )
  // }

  ngOnInit(): void {
    this.GendralLedgerForm = this.fb.group({
      totalDebit: ['639880'],
      totalCredit: ['550000'],
      totalCloseBal: [''],
      receiptDebit: [''],
      ReceiptCredit: [''],
      paymentDebit: [''],
      paymentCredit: [''],
      jvDebit: [''],
      jvCredit: [''],
    })
    // this.getRequestMethod();
  }

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  selectedMonth: string = 'Select Month';

  quarters: { selectQuarter: string; months: string[] }[] = [
    { selectQuarter: 'april-june', months: ['April', 'May', 'June'] },
    { selectQuarter: 'july-september', months: ['July', 'August', 'September'] },
    { selectQuarter: 'october-december', months: ['October', 'November', 'December'] },
    { selectQuarter: 'january-march', months: ['January', 'February', 'March'] }
  ];
  selectedQuarter: string = 'Select Quarter';

  halfYears: { selectHalfYear: string; months: string[] }[] = [
    { selectHalfYear: 'april-september', months: ['April', 'May', 'June', 'July', 'August', 'September'] },
    { selectHalfYear: 'october-march', months: ['October', 'November', 'December', 'January', 'February', 'March'] }
  ];
  selectedHalfYear: { selectHalfYear: string; months: string[] } = this.halfYears[0];

  annualYears: string[] = this.generateAnnualYears(2000, 2050);
  selectedAnnualYear: string = 'Select Annual Year';
  generateAnnualYears(startYear: number, endYear: number): string[] {
    const years: string[] = [];
    for (let year = startYear; year < endYear; year++) {
      const nextYear = year + 1;
      const yearRange = `${year}-${nextYear}`;
      years.push(yearRange);
    }
    return years;
  }

  selectedDivision: string = 'select-divisionWise';
  divisions: string[] = ['divisionWise1', 'divisionWise2', 'divisionWise3'];

  selectedCodeWise: string = 'select-codeWise';
  codeWise: string[] = ['codeWise1', 'codeWise2', 'codeWise3'];

  fromDate!: string;
  toDate!: string;
  onDateChange(event: any) {
    console.log('Selected date:', event.target.value);
  }

}
