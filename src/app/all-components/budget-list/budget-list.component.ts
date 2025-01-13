import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})

export class BudgetListComponent implements OnInit {

  @ViewChild('table') table: ElementRef;

  budgetFormGroup!: FormGroup;
  data: any;
  dataInList: any;
  addGroupcreate = false;
  mainformGroupCreate!: FormGroup;
  mainGroupDrop: any;
  scheduleNoID: any;
  budgetGroup: any;
  BudgetArray: any;
  isNotWorkBudget: boolean = true;
  budgetData: any[] = [];

  constructor(
    private router: Router,
    private apiCall: ApiservicesService,
    private deleteDialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getBudgetList();

    //form contents
    this.budgetFormGroup = this.formBuilder.group({
      v_BUDGET: ['', Validators.required],
      v_HEAD: ['', Validators.required],
      v_GROUP: ['', Validators.required],
      groupTotal: [''],
      subGroup: [''],
      v_SUBGROUP: this.formBuilder.array([]),
    });

    this.mainformGroupCreate = this.formBuilder.group({
      mainFormGroup: ['', Validators.required],
    });
  }

  filterSearch(event: Event) {
    let value = (event.target as HTMLInputElement).value
    console.log(value, 'value');
    this.allBudgetDataSource.filter = value.trim().toLowerCase()
  }

  get getSubGroup() {
    return this.budgetFormGroup.get('v_SUBGROUP') as FormArray;
  }
  createSubGroup() {
    return this.formBuilder.group({ subGroup: ['', Validators.required] });
  }

  addSubgroup() {
    this.getSubGroup.push(this.createSubGroup());
  }

  removeSubgroup(index: number) {
    this.getSubGroup.removeAt(index);
  }

  editBudget(mode: string, id: any) {
    this.router.navigate(['/famodule/home/budget-list-view/', mode, id]);
  }
  viewBudget(mode: string, id: any) {
    this.router.navigate(['/famodule/home/budget-list-view/', mode, id]);
  }
  allBudgetDataSource = new MatTableDataSource<any>([]);

  budgetTableColumns: string[] = [
    'id',
    'budgetType',
    'mainGroup',
    'group',
    'subGroup',
    'ACTION',
  ];
  id: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.allBudgetDataSource.paginator = this.paginator;
  }

  getBudgetList() {
    this.apiCall.apiGetCall('api/budget/getAll').subscribe((res: any) => {
      console.log(res);
      this.allBudgetDataSource.data = res.responseObject;

      this.budgetData = res.responseObject;
    });
  }
  openDelete(id) {
    const dilogRef = this.deleteDialog.open(DeletePopupComponent, {
      width: '290px',
      height: '140px',
    });
    dilogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.apiCall.apiDeleteCall('api/budget/deleteById', id).subscribe(
          (data) => {
            console.log('Data deleted successfully' + id);
            this.getBudgetList();
          });
      }
    });
  }

  changeBudgetName() {
    this.budgetGroup = this.budgetFormGroup.controls['v_BUDGET'].value;
    console.log(this.budgetGroup);

    if (this.budgetGroup == 'Work Budget') {
      this.isNotWorkBudget = false;
      this.BudgetArray = [
        { budgetOption: 'A.Capital Outlay' },
        { budgetOption: 'B.Deposit-Works' },
        { budgetOption: 'C.Revenue' },
      ];

      console.log(this.BudgetArray);
    } else {
      this.isNotWorkBudget = true;

      this.BudgetArray = [
        { budgetOption: 'Resources' },
        { budgetOption: 'Commitments' },
      ];
      console.log(this.BudgetArray);

      // this.budgetGroup = ['Resources', 'Commitments'];
    }
  }

  postNewBudget() {
    console.log('budget form values ======', this.budgetFormGroup);

    if (this.budgetFormGroup.invalid) {
      this.budgetFormGroup.markAllAsTouched();
      return;
    }

    console.log('CONTENT FROM INSIDE ');
    const data = {
      budgetType: this.budgetFormGroup.controls['v_BUDGET'].value,
      mainGroup: this.budgetFormGroup.controls['v_HEAD'].value,
      group: this.budgetFormGroup.controls['v_GROUP'].value,
      groupTotal: this.budgetFormGroup.controls['groupTotal'].value,
      subGroup: this.budgetFormGroup.controls['v_SUBGROUP'].value.map(
        (value: any) => value?.subGroup
      ),
    };

    this.apiCall.apiPostCall('api/budget/create', data).subscribe(
      (result) => {
        console.log('save budget from === ', result.data);
        this.snackbar.open('Budget created successfully!', 'close', {
          duration: 3000,
        });
        this.getBudgetList();
      },
      (error) => {
        this.snackbar.open('Check All fields are filled', 'close', {
          duration: 3000,
        });
        console.log(error);
      }
    );

    this.budgetFormGroup.reset();
  }

  mainGroupCreate() {
    this.addGroupcreate = true;
  }

  MainGroupDropdowndelete() {
    this.addGroupcreate = false;
  }

  saveMainGroupDropdown() {
    if (this.mainformGroupCreate.invalid) {
      this.mainformGroupCreate.markAllAsTouched();
      return;
    }
    const data = {
      mainGroup: this.mainformGroupCreate.controls['mainFormGroup'].value,
    };
    this.apiCall.apiPostCall('finance/saveMainGroup', data).subscribe((res) => {
      console.log('res from main option save ====', res);
      this.snackbar.open('Main Group option added successfully!', 'close', {
        duration: 3000,
      });
    });

    this.budgetFormGroup.reset();
    window.location.reload();
  }

  deleteMainGroupDropdown() {
    let head = this.budgetFormGroup.controls['v_HEAD'].value;
    let getData = this.mainGroupDrop.filter((x) => x.mainGroup == head);
    let getId: any;
    if (getData && getData.length > 0) {
      getId = getData[0].id;
      console.log('get Data ===', getId);
    }
    this.apiCall
      .apiDeleteCall('finance/deleteMainGroup/', getId)
      .subscribe((responce) => {
        console.log('delete main group === ', responce);
        window.location.reload();
      });
    this.budgetFormGroup.reset();
  }
  tableColumn = ['Budget Type', 'Main Group', 'Group', 'Sub-Group']

  generatePDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['S.No', 'Budget Type', 'Group', 'Main Group', 'Sub-Group']],
      body: this.allBudgetDataSource.data.map((item, index) => [
        index + 1,
        item.budgetType,
        item.group,
        item.mainGroup,
        item.subGroup
      ]),
    });
    doc.save('budget-table.pdf');
  }

  // generateExcel() {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
  //     this.allBudgetDataSource.data.map((item, index) => ({
  //       'S.No': index + 1,
  //       'Budget Type': item.budgetType,
  //       'Group': item.group,
  //       'Main Group': item.mainGroup,
  //       'Sub-Group': item.subGroup
  //     })),
  //     { header: ['S.No', 'Budget Type', 'Group', 'Main Group', 'Sub-Group'] }
  //   );

  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'BudgetTable');
  //   XLSX.writeFile(wb, 'budget-table.xlsx');
  // }

  // generateExcel() {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
  //     this.allBudgetDataSource.map((item, index) => ({
  //       'S.No': index + 1,
  //       'Budget Type': item.budgetType,
  //       'Group': item.group,
  //       'Main Group': item.mainGroup,
  //       'Sub-Group': item.subGroup.join(', ') // Join the subGroup array into a single string
  //     })),
  //     { header: ['S.No', 'Budget Type', 'Group', 'Main Group', 'Sub-Group'] }
  //   );

  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'BudgetTable');
  //   XLSX.writeFile(wb, 'budget-table.xlsx');
  // }

  generateExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.budgetData.map((item, index) => ({
        'S.No': index + 1,
        'Budget Type': item.budgetType,
        'Group': item.group,
        'Main Group': item.mainGroup,
        'Sub-Group': item.subGroup.join(', ') // Join the subGroup array into a single string
      })),
      { header: ['S.No', 'Budget Type', 'Group', 'Main Group', 'Sub-Group'] }
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'BudgetTable');
    XLSX.writeFile(wb, 'budget-table.xlsx');
  }



}
