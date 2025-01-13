import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../../service/apiservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consolidation-as',
  templateUrl: './consolidation-as.component.html',
  styleUrl: './consolidation-as.component.css'
})
export class ConsolidationAsComponent implements OnInit {
  asBeRbe = 'AS-BE';
  flowValue = 'cash';
  filteredValue: string;
  loginRole: any;
  loginDivision: any;
  asBeRbeYear: any;
  getAllCashBeList: any;
  getAllCashRbeList: any;
  getAllWorkBeList: any;
  getAllWorkRbeList: any;

  constructor(
    private apiCall: ApiservicesService,
    private router: Router,
  ) {
    this.loginRole = sessionStorage.getItem('role');
    this.loginDivision = sessionStorage.getItem('division');
  }

  ngOnInit(): void {
    if (this.asBeRbe == 'AS-BE') {
      this.getListViewDataCashBE();
    }
    else {
      this.getListViewDataCashRBE();
    }
  }

  beRbeButton(value: any) {
    this.asBeRbe = value;
    console.log(this.asBeRbe, 'this.asBeRbe');

    if (this.flowValue == 'cash' && this.asBeRbe == 'AS-BE') {
      this.getListViewDataCashBE();
    }
    else if (this.flowValue == 'work' && this.asBeRbe == 'AS-BE') {
      this.getListViewDataWorkBE();
    }
    else if (this.flowValue == 'cash' && this.asBeRbe == 'AS-RBE') {
      this.getListViewDataCashRBE();
    }
    else if (this.flowValue == 'work' && this.asBeRbe == 'AS-RBE') {
      this.getListViewDataWorkRBE();
    }
  }
  filterSearch(event: any) { }

  onTabChange(event: any) {
    console.log('Selected tab index: ' + event.index);
    if (event.index == 0) {
      this.flowValue = 'cash';
    }
    else {
      this.flowValue = 'work';
    }
    console.log(this.flowValue, 'this.flowValue');

    if (this.flowValue == 'cash' && this.asBeRbe == 'AS-BE') {
      this.getListViewDataCashBE();
    }
    else if (this.flowValue == 'work' && this.asBeRbe == 'AS-BE') {
      this.getListViewDataWorkBE();
    }
    else if (this.flowValue == 'cash' && this.asBeRbe == 'AS-RBE') {
      this.getListViewDataCashRBE();
    }
    else if (this.flowValue == 'work' && this.asBeRbe == 'AS-RBE') {
      this.getListViewDataWorkRBE();
    }

  }
  eyeButton(budgetType: string, beRbe: string, year: string) {
    this.router.navigate(['/famodule/home/consolidationAsTable', budgetType, beRbe, year]);
  }

  getListViewDataCashBE() {
    var params: { [key: string]: string } = {};

    this.apiCall.apiPostCall_beRbe(`api/asbe/getListViewBEConsolidation`, params).subscribe(
      (res) => {
        this.getAllCashBeList = res.responseObject
        console.log(this.getAllCashBeList, 'this.getAllCashBeList');
      }
    );
  }

  getListViewDataCashRBE() {
    var params: { [key: string]: string } = {};

    this.apiCall.apiPostCall_beRbe(`api/asrbe/getListViewRBEConsolidation`, params).subscribe(
      (res) => {
        this.getAllCashRbeList = res.responseObject
        console.log(this.getAllCashRbeList, 'this.getAllCashBeList');
      }
    );
  }

  getListViewDataWorkBE() {
    var params: { [key: string]: string } = {};
    params['budgetType'] = 'Work Budget'
    this.apiCall.apiPostCall_beRbe(`api/asbe/getListViewBEConsolidation`, params).subscribe(
      (res) => {
        this.getAllWorkBeList = res.responseObject
        console.log(this.getAllWorkBeList, 'this.getAllWorkBeList');
      }
    );
  }

  getListViewDataWorkRBE() {
    var params: { [key: string]: string } = {};
    params['budgetType'] = 'Work Budget'
    this.apiCall.apiPostCall_beRbe(`api/asrbe/getListViewRBEConsolidation`, params).subscribe(
      (res) => {
        this.getAllWorkRbeList = res.responseObject
        console.log(this.getAllWorkRbeList, 'this.getAllWorkRbeList');
      }
    );
  }

}
