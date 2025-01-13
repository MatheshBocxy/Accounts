import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'app-cash-works',
  templateUrl: './cash-works.component.html',
  styleUrl: './cash-works.component.css'
})
export class CashWorksComponent implements OnInit {

  divisionOption: any;
  optionArr: string[] = [];
  user: string;
  divisionDropDown: any;
  selectDropDownValue: any;
  beRbe: string = 'BE';
  budgetType_BE: any
  budgetType_RBE: any
  choosenTab: any = 0;
  tabName: any = 'CASH'
  tabNameRbe: any = 'CASH'
  filteredValue: any;

  financialYears: number[] = [];

  allBudgetDataSource_cash = new MatTableDataSource<any>([]);
  allBudgetDataSource_work = new MatTableDataSource<any>([]);

  budgetTableColumns: string[] = ['S.No', 'year', 'proposed', 'fixed', 'ACTION'];

  id: any;

  allBudgetDataSourceRBE_Cash = new MatTableDataSource<any>([]);
  allBudgetDataSourceRBE_Work = new MatTableDataSource<any>([]);

  budgetTableColumnsRBE: string[] = ['S.No', 'proposed', 'fixed', 'ACTION'];

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  showCashFlow: string = 'cashFlow';

  constructor(
    private apiCall: ApiservicesService,
    private router: Router,

  ) {
    this.user = sessionStorage.getItem('username');
  }

  ngOnInit(): void {
    // this.divisionDropDownFun();
    this.getBEbudgetData_Cash()
    // this.getBEbudgetData_Work()
    this.generateFinancialYears(2022, 2060);

  }

  filterSearch(event: Event) {
    let value = (event.target as HTMLInputElement).value

    if (this.beRbe == 'BE') {
      if (this.choosenTab == 0) {
        console.log('be cash');
        this.allBudgetDataSource_cash.filter = value.trim().toLowerCase();
      }
      else {
        console.log('be work');
        this.allBudgetDataSource_work.filter = value.trim().toLowerCase();
      }
    }
    else if (this.beRbe == 'RBE') {
      if (this.choosenTab == 0) {
        console.log('rbe cash');
        this.allBudgetDataSourceRBE_Cash.filter = value.trim().toLowerCase();
      }
      else {
        console.log('rbe work');
        this.allBudgetDataSourceRBE_Work.filter = value.trim().toLowerCase();
      }
    }
  }

  generateFinancialYears(startYear: number, endYear: number): void {
    for (let year = startYear; year <= endYear; year++) {
      this.financialYears.push(year);
    }
  }

  sortDataDescendingWorkBE(allBeData: any) {
    allBeData.sort((a, b) => {
      return b.beLastYear.localeCompare(a.beLastYear);
    });
  }

  sortDataDescendingCashBE(allBeData: any) {
    allBeData.sort((a, b) => {
      return b.beLastYear.localeCompare(a.beLastYear);
    });
  }

  sortDataDescendingWorkRBE(allBeData: any) {
    allBeData.sort((a, b) => {
      return b.rbeYear.localeCompare(a.rbeYear);
    });
  }

  sortDataDescendingCashRBE(allBeData: any) {
    allBeData.sort((a, b) => {
      return b.rbeYear.localeCompare(a.rbeYear);
    });
  }

  //BE CASH & WORK

  getBEbudgetData_Cash() {
    var paramValue: { [key: string]: string } = {};

    // paramValue['budgetType'] = "Cash Budget";

    this.apiCall.apiPostCall_Query(`api/be/getListViewBEConsolidation`, paramValue).subscribe((res: any) => {
      console.log(res, "response");
      this.allBudgetDataSource_cash = res.responseObject;
      this.sortDataDescendingCashBE(this.allBudgetDataSource_cash);
    })
  }

  getBEbudgetData_Work() {

    var paramValue: { [key: string]: string } = {};

    paramValue['budgetType'] = "Work Budget";

    this.apiCall.apiPostCall_Query(`api/be/getListViewBEConsolidation`, paramValue).subscribe((res: any) => {
      console.log(res, "response")
      this.allBudgetDataSource_work = res.responseObject
      this.sortDataDescendingWorkBE(this.allBudgetDataSource_work);
    })
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log('Selected tab index: ' + event.index);

    this.tabName = event.tab.textLabel === 'CASH FLOW' ? 'CASH' : 'WORK';

    console.log(this.tabName, 'this.tabName');


    this.choosenTab = event.index;

    if (this.choosenTab === 1) {
      // Index of the RBE tab
      this.filteredValue = ''
      this.tabName = 'WORK'
      this.getBEbudgetData_Work();
    } else {
      this.filteredValue = ''
      this.tabName = 'CASH'
      this.getBEbudgetData_Cash();
    }
  }

  //RBE CASH & WORK

  getRBEbudgetData_Cash() {

    var paramValue: { [key: string]: string } = {};

    // paramValue['budgetType'] = "Cash Budget";

    this.apiCall.apiPostCall_Query(`api/rbe/getListViewRBEConsolidation`, paramValue).subscribe((res: any) => {
      console.log(res, "response");
      this.allBudgetDataSourceRBE_Cash = res.responseObject;
      this.sortDataDescendingCashRBE(this.allBudgetDataSourceRBE_Cash);
    })
  }

  getRBEudgetData_Work() {
    var paramValue: { [key: string]: string } = {};

    paramValue['budgetType'] = "Work Budget";

    this.apiCall.apiPostCall_Query(`api/rbe/getListViewRBEConsolidation`, paramValue).subscribe((res: any) => {
      console.log(res, "response")
      this.allBudgetDataSourceRBE_Work = res.responseObject
      this.sortDataDescendingWorkRBE(this.allBudgetDataSourceRBE_Work);
    })
  }

  onTabChange_Rbe(event: MatTabChangeEvent) {
    console.log('Selected tab index: ' + event.index);
    this.choosenTab = event.index;

    if (this.choosenTab === 1) {
      this.filteredValue = ''
      // Index of the RBE tab
      this.tabNameRbe = 'WORK'
      this.getRBEudgetData_Work()
    } else {
      this.filteredValue = ''
      this.tabNameRbe = 'CASH'
      this.getRBEbudgetData_Cash()
    }
  }

  selectDivisionDropDown_BE(event: any, type: any) {
    this.selectDropDownValue = event.target.value;
    this.budgetType_BE = type
    console.log(this.selectDropDownValue);

    if (this.budgetType_BE == 'cash') {
      var paramValue: { [key: string]: string } = {};

      // paramValue['budgetType'] = "Cash Budget";
      paramValue['beLastYear'] = this.selectDropDownValue;


      this.apiCall.apiPostCall_Query(`api/be/getListViewBEConsolidation`, paramValue).subscribe((res: any) => {
        console.log(res, "response")
        this.allBudgetDataSource_cash = res.responseObject
        console.log(this.allBudgetDataSource_cash, "allBudgetDataSource")
      })
    } else if (this.budgetType_BE == 'work') {
      var paramValue: { [key: string]: string } = {};

      paramValue['budgetType'] = "Work Budget";
      paramValue['beLastYear'] = this.selectDropDownValue;


      this.apiCall.apiPostCall_Query(`api/be/getListViewBEConsolidation`, paramValue).subscribe((res: any) => {
        console.log(res, "response")
        this.allBudgetDataSource_work = res.responseObject
        this.sortDataDescendingWorkBE(this.allBudgetDataSource_work);
      })
    }
  }

  selectDivisionDropDown_RBE(event: any, type: any) {
    this.selectDropDownValue = event.target.value;
    this.budgetType_RBE = type
    console.log(this.selectDropDownValue);

    if (this.budgetType_RBE == 'cash') {
      var paramValue: { [key: string]: string } = {};

      // paramValue['budgetType'] = "Cash Budget";
      paramValue['beLastYear'] = this.selectDropDownValue;

      this.apiCall.apiPostCall_Query(`api/rbe/getListViewRBEConsolidation`, paramValue).subscribe((res: any) => {
        console.log(res, "response")
        this.allBudgetDataSourceRBE_Cash = res.responseObject
        this.sortDataDescendingCashRBE(this.allBudgetDataSourceRBE_Cash);
      })
    } else if (this.budgetType_RBE == 'work') {
      var paramValue: { [key: string]: string } = {};

      paramValue['budgetType'] = "Work Budget";
      paramValue['beLastYear'] = this.selectDropDownValue;

      this.apiCall.apiPostCall_Query(`api/rbe/getListViewRBEConsolidation`, paramValue).subscribe((res: any) => {
        console.log(res, "response")
        this.allBudgetDataSourceRBE_Work = res.responseObject
        console.log(this.allBudgetDataSourceRBE_Work, "allBudgetDataSource")
      })
    }
  }

  toConsolidation_BE(type: any, beYear: any, value: any) {
    console.log(type, beYear, "check route params")
    if (type == 'cash') {
      this.router.navigate(['/famodule/home/create-cash-works/' + type + '/' + beYear + '/' + value]);
    } else if (type == 'work') {
      this.router.navigate(['/famodule/home/create-cash-works/' + type + '/' + beYear + '/' + value]);
    }
  }



  selectTab(cashFlow: string) {
    this.showCashFlow = cashFlow
  }

  // divisionDropDownFun() {
  //   this.apiCall.apiGetCall('getAllDivision').subscribe(
  //     (responce) => {
  //       this.divisionDropDown = responce.data.divisions
  //       console.log(this.divisionDropDown);

  //     }, (err) => {
  //       console.error(err.message);

  //     });
  // }

  beRbeButton(value: any) {
    this.beRbe = value;
    this.filteredValue = ''

    console.log("beRbe = ", this.beRbe);

    if (this.beRbe == 'BE') {
      this.getBEbudgetData_Cash()
    } else if (this.beRbe == 'RBE') {
      this.getRBEbudgetData_Cash()
    }
  }


}
