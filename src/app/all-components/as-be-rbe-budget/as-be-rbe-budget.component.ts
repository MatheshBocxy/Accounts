import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../../service/apiservices.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAsBeRbeFormComponent } from '../pop-up-as-be-rbe-form/pop-up-as-be-rbe-form.component';

@Component({
  selector: 'app-as-be-rbe-budget',
  templateUrl: './as-be-rbe-budget.component.html',
  styleUrl: './as-be-rbe-budget.component.css'
})
export class ASBeRbeBudgetComponent implements OnInit {

  suggestionForm: FormGroup;
  isLoading = false;
  panelOpenState = false;
  loginDivision: string;
  loginRole: string;
  asBeRbe: string;
  getCodeBudgetAsBE: any;
  getCodeBudgetAsRBE: any;
  asBeRbeYear: any;
  filteredItemsBE: any;
  filteredItemsRBE: any;
  AfterClosedData: any;

  beLastFixedTotal = 0;
  asProposedTotalBE: any;
  asFixedTotalBE: any;

  rbeLastFixedTotal = 0;
  asProposedTotalRBE: any;
  asFixedTotalRBE: any;
  totalDatalength: any;
  totalfilterlength: any;
  buttonNameValue: string;
  searchValue = '';

  constructor(
    private apiCall: ApiservicesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private dialog: MatDialog

  ) {
    this.loginDivision = sessionStorage.getItem('division');
    this.loginRole = sessionStorage.getItem('role');
  }

  ngOnInit() {

    this.route.params.subscribe((param) => {
      this.asBeRbe = param['AS-beRbe']
    })

    this.getCodeApi();
    if (this.asBeRbe == 'AS-BE') {
      this.getyearApiForBE();
    } else {
      this.getyearApiForRBE();
    }

    this.suggestionForm = this.fb.group({
      eeRemarksBE: [''],
      eeSignatureBE: [''],
      eeDateBE: [''],

      eeRemarksRBE: [''],
      eeSignatureRBE: [''],
      eeDateRBE: [''],

      aoRemarksBE: [''],
      aoSignatureBE: [''],
      aoDateBE: [''],

      aoRemarksRBE: [''],
      aoSignatureRBE: [''],
      aoDateRBE: [''],
    });
    this.buttonName();
  }

  getCodeApi() {
    var paramValue: { [key: string]: string } = {};
    paramValue['roll'] = this.loginRole
    this.apiCall.apiPostCall_Query(`api/code/getCodeAll`, paramValue).subscribe(
      (response) => {
        this.getCodeBudgetAsBE = response.responseObject;
        this.getCodeBudgetAsRBE = response.responseObject;

        // below variables are used for filters
        this.filteredItemsBE = response.responseObject;
        this.filteredItemsRBE = response.responseObject;
        this.totalfilterlength = this.filteredItemsBE.length;
        console.log(this.totalfilterlength, 'this.totalfilterlength');
        this.totalDatalength = this.totalfilterlength

        console.log('CodeAndSName ===== ', this.getCodeBudgetAsBE);
        console.log('CodeAndSName RBE ===== ', this.getCodeBudgetAsRBE);

      }
    );
  }

  getyearApiForBE() {
    var paramValue: { [key: string]: string } = {};

    paramValue['division'] = this.loginDivision;
    this.apiCall.apiPostCall_Query(`api/be/yearWiseasbe`, paramValue).subscribe(
      (yearRes) => {
        console.log(yearRes.responseObject);
        this.asBeRbeYear = yearRes.responseObject;
        console.log(this.asBeRbeYear, 'this.asBeRbeYear');
        if (yearRes) {
          this.getFixedAmountForAsBE(yearRes.responseObject);
        }
      }
    );
  }

  getyearApiForRBE() {
    var paramValue: { [key: string]: string } = {};

    paramValue['division'] = this.loginDivision;
    this.apiCall.apiPostCall_Query(`api/rbe/yearWiseasrbe`, paramValue).subscribe(
      (yearRes) => {
        console.log(yearRes.responseObject);
        this.asBeRbeYear = yearRes.responseObject;
        console.log(this.asBeRbeYear, 'this.asBeRbeYear');
        if (yearRes) {
          this.getFixedAmountForAsRBE(yearRes.responseObject);
        }
      }
    );
  }

  getFixedAmountForAsBE(year: any) {

    var paramValue: { [key: string]: string } = {};

    paramValue['beLastYear'] = year;
    paramValue['division'] = this.loginDivision;

    this.apiCall.apiPostCall_Query(`api/be/getBeLastFixed`, paramValue).subscribe(
      (response) => {
        console.log(response.responseObject);
        let fixedValueAsBE = response.responseObject;

        fixedValueAsBE.forEach((data) => {
          this.beLastFixedTotal += data.beLastFixed || 0
        });

        fixedValueAsBE.forEach((value) => {
          this.getCodeBudgetAsBE.forEach((element) => {
            element.asProposedBE
            element.asFixedBE
            element.asReferanceBE
            element.asProposedTotalBE
            element.asFixedTotalBE
            if (value.code.codeNumber == element.codeNumber) {
              element.beLastFixed = value.beLastFixed
              element.beId = value.id
              element.subCodeBE = value.subCodeBE
              element.beLastFixedTotal = this.beLastFixedTotal
            }
            element.subCodeASBES = [];
          });
        });
        console.log(this.getCodeBudgetAsBE, 'this.getCodeBudgetAsBE');
      }
    );
  }
  getFixedAmountForAsRBE(year: any) {

    var paramValue: { [key: string]: string } = {};

    paramValue['rbeYear'] = year;
    paramValue['division'] = this.loginDivision;

    this.apiCall.apiPostCall_Query(`api/rbe/getRbeFixed`, paramValue).subscribe(
      (response) => {
        console.log(response.responseObject);
        let fixedValueAsRBE = response.responseObject;

        fixedValueAsRBE?.forEach(element => {
          this.rbeLastFixedTotal += element.rbeFixed
        });

        fixedValueAsRBE?.forEach((value) => {
          this.getCodeBudgetAsRBE?.forEach((element) => {
            element.asProposedRBE
            element.asFixedRBE
            element.asRemarksRBE
            element.asProposedTotalRBE
            element.asFixedTotalRBE
            if (value.code.codeNumber == element.codeNumber) {
              element.rbeFixed = value.rbeFixed
              element.rbeId = value.id
              element.subCodeRBE = value.subCodeRBE
              element.rbeLastFixedTotal = this.rbeLastFixedTotal
            }
            element.subCodeASRBES = [];

          });
        });
        console.log(this.getCodeBudgetAsRBE, 'getCodeBudgetAsRBE');

      }
    );

  }

  searchFilter(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.searchValue = event.target.value
    // Filter based on codeName and codeNumber
    if (this.asBeRbe == 'AS-BE') {
      if (!searchValue) {
        this.getCodeBudgetAsBE = [...this.filteredItemsBE];
        this.totalDatalength = this.getCodeBudgetAsBE.length;

      }
      else {
        this.getCodeBudgetAsBE = this.filteredItemsBE.filter(item =>
          item.codeName.toLowerCase().includes(searchValue) ||
          item.codeNumber.toLowerCase().includes(searchValue)
        );
        this.totalDatalength = this.getCodeBudgetAsBE.length;

      }
      this.applyDecimalFormattingBE();
      this.calculateTotalsBE();

    }
    else if (this.asBeRbe == 'AS-RBE') {
      if (!searchValue) {
        this.getCodeBudgetAsRBE = [...this.filteredItemsRBE];
        this.totalDatalength = this.getCodeBudgetAsBE.length;
      }
      else {
        this.getCodeBudgetAsRBE = this.filteredItemsRBE.filter(item =>
          item.codeName.toLowerCase().includes(searchValue) ||
          item.codeNumber.toLowerCase().includes(searchValue)
        );
        this.totalDatalength = this.getCodeBudgetAsBE.length;

      }
      this.applyDecimalFormattingRBE()
      this.calculateTotalsRBE();
    }
  }

  applyDecimalFormattingBE() {
    this.getCodeBudgetAsBE.forEach(element => {
      if (element.asProposedBE !== undefined) {
        element.asProposedBE = (+element.asProposedBE || 0).toFixed(2)
      }
      if (element.asFixedBE !== undefined) {
        element.asFixedBE = (+element.asFixedBE || 0).toFixed(2)
      }
    });
  }

  applyDecimalFormattingRBE() {
    this.getCodeBudgetAsRBE.forEach(element => {
      if (element.asProposedRBE !== undefined) {
        element.asProposedRBE = (+element.asProposedRBE || 0).toFixed(2)
      }
      if (element.asFixedRBE !== undefined) {
        element.asFixedRBE = (+element.asFixedRBE || 0).toFixed(2)
      }
    });
  }

  input() {
    console.log(this.getCodeBudgetAsBE, 'getCodeBudgetAsBE');
  }
  inputRBE() {
    console.log(this.getCodeBudgetAsRBE, 'getCodeBudgetAsRBE');
  }

  calculateTotalsBE() {

    let asProposedBE = 0
    let asFixedBE = 0
    for (let item of this.getCodeBudgetAsBE) {
      asProposedBE += +item.asProposedBE || 0;
      asFixedBE += +item.asFixedBE || 0;
    }
    this.getCodeBudgetAsBE.forEach(item => {
      item.asProposedTotalBE = asProposedBE;
      item.asFixedTotalBE = asFixedBE;
      item.asBeTotal = parseInt(item.beLastFixed) || 0 + parseInt(item.asFixedBE) || 0
    });

    this.asProposedTotalBE = this.getCodeBudgetAsBE[0].asProposedTotalBE
    this.asFixedTotalBE = this.getCodeBudgetAsBE[0].asFixedTotalBE

    console.log(this.getCodeBudgetAsBE, 'getCodeBudgetAsBE');

    console.log(asProposedBE, 'asProposedBE');
    console.log(asFixedBE, 'asFixedBE');
  }

  calculateTotalsRBE() {
    let asProposedRBE = 0
    let asFixedRBE = 0

    for (let item of this.getCodeBudgetAsRBE) {
      asProposedRBE += +item.asProposedRBE || 0
      asFixedRBE += +item.asFixedRBE || 0
    }

    this.getCodeBudgetAsRBE.forEach(item => {
      item.asProposedTotalRBE = asProposedRBE;
      item.asFixedTotalRBE = asFixedRBE;
      item.asRbeTotal = parseInt(item.rbeFixed) || 0 + parseInt(item.asFixedRBE) || 0
    });

    this.asProposedTotalRBE = this.getCodeBudgetAsRBE[0].asProposedTotalRBE
    this.asFixedTotalRBE = this.getCodeBudgetAsRBE[0].asFixedTotalRBE

    console.log(this.getCodeBudgetAsRBE, 'getCodeBudgetAsRBE');

    console.log(asProposedRBE, 'asProposedRBE');
    console.log(asFixedRBE, 'asFixedRBE');
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

  backButton() {
    this.router.navigate(['/famodule/home/as-table']);
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
      console.log(data, 'data');
      this.AfterClosedData = data.subCodeAsBeRbe

      if (data.asBeRbe == 'AS-BE') {
        let asProposedBE = 0
        let asFixedBE = 0

        data.subCodeAsBeRbe.forEach((value) => {
          asProposedBE += +value.subAsBeProposed
          asFixedBE += +value.subAsBeFixed
        });

        this.getCodeBudgetAsBE[data.index].subCodeASBES = data.subCodeAsBeRbe;
        this.getCodeBudgetAsBE[data.index].asProposedBE = (asProposedBE).toFixed(2);
        this.getCodeBudgetAsBE[data.index].asFixedBE = (asFixedBE).toFixed(2);
        this.calculateTotalsBE();
        console.log(this.getCodeBudgetAsBE, 'this.getCodeBudgetAsBE');
      }
      else if (data.asBeRbe == 'AS-RBE') {
        let asProposedRBE = 0
        let asFixedRBE = 0

        data.subCodeAsBeRbe.forEach((value) => {
          asProposedRBE += +value.subAsRbeProposed
          asFixedRBE += +value.subAsRbeFixed
        });

        this.getCodeBudgetAsBE[data.index].subCodeASRBES = data.subCodeAsBeRbe;
        this.getCodeBudgetAsBE[data.index].asProposedRBE = (asProposedRBE).toFixed(2);
        this.getCodeBudgetAsBE[data.index].asFixedRBE = (asFixedRBE).toFixed(2);
        this.calculateTotalsRBE();
        console.log(this.getCodeBudgetAsBE, 'this.getCodeBudgetAsBE');
      }

    });
  }

  asBeSave() {
    if (this.searchValue != '') {
      this.snackbar.open('Clear The Search Filter To Save the Data', 'close', { duration: 3500 })
    }
    else {
      this.isLoading = true;
      console.log('as-be save');
      let dataToSaveAsBe = [];
      if (this.loginRole == 'EE_Division') {
        this.getCodeBudgetAsBE.forEach(element => {
          let asBeTotal = 0
          asBeTotal = parseInt(element?.beLastFixed || 0) + parseInt(element?.asFixedBE || 0)
          let data = {
            codeId: element.id,
            beId: element.beId || 0,
            division: this.loginDivision,
            beLastYear: this.asBeRbeYear,
            beLastFixed: +element.beLastFixed || 0,
            asBeFixed: +element.asFixedBE || 0,
            asBeProposed: +element.asProposedBE || 0,
            asBeTotal: asBeTotal || 0,
            asBeFixedTotal: +element.asFixedTotalBE || 0,
            asBeProposedTotal: +element.asProposedTotalBE || 0,
            beLastFixedTotal: +element.beLastFixedTotal || 0,
            remarks: element.asReferanceBE,
            // EE suggestions
            eeStatus: 'Active',
            eeSignature: this.suggestionForm.get('eeSignatureBE').value,
            eeRemarks: this.suggestionForm.get('eeRemarksBE').value,
            eeDate: this.formatDate(this.suggestionForm.get('eeDateBE').value),
            // AO suggestions
            aoStatus: '',
            aoSignature: '',
            aoRemarks: '',
            aoDate: '',
            // DCAO suggestions
            dcaoStatus: '',
            dcaoSignature: '',
            dcaoRemarks: '',
            dcaoDate: '',
            // FA suggestions
            faStatus: '',
            faSignature: '',
            faRemarks: '',
            faDate: '',

            creater: this.loginRole,
            subCodeASBES: element.subCodeASBES || []
          }

          dataToSaveAsBe.push(data);
        });
      }
      else if (this.loginRole == 'AO') {
        this.getCodeBudgetAsBE.forEach(element => {
          let asBeTotal = 0
          asBeTotal = parseInt(element?.beLastFixed || 0) + parseInt(element?.asFixedBE || 0)
          let data = {
            codeId: element.id,
            beId: element.beId || 0,
            division: this.loginDivision,
            beLastYear: this.asBeRbeYear,
            beLastFixed: +element.beLastFixed || 0,
            asBeFixed: +element.asFixedBE || 0,
            asBeProposed: +element.asProposedBE || 0,
            asBeTotal: asBeTotal || 0,
            asBeFixedTotal: +element.asFixedTotalBE || 0,
            asBeProposedTotal: +element.asProposedTotalBE || 0,
            beLastFixedTotal: +element.beLastFixedTotal || 0,
            remarks: element.asReferanceBE,
            // EE suggestions
            eeStatus: '',
            eeSignature: '',
            eeRemarks: '',
            eeDate: '',
            // AO suggestions
            aoStatus: '',
            aoSignature: this.suggestionForm.get('aoSignatureBE').value,
            aoRemarks: this.suggestionForm.get('aoRemarksBE').value,
            aoDate: this.formatDate(this.suggestionForm.get('aoDateBE').value),
            // DCAO suggestions
            dcaoStatus: '',
            dcaoSignature: '',
            dcaoRemarks: '',
            dcaoDate: '',
            // FA suggestions
            faStatus: '',
            faSignature: '',
            faRemarks: '',
            faDate: '',

            creater: this.loginRole,
            subCodeASBES: element.subCodeASBES || []
          }

          dataToSaveAsBe.push(data);
        });
      }

      console.log(dataToSaveAsBe, 'save As-BE');

      this.apiCall.apiPostCall(`api/asbe/create`, dataToSaveAsBe).subscribe((saveRes) => {
        console.log(saveRes, 'saveRes');
        if (saveRes) {
          this.isLoading = false;
          this.snackbar.open('Addition Sanction Budget Estimate Saved Successfully', 'close', { duration: 3000 });
          this.backButton();
        }
      });
    }

  }

  asRbeSave() {
    if (this.searchValue != '') {
      this.snackbar.open('Clear The Search Filter To Save the Data', 'close', { duration: 3500 })
    }
    else {
      this.isLoading = true;
      console.log('as-rbe save');
      let dataToSaveAsRbe = [];

      if (this.loginRole == 'EE_Division') {
        this.getCodeBudgetAsRBE.forEach(element => {
          let asRbeTotal = 0
          asRbeTotal = parseInt(element?.rbeFixed || 0) + parseInt(element?.asFixedRBE || 0)
          let data = {
            codeId: element.id,
            rbeId: element.rbeId || 0,
            division: this.loginDivision,
            rbeYear: this.asBeRbeYear,
            rbeLastFixed: +element.rbeFixed || 0,
            asRbeFixed: +element.asFixedRBE || 0,
            asRbeProposed: +element.asProposedRBE || 0,
            asRbeTotal: asRbeTotal || 0,

            asRbeFixedTotal: +element.asFixedTotalRBE || 0,
            asRbeProposedTotal: +element.asProposedTotalRBE || 0,
            rbeLastFixedTotal: +element.rbeLastFixedTotal || 0,

            remarksRbe: element.asRemarksRBE,
            // EE suggestions
            eeStatusRbe: 'Active',
            eeSignatureRbe: this.suggestionForm.get('eeSignatureRBE').value,
            eeRemarksRbe: this.suggestionForm.get('eeRemarksRBE').value,
            eeDateRbe: this.formatDate(this.suggestionForm.get('eeDateRBE').value),
            // AO suggestions
            aoStatusRbe: '',
            aoSignatureRbe: '',
            aoRemarksRbe: '',
            aoDateRbe: '',
            // DCAO suggestions
            dcaoStatusRbe: '',
            dcaoSignatureRbe: '',
            dcaoRemarksRbe: '',
            dcaoDateRbe: '',
            // FA suggestions
            faStatusRbe: '',
            faSignatureRbe: '',
            faRemarksRbe: '',
            faDateRbe: '',

            creater: this.loginRole,
            subCodeASRBES: element.subCodeASRBES || []
          }

          dataToSaveAsRbe.push(data);
        });
      }
      else if (this.loginRole == 'AO') {
        this.getCodeBudgetAsRBE.forEach(element => {
          let asRbeTotal = 0
          asRbeTotal = parseInt(element?.rbeFixed || 0) + parseInt(element?.asFixedRBE || 0)
          let data = {
            codeId: element.id,
            rbeId: element.rbeId || 0,
            division: this.loginDivision,
            rbeYear: this.asBeRbeYear,
            rbeLastFixed: +element.rbeFixed || 0,
            asRbeFixed: +element.asFixedRBE || 0,
            asRbeProposed: +element.asProposedRBE || 0,
            asRbeTotal: asRbeTotal || 0,

            asRbeFixedTotal: +element.asFixedTotalRBE || 0,
            asRbeProposedTotal: +element.asProposedTotalRBE || 0,
            rbeLastFixedTotal: +element.rbeLastFixedTotal || 0,

            remarksRbe: element.asRemarksRBE,
            // EE suggestions
            eeStatusRbe: '',
            eeSignatureRbe: '',
            eeRemarksRbe: '',
            eeDateRbe: '',
            // AO suggestions
            aoStatusRbe: '',
            aoSignatureRbe: this.suggestionForm.get('aoSignatureRBE').value,
            aoRemarksRbe: this.suggestionForm.get('aoRemarksRBE').value,
            aoDateRbe: this.formatDate(this.suggestionForm.get('aoDateRBE').value),
            // DCAO suggestions
            dcaoStatusRbe: '',
            dcaoSignatureRbe: '',
            dcaoRemarksRbe: '',
            dcaoDateRbe: '',
            // FA suggestions
            faStatusRbe: '',
            faSignatureRbe: '',
            faRemarksRbe: '',
            faDateRbe: '',

            creater: this.loginRole,
            subCodeASRBES: element.subCodeASRBES || []
          }

          dataToSaveAsRbe.push(data);
        });
      }

      console.log(dataToSaveAsRbe, 'dataToSaveAsRbe');

      this.apiCall.apiPostCall(`api/asrbe/create`, dataToSaveAsRbe).subscribe((saveRes) => {
        if (saveRes) {
          this.isLoading = false;
          this.snackbar.open('Addition Sanction Budget Estimate Saved Successfully', 'close', { duration: 3000 });
          this.backButton();
        }
      });
    }

  }

  asBeDraft() {
    if (this.searchValue != '') {
      this.snackbar.open('Clear The Search Filter To Draft the Data', 'close', { duration: 3500 })
    }
    else {
      this.isLoading = true;
      console.log('as-be save');
      let dataToSaveAsBe = [];

      if (this.loginRole == 'EE_Division') {
        this.getCodeBudgetAsBE.forEach(element => {
          let asBeTotal = 0
          asBeTotal = parseInt(element?.beLastFixed || 0) + parseInt(element?.asFixedBE || 0)
          let data = {
            codeId: element.id,
            beId: element.beId || 0,
            division: this.loginDivision,
            beLastYear: this.asBeRbeYear,
            beLastFixed: +element.beLastFixed || 0,
            asBeFixed: +element.asFixedBE || 0,
            asBeProposed: +element.asProposedBE || 0,
            asBeTotal: asBeTotal || 0,
            asBeFixedTotal: +element.asFixedTotalBE || 0,
            asBeProposedTotal: +element.asProposedTotalBE || 0,
            beLastFixedTotal: +element.beLastFixedTotal || 0,
            remarks: element.asReferanceBE,
            // EE suggestions
            eeStatus: 'Draft',
            eeSignature: this.suggestionForm.get('eeSignatureBE').value,
            eeRemarks: this.suggestionForm.get('eeRemarksBE').value,
            eeDate: this.formatDate(this.suggestionForm.get('eeDateBE').value),
            // AO suggestions
            aoStatus: '',
            aoSignature: '',
            aoRemarks: '',
            aoDate: '',
            // DCAO suggestions
            dcaoStatus: '',
            dcaoSignature: '',
            dcaoRemarks: '',
            dcaoDate: '',
            // FA suggestions
            faStatus: '',
            faSignature: '',
            faRemarks: '',
            faDate: '',

            creater: this.loginRole,
            subCodeASBES: element.subCodeASBES || []
          }

          dataToSaveAsBe.push(data);
        });
      }
      else if (this.loginRole == 'AO') {
        this.getCodeBudgetAsBE.forEach(element => {
          let asBeTotal = 0
          asBeTotal = parseInt(element?.beLastFixed || 0) + parseInt(element?.asFixedBE || 0)
          let data = {
            codeId: element.id,
            beId: element.beId,
            division: this.loginDivision,
            beLastYear: this.asBeRbeYear,
            beLastFixed: +element.beLastFixed || 0,
            asBeFixed: +element.asFixedBE || 0,
            asBeProposed: +element.asProposedBE || 0,
            asBeTotal: asBeTotal || 0,
            asBeFixedTotal: +element.asFixedTotalBE || 0,
            asBeProposedTotal: +element.asProposedTotalBE || 0,
            beLastFixedTotal: +element.beLastFixedTotal || 0,
            remarks: element.asReferanceBE,
            // EE suggestions
            eeStatus: '',
            eeSignature: '',
            eeRemarks: '',
            eeDate: '',
            // AO suggestions
            aoStatus: 'Draft',
            aoSignature: this.suggestionForm.get('aoSignatureBE').value,
            aoRemarks: this.suggestionForm.get('aoRemarksBE').value,
            aoDate: this.formatDate(this.suggestionForm.get('aoDateBE').value),
            // DCAO suggestions
            dcaoStatus: '',
            dcaoSignature: '',
            dcaoRemarks: '',
            dcaoDate: '',
            // FA suggestions
            faStatus: '',
            faSignature: '',
            faRemarks: '',
            faDate: '',

            creater: this.loginRole,
            subCodeASBES: element.subCodeASBES || []
          }

          dataToSaveAsBe.push(data);
        });
      }

      console.log(dataToSaveAsBe, 'save As-BE');

      this.apiCall.apiPostCall(`api/asbe/create`, dataToSaveAsBe).subscribe((saveRes) => {
        console.log(saveRes, 'saveRes');
        if (saveRes) {
          this.isLoading = false;
          this.snackbar.open('Addition Sanction Budget Estimate Saved Successfully', 'close', { duration: 3000 });
          this.backButton();
        }
      });
    }
  }

  asRbeDraft() {
    if (this.searchValue != '') {
      this.snackbar.open('Clear The Search Filter To Draft the Data', 'close', { duration: 3500 })
    }
    else {
      this.isLoading = true;
      console.log('as-rbe save');
      let dataToSaveAsRbe = [];

      if (this.loginRole == 'EE_Division') {
        this.getCodeBudgetAsRBE.forEach(element => {
          let asRbeTotal = 0
          asRbeTotal = parseInt(element?.rbeFixed || 0) + parseInt(element?.asFixedRBE || 0)
          let data = {
            codeId: element.id,
            rbeId: element.rbeId || 0,
            division: this.loginDivision,
            rbeYear: this.asBeRbeYear,
            rbeLastFixed: +element.rbeFixed || 0,
            asRbeFixed: +element.asFixedRBE || 0,
            asRbeProposed: +element.asProposedRBE || 0,
            asRbeTotal: asRbeTotal || 0,

            asRbeFixedTotal: +element.asFixedTotalRBE || 0,
            asRbeProposedTotal: +element.asProposedTotalRBE || 0,
            rbeLastFixedTotal: +element.rbeLastFixedTotal || 0,

            remarksRbe: element.asRemarksRBE,
            // EE suggestions
            eeStatusRbe: 'Draft',
            eeSignatureRbe: this.suggestionForm.get('eeSignatureRBE').value,
            eeRemarksRbe: this.suggestionForm.get('eeRemarksRBE').value,
            eeDateRbe: this.formatDate(this.suggestionForm.get('eeDateRBE').value),
            // AO suggestions
            aoStatusRbe: '',
            aoSignatureRbe: '',
            aoRemarksRbe: '',
            aoDateRbe: '',
            // DCAO suggestions
            dcaoStatusRbe: '',
            dcaoSignatureRbe: '',
            dcaoRemarksRbe: '',
            dcaoDateRbe: '',
            // FA suggestions
            faStatusRbe: '',
            faSignatureRbe: '',
            faRemarksRbe: '',
            faDateRbe: '',

            creater: this.loginRole,
            subCodeASRBES: element.subCodeASRBES || []
          }

          dataToSaveAsRbe.push(data);
        });

      }
      else if (this.loginRole == 'AO') {
        this.getCodeBudgetAsRBE.forEach(element => {
          let asRbeTotal = 0
          asRbeTotal = parseInt(element?.rbeFixed || 0) + parseInt(element?.asFixedRBE || 0)
          let data = {
            codeId: element.id,
            rbeId: element.rbeId || 0,
            division: this.loginDivision,
            rbeYear: this.asBeRbeYear,
            rbeLastFixed: +element.rbeFixed || 0,
            asRbeFixed: +element.asFixedRBE || 0,
            asRbeProposed: +element.asProposedRBE || 0,
            asRbeTotal: asRbeTotal || 0,

            asRbeFixedTotal: +element.asFixedTotalRBE || 0,
            asRbeProposedTotal: +element.asProposedTotalRBE || 0,
            rbeLastFixedTotal: +element.rbeLastFixedTotal || 0,

            remarksRbe: element.asRemarksRBE,
            // EE suggestions
            eeStatusRbe: '',
            eeSignatureRbe: '',
            eeRemarksRbe: '',
            eeDateRbe: '',
            // AO suggestions
            aoStatusRbe: 'Draft',
            aoSignatureRbe: this.suggestionForm.get('aoSignatureRBE').value,
            aoRemarksRbe: this.suggestionForm.get('aoRemarksRBE').value,
            aoDateRbe: this.formatDate(this.suggestionForm.get('aoDateRBE').value),
            // DCAO suggestions
            dcaoStatusRbe: '',
            dcaoSignatureRbe: '',
            dcaoRemarksRbe: '',
            dcaoDateRbe: '',
            // FA suggestions
            faStatusRbe: '',
            faSignatureRbe: '',
            faRemarksRbe: '',
            faDateRbe: '',

            creater: this.loginRole,
            subCodeASRBES: element.subCodeASRBES || []
          }

          dataToSaveAsRbe.push(data);
        });
      }

      console.log(dataToSaveAsRbe, 'dataToSaveAsRbe');

      this.apiCall.apiPostCall(`api/asrbe/create`, dataToSaveAsRbe).subscribe((saveRes) => {
        if (saveRes) {
          this.isLoading = false;
          this.snackbar.open('Addition Sanction Budget Estimate Saved Successfully', 'close', { duration: 3000 });
          this.backButton();
        }
      });
    }

  }


  buttonName() {
    if (this.loginRole == 'EE_Division') {
      this.buttonNameValue = 'Forward To AO';
    }
    else if (this.loginRole == 'AO') {
      this.buttonNameValue = 'Submit';
    }
    else if (this.loginRole == 'DCAO') {
      this.buttonNameValue = 'Sumbmit';
    }
    else if (this.loginRole == 'FA') {
      this.buttonNameValue = 'Approve';
    }
  }

}
