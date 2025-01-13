import { Component } from '@angular/core';



export interface PeriodicElement {

  Date: any;
  accCode: number;
  description: string;
  voucherNo: number;
  amount: string;
  remarks: string;
}
const ELEMENT_DATA = [
  { Date: '23-01-2024', accCode: '101-SALE OF HOUSES/FLATS-M.I.G.', voucherNo: 23, amount: '240560.00' },
  { Date: '16-02-2024', accCode: '111-SALE OF PLOTS-M.I.G.', voucherNo: 29, amount: '332690.00' },
  { Date: '03-03-2024', accCode: '120-INTEREST FROM ALLOTTEES-H.I.G.', voucherNo: 35, amount: '178090.00' },
  { Date: '12-04-2024', accCode: '123-INTEREST FROM ALLOTTEES-M.I.G-2.', voucherNo: 47, amount: '412700.00' },
  { Date: '18-05-2024', accCode: '168-RECOVERIES FROM EMPLOYEES HBF', voucherNo: 63, amount: '204500.00' },
];

@Component({
  selector: 'app-create-cas',
  templateUrl: './create-cas.component.html',
  styleUrl: './create-cas.component.css'
})


export class CreateCasComponent  {

  displayedColumns: string[] = ['Date', 'accCode', 'voucherNo', 'amount'];
  dataSource = ELEMENT_DATA;

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

  fromDate!: string;
  toDate!: string;
  onDateChange(event: any) {
    console.log('Selected date:', event.target.value);
  }
  
}
