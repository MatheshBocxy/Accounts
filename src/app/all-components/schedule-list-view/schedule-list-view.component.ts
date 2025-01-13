import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-schedule-list-view',
  templateUrl: './schedule-list-view.component.html',
  styleUrl: './schedule-list-view.component.css'
})
export class ScheduleListViewComponent implements OnInit {

  scheduleFormGroup: FormGroup;
  mode: string;
  viewMode: boolean;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiCall: ApiservicesService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        console.log('ID:', this.id);
      }
    });

    this.scheduleFormGroup = this.formBuilder.group({
      scheduleNo: ['', Validators.required],
      scheduleName: ['', Validators.required],
      under: ['', Validators.required]
    });

    this.mode = this.route.snapshot.paramMap.get('mode');
    this.viewMode = this.mode !== 'edit';
    this.showEdit(this.mode);

    this.getViewSchedule();
  }

  showEdit(mode: string) {
    this.mode = mode;
  }

  getViewSchedule() {
    if (this.id) {
      this.apiCall.apiGetCall(`api/schedule/getById/${this.id}`).subscribe(
        (res) => {
          console.log('API Response:', res);
          this.scheduleFormGroup.patchValue(res.responseObject);
        },
        (error) => {
          console.log('API Error:', error);
        }
      );
    } else {
      console.error('ID is undefined. Cannot make API call.');
    }

  }

  postUpdateSchedule() {
    if (this.scheduleFormGroup.invalid) {
      this.scheduleFormGroup.markAllAsTouched();
      return;
    }

    console.log('data', this.scheduleFormGroup.value);
    this.scheduleFormGroup.value.id = this.id;

    this.apiCall.apiPostCall('api/schedule/edit', this.scheduleFormGroup.value).subscribe(
      (res) => {
        this.snackbar.open('Schedule updated successfullly!', 'close', {
          duration: 3000,
        });
        this.router.navigate(['/famodule/home/schedule-list']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
