import { Component } from '@angular/core';

@Component({
  selector: 'app-create-ie-account',
  templateUrl: './create-ie-account.component.html',
  styleUrl: './create-ie-account.component.css'
})
export class CreateIeAccountComponent {

  selectedDivision: string = 'select-divisionWise';
  divisions: string[] = ['divisionWise1', 'divisionWise2', 'divisionWise3'];
 
  selectedCodeWise: string = 'select-codeWise';
  codeWise: string[] = ['city1', 'city2', 'city3'];
  
  annualYears: string[] = this.generateAnnualYears(2000, 2050);
  selectedYear: string = 'Select Annual Year'
public DropSelectYear1:number=0
public DropSelectedYear2:number=0
generateAnnualYears(startYear: number, endYear: number): string[] {
  const years: string[] = [];
  for (let year = startYear; year < endYear; year++) {
    const nextYear = year + 1;
    const yearRange = `${year}-${nextYear}`;
    years.push(yearRange);
  }
  return years;
}
}
