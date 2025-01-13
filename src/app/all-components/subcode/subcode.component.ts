import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-subcode',
  templateUrl: './subcode.component.html',
  styleUrl: './subcode.component.css'
})
export class SubcodeComponent implements OnInit {
  codeFormGroup!: FormGroup;
  subgroups: string[] = [];
  data: any;
  arrayScheduleDropDown: any;
  arrayBudgetDropDown: any;
  arrayMainGroupDropDown: any;
  scheduleNumberID: any;
  getAllgroup: any;
  schNo: boolean = false;
  allGroupDropDown: any[] = [];
  getAllgroupTotal: any;
  getAllbudgetType: any;
  getAllData: any[] = [];
  allGroupDropDownSave: any[] = [];
  allGroupDrop_DownSave: any[] = [];
  getBudget: any;
  budgetName: any;
  subCodeName: any;
  subCodeNo: any;
  allUserData: any;
  codeUser: any;
  selectedDivisions: any[] = [];
  isAllSelected = false;


  codeTableColumns: string[] = [
    'id',
    'subcodeNo',
    'subcodeDescription',
    'division',
    'ACTION'
  ];
  allSubCodeDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  divisionDropDown: any;
  divisionDropDownValue: any;
  subCodeData: any;

  ngAfterViewInit() {
    this.allSubCodeDataSource.paginator = this.paginator;
  }

  constructor(
    private apiCall: ApiservicesService,
    private router: Router,
    private deleteDialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.getCodeList();

    this.codeFormGroup = this.fb.group({
      subCode: ['', Validators.required],
      subCodeDescription: ['', Validators.required],
      division: ['', Validators.required],
      // v_SCHEDULE_NAME: ['', Validators.required],
      // v_BUDGET_GROUP: ['', Validators.required],
      // userData: ['', Validators.required],
    });

    // this.getCreateCode()
    // this.getScheduleAll()

    this.getAllScheduleNameDropDown();
    this.getAllBudgetGroupsDropdown();
    // this.getAllBudgetNameDropDown()
    this.getAllBudgetGroups();
    this.getAllUser();
  }

  filterSearch(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.allSubCodeDataSource.filter = value.trim().toLowerCase();
  }

  getAllUser() {
    let api = 'api/user/getAllUser';
    this.apiCall.apiGetCall(api).subscribe((response: any) => {
      console.log(response);
      this.allUserData = response.responseObject;
    });
  }

  getCodeList() {
    let api = 'api/subCode/getAll';
    this.apiCall.apiGetCall(api).subscribe((response: any) => {
      console.log(response);
      this.allSubCodeDataSource.data = response.responseObject;
      this.subCodeData = response.responseObject;
      console.log(this.allSubCodeDataSource.data, "subcode data")
    });
  }

  postCreateCode() {

    if (this.codeFormGroup.invalid) {
      this.codeFormGroup.markAllAsTouched();
      return;
    }
    this.subCodeName = this.codeFormGroup.get('subCodeDescription').value;
    this.subCodeNo = this.codeFormGroup.get('subCode').value;
    this.divisionDropDownValue = this.codeFormGroup.get('division').value;
    console.log(this.subCodeName, this.subCodeNo)
    let group: any;
    let groupTotal: any;
    let budgetType: any;
    // if (this.codeFormGroup.invalid) {
    //   this.codeFormGroup.markAllAsTouched();
    //   return;
    // }
    // let schedule = this.codeFormGroup.controls['v_SCHEDULE_NAME'].value;
    // let getData = this.arrayScheduleDropDown.filter(
    //   (x) => x.scheduleName == schedule
    // );
    // let getShedule: any;
    // if (getData.length > 0) {
    //   getShedule = getData[0].id;
    // } else if (getData.length == 0) {
    //   getShedule = 0;
    // }
    // this.budgetName = this.codeFormGroup.controls['v_BUDGET_GROUP'].value;
    // console.log(this.budgetName, 'this.budgetName');
    // this.apiCall.apiGetCall('api/budget/getAll').subscribe((responce: any) => {
    // this.getAllData = responce.responseObject;
    // let getBudgetData = this.getAllData.filter(
    //   (x) =>
    //     x.group === this.budgetName || x.subGroup.includes(this.budgetName)
    // );
    // console.log(getBudgetData, 'getBudgetData');
    // let getBudget: any
    // if (getBudgetData.length > 0) {
    //   this.getBudget = getBudgetData[0].id;
    //   console.log(this.getBudget, 'getBudget');
    // } else if (getBudgetData.length == 0) {
    //   this.getBudget = 0;
    // }
    // console.log(this.getBudget.id);
    let data = {
      subCode: this.subCodeNo,
      subCodeDescription: this.subCodeName,
      // division: this.divisionDropDownValue
      division: this.selectedDivisions
      // budgetHead: this.budgetName,
      // scheduleId: getShedule,
      // budgetId: this.getBudget,
      // codeUser: this.codeUser,
    };
    console.log(data, 'dataaaaaaaaaaaaaa');
    this.apiCall.apiPostCall('api/subCode/create', data).subscribe(
      (result) => {
        console.log(result);
        this.snackbar.open(result.responseMessage, 'close', {
          duration: 3000,
        });
        this.getCodeList();
      },
      (error) => {
        console.log(error);
      }
    );
    // });

    // let groupData = this.getAllbudgetType.filter(
    //   (x) => x.group == this.codeFormGroup.controls['v_BUDGET_GROUP'].value
    // );
    // if (groupData && groupData.length > 0) {
    //   groupTotal = groupData[0].groupTotal ? groupData[0].groupTotal : '';
    //   budgetType = groupData[0].budgetType ? groupData[0].budgetType : '';
    // }

    this.codeFormGroup.reset();
  }



  openDelete(id) {
    const dilog = this.deleteDialog.open(DeletePopupComponent, {
      width: '250px',
      height: '180px',
    });
    dilog.afterClosed().subscribe((data) => {
      if (data) {
        this.apiCall.apiDeleteCall('api/subCode/deleteById/', id).subscribe(
          (data) => {
            console.log('Data deleted successfully', id);
            this.getCodeList();
          });
      }
    });
  }

  editCode(mode: string, id: any) {
    this.router.navigate(['/famodule/home/subcode-list-view', mode, id]);
  }
  viewCode(mode: string, id: any) {
    this.router.navigate(['/famodule/home/subcode-list-view', mode, id]);
  }

  //schedule get all
  getAllScheduleNameDropDown() {
    let api = 'api/schedule/getAll';
    this.apiCall.apiGetCall(api).subscribe((response: any) => {
      console.log('Get All Schedule Name ====', response);
      this.arrayScheduleDropDown = response.responseObject;
      console.log('dat data', this.arrayScheduleDropDown);
    });
    this.divisionDropDownFun();
  }

  setScheduleNumber() {
    const schNum = this.codeFormGroup.controls['v_SCHEDULE_NAME'].value;
    const selectedCode = this.arrayScheduleDropDown.find(
      (item) => item.scheduleName === schNum
    );
    if (selectedCode) {
      this.codeFormGroup.patchValue({
        scheduleNo: selectedCode.scheduleNo,
      });
    }
  }

  setBudgetName() {
    const schNum = this.codeFormGroup.controls['v_BUDGET_NAME'].value;
    const selectedCode = this.arrayScheduleDropDown.find(
      (item) => item.scheduleName === schNum
    );
    if (selectedCode) {
      this.codeFormGroup.patchValue({
        scheduleNo: selectedCode.scheduleNo,
      });
    }
  }

  getAllBudgetGroupsDropdown() {
    let api = 'api/budget/getAllBudgetGroups';
    this.apiCall.apiGetCall(api).subscribe((response: any) => {
      console.log('Get All Budget Name ====', response);
      if (response.data && response.data.length > 0) {
        let budgetGroupList = response.data.map(function (e) {
          return { value: e };
        });
        console.log('budgetGroupList', budgetGroupList);

        if (budgetGroupList && budgetGroupList.length > 0) {
          this.arrayMainGroupDropDown = budgetGroupList;
        }
      }
    });
  }

  getAllBudgetGroups() {
    this.apiCall.apiGetCall('api/budget/getAll').subscribe(
      (responce: any) => {
        let groupSubGroup;
        this.getAllgroup = responce.responseObject;
        console.log(this.getAllgroup, 'this.getAllgroupthis.getAllgroup');
        this.allGroupDrop_DownSave = responce.responseObject;
        console.log(this.allGroupDrop_DownSave, ' this.allGroupDrop_DownSave');

        // this.getAllgroupTotal = responce
        this.getAllbudgetType = responce.responseObject;

        this.getAllgroup.forEach((element) => {
          groupSubGroup = element.group;
          if (element.subGroup.length > 0) {
            element.subGroup.forEach((element) => {
              this.allGroupDrop_DownSave.push(element);
              this.allGroupDropDown.push(element + '- (' + groupSubGroup + ')');
            });
          } else {
            this.allGroupDropDown.push(element.group);
            this.allGroupDrop_DownSave.push(element.group);
          }

          this.allGroupDropDownSave = this.allGroupDrop_DownSave.filter(
            (element) => typeof element === 'string'
          );
          // console.log(this.allGroupDropDownSave, 'dropdown');
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
    // })
  }

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


  onDivisionSelectionChange(event: any) {
    const value = event.value;

    if (value.includes('All')) {
      // If "All" is selected, select or deselect all items
      if (this.isAllSelected) {
        this.selectedDivisions = [];
        this.isAllSelected = false;
      } else {
        this.selectedDivisions = [...this.divisionDropDown];
        this.isAllSelected = true;
      }
    } else {
      // Check if all items are selected manually
      this.isAllSelected = this.selectedDivisions.length === this.divisionDropDown.length;
    }
  }






  generatePdfForSubCode() {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['S.No', 'SubCode No', 'SubCode Description', 'Divisions']],
      body: this.subCodeData.map((item, index) => [
        index + 1,
        item.subCode,
        item.subCodeDescription,
        item.division
      ]),
    });

    doc.save('subcode-table.pdf');
  }

  generateExcelForSubCode() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.subCodeData.map((item, index) => ({
        'S.No': index + 1,
        'SubCode No': item.subCode,
        'SubCode Description': item.subCodeDescription,
        'Divisions': item.division
      })),
      { header: ['S.No', 'SubCode No', 'SubCode Description', 'Divisions'] }
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SubCodeTable');
    XLSX.writeFile(wb, 'subcode-table.xlsx');
  }



}

