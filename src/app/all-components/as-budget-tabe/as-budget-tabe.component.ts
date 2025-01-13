import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'html2canvas/dist/types/css/property-descriptors/duration';

@Component({
  selector: 'app-as-budget-tabe',
  templateUrl: './as-budget-tabe.component.html',
  styleUrl: './as-budget-tabe.component.css'
})

export class ASBudgetTabeComponent implements OnInit {
  financialYears: number[] = [];
  choosenTab: any;
  asBeRbe: string = 'AS-BE';
  loginDivision: string;
  loginRole: string;
  asBeListResponce: any;
  asRbeListResponce: any;
  asListResponceLen: any;
  asBeRbeYear: any;

  constructor(
    private router: Router,
    private apiCall: ApiservicesService,
    private route: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
  ) {
    this.loginDivision = sessionStorage.getItem('division');
    this.loginRole = sessionStorage.getItem('role')
  }


  ngOnInit() {
    this.generateFinancialYears(2024, 2050);
    this.getAllListApiAsBE();
    this.getyearApiForBE();
  }

  generateFinancialYears(startYear: number, endYear: number): void {
    for (let year = startYear; year <= endYear; year++) {
      this.financialYears.push(year);
    }
  }

  onTabChange(event: any) {
    this.choosenTab = event.index;
    if (this.choosenTab == 0) {
      this.asBeRbe = 'AS-BE'
      this.getAllListApiAsBE();
      this.getyearApiForBE();
      console.log(this.asBeRbe, 'AS-BE');
    }
    else {
      this.asBeRbe = 'AS-RBE'
      console.log(this.asBeRbe, 'AS-RBE');
      this.getAllListApiAsRBE();
      this.getyearApiForRBE();
    }
  }

  newBudgetButtonClick(value: string) {
    if (value == 'AS-BE') {
      if (this.asBeListResponce.length > 0) {
        if (this.loginRole == 'EE_Division') {
          if (this.asBeRbeYear == this.asBeListResponce[0].beLastYear) {
            console.log(this.asBeRbeYear, 'this.asBeRbeYear --- if AS-BE');
            this.snackbar.open(`${this.asBeRbeYear} is Already Created For AS-BE`, 'Close', { duration: 3000 });
          }
          else {
            console.log(this.asBeRbeYear, 'this.asBeRbeYear --- else AS-BE');
            this.router.navigate([`/famodule/home/as-budget/${value}`]);
          }
        }
        else if (this.loginRole == 'AO') {
          if (this.asBeRbeYear == this.asBeListResponce[0].beLastYear && (this.asBeListResponce[0].aoStatus == 'Approved' || this.asBeListResponce[0].aoStatus == 'Active' || this.asBeListResponce[0].aoStatus == 'Draft')) {
            console.log(this.asBeRbeYear, 'this.asBeRbeYear --- if AS-BE');
            this.snackbar.open(`${this.asBeRbeYear} is Already Created For AS-BE`, 'Close', { duration: 3000 });
          }
          else {
            console.log(this.asBeRbeYear, 'this.asBeRbeYear --- else AS-BE');
            this.router.navigate([`/famodule/home/as-budget/${value}`]);
          }
        }
      }
      else {
        this.router.navigate([`/famodule/home/as-budget/${value}`]);
      }
    }
    else {
      if (this.asRbeListResponce.length > 0) {
        //  && (this.asRbeListResponce[0].eeStatusRbe == 'Approved' || this.asRbeListResponce[0].eeStatusRbe == 'Active' || this.asRbeListResponce[0].eeStatusRbe == 'Draft')
        if (this.loginRole == 'EE_Division') {
          if (this.asBeRbeYear == this.asRbeListResponce[0].rbeYear) {
            console.log(this.asBeRbeYear, 'this.asBeRbeYear --- if AS-BE');
            this.snackbar.open(`${this.asBeRbeYear} is Already Created For AS-BE`, 'Close', { duration: 3000 });
          }
          else {
            console.log(this.asBeRbeYear, 'this.asBeRbeYear --- else AS-BE');
            this.router.navigate([`/famodule/home/as-budget/${value}`]);
          }
        }
        else if (this.loginRole == 'AO') {
          if ((this.asBeRbeYear == this.asRbeListResponce[0].rbeYear) && (this.asRbeListResponce[0].aoStatusRbe == 'Approved' || this.asRbeListResponce[0].aoStatusRbe == 'Active' || this.asRbeListResponce[0].aoStatusRbe == 'Draft')) {
            console.log(this.asBeRbeYear, 'this.asBeRbeYear --- if AS-BE');
            this.snackbar.open(`${this.asBeRbeYear} is Already Created For AS-BE`, 'Close', { duration: 3000 });
          }
          else {
            console.log(this.asBeRbeYear, 'this.asBeRbeYear --- else AS-BE');
            this.router.navigate([`/famodule/home/as-budget/${value}`]);
          }
        }
      }
      else {
        this.router.navigate([`/famodule/home/as-budget/${value}`]);
      }
    }

  }

  getAllListApiAsBE() {
    var params: { [key: string]: string } = {};

    if (this.loginDivision !== 'Head_office') {
      params['division'] = this.loginDivision
    }
    params['role'] = this.loginRole


    this.apiCall.apiPostCall_beRbe(`api/asbe/getListView`, params).subscribe(
      (listResponse) => {
        this.asBeListResponce = listResponse.responseObject;
        console.log(this.asBeListResponce, 'this.asBeListResponce');
        this.asListResponceLen = listResponse.responseObject.length;

        this.asBeListResponce = this.asBeListResponce.reduce((acc, item) => {
          const existingItem = acc.find(i => i.beLastYear === item.beLastYear);
          console.log(existingItem, 'existingItem');

          if (existingItem) {
            // Add totals for the same year
            existingItem.count += item.count
            existingItem.asBeFixedTotal += item.asBeFixedTotal;
            existingItem.asBeProposedTotal += item.asBeProposedTotal;
          } else {
            // Add new year entry
            acc.push({ ...item });
          }
          return acc;
        }, []);

        this.sortDataDescendingBE(this.asBeListResponce);


        this.asBeListResponce?.forEach(element => {
          if (this.loginRole == 'EE_Division') {
            element.commonStatus = element.eeStatus
          }
          else if (this.loginRole == 'AO') {
            element.commonStatus = element.aoStatus
          }
          else if (this.loginRole == 'DCAO') {
            element.commonStatus = element.dcaoStatus
          }
          else if (this.loginRole == 'FA') {
            element.commonStatus = element.faStatus
          }
          else if (this.loginRole == 'MD') {
            element.commonStatus = element.faStatus
          }
        });
        console.log(this.asBeListResponce, 'this.asBeListResponce');
      }
    );
  }

  getAllListApiAsRBE() {
    var params: { [key: string]: string } = {};

    if (this.loginDivision !== 'Head_office') {
      params['division'] = this.loginDivision
    }
    params['role'] = this.loginRole


    this.apiCall.apiPostCall_beRbe(`api/asrbe/getListView`, params).subscribe(
      (listResponse) => {
        this.asRbeListResponce = listResponse.responseObject;
        this.asListResponceLen = listResponse.responseObject.length;

        this.asRbeListResponce = this.asRbeListResponce.reduce((acc, item) => {
          const existingItem = acc.find(i => i.rbeYear === item.rbeYear);
          if (existingItem) {
            // Add totals for the same year
            existingItem.count += item.count
            existingItem.asRbeFixedTotal += item.asRbeFixedTotal;
            existingItem.asRbeProposedTotal += item.asRbeProposedTotal;
          } else {
            // Add new year entry
            acc.push({ ...item });
          }
          return acc;
        }, []);

        this.sortDataDescendingRBE(this.asRbeListResponce);

        this.asRbeListResponce.forEach(element => {
          if (this.loginRole == 'EE_Division') {
            element.commonStatus = element.eeStatusRbe
          }
          else if (this.loginRole == 'AO') {
            element.commonStatus = element.aoStatusRbe
          }
          else if (this.loginRole == 'DCAO') {
            element.commonStatus = element.dcaoStatusRbe
          }
          else if (this.loginRole == 'FA') {
            element.commonStatus = element.faStatusRbe
          }
          else if (this.loginRole == 'MD') {
            element.commonStatus = element.faStatusRbe
          }
        });
        console.log(this.asRbeListResponce, 'asRbeListResponce');

      }
    );
  }

  getyearApiForBE() {
    var paramValue: { [key: string]: string } = {};

    paramValue['division'] = this.loginDivision;
    this.apiCall.apiPostCall_Query(`api/be/yearWiseasbe`, paramValue).subscribe(
      (yearRes) => {
        console.log(yearRes.responseObject);
        this.asBeRbeYear = yearRes.responseObject;
        console.log(this.asBeRbeYear, 'this.asBeRbeYear');
      }
    );
  }

  getyearApiForRBE() {
    var paramValue: { [key: string]: string } = {};
    paramValue['division'] = this.loginDivision;
    this.apiCall.apiPostCall_Query(`api/rbe/yearWiseasrbe`, paramValue).subscribe(
      (yearRes) => {
        console.log(yearRes.responseObject);
        this.asBeRbeYear = yearRes.responseObject;
        console.log(this.asBeRbeYear, 'this.asBeRbeYear');
      }
    );
  }


  sortDataDescendingBE(allBeRbeData: any) {
    allBeRbeData.sort((a, b) => {
      return b.beLastYear.localeCompare(a.beLastYear);
    });
  }

  sortDataDescendingRBE(allBeRbeData: any) {
    allBeRbeData.sort((a, b) => {
      return b.rbeYear.localeCompare(a.rbeYear);
    });
  }

  eyeButton(action: any, asBeRbe: any, year: any, dataCount: any) {
    this.route.navigate([`/famodule/home/as-viewEdit/`, this.loginDivision, this.loginRole, action, asBeRbe, year, dataCount]);
  }
  penButton(action: any, asBeRbe: any, year: any, dataCount: any) {
    this.route.navigate([`/famodule/home/as-viewEdit/`, this.loginDivision, this.loginRole, action, asBeRbe, year, dataCount]);
  }

}
