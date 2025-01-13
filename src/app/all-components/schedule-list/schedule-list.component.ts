import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiservicesService } from '../../service/apiservices.service';
import { Router } from '@angular/router';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css'
})
export class ScheduleListComponent implements OnInit {

  scheduleFormGroup!: FormGroup;
  subgroups: string[] = [];
  response: any;
  data: any;
  scheduleData: any;

  constructor(
    private apiCall: ApiservicesService,
    private router: Router,
    private deleteDialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
  ) { }
  ngOnInit(): void {

    this.scheduleFormGroup = this.formBuilder.group({
      v_SCHEDULE: ['', Validators.required],
      v_SCHEDULE_NAME: ['', Validators.required],
      v_UNDER: ['', Validators.required]
    });

    this.getScheduleList();

  }

  filterSearch(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.allScheduleDataSource.filter = value.trim().toLowerCase();
  }

  getNewSchedule() {
    let api = "finance/scheduleCreation"

    this.apiCall.apiGetCall(api).subscribe((data) => {
      console.log(data);
    })
    this.scheduleFormGroup.patchValue(this.data.data)
  }

  postNewSchedule() {
    if (this.scheduleFormGroup.invalid) {
      this.scheduleFormGroup.markAllAsTouched();
      return
    }
    const data = {
      "scheduleNo": this.scheduleFormGroup.controls['v_SCHEDULE'].value,
      "scheduleName": this.scheduleFormGroup.controls['v_SCHEDULE_NAME'].value,
      "under": this.scheduleFormGroup.controls['v_UNDER'].value,
    }
    console.log("This is my data in save api ==== ", data);

    this.apiCall.apiPostCall("api/schedule/create", data).subscribe((result) => {
      console.log(result);

      this.snackbar.open('Schedule created successfully!', 'close', {
        duration: 3000,
      });
      this.getScheduleList()
    },
      (error) => {
        console.log(error);
      });

    this.scheduleFormGroup.reset();
  }

  allScheduleDataSource = new MatTableDataSource<any>([]);

  scheduleTableColumns: string[] = ['id', 'scheduleNo', 'scheduleName', 'under', 'ACTION'];
  id: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.allScheduleDataSource.paginator = this.paginator;
  }

  getScheduleList() {
    let api = 'api/schedule/getAll';
    this.apiCall.apiGetCall(api).subscribe((responce: any) => {
      console.log(responce);
      this.allScheduleDataSource.data = responce.responseObject;

      this.scheduleData = responce.responseObject
    });
  }

  openDelete(id) {
    const dilog = this.deleteDialog.open(DeletePopupComponent, {
      width: '250px',
      height: '180px',
    })
    dilog.afterClosed().subscribe(data => {
      if (data) {
        this.apiCall.apiDeleteCall('api/schedule/deleteById', id).subscribe((data) => {
          console.log("Data deleted successfully", id);
          this.getScheduleList();
        });
      }
    });
  }

  editSchedule(mode: string, id: any) {
    this.router.navigate(['/famodule/home/schedule-list-view/', mode, id])
  }
  viewSchedule(mode: string, id: any) {
    this.router.navigate(['/famodule/home/schedule-list-view/', mode, id])
  }

  generatePdf() {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['S.No', 'Schedule Name', 'Schedule No', 'Under']],
      body: this.scheduleData.map((item, index) => [
        index + 1,
        item.scheduleName,
        item.scheduleNo,
        item.under
      ]),
    });

    doc.save('schedule-table.pdf');
  }


  generateExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.scheduleData.map((item, index) => ({
        'S.No': index + 1,
        'Schedule Name': item.scheduleName,
        'Schedule No': item.scheduleNo,
        'Under': item.under
      })),
      { header: ['S.No', 'Schedule Name', 'Schedule No', 'Under'] }
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ScheduleTable');
    XLSX.writeFile(wb, 'schedule-table.xlsx');
  }


}
