import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';

@Component({
  selector: 'app-budget-list-view',
  templateUrl: './budget-list-view.component.html',
  styleUrl: './budget-list-view.component.css'
})
export class BudgetListViewComponent implements OnInit {
  budgetFormGroup!: FormGroup;
  subgroups: string[] = [];
  edit: any;
  nid: any;
  getBudget: any;
  activeRoute: any;
  view: boolean;
  data: any;
  mode: any;
  viewMode: boolean;
  id: any;
  mainGroupDrop: any;
  budgetType: any;
  budgetTypeArray: any[];

  constructor(
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private apiCall: ApiservicesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    console.log(this.id);

    this.budgetFormGroup = this.formBuilder.group({
      budgetType: ['', Validators.required],
      mainGroup: ['', Validators.required],
      group: ['', Validators.required],
      groupTotal: ['', Validators.required],
      subGroup: this.formBuilder.array([]),
    });

    this.mode = this.route.snapshot.paramMap.get('mode');
    this.viewMode = this.mode !== 'edit';
    console.log(this.viewMode);

    this.getViewBudget();
  }

  changeBudgetDropDown() {
    this.budgetType = this.budgetFormGroup.controls['budgetType'].value;
    console.log(this.budgetType);

    if (this.budgetType == 'Work Budget') {
      this.budgetTypeArray = ['A.Capital Outlay', 'B.Deposit-Works', 'C.Revenue']
      console.log('this.budgetTypeArray', this.budgetTypeArray);
    }
    else {
      this.budgetTypeArray = ['Resources', 'Commitments']
      console.log('this.budgetTypeArray', this.budgetTypeArray);
    }
  }

  get getSubGroup() {
    return this.budgetFormGroup.get('subGroup') as FormArray;
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

  getViewBudget() {
    if (this.id) {
      this.apiCall.apiGetCall(`api/budget/getById/${this.id}`).subscribe(
        (res) => {
          console.log('API Response:', res.responseObject);

          const subGroup = res?.responseObject.subGroup.map((data) => {
            this.addSubgroup();
            return { subGroup: data };
          });

          this.budgetFormGroup.patchValue({ ...res.responseObject, subGroup });
          this.changeBudgetDropDown();
        },
        (error) => {
          console.log('API Error:', error);
        }
      );
    } else {
      console.error('ID is undefined. Cannot make API call.');
    }
  }

  postUpdateBudget() {
    if (this.budgetFormGroup.invalid) {
      this.budgetFormGroup.markAllAsTouched();
      return;
    }

    const data = {

      ...this.budgetFormGroup.value,
      subGroup: this.budgetFormGroup.controls['subGroup'].value.map(
        (value) => value?.subGroup
      ),
      id: this.id,
    };

    this.apiCall.apiPostCall('api/budget/edit', data).subscribe(
      (result) => {
        this.snackbar.open('Budget updated successfully!', 'close', {
          duration: 3000,
        });
        this.router.navigate(['/famodule/home/budget-list']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
