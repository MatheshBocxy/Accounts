import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiservicesService } from '../../service/apiservices.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewBudgetComponent } from '../new-budget/new-budget.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-sub-code-popupform',
  templateUrl: './sub-code-popupform.component.html',
  styleUrl: './sub-code-popupform.component.css'
})
export class SubCodePopupformComponent implements OnInit {

  subCodeForm: FormGroup;
  subCodeDataValues: any;
  isId: boolean = false;
  year: any;
  userDivision: string;
  roleName: any;
  idHeadOffice: boolean;
  budgetDateSource: any;
  subCodeLength: any;
  allSubCodeArray: any[] = [];
  allSubCodeDescriptionArray: any[] = [];

  actualYear: any;
  beRbeYear: any;
  actualUpToYear: any;
  beRbeLastYear: any;
  beRbemonth: any;

  constructor(
    private fb: FormBuilder,
    private apiCall: ApiservicesService,
    private dialogRef: MatDialogRef<NewBudgetComponent>,
    private snackbar: MatSnackBar,
    private decimalPipe: DecimalPipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userDivision = sessionStorage.getItem('division');
    this.roleName = sessionStorage.getItem('role');
  }

  ngOnInit() {
    this.subCodeForm = this.fb.group({
      id: [''],
      subCodeBES: this.fb.array([]),
      subCodeRBES: this.fb.array([]),
    });
    console.log(this.data, 'form another component');
    console.log(this.data.responce, 'responce');
    console.log(this.data.index, 'form another component index');
    console.log(this.data.beRbe, 'beRbe');

    console.log(this.data.responce, 'responce -- c');
    console.log(this.data.index, 'index -- c');
    console.log(this.data.type, 'type -- c');
    console.log(this.data.beRbe, 'beRbe -- c');
    console.log(this.data.flow, 'flow -- c');



    if (this.userDivision === 'Head_office') {
      this.idHeadOffice = true;
    }
    else {
      this.idHeadOffice = false;
    }

    this.budgetDateSource = this.data.responce;
    console.log(this.data, 'this.data');
    console.log(this.budgetDateSource, 'this.budgetDateSource');
    this.getAllSubCodes();

    if (this.data.type === 'create') {
      this.actualYear = this.data.beRbeactualsYear
      this.beRbeYear = this.data.beRbeYear
      this.actualUpToYear = this.data.beRbeactualsUpToYear
      this.beRbeLastYear = this.data.beRbeLastYear
      this.beRbemonth = this.data.month
    }
    else if (this.data.type === 'edit' || this.data.type === 'view') {
      if (this.data.beRbe == 'be') {
        this.actualYear = this.data.responce.actualsYear
        this.beRbeYear = this.data.responce.rbeYear
        this.actualUpToYear = this.data.responce.actualsUpToYear
        this.beRbeLastYear = this.data.responce.beLastYear
        this.beRbemonth = this.data.responce.actualsUpToMonths
      }
      else if (this.data.beRbe == 'rbe') {
        this.actualYear = this.data.responce.actualsYearRbe
        this.beRbeYear = this.data.responce.beYearRbe
        this.actualUpToYear = this.data.responce.actualsUpToYearRbe
        this.beRbeLastYear = this.data.responce.rbeYear
        this.beRbemonth = this.data.responce.actualsUpToMonthRbe
      }

    }



  }

  get subCodeArrayBES() {
    return this.subCodeForm.get('subCodeBES') as FormArray
  }
  get subCodeArrayRBES() {
    return this.subCodeForm.get('subCodeRBES') as FormArray
  }

  addSubGroupArraysBE() {
    const subCodeArray = this.fb.group({
      subCodeName: [''],
      subCodeDescription: [''],
      subActuals: [],
      subActualsUpto: [],
      subRbe: [],
      subBeProposed: [],
      subBeFixed: [],
      subCodeIdBE: []
    });
    this.subCodeArrayBES.push(subCodeArray);
    console.log(this.subCodeArrayBES, 'this.subCodeArrayBES');
  }

  addSubGroupArraysRBE() {
    const subCodeArray = this.fb.group({
      subCodeName: [''],
      subCodeDescription: [''],
      subActualsRbe: [],
      subActualsUptoRbe: [],
      subBeRbe: [],
      subRbeProposed: [],
      subRbeFixed: [],
      subCodeIdRBE: []
    });
    this.subCodeArrayRBES.push(subCodeArray);
    console.log(this.subCodeArrayRBES, 'this.subCodeArrayBES');
  }

  fiveDigitsWarning(event: any) {
    if (event.target.value.length > 5) {
      console.log(event.target.value.length, 'length');
      this.snackbar.open('Your Amount is Above 5 digits', 'close', { duration: 2000 });
    }
  }

  formatAmountOnBlur(event: any) {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && inputValue !== '') {
      const formattedValue = (+inputValue).toFixed(2);
      event.target.value = formattedValue;
    }
  }

  getAllSubCodes() {
    let division = ''
    if (this.data.type == 'edit' || this.data.type == 'view') {
      division = this.data.responce.division
    }
    else {
      division = this.userDivision;
    }
    this.apiCall.apiGetCall(`api/subCode/divisionSubCode?division=${division}`).subscribe(
      (data) => {
        console.log(data.responseObject);
        this.subCodeLength = data.responseObject.length;
        console.log(this.subCodeLength, 'this.subCodeLength');

        this.subCodeDataValues = data.responseObject
        let formArrayBE = this.subCodeForm.get('subCodeBES') as FormArray;
        let formArrayRBE = this.subCodeForm.get('subCodeRBES') as FormArray;

        this.subCodeDataValues.forEach((subCode, i) => {
          this.allSubCodeArray.push(subCode.subCode);
          this.allSubCodeDescriptionArray.push(subCode.subCodeDescription);

          if (subCode.subCode && subCode.subCodeDescription && subCode.id) {
            if (this.data.beRbe == 'be' && this.data.type == 'create') {
              console.log('be');
              this.addSubGroupArraysBE();
              formArrayBE.at(i).get('subCodeName').setValue(subCode.subCode);
              formArrayBE.at(i).get('subCodeDescription').setValue(subCode.subCodeDescription);
              formArrayBE.at(i).get('subCodeIdBE').setValue(subCode.id);
            }
            else if (this.data.beRbe == 'rbe' && this.data.type == 'create') {
              console.log('rbe');
              this.addSubGroupArraysRBE();
              formArrayRBE.at(i).get('subCodeName').setValue(subCode.subCode);
              formArrayRBE.at(i).get('subCodeDescription').setValue(subCode.subCodeDescription);
              formArrayRBE.at(i).get('subCodeIdRBE').setValue(subCode.id);
            }
            // else if (this.data.beRbe == 'BE') {
            //   console.log('BE');
            //   this.addSubGroupArraysBE();
            // }
            // else if (this.data.beRbe == 'RBE') {
            //   console.log('RBE');
            //   this.addSubGroupArraysRBE();
            // }
          }
        });

        // Be/Rbe
        if (this.data.beRbe == 'be') {
          if (this.budgetDateSource.subCodeBES?.length != 0) {
            this.patchFormArray(this.budgetDateSource.subCodeBES);
            console.log('if not empty');

          }
          else {
            console.log('if empty');
            this.subCodeDataValues.forEach((subCode, i) => {
              this.addSubGroupArraysBE();
              formArrayBE.at(i).get('subCodeName').setValue(subCode.subCode);
              formArrayBE.at(i).get('subCodeDescription').setValue(subCode.subCodeDescription);
              formArrayBE.at(i).get('subCodeIdBE').setValue(subCode.id);

            });
          }
          console.log(this.budgetDateSource.subCodeBES, 'this.budgetDateSource.subCodeBES');
        }
        else if (this.data.beRbe == 'rbe') {
          if (this.budgetDateSource.subCodeRBES?.length != 0) {
            this.patchFormArray(this.budgetDateSource.subCodeRBES);
          }
          else {
            this.subCodeDataValues.forEach((subCode, i) => {
              this.addSubGroupArraysRBE();
              formArrayRBE.at(i).get('subCodeName').setValue(subCode.subCode);
              formArrayRBE.at(i).get('subCodeDescription').setValue(subCode.subCodeDescription);
              formArrayRBE.at(i).get('subCodeIdRBE').setValue(subCode.id);
            });
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }


  onNoClick(): void {

    let finalDataRes = {
      id: this.data.id,
      index: this.data.index,
      type: this.data.type,
      subCodeArray: []
    };

    // be Create
    if (this.data.type === 'create' && this.data.beRbe == 'be') {
      console.log('create');
      this.subCodeArrayBES.controls.forEach((element) => {
        finalDataRes.subCodeArray.push({
          subCodeName: element.get('subCodeName').value,
          subCodeDescription: element.get('subCodeDescription').value,
          subActuals: +element.get('subActuals').value,
          subActualsUpto: +element.get('subActualsUpto').value,
          subRbe: +element.get('subRbe').value,
          subBeProposed: +element.get('subBeProposed').value,
          subBeFixed: +element.get('subBeFixed').value,
          subCodeIdBE: + element.get('subCodeIdBE').value,
        })
      })
    }
    // be update
    else if ((this.data.type === 'edit' && this.data.beRbe == 'be') || (this.data.type === 'view' && this.data.beRbe == 'be')) {
      let formArray = this.subCodeForm.get('subCodeBES') as FormArray;
      console.log('edit view');

      console.log(this.budgetDateSource.subCodeBES, 'this.budgetDateSource.subCodeBES');

      if (this.budgetDateSource.subCodeBES.length == 0) {
        this.subCodeArrayBES.controls.forEach((element) => {
          finalDataRes.subCodeArray.push({
            subActuals: +element.get('subActuals').value,
            subActualsUpto: +element.get('subActualsUpto').value,
            subBeFixed: +element.get('subBeFixed').value,
            subBeProposed: +element.get('subBeProposed').value,
            subCodeGetDTO: {
              id: + element.get('subCodeIdBE').value,
              subCode: element.get('subCodeName').value,
              subCodeDescription: element.get('subCodeDescription').value,
            },
            subRbe: +element.get('subRbe').value,
          })
        })
      }
      else if (this.budgetDateSource.subCodeBES.length != 0) {
        this.budgetDateSource.subCodeBES.forEach((element, i) => {
          finalDataRes.subCodeArray.push({
            id: element.id,
            subActuals: +formArray.at(i).get('subActuals')?.value || 0,
            subActualsUpto: +formArray.at(i).get('subActualsUpto')?.value || 0,
            subBeFixed: +formArray.at(i).get('subBeFixed').value,
            subBeProposed: +formArray.at(i).get('subBeProposed')?.value || 0,
            subCodeGetDTO: {
              id: +element.subCodeGetDTO.id,
              subCode: element.subCodeGetDTO.subCode,
              subCodeDescription: element.subCodeGetDTO.subCodeDescription
            },
            subRbe: +formArray.at(i).get('subRbe')?.value || 0
          });
        });
        console.log(finalDataRes, 'finalDataRes');
      }
    }
    // rbe create
    else if (this.data.type === 'create' && this.data.beRbe == 'rbe') {
      console.log('create');
      console.log('rbe');

      this.subCodeArrayRBES.controls.forEach((element) => {
        finalDataRes.subCodeArray.push({
          subCodeName: element.get('subCodeName').value,
          subCodeDescription: element.get('subCodeDescription').value,
          subActualsRbe: +element.get('subActualsRbe').value,
          subActualsUptoRbe: +element.get('subActualsUptoRbe').value,
          subBeRbe: +element.get('subBeRbe').value,
          subRbeProposed: +element.get('subRbeProposed').value,
          subRbeFixed: +element.get('subRbeFixed').value,
          subCodeIdRBE: + element.get('subCodeIdRBE').value,
        })
      })
    }
    // rbe update
    else if ((this.data.type === 'edit' && this.data.beRbe == 'rbe') || (this.data.type === 'view' && this.data.beRbe == 'rbe')) {
      let formArray = this.subCodeForm.get('subCodeRBES') as FormArray;
      console.log('edit view');

      console.log(this.budgetDateSource.subCodeBES, 'this.budgetDateSource.subCodeBES');
      if (this.budgetDateSource.subCodeRBES.length == 0) {
        this.subCodeArrayRBES.controls.forEach((element) => {
          finalDataRes.subCodeArray.push({
            subActualsRbe: +element.get('subActualsRbe').value,
            subActualsUptoRbe: +element.get('subActualsUptoRbe').value,
            subRbeFixed: +element.get('subRbeFixed').value,
            subRbeProposed: +element.get('subRbeProposed').value,
            subCodeGetDTO: {
              id: + element.get('subCodeIdRBE').value,
              subCode: element.get('subCodeName').value,
              subCodeDescription: element.get('subCodeDescription').value,
            },
            subBeRbe: +element.get('subBeRbe').value,
          })
        })
      }
      else if (this.budgetDateSource.subCodeRBES.length != 0) {
        this.budgetDateSource.subCodeRBES.forEach((element, i) => {
          finalDataRes.subCodeArray.push({
            id: element.id,
            subActualsRbe: +formArray.at(i).get('subActualsRbe')?.value || 0,
            subBeRbe: +formArray.at(i).get('subBeRbe')?.value || 0,
            subActualsUptoRbe: +formArray.at(i).get('subActualsUptoRbe')?.value || 0,
            subRbeFixed: +formArray.at(i).get('subRbeFixed').value,
            subRbeProposed: +formArray.at(i).get('subRbeProposed')?.value || 0,
            subCodeGetDTO: {
              id: +element.subCodeGetDTO.id,
              subCode: element.subCodeGetDTO.subCode,
              subCodeDescription: element.subCodeGetDTO.subCodeDescription
            },
          });
        });
        console.log(finalDataRes, 'finalDataRes');
      }
    }

    this.dialogRef.close(finalDataRes);
    this.snackbar.open('Sub-Code Submitted', 'close', {
      duration: 3000,
    });
  }

  patchFormArray(apiData: any[]) {
    console.log(apiData, 'apiData');

    // be Patch Values
    if (apiData && this.data.type == 'create' && this.data.beRbe == 'be') {
      console.log('create');
      let formArray = this.subCodeForm.get('subCodeBES') as FormArray;
      apiData.forEach((data, i) => {
        formArray.at(i).get('subCodeName').setValue(data.subCodeName);
        formArray.at(i).get('subCodeDescription').setValue(data.subCodeDescription);
        formArray.at(i).get('subActuals').setValue((data.subActuals || 0).toFixed(2));
        formArray.at(i).get('subActualsUpto').setValue((data.subActualsUpto || 0).toFixed(2));
        formArray.at(i).get('subRbe').setValue((data.subRbe || 0).toFixed(2));
        formArray.at(i).get('subBeProposed').setValue((data.subBeProposed || 0).toFixed(2));
        formArray.at(i).get('subBeFixed').setValue((data.subBeFixed || 0).toFixed(2));
        formArray.at(i).get('subCodeIdBE').setValue(data.subCodeIdBE);
      });
    }
    else if (apiData && ((this.data.type == 'edit' && this.data.beRbe == 'be') || (this.data.type == 'view' && this.data.beRbe == 'be'))) {
      console.log('edit');
      let formArray = this.subCodeForm.get('subCodeBES') as FormArray;
      apiData.forEach((data, i) => {
        this.addSubGroupArraysBE();
        formArray.at(i).get('subCodeName').setValue(data.subCodeGetDTO.subCode);
        formArray.at(i).get('subCodeDescription').setValue(data.subCodeGetDTO.subCodeDescription);
        formArray.at(i).get('subActuals').setValue((data.subActuals || 0).toFixed(2));
        formArray.at(i).get('subActualsUpto').setValue((data.subActualsUpto || 0).toFixed(2));
        formArray.at(i).get('subRbe').setValue((data.subRbe).toFixed(2) || 0);
        formArray.at(i).get('subBeProposed').setValue((data.subBeProposed).toFixed(2) || 0);
        formArray.at(i).get('subBeFixed').setValue((data.subBeFixed).toFixed(2) || 0);
        formArray.at(i).get('subCodeIdBE').setValue(data.subCodeIdBE);
      });
    }
    // rbe Patch Values
    if (apiData && this.data.type == 'create' && this.data.beRbe == 'rbe') {
      console.log('create');
      let formArray = this.subCodeForm.get('subCodeRBES') as FormArray;
      apiData.forEach((data, i) => {
        formArray.at(i).get('subCodeName').setValue(data.subCodeName);
        formArray.at(i).get('subCodeDescription').setValue(data.subCodeDescription);
        formArray.at(i).get('subActualsRbe').setValue((data.subActualsRbe || 0).toFixed(2));
        formArray.at(i).get('subActualsUptoRbe').setValue((data.subActualsUptoRbe || 0).toFixed(2));
        formArray.at(i).get('subBeRbe').setValue((data.subBeRbe || 0).toFixed(2));
        formArray.at(i).get('subRbeProposed').setValue((data.subRbeProposed || 0).toFixed(2));
        formArray.at(i).get('subRbeFixed').setValue((data.subRbeFixed || 0).toFixed(2));
        formArray.at(i).get('subCodeIdRBE').setValue(data.subCodeIdRBE);
      });
    }
    else if (apiData && ((this.data.type == 'edit' && this.data.beRbe == 'rbe') || (this.data.type == 'view' && this.data.beRbe == 'rbe'))) {
      console.log('edit');
      let formArray = this.subCodeForm.get('subCodeRBES') as FormArray;
      apiData.forEach((data, i) => {
        this.addSubGroupArraysRBE();
        formArray.at(i).get('subCodeName').setValue(data.subCodeGetDTO.subCode);
        formArray.at(i).get('subCodeDescription').setValue(data.subCodeGetDTO.subCodeDescription);
        formArray.at(i).get('subActualsRbe').setValue((data.subActualsRbe || 0).toFixed(2));
        formArray.at(i).get('subActualsUptoRbe').setValue((data.subActualsUptoRbe || 0).toFixed(2));
        formArray.at(i).get('subBeRbe').setValue((data.subBeRbe || 0).toFixed(2));
        formArray.at(i).get('subRbeProposed').setValue((data.subRbeProposed || 0).toFixed(2));
        formArray.at(i).get('subRbeFixed').setValue((data.subRbeFixed || 0).toFixed(2));
        formArray.at(i).get('subCodeIdRBE').setValue(data.subCodeIdRBE);
      });
    }
  }

}
