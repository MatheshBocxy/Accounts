import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ApiservicesService } from '../../service/apiservices.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { SubCodePopupformComponent } from '../sub-code-popupform/sub-code-popupform.component';

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrl: './new-budget.component.css',
})
export class NewBudgetComponent implements OnInit {
  budgetDateSource: any;
  scheduleNumberID: any;

  yearMonthFormBE: FormGroup;
  // yearMonthFormRBE: FormGroup;

  allYearsBE: any;
  actualsToatls: any;

  totalActual: number = 0;
  // totalActual: any;
  totalBe: number = 0;
  totalRbe: number = 0;
  totalActualUpto: number = 0;
  totalBeProposed: number = 0;
  totalBeFixed: number = 0;
  FatchYear: any;
  userDivision: string;
  roleName: any;
  // ---------RBE-------

  rbeBudgetDataSource: any;
  yearMonthRbeForm: FormGroup;

  totalActualRbe: number = 0;
  totalBeRbe: number = 0;
  totalActualUptoRbe: number = 0;
  totalBeProposedRbe: number = 0;
  totalBeFixedRbe: number = 0;
  valueZero: number = 0;

  statusUpdate: string;
  // --------------------

  getAllBudgetValues: any;
  groupTotalValues: any;

  // beRbe: string = 'BE';
  beRbe: string;

  Decimalvalue: string;

  AROremarksForm: FormGroup;
  AROremarksFormRbe: FormGroup;

  AEEremarksForm: FormGroup;
  AEEremarksFormRbe: FormGroup;

  ACCremarksForm: FormGroup;
  ACCremarksFormRbe: FormGroup;

  AOremarksForm: FormGroup;
  AOremarksFormRbe: FormGroup;

  ROremarksForm: FormGroup;
  ROremarksFormRbe: FormGroup;

  eeTcellremarksForm: FormGroup;
  eeTcellremarksFormRbe: FormGroup;

  resourcesData: any[] = [];
  resourcesRBEData: any[] = [];
  commitmentsData: any[] = [];
  commitmentsRBEData: any[] = [];
  filteredData: any[] = [];

  panelOpenState = false;
  beRbeValue: any = 0
  beRbeValueParams: any;
  subCodeDataValues: any;

  beRbeactualsYear: any;
  beRbeYear: any;
  beRbeactualsUpToYear: any;
  beRbeLastYear: any;
  selectedMonthValue: any;

  actualsYearResponceBE: any;
  rbeYearResponceBE: any;
  actualsUpToYearResponceBE: any;
  beLastYearResponceBE: any;

  actualsYearResponceRBE: any;
  beYearResponceRBE: any;
  actualsUpToYearResponceRBE: any;
  beLastYearResponceRBE: any;

  snackbarShown = false;
  buttonNames: any;
  searchValues: any;
  filteredBudgetDateSourceBE: any;
  filteredBudgetDateSourceRBE: any;
  budgetDateSourceBELength: any;
  budgetDateSourceRBELength: any;
  allCodeDataBeRbe: any;
  isLoading = false;
  searchFilterValue = '';

  constructor(
    private apiCall: ApiservicesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private decimalPipe: DecimalPipe,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.userDivision = sessionStorage.getItem('division');
    this.roleName = sessionStorage.getItem('role');
    console.log(this.roleName, this.userDivision);
  }

  ngOnInit(): void {
    this.yearMonthFormBE = this.fb.group({

      actualsUpToMonths: ['December'],

      actualsYear: [''],
      beYear: [''],
      rbeYear: [''],
      actualsUpToYear: [''],
      beLastYear: [''],

      schedule: [''],
      codeNumber: [''],
      codeName: [''],

      actualstotal: [''],
      beTotal: [''],
      rbeTotal: [''],
      actualsUpToTotal: [''],
      beLastTotal: [''],
      beLastYearProposedTotal: [''],
      beLastYearFixedTotal: [''],

      actualValue: [''],
      rbe: [''],
      actualsUpTo: [''],
      beLastYearProposed: [''],
      beLastYearFixed: [''],

      subCodeBES: this.fb.array([])

    });

    this.yearMonthRbeForm = this.fb.group({
      actualsYearRbe: [''],
      beYearRbe: [''],
      actualsUpToYearRbe: [''],
      lastRbeYear: [''],
      actualsUpToMonthRbe: ['September'],

      // 'actualRbe':[''],
      // 'beRbe':[''],
      // 'actualsUpToRbe':[''],
      // 'lastRbeProposed':[''],
      // 'lastRbeFixed':[''],

      actualTotalRbe: [''],
      beTotalRbe: [''],
      actualsUpToTotalRbe: [''],
      lastRbeProposedTotal: [''],
      lastRbeFixedTotal: [''],
    });

    this.AROremarksForm = this.fb.group({
      aroDivisionRemarks: ['', Validators.required],
      aroDivisionSignature: ['', Validators.required],
      aroDivisionDate: ['', Validators.required],
    });

    this.AROremarksFormRbe = this.fb.group({
      aroDivisionRemarksRbe: ['', Validators.required],
      aroDivisionSignatureRbe: ['', Validators.required],
      aroDivisionDateRbe: ['', Validators.required],
    });

    this.AEEremarksForm = this.fb.group({
      aeeDivisionRemarks: ['', Validators.required],
      aeeDivisionSignature: ['', Validators.required],
      aeeDivisionDate: ['', Validators.required],
    });

    this.AEEremarksFormRbe = this.fb.group({
      aeeDivisionRemarksRbe: ['', Validators.required],
      aeeDivisionSignatureRbe: ['', Validators.required],
      aeeDivisionDateRbe: ['', Validators.required],
    });

    this.ACCremarksForm = this.fb.group({
      accClerkRemarks: ['', Validators.required],
      accDivisionSignature: ['', Validators.required],
      accDivisionDate: ['', Validators.required],
    });

    this.ACCremarksFormRbe = this.fb.group({
      accClerkRemarksRbe: ['', Validators.required],
      accDivisionSignatureRbe: ['', Validators.required],
      accDivisionDateRbe: ['', Validators.required],
    });

    this.ROremarksForm = this.fb.group({
      roRemarks: ['', Validators.required],
      roSignature: ['', Validators.required],
      roDate: ['', Validators.required],
    });

    this.ROremarksFormRbe = this.fb.group({
      roRemarksRbe: ['', Validators.required],
      roSignatureRbe: ['', Validators.required],
      roDateRbe: ['', Validators.required],
    });

    this.AOremarksForm = this.fb.group({
      aoRemarks: ['', Validators.required],
      aoSignature: ['', Validators.required],
      aoDate: ['', Validators.required],
    })

    this.AOremarksFormRbe = this.fb.group({
      aoRemarksRbe: ['', Validators.required],
      aoSignatureRbe: ['', Validators.required],
      aoDateRbe: ['', Validators.required],
    })

    this.eeTcellremarksForm = this.fb.group({
      eeTCellRemarks: ['', Validators.required],
      eeTCellSignature: ['', Validators.required],
      eeTCellDate: ['', Validators.required],
    });

    this.eeTcellremarksFormRbe = this.fb.group({
      eeTCellRemarksRbe: ['', Validators.required],
      eeTCellSignatureRbe: ['', Validators.required],
      eeTCellDateRbe: ['', Validators.required],
    });

    this.getAllCodeAndSName();
    this.beRbeValueParams = this.route.snapshot.paramMap.get('value');
    console.log(this.beRbeValueParams, 'this.route.snapshot.paramMap.get(value)');
    this.beRbeButton();
    if (this.beRbeValueParams == 0) {
      this.getYearAuto();
    }
    else if (this.beRbeValueParams == 1) {
      this.getYearAutoRbe();
    }

    this.submitButtonName();
  }

  submitButtonName() {
    if (this.roleName == 'ARO_Division') {
      this.buttonNames = 'Forward To MMS'
    }
    else if (this.roleName == 'AEE_Division') {
      this.buttonNames = 'Forward To AE_Plan'
    }
    else if (this.roleName == 'ACC_Clerk') {
      this.buttonNames = 'Forward To DA'
    }
    else if (this.roleName == 'RO') {
      this.buttonNames = 'Forward To CRO'
    }
    else if (this.roleName == 'AO') {
      this.buttonNames = 'Forward To DCAO'
    }
    else if (this.roleName == 'EE_T_CELL') {
      this.buttonNames = 'Forward To SE'
    }
  }

  backButtonClick() {
    this.router.navigate(['/famodule/home/budget']);
  }

  selectedMonthBeRbe(event: any) {
    this.selectedMonthValue = event.target.value;
    console.log(this.selectedMonthValue, 'this.selectedMonthValue');
  }

  openPanelSubCode(responce: any, i: any, type: any, beRbe: any) {

    let beRbeValue = beRbe;
    let actualYear;
    let beRbeYear;
    let actualUpToYear;
    let beRbeLastYear;
    let month = '';

    if (beRbe == 'be') {
      month = this.yearMonthFormBE?.get('actualsUpToMonths')?.value
      console.log(month, 'month be');
    }
    else {
      month = this.yearMonthRbeForm?.get('actualsUpToMonthRbe')?.value
      console.log(month, 'month rbe');
    }

    let openDialogBox = this.dialog.open(SubCodePopupformComponent, {
      width: '2000px',
      height: '500px',
      data: {
        index: i,
        userDivision: this.userDivision,
        responce: responce,
        type: type,
        beRbe: beRbe,
        month: month,
        beRbeactualsYear: this.beRbeactualsYear,
        beRbeYear: this.beRbeYear,
        beRbeactualsUpToYear: this.beRbeactualsUpToYear,
        beRbeLastYear: this.beRbeLastYear,
      }
    });

    openDialogBox.afterClosed().subscribe((data) => {
      let id = data.id;
      let index = data.index;
      let beRbe = data.beRbe;
      let subCodeResponce = data.subCodeArray
      let subCodeBESArray = [];
      let subCodeRBESArray = [];

      let subActualsSum: number = 0
      let subRbeSum: number = 0
      let subActualsUptoSum: number = 0
      let subBeProposedSum: number = 0
      let subBeFixedSum: number = 0

      let subActualsRBESum: number = 0
      let subBeRBESum: number = 0
      let subActualsUptoRBESum: number = 0
      let subBeProposedRBESum: number = 0
      let subBeFixedRBESum: number = 0

      console.log(data, 'data');
      console.log(subCodeResponce, 'subCodeResponce');
      console.log(id, 'id');
      console.log(index, 'index');
      console.log(type, 'type');

      // BE Patch values

      if (beRbeValue == 'be') {
        console.log('this BE patch');

        if (subCodeResponce) {
          subCodeResponce.forEach((element) => {
            subActualsSum += (element.subActuals);
            subRbeSum += (element.subRbe);
            subActualsUptoSum += (element.subActualsUpto);
            subBeProposedSum += (element.subBeProposed);
            subBeFixedSum += (element.subBeFixed);
          });
          console.log(subActualsSum, 'subActualsSum');
          console.log(subRbeSum, 'subRbeSum');
          console.log(subActualsUptoSum, 'subActualsUptoSum');
          console.log(subBeProposedSum, 'subBeProposedSum');
          console.log(subBeFixedSum, 'subBeFixedSum');
        }

        this.budgetDateSource[index].actual = (subActualsSum).toFixed(2);
        this.budgetDateSource[index].rbe = (subRbeSum).toFixed(2);
        this.budgetDateSource[index].actualsUpTo = (subActualsUptoSum).toFixed(2);
        this.budgetDateSource[index].beLastYearProposed = (subBeProposedSum).toFixed(2);
        this.budgetDateSource[index].beLastYearFixed = (subBeFixedSum).toFixed(2);
        this.budgetDateSource[index].subCodeBES = subCodeBESArray;
        console.log(this.budgetDateSource[index], 'this.budgetDateSource[index]');
        this.calculateTotals();

        console.log(this.budgetDateSource, 'this.budgetDateSource[index]');

        subCodeResponce.forEach((x) => {
          subCodeBESArray.push({
            subCodeName: x.subCodeName,
            subCodeDescription: x.subCodeDescription,
            subActuals: x.subActuals,
            subActualsUpto: x.subActualsUpto,
            subRbe: x.subRbe,
            subBeProposed: x.subBeProposed,
            subBeFixed: x.subBeFixed,
            subCodeIdBE: x.subCodeIdBE
          });
        });
      }
      // RBE Patch values
      else if (beRbeValue == 'rbe') {
        console.log('this RBE patch');

        if (subCodeResponce) {
          subCodeResponce.forEach((element) => {
            subActualsRBESum += (element.subActualsRbe);
            subBeRBESum += (element.subBeRbe);
            subActualsUptoRBESum += (element.subActualsUptoRbe);
            subBeProposedRBESum += (element.subRbeProposed);
            subBeFixedRBESum += (element.subRbeFixed);
          });
          console.log(subActualsRBESum, 'subActualsSum--RBE');
          console.log(subBeRBESum, 'subBeRBESum--RBE');
          console.log(subActualsUptoRBESum, 'subActualsUptoRBESum--RBE');
          console.log(subBeProposedRBESum, 'subBeProposedRBESum--RBE');
          console.log(subBeFixedRBESum, 'subBeFixedRBESum--RBE');
        }

        this.rbeBudgetDataSource[index].actualRbe = (subActualsRBESum).toFixed(2);
        this.rbeBudgetDataSource[index].beRbe = (subBeRBESum).toFixed(2);
        this.rbeBudgetDataSource[index].actualsUpToRbe = (subActualsUptoRBESum).toFixed(2);
        this.rbeBudgetDataSource[index].LastRbeProposed = (subBeProposedRBESum).toFixed(2);
        this.rbeBudgetDataSource[index].LastRbeFixed = (subBeFixedRBESum).toFixed(2);
        this.rbeBudgetDataSource[index].subCodeRBES = subCodeRBESArray;
        console.log(this.rbeBudgetDataSource[index], 'this.rbeBudgetDataSource[index]');
        this.calculateTotalsRBE();


        subCodeResponce.forEach((x) => {
          subCodeRBESArray.push({
            subCodeIdRBE: x.subCodeIdRBE,
            subCodeName: x.subCodeName,
            subCodeDescription: x.subCodeDescription,
            subActualsRbe: x.subActualsRbe,
            subActualsUptoRbe: x.subActualsUptoRbe,
            subBeRbe: x.subBeRbe,
            subRbeProposed: x.subRbeProposed,
            subRbeFixed: x.subRbeFixed,
          });
        });
      }
    });
  }

  searchFilters(event: Event) {
    let value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchFilterValue = (event.target as HTMLInputElement).value;
    console.log(this.searchFilterValue, 'this.searchFilterValue');

    if (this.beRbe == 'BE') {
      if (value == '') {
        this.budgetDateSource = [...this.filteredBudgetDateSourceBE];
        this.budgetDateSourceBELength = this.budgetDateSource.length;
        console.log(this.budgetDateSourceBELength, 'budgetDateSourceBELength');
        console.log(this.allCodeDataBeRbe, 'allCodeDataBeRbe');


      } else {
        this.budgetDateSource = this.filteredBudgetDateSourceBE.filter(item =>
          item.codeName.toLowerCase().includes(value) ||
          item.codeNumber.toLowerCase().includes(value) ||
          item.budgetHead.toLowerCase().includes(value)
        );
        this.budgetDateSourceBELength = this.budgetDateSource.length;
        console.log(this.budgetDateSourceBELength, 'budgetDateSourceBELength');
        console.log(this.allCodeDataBeRbe, 'allCodeDataBeRbe');

      }
      this.applyDecimalFormattingBE();

    } else if (this.beRbe == 'RBE') {
      if (value == '') {
        this.rbeBudgetDataSource = [...this.filteredBudgetDateSourceRBE];
        this.budgetDateSourceRBELength = this.rbeBudgetDataSource.length
        console.log(this.budgetDateSourceRBELength, 'budgetDateSourceRBELength');
        console.log(this.allCodeDataBeRbe, 'allCodeDataBeRbe');
      }
      else {
        this.rbeBudgetDataSource = this.filteredBudgetDateSourceRBE.filter(item =>
          item.codeName.toLowerCase().includes(value) ||
          item.codeNumber.toLowerCase().includes(value) ||
          item.budgetHead.toLowerCase().includes(value)
        );
        this.budgetDateSourceRBELength = this.rbeBudgetDataSource.length
        console.log(this.allCodeDataBeRbe, 'allCodeDataBeRbe');
        console.log(this.budgetDateSourceRBELength, 'budgetDateSourceRBELength');

      }
      this.applyDecimalFormattingRBE();
      this.calculateTotalsRBE()
    }

  }

  applyDecimalFormattingBE() {
    this.budgetDateSource.forEach(item => {
      if (item.actual !== undefined) {
        item.actual = (+item.actual).toFixed(2);
      }
      if (item.rbe !== undefined) {
        item.rbe = (+item.rbe).toFixed(2);
      }
      if (item.actualsUpTo !== undefined) {
        item.actualsUpTo = (+item.actualsUpTo).toFixed(2);
      }
      if (item.beLastYearProposed !== undefined) {
        item.beLastYearProposed = (+item.beLastYearProposed).toFixed(2);
      }
      if (item.beLastYearFixed !== undefined) {
        item.beLastYearFixed = (+item.beLastYearFixed).toFixed(2);
      }
    });
  }

  applyDecimalFormattingRBE() {
    this.rbeBudgetDataSource.forEach(item => {
      if (item.actualRbe !== undefined) {
        item.actualRbe = (+item.actualRbe).toFixed(2);
      }
      if (item.beRbe !== undefined) {
        item.beRbe = (+item.beRbe).toFixed(2);
      }
      if (item.actualsUpToRbe !== undefined) {
        item.actualsUpToRbe = (+item.actualsUpToRbe).toFixed(2);
      }
      if (item.LastRbeProposed !== undefined) {
        item.LastRbeProposed = (+item.LastRbeProposed).toFixed(2);
      }
      if (item.LastRbeFixed !== undefined) {
        item.LastRbeFixed = (+item.LastRbeFixed).toFixed(2);
      }
    });
  }

  fiveDigitsWarning(event: any) {
    let inputValue = event.target.value;
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

  calculateTotals() {
    // Initialize totals
    let totalActual = 0;
    let totalRbe = 0;
    let totalActualsUpTo = 0;
    let totalBELastYearProposed = 0;
    let totalBELastYearFixed = 0;

    // Loop through getYearData to calculate the totals
    for (let item of this.budgetDateSource) {
      totalActual += +item.actual || 0;
      totalRbe += +item.rbe || 0;

      totalActualsUpTo += +item.actualsUpTo || 0;
      totalBELastYearProposed += +item.beLastYearProposed || 0;
      totalBELastYearFixed += +item.beLastYearFixed || 0;
    }

    // Set the form control values
    this.yearMonthFormBE.patchValue({
      actualstotal: totalActual.toFixed(2),
      rbeTotal: totalRbe.toFixed(2),
      actualsUpToTotal: totalActualsUpTo.toFixed(2),
      beLastYearProposedTotal: totalBELastYearProposed.toFixed(2),
      beLastYearFixedTotal: totalBELastYearFixed.toFixed(2),
    });
  }

  calculateTotalsRBE() {
    let totalActual = 0;
    let totalbe = 0;
    let totalActualsUpTo = 0;
    let totalBELastYearProposed = 0;
    let totalBELastYearFixed = 0;

    for (let item of this.budgetDateSource) {
      totalActual += +item.actualRbe || 0;
      totalbe += +item.beRbe || 0;
      totalActualsUpTo += +item.actualsUpToRbe || 0;
      totalBELastYearProposed += +item.LastRbeProposed || 0;
      totalBELastYearFixed += +item.LastRbeFixed || 0;
    }

    this.yearMonthRbeForm.patchValue({
      actualTotalRbe: totalActual.toFixed(2),
      beTotalRbe: totalbe.toFixed(2),
      actualsUpToTotalRbe: totalActualsUpTo.toFixed(2),
      lastRbeProposedTotal: totalBELastYearProposed.toFixed(2),
      lastRbeFixedTotal: totalBELastYearFixed.toFixed(2)
    });

  }

  getAllCodeAndSName() {
    var paramValue: { [key: string]: string } = {};

    // if (this.roleName == 'ARO_Division') {
    //   paramValue['roll'] = 'ARO_Division';
    // } else if (this.roleName == 'MMS_Division') {
    //   paramValue['roll'] = 'ARO_Division';
    // } else if (this.roleName == 'AE_Planning') {
    //   paramValue['roll'] = 'AEE_Division';
    // } else {
    //   paramValue['roll'] = this.roleName;
    // }

    paramValue['roll'] = this.roleName;

    this.apiCall.apiPostCall_Query('api/code/getCodeLoginWise', paramValue).subscribe(
      (Response) => {
        console.log('getAll CodeAndSName ===== ', Response);

        this.budgetDateSource = Response.responseObject;
        this.rbeBudgetDataSource = Response.responseObject;

        this.filteredBudgetDateSourceBE = Response.responseObject
        this.filteredBudgetDateSourceRBE = Response.responseObject

        this.allCodeDataBeRbe = Response.responseObject.length
        this.budgetDateSourceBELength = this.budgetDateSource.length;
        this.budgetDateSourceRBELength = this.rbeBudgetDataSource.length
        console.log(this.allCodeDataBeRbe, 'this.allCodeDataBeRbe');
        console.log(this.budgetDateSourceBELength, 'this.budgetDateSourceBELength');
        console.log(this.budgetDateSourceRBELength, 'this.budgetDateSourceRBELength');

        console.log(this.budgetDateSource, '16555');

        this.budgetDateSource.forEach((element) => {
          element.id;
          element.actual,
            element.be,
            element.rbe,
            element.actualsUpTo,
            element.beLastYearProposed,
            element.beLastYearFixed;
          element.subCodeBES;
        });

        console.log('Response Data Score BE', this.budgetDateSource);

        this.resourcesRBEData = this.rbeBudgetDataSource.filter(
          (item) => item.budget?.mainGroup === 'Resources'
        );
        this.commitmentsRBEData = this.rbeBudgetDataSource.filter(
          (item) => item.budget?.mainGroup === 'Commitments'
        );

        console.log(this.resourcesRBEData, 'this.resourcesRBEData');
        console.log(this.rbeBudgetDataSource, 'this.rbeBudgetDataSource');

        this.rbeBudgetDataSource.forEach((element) => {
          element.id;
          element.actualRbe,
            element.beRbe,
            element.actualsUpToRbe,
            element.LastRbeProposed,
            element.LastRbeFixed;
          element.createSubCodeRBEDTOS;
        });
        console.log('Response Data Score RBE', this.rbeBudgetDataSource);
      });
  }

  beSave() {
    this.isLoading = true;
    let forwardMessage = '';
    if (this.userDivision == 'Head_office') {
      this.statusUpdate = 'Approved';
    } else {
      this.statusUpdate = 'Active';
    }

    let dataToSaveBE = [];

    if (this.roleName == 'ARO_Division') {
      forwardMessage = `BE Forward To MMS ${this.userDivision} Successfully`
      this.budgetDateSource.forEach((element) => {

        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,

          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,
          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: 'Active',
          aeeDivisionStatus: '',
          accClerkStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          mmsDivisionStatus: '',

          aroDivisionRemarks: this.AROremarksForm.controls['aroDivisionRemarks'].value,
          aroDivisionSignature: this.AROremarksForm.controls['aroDivisionSignature'].value,
          aroDivisionDate: this.formatDate(this.AROremarksForm.controls['aroDivisionDate'].value),

          subCodeBES: element.subCodeBES || []

        };
        dataToSaveBE.push(data);
      });

    } else if (this.roleName == 'AEE_Division') {
      forwardMessage = `BE Forward To AE_Plan ${this.userDivision} Successfully`
      this.budgetDateSource.forEach((element) => {
        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,
          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,
          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: '',
          aeeDivisionStatus: 'Active',
          accClerkStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          mmsDivisionStatus: '',

          aeeDivisionRemarks: this.AEEremarksForm.controls['aeeDivisionRemarks'].value,
          aeeDivisionSignature: this.AEEremarksForm.controls['aeeDivisionSignature'].value,
          aeeDivisionDate: this.formatDate(this.AEEremarksForm.controls['aeeDivisionDate'].value),
          subCodeBES: element.subCodeBES || []

        };
        dataToSaveBE.push(data);
      });
    } else if (this.roleName == 'ACC_Clerk') {
      forwardMessage = `BE Forward To DA ${this.userDivision} Successfully`
      this.budgetDateSource.forEach((element) => {
        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,
          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,
          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: '',
          aeeDivisionStatus: '',
          accClerkStatus: 'Active',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          mmsDivisionStatus: '',

          accClerkRemarks: this.ACCremarksForm.controls['accClerkRemarks'].value,
          accDivisionSignature: this.ACCremarksForm.controls['accDivisionSignature'].value,
          accDivisionDate: this.formatDate(this.ACCremarksForm.controls['accDivisionDate'].value),

          subCodeBES: element.subCodeBES || []
        };
        dataToSaveBE.push(data);
      });
    } else if (this.roleName == 'RO') {
      forwardMessage = `BE Forward To CRO ${this.userDivision} Successfully`

      this.budgetDateSource.forEach((element) => {
        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,
          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,
          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,

          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,
          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: '',
          aeeDivisionStatus: '',
          accClerkStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          mmsDivisionStatus: '',
          roStatus: 'Active',

          roRemarks: this.ROremarksForm.controls['roRemarks'].value,
          roSignature: this.ROremarksForm.controls['roSignature'].value,
          roDate: this.formatDate(this.ROremarksForm.controls['roDate'].value),

          subCodeBES: element.subCodeBES || []

        };
        dataToSaveBE.push(data);
      });
    } else if (this.roleName == 'AO') {
      forwardMessage = `BE Forward To DCAO ${this.userDivision} Successfully`

      this.budgetDateSource.forEach((element) => {

        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,
          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,
          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,
          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: '',
          aeeDivisionStatus: '',
          accClerkStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          mmsDivisionStatus: '',
          aoStatus: 'Active',

          aoRemarks: this.AOremarksForm.controls['aoRemarks'].value,
          aoSignature: this.AOremarksForm.controls['aoSignature'].value,
          aoDate: this.formatDate(this.AOremarksForm.controls['aoDate'].value),

          subCodeBES: element.subCodeBES || []
        };

        dataToSaveBE.push(data);
      });
    } else if (this.roleName == 'EE_T_CELL') {
      forwardMessage = `BE Forward To SE ${this.userDivision} Successfully`

      this.budgetDateSource.forEach((element) => {

        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,
          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,
          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,
          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: '',
          aeeDivisionStatus: '',
          accClerkStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          mmsDivisionStatus: '',
          eeTCellStatus: 'Active',

          eeTCellRemarks: this.eeTcellremarksForm.controls['eeTCellRemarks'].value,
          eeTCellSignature: this.eeTcellremarksForm.controls['eeTCellSignature'].value,
          eeTCellDate: this.formatDate(this.eeTcellremarksForm.controls['eeTCellDate'].value),

          subCodeBES: element.subCodeBES
        };

        dataToSaveBE.push(data);
      });
    }

    console.log(dataToSaveBE, 'dataToSaveBE');
    if (this.searchFilterValue == '') {
      this.apiCall.apiPostCall('api/be/create', dataToSaveBE).subscribe(
        (responce) => {
          if (responce) {
            this.isLoading = false;
          }
          console.log(
            'save all the years form for BBBBEEE',
            responce.responseObject
          );
          this.snackbar.open(forwardMessage, 'close', {
            duration: 3000,
          });
          this.router.navigate(['/famodule/home/budget']);
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open('Check All fields are filled', 'close', {
            duration: 3000,
          });
          console.log(error);
        }
      );
    }
    else {
      this.isLoading = false;
      this.snackbar.open('Clear The Search Filter', 'close', { duration: 3000 });
    }

  }

  rbeSave() {
    this.isLoading = true;
    let forwardMessage = '';
    let dataToSaveRBE = [];

    if (this.userDivision == 'Head_office') {
      this.statusUpdate = 'Approved';
    } else {
      this.statusUpdate = 'Active';
    }

    if (this.roleName == 'ARO_Division') {
      forwardMessage = `RBE Forward To MMS ${this.userDivision} Successfully`

      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('======', rbeElement.budgetHead);

        let rbeData = {
          budgetHeadRBE: rbeElement.budgetHead,
          codeId: rbeElement.id,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,

          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe: this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe: this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe: this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe: this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe: this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal: this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedCreatorTotal: this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: 'Active',
          aeeDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',

          aroDivisionRemarksRbe: this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          aroDivisionSignatureRbe: this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          aroDivisionDateRbe: this.formatDate(this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value),
          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'AEE_Division') {
      forwardMessage = `RBE Forward To AE ${this.userDivision} Successfully`

      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('======', rbeElement.budgetHead);

        let rbeData = {
          budgetHeadRBE: rbeElement.budgetHead,
          codeId: rbeElement.id,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,

          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: '',
          aeeDivisionStatusRbe: 'Active',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',

          aeeDivisionRemarksRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionRemarksRbe'].value,
          aeeDivisionSignatureRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionSignatureRbe'].value,
          aeeDivisionDateRbe: this.formatDate(
            this.AEEremarksFormRbe.controls['aeeDivisionDateRbe'].value
          ),
          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'ACC_Clerk') {
      forwardMessage = `RBE Forward To DA ${this.userDivision} Successfully`
      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('======', rbeElement.budgetHead);

        let rbeData = {
          budgetHeadRBE: rbeElement.budgetHead,
          codeId: rbeElement.id,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,

          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',
          aePlanDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          accClerkStatusRbe: 'Active',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',

          accClerkRemarksRbe:
            this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          accDivisionSignatureRbe:
            this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          accDivisionDateRbe: this.formatDate(
            this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value
          ),
          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'RO') {
      forwardMessage = `RBE Forward To CRO ${this.userDivision} Successfully`
      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('======', rbeElement.budgetHead);

        let rbeData = {
          budgetHeadRBE: rbeElement.budgetHead,
          codeId: rbeElement.id,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,

          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe: this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe: this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe: this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe: this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          roStatusRbe: 'Active',
          eeDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',

          roRemarksRbe: this.ROremarksFormRbe.controls['roRemarksRbe'].value,
          roSignatureRbe: this.ROremarksFormRbe.controls['roSignatureRbe'].value,
          roDateRbe: this.formatDate(this.ROremarksFormRbe.controls['roDateRbe'].value),

          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'AO') {
      forwardMessage = `RBE Forward To DCAO ${this.userDivision} Successfully`
      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('======', rbeElement.budgetHead);

        let rbeData = {
          budgetHeadRBE: rbeElement.budgetHead,
          codeId: rbeElement.id,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,

          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedTotal: this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',
          aoStatusRbe: 'Active',

          aoRemarksRbe: this.AOremarksFormRbe.controls['aoRemarksRbe'].value,
          aoSignatureRbe: this.AOremarksFormRbe.controls['aoSignatureRbe'].value,
          aoDateRbe: this.formatDate(this.AOremarksFormRbe.controls['aoDateRbe'].value),

          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'EE_T_CELL') {
      forwardMessage = `RBE Forward To SE ${this.userDivision} Successfully`
      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('======', rbeElement.budgetHead);

        let rbeData = {
          budgetHeadRBE: rbeElement.budgetHead,
          codeId: rbeElement.id,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,

          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: this.statusUpdate,
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',
          aoStatusRbe: '',
          eeTCellStatusRbe: 'Active',

          eeTCellRemarksRbe: this.eeTcellremarksFormRbe.controls['eeTCellRemarksRbe'].value,
          eeTCellSignatureRbe: this.eeTcellremarksFormRbe.controls['eeTCellSignatureRbe'].value,
          eeTCellDateRbe: this.formatDate(this.eeTcellremarksFormRbe.controls['eeTCellDateRbe'].value),

          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToSaveRBE.push(rbeData);
      });
    }

    console.log(dataToSaveRBE, 'dataToSaveRBE');

    if (this.searchFilterValue == '') {
      this.apiCall.apiPostCall('api/rbe/create', dataToSaveRBE).subscribe(
        (res) => {
          if (res) {
            this.isLoading = false;
          }
          console.log('save all the years form for RRRBBBBEEE', res.data);
          this.router.navigate(['/famodule/home/budget']);
          this.snackbar.open(forwardMessage, 'close', {
            duration: 3000,
          });
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open('Check All fields are filled', 'close', {
            duration: 3000,
          });
          console.log(error);
        }
      );
    }
    else {
      this.isLoading = false;
      this.snackbar.open('Clear the Search Filter', 'Close', { duration: 3000 });
    }
  }

  beDraft() {
    this.isLoading = true;
    console.log(this.budgetDateSource);

    let dataToDraftBE = [];

    if (this.roleName == 'ARO_Division') {
      this.budgetDateSource.forEach((element) => {

        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,
          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,
          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: 'Draft',
          aeeDivisionStatus: '',
          accClerkStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          mmsDivisionStatus: '',

          aroDivisionRemarks: this.AROremarksForm.controls['aroDivisionRemarks'].value,
          aroDivisionSignature: this.AROremarksForm.controls['aroDivisionSignature'].value,
          aroDivisionDate: this.formatDate(this.AROremarksForm.controls['aroDivisionDate'].value),

          subCodeBES: element.subCodeBES || []

        };
        dataToDraftBE.push(data);
      });
    } else if (this.roleName == 'AEE_Division') {
      this.budgetDateSource.forEach((element) => {
        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,

          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          be: element.be,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: '',
          mmsDivisionStatus: '',
          aeeDivisionStatus: 'Draft',
          accClerkStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',

          aeeDivisionRemarks: this.AEEremarksForm.controls['aeeDivisionRemarks'].value,
          aeeDivisionSignature: this.AEEremarksForm.controls['aeeDivisionSignature'].value,
          aeeDivisionDate: this.formatDate(this.AEEremarksForm.controls['aeeDivisionDate'].value),
          subCodeBES: element.subCodeBES || []

        };
        dataToDraftBE.push(data);
      });
    } else if (this.roleName == 'ACC_Clerk') {
      this.budgetDateSource.forEach((element) => {

        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,

          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,
          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: '',
          aeeDivisionStatus: '',
          accClerkStatus: 'Draft',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          mmsDivisionStatus: '',

          accClerkRemarks: this.ACCremarksForm.controls['accClerkRemarks'].value,
          accDivisionSignature: this.ACCremarksForm.controls['accDivisionSignature'].value,
          accDivisionDate: this.formatDate(this.ACCremarksForm.controls['accDivisionDate'].value),

          subCodeBES: element.subCodeBES || []
        };

        dataToDraftBE.push(data);
      });
    } else if (this.roleName == 'RO') {
      this.budgetDateSource.forEach((element) => {
        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,
          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          be: element.be,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualstotal: this.yearMonthFormBE.controls['actualstotal'].value,
          beTotal: this.yearMonthFormBE.controls['beTotal'].value,
          rbeTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          roStatus: 'Draft',
          eeDivisionStatus: element.eeDivisionStatus,

          roRemarks: this.ROremarksForm.controls['roRemarks'].value,
          roSignature: this.ROremarksForm.controls['roSignature'].value,
          roDate: this.formatDate(this.ROremarksForm.controls['roDate'].value),

          subCodeBES: element.subCodeBES || []

        };

        dataToDraftBE.push(data);
      });
    } else if (this.roleName == 'AO') {
      this.budgetDateSource.forEach((element) => {
        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,
          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          be: element.be,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualstotal: this.yearMonthFormBE.controls['actualstotal'].value,
          beTotal: this.yearMonthFormBE.controls['beTotal'].value,
          rbeTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          aoStatus: 'Draft',

          aoRemarks: this.AOremarksForm.controls['aoRemarks'].value,
          aoSignature: this.AOremarksForm.controls['aoSignature'].value,
          aoDate: this.formatDate(this.AOremarksForm.controls['aoDate'].value),

          subCodeBES: element.subCodeBES || []

        };

        dataToDraftBE.push(data);
      });
    } else if (this.roleName == 'EE_T_CELL') {
      this.budgetDateSource.forEach((element) => {
        let data = {
          budgetHead: element.budgetHead,
          codeId: element.id,
          schedule: element.schedule,
          scheduleName: element.schedule.scheduleName,
          codeName: element.codeName,
          code: element.codeNumber,
          budgetType: element.budget.budgetType,
          groupTotal: element.budget.groupTotal,

          actuals: element.actual,
          be: element.be,
          rbe: element.rbe,
          actualsUpTo: element.actualsUpTo,
          beLastYearProposed: element.beLastYearProposed,
          beLastYearFixed: element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualstotal: this.yearMonthFormBE.controls['actualstotal'].value,
          beTotal: this.yearMonthFormBE.controls['beTotal'].value,
          rbeTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          aoStatus: '',
          eeTCellStatus: 'Draft',

          eeTCellRemarks: this.eeTcellremarksForm.controls['eeTCellRemarks'].value,
          eeTCellSignature: this.eeTcellremarksForm.controls['eeTCellSignature'].value,
          eeTCellDate: this.formatDate(this.eeTcellremarksForm.controls['eeTCellDate'].value),

          subCodeBES: element.subCodeBES || []

        };

        dataToDraftBE.push(data);
      });
    }

    console.log(dataToDraftBE, 'dataToDraftBE');

    if (this.searchFilterValue == '') {
      this.apiCall.apiPostCall('api/be/create', dataToDraftBE).subscribe(
        (responce) => {
          if (responce) {
            this.isLoading = false;
          }
          console.log('save all the years form for BBBBEEE', responce.responseObject);
          this.snackbar.open('BE Drafted Successfully', 'close', {
            duration: 3000,
          });
          if (responce.responseStatus) {
            this.router.navigate(['/famodule/home/budget']);
          }
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open('Check All fields are filled', 'close', {
            duration: 3000,
          });
          console.log(error);
        }
      );
    }
    else {
      this.isLoading = false;
      this.snackbar.open('Clear the Search Filter', 'Close', { duration: 3000 });

    }
  }

  rbeDraft() {
    this.isLoading = true;
    let dataToDraftRBE = [];

    if (this.roleName == 'ARO_Division') {
      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('=======', rbeElement.budgetHead);

        let rbeData = {
          codeId: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHead,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,
          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: 'Draft',
          mmsDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',

          aroDivisionRemarksRbe:
            this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          aroDivisionSignatureRbe:
            this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          aroDivisionDateRbe: this.formatDate(
            this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value
          ),
          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToDraftRBE.push(rbeData);
      });
    } else if (this.roleName == 'AEE_Division') {
      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('=======', rbeElement.budgetHead);

        let rbeData = {
          codeId: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHead,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,
          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',
          aeeDivisionStatusRbe: 'Draft',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',

          aeeDivisionRemarksRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionRemarksRbe'].value,
          aeeDivisionSignatureRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionSignatureRbe'].value,
          aeeDivisionDateRbe: this.formatDate(
            this.AEEremarksFormRbe.controls['aeeDivisionDateRbe'].value
          ),
          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToDraftRBE.push(rbeData);
      });
    } else if (this.roleName == 'ACC_Clerk') {
      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('=======', rbeElement.budgetHead);

        let rbeData = {
          codeId: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHead,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,
          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedCreatorTotal: this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          accClerkStatusRbe: 'Draft',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',

          accClerkRemarksRbe:
            this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          accDivisionSignatureRbe:
            this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          accDivisionDateRbe: this.formatDate(
            this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value
          ),
          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToDraftRBE.push(rbeData);
      });
    } else if (this.roleName == 'RO') {
      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('=======', rbeElement.budgetHead);

        let rbeData = {
          budgetHeadRBE: rbeElement.budgetHead,
          codeId: rbeElement.id,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,

          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe: this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe: this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe: this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe: this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          roStatusRbe: 'Draft',
          eeDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',

          roRemarksRbe: this.ROremarksFormRbe.controls['roRemarksRbe'].value,
          roSignatureRbe: this.ROremarksFormRbe.controls['roSignatureRbe'].value,
          roDateRbe: this.formatDate(this.ROremarksFormRbe.controls['roDateRbe'].value),

          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToDraftRBE.push(rbeData);
      });
    } else if (this.roleName == 'AO') {
      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('=======', rbeElement.budgetHead);

        let rbeData = {
          budgetHeadRBE: rbeElement.budgetHead,
          codeId: rbeElement.id,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,

          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedTotal: this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',
          aoStatusRbe: 'Draft',

          aoRemarksRbe: this.AOremarksFormRbe.controls['aoRemarksRbe'].value,
          aoSignatureRbe: this.AOremarksFormRbe.controls['aoSignatureRbe'].value,
          aoDateRbe: this.formatDate(this.AOremarksFormRbe.controls['aoDateRbe'].value),

          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToDraftRBE.push(rbeData);
      });
    } else if (this.roleName == 'EE_T_CELL') {
      this.rbeBudgetDataSource.forEach((rbeElement) => {
        console.log('=======', rbeElement.budgetHead);

        let rbeData = {
          budgetHeadRBE: rbeElement.budgetHead,
          codeId: rbeElement.id,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.codeNumber,
          codeName: rbeElement.codeName,
          budgetTypeRBE: rbeElement.budgetType,
          groupTotalRBE: rbeElement.groupTotal,

          actualsRbe: rbeElement.actualRbe,
          beRbe: rbeElement.beRbe,
          actualsUpToRbe: rbeElement.actualsUpToRbe,
          lastRbeProposed: rbeElement.LastRbeProposed,
          lastRbeFixed: rbeElement.LastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value || 0,

          approvalStatus: 'Draft',
          creator: this.roleName,
          division: this.userDivision,
          aroDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',
          aoStatusRbe: '',
          eeTCellStatusRbe: 'Draft',

          eeTCellRemarksRbe: this.eeTcellremarksFormRbe.controls['eeTCellRemarksRbe'].value,
          eeTCellSignatureRbe: this.eeTcellremarksFormRbe.controls['eeTCellSignatureRbe'].value,
          eeTCellDateRbe: this.formatDate(this.eeTcellremarksFormRbe.controls['eeTCellDateRbe'].value),

          subCodeRBES: rbeElement.subCodeRBES
        };
        dataToDraftRBE.push(rbeData);
      });
    }

    console.log(dataToDraftRBE, 'dataToDraftRBE DRAFT');

    if (this.searchFilterValue == '') {
      this.apiCall.apiPostCall('api/rbe/create', dataToDraftRBE).subscribe(
        (res) => {
          if (res) {
            this.isLoading = false;
          }
          console.log('save all the years form for RRRBBBBEEE', res.data);
          this.snackbar.open('RBE Drafted Successfully', 'close', {
            duration: 3000,
          });
          this.router.navigate(['/famodule/home/budget']);
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open('Check All fields are filled', 'close', {
            duration: 3000,
          });
          console.log(error);
        }
      );
    }
    else {
      this.isLoading = false;
      this.snackbar.open('Clear the Search Filter', 'Close', { duration: 3000 });
    }
  }

  getYearAuto() {
    var paramValue: { [key: string]: string } = {};

    if (this.userDivision) {
      paramValue['division'] = this.userDivision;
    }

    if (this.roleName == 'ARO_Division') {
      paramValue['roll'] = 'ARO_Division';
    } else if (this.roleName == 'MMS_Division') {
      paramValue['roll'] = 'ARO_Division';
    } else if (this.roleName == 'AE_Planning') {
      paramValue['roll'] = 'AEE_Division';
    } else {
      paramValue['roll'] = this.roleName;
    }

    this.apiCall.apiPostCall_Query(`api/be/getYearByDivision`, paramValue).subscribe(
      (res) => {
        console.log('get Year Auto ==== ', res.daresponseObjectta);
        this.actualsYearResponceBE = res.responseObject.actualsYear
        this.rbeYearResponceBE = res.responseObject.rbeYear
        this.actualsUpToYearResponceBE = res.responseObject.actualsUpToYear
        this.beLastYearResponceBE = res.responseObject.beLastYear
        this.yearMonthFormBE.patchValue({
          actualsYear: res.responseObject.actualsYear,
          rbeYear: res.responseObject.rbeYear,
          actualsUpToYear: res.responseObject.actualsUpToYear,
          beLastYear: res.responseObject.beLastYear,
        });
        this.beRbeactualsYear = res.responseObject.actualsYear;
        this.beRbeYear = res.responseObject.rbeYear;
        this.beRbeactualsUpToYear = res.responseObject.actualsUpToYear;
        this.beRbeLastYear = res.responseObject.beLastYear;
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  getYearAutoRbe() {
    var paramValue: { [key: string]: string } = {};

    if (this.userDivision) {
      paramValue['division'] = this.userDivision;
    }

    if (this.roleName == 'ARO_Division') {
      paramValue['roll'] = 'ARO_Division';
    } else if (this.roleName == 'MMS_Division') {
      paramValue['roll'] = 'ARO_Division';
    } else if (this.roleName == 'AE_Planning') {
      paramValue['roll'] = 'AEE_Division';
    } else {
      paramValue['roll'] = this.roleName;
    }
    this.apiCall.apiPostCall_Query(`api/rbe/getYearAutoByDivision`, paramValue).subscribe(
      (res) => {
        console.log('get Year Auto ==== ', res.responseObject);

        this.actualsYearResponceRBE = res.responseObject.actualsYearRBE
        this.actualsUpToYearResponceRBE = res.responseObject.actualsUpToYearRBE
        this.beYearResponceRBE = res.responseObject.beYearRBE
        this.beLastYearResponceRBE = res.responseObject.lastRbeYear

        this.yearMonthRbeForm.patchValue({
          actualsYearRbe: res.responseObject.actualsYearRBE,
          beYearRbe: res.responseObject.beYearRBE,
          actualsUpToYearRbe: res.responseObject.actualsUpToYearRBE,
          lastRbeYear: res.responseObject.lastRbeYear,
        });
        this.beRbeactualsYear = res.responseObject.actualsYearRBE;
        this.beRbeYear = res.responseObject.beYearRBE;
        this.beRbeactualsUpToYear = res.responseObject.actualsUpToYearRBE;
        this.beRbeLastYear = res.responseObject.lastRbeYear;
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  beRbeButton() {
    if (this.beRbeValueParams == 1) {
      this.beRbe = 'RBE';
    }
    else {
      this.beRbe = 'BE';
    }
    console.log("beRbe = ", this.beRbe)
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

}
