import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAsBeRbeFormComponent } from '../pop-up-as-be-rbe-form/pop-up-as-be-rbe-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-as-budgetview-edit',
  templateUrl: './as-budgetview-edit.component.html',
  styleUrl: './as-budgetview-edit.component.css'
})

export class ASBudgetviewEditComponent implements OnInit {
  isLoading = false;
  suggestionForm: FormGroup;
  panelOpenState = false;
  paramsValue: any;

  asProposedTotalBE = 0;
  asFixedTotalBE = 0;
  beLastFixedTotal = 0;

  asProposedTotalRBE = 0;
  asFixedTotalRBE = 0;
  rbeLastFixedTotal = 0;

  mode: boolean;
  loginDivision: string;
  loginRole: string;
  AfterClosedData: any;
  getCodeBudgetAsBE: any;
  getCodeBudgetAsRBE: any;

  eePannel: boolean;
  aoPannel: boolean;
  dcaoPannel: boolean;
  faPannel: boolean;

  eeFormStatus: any;
  aoFormStatus: any;
  dcaoFormStatus: any;
  faFormStatus: any;
  asBeRbeYear: any;

  selectedDivisionValue: any;
  divisionApi: any;
  getFilteredAsBE: any;
  getFilteredAsRBE: any;
  totalDatalength: any;
  totalfilterlength: any;
  divisionLength: any;
  searchValue = '';
  buttonNameValue: string;
  StatusASBE: any;
  StatusASRBE: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiCall: ApiservicesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.loginDivision = sessionStorage.getItem('division');
    this.loginRole = sessionStorage.getItem('role');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params, 'params');
      this.paramsValue = params
    });

    this.suggestionForm = this.fb.group({
      // EE
      eeSignatureBE: [''],
      eeRemarksBE: [''],
      eeDateBE: [''],

      eeSignatureRBE: [''],
      eeRemarksRBE: [''],
      eeDateRBE: [''],

      // AO
      aoSignatureBE: [''],
      aoRemarksBE: [''],
      aoDateBE: [''],

      aoSignatureRBE: [''],
      aoRemarksRBE: [''],
      aoDateRBE: [''],

      // DCAO
      dcaoSignatureBE: [''],
      dcaoRemarksBE: [''],
      dcaoDateBE: [''],

      dcaoSignatureRBE: [''],
      dcaoRemarksRBE: [''],
      dcaoDateRBE: [''],
      // FA 
      faSignatureBE: [''],
      faRemarksBE: [''],
      faDateBE: [''],

      faSignatureRBE: [''],
      faRemarksRBE: [''],
      faDateRBE: [''],
    });

    this.mode = this.paramsValue.action == 'view'
    this.getYearBE();

    if (this.loginRole == 'EE_Division') {
      this.eePannel = true;
    }
    else if (this.loginRole == 'AO') {
      this.eePannel = true;
      this.aoPannel = true
    }
    else if (this.loginRole == 'DCAO') {
      this.eePannel = true;
      this.aoPannel = true;
      this.dcaoPannel = true;
    }
    else if (this.loginRole == 'FA') {
      this.eePannel = true;
      this.aoPannel = true;
      this.dcaoPannel = true;
      this.faPannel = true;
    }

    this.selectedDivisionValue = 'All'
    if (this.paramsValue.asBeRbe == 'AS-BE') {
      this.getAsBEYearWiseApi();
    }
    else {
      this.getAsRBEYearWiseApi();
    }

    this.buttonName();

    if (this.paramsValue.asBeRbe == 'AS-BE') {
      this.getFixedAmountForAsBE();
    }
    else {
      this.getFixedAmountForAsRBE();
    }
  }

  backButton() {
    this.router.navigate(['/famodule/home/as-table']);
  }

  monthYearDate(dateString: string): string {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Changed format to YYYY-MM-DD

  }

  getYearBE() {
    this.apiCall.apiPostCall('api/user/getAllDivision', {}).subscribe(
      (data) => {
        this.divisionApi = data.responseObject
        this.divisionLength = data.responseObject.length;
      }
    );
  }

  searchFilter(event: any) {
    this.searchValue = event.target.value;
    let value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    console.log(value);

    if (this.paramsValue.asBeRbe == 'AS-BE') {
      console.log('AS-BE');

      if (value == '') {
        this.getCodeBudgetAsBE = [...this.getFilteredAsBE]
        this.totalDatalength = this.getCodeBudgetAsBE.length;
      }
      else {
        this.getCodeBudgetAsBE = this.getFilteredAsBE.filter(item =>
          item.code.codeName.toLowerCase().includes(value) ||
          item.code.codeNumber.toLowerCase().includes(value));

        this.totalDatalength = this.getCodeBudgetAsBE.length;

      }
      this.calculateTotalsBE();
      this.applyDecimalFormattingBE();
    }
    else if (this.paramsValue.asBeRbe == 'AS-RBE') {
      console.log('AS-RBE');

      if (value == '') {
        this.getCodeBudgetAsRBE = [...this.getFilteredAsRBE];
        this.totalDatalength = this.getCodeBudgetAsBE.length;
      }
      else {
        this.getCodeBudgetAsRBE = this.getFilteredAsRBE.filter(item =>
          item.code.codeName.toLowerCase().includes(value) ||
          item.code.codeNumber.toLowerCase().includes(value)
        )
        this.totalDatalength = this.getCodeBudgetAsBE.length;

      }
      this.calculateTotalsRBE();
      this.applyDecimalFormattingRBE();
    }

  }

  applyDecimalFormattingBE() {
    this.getCodeBudgetAsBE.forEach((item, i) => {
      if (item.asBeFixed !== undefined) {
        item.asBeFixed = (+item.asBeFixed).toFixed(2);
      }
      if (item.asBeProposed !== undefined) {
        item.asBeProposed = (+item.asBeProposed).toFixed(2);
      }
      this.calculateTotalsBE();
    });
  }

  applyDecimalFormattingRBE() {
    this.getCodeBudgetAsBE.forEach((item, i) => {
      if (item.asRbeFixed !== undefined) {
        item.asRbeFixed = (+item.asRbeFixed).toFixed(2);
      }
      if (item.asRbeProposed !== undefined) {
        item.asRbeProposed = (+item.asRbeProposed).toFixed(2);
      }
      this.calculateTotalsRBE();
    });
  }

  selectedDivisionFun(event: any) {
    this.selectedDivisionValue = event.target.value;
    this.beLastFixedTotal = 0;
    this.asProposedTotalBE = 0;
    this.asFixedTotalBE = 0;

    this.rbeLastFixedTotal = 0;
    this.asProposedTotalRBE = 0;
    this.asFixedTotalRBE = 0;

    if (this.selectedDivisionValue && this.paramsValue.asBeRbe == 'AS-BE') {
      this.getAsBEYearWiseApi();
      this.getFixedAmountForAsBE();
    }
    else if (this.selectedDivisionValue && this.paramsValue.asBeRbe == 'AS-RBE') {
      this.getAsRBEYearWiseApi();
      this.getFixedAmountForAsRBE();
    }
  }

  getAsBEYearWiseApi() {
    this.isLoading = true;
    var param: { [key: string]: string } = {};

    param['beLastYear'] = this.paramsValue.year

    if (this.paramsValue.division != 'Head_office') {
      param['division'] = this.paramsValue.division;
    }
    else {
      if (this.selectedDivisionValue != 'All') {
        param['division'] = this.selectedDivisionValue;
      }
    }

    param['role'] = this.paramsValue.role

    this.apiCall.apiPostCall_beRbe(`api/asbe/getDivisionAndYearWise`, param).subscribe(
      (data) => {
        if (data.responseObject) {
          this.isLoading = false;
        }

        console.log(data, 'data');
        this.getCodeBudgetAsBE = data.responseObject
        this.getFilteredAsBE = data.responseObject

        if (data.responseObject) {
          this.getCodeBudgetAsBE.forEach((element, i) => {
            element.asBeProposed = (element.asBeProposed || 0).toFixed(2);
            element.asBeFixed = (element.asBeFixed || 0).toFixed(2);
            this.beLastFixedTotal += element.beLastFixed
            this.asProposedTotalBE += +element?.asBeProposed
            this.asFixedTotalBE += +element?.asBeFixed
          });
          this.totalfilterlength = this.getFilteredAsBE.length;
          this.totalDatalength = this.totalfilterlength
        }
        this.asBeRbeYear = data.responseObject[0]?.beLastYear
        this.eeFormStatus = data.responseObject[0]?.eeStatus
        this.aoFormStatus = data.responseObject[0]?.aoStatus
        this.dcaoFormStatus = data.responseObject[0]?.dcaoStatus
        this.faFormStatus = data.responseObject[0]?.faStatus
        this.calculateTotalsBE();
        this.patchingRemarksFormAsBE(data.responseObject);
      }
    );
  }

  getAsRBEYearWiseApi() {
    this.isLoading = true;
    var param: { [key: string]: string } = {};
    param['rbeYear'] = this.paramsValue.year

    if (this.paramsValue.division != 'Head_office') {
      param['division'] = this.paramsValue.division;
    }
    else {
      if (this.selectedDivisionValue != 'All') {
        param['division'] = this.selectedDivisionValue;
      }
    }

    param['role'] = this.paramsValue.role
    this.apiCall.apiPostCall_beRbe(`api/asrbe/getDivisionAndYearWise`, param).subscribe(
      (data) => {
        if (data.responseObject) {
          this.isLoading = false;
        }
        console.log(data, 'data');
        this.getCodeBudgetAsRBE = data.responseObject
        this.getFilteredAsRBE = data.responseObject
        if (data.responseObject) {
          this.getCodeBudgetAsRBE.forEach((element, i) => {
            element.asRbeProposed = (element.asRbeProposed || 0).toFixed(2);
            element.asRbeFixed = (element.asRbeFixed || 0).toFixed(2);
            this.rbeLastFixedTotal += +element?.rbeLastFixed
            this.asProposedTotalRBE += +element?.asRbeProposed
            this.asFixedTotalRBE += +element?.asRbeFixed
          });
          this.asBeRbeYear = data.responseObject[0]?.rbeYear
          this.eeFormStatus = data.responseObject[0]?.eeStatusRbe
          this.aoFormStatus = data.responseObject[0]?.aoStatusRbe
          this.dcaoFormStatus = data.responseObject[0]?.dcaoStatusRbe
          this.faFormStatus = data.responseObject[0]?.faStatusRbe
        }
        this.calculateTotalsRBE();
        this.patchingRemarksFormAsRBE(data.responseObject);
      }
    );
  }

  patchingRemarksFormAsBE(remarksData: any) {
    console.log('be patching');

    // EE
    if (remarksData[0].eeStatus == 'Draft') {
      this.suggestionForm.get('eeRemarksBE').setValue(remarksData[0].eeRemarks);
      this.suggestionForm.get('eeSignatureBE').setValue(remarksData[0].eeSignature);
      this.suggestionForm.get('eeDateBE').setValue(remarksData[0].eeDate);
    } else if (remarksData[0].eeStatus == 'Active') {
      this.suggestionForm.get('eeRemarksBE').setValue(remarksData[0].eeRemarks);
      this.suggestionForm.get('eeSignatureBE').setValue(remarksData[0].eeSignature);
      this.suggestionForm.get('eeDateBE').setValue(remarksData[0].eeDate);
      this.suggestionForm.get('eeRemarksBE').disable();
      this.suggestionForm.get('eeSignatureBE').disable();
      this.suggestionForm.get('eeDateBE').disable();
    } else if (remarksData[0].eeStatus == 'Approved') {
      this.suggestionForm.get('eeRemarksBE').setValue(remarksData[0].eeRemarks);
      this.suggestionForm.get('eeSignatureBE').setValue(remarksData[0].eeSignature);
      this.suggestionForm.get('eeDateBE').setValue(remarksData[0].eeDate);
      this.suggestionForm.get('eeRemarksBE').disable();
      this.suggestionForm.get('eeSignatureBE').disable();
      this.suggestionForm.get('eeDateBE').disable();
    }

    // AO
    if (remarksData[0].aoStatus == 'Draft') {
      this.suggestionForm.get('aoRemarksBE').setValue(remarksData[0].aoRemarks);
      this.suggestionForm.get('aoSignatureBE').setValue(remarksData[0].aoSignature);
      this.suggestionForm.get('aoDateBE').setValue(remarksData[0].aoDate);
    } else if (remarksData[0].aoStatus == 'Active') {
      this.suggestionForm.get('aoRemarksBE').setValue(remarksData[0].aoRemarks);
      this.suggestionForm.get('aoSignatureBE').setValue(remarksData[0].aoSignature);
      this.suggestionForm.get('aoDateBE').setValue(remarksData[0].aoDate);
      this.suggestionForm.get('aoRemarksBE').disable();
      this.suggestionForm.get('aoSignatureBE').disable();
      this.suggestionForm.get('aoDateBE').disable();
    } else if (remarksData[0].aoStatus == 'Approved') {
      this.suggestionForm.get('aoRemarksBE').setValue(remarksData[0].aoRemarks);
      this.suggestionForm.get('aoSignatureBE').setValue(remarksData[0].aoSignature);
      this.suggestionForm.get('aoDateBE').setValue(remarksData[0].aoDate);
      this.suggestionForm.get('aoRemarksBE').disable();
      this.suggestionForm.get('aoSignatureBE').disable();
      this.suggestionForm.get('aoDateBE').disable();
    }

    // DCAO
    if (remarksData[0].dcaoStatus == 'Draft') {
      this.suggestionForm.get('dcaoRemarksBE').setValue(remarksData[0].dcaoRemarks);
      this.suggestionForm.get('dcaoSignatureBE').setValue(remarksData[0].dcaoSignature);
    } else if (remarksData[0].dcaoStatus == 'Active') {
      this.suggestionForm.get('dcaoRemarksBE').setValue(remarksData[0].dcaoRemarks);
      this.suggestionForm.get('dcaoSignatureBE').setValue(remarksData[0].dcaoSignature);
      this.suggestionForm.get('dcaoDateBE').setValue(remarksData[0].dcaoDate);
      this.suggestionForm.get('dcaoRemarksBE').disable();
      this.suggestionForm.get('dcaoSignatureBE').disable();
      this.suggestionForm.get('dcaoDateBE').disable();
    } else if (remarksData[0].dcaoStatus == 'Approved') {
      this.suggestionForm.get('dcaoRemarksBE').setValue(remarksData[0].dcaoRemarks);
      this.suggestionForm.get('dcaoSignatureBE').setValue(remarksData[0].dcaoSignature);
      this.suggestionForm.get('dcaoDateBE').setValue(remarksData[0].dcaoDate);
      this.suggestionForm.get('dcaoRemarksBE').disable();
      this.suggestionForm.get('dcaoSignatureBE').disable();
      this.suggestionForm.get('dcaoDateBE').disable();
    }

    // FA
    if (remarksData[0].faStatus == 'Draft') {
      this.suggestionForm.get('faRemarksBE').setValue(remarksData[0].faRemarks);
      this.suggestionForm.get('faSignatureBE').setValue(remarksData[0].faSignature);
    } else if (remarksData[0].faStatus == 'Active') {
      this.suggestionForm.get('faRemarksBE').setValue(remarksData[0].faRemarks);
      this.suggestionForm.get('faSignatureBE').setValue(remarksData[0].faSignature);
      this.suggestionForm.get('faDateBE').setValue(remarksData[0].faDate);
      this.suggestionForm.get('faRemarksBE').disable();
      this.suggestionForm.get('faSignatureBE').disable();
      this.suggestionForm.get('faDateBE').disable();
    } else if (remarksData[0].faStatus == 'Approved') {
      this.suggestionForm.get('faRemarksBE').setValue(remarksData[0].faRemarks);
      this.suggestionForm.get('faSignatureBE').setValue(remarksData[0].faSignature);
      this.suggestionForm.get('faDateBE').setValue(remarksData[0].faDate);
      this.suggestionForm.get('faRemarksBE').disable();
      this.suggestionForm.get('faSignatureBE').disable();
      this.suggestionForm.get('faDateBE').disable();
    }

    if (this.loginRole == 'EE_Division') {
      if (remarksData[0].eeStatus == 'Draft') {
        this.StatusASBE = 'Active'
        console.log(this.StatusASBE, 'this.StatusASBE');

      }
      else {
        this.StatusASBE = remarksData[0].eeStatus
        console.log(this.StatusASBE, 'this.StatusASBE');

      }
    }
    else if (this.loginRole == 'AO') {
      if (remarksData[0].aoStatus == 'Draft') {
        this.StatusASBE = 'Active'
        console.log(this.StatusASBE, 'this.StatusASBE');
      }
      else {
        this.StatusASBE = remarksData[0].eeStatus
        console.log(this.StatusASBE, 'this.StatusASBE');
      }
    }
    else if (this.loginRole == 'DCAO') {
      this.StatusASBE = remarksData[0].aoStatus
      console.log(this.StatusASBE, 'this.StatusASBE');
    }
    else if (this.loginRole == 'FA') {
      this.StatusASBE = remarksData[0].dcaoStatus
      console.log(this.StatusASBE, 'this.StatusASBE');
    }
  }

  patchingRemarksFormAsRBE(remarksData: any) {
    console.log('rbe patching');

    if (remarksData[0].eeStatusRbe == 'Draft') {
      // ee
      this.suggestionForm.get('eeRemarksRBE').setValue(remarksData[0].eeRemarksRbe);
      this.suggestionForm.get('eeSignatureRBE').setValue(remarksData[0].eeSignatureRbe);
      this.suggestionForm.get('eeDateBE').setValue(remarksData[0].eeDate);
    } else if (remarksData[0].eeStatusRbe == 'Active') {
      this.suggestionForm.get('eeRemarksRBE').setValue(remarksData[0].eeRemarksRbe);
      this.suggestionForm.get('eeSignatureRBE').setValue(remarksData[0].eeSignatureRbe);
      this.suggestionForm.get('eeDateRBE').setValue(remarksData[0].eeDateRbe);
      this.suggestionForm.get('eeRemarksRBE').disable();
      this.suggestionForm.get('eeSignatureRBE').disable();
      this.suggestionForm.get('eeDateRBE').disable();
    } else if (remarksData[0].eeStatusRbe == 'Approved') {
      this.suggestionForm.get('eeRemarksRBE').setValue(remarksData[0].eeRemarksRbe);
      this.suggestionForm.get('eeSignatureRBE').setValue(remarksData[0].eeSignatureRbe);
      this.suggestionForm.get('eeDateRBE').setValue(remarksData[0].eeDateRbe);
      this.suggestionForm.get('eeRemarksRBE').disable();
      this.suggestionForm.get('eeSignatureRBE').disable();
      this.suggestionForm.get('eeDateRBE').disable();
    }

    if (remarksData[0].aoStatusRbe == 'Draft') {
      this.suggestionForm.get('aoRemarksRBE').setValue(remarksData[0].aoRemarksRbe);
      this.suggestionForm.get('aoSignatureRBE').setValue(remarksData[0].aoSignatureRbe);
      this.suggestionForm.get('aoDateRBE').setValue(remarksData[0].aoDateRbe);
    } else if (remarksData[0].aoStatusRbe == 'Active') {
      this.suggestionForm.get('aoRemarksRBE').setValue(remarksData[0].aoRemarksRbe);
      this.suggestionForm.get('aoSignatureRBE').setValue(remarksData[0].aoSignatureRbe);
      this.suggestionForm.get('aoDateRBE').setValue(remarksData[0].aoDateRbe);
      this.suggestionForm.get('aoRemarksRBE').disable();
      this.suggestionForm.get('aoSignatureRBE').disable();
      this.suggestionForm.get('aoDateRBE').disable();
    } else if (remarksData[0].aoStatusRbe == 'Approved') {
      this.suggestionForm.get('aoRemarksRBE').setValue(remarksData[0].aoRemarksRbe);
      this.suggestionForm.get('aoSignatureRBE').setValue(remarksData[0].aoSignatureRbe);
      this.suggestionForm.get('aoDateRBE').setValue(remarksData[0].aoDateRbe);
      this.suggestionForm.get('aoRemarksRBE').disable();
      this.suggestionForm.get('aoSignatureRBE').disable();
      this.suggestionForm.get('aoDateRBE').disable();
    }

    if (remarksData[0].dcaoStatusRbe == 'Draft') {
      this.suggestionForm.get('dcaoRemarksRBE').setValue(remarksData[0].dcaoRemarksRbe);
      this.suggestionForm.get('dcaoSignatureRBE').setValue(remarksData[0].dcaoSignatureRbe);
    } else if (remarksData[0].dcaoStatusRbe == 'Active') {
      this.suggestionForm.get('dcaoRemarksRBE').setValue(remarksData[0].dcaoRemarksRbe);
      this.suggestionForm.get('dcaoSignatureRBE').setValue(remarksData[0].dcaoSignatureRbe);
      this.suggestionForm.get('dcaoDateRBE').setValue(remarksData[0].dcaoDateRbe);
      this.suggestionForm.get('dcaoRemarksRBE').disable();
      this.suggestionForm.get('dcaoSignatureRBE').disable();
      this.suggestionForm.get('dcaoDateRBE').disable();
    } else if (remarksData[0].dcaoStatusRbe == 'Approved') {
      this.suggestionForm.get('dcaoRemarksRBE').setValue(remarksData[0].dcaoRemarksRbe);
      this.suggestionForm.get('dcaoSignatureRBE').setValue(remarksData[0].dcaoSignatureRbe);
      this.suggestionForm.get('dcaoDateRBE').setValue(remarksData[0].dcaoDateRbe);
      this.suggestionForm.get('dcaoRemarksRBE').disable();
      this.suggestionForm.get('dcaoSignatureRBE').disable();
      this.suggestionForm.get('dcaoDateRBE').disable();
    }

    if (remarksData[0].faStatusRbe == 'Draft') {
      this.suggestionForm.get('faRemarksRBE').setValue(remarksData[0].faRemarksRbe);
      this.suggestionForm.get('faSignatureRBE').setValue(remarksData[0].faSignatureRbe);
    } else if (remarksData[0].faStatusRbe == 'Active') {
      this.suggestionForm.get('faRemarksRBE').setValue(remarksData[0].faRemarksRbe);
      this.suggestionForm.get('faSignatureRBE').setValue(remarksData[0].faSignatureRbe);
      this.suggestionForm.get('faDateRBE').setValue(remarksData[0].faDateRbe);
      this.suggestionForm.get('faRemarksRBE').disable();
      this.suggestionForm.get('faSignatureRBE').disable();
      this.suggestionForm.get('faDateRBE').disable();
    } else if (remarksData[0].faStatusRbe == 'Approved') {
      this.suggestionForm.get('faRemarksRBE').setValue(remarksData[0].faRemarksRbe);
      this.suggestionForm.get('faSignatureRBE').setValue(remarksData[0].faSignatureRbe);
      this.suggestionForm.get('faDateRBE').setValue(remarksData[0].faDateRbe);
      this.suggestionForm.get('faRemarksRBE').disable();
      this.suggestionForm.get('faSignatureRBE').disable();
      this.suggestionForm.get('faDateRBE').disable();
    }

    if (this.loginRole == 'EE_Division') {
      if (remarksData[0].eeStatusRbe == 'Draft') {
        this.StatusASRBE = 'Active'
      }
      else {
        this.StatusASRBE = remarksData[0].eeStatusRbe
      }
    }
    else if (this.loginRole == 'AO') {
      if (remarksData[0].aoStatusRbe == 'Draft') {
        this.StatusASRBE = 'Active'
      }
      else {
        this.StatusASRBE = remarksData[0].eeStatusRbe
      }
    }
    else if (this.loginRole == 'DCAO') {
      this.StatusASRBE = remarksData[0].aoStatusRbe
    }
    else if (this.loginRole == 'FA') {
      this.StatusASRBE = remarksData[0].dcaoStatusRbe
    }
  }

  getFixedAmountForAsBE() {

    var paramValue: { [key: string]: string } = {};

    paramValue['beLastYear'] = this.paramsValue.year;
    if (this.paramsValue.division != 'Head_office') {
      paramValue['division'] = this.paramsValue.division;
      console.log('if not an head office');
    }
    else {
      if (this.selectedDivisionValue != 'All') {
        console.log('if not an all');
        paramValue['division'] = this.selectedDivisionValue;
      }
    }

    this.apiCall.apiPostCall_Query(`api/be/getBeLastFixed`, paramValue).subscribe(
      (response) => {
        console.log(response.responseObject);
      })
  }

  getFixedAmountForAsRBE() {

    var paramValue: { [key: string]: string } = {};

    paramValue['rbeYear'] = this.paramsValue.year;
    // paramValue['division'] = this.loginDivision;

    if (this.paramsValue.division != 'Head_office') {
      paramValue['division'] = this.paramsValue.division;
      console.log('if not an head office');
    }
    else {
      if (this.selectedDivisionValue != 'All') {
        console.log('if not an all');
        paramValue['division'] = this.selectedDivisionValue;
      }
    }


    this.apiCall.apiPostCall_Query(`api/rbe/getRbeFixed`, paramValue).subscribe(
      (response) => {
        console.log(response.responseObject);
      });
  }

  calculateTotalsBE() {

    let asProposedBE = 0
    let asFixedBE = 0
    for (let item of this.getCodeBudgetAsBE) {
      asProposedBE += +item.asBeProposed || 0;
      asFixedBE += +item.asBeFixed || 0;
    }
    this.getCodeBudgetAsBE.forEach(item => {
      item.asProposedTotalBE = asProposedBE;
      item.asFixedTotalBE = asFixedBE;
      item.asBeTotal = parseInt(item.asbeFixed) || 0 + parseInt(item.beLastFixed) || 0;
    });

    this.asProposedTotalBE = this.getCodeBudgetAsBE[0]?.asProposedTotalBE
    this.asFixedTotalBE = this.getCodeBudgetAsBE[0]?.asFixedTotalBE

  }

  calculateTotalsRBE() {
    let asProposedRBE = 0
    let asFixedRBE = 0
    for (let item of this.getCodeBudgetAsRBE) {
      asProposedRBE += +item.asRbeProposed || 0;
      asFixedRBE += +item.asRbeFixed || 0;
    }
    this.getCodeBudgetAsRBE.forEach(item => {
      item.asProposedTotalRBE = asProposedRBE;
      item.asFixedTotalRBE = asFixedRBE;
      item.asRbeTotal = parseInt(item.asRbeFixed) + parseInt(item.rbeLastFixed)
    });

    this.asProposedTotalRBE = this.getCodeBudgetAsRBE[0]?.asProposedTotalRBE
    this.asFixedTotalRBE = this.getCodeBudgetAsRBE[0]?.asFixedTotalRBE
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  openSubGroupAsBeRbe(index: number, responce: any, asBeRbe: string, action: string) {

    let openDialogBox = this.dialog.open(PopUpAsBeRbeFormComponent, {
      width: '900px',
      height: '400px',
      disableClose: true,
      data: {
        index: index,
        responce: responce,
        asBeRbe: asBeRbe,
        action: action,
        division: this.loginDivision,
        roll: this.loginRole
      }
    });

    openDialogBox.afterClosed().subscribe((data) => {
      this.AfterClosedData = data.subCodeAsBeRbe

      if (data.asBeRbe == 'AS-BE') {
        let asProposedBE = 0
        let asFixedBE = 0

        data.subCodeAsBeRbe.forEach((value) => {
          asProposedBE += +value.subAsBeProposed
          asFixedBE += +value.subAsBeFixed
        });

        this.getCodeBudgetAsBE[data.index].subCodeASBES = data.subCodeAsBeRbe;
        this.getCodeBudgetAsBE[data.index].asBeProposed = (asProposedBE).toFixed(2);
        this.getCodeBudgetAsBE[data.index].asBeFixed = (asFixedBE).toFixed(2);

        this.calculateTotalsBE();
        console.log(this.getCodeBudgetAsBE, 'this.getCodeBudgetAsBE');
      }
      else if (data.asBeRbe == 'AS-RBE') {
        let asProposedBE = 0
        let asFixedBE = 0

        data.subCodeAsBeRbe.forEach((value) => {
          asProposedBE += +value.subAsRbeProposed
          asFixedBE += +value.subAsRbeFixed
        });

        this.getCodeBudgetAsRBE[data.index].subCodeASBES = data.subCodeAsBeRbe;
        this.getCodeBudgetAsRBE[data.index].asRbeProposed = (asProposedBE).toFixed(2);
        this.getCodeBudgetAsRBE[data.index].asRbeFixed = (asFixedBE).toFixed(2);

        this.calculateTotalsRBE();
        console.log(this.getCodeBudgetAsRBE, 'this.getCodeBudgetAsBE');
      }

      console.log(data, 'data');
    })
  }

  inputRBE() {
    console.log(this.getCodeBudgetAsRBE, 'getCodeBudgetAsRBE');
  }

  draftAsBe() {
    if (this.searchValue != '') {
      this.snackbar.open('Clear The Search To Draft the Data', 'close', { duration: 3500 })
    }
    else {
      this.isLoading = true;
      console.log('updateAsBe');
      let update = [];
      let snackBarMessage = '';

      // EE_Division

      if (this.paramsValue.role == 'EE_Division') {
        snackBarMessage = `EE ${this.loginDivision} Draft Successfully`;
        this.getCodeBudgetAsBE?.forEach((subCodeAsBe) => {
          let subCodeAsBeRbe = []
          let asBeTotal = 0
          asBeTotal = parseInt(subCodeAsBe?.beLastFixed || 0) + parseInt(subCodeAsBe?.asFixedBE || 0)
          let data = {
            codeId: subCodeAsBe.code.id,
            beId: 0,
            id: subCodeAsBe.id,
            division: subCodeAsBe.division,
            beLastYear: subCodeAsBe.beLastYear,

            beLastFixedTotal: this.beLastFixedTotal || 0,
            asBeProposedTotal: this.asProposedTotalBE || 0,
            asBeFixedTotal: this.asFixedTotalBE || 0,

            beLastFixed: +subCodeAsBe.beLastFixed || 0,
            asBeFixed: +subCodeAsBe.asBeFixed || 0,
            asBeProposed: +subCodeAsBe.asBeProposed || 0,
            // asBeTotal: asBeTotal,
            asBeTotal: +subCodeAsBe.asBeTotal || 0,

            remarks: subCodeAsBe.remarks,

            eeSignature: this.suggestionForm.get('eeSignatureBE').value,
            eeStatus: 'Draft',
            eeRemarks: this.suggestionForm.get('eeRemarksBE').value,
            eeDate: this.formatDate(this.suggestionForm.get('eeDateBE').value),

            aoSignature: this.suggestionForm.get('aoSignatureBE').value,
            aoStatus: '',
            aoRemarks: this.suggestionForm.get('aoRemarksBE').value,
            aoDate: this.formatDate(this.suggestionForm.get('aoDateBE').value),

            dcaoSignature: this.suggestionForm.get('dcaoSignatureBE').value,
            dcaoStatus: '',
            dcaoRemarks: this.suggestionForm.get('dcaoRemarksBE').value,
            dcaoDate: this.formatDate(this.suggestionForm.get('dcaoDateBE').value),

            faSignature: this.suggestionForm.get('faSignatureBE').value,
            faStatus: '',
            faRemarks: this.suggestionForm.get('faRemarksBE').value,
            faDate: this.formatDate(this.suggestionForm.get('faDateBE').value),
            status: '',

            subCodeASBES: subCodeAsBeRbe || []
          }

          subCodeAsBe.subCodeASBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subBeFixed: element.subBeFixed || 0,
              subAsBeProposed: element.subAsBeProposed || 0,
              subAsBeFixed: element.subAsBeFixed || 0,
              subBeFixedTotal: parseInt(element.subBeFixed || 0) + parseInt(element.subAsBeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // AO update

      if (this.paramsValue.role == 'AO') {
        snackBarMessage = `AO ${this.loginDivision} Draft Successfully`;

        this.getCodeBudgetAsBE.forEach((subCodeAsBe) => {
          let subCodeAsBeRbe = []
          let asBeTotal = 0
          asBeTotal = parseInt(subCodeAsBe?.beLastFixed || 0) + parseInt(subCodeAsBe?.asFixedBE || 0)
          let data = {
            codeId: subCodeAsBe.code.id,
            beId: 0,
            id: subCodeAsBe.id,
            division: subCodeAsBe.division,
            beLastYear: subCodeAsBe.beLastYear,

            beLastFixedTotal: this.beLastFixedTotal || 0,
            asBeProposedTotal: this.asProposedTotalBE || 0,
            asBeFixedTotal: this.asFixedTotalBE || 0,

            beLastFixed: +subCodeAsBe.beLastFixed || 0,
            asBeFixed: +subCodeAsBe.asBeFixed || 0,
            asBeProposed: +subCodeAsBe.asBeProposed || 0,
            // asBeTotal: asBeTotal,
            asBeTotal: +subCodeAsBe.asBeTotal || 0,

            remarks: subCodeAsBe.remarks,

            eeSignature: subCodeAsBe.eeSignature,
            eeStatus: subCodeAsBe.eeStatus,
            eeRemarks: subCodeAsBe.eeRemarks,
            eeDate: subCodeAsBe.eeDate,

            aoSignature: this.suggestionForm.get('aoSignatureBE').value,
            aoStatus: 'Draft',
            aoRemarks: this.suggestionForm.get('aoRemarksBE').value,
            aoDate: this.formatDate(this.suggestionForm.get('aoDateBE').value),

            dcaoSignature: this.suggestionForm.get('dcaoSignatureBE').value,
            dcaoStatus: '',
            dcaoRemarks: this.suggestionForm.get('dcaoRemarksBE').value,
            dcaoDate: this.formatDate(this.suggestionForm.get('dcaoDateBE').value),

            faSignature: this.suggestionForm.get('faSignatureBE').value,
            faStatus: '',
            faRemarks: this.suggestionForm.get('faRemarksBE').value,
            faDate: this.formatDate(this.suggestionForm.get('faDateBE').value),
            status: '',

            subCodeASBES: subCodeAsBeRbe || []
          }

          subCodeAsBe.subCodeASBES.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subBeFixed: element.subBeFixed || 0,
              subAsBeProposed: element.subAsBeProposed || 0,
              subAsBeFixed: element.subAsBeFixed || 0,
              subBeFixedTotal: parseInt(element.subBeFixed || 0) + parseInt(element.subAsBeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // DCAO UPDATE

      if (this.paramsValue.role == 'DCAO') {
        snackBarMessage = `DCAO ${this.loginDivision} Draft Successfully`;

        this.getCodeBudgetAsBE.forEach((subCodeAsBe) => {
          let asBeTotal = 0
          let subCodeAsBeRbe = []
          asBeTotal = parseInt(subCodeAsBe?.beLastFixed || 0) + parseInt(subCodeAsBe?.asFixedBE || 0)
          let data = {
            codeId: subCodeAsBe.code.id,
            beId: 0,
            id: subCodeAsBe.id,
            division: subCodeAsBe.division,
            beLastYear: subCodeAsBe.beLastYear,

            beLastFixedTotal: this.beLastFixedTotal || 0,
            asBeProposedTotal: this.asProposedTotalBE || 0,
            asBeFixedTotal: this.asFixedTotalBE || 0,

            beLastFixed: +subCodeAsBe.beLastFixed || 0,
            asBeFixed: +subCodeAsBe.asBeFixed || 0,
            asBeProposed: +subCodeAsBe.asBeProposed || 0,
            // asBeTotal: asBeTotal,
            asBeTotal: +subCodeAsBe.asBeTotal || 0,

            remarks: subCodeAsBe.remarks,

            eeSignature: subCodeAsBe.eeSignature,
            eeStatus: subCodeAsBe.eeStatus,
            eeRemarks: subCodeAsBe.eeRemarks,
            eeDate: subCodeAsBe.eeDate,

            aoSignature: subCodeAsBe.aoSignature,
            aoStatus: subCodeAsBe.aoStatus,
            aoRemarks: subCodeAsBe.aoRemarks,
            aoDate: subCodeAsBe.aoDate,

            dcaoSignature: this.suggestionForm.get('dcaoSignatureBE').value,
            dcaoStatus: 'Draft',
            dcaoRemarks: this.suggestionForm.get('dcaoRemarksBE').value,
            dcaoDate: this.formatDate(this.suggestionForm.get('dcaoDateBE').value),

            faSignature: this.suggestionForm.get('faSignatureBE').value,
            faStatus: '',
            faRemarks: this.suggestionForm.get('faRemarksBE').value,
            faDate: this.formatDate(this.suggestionForm.get('faDateBE').value),
            status: '',

            subCodeASBES: subCodeAsBeRbe || []

          }
          subCodeAsBe.subCodeASBES.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subBeFixed: element.subBeFixed || 0,
              subAsBeProposed: element.subAsBeProposed || 0,
              subAsBeFixed: element.subAsBeFixed || 0,
              subBeFixedTotal: parseInt(element.subBeFixed || 0) + parseInt(element.subAsBeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // FA Update

      if (this.paramsValue.role == 'FA') {
        snackBarMessage = `FA ${this.loginDivision} Draft Successfully`;

        this.getCodeBudgetAsBE.forEach((subCodeAsBe) => {
          let asBeTotal = 0
          let subCodeAsBeRbe = []
          asBeTotal = parseInt(subCodeAsBe?.beLastFixed || 0) + parseInt(subCodeAsBe?.asFixedBE || 0)
          let data = {
            codeId: subCodeAsBe.code.id,
            beId: 0,
            id: subCodeAsBe.id,
            division: subCodeAsBe.division,
            beLastYear: subCodeAsBe.beLastYear,

            beLastFixedTotal: this.beLastFixedTotal || 0,
            asBeProposedTotal: this.asProposedTotalBE || 0,
            asBeFixedTotal: this.asFixedTotalBE || 0,

            beLastFixed: +subCodeAsBe.beLastFixed || 0,
            asBeFixed: +subCodeAsBe.asBeFixed || 0,
            asBeProposed: +subCodeAsBe.asBeProposed || 0,
            // asBeTotal: asBeTotal,
            asBeTotal: +subCodeAsBe.asBeTotal || 0,


            remarks: subCodeAsBe.remarks,

            eeSignature: subCodeAsBe.eeSignature,
            eeStatus: subCodeAsBe.eeStatus,
            eeRemarks: subCodeAsBe.eeRemarks,
            eeDate: subCodeAsBe.eeDate,

            aoSignature: subCodeAsBe.aoSignature,
            aoStatus: subCodeAsBe.aoStatus,
            aoRemarks: subCodeAsBe.aoRemarks,
            aoDate: subCodeAsBe.aoDate,

            dcaoSignature: subCodeAsBe.dcaoSignature,
            dcaoStatus: subCodeAsBe.dcaoStatus,
            dcaoRemarks: subCodeAsBe.dcaoRemarks,
            dcaoDate: subCodeAsBe.dcaoDate,

            faSignature: this.suggestionForm.get('faSignatureBE').value,
            faStatus: 'Draft',
            faRemarks: this.suggestionForm.get('faRemarksBE').value,
            faDate: this.formatDate(this.suggestionForm.get('faDateBE').value),
            status: '',

            subCodeASBES: subCodeAsBeRbe || []

          }
          subCodeAsBe.subCodeASBES.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subBeFixed: element.subBeFixed || 0,
              subAsBeProposed: element.subAsBeProposed || 0,
              subAsBeFixed: element.subAsBeFixed || 0,
              subBeFixedTotal: parseInt(element.subBeFixed || 0) + parseInt(element.subAsBeFixed || 0),
              subCodeId: element.subCode.id
            })
          });
          update.push(data);
        });
      }

      console.log(update, 'update');

      this.apiCall.apiPostCall(`api/asbe/edit`, update).subscribe(
        (edit) => {
          if (edit) {
            this.isLoading = false;
            this.backButton();
            this.snackbar.open(snackBarMessage, 'close', { duration: 3000 });
          }
          console.log(edit, 'edit');
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open('Somthing Went Worng', 'close', { duration: 3000 });
        }
      );
    }
  }

  draftAsRbe() {
    if (this.searchValue != '') {
      this.snackbar.open('Clear The Search To Draft the Data', 'close', { duration: 3500 })
    }
    else {
      this.isLoading = true;
      console.log('updateAsBe');
      let update = [];
      let snackBarMessage = ''

      // EE_Division

      if (this.paramsValue.role == 'EE_Division') {
        snackBarMessage = `EE ${this.loginDivision} Draft Successfully`
        this.backButton();
        this.getCodeBudgetAsRBE?.forEach((subCodeAsRbe) => {
          let subCodeAsBeRbe = []
          let asRbeTotal = 0
          asRbeTotal = parseInt(subCodeAsRbe?.rbeLastFixed || 0) + parseInt(subCodeAsRbe?.asFixedRBE || 0)
          let data = {
            codeId: subCodeAsRbe.code.id,
            rbeId: 0,
            id: subCodeAsRbe.id,
            division: subCodeAsRbe.division,
            rbeYear: subCodeAsRbe.rbeYear,

            rbeLastFixedTotal: this.rbeLastFixedTotal || 0,
            asRbeProposedTotal: this.asProposedTotalRBE || 0,
            asRbeFixedTotal: this.asFixedTotalRBE || 0,

            rbeLastFixed: +subCodeAsRbe.rbeLastFixed || 0,
            asRbeFixed: +subCodeAsRbe.asRbeFixed || 0,
            asRbeProposed: +subCodeAsRbe.asRbeProposed || 0,
            asRbeTotal: +subCodeAsRbe.asRbeTotal || 0,

            remarksRbe: subCodeAsRbe.remarksRbe,

            eeSignatureRbe: this.suggestionForm.get('eeSignatureRBE').value,
            eeStatusRbe: 'Draft',
            eeRemarksRbe: this.suggestionForm.get('eeRemarksRBE').value,
            eeDateRbe: this.formatDate(this.suggestionForm.get('eeDateRBE').value),

            aoSignatureRbe: this.suggestionForm.get('aoSignatureRBE').value,
            aoStatusRbe: '',
            aoRemarksRbe: this.suggestionForm.get('aoRemarksRBE').value,
            aoDateRbe: this.formatDate(this.suggestionForm.get('aoDateRBE').value),

            dcaoSignatureRbe: this.suggestionForm.get('dcaoSignatureRBE').value,
            dcaoStatusRbe: '',
            dcaoRemarksRbe: this.suggestionForm.get('dcaoRemarksRBE').value,
            dcaoDateRbe: this.formatDate(this.suggestionForm.get('dcaoDateRBE').value),

            faSignatureRbe: this.suggestionForm.get('faSignatureRBE').value,
            faStatusRbe: '',
            faRemarksRbe: this.suggestionForm.get('faRemarksRBE').value,
            faDateRbe: this.formatDate(this.suggestionForm.get('faDateRBE').value),
            status: '',

            subCodeASRBES: subCodeAsBeRbe || []
          }

          subCodeAsRbe.subCodeASRBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subRbeFixed: element.subRbeFixed || 0,
              subAsRbeProposed: element.subAsRbeProposed || 0,
              subAsRbeFixed: element.subAsRbeFixed || 0,
              subRbeFixedTotal: parseInt(element.subRbeFixed || 0) + parseInt(element.subAsRbeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // AO update

      if (this.paramsValue.role == 'AO') {
        this.getCodeBudgetAsRBE?.forEach((subCodeAsRbe) => {
          let subCodeAsBeRbe = []
          snackBarMessage = `AO ${this.loginDivision} Draft Successfully`
          let asRbeTotal = 0
          asRbeTotal = parseInt(subCodeAsRbe?.rbeLastFixed || 0) + parseInt(subCodeAsRbe?.asFixedRBE || 0)
          let data = {
            codeId: subCodeAsRbe.code.id,
            rbeId: 0,
            id: subCodeAsRbe.id,
            division: subCodeAsRbe.division,
            rbeYear: subCodeAsRbe.rbeYear,

            rbeLastFixedTotal: this.rbeLastFixedTotal || 0,
            asRbeProposedTotal: this.asProposedTotalRBE || 0,
            asRbeFixedTotal: this.asFixedTotalRBE || 0,

            rbeLastFixed: +subCodeAsRbe.rbeLastFixed || 0,
            asRbeFixed: +subCodeAsRbe.asRbeFixed || 0,
            asRbeProposed: +subCodeAsRbe.asRbeProposed || 0,
            asRbeTotal: subCodeAsRbe.asRbeTotal || 0,

            remarksRbe: subCodeAsRbe.remarksRbe,

            eeSignatureRbe: subCodeAsRbe.eeSignatureRbe,
            eeStatusRbe: subCodeAsRbe.eeStatusRbe,
            eeRemarksRbe: subCodeAsRbe.eeRemarksRbe,
            eeDateRbe: subCodeAsRbe.eeDateRbe,

            aoSignatureRbe: this.suggestionForm.get('aoSignatureRBE').value,
            aoStatusRbe: 'Draft',
            aoRemarksRbe: this.suggestionForm.get('aoRemarksRBE').value,
            aoDateRbe: this.formatDate(this.suggestionForm.get('aoDateRBE').value),

            dcaoSignatureRbe: this.suggestionForm.get('dcaoSignatureRBE').value,
            dcaoStatusRbe: '',
            dcaoRemarksRbe: this.suggestionForm.get('dcaoRemarksRBE').value,
            dcaoDateRbe: this.formatDate(this.suggestionForm.get('dcaoDateRBE').value),

            faSignatureRbe: this.suggestionForm.get('faSignatureRBE').value,
            faStatusRbe: '',
            faRemarksRbe: this.suggestionForm.get('faRemarksRBE').value,
            faDateRbe: this.formatDate(this.suggestionForm.get('faDateRBE').value),
            status: '',

            subCodeASRBES: subCodeAsBeRbe || []
          }

          subCodeAsRbe.subCodeASRBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subRbeFixed: element.subRbeFixed || 0,
              subAsRbeProposed: element.subAsRbeProposed || 0,
              subAsRbeFixed: element.subAsRbeFixed || 0,
              subRbeFixedTotal: parseInt(element.subRbeFixed || 0) + parseInt(element.subAsRbeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // DCAO UPDATE

      if (this.paramsValue.role == 'DCAO') {
        this.getCodeBudgetAsRBE?.forEach((subCodeAsRbe) => {
          let subCodeAsBeRbe = []
          snackBarMessage = `EE ${this.loginDivision} Draft Successfully`
          let asRbeTotal = 0
          asRbeTotal = parseInt(subCodeAsRbe?.rbeLastFixed || 0) + parseInt(subCodeAsRbe?.asFixedRBE || 0)
          let data = {
            codeId: subCodeAsRbe.code.id,
            rbeId: 0,
            id: subCodeAsRbe.id,
            division: subCodeAsRbe.division,
            rbeYear: subCodeAsRbe.rbeYear,

            rbeLastFixedTotal: this.rbeLastFixedTotal,
            asRbeProposedTotal: this.asProposedTotalRBE,
            asRbeFixedTotal: this.asFixedTotalRBE,

            rbeLastFixed: +subCodeAsRbe.rbeLastFixed,
            asRbeFixed: +subCodeAsRbe.asRbeFixed,
            asRbeProposed: +subCodeAsRbe.asRbeProposed,
            asRbeTotal: subCodeAsRbe.asRbeTotal,

            remarksRbe: subCodeAsRbe.remarksRbe,

            eeSignatureRbe: subCodeAsRbe.eeSignatureRbe,
            eeStatusRbe: subCodeAsRbe.eeStatusRbe,
            eeRemarksRbe: subCodeAsRbe.eeRemarksRbe,
            eeDateRbe: subCodeAsRbe.eeDateRbe,

            aoSignatureRbe: subCodeAsRbe.aoSignatureRbe,
            aoStatusRbe: subCodeAsRbe.aoStatusRbe,
            aoRemarksRbe: subCodeAsRbe.aoRemarksRbe,
            aoDateRbe: subCodeAsRbe.aoDateRbe,

            dcaoSignatureRbe: this.suggestionForm.get('dcaoSignatureRBE').value,
            dcaoStatusRbe: 'Draft',
            dcaoRemarksRbe: this.suggestionForm.get('dcaoRemarksRBE').value,
            dcaoDateRbe: this.formatDate(this.suggestionForm.get('dcaoDateRBE').value),

            faSignatureRbe: this.suggestionForm.get('faSignatureRBE').value,
            faStatusRbe: '',
            faRemarksRbe: this.suggestionForm.get('faRemarksRBE').value,
            faDateRbe: this.formatDate(this.suggestionForm.get('faDateRBE').value),
            status: '',

            subCodeASRBES: subCodeAsBeRbe || []
          }

          subCodeAsRbe.subCodeASRBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subRbeFixed: element.subRbeFixed || 0,
              subAsRbeProposed: element.subAsRbeProposed || 0,
              subAsRbeFixed: element.subAsRbeFixed || 0,
              subRbeFixedTotal: parseInt(element.subRbeFixed || 0) + parseInt(element.subAsRbeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // FA Update

      if (this.paramsValue.role == 'FA') {
        this.getCodeBudgetAsRBE?.forEach((subCodeAsRbe) => {
          let subCodeAsBeRbe = [];
          snackBarMessage = `EE ${this.loginDivision} Draft Successfully`
          let asRbeTotal = 0
          asRbeTotal = parseInt(subCodeAsRbe?.rbeLastFixed || 0) + parseInt(subCodeAsRbe?.asFixedRBE || 0)
          let data = {
            codeId: subCodeAsRbe.code.id,
            rbeId: 0,
            id: subCodeAsRbe.id,
            division: subCodeAsRbe.division,
            rbeYear: subCodeAsRbe.rbeYear,

            rbeLastFixedTotal: this.rbeLastFixedTotal,
            asRbeProposedTotal: this.asProposedTotalRBE,
            asRbeFixedTotal: this.asFixedTotalRBE,

            rbeLastFixed: +subCodeAsRbe.rbeLastFixed,
            asRbeFixed: +subCodeAsRbe.asRbeFixed,
            asRbeProposed: +subCodeAsRbe.asRbeProposed,
            asRbeTotal: subCodeAsRbe.asRbeTotal,

            remarksRbe: subCodeAsRbe.remarksRbe,

            eeSignatureRbe: subCodeAsRbe.eeSignatureRbe,
            eeStatusRbe: subCodeAsRbe.eeStatusRbe,
            eeRemarksRbe: subCodeAsRbe.eeRemarksRbe,
            eeDateRbe: subCodeAsRbe.eeDateRbe,

            aoSignatureRbe: subCodeAsRbe.aoSignatureRbe,
            aoStatusRbe: subCodeAsRbe.aoStatusRbe,
            aoRemarksRbe: subCodeAsRbe.aoRemarksRbe,
            aoDateRbe: subCodeAsRbe.aoDateRbe,

            dcaoSignatureRbe: subCodeAsRbe.dcaoSignatureRbe,
            dcaoStatusRbe: subCodeAsRbe.dcaoStatusRbe,
            dcaoRemarksRbe: subCodeAsRbe.dcaoRemarksRbe,
            dcaoDateRbe: subCodeAsRbe.dcaoDateRbe,

            faSignatureRbe: this.suggestionForm.get('faSignatureRBE').value,
            faStatusRbe: 'Draft',
            faRemarksRbe: this.suggestionForm.get('faRemarksRBE').value,
            faDateRbe: this.formatDate(this.suggestionForm.get('faDateRBE').value),
            status: '',

            subCodeASRBES: subCodeAsBeRbe || []
          }

          subCodeAsRbe.subCodeASRBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subRbeFixed: element.subRbeFixed || 0,
              subAsRbeProposed: element.subAsRbeProposed || 0,
              subAsRbeFixed: element.subAsRbeFixed || 0,
              subRbeFixedTotal: parseInt(element.subRbeFixed || 0) + parseInt(element.subAsRbeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      console.log(update, 'update');

      this.apiCall.apiPostCall(`api/asrbe/edit`, update).subscribe(
        (edit) => {
          if (edit) {
            this.isLoading = false;
            this.backButton();
            this.snackbar.open(snackBarMessage, 'close', { duration: 3000 });
          }
          console.log(edit, 'edit');
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open('Somthing Went Worng', 'close', { duration: 3000 });
        }
      );
    }
  }

  updateAsBe() {
    if (this.searchValue != '') {
      this.snackbar.open('Clear The Search To Update the Data', 'close', { duration: 3500 })
    }
    else {
      this.isLoading = true;
      console.log('updateAsBe');
      let update = [];
      let snackBarMessage = '';

      // EE_Division

      if (this.paramsValue.role == 'EE_Division') {
        snackBarMessage = `EE ${this.loginDivision} Updated Successfully`;
        this.getCodeBudgetAsBE?.forEach((subCodeAsBe) => {
          let subCodeAsBeRbe = []
          let asBeTotal = 0;
          asBeTotal = parseInt(subCodeAsBe?.beLastFixed || 0) + parseInt(subCodeAsBe?.asFixedBE || 0)
          let data = {
            codeId: subCodeAsBe.code.id,
            beId: 0,
            id: subCodeAsBe.id,
            division: subCodeAsBe.division,
            beLastYear: subCodeAsBe.beLastYear,

            beLastFixedTotal: this.beLastFixedTotal || 0,
            asBeProposedTotal: this.asProposedTotalBE || 0,
            asBeFixedTotal: this.asFixedTotalBE || 0,

            beLastFixed: +subCodeAsBe.beLastFixed || 0,
            asBeFixed: +subCodeAsBe.asBeFixed || 0,
            asBeProposed: +subCodeAsBe.asBeProposed || 0,
            // asBeTotal: asBeTotal,
            asBeTotal: +subCodeAsBe.asBeTotal || 0,

            remarks: subCodeAsBe.remarks,

            eeSignature: this.suggestionForm.get('eeSignatureBE').value,
            eeStatus: 'Active',
            eeRemarks: this.suggestionForm.get('eeRemarksBE').value,
            eeDate: this.formatDate(this.suggestionForm.get('eeDateBE').value),

            aoSignature: this.suggestionForm.get('aoSignatureBE').value,
            aoStatus: '',
            aoRemarks: this.suggestionForm.get('aoRemarksBE').value,
            aoDate: this.formatDate(this.suggestionForm.get('aoDateBE').value),

            dcaoSignature: this.suggestionForm.get('dcaoSignatureBE').value,
            dcaoStatus: '',
            dcaoRemarks: this.suggestionForm.get('dcaoRemarksBE').value,
            dcaoDate: this.formatDate(this.suggestionForm.get('dcaoDateBE').value),

            faSignature: this.suggestionForm.get('faSignatureBE').value,
            faStatus: '',
            faRemarks: this.suggestionForm.get('faRemarksBE').value,
            faDate: this.formatDate(this.suggestionForm.get('faDateBE').value),
            status: '',

            subCodeASBES: subCodeAsBeRbe || []
          }

          subCodeAsBe.subCodeASBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subBeFixed: element.subBeFixed || 0,
              subAsBeProposed: element.subAsBeProposed || 0,
              subAsBeFixed: element.subAsBeFixed || 0,
              subBeFixedTotal: parseInt(element.subBeFixed || 0) + parseInt(element.subAsBeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // AO update

      if (this.paramsValue.role == 'AO') {
        snackBarMessage = `AO ${this.loginDivision} Updated Successfully`;

        this.getCodeBudgetAsBE?.forEach((subCodeAsBe) => {
          let subCodeAsBeRbe = []
          let asBeTotal = 0
          asBeTotal = parseInt(subCodeAsBe?.beLastFixed || 0) + parseInt(subCodeAsBe?.asFixedBE || 0)
          let data = {
            codeId: subCodeAsBe.code.id,
            beId: 0,
            id: subCodeAsBe.id,
            division: subCodeAsBe.division,
            beLastYear: subCodeAsBe.beLastYear,

            beLastFixedTotal: this.beLastFixedTotal || 0,
            asBeProposedTotal: this.asProposedTotalBE || 0,
            asBeFixedTotal: this.asFixedTotalBE || 0,

            beLastFixed: +subCodeAsBe.beLastFixed || 0,
            asBeFixed: +subCodeAsBe.asBeFixed || 0,
            asBeProposed: +subCodeAsBe.asBeProposed || 0,
            // asBeTotal: asBeTotal,
            asBeTotal: +subCodeAsBe.asBeTotal || 0,

            remarks: subCodeAsBe.remarks,

            eeSignature: subCodeAsBe.eeSignature,
            eeStatus: subCodeAsBe.eeStatus,
            eeRemarks: subCodeAsBe.eeRemarks,
            eeDate: subCodeAsBe.eeDate,

            aoSignature: this.suggestionForm.get('aoSignatureBE').value,
            aoStatus: 'Active',
            aoRemarks: this.suggestionForm.get('aoRemarksBE').value,
            aoDate: this.formatDate(this.suggestionForm.get('aoDateBE').value),

            dcaoSignature: this.suggestionForm.get('dcaoSignatureBE').value,
            dcaoStatus: '',
            dcaoRemarks: this.suggestionForm.get('dcaoRemarksBE').value,
            dcaoDate: this.formatDate(this.suggestionForm.get('dcaoDateBE').value),

            faSignature: this.suggestionForm.get('faSignatureBE').value,
            faStatus: '',
            faRemarks: this.suggestionForm.get('faRemarksBE').value,
            faDate: this.formatDate(this.suggestionForm.get('faDateBE').value),
            status: '',

            subCodeASBES: subCodeAsBeRbe || []
          }

          subCodeAsBe.subCodeASBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subBeFixed: element.subBeFixed || 0,
              subAsBeProposed: element.subAsBeProposed || 0,
              subAsBeFixed: element.subAsBeFixed || 0,
              subBeFixedTotal: parseInt(element.subBeFixed || 0) + parseInt(element.subAsBeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // DCAO UPDATE

      if (this.paramsValue.role == 'DCAO') {
        snackBarMessage = `DCAO ${this.loginDivision} Updated Successfully`;

        this.getCodeBudgetAsBE?.forEach((subCodeAsBe) => {
          let asBeTotal = 0
          let subCodeAsBeRbe = []
          asBeTotal = parseInt(subCodeAsBe?.beLastFixed || 0) + parseInt(subCodeAsBe?.asFixedBE || 0)
          let data = {
            codeId: subCodeAsBe.code.id,
            beId: 0,
            id: subCodeAsBe.id,
            division: subCodeAsBe.division,
            beLastYear: subCodeAsBe.beLastYear,

            beLastFixedTotal: this.beLastFixedTotal || 0,
            asBeProposedTotal: this.asProposedTotalBE || 0,
            asBeFixedTotal: this.asFixedTotalBE || 0,

            beLastFixed: +subCodeAsBe.beLastFixed || 0,
            asBeFixed: +subCodeAsBe.asBeFixed || 0,
            asBeProposed: +subCodeAsBe.asBeProposed || 0,
            // asBeTotal: asBeTotal,
            asBeTotal: +subCodeAsBe.asBeTotal || 0,

            remarks: subCodeAsBe.remarks,

            eeSignature: subCodeAsBe.eeSignature,
            eeStatus: subCodeAsBe.eeStatus,
            eeRemarks: subCodeAsBe.eeRemarks,
            eeDate: subCodeAsBe.eeDate,

            aoSignature: subCodeAsBe.aoSignature,
            aoStatus: subCodeAsBe.aoStatus,
            aoRemarks: subCodeAsBe.aoRemarks,
            aoDate: subCodeAsBe.aoDate,

            dcaoSignature: this.suggestionForm.get('dcaoSignatureBE').value,
            dcaoStatus: 'Active',
            dcaoRemarks: this.suggestionForm.get('dcaoRemarksBE').value,
            dcaoDate: this.formatDate(this.suggestionForm.get('dcaoDateBE').value),

            faSignature: this.suggestionForm.get('faSignatureBE').value,
            faStatus: '',
            faRemarks: this.suggestionForm.get('faRemarksBE').value,
            faDate: this.formatDate(this.suggestionForm.get('faDateBE').value),
            status: '',

            subCodeASBES: subCodeAsBeRbe || []

          }
          subCodeAsBe.subCodeASBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subBeFixed: element.subBeFixed || 0,
              subAsBeProposed: element.subAsBeProposed || 0,
              subAsBeFixed: element.subAsBeFixed || 0,
              subBeFixedTotal: parseInt(element.subBeFixed || 0) + parseInt(element.subAsBeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // FA Update

      if (this.paramsValue.role == 'FA') {
        snackBarMessage = `FA ${this.loginDivision} Updated Successfully`;

        this.getCodeBudgetAsBE?.forEach((subCodeAsBe) => {
          let asBeTotal = 0
          let subCodeAsBeRbe = []
          asBeTotal = parseInt(subCodeAsBe?.beLastFixed || 0) + parseInt(subCodeAsBe?.asFixedBE || 0)
          let data = {
            codeId: subCodeAsBe.code.id,
            beId: 0,
            id: subCodeAsBe.id,
            division: subCodeAsBe.division,
            beLastYear: subCodeAsBe.beLastYear,

            beLastFixedTotal: this.beLastFixedTotal || 0,
            asBeProposedTotal: this.asProposedTotalBE || 0,
            asBeFixedTotal: this.asFixedTotalBE || 0,

            beLastFixed: +subCodeAsBe.beLastFixed || 0,
            asBeFixed: +subCodeAsBe.asBeFixed || 0,
            asBeProposed: +subCodeAsBe.asBeProposed || 0,
            // asBeTotal: asBeTotal,
            asBeTotal: +subCodeAsBe.asBeTotal || 0,


            remarks: subCodeAsBe.remarks,

            eeSignature: subCodeAsBe.eeSignature,
            eeStatus: 'Approved',
            eeRemarks: subCodeAsBe.eeRemarks,
            eeDate: subCodeAsBe.eeDate,

            aoSignature: subCodeAsBe.aoSignature,
            aoStatus: 'Approved',
            aoRemarks: subCodeAsBe.aoRemarks,
            aoDate: subCodeAsBe.aoDate,

            dcaoSignature: subCodeAsBe.dcaoSignature,
            dcaoStatus: 'Approved',
            dcaoRemarks: subCodeAsBe.dcaoRemarks,
            dcaoDate: subCodeAsBe.dcaoDate,

            faSignature: this.suggestionForm.get('faSignatureBE').value,
            faStatus: 'Approved',
            faRemarks: this.suggestionForm.get('faRemarksBE').value,
            faDate: this.formatDate(this.suggestionForm.get('faDateBE').value),
            status: '',

            subCodeASBES: subCodeAsBeRbe || []

          }
          subCodeAsBe.subCodeASBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subBeFixed: element.subBeFixed || 0,
              subAsBeProposed: element.subAsBeProposed || 0,
              subAsBeFixed: element.subAsBeFixed || 0,
              subBeFixedTotal: parseInt(element.subBeFixed || 0) + parseInt(element.subAsBeFixed || 0),
              subCodeId: element.subCode.id
            })
          });
          update.push(data);
        });
      }

      console.log(update, 'update');

      this.apiCall.apiPostCall(`api/asbe/edit`, update).subscribe(
        (edit) => {
          if (edit) {
            this.isLoading = false;
            this.backButton();
            this.snackbar.open(snackBarMessage, 'close', { duration: 3000 });
          }
          console.log(edit, 'edit');
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open('Somthing Went Worng', 'close', { duration: 3000 });
        }
      );
    }
  }

  updateAsRbe() {
    if (this.searchValue != '') {
      this.snackbar.open('Clear The Search To Update the Data', 'close', { duration: 3500 })
    }
    else {
      this.isLoading = true;
      console.log('updateAsBe');
      let update = [];
      let snackBarMessage = ''

      // EE_Division

      if (this.paramsValue.role == 'EE_Division') {
        this.backButton();
        this.getCodeBudgetAsRBE?.forEach((subCodeAsRbe) => {
          let subCodeAsBeRbe = []
          snackBarMessage = `EE ${this.loginDivision} Updated Successfully`
          let asRbeTotal = 0
          asRbeTotal = parseInt(subCodeAsRbe?.rbeLastFixed || 0) + parseInt(subCodeAsRbe?.asFixedRBE || 0)
          let data = {
            codeId: subCodeAsRbe.code.id,
            rbeId: 0,
            id: subCodeAsRbe.id,
            division: subCodeAsRbe.division,
            rbeYear: subCodeAsRbe.rbeYear,

            rbeLastFixedTotal: this.rbeLastFixedTotal || 0,
            asRbeProposedTotal: this.asProposedTotalRBE || 0,
            asRbeFixedTotal: this.asFixedTotalRBE || 0,

            rbeLastFixed: +subCodeAsRbe.rbeLastFixed || 0,
            asRbeFixed: +subCodeAsRbe.asRbeFixed || 0,
            asRbeProposed: +subCodeAsRbe.asRbeProposed || 0,
            asRbeTotal: +subCodeAsRbe.asRbeTotal || 0,

            remarksRbe: subCodeAsRbe.remarksRbe,

            eeSignatureRbe: this.suggestionForm.get('eeSignatureRBE').value,
            eeStatusRbe: 'Active',
            eeRemarksRbe: this.suggestionForm.get('eeRemarksRBE').value,
            eeDateRbe: this.formatDate(this.suggestionForm.get('eeDateRBE').value),

            aoSignatureRbe: this.suggestionForm.get('aoSignatureRBE').value,
            aoStatusRbe: '',
            aoRemarksRbe: this.suggestionForm.get('aoRemarksRBE').value,
            aoDateRbe: this.formatDate(this.suggestionForm.get('aoDateRBE').value),

            dcaoSignatureRbe: this.suggestionForm.get('dcaoSignatureRBE').value,
            dcaoStatusRbe: '',
            dcaoRemarksRbe: this.suggestionForm.get('dcaoRemarksRBE').value,
            dcaoDateRbe: this.formatDate(this.suggestionForm.get('dcaoDateRBE').value),

            faSignatureRbe: this.suggestionForm.get('faSignatureRBE').value,
            faStatusRbe: '',
            faRemarksRbe: this.suggestionForm.get('faRemarksRBE').value,
            faDateRbe: this.formatDate(this.suggestionForm.get('faDateRBE').value),
            status: '',

            subCodeASRBES: subCodeAsBeRbe || []
          }

          subCodeAsRbe.subCodeASRBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subRbeFixed: element.subRbeFixed || 0,
              subAsRbeProposed: element.subAsRbeProposed || 0,
              subAsRbeFixed: element.subAsRbeFixed || 0,
              subRbeFixedTotal: parseInt(element.subRbeFixed || 0) + parseInt(element.subAsRbeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // AO update

      if (this.paramsValue.role == 'AO') {
        this.getCodeBudgetAsRBE?.forEach((subCodeAsRbe) => {
          let subCodeAsBeRbe = []
          snackBarMessage = `AO ${this.loginDivision} Updated Successfully`
          let asRbeTotal = 0
          asRbeTotal = parseInt(subCodeAsRbe?.rbeLastFixed || 0) + parseInt(subCodeAsRbe?.asFixedRBE || 0)
          let data = {
            codeId: subCodeAsRbe.code.id,
            rbeId: 0,
            id: subCodeAsRbe.id,
            division: subCodeAsRbe.division,
            rbeYear: subCodeAsRbe.rbeYear,

            rbeLastFixedTotal: this.rbeLastFixedTotal || 0,
            asRbeProposedTotal: this.asProposedTotalRBE || 0,
            asRbeFixedTotal: this.asFixedTotalRBE || 0,

            rbeLastFixed: +subCodeAsRbe.rbeLastFixed || 0,
            asRbeFixed: +subCodeAsRbe.asRbeFixed || 0,
            asRbeProposed: +subCodeAsRbe.asRbeProposed || 0,
            asRbeTotal: subCodeAsRbe.asRbeTotal || 0,

            remarksRbe: subCodeAsRbe.remarksRbe,

            eeSignatureRbe: subCodeAsRbe.eeSignatureRbe,
            eeStatusRbe: subCodeAsRbe.eeStatusRbe,
            eeRemarksRbe: subCodeAsRbe.eeRemarksRbe,
            eeDateRbe: subCodeAsRbe.eeDateRbe,

            aoSignatureRbe: this.suggestionForm.get('aoSignatureRBE').value,
            aoStatusRbe: 'Active',
            aoRemarksRbe: this.suggestionForm.get('aoRemarksRBE').value,
            aoDateRbe: this.formatDate(this.suggestionForm.get('aoDateRBE').value),

            dcaoSignatureRbe: this.suggestionForm.get('dcaoSignatureRBE').value,
            dcaoStatusRbe: '',
            dcaoRemarksRbe: this.suggestionForm.get('dcaoRemarksRBE').value,
            dcaoDateRbe: this.formatDate(this.suggestionForm.get('dcaoDateRBE').value),

            faSignatureRbe: this.suggestionForm.get('faSignatureRBE').value,
            faStatusRbe: '',
            faRemarksRbe: this.suggestionForm.get('faRemarksRBE').value,
            faDateRbe: this.formatDate(this.suggestionForm.get('faDateRBE').value),
            status: '',

            subCodeASRBES: subCodeAsBeRbe || []
          }

          subCodeAsRbe.subCodeASRBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subRbeFixed: element.subRbeFixed || 0,
              subAsRbeProposed: element.subAsRbeProposed || 0,
              subAsRbeFixed: element.subAsRbeFixed || 0,
              subRbeFixedTotal: parseInt(element.subRbeFixed || 0) + parseInt(element.subAsRbeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // DCAO UPDATE

      if (this.paramsValue.role == 'DCAO') {
        this.getCodeBudgetAsRBE?.forEach((subCodeAsRbe) => {
          let subCodeAsBeRbe = []
          snackBarMessage = `DCAO ${this.loginDivision} Updated Successfully`

          let asRbeTotal = 0
          asRbeTotal = parseInt(subCodeAsRbe?.rbeLastFixed || 0) + parseInt(subCodeAsRbe?.asFixedRBE || 0)
          let data = {
            codeId: subCodeAsRbe.code.id,
            rbeId: 0,
            id: subCodeAsRbe.id,
            division: subCodeAsRbe.division,
            rbeYear: subCodeAsRbe.rbeYear,

            rbeLastFixedTotal: this.rbeLastFixedTotal,
            asRbeProposedTotal: this.asProposedTotalRBE,
            asRbeFixedTotal: this.asFixedTotalRBE,

            rbeLastFixed: +subCodeAsRbe.rbeLastFixed,
            asRbeFixed: +subCodeAsRbe.asRbeFixed,
            asRbeProposed: +subCodeAsRbe.asRbeProposed,
            asRbeTotal: subCodeAsRbe.asRbeTotal,

            remarksRbe: subCodeAsRbe.remarksRbe,

            eeSignatureRbe: subCodeAsRbe.eeSignatureRbe,
            eeStatusRbe: subCodeAsRbe.eeStatusRbe,
            eeRemarksRbe: subCodeAsRbe.eeRemarksRbe,
            eeDateRbe: subCodeAsRbe.eeDateRbe,

            aoSignatureRbe: subCodeAsRbe.aoSignatureRbe,
            aoStatusRbe: subCodeAsRbe.aoStatusRbe,
            aoRemarksRbe: subCodeAsRbe.aoRemarksRbe,
            aoDateRbe: subCodeAsRbe.aoDateRbe,

            dcaoSignatureRbe: this.suggestionForm.get('dcaoSignatureRBE').value,
            dcaoStatusRbe: 'Active',
            dcaoRemarksRbe: this.suggestionForm.get('dcaoRemarksRBE').value,
            dcaoDateRbe: this.formatDate(this.suggestionForm.get('dcaoDateRBE').value),

            faSignatureRbe: this.suggestionForm.get('faSignatureRBE').value,
            faStatusRbe: '',
            faRemarksRbe: this.suggestionForm.get('faRemarksRBE').value,
            faDateRbe: this.formatDate(this.suggestionForm.get('faDateRBE').value),
            status: '',

            subCodeASRBES: subCodeAsBeRbe || []
          }

          subCodeAsRbe.subCodeASRBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subRbeFixed: element.subRbeFixed || 0,
              subAsRbeProposed: element.subAsRbeProposed || 0,
              subAsRbeFixed: element.subAsRbeFixed || 0,
              subRbeFixedTotal: parseInt(element.subRbeFixed || 0) + parseInt(element.subAsRbeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      // FA Update

      if (this.paramsValue.role == 'FA') {
        this.getCodeBudgetAsRBE?.forEach((subCodeAsRbe) => {
          let subCodeAsBeRbe = []
          snackBarMessage = `FA ${this.loginDivision} Updated Successfully`
          let asRbeTotal = 0
          asRbeTotal = parseInt(subCodeAsRbe?.rbeLastFixed || 0) + parseInt(subCodeAsRbe?.asFixedRBE || 0)
          let data = {
            codeId: subCodeAsRbe.code.id,
            rbeId: 0,
            id: subCodeAsRbe.id,
            division: subCodeAsRbe.division,
            rbeYear: subCodeAsRbe.rbeYear,

            rbeLastFixedTotal: this.rbeLastFixedTotal,
            asRbeProposedTotal: this.asProposedTotalRBE,
            asRbeFixedTotal: this.asFixedTotalRBE,

            rbeLastFixed: +subCodeAsRbe.rbeLastFixed,
            asRbeFixed: +subCodeAsRbe.asRbeFixed,
            asRbeProposed: +subCodeAsRbe.asRbeProposed,
            asRbeTotal: subCodeAsRbe.asRbeTotal,

            remarksRbe: subCodeAsRbe.remarksRbe,

            eeSignatureRbe: subCodeAsRbe.eeSignatureRbe,
            eeStatusRbe: 'Approved',
            eeRemarksRbe: subCodeAsRbe.eeRemarksRbe,
            eeDateRbe: subCodeAsRbe.eeDateRbe,

            aoSignatureRbe: subCodeAsRbe.aoSignatureRbe,
            aoStatusRbe: 'Approved',
            aoRemarksRbe: subCodeAsRbe.aoRemarksRbe,
            aoDateRbe: subCodeAsRbe.aoDateRbe,

            dcaoSignatureRbe: subCodeAsRbe.dcaoSignatureRbe,
            dcaoStatusRbe: 'Approved',
            dcaoRemarksRbe: subCodeAsRbe.dcaoRemarksRbe,
            dcaoDateRbe: subCodeAsRbe.dcaoDateRbe,

            faSignatureRbe: this.suggestionForm.get('faSignatureRBE').value,
            faStatusRbe: 'Approved',
            faRemarksRbe: this.suggestionForm.get('faRemarksRBE').value,
            faDateRbe: this.formatDate(this.suggestionForm.get('faDateRBE').value),
            status: '',

            subCodeASRBES: subCodeAsBeRbe || []
          }

          subCodeAsRbe.subCodeASRBES?.forEach(element => {
            subCodeAsBeRbe.push({
              id: element.id,
              subRbeFixed: element.subRbeFixed || 0,
              subAsRbeProposed: element.subAsRbeProposed || 0,
              subAsRbeFixed: element.subAsRbeFixed || 0,
              subRbeFixedTotal: parseInt(element.subRbeFixed || 0) + parseInt(element.subAsRbeFixed || 0),
              subCodeId: element.subCode.id
            })
          });

          update.push(data);
        });
      }

      console.log(update, 'update');

      this.apiCall.apiPostCall(`api/asrbe/edit`, update).subscribe(
        (edit) => {
          if (edit) {
            this.isLoading = false;
            this.backButton();
            this.snackbar.open(snackBarMessage, 'close', { duration: 3000 });
          }
          console.log(edit, 'edit');
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open('Somthing Went Worng', 'close', { duration: 3000 });
        }
      );
    }
  }

  buttonName() {
    if (this.loginRole == 'EE_Division') {
      this.buttonNameValue = 'Forward To AO';
    }
    else if (this.loginRole == 'AO') {
      this.buttonNameValue = 'Forward To DCAO';
    }
    else if (this.loginRole == 'DCAO') {
      this.buttonNameValue = 'Forward To FA';
    }
    else if (this.loginRole == 'FA') {
      this.buttonNameValue = 'Approve';
    }
  }
}
