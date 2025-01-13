import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ASBeRbeBudgetComponent } from '../as-be-rbe-budget/as-be-rbe-budget.component';
import { DecimalPipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiservicesService } from '../../service/apiservices.service';

@Component({
  selector: 'app-pop-up-as-be-rbe-form',
  templateUrl: './pop-up-as-be-rbe-form.component.html',
  styleUrl: './pop-up-as-be-rbe-form.component.css'
})
export class PopUpAsBeRbeFormComponent implements OnInit {

  subCodeForm: FormGroup;
  allSubCode: any;
  inputBool: boolean = true;
  totalAsFixed = 0;
  fixedSubGroupForAsBE: any;
  fixedSubGroupForAsRBE: any;

  constructor(
    private fb: FormBuilder,
    private apiCall: ApiservicesService,
    private dialogRef: MatDialogRef<ASBeRbeBudgetComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data, 'data');
    if (this.data.responce) {
      this.getAllSubCodeByDivision();
    }

    this.subCodeForm = this.fb.group({
      id: [''],
      subCodeAs: this.fb.array([])
    });

  }

  get subCodeArrayAS() {
    return this.subCodeForm.get('subCodeAs') as FormArray
  }

  addSubCodeAS() {
    let subCodesAs = this.fb.group({
      codeId: [''],
      subCodeName: [''],
      subCodeDescription: [''],
      subBeFixed: [''],
      subAsBeProposed: [''],
      subAsBeFixed: [''],
      subCodeId: [''],
      subBeFixedTotal: [''],
    })
    this.subCodeArrayAS.push(subCodesAs);
  }

  getFixedAmountForAsBE() {

    var paramValue: { [key: string]: string } = {};

    paramValue['beLastYear'] = this.data.responce.beLastYear;
    if (this.data.action == 'create') {
      paramValue['division'] = this.data.division;
    } else {
      paramValue['division'] = this.data.responce.division;
    }

    this.apiCall.apiPostCall_Query(`api/be/getBeLastFixed`, paramValue).subscribe(
      (response) => {
        console.log(response.responseObject);
        this.fixedSubGroupForAsBE = response.responseObject

        if (response.responseObject) {
          // AS-BE Create
          if (this.data.asBeRbe == 'AS-BE' && this.data.action == 'create') {
            let formArray = this.subCodeForm.get('subCodeAs') as FormArray;

            this.data.responce.subCodeBE?.forEach((value) => {
              this.allSubCode.forEach((sub) => {
                sub.subBeFixed = value.subBeFixed
              });
            });

            this.allSubCode.forEach((subCode, i) => {
              this.addSubCodeAS();
              formArray.at(i).get('subCodeName').setValue(subCode.subCode);
              formArray.at(i).get('subCodeDescription').setValue(subCode.subCodeDescription);
              formArray.at(i).get('subBeFixed').setValue((subCode.subBeFixed || 0).toFixed(2));
              formArray.at(i).get('subCodeId').setValue(subCode.id);
              this.calculateFixedBE(i);
            });
            console.log(this.allSubCode, 'this.allSubCode');
          }
          // AS-BE edit View
          else if (this.data.asBeRbe == 'AS-BE' && (this.data.action == 'edit' || this.data.action == 'view')) {
            let formArray = this.subCodeForm.get('subCodeAs') as FormArray;

            if (this.data.responce.subCodeASBES.length > 0) {
              console.log('length > 0');
              this.data.responce.subCodeASBES?.forEach((subCode, i) => {
                this.addSubCodeAS();
                formArray.at(i).get('subCodeName').setValue(subCode.subCode.subCode);
                formArray.at(i).get('subCodeDescription').setValue(subCode.subCode.subCodeDescription);
                formArray.at(i).get('subBeFixed').setValue((subCode.subBeFixed || 0).toFixed(2));
                formArray.at(i).get('subCodeId').setValue(subCode.subCode.id);
                formArray.at(i).get('codeId').setValue(subCode.id);
                formArray.at(i).get('subAsBeFixed').setValue((subCode.subAsBeFixed || 0).toFixed(2))
                formArray.at(i).get('subAsBeProposed').setValue((subCode.subAsBeProposed || 0).toFixed(2))
                this.calculateFixedBE(i);
              });
            }
            else if (this.data.responce.subCodeASBES.length == 0) {
              console.log('length is 0');

              console.log(this.allSubCode, 'this.allSubCode');

              this.allSubCode.forEach((subCode, i) => {
                this.addSubCodeAS();
                this.fixedSubGroupForAsBE?.forEach((element) => {
                  if (this.data.responce.code.codeNumber == element.code.codeNumber) {
                    if (element.subCodeBE.length > 0) {
                      element.subCodeBE.forEach((subCode) => {
                        formArray.at(i).get('subBeFixed').setValue((subCode.subBeFixed || 0).toFixed(2));
                      });
                    }
                  }
                  else {
                    console.log('condition failed');
                  }
                });

                formArray.at(i).get('subCodeName').setValue(subCode.subCode);
                formArray.at(i).get('subCodeDescription').setValue(subCode.subCodeDescription);
                formArray.at(i).get('subCodeId').setValue(subCode.id);
                this.calculateFixedBE(i);
              });
            }
          }
          this.patchFormArray(this.data.responce.subCodeASBES);
        }
      }
    )
  }

  getFixedAmountForAsRBE() {

    var paramValue: { [key: string]: string } = {};

    paramValue['rbeYear'] = this.data.responce.rbeYear;
    if (this.data.action == 'create') {
      paramValue['division'] = this.data.division;
    } else {
      paramValue['division'] = this.data.responce.division;
    }

    this.apiCall.apiPostCall_Query(`api/rbe/getRbeFixed`, paramValue).subscribe(
      (response) => {
        console.log(response.responseObject);
        this.fixedSubGroupForAsRBE = response.responseObject

        if (response.responseObject) {

          // AS-RBE Create
          if (this.data.asBeRbe == 'AS-RBE' && this.data.action == 'create') {
            let formArray = this.subCodeForm.get('subCodeAs') as FormArray;

            this.data.responce.subCodeRBE?.forEach((value) => {
              this.allSubCode.forEach((sub) => {
                sub.subRbeFixed = value.subRbeFixed
              });
            });

            this.allSubCode.forEach((subCode, i) => {
              this.addSubCodeAS();
              formArray.at(i).get('subCodeName').setValue(subCode.subCode);
              formArray.at(i).get('subCodeDescription').setValue(subCode.subCodeDescription);
              formArray.at(i).get('subBeFixed').setValue((subCode.subRbeFixed || 0).toFixed(2));
              formArray.at(i).get('subCodeId').setValue(subCode.id);
              this.calculateFixedRBE(i);
            });
            console.log(this.allSubCode, 'this.allSubCode');

          }

          // AS-RBE Edit & View
          else if (this.data.asBeRbe == 'AS-RBE' && (this.data.action == 'edit' || this.data.action == 'view')) {
            let formArray = this.subCodeForm.get('subCodeAs') as FormArray;

            this.data.responce.subCodeRBE?.forEach((value) => {
              this.allSubCode.forEach((sub) => {
                sub.subRbeFixed = value.subRbeFixed
              });
            });

            if (this.data.responce.subCodeASRBES.length > 0) {
              console.log('length > 0');
              this.data.responce.subCodeASRBES?.forEach((subCode, i) => {
                this.addSubCodeAS();
                formArray.at(i).get('subCodeName').setValue(subCode.subCode.subCode);
                formArray.at(i).get('subCodeDescription').setValue(subCode.subCode.subCodeDescription);
                formArray.at(i).get('subBeFixed').setValue((subCode.subRbeFixed || 0).toFixed(2));
                formArray.at(i).get('subCodeId').setValue(subCode.subCode.id);
                formArray.at(i).get('codeId').setValue(subCode.id);
                formArray.at(i).get('subAsBeFixed').setValue((subCode.subAsRbeFixed || 0).toFixed(2))
                formArray.at(i).get('subAsBeProposed').setValue((subCode.subAsRbeProposed || 0).toFixed(2))
                this.calculateFixedRBE(i);
              });
            }
            else if (this.data.responce.subCodeASRBES.length == 0) {
              this.allSubCode.forEach((subCode, i) => {
                this.addSubCodeAS();

                console.log(this.fixedSubGroupForAsRBE, 'this.fixedSubGroupForAsRBE');

                this.fixedSubGroupForAsRBE?.forEach((element) => {
                  if (this.data.responce.code.codeNumber == element.code.codeNumber) {
                    if (element.subCodeRBE.length > 0) {
                      element.subCodeRBE.forEach((subCode) => {
                        formArray.at(i).get('subBeFixed').setValue((subCode.subRbeFixed || 0).toFixed(2));
                      });
                    }
                  }
                  else {
                    console.log('condition failed');
                  }
                });
                formArray.at(i).get('subCodeName').setValue(subCode.subCode);
                formArray.at(i).get('subCodeDescription').setValue(subCode.subCodeDescription);
                formArray.at(i).get('subCodeId').setValue(subCode.id);
                this.calculateFixedRBE(i);
              });
            }
          }

          this.patchFormArray(this.data.responce.subCodeASRBES);

        }

      });
  }

  getAllSubCodeByDivision() {
    let division;
    if (this.data.action == 'create') {
      division = this.data.division;
      console.log(`create the division${division}`)
    }
    else {
      division = this.data.responce.division;
      console.log(`edit the division${division}`)
    }
    this.apiCall.apiGetCall(`api/subCode/divisionSubCode?division=${division}`).subscribe(
      (response) => {
        this.allSubCode = response.responseObject;
        console.log(this.allSubCode, 'this.allSubCode');
        if (response.responseObject && this.data.asBeRbe == 'AS-BE') {
          this.getFixedAmountForAsBE();
        }
        else if (response.responseObject && this.data.asBeRbe == 'AS-RBE') {
          this.getFixedAmountForAsRBE();
        }
      }
    );
  }

  calculateFixedBE(index) {
    let formArray = this.subCodeForm.get('subCodeAs') as FormArray;
    let subBeFixed = +formArray.at(index).get('subBeFixed')?.value
    let subAsBeFixed = +formArray.at(index).get('subAsBeFixed')?.value
    this.totalAsFixed = subBeFixed + subAsBeFixed
    console.log(this.totalAsFixed, 'total');
    formArray.at(index).get('subBeFixedTotal').setValue(this.totalAsFixed);
  }

  calculateFixedRBE(index) {
    let formArray = this.subCodeForm.get('subCodeAs') as FormArray;
    let subBeFixed = +formArray.at(index).get('subBeFixed')?.value
    let subAsBeFixed = +formArray.at(index).get('subAsBeFixed')?.value
    this.totalAsFixed = subBeFixed + subAsBeFixed
    console.log(this.totalAsFixed, 'total');
    formArray.at(index).get('subBeFixedTotal').setValue(this.totalAsFixed);
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

  submit() {

    let subCodeAsBeRbe = {
      action: this.data.action,
      asBeRbe: this.data.asBeRbe,
      index: this.data.index,
      subCodeAsBeRbe: []
    }
    if (this.data.asBeRbe == 'AS-BE' && this.data.action == 'create') {

      this.subCodeArrayAS.controls.forEach((element) => {
        subCodeAsBeRbe.subCodeAsBeRbe.push({
          subCodeName: element.get('subCodeName')?.value,
          subCodeDescription: element.get('subCodeDescription')?.value,
          subBeFixed: +element.get('subBeFixed')?.value,
          subAsBeProposed: +element.get('subAsBeProposed')?.value,
          subAsBeFixed: +element.get('subAsBeFixed')?.value,
          subBeFixedTotal: +element.get('subBeFixedTotal')?.value,
          subCodeId: +element.get('subCodeId')?.value
        });
        console.log(subCodeAsBeRbe, 'subCodeAsBeRbe');
      });

    }
    else if (this.data.asBeRbe == 'AS-RBE' && this.data.action == 'create') {

      this.subCodeArrayAS.controls.forEach((element) => {
        subCodeAsBeRbe.subCodeAsBeRbe.push({
          subCodeName: element.get('subCodeName')?.value,
          subCodeDescription: element.get('subCodeDescription')?.value,
          subRbeFixed: +element.get('subBeFixed')?.value,
          subAsRbeProposed: +element.get('subAsBeProposed')?.value,
          subAsRbeFixed: +element.get('subAsBeFixed')?.value,
          subRbeFixedTotal: +element.get('subBeFixedTotal')?.value,
          subCodeId: +element.get('subCodeId')?.value
        });
        console.log(subCodeAsBeRbe, 'subCodeAsBeRbe');
      });

    }

    if (this.data.asBeRbe == 'AS-BE' && (this.data.action == 'edit' || this.data.action == 'view')) {
      this.subCodeArrayAS.controls.forEach((element) => {

        subCodeAsBeRbe.subCodeAsBeRbe.push({
          id: element.get('codeId').value || 0,
          subAsBeFixed: +element.get('subAsBeFixed')?.value,
          subAsBeProposed: +element.get('subAsBeProposed')?.value,
          subBeFixed: +element.get('subBeFixed')?.value,
          subCodeId: +element.get('subCodeId')?.value,
          subCode: {
            id: + element.get('subCodeId').value,
            subCode: element.get('subCodeName').value,
            subCodeDescription: element.get('subCodeDescription').value,
          },
          subBeFixedTotal: +element.get('subBeFixedTotal')?.value,
        });

        console.log(subCodeAsBeRbe, 'subCodeAsBeRbe');
      })
    }
    else if (this.data.asBeRbe == 'AS-RBE' && (this.data.action == 'edit' || this.data.action == 'view')) {
      this.subCodeArrayAS.controls.forEach((element) => {

        subCodeAsBeRbe.subCodeAsBeRbe.push({
          id: element.get('codeId').value || 0,
          subAsRbeFixed: +element.get('subAsBeFixed')?.value,
          subAsRbeProposed: +element.get('subAsBeProposed')?.value,
          subRbeFixed: +element.get('subBeFixed')?.value,
          subCodeId: +element.get('subCodeId')?.value,
          subCode: {
            id: + element.get('subCodeId').value,
            subCode: element.get('subCodeName').value,
            subCodeDescription: element.get('subCodeDescription').value,
          },
          subRbeFixedTotal: +element.get('subBeFixedTotal')?.value,
        });

        console.log(subCodeAsBeRbe, 'subCodeAsBeRbe');
      })
    }
    this.dialogRef.close(subCodeAsBeRbe);
  }

  patchFormArray(subCodeRes) {
    if (this.data.asBeRbe == 'AS-BE' && this.data.action == 'create') {
      console.log(subCodeRes, 'subCodRes');
      let formArray = this.subCodeForm.get('subCodeAs') as FormArray
      subCodeRes?.forEach((element, i) => {
        formArray.at(i).get('subCodeName').setValue(element.subCodeName);
        formArray.at(i).get('subCodeDescription').setValue(element.subCodeDescription);
        formArray.at(i).get('subAsBeFixed').setValue((element.subAsBeFixed || 0).toFixed(2));
        formArray.at(i).get('subAsBeProposed').setValue((element.subAsBeProposed || 0).toFixed(2));
        formArray.at(i).get('subBeFixed').setValue((element.subBeFixed || 0).toFixed(2));
        formArray.at(i).get('subCodeId').setValue(element.subCodeId);
      });
    }
    else if (this.data.asBeRbe == 'AS-RBE' && this.data.action == 'create') {
      let formArray = this.subCodeForm.get('subCodeAs') as FormArray
      subCodeRes?.forEach((element, i) => {
        formArray.at(i).get('subCodeName').setValue(element.subCodeName);
        formArray.at(i).get('subCodeDescription').setValue(element.subCodeDescription);
        formArray.at(i).get('subAsBeFixed').setValue((element.subAsRbeFixed || 0).toFixed(2));
        formArray.at(i).get('subAsBeProposed').setValue((element.subAsRbeProposed || 0).toFixed(2));
        formArray.at(i).get('subBeFixed').setValue((element.subRbeFixed || 0).toFixed(2));
        formArray.at(i).get('subCodeId').setValue(element.subCodeId);
      });
    }
  }



}


