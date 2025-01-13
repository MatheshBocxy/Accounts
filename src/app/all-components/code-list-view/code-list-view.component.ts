import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-code-list-view',
  templateUrl: './code-list-view.component.html',
  styleUrl: './code-list-view.component.css',
})
export class CodeListViewComponent implements OnInit {
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
  subCodeList: any = ['Yes', 'No']
  status: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiCall: ApiservicesService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        console.log('ID:', this.id);
      }
    });

    this.codeFormGroup = this.fb.group({
      codeNo: ['', Validators.required],
      codeName: ['', Validators.required],
      scheduleName: ['', Validators.required],
      budgetHead: ['', Validators.required],
      scheduleNo: ['', Validators.required],
      codeUser: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.mode = this.route.snapshot.paramMap.get('mode');
    this.viewMode = this.mode !== 'edit';
    this.showEdit(this.mode);

    this.getViewCode();
    this.getAllScheduleNameDropDown();
    this.getAllBudgetGroups();
    this.getAllUser();
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
    if (this.id) {
      this.apiCall.apiGetCall(`api/code/getById/${this.id}`).subscribe(
        (res) => {
          console.log('API Response:', res);
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
    this.codeName = this.codeFormGroup.get('codeName').value;
    this.codeNo = this.codeFormGroup.get('codeNo').value;
    this.budgetName = this.codeFormGroup.controls['budgetHead'].value;
    this.userData = this.codeFormGroup.get('codeUser').value;
    this.status = this.codeFormGroup.get('status').value;
    console.log(this.getAllbudgetType, 'this.getAllbudgetType');

    let schedule = this.codeFormGroup.get('scheduleName').value;
    let getData = this.arrayScheduleDropDown.filter((x) => x.scheduleName == schedule);

    console.log(getData, 'getData');


    let getShedule: any;
    if (getData.length > 0) {
      getShedule = getData[0].id;
    } else if (getData.length == 0) {
      getShedule = 0;
    }

    this.budgetName = this.codeFormGroup.get('budgetHead').value;
    console.log(this.budgetName, 'this.budgetName');

    this.apiCall.apiGetCall('api/budget/getAll').subscribe((responce: any) => {
      this.getAllData = responce.responseObject;
      let getBudgetData = this.getAllData.filter((x) => x.group === this.budgetName || x.subGroup.includes(this.budgetName));
      console.log(getBudgetData, 'getBudgetData');

      if (getBudgetData.length > 0) {
        this.getBudget = getBudgetData[0].id;
        console.log(this.getBudget, 'getBudget');
      } else if (getBudgetData.length == 0) {
        this.getBudget = 0;
      }

      let data = {
        id: +this.id,
        codeName: this.codeName,
        codeNo: this.codeNo,
        budgetHead: this.budgetName,
        scheduleId: getShedule,
        budgetId: this.getBudget,
        codeUser: this.userData,
        status: this.status,
      };

      console.log(data, 'dataaaaaaaaaaaaaa');
      console.log(this.codeFormGroup.value, 'value');
      this.apiCall.apiPostCall('api/code/edit', data).subscribe(
        (result) => {
          console.log(result);
          // this.getCodeList();
          this.snackbar.open('Code updated successfullly!', 'close', {
            duration: 3000,
          });
          this.router.navigate(['/famodule/home/code-list']);
        },
        (error) => {
          console.log(error);
          this.snackbar.open(
            'Something went wrong! Please try again later.',
            'close',
            {
              duration: 3000,
            }
          );
        }
      );
    });

    // var budgetId;
    // if (this.codeFormGroup.controls['budgetHead'].value == '') {
    //   budgetId = 0;
    // } else {
    //   budgetId = this.codeData.budgetId;
    // }
  }

  // getAllBudgetGroupsDropdown() {
  //   let api = 'finance/getAllBudgetGroups';
  //   this.apiCall.apiGetCall(api).subscribe((response: any) => {
  //     console.log('Get All Schedule Name ====', response);
  //     if (response.data && response.data.length > 0) {
  //       let budgetGroupList = response.data.map(function (e) {
  //         return { value: e };
  //       });
  //       console.log('budgetGroupList', budgetGroupList);

  //       if (budgetGroupList && budgetGroupList.length > 0) {
  //         this.arrayMainGroupDropDown = budgetGroupList;
  //       }
  //     }
  //   });
  // }

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
    const schNum = this.codeFormGroup.controls['scheduleName'].value;
    const selectedCode = this.arrayScheduleDropDown.find(
      (item) => item.scheduleName === schNum
    );
    if (selectedCode) {
      this.codeFormGroup.patchValue({
        scheduleNo: selectedCode.scheduleNo,
      });
    }
  }
}
