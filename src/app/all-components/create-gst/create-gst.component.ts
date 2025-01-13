import { Component } from '@angular/core';

export interface PeriodicElement {

  position: number;
  division: string;
  accountCode: number;
  amount: number;
  CGST: number;
  SGST: number;
  Total: number;
}

const ELEMENT_DATA = [
  {position: 1, division: 'Head Office', accountCode: 790, amount: 360000, CGST: 32400, SGST: 32400,IGST:0, Total: 64800},
  {position: 2, division: 'Anna Nagar', accountCode: 732, amount: 500000, CGST: 10000, SGST: 10000,IGST:0, Total: 20000},
  {position: 3, division: 'KK Nagar', accountCode: 290, amount: 290000, CGST: 5800, SGST: 5800,IGST:0, Total: 11600},
  {position: 4, division: 'Besant Nagar', accountCode: 183, amount: 670000, CGST: 60300, SGST: 60300,IGST:0, Total: 120600},
  {position: 5, division: 'JJ Nagar', accountCode: 800, amount: 100000, CGST: 2000, SGST: 2000,IGST:0, Total: 4000},
];

@Component({
  selector: 'app-create-gst',
  templateUrl: './create-gst.component.html',
  styleUrl: './create-gst.component.css'
})


export class CreateGstComponent {

  displayedColumns: string[] = ['position', 'division', 'accountCode', 'amount', 'CGST','SGST','IGST', 'Total'];
  dataSource = ELEMENT_DATA;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  selectedMonth: string = 'Select Month';
  selectMonth(month: string) {
    this.selectedMonth = month;
  }



  quarters: { selectQuarter: string; months: string[] }[] = [
    { selectQuarter: 'april-june', months: ['April', 'May', 'June'] },
    { selectQuarter: 'july-september', months: ['July', 'August', 'September'] },
    { selectQuarter: 'october-december', months: ['October', 'November', 'December'] },
    { selectQuarter: 'january-march', months: ['January', 'February', 'March'] }
  ];
  selectedquarter: string = 'Select Quarter';
  selectedQuarter: { selectQuarter: string; months: string[] } = this.quarters[0];



  
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


 selectedDivision: string = 'select-divisionWise'; // Default selected division
  divisions: string[] = ['divisionWise1', 'divisionWise2', 'divisionWise3'];

  
  selectedCodeWise: string = 'select-codeWise'; 
  codeWise: string[] = ['codeWise1', 'codeWise2', 'codeWise3'];


  fromDate!: string; 
  toDate!: string;
  onDateChange(event: any) {
    console.log('Selected date:', event.target.value);
  }


  divisions3: string[] = ['Division 1', 'Division 2', 'Division 3'];
  accountCodes: string[] = ['Code 1', 'Code 2', 'Code 3'];
  gstData: any[] = []; // Array to store table rows

  addRow() {
    const initialSNo = this.gstData.length + 1;
    this.gstData.push({
      sno: initialSNo,
      division: '',
      accountCode: '',
      amount: null,
      cgst: null,
      sgst: null,
      totalGst: null
    });
  }

  deleteRow(index: number) {
    this.gstData.splice(index, 1);
  }

  editRow(index: number) {
    // Add edit logic here if needed
    console.log('Editing row at index:', index);
  }

}
