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
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrl: './code-list.component.css',
})
export class CodeListComponent implements OnInit {
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
  codeName: any;
  codeNo: any;
  allUserData = ['ARO_Division', 'AEE_Division', 'ACC_Clerk', 'RO', 'EE_T_CELL', 'AO'];
  codeUser: any;
  subCodeList: any = ['Yes', 'No']
  isSubCodeData: any;
  CodeData: any;

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
      v_CODE: ['', Validators.required],
      v_CODE_NAME: ['', Validators.required],
      v_SCHEDULE_NAME: ['', Validators.required],
      v_BUDGET_GROUP: ['', Validators.required],
      userData: ['', Validators.required],
      isSubCode: ['', Validators.required],

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
    let value = (event.target as HTMLInputElement).value
    this.allCodeDataSource.filter = value.trim().toLowerCase();
  }

  getAllUser() {
    let api = 'api/user/getAllUser';
    this.apiCall.apiGetCall(api).subscribe((response: any) => {
      console.log(response);
      // this.allUserData = response.responseObject;
    });
  }

  getCodeList() {
    let api = 'api/code/getAll';
    this.apiCall.apiGetCall(api).subscribe((response: any) => {
      console.log(response);
      this.allCodeDataSource.data = response.responseObject;
      this.CodeData = response.responseObject;
    });
  }

  postCreateCode() {

    if (this.codeFormGroup.invalid) {
      this.codeFormGroup.markAllAsTouched();
      return;
    }

    this.codeName = this.codeFormGroup.get('v_CODE_NAME').value;
    this.codeNo = this.codeFormGroup.get('v_CODE').value;
    this.codeUser = this.codeFormGroup.get('userData').value;
    console.log(this.codeUser, 'code user');
    this.isSubCodeData = this.codeFormGroup.get('isSubCode').value
    console.log(this.codeUser, 'code user');
    console.log(this.isSubCodeData, "isSubCodeData")

    let group: any;
    let groupTotal: any;
    let budgetType: any;
    // if (this.codeFormGroup.invalid) {
    //   this.codeFormGroup.markAllAsTouched();
    //   return;
    // }
    let schedule = this.codeFormGroup.controls['v_SCHEDULE_NAME'].value;
    let getData = this.arrayScheduleDropDown.filter(
      (x) => x.scheduleName == schedule
    );
    let getShedule: any;
    if (getData.length > 0) {
      getShedule = getData[0].id;
    } else if (getData.length == 0) {
      getShedule = 0;
    }
    this.budgetName = this.codeFormGroup.controls['v_BUDGET_GROUP'].value;
    console.log(this.budgetName, 'this.budgetName');
    this.apiCall.apiGetCall('api/budget/getAll').subscribe((responce: any) => {
      this.getAllData = responce.responseObject;
      let getBudgetData = this.getAllData.filter(
        (x) =>
          x.group === this.budgetName || x.subGroup.includes(this.budgetName)
      );
      console.log(getBudgetData, 'getBudgetData');
      // let getBudget: any
      if (getBudgetData.length > 0) {
        this.getBudget = getBudgetData[0].id;
        console.log(this.getBudget, 'getBudget');
      } else if (getBudgetData.length == 0) {
        this.getBudget = 0;
      }
      console.log(this.getBudget.id);
      let data = {
        codeName: this.codeName,
        codeNumber: this.codeNo,
        budgetHead: this.budgetName,
        scheduleId: getShedule,
        budgetId: this.getBudget,
        codeUser: this.codeUser,
        status: this.isSubCodeData
      };
      console.log(data, 'dataaaaaaaaaaaaaa');
      this.apiCall.apiPostCall('api/code/create', data).subscribe(
        (result) => {
          console.log(result);
          this.snackbar.open('Code created successfully!', 'close', {
            duration: 3000,
          });
          this.getCodeList();
        },
        (error) => {
          console.log(error);
        }
      );
    });

    let groupData = this.getAllbudgetType.filter(
      (x) => x.group == this.codeFormGroup.controls['v_BUDGET_GROUP'].value
    );
    if (groupData && groupData.length > 0) {
      groupTotal = groupData[0].groupTotal ? groupData[0].groupTotal : '';
      budgetType = groupData[0].budgetType ? groupData[0].budgetType : '';
    }

    this.codeFormGroup.reset();
  }

  codeTableColumns: string[] = [
    'id',
    'codeNumber',
    'codeName',
    'scheduleName',
    'budgetHead',
    'ACTION',
  ];
  allCodeDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.allCodeDataSource.paginator = this.paginator;
  }

  openDelete(id) {
    const dilog = this.deleteDialog.open(DeletePopupComponent, {
      width: '250px',
      height: '180px',
    });
    dilog.afterClosed().subscribe((data) => {
      if (data) {
        this.apiCall.apiDeleteCall('api/code/deleteById/', id).subscribe(
          (data) => {
            console.log('Data deleted successfully', id);
            this.getCodeList();
          });
      }
    });
  }

  editCode(mode: string, id: any) {
    this.router.navigate(['/famodule/home/code-list-view', mode, id]);
  }
  viewCode(mode: string, id: any) {
    this.router.navigate(['/famodule/home/code-list-view', mode, id]);
  }

  //schedule get all
  getAllScheduleNameDropDown() {
    let api = 'api/schedule/getAll';
    this.apiCall.apiGetCall(api).subscribe((response: any) => {
      console.log('Get All Schedule Name ====', response);
      this.arrayScheduleDropDown = response.responseObject;
      console.log('dat data', this.arrayScheduleDropDown);
    });
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
          console.log(this.allGroupDropDownSave, 'dropdown');
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
    // })
  }

  generatePdf() {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['S.No', 'Code No', 'Code Name', 'Schedule Name', 'Budget Head']],
      body: this.CodeData.map((item, index) => [
        index + 1,
        item.codeNumber,
        item.codeName,
        item.schedule?.scheduleName || '',
        item.budgetHead
      ]),
    });

    doc.save('code-table.pdf');
  }


  generateExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.CodeData.map((item, index) => ({
        'S.No': index + 1,
        'Code No': item.codeNumber,
        'Code Name': item.codeName,
        'Schedule Name': item.schedule?.scheduleName || '',
        'Budget Head': item.budgetHead
      })),
      { header: ['S.No', 'Code No', 'Code Name', 'Schedule Name', 'Budget Head'] }
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'CodeTable');
    XLSX.writeFile(wb, 'code-table.xlsx');
  }

}