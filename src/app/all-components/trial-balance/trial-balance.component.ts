import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrl: './trial-balance.component.css'
})
export class TrialBalanceComponent implements OnInit {

  annualYears: string[] = this.generateAnnualYears(2000, 2050);
  selectedYear: string = 'Select Annual Year'
public DropSelectYear1:number=0
public DropSelectedYear2:number=0

 
  data: any[] = [];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  selectedMonth: string = '';
  startYear:any
  endYear:any
  minDate: any;
  maxDate: any;

  constructor() {
  }

  ngOnInit(): void {
   
    const range = (start: number, stop: number, step: number) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      );
    this.startYear = range(this.DropSelectYear1,this.DropSelectYear1, -1)
    this.endYear = range(this.DropSelectedYear2,this.DropSelectedYear2, -1)
  }
  ngModelChange() {
    console.log(this.selectedYear);
    console.log(this.selectedYear);
  }
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
    console.log('Selected date:', event.target.value);
  }
  checkDates()
  {
    
console.log(this.selectedYear)
    this.DropSelectYear1=+this.selectedYear.split('-')[0]
    this.DropSelectedYear2=+this.selectedYear.split('-')[1]
    console.log(this.DropSelectYear1,this.DropSelectedYear2)

 
    const today = new Date();
    this.minDate=new Date(this.DropSelectedYear2)
    this.maxDate=new Date(this.DropSelectYear1)
    
  }

}
