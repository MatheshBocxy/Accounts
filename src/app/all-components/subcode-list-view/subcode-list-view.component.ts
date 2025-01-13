import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subcode-list-view',
  templateUrl: './subcode-list-view.component.html',
  styleUrl: './subcode-list-view.component.css'
})
export class SubcodeListViewComponent implements OnInit {
  codeFormGroup!: FormGroup;
  data: any;
  id: any;
  viewMode: boolean;
  mode: string;
  arrayMainGroupDropDown: any;
  arrayScheduleDropDown: any[] = [];
  schNo: boolean = false;
  getAllgroup: any;
  getAllgroupTotal: any;
  getAllbudgetType: any;
  allGroupDropDownSave: any[] = [];
  allGroupDropDown: any[] = [];
  allGroupDrop_DownSave: any[] = [];
  codeData: any;
  allUserData: any;
  userData: any;
  subCodeDescription: any;
  subCode: any;
  divisionDropDown: any;
  divisionValue: any;

  selectedDivisions: any[] = [];
  isAllSelected = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiCall: ApiservicesService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        console.log('ID:', this.id);
      }
    });

    this.codeFormGroup = this.fb.group({
      subCode: ['', Validators.required],
      subCodeDescription: ['', Validators.required],
      division: ['', Validators.required],
    });
    this.mode = this.route.snapshot.paramMap.get('mode');
    this.viewMode = this.mode !== 'edit';
    this.showEdit(this.mode);

    this.getViewCode();
    // this.getAllBudgetGroupsDropdown();
    // this.getAllScheduleNameDropDown();
    this.getAllBudgetGroups();
    // this.getCodeDataById();
    this.getAllUser();
    this.divisionDropDownFun();
  }

  getAllUser() {
    let api = 'api/user/getAllUser';
    this.apiCall.apiGetCall(api).subscribe((response: any) => {
      console.log(response);
      this.allUserData = response.responseObject;
    });
  }

  showEdit(mode: string) {
    this.mode = mode;
  }

  getViewCode() {
    console.log(this.id, "id")
    if (this.id) {
      this.apiCall.apiGetCall(`api/subCode/getById/${this.id}`).subscribe(
        (res) => {
          console.log('API Response:', res);
          console.log(res.responseObject.subCodeDescription, "wsc")
          this.codeFormGroup.patchValue(res.responseObject);
          this.codeData = res.responseObject;
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
    } else {
      console.error('This is for invalid ID.');
    }
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

  // postUpdateCode() {
  //   if (this.codeFormGroup.invalid) {
  //     this.codeFormGroup.markAllAsTouched();
  //     return;
  //   }

  //   console.log(this.codeFormGroup.value, 'valuee');
  //   this.codeFormGroup.value.id = this.id;

  //   this.apiCall
  //     .apiPostCall('api/code/edit', this.codeFormGroup.value)
  //     .subscribe(
  //       (res) => {
  //         this.snackbar.open('Code updated successfullly!', 'close', {
  //           duration: 3000,
  //         });
  //         this.router.navigate(['/famodule/home/code-list']);
  //       },
  //       (err) => {
  //         console.log('Err', err);
  //         this.snackbar.open(
  //           'Something went wrong! Please try again later.',
  //           'close',
  //           {
  //             duration: 3000,
  //           }
  //         );
  //       }
  //     );
  // }

  codeName: any;
  codeNo: any;
  budgetName: any;
  getAllData: any[] = [];
  getBudget: any;
  getShedule: any;

  // getCodeDataById() {
  //   this.codeName = this.codeFormGroup.get('codeName').value;
  //   this.codeNo = this.codeFormGroup.get('codeNo').value;
  //   console.log('intofunction', this.codeName, this.codeNo);
  //   let group: any;
  //   let groupTotal: any;
  //   let budgetType: any;
  //   // if (this.codeFormGroup.invalid) {
  //   //   this.codeFormGroup.markAllAsTouched();
  //   //   return;
  //   // }
  //   console.log(this.arrayScheduleDropDown, 'arrayScheduleDropDown');
  //   let schedule = this.codeFormGroup.controls['scheduleName'].value;
  //   let getData = this.arrayScheduleDropDown.filter(
  //     (x) => x.scheduleName == schedule
  //   );

  //   if (getData && getData.length > 0) {
  //     this.getShedule = getData[0];
  //   }
  //   this.budgetName = this.codeFormGroup.controls['budgetHead'].value;
  //   this.apiCall.apiGetCall('api/code/getAll').subscribe((responce: any) => {
  //     this.getAllData = responce.responseObject;
  //     let getBudgetData = this.getAllData.filter(
  //       (x) =>
  //         x.group === this.budgetName || x.subGroup.includes(this.budgetName)
  //     );
  //     console.log(getBudgetData, 'getBudgetData');
  //     // let getBudget: any
  //     if (getBudgetData && getBudgetData.length > 0) {
  //       this.getBudget = getBudgetData[0];
  //       console.log(this.getBudget, 'getBudget');
  //     }
  //   });
  // }

  postUpdateCode() {
    this.subCodeDescription = this.codeFormGroup.get('subCodeDescription').value;
    this.subCode = this.codeFormGroup.get('subCode').value;
    this.divisionValue = this.codeFormGroup.get('division').value;
    console.log(this.subCodeDescription, this.subCode, 'data for request');

    let data = {
      id: +this.id,
      subCode: this.subCode,
      subCodeDescription: this.subCodeDescription,
      // division: this.divisionValue
      division: this.selectedDivisions
    };
    console.log(data, 'dataaaaaaaaaaaaaa');
    console.log(this.codeFormGroup.value, 'value');
    this.apiCall.apiPostCall('api/subCode/edit', data).subscribe(
      (result) => {
        console.log(result);
        if (result.responseStatus) {
          this.snackbar.open('Sub-Code updated successfullly!', 'close', { duration: 3000, });
          this.toastr.success('Hello world!');
          this.router.navigate(['/famodule/home/subcode']);
        }
      },
      (error) => {
        console.log(error);
        this.snackbar.open('Something went wrong! Please try again later.', 'close', { duration: 3000 });
      }
    );
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
}

