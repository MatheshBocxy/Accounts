import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { ProposedFixedSplitupComponent } from '../proposed-fixed-splitup/proposed-fixed-splitup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css',
})
export class BudgetComponent implements OnInit {
  allBeData: any;
  roleName: any;
  allRbeData: any;
  financialYearForm: FormGroup;
  financialYears: number[] = [];
  fina_Years: any;
  userDivision: string;
  divisionForm: FormGroup;
  divisionsName: string;
  consolidationBE: any;
  consolidationRBE: any;
  Pending: string = 'Pending';
  Active: string = 'Active';
  allDivisionList: any;
  financialYearValue: any;
  financialYearListBE: any;
  financialYearListRBE: any;
  approvalStatus: any;
  divisionDropDown: any;
  allBudgetBeDataSource = new MatTableDataSource<any>();
  allBudgetDataSourceRBE = new MatTableDataSource<any>();
  // budgetBeTableColumns: string[] = [];
  // budgetTableColumnsRBE: string[] = [];
  choosenTab: any = 0;
  console: any;
  countOfDatas: any;
  searchValue: any;
  mergedArrayLength: number;
  roleAmount: any;

  constructor(
    private router: Router,
    private apiCall: ApiservicesService,
    private route: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: MatSnackBar

  ) {
    this.userDivision = sessionStorage.getItem('division');
    console.log(this.userDivision);
    this.roleName = sessionStorage.getItem('role');
    console.log(this.roleName, 'role name');
  }

  ngOnInit(): void {
    this.generateFinancialYears(2022, 2060);
    this.choosenTab = 0;
    this.divisionForm = this.fb.group({
      divisionSelect: ['', Validators.required],
      divisionInput: ['', Validators.required],
      financialYear: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.divisionForm.patchValue({
      divisionInput: this.userDivision,
      divisionSelect: this.userDivision,
    });
    this.getAllBeByDivision();
    this.divisionDropDownFun();

    if (
      this.roleName !== 'RO' &&
      this.roleName !== 'CRO' &&
      this.roleName !== 'EE_T_CELL' &&
      this.roleName !== 'SE' &&
      this.roleName !== 'CE' &&
      this.roleName !== 'AO' &&
      this.roleName !== 'DCAO' &&
      this.roleName !== 'FA' &&
      this.roleName !== 'MD'
    ) {
      this.budgetBeTableColumns.splice(1, 0, 'division'); // Insert 'division' at index 1
      this.budgetTableColumnsRBE.splice(1, 0, 'division'); // Insert 'division' at index 1
    }

    if (this.roleName == 'DA_Division' || this.roleName == 'EE_Division' || this.roleName == 'AO' || this.roleName == 'DCAO' || this.roleName == 'FA') {
      this.roleAmount = 'Yes';
    }
    else {
      this.roleAmount = 'No';
    }

  }

  newBudgetButtonClick() {
    var params: { [key: string]: string } = {};
    params['division'] = this.userDivision;

    if (this.choosenTab == 0) {
      this.apiCall.apiPostCall_Query(`api/be/yearWiseasbe`, params).subscribe(
        (res: any) => {
          let lastYear = this.allBudgetBeDataSource.data[0].beLastYear;
          console.log(lastYear);

          if ((res.responseObject == lastYear) && (this.userDivision != 'Head_office')) {
            this.snackbar.open(`${lastYear} is Already Created for BE`, 'Close', { duration: 3000 });
            this.router.navigate([`/famodule/home/new-budget/${this.choosenTab}`]);
          }
          else {
            this.router.navigate([`/famodule/home/new-budget/${this.choosenTab}`]);
          }

        },
        (error) => {
          console.error(error);
        }
      );
    }
    else {
      this.apiCall.apiPostCall_Query(`api/rbe/yearWiseasrbe`, params).subscribe(
        (res: any) => {
          console.log(res.responseObject);
          let lastYear = this.allBudgetDataSourceRBE.data[0].rbeYear;
          if ((res.responseObject == lastYear) && (this.userDivision != 'Head_office')) {
            this.snackbar.open(`${lastYear} is Already Created for RBE`, 'Close', { duration: 3000 });
            this.router.navigate([`/famodule/home/new-budget/${this.choosenTab}`]);
          }
          else {
            this.router.navigate([`/famodule/home/new-budget/${this.choosenTab}`]);
          }

        },
        (error) => {
          console.error(error);
        }
      );
    }

  }

  budgetBeTableColumns: string[] = [
    'sNo',
    'year',
    'propossedTotal',
    'fixedTotal',
    'approvalStatus',
    'ACTION',
  ];
  budgetTableColumnsRBE: string[] = [
    'S.No',
    'year',
    'proposed',
    'fixed',
    'approvalStatus',
    'ACTION',
  ];

  editNewBudget(
    divisionName: string,
    beRbe: string,
    mode: string,
    id: number,
    status: string,
    countOfDatas: any
  ) {
    console.log(divisionName, beRbe, mode, id, 'edit', status);
    this.route.navigate([
      '/famodule/home/NewBudget-list-view/',
      divisionName,
      beRbe,
      mode,
      id,
      countOfDatas
    ]);
  }

  viewNewBudget(
    divisionName: string,
    beRbe: string,
    mode: string,
    id: number,
    status: string,
    countOfDatas: any
  ) {
    console.log(divisionName, beRbe, mode, id, 'view', status);

    this.route.navigate([
      '/famodule/home/NewBudget-list-view/',
      divisionName,
      beRbe,
      mode,
      id,
      countOfDatas
    ]);
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log('Selected tab index === ' + event.index);
    this.choosenTab = event.index;
    if (this.choosenTab === 1) {
      this.searchValue = ''
      this.getAllRbeByDivision();
    } else {
      this.getAllBeByDivision();
      this.searchValue = ''

    }
  }

  generateFinancialYears(startYear: number, endYear: number): void {
    for (let year = startYear; year <= endYear; year++) {
      this.financialYears.push(year);
    }
  }

  // divisionDropDown = ['Head_office', 'K_K_nagar', 'Anna_nagar'];

  divisionDropDownFun() {
    this.apiCall.apiGetCall('api/user/getAllDivision').subscribe(
      (responce) => {
        this.divisionDropDown = responce.responseObject;
        console.log(this.divisionDropDown);
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  getAllConsolidationTotalsBE() {
    this.apiCall.apiGetCall('finance/getListViewBECon/all').subscribe(
      (Response) => {
        this.consolidationBE = Response.data;
        this.consolidationBE.sort((a, b) => {
          return Number(a.id) - Number(b.id);
        });

        console.log('get all BE table data --- ', this.consolidationBE);

        this.allBudgetBeDataSource.data = this.consolidationBE;
      });
  }

  getAllConsolidationTotalsRBE() {
    this.apiCall.apiGetCall('finance/getListViewRBECon/all').subscribe(
      (Response) => {
        this.consolidationRBE = Response.data;
        this.consolidationRBE.sort((a, b) => {
          return a.id - b.id;
        });
        console.log('get all RBE table data --- ', this.consolidationRBE);
        this.allBudgetDataSourceRBE.data = this.consolidationRBE;
      });
  }

  // ok
  filterDivisionsYearBE() {
    this.financialYearValue = this.divisionForm.controls['financialYear'].value;
    let financialYearValue = this.divisionForm.controls['financialYear'].value
    console.log(financialYearValue, 'this.financialYearValue');
    this.approvalStatus = this.divisionForm.controls['status'].value;
    console.log(this.approvalStatus);
    console.log(this.divisionsName, 'division nME');

    // Initialize params object
    var params: { [key: string]: string } = {};



    if (this.divisionsName == 'Head_office') {
      params['division'] = "";
    }
    else {
      params['division'] = this.divisionsName;
    }

    if (financialYearValue) {
      params['beLastYear'] = financialYearValue;
    }

    if (this.approvalStatus) {
      params['approvalStatus'] = this.approvalStatus;
    }

    //  ----------- role

    if (this.roleName == 'MMS_Division') {
      params['roll'] = 'ARO_Division';
    }
    else if (this.roleName == 'AE_Planning') {
      params['roll'] = 'AEE_Division';
    }
    else if (this.roleName == 'CRO') {
      params['roll'] = 'RO';
    }
    else if (this.roleName == 'SE' ||
      this.roleName == 'CE') {
      params['roll'] = 'EE_T_CELL';
    }
    else {
      params['roll'] = this.roleName;
    }


    console.log(financialYearValue);

    this.apiCall.apiPostCall_beRbe(`api/be/getListViewBE`, params).subscribe((res) => {
      if (res.responseStatus) {
        this.financialYearListBE = res.responseObject;
        this.countOfDatas = res.responseObject.length;
        console.log(this.countOfDatas, 'this.countOfDatas');

        console.log(this.financialYearListBE);

        if (this.roleName != 'ARO_Division' && this.roleName != 'AEE_Division' && this.roleName != 'ACC_Clerk') {
          console.log('roll in');

          let mergedData = {};
          this.financialYearListBE.forEach((item) => {
            let key = item.beLastYear;
            if (!mergedData[key]) {
              mergedData[key] = {
                beLastYear: item.beLastYear,
                division: item.division,
                beLastYearFixedTotal: item.beLastYearFixedCreatorTotal,
                beLastYearProposedTotal: item.beLastYearProposedCreatorTotal,
                kpStatus: item.kpStatus,

                daDivisionStatus: item.daDivisionStatus,
                eeDivisionStatus: item.eeDivisionStatus,

                mmsDivisionStatus: item.mmsDivisionStatus,
                aePlanDivisionStatus: item.aePlanDivisionStatus,
                roStatus: item.roStatus,
                croStatus: item.croStatus,
                eeTCellStatus: item.eeTCellStatus,
                seStatus: item.seStatus,
                ceStatus: item.ceStatus,
                aoStatus: item.aoStatus,
                dcAoStatus: item.dcAoStatus,
                faStatus: item.faStatus,
                mdStatus: item.mdStatus

              };
              console.log(mergedData[key], ' mergedData[key]');

            } else {
              // Aggregate values for subsequent occurrences
              mergedData[key].beLastYearFixedTotal += item.beLastYearFixedCreatorTotal;
              mergedData[key].beLastYearProposedTotal += item.beLastYearProposedCreatorTotal;
            }
          });

          let mergedArray = Object.values(mergedData);
          console.log(mergedArray, 'if---mergedArray');
          console.log(this.allBudgetBeDataSource.data, '------1');

          this.allBudgetBeDataSource.data = mergedArray;
          console.log(this.allBudgetBeDataSource.data, '------2');
        }
        else {
          console.log('roll out');
          this.allBudgetBeDataSource.data = this.allBeData;
          console.log(this.allBudgetBeDataSource.data, '568---else');
        }

        console.log(this.allBudgetBeDataSource.data, 'dataaaaaaa');

        this.allBudgetBeDataSource.data.forEach((element) => {
          console.log(element, 'dvc dfbvdfv dfv ');
          if (this.roleName == 'ARO_Division') {
            this.kpStatus = element.aroDivisionStatus;
          } else if (this.roleName == 'MMS_Division') {
            this.kpStatus = element.mmsDivisionStatus;
            console.log(this.kpStatus, 'mms');
          } else if (this.roleName == 'AEE_Division') {
            this.kpStatus = element.aeeDivisionStatus;
          } else if (this.roleName == 'AE_Planning') {
            this.kpStatus = element.aePlanDivisionStatus;
          } else if (this.roleName == 'ACC_Clerk') {
            this.kpStatus = element.accClerkStatus;
          } else if (this.roleName == 'DA_Division') {
            this.kpStatus = element.daDivisionStatus;
          } else if (this.roleName == 'EE_Division') {
            this.kpStatus = element.eeDivisionStatus;
          } else if (this.roleName == 'FA') {
            this.kpStatus = element.faStatus;
          } else if (this.roleName == 'RO') {
            this.kpStatus = element.roStatus;
            console.log(this.kpStatus, 'kpstatus RO');
          } else if (this.roleName == 'CRO') {
            this.kpStatus = element.croStatus;
            console.log(this.kpStatus, 'kpstatus CRO');
          } else if (this.roleName == 'EE_T_CELL') {
            this.kpStatus = element.eeTCellStatus;
            console.log(this.kpStatus, 'kpstatus EE_T_CELL');
          } else if (this.roleName == 'SE') {
            this.kpStatus = element.seStatus;
            console.log(this.kpStatus, 'kpstatus seStatus');
          } else if (this.roleName == 'CE') {
            this.kpStatus = element.ceStatus;
          } else if (this.roleName == 'AO') {
            this.kpStatus = element.aoStatus;
          } else if (this.roleName == 'DCAO') {
            this.kpStatus = element.dcAoStatus;
          } else if (this.roleName == 'FA') {
            this.kpStatus = element.faStatus;
          } else if (this.roleName == 'MD') {
            this.kpStatus = element.mdStatus;
          }
          element.kpStatus = this.kpStatus;
        });

        this.allBudgetBeDataSource.data.forEach((element) => {
          console.log(element, '617');
          if (this.roleName == 'ARO_Division') {
            this.approvalStatus = element.aroDivisionStatus;
          } else if (this.roleName == 'MMS_Division') {
            this.approvalStatus = element.mmsDivisionStatus;
            console.log(this.approvalStatus, 'approval status');
          } else if (this.roleName == 'AEE_Division') {
            this.approvalStatus = element.aeeDivisionStatus;
          } else if (this.roleName == 'AE_Planning') {
            this.approvalStatus = element.aePlanDivisionStatus;
          } else if (this.roleName == 'ACC_Clerk') {
            this.approvalStatus = element.accClerkStatus;
          } else if (this.roleName == 'DA_Division') {
            this.approvalStatus = element.daDivisionStatus;
            console.log(this.approvalStatus, 'DA');
          } else if (this.roleName == 'EE_Division') {
            this.approvalStatus = element.eeDivisionStatus;
          } else if (this.roleName == 'RO') {
            this.approvalStatus = element.roStatus;
            console.log(this.approvalStatus, 'approvalStatus RO');
          } else if (this.roleName == 'CRO') {
            this.approvalStatus = element.croStatus;
            console.log(this.approvalStatus, 'approvalStatus CRO');
          } else if (this.roleName == 'EE_T_CELL') {
            this.approvalStatus = element.eeTCellStatus;
            console.log(this.approvalStatus, 'approvalStatus CRO');
          } else if (this.roleName == 'SE') {
            this.approvalStatus = element.seStatus;
            console.log(this.approvalStatus, 'approvalStatus seStatus');
          } else if (this.roleName == 'CE') {
            this.approvalStatus = element.ceStatus;
            console.log(this.approvalStatus, 'approvalStatus ceStatus');
          } else if (this.roleName == 'AO') {
            this.approvalStatus = element.aoStatus;
          } else if (this.roleName == 'DCAO') {
            this.approvalStatus = element.dcAoStatus;
          } else if (this.roleName == 'FA') {
            this.approvalStatus = element.faStatus;
          } else if (this.roleName == 'MD') {
            this.approvalStatus = element.mdStatus;
          }
          element.approvalStatus = this.approvalStatus;
        });

        console.log(this.allBudgetBeDataSource.data, 'data');

      } else {
        this.allBudgetBeDataSource.data = [];
      }
    });
  }

  // ok
  filterDivisionsYearRBE() {
    let financialYearValue = this.divisionForm.controls['financialYear'].value;
    var paramss: { [key: string]: string } = {};

    if (this.divisionsName == 'Head_office') {
      paramss['division'] = "";
    }
    else {
      paramss['division'] = this.divisionsName;
    }

    if (this.approvalStatus) {
      paramss['approvalStatus'] = this.approvalStatus;
    }

    if (financialYearValue) {
      paramss['rbeYear'] = financialYearValue;
    }

    //  ----------- role

    if (this.roleName == 'MMS_Division') {
      paramss['roll'] = 'ARO_Division';
    }
    else if (this.roleName == 'AE_Planning') {
      paramss['roll'] = 'AEE_Division';
    }
    else if (this.roleName == 'CRO') {
      paramss['roll'] = 'RO';
    }
    else if (this.roleName == 'SE' ||
      this.roleName == 'CE') {
      paramss['roll'] = 'EE_T_CELL';
    }
    else {
      paramss['roll'] = this.roleName;
    }

    this.apiCall.apiPostCall_beRbe(`api/rbe/getListViewRBE`, paramss).subscribe(
      (res) => {
        console.log(res);

        if (res.responseStatus) {
          this.financialYearListRBE = res.responseObject;
          this.countOfDatas = res.responseObject.length;
          console.log(this.countOfDatas, 'this.countOfDatas');


          console.log(this.financialYearListRBE);
          this.allBudgetDataSourceRBE.data = this.financialYearListRBE;

          if (this.roleName != 'ARO_Division' && this.roleName != 'AEE_Division' && this.roleName != 'ACC_Clerk') {
            console.log('656');
            let mergedData = {};

            this.financialYearListRBE.forEach((item) => {
              console.log(item, 'item');
              let key = item.rbeYear;

              if (!mergedData[key]) {
                mergedData[key] = {
                  rbeYear: item.rbeYear,
                  division: item.division,

                  lastRbeFixedTotal: item.lastRbeFixedCreatorTotal,
                  lastRbeProposedTotal: item.lastRbeProposedCreatorTotal,

                  daDivisionStatusRbe: item.daDivisionStatusRbe,
                  eeDivisionStatusRbe: item.eeDivisionStatusRbe,

                  mmsDivisionStatusRbe: item.mmsDivisionStatusRbe,
                  aePlanDivisionStatusRbe: item.aePlanDivisionStatusRbe,

                  roStatusRbe: item.roStatusRbe,
                  croStatusRbe: item.croStatusRbe,
                  eeTCellStatusRbe: item.eeTCellStatusRbe,
                  seStatusRbe: item.seStatusRbe,
                  ceStatusRbe: item.ceStatusRbe,
                  aoStatusRbe: item.aoStatusRbe,
                  dcAoStatusRbe: item.dcAoStatusRbe,
                  faStatusRbe: item.faStatusRbe,
                  mdStatusRbe: item.mdStatusRbe
                };
              } else {
                // Aggregate values for subsequent occurrences
                mergedData[key].lastRbeFixedTotal +=
                  item.lastRbeFixedCreatorTotal;
                mergedData[key].lastRbeProposedTotal +=
                  item.lastRbeProposedCreatorTotal;
              }
            });

            let mergedArray = Object.values(mergedData);

            console.log(mergedArray[1], 'mergedArray 556');
            this.allBudgetDataSourceRBE.data = mergedArray;
          } else {
            this.allBudgetDataSourceRBE.data = this.allRbeData;
            console.log(this.allBudgetDataSourceRBE.data, '689');
            console.log('690');
          }
          this.allBudgetDataSourceRBE.data.forEach((element) => {
            if (this.roleName == 'ARO_Division') {
              this.kpStatus = element.aroDivisionStatusRbe;
            } else if (this.roleName == 'MMS_Division') {
              this.kpStatus = element.mmsDivisionStatusRbe;
            } else if (this.roleName == 'AEE_Division') {
              this.kpStatus = element.aeeDivisionStatusRbe;
            } else if (this.roleName == 'AE_Planning') {
              this.kpStatus = element.aePlanDivisionStatusRbe;
            } else if (this.roleName == 'ACC_Clerk') {
              this.kpStatus = element.accClerkStatusRbe;
            } else if (this.roleName == 'DA_Division') {
              this.kpStatus = element.daDivisionStatusRbe;
            } else if (this.roleName == 'EE_Division') {
              this.kpStatus = element.eeDivisionStatusRbe;
            } else if (this.roleName == 'RO') {
              this.kpStatus = element.roStatusRbe;
            } else if (this.roleName == 'CRO') {
              this.kpStatus = element.croStatusRbe;
            } else if (this.roleName == 'EE_T_CELL') {
              this.kpStatus = element.eeTCellStatusRbe;
            } else if (this.roleName == 'SE') {
              this.kpStatus = element.seStatusRbe;
            } else if (this.roleName == 'CE') {
              this.kpStatus = element.ceStatusRbe;
            } else if (this.roleName == 'AO') {
              this.kpStatus = element.aoStatusRbe;
            } else if (this.roleName == 'DCAO') {
              this.kpStatus = element.dcAoStatusRbe;
            } else if (this.roleName == 'FA') {
              this.kpStatus = element.faStatusRbe;
            } else if (this.roleName == 'MD') {
              this.kpStatus = element.mdStatusRbe;
            }

            element.kpStatus = this.kpStatus;
          });

          this.allBudgetDataSourceRBE.data.forEach((element) => {
            console.log(element, '617');
            if (this.roleName == 'ARO_Division') {
              this.approvalStatus = element.aroDivisionStatusRbe;
            } else if (this.roleName == 'AEE_Division') {
              this.approvalStatus = element.aeeDivisionStatusRbe;
            } else if (this.roleName == 'ACC_Clerk') {
              this.approvalStatus = element.accClerkStatusRbe;
            } else if (this.roleName == 'DA_Division') {
              this.approvalStatus = element.daDivisionStatusRbe;
              console.log(this.approvalStatus, 'DA');
            } else if (this.roleName == 'EE_Division') {
              this.approvalStatus = element.eeDivisionStatusRbe;
            } else if (this.roleName == 'RO') {
              this.approvalStatus = element.roStatusRbe;
            } else if (this.roleName == 'CRO') {
              this.approvalStatus = element.croStatusRbe;
            } else if (this.roleName == 'EE_T_CELL') {
              this.approvalStatus = element.eeTCellStatusRbe;
            } else if (this.roleName == 'SE') {
              this.approvalStatus = element.seStatusRbe;
            } else if (this.roleName == 'CE') {
              this.approvalStatus = element.ceStatusRbe;
            } else if (this.roleName == 'AO') {
              this.approvalStatus = element.aoStatusRbe;
            } else if (this.roleName == 'DCAO') {
              this.approvalStatus = element.dcAoStatusRbe;
            } else if (this.roleName == 'FA') {
              this.approvalStatus = element.faStatusRbe;
            } else if (this.roleName == 'MD') {
              this.approvalStatus = element.mdStatusRbe;
            }
            element.approvalStatus = this.approvalStatus;
          });
        } else {
          this.allBudgetDataSourceRBE.data = [];
        }
        console.log(this.allBudgetDataSourceRBE.data, 'this.allBudgetDataSourceRBE.data');

      }
    );
  }

  kpStatus: any;

  sortDataDescendingBE(allBeData: any) {
    allBeData.sort((a, b) => {
      return b.beLastYear.localeCompare(a.beLastYear);
    });
    console.log(this.allBeData, 'this.allBeData');
  }

  sortDataDescendingRBE(allBeData: any) {
    allBeData.sort((a, b) => {
      return b.rbeYear.localeCompare(a.rbeYear);
    });
    console.log(this.allBeData, 'this.allBeData');
  }

  getAllBeByDivision() {
    this.divisionsName = this.divisionForm.controls['divisionInput'].value;
    this.financialYearValue = this.divisionForm.controls['financialYear'].value;
    this.approvalStatus = this.divisionForm.controls['status'].value;

    var params: { [key: string]: string } = {};

    if (this.divisionsName == 'Head_office') {
      console.log(params['division'], 'division name');
    } else {
      params['division'] = this.divisionsName;
    }

    if (this.approvalStatus) {
      params['approvalStatus'] = this.approvalStatus;
    }

    if (this.financialYearValue) {
      params['beLastYear'] = this.financialYearValue;
    }

    //  ----------- role

    if (this.roleName == 'MMS_Division') {
      params['roll'] = 'ARO_Division';
    }
    else if (this.roleName == 'AE_Planning') {
      params['roll'] = 'AEE_Division';
    }
    else if (this.roleName == 'CRO') {
      params['roll'] = 'RO';
    }
    else if (this.roleName == 'SE' ||
      this.roleName == 'CE') {
      params['roll'] = 'EE_T_CELL';
    }
    else {
      params['roll'] = this.roleName;
    }

    console.log(params, 'params');

    this.apiCall.apiPostCall_beRbe(`api/be/getListViewBE`, params).subscribe(
      (Response: any) => {
        if (Response.responseStatus) {
          console.log(Response, '277');
          this.allBeData = Response.responseObject;
          this.countOfDatas = Response.responseObject.length;
          console.log(this.countOfDatas, 'this.countOfDatas');

          console.log('get all BE table data *** --- ', this.allBeData);

          if (this.roleName != 'ARO_Division' && this.roleName != 'AEE_Division' && this.roleName != 'ACC_Clerk') {
            console.log('roll out');
            let mergedData = {};
            this.allBeData.forEach((item, i) => {

              let key = item.beLastYear;

              if (!mergedData[key]) {
                console.log(i);
                console.log(item.count, 'item.count');

                mergedData[key] = {
                  beLastYear: item.beLastYear,
                  division: item.division,
                  beLastYearFixedTotal: item.beLastYearFixedCreatorTotal,
                  beLastYearProposedTotal: item.beLastYearProposedCreatorTotal,
                  kpStatus: item.kpStatus,

                  daDivisionStatus: item.daDivisionStatus,
                  eeDivisionStatus: item.eeDivisionStatus,
                  mmsDivisionStatus: item.mmsDivisionStatus,
                  aePlanDivisionStatus: item.aePlanDivisionStatus,
                  roStatus: item.roStatus,
                  croStatus: item.croStatus,
                  eeTCellStatus: item.eeTCellStatus,
                  seStatus: item.seStatus,
                  ceStatus: item.ceStatus,
                  aoStatus: item.aoStatus,
                  dcAoStatus: item.dcAoStatus,
                  faStatus: item.faStatus,
                  mdStatus: item.mdStatus,
                  count: item.count,
                };
                console.log(i);

              } else {
                // Aggregate values for subsequent occurrences
                mergedData[key].beLastYearFixedTotal += item.beLastYearFixedCreatorTotal;
                mergedData[key].beLastYearProposedTotal += item.beLastYearProposedCreatorTotal;

                let count = 0; // Initialize count to 0
                mergedData[key].count += item.count;
                console.log(count, 'count');
              }
            });

            let mergedArray = Object.values(mergedData);
            console.log(mergedArray, 'if---mergedArray');
            console.log(mergedArray.length, 'mergedArray.length');
            this.mergedArrayLength = mergedArray.length;

            console.log(this.allBudgetBeDataSource.data, '------1');
            this.sortDataDescendingBE(mergedArray);

            this.allBudgetBeDataSource.data = mergedArray;
            console.log(this.allBudgetBeDataSource.data, '------2');

          }
          else {
            console.log('roll in');
            this.sortDataDescendingBE(this.allBeData);
            this.allBudgetBeDataSource.data = this.allBeData;
            console.log(this.allBudgetBeDataSource.data, '568---else');
          }

          console.log(this.allBudgetBeDataSource.data, 'dataaaaaaa');

          this.allBudgetBeDataSource.data.forEach((element) => {
            console.log(element, 'dvc dfbvdfv dfv ');
            if (this.roleName == 'ARO_Division') {
              this.kpStatus = element.aroDivisionStatus;
            } else if (this.roleName == 'MMS_Division') {
              this.kpStatus = element.mmsDivisionStatus;
              console.log(this.kpStatus, 'mms');
            } else if (this.roleName == 'AEE_Division') {
              this.kpStatus = element.aeeDivisionStatus;
            } else if (this.roleName == 'AE_Planning') {
              this.kpStatus = element.aePlanDivisionStatus;
            } else if (this.roleName == 'ACC_Clerk') {
              this.kpStatus = element.accClerkStatus;
            } else if (this.roleName == 'DA_Division') {
              this.kpStatus = element.daDivisionStatus;
            } else if (this.roleName == 'EE_Division') {
              this.kpStatus = element.eeDivisionStatus;
            } else if (this.roleName == 'RO') {
              this.kpStatus = element.roStatus;
              console.log(this.kpStatus, 'kpstatus RO');
            } else if (this.roleName == 'CRO') {
              this.kpStatus = element.croStatus;
              console.log(this.kpStatus, 'kpstatus CRO');
            } else if (this.roleName == 'EE_T_CELL') {
              this.kpStatus = element.eeTCellStatus;
              console.log(this.kpStatus, 'kpstatus EE_T_CELL');
            } else if (this.roleName == 'SE') {
              this.kpStatus = element.seStatus;
              console.log(this.kpStatus, 'kpstatus seStatus');
            } else if (this.roleName == 'CE') {
              this.kpStatus = element.ceStatus;
            } else if (this.roleName == 'AO') {
              this.kpStatus = element.aoStatus;
            } else if (this.roleName == 'DCAO') {
              this.kpStatus = element.dcAoStatus;
            } else if (this.roleName == 'FA') {
              this.kpStatus = element.faStatus;
            } else if (this.roleName == 'MD') {
              this.kpStatus = element.mdStatus;
            }
            element.kpStatus = this.kpStatus;
          });

          this.allBudgetBeDataSource.data.forEach((element) => {
            console.log(element, '617');
            if (this.roleName == 'ARO_Division') {
              this.approvalStatus = element.aroDivisionStatus;
            } else if (this.roleName == 'MMS_Division') {
              this.approvalStatus = element.mmsDivisionStatus;
              console.log(this.approvalStatus, 'approval status');
            } else if (this.roleName == 'AEE_Division') {
              this.approvalStatus = element.aeeDivisionStatus;
            } else if (this.roleName == 'AE_Planning') {
              this.approvalStatus = element.aePlanDivisionStatus;
            } else if (this.roleName == 'ACC_Clerk') {
              this.approvalStatus = element.accClerkStatus;
            } else if (this.roleName == 'DA_Division') {
              this.approvalStatus = element.daDivisionStatus;
              console.log(this.approvalStatus, 'DA');
            } else if (this.roleName == 'EE_Division') {
              this.approvalStatus = element.eeDivisionStatus;
            } else if (this.roleName == 'RO') {
              this.approvalStatus = element.roStatus;
              console.log(this.approvalStatus, 'approvalStatus RO');
            } else if (this.roleName == 'CRO') {
              this.approvalStatus = element.croStatus;
              console.log(this.approvalStatus, 'approvalStatus CRO');
            } else if (this.roleName == 'EE_T_CELL') {
              this.approvalStatus = element.eeTCellStatus;
              console.log(this.approvalStatus, 'approvalStatus CRO');
            } else if (this.roleName == 'SE') {
              this.approvalStatus = element.seStatus;
              console.log(this.approvalStatus, 'approvalStatus seStatus');
            } else if (this.roleName == 'CE') {
              this.approvalStatus = element.ceStatus;
              console.log(this.approvalStatus, 'approvalStatus ceStatus');
            } else if (this.roleName == 'AO') {
              this.approvalStatus = element.aoStatus;
            } else if (this.roleName == 'DCAO') {
              this.approvalStatus = element.dcAoStatus;
            } else if (this.roleName == 'FA') {
              this.approvalStatus = element.faStatus;
            } else if (this.roleName == 'MD') {
              this.approvalStatus = element.mdStatus;
            }
            element.approvalStatus = this.approvalStatus;
          });

          console.log(this.allBudgetBeDataSource.data, 'data');
        } else {
          this.allBudgetBeDataSource.data = [];
        }
        console.log(this.allBudgetBeDataSource.data, 'this.allBudgetBeDataSource.data');
      }
    );
  }

  getAllRbeByDivision() {
    this.divisionsName = this.divisionForm.controls['divisionInput'].value;
    this.financialYearValue = this.divisionForm.controls['financialYear'].value;
    this.approvalStatus = this.divisionForm.controls['status'].value;

    var paramss: { [key: string]: string } = {};

    if (this.divisionsName == 'Head_office') {
      console.log(paramss['division'], 'division name');
    } else {
      paramss['division'] = this.divisionsName;
    }

    if (this.approvalStatus) {
      paramss['approvalStatus'] = this.approvalStatus;
    }

    if (this.financialYearValue) {
      paramss['rbeYear'] = this.financialYearValue;
    }

    //  ----------- role

    if (this.roleName == 'MMS_Division') {
      paramss['roll'] = 'ARO_Division';
    }
    else if (this.roleName == 'AE_Planning') {
      paramss['roll'] = 'AEE_Division';
    }
    else if (this.roleName == 'CRO') {
      paramss['roll'] = 'RO';
    }
    else if (this.roleName == 'SE' ||
      this.roleName == 'CE') {
      paramss['roll'] = 'EE_T_CELL';
    }
    else {
      paramss['roll'] = this.roleName;
    }

    this.apiCall.apiPostCall_beRbe(`api/rbe/getListViewRBE`, paramss).subscribe(
      (Response) => {
        if (Response.responseStatus) {
          this.allRbeData = Response.responseObject;
          this.countOfDatas = Response.responseObject.length;
          console.log(this.countOfDatas, 'this.countOfDatas');

          console.log(this.allRbeData, 'RBE Data');

          if (this.roleName != 'ARO_Division' && this.roleName != 'AEE_Division' && this.roleName != 'ACC_Clerk') {
            console.log('656');
            console.log('roll out');
            let mergedData = {};

            this.allRbeData.forEach((item, i) => {
              console.log(item, 'item');
              let key = item.rbeYear;

              if (!mergedData[key]) {
                // Initialize mergedData with the first occurrence
                mergedData[key] = {
                  rbeYear: item.rbeYear,
                  division: item.division,
                  kpStatus: item.kpStatus,

                  lastRbeFixedTotal: item.lastRbeFixedCreatorTotal,
                  lastRbeProposedTotal: item.lastRbeProposedCreatorTotal,

                  daDivisionStatusRbe: item.daDivisionStatusRbe,
                  eeDivisionStatusRbe: item.eeDivisionStatusRbe,

                  mmsDivisionStatusRbe: item.mmsDivisionStatusRbe,
                  aePlanDivisionStatusRbe: item.aePlanDivisionStatusRbe,

                  roStatusRbe: item.roStatusRbe,
                  croStatusRbe: item.croStatusRbe,
                  eeTCellStatusRbe: item.eeTCellStatusRbe,
                  seStatusRbe: item.seStatusRbe,
                  ceStatusRbe: item.ceStatusRbe,
                  aoStatusRbe: item.aoStatusRbe,
                  dcAoStatusRbe: item.dcAoStatusRbe,
                  faStatusRbe: item.faStatusRbe,
                  mdStatusRbe: item.mdStatusRbe,
                  count: item.count,
                };
              } else {
                // Aggregate values for subsequent occurrences
                mergedData[key].lastRbeFixedTotal +=
                  item.lastRbeFixedCreatorTotal;
                mergedData[key].lastRbeProposedTotal +=
                  item.lastRbeProposedCreatorTotal;

                let count = 0; // Initialize count to 0
                mergedData[key].count += parseInt(item.count);
                console.log(count, 'count');
                console.log(mergedData[key].count, 'mergedData[key].count');

              }
            });

            let mergedArray = Object.values(mergedData);
            console.log(mergedArray, 'mergedArray');
            this.mergedArrayLength = mergedArray.length;

            this.sortDataDescendingRBE(mergedArray);

            this.allBudgetDataSourceRBE.data = mergedArray;
            console.log(this.allBudgetDataSourceRBE.data, '691');
          } else {
            console.log('roll in');
            this.sortDataDescendingRBE(this.allRbeData);
            this.allBudgetDataSourceRBE.data = this.allRbeData;
            console.log(this.allBudgetDataSourceRBE.data, '689');
            console.log('690');
          }
          this.allBudgetDataSourceRBE.data.forEach((element) => {
            if (this.roleName == 'ARO_Division') {
              this.kpStatus = element.aroDivisionStatusRbe;
            } else if (this.roleName == 'MMS_Division') {
              this.kpStatus = element.mmsDivisionStatusRbe;
            } else if (this.roleName == 'AEE_Division') {
              this.kpStatus = element.aeeDivisionStatusRbe;
            } else if (this.roleName == 'AE_Planning') {
              this.kpStatus = element.aePlanDivisionStatusRbe;
            } else if (this.roleName == 'ACC_Clerk') {
              this.kpStatus = element.accClerkStatusRbe;
            } else if (this.roleName == 'DA_Division') {
              this.kpStatus = element.daDivisionStatusRbe;
            } else if (this.roleName == 'EE_Division') {
              this.kpStatus = element.eeDivisionStatusRbe;
            } else if (this.roleName == 'RO') {
              this.kpStatus = element.roStatusRbe;
            } else if (this.roleName == 'CRO') {
              this.kpStatus = element.croStatusRbe;
            } else if (this.roleName == 'EE_T_CELL') {
              this.kpStatus = element.eeTCellStatusRbe;
            } else if (this.roleName == 'SE') {
              this.kpStatus = element.seStatusRbe;
            } else if (this.roleName == 'CE') {
              this.kpStatus = element.ceStatusRbe;
            } else if (this.roleName == 'AO') {
              this.kpStatus = element.aoStatusRbe;
            } else if (this.roleName == 'DCAO') {
              this.kpStatus = element.dcAoStatusRbe;
            } else if (this.roleName == 'FA') {
              this.kpStatus = element.faStatusRbe;
            } else if (this.roleName == 'MD') {
              this.kpStatus = element.mdStatusRbe;
            }

            element.kpStatus = this.kpStatus;
          });

          this.allBudgetDataSourceRBE.data.forEach((element) => {
            console.log(element, '617');
            if (this.roleName == 'ARO_Division') {
              this.approvalStatus = element.aroDivisionStatusRbe;
            } else if (this.roleName == 'MMS_Division') {
              this.approvalStatus = element.mmsDivisionStatusRbe;
            } else if (this.roleName == 'AEE_Division') {
              this.approvalStatus = element.aeeDivisionStatusRbe;
            } else if (this.roleName == 'AE_Planning') {
              this.approvalStatus = element.aePlanDivisionStatusRbe;
            } else if (this.roleName == 'ACC_Clerk') {
              this.approvalStatus = element.accClerkStatusRbe;
            } else if (this.roleName == 'DA_Division') {
              this.approvalStatus = element.daDivisionStatusRbe;
            } else if (this.roleName == 'EE_Division') {
              this.approvalStatus = element.eeDivisionStatusRbe;
            } else if (this.roleName == 'RO') {
              this.approvalStatus = element.roStatusRbe;
            } else if (this.roleName == 'CRO') {
              this.approvalStatus = element.croStatusRbe;
            } else if (this.roleName == 'EE_T_CELL') {
              this.approvalStatus = element.eeTCellStatusRbe;
            } else if (this.roleName == 'SE') {
              this.approvalStatus = element.seStatusRbe;
            } else if (this.roleName == 'CE') {
              this.approvalStatus = element.ceStatusRbe;
            } else if (this.roleName == 'AO') {
              this.approvalStatus = element.aoStatusRbe;
            } else if (this.roleName == 'DCAO') {
              this.approvalStatus = element.dcAoStatusRbe;
            } else if (this.roleName == 'FA') {
              this.approvalStatus = element.faStatusRbe;
            } else if (this.roleName == 'MD') {
              this.approvalStatus = element.mdStatusRbe;
            }

            element.approvalStatus = this.approvalStatus;
            console.log(element.approvalStatus, "approve status")
          });
        } else {
          this.allBudgetDataSourceRBE.data = [];
        }
      });
  }

  postTheYear() {
    let empty;
    let payload = this.financialYearForm.controls['years'].value;

    this.apiCall
      .apiPostCall(`finance/yearAuto/${payload}`, empty)
      .subscribe((Response) => {
        console.log('post the year to rest api', Response);
        this.fina_Years = Response.data;
        sessionStorage.setItem('year', payload);
      });
  }

  applyFilter(event: Event) {
    console.log(this.searchValue, 'searchValue');

    const filterValue = (event.target as HTMLInputElement).value;
    if (this.choosenTab == 0) {
      this.allBudgetBeDataSource.filter = filterValue.trim().toLowerCase();
    }
    else {
      this.allBudgetDataSourceRBE.filter = filterValue.trim().toLowerCase();
    }
  }

  proposedFixedSplits(beRbe: any, type: any, yearData: any) {
    let width = ''
    let height = ''
    if (this.userDivision == 'Head_office') {
      width = '1000px'
      height = '300px'
    }
    else {
      width = '1000px'
      height = '300px'
    }
    let openDilog = this.dialog.open(ProposedFixedSplitupComponent, {
      width: width,
      height: height,
      disableClose: true,
      data: {
        beRbe: beRbe,
        type: type,
        response: yearData,
        role: this.roleName,
        division: this.userDivision
      }
    });
  }

}
