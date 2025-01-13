import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const data = [
  // Your data goes here
  // Example data:
  { SNo: 1, date: 'Hydrogen', accountCode: 1.0079, voucherType: 132, voucherNo: 12, instNo: 12, instDate: 12, bankDate: 12, reasons: 'Reason', debit: 12, credit: 12},
 
];

@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrl: './reconciliation.component.css'
})
export class ReconciliationComponent implements OnInit {

  tableData = [{
    id: '1', // Assuming id is a string
    date: '',
    accCode: '',
    voucherType: '',
    voucherNo: '',
    instNo: '',
    instDate: '',
    bankDate: new Date(),
    reasons: '',
    debit: '',
    credit: '',
    sno: ''
  }];

  addRow() {
    this.tableData.push({
      id: (this.tableData.length + 1).toString(),
      date: '',
      accCode: '',
      voucherType: '',
      voucherNo: '',
      instNo: '',
      instDate: '',
      bankDate: new Date(),
      reasons: '',
      debit: '',
      credit: '',
      sno: ''
    });
  }

  removePaymentRow(index:number){
    this.tableData.splice(index, 1);
  }
  
  // allReconciliationDataSource = new MatTableDataSource<any>([]);

  ngOnInit() {
    // this.allReconciliationDataSource.data = data
  }


  displayedColumns: string[] = ['SNo', 'date', 'accountCode', 'voucherType', 'voucherNo', 'instNo', 'instDate', 'bankDate', 'reasons', 'debit', 'credit','ACTION'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedDivision: string = 'select-divisionWise';
  divisions: string[] = ['divisionWise1', 'divisionWise2', 'divisionWise3'];

  selectedDivision1: string = ''; 
  divisions1: string[] = ['bankCode1', 'bankCode2', 'bankCode3'];

 
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  selectedMonth: string = 'Select Month';

  annualYears: string[] = this.generateAnnualYears(2020, 2050);
  selectedAnnualYear: string = 'Select Annual Year';

  router: any;

  generateAnnualYears(startYear: number, endYear: number): string[] {
    const years: string[] = [];
    for (let year = startYear; year < endYear; year++) {
      const nextYear = year + 1;
      const yearRange = `${year}-${nextYear}`;
      years.push(yearRange);
    }
    return years;
  }

  fromDate!: string;
  toDate!: string;
  onDateChange(event: any) {
    console.log('Selected date:', event.target.value);
  }
  Reasons = ['Reason1', 'Reason2', 'Reason3'];
  // ... other properties and methods


}
