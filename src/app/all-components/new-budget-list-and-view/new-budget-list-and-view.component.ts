import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import * as _ from 'lodash';
import { elementAt } from 'rxjs';
import { SubCodePopupformComponent } from '../sub-code-popupform/sub-code-popupform.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-budget-list-and-view',
  templateUrl: './new-budget-list-and-view.component.html',
  styleUrl: './new-budget-list-and-view.component.css',
})
export class NewBudgetListAndViewComponent implements OnInit {
  showBE: string = 'BE';
  budgetDateSource: any;
  scheduleNumberID: any;
  yearMonthFormBE: FormGroup;
  yearMonthFormRBE: FormGroup;
  allYearsBE: any;
  actualsToatls: any;

  totalActual: number = 0;
  totalBe: number = 0;
  totalRbe: number = 0;
  totalActualUpto: number = 0;
  totalBeProposed: number = 0;
  totalBeFixed: number = 0;

  year: any;
  FatchYear: any;

  // ---------RBE-------

  rbeBudgetDataSource: any;
  yearMonthRbeForm: FormGroup;

  totalActualRbe: number = 0;
  totalBeRbe: number = 0;
  totalActualUptoRbe: number = 0;
  totalBeProposedRbe: number = 0;
  totalBeFixedRbe: number = 0;

  id: any;
  mode: any;
  viewMode: boolean;
  beRbe: string;
  beRbeMode: boolean;
  getYearData: any;
  getYearDataStatus: any;

  getYearDataRBE: any;
  divisionNameSelect: string;
  userDivision: string;

  statusUpdate: any;
  roleName: any;

  codeWiseAry: any[] = [];

  // ------------------------

  totalActualConBe: number;
  totalBeConBe: number;
  totalRbeConBe: number;
  totalActualsUpToConBe: number;
  totalBELastYearProposedConBe: number;
  totalBELastYearFixedConBe: number;

  totalActualConRbe: number;
  totalBeConRbe: number;
  totalRbeConRbe: number;
  totalActualsUpToConRbe: number;
  totalBELastYearProposedConRbe: number;
  totalBELastYearFixedConRbe: number;
  division: string;

  divisionForm: FormGroup;

  AROremarksForm: FormGroup;
  MMSremarksForm: FormGroup;
  AEEremarksForm: FormGroup;
  ACCremarksForm: FormGroup;
  DAremarksForm: FormGroup;
  EEremarksForm: FormGroup;
  AE_PLANremarksForm: FormGroup;
  ROremarksForm: FormGroup;
  CROremarksForm: FormGroup;
  eeTcellremarksForm: FormGroup;
  seremarksForm: FormGroup;
  CEremarksForm: FormGroup;
  AOremarksForm: FormGroup;
  DCAOremarksForm: FormGroup;
  FAremarksForm: FormGroup;
  MDremarksForm: FormGroup;

  AROremarksFormRbe: FormGroup;
  MMSremarksFormRbe: FormGroup;
  AEEremarksFormRbe: FormGroup;
  ACCremarksFormRbe: FormGroup;
  DAremarksFormRbe: FormGroup;
  EEremarksFormRbe: FormGroup;
  AE_PLANremarksFormRbe: FormGroup;
  ROremarksFormRbe: FormGroup;
  CROremarksFormRbe: FormGroup;
  eeTcellremarksFormRbe: FormGroup;
  seremarksFormRbe: FormGroup;
  CEremarksFormRbe: FormGroup;
  AOremarksFormRbe: FormGroup;
  DCAOremarksFormRbe: FormGroup;
  FAremarksFormRbe: FormGroup;
  MDremarksFormRbe: FormGroup;


  panelOpenState = false;

  beSubmit: boolean;

  aroAccordion: boolean;
  aeeAccordion: boolean;

  aroPanel: boolean;
  mmsPanel: boolean;
  aeePanel: boolean;
  aePlanPanel: boolean;
  accClerkPanel: boolean;
  daPanel: boolean;
  eePanel: boolean;
  roPanel: boolean;
  croPanel: boolean;
  eeTcellPanel: boolean;
  sePanel: boolean;
  cePanel: boolean;
  aoPanel: boolean;
  dcaoPanel: boolean;
  faPanel: boolean
  mdPanel: boolean;

  aroPanelRbe: boolean;
  mmsPanelRbe: boolean;
  aeePanelRbe: boolean;
  aePlanPanelRbe: boolean;
  accClerkPanelRbe: boolean;
  daPanelRbe: boolean;
  eePanelRbe: boolean;
  roPanelRbe: boolean;
  croPanelRbe: boolean;
  eeTcellPanelRbe: boolean;
  sePanelRbe: boolean;
  cePanelRbe: boolean;
  aoPanelRbe: boolean;
  dcaoPanelRbe: boolean;
  faPanelRbe: boolean
  mdPanelRbe: boolean;

  blueSubmittedForBE = {};


  // --------------------

  displayedColumnsRBE: string[] = [
    'schedule',
    'scheduleName',
    'code',
    'codeName',
    'actual',
    'be',
    'actualUpto',
    'rbe_proposed',
    'rbe_fixed',
  ];

  totalActualRBE: number = 0;
  totalBeRBE: number = 0;
  totalActualUptoRBE: number = 0;
  totalRbeProposed: number = 0;
  totalRbeFixed: number = 0;

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  selectedMonth: string = 'Select Month';

  divisions: string[] = ['City', 'Rural'];

  selectedCircle: string = 'select-circle';
  circles: string[] = ['Chennai Circle 1', 'Chennai Circle 2'];

  selectedArea: string = 'select-area';

  totalActuals: any;
  totalBE: any;
  totalRBE: any;
  totalActualsUpTo: any;
  totalBELastYearProposed: any;
  totalBELastYearFixed: any;

  financialYearValue: any;

  buttonNameValue: any;
  beRbeParams: any;
  getYearDataDecimal: any;
  divisionDropDownLength: number;
  dataParamsLength: any;
  filteredBudgetDateSourceBE: any;
  filteredBudgetDateSourceRBE: any;
  getYearDataDecimalLen: any;
  getYearDataLen: any;
  paramsValue: any;
  isLoading = false;
  searchFilterValue = '';
  roleFilterDropdown: any;
  roleBasedCondition: any;
  budgetTypeOrNumber: boolean = true;

  constructor(
    private apiCall: ApiservicesService,
    private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private decimalPipe: DecimalPipe,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.userDivision = sessionStorage.getItem('division');
    this.division = sessionStorage.getItem('division');
    this.roleName = sessionStorage.getItem('role');
    console.log(this.roleName, this.userDivision);

    if (this.roleName == 'ARO_Division') {
      this.aroPanel = true;
      this.aroPanelRbe = true;
    } else if (this.roleName == 'AEE_Division') {
      this.aeePanel = true;
      this.aeePanelRbe = true;
    } else if (this.roleName == 'ACC_Clerk') {
      this.accClerkPanel = true;
      this.accClerkPanelRbe = true;
    }

    if (this.division == 'Head_office') {
      this.divisionDropDownFun();
    }
  }

  ngOnInit(): void {

    this.yearMonthFormBE = this.fb.group({
      actualsUpToMonths: ['', Validators.required],

      actualsYear: ['', Validators.required],
      beYear: ['', Validators.required],
      rbeYear: ['', Validators.required],
      actualsUpToYear: ['', Validators.required],
      beLastYear: ['', Validators.required],

      schedule: ['', Validators.required],
      codeNumber: ['', Validators.required],
      codeName: ['', Validators.required],

      actuals: ['', Validators.required],
      be: ['', Validators.required],
      rbe: ['', Validators.required],
      actualsUpTo: ['', Validators.required],
      beLastYearProposed: ['', Validators.required],
      beLastYearFixed: ['', Validators.required],

      actualstotal: ['', Validators.required],
      beTotal: ['', Validators.required],
      rbeTotal: ['', Validators.required],
      actualsUpToTotal: ['', Validators.required],
      beLastTotal: ['', Validators.required],
      beLastYearProposedTotal: ['', Validators.required],
      beLastYearFixedTotal: ['', Validators.required],
    });

    this.yearMonthRbeForm = this.fb.group({
      actualsYearRbe: ['', Validators.required],
      beYearRbe: ['', Validators.required],
      actualsUpToYearRbe: ['', Validators.required],
      lastRbeYear: ['', Validators.required],
      actualsUpToMonthRbe: ['', Validators.required],

      scheduleRbe: ['', Validators.required],
      codeNumberRbe: ['', Validators.required],
      codeNameRbe: ['', Validators.required],

      actualRbe: ['', Validators.required],
      beRbe: ['', Validators.required],
      actualsUpToRbe: ['', Validators.required],
      lastRbeProposed: ['', Validators.required],
      lastRbeFixed: ['', Validators.required],

      actualTotalRbe: ['', Validators.required],
      beTotalRbe: ['', Validators.required],
      actualsUpToTotalRbe: ['', Validators.required],
      lastRbeProposedTotal: ['', Validators.required],
      lastRbeFixedTotal: ['', Validators.required],
    });

    this.router.params.subscribe((params) => {
      this.paramsValue = params;
      console.log(params, 'paramData');
      this.id = params['id'];
      console.log(params['id']);
      this.divisionNameSelect = params['divisionName'];
      this.beRbeParams = params['beRbe'];
      this.dataParamsLength = +params['countOfDatas'];
      console.log(this.divisionNameSelect);
      console.log(this.dataParamsLength, 'this.dataParamsLength');
      this.isInNineSeries(this.dataParamsLength);
    });

    this.mode = this.router.snapshot.paramMap.get('mode');

    this.beRbe = this.router.snapshot.paramMap.get('beRbe');

    console.log(this.beRbe);

    this.beRbeMode = this.beRbe == 'be';

    console.log(this.beRbe);

    this.viewMode = this.mode == 'view';

    console.log('This is mode ==== ', this.viewMode);

    console.log('year of current year ====== ', this.id);

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

    this.MMSremarksForm = this.fb.group({
      mmsDivisionRemarks: ['', Validators.required],
      mmsDivisionSignature: ['', Validators.required],
      mmsDivisionDate: ['', Validators.required],
    });

    this.MMSremarksFormRbe = this.fb.group({
      mmsDivisionRemarksRbe: ['', Validators.required],
      mmsDivisionSignatureRbe: ['', Validators.required],
      mmsDivisionDateRbe: ['', Validators.required],
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

    this.AE_PLANremarksForm = this.fb.group({
      aePlanDivisionRemarks: ['', Validators.required],
      aePlanDivisionSignature: ['', Validators.required],
      aePlanDivisionDate: ['', Validators.required],
    });

    this.AE_PLANremarksFormRbe = this.fb.group({
      aePlanDivisionRemarksRbe: ['', Validators.required],
      aePlanDivisionSignatureRbe: ['', Validators.required],
      aePlanDivisionDateRbe: ['', Validators.required],
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

    this.DAremarksForm = this.fb.group({
      daDivisionRemarks: ['', Validators.required],
      daDivisionSignature: ['', Validators.required],
      daDivisionDate: ['', Validators.required],
    });

    this.DAremarksFormRbe = this.fb.group({
      daDivisionRemarksRbe: ['', Validators.required],
      daDivisionSignatureRbe: ['', Validators.required],
      daDivisionDateRbe: ['', Validators.required],
    });

    this.EEremarksForm = this.fb.group({
      eeDivisionRemarks: ['', Validators.required],
      eeDivisionSignature: ['', Validators.required],
      eeDivisionDate: ['', Validators.required],
    });

    this.EEremarksFormRbe = this.fb.group({
      eeDivisionRemarksRbe: ['', Validators.required],
      eeDivisionSignatureRbe: ['', Validators.required],
      eeDivisionDateRbe: ['', Validators.required],
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

    this.CROremarksForm = this.fb.group({
      croRemarks: ['', Validators.required],
      croSignature: ['', Validators.required],
      croDate: ['', Validators.required],
    });

    this.CROremarksFormRbe = this.fb.group({
      croRemarksRbe: ['', Validators.required],
      croSignatureRbe: ['', Validators.required],
      croDateRbe: ['', Validators.required],
    });

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

    this.seremarksForm = this.fb.group({
      seRemarks: ['', Validators.required],
      seSignature: ['', Validators.required],
      seDate: ['', Validators.required],
    })

    this.seremarksFormRbe = this.fb.group({
      seRemarksRbe: ['', Validators.required],
      seSignatureRbe: ['', Validators.required],
      seDateRbe: ['', Validators.required],
    })

    this.CEremarksForm = this.fb.group({
      ceRemarks: ['', Validators.required],
      ceSignature: ['', Validators.required],
      ceDate: ['', Validators.required],
    })

    this.CEremarksFormRbe = this.fb.group({
      ceRemarksRbe: ['', Validators.required],
      ceSignatureRbe: ['', Validators.required],
      ceDateRbe: ['', Validators.required],
    })

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

    this.DCAOremarksForm = this.fb.group({
      dcAoRemarks: ['', Validators.required],
      dcAoSignature: ['', Validators.required],
      dcAoDate: ['', Validators.required],
    })

    this.DCAOremarksFormRbe = this.fb.group({
      dcAoRemarksRbe: ['', Validators.required],
      dcAoSignatureRbe: ['', Validators.required],
      dcAoDateRbe: ['', Validators.required],
    })

    this.FAremarksForm = this.fb.group({
      faRemarks: ['', Validators.required],
      faSignature: ['', Validators.required],
      faDate: ['', Validators.required],
    });

    this.FAremarksFormRbe = this.fb.group({
      faRemarksRbe: ['', Validators.required],
      faSignatureRbe: ['', Validators.required],
      faDateRbe: ['', Validators.required],
    });

    this.MDremarksForm = this.fb.group({
      mdRemarks: ['', Validators.required],
      mdSignature: ['', Validators.required],
      mdDate: ['', Validators.required],
    })

    this.MDremarksFormRbe = this.fb.group({
      mdRemarksRbe: ['', Validators.required],
      mdSignatureRbe: ['', Validators.required],
      mdDateRbe: ['', Validators.required],
    })

    this.buttonName();
    console.log(this.divisionNameSelect, 'divisionNameSelect');
    if (this.roleName == 'DA_Division' || this.roleName == 'EE_Division' || this.roleName == 'AO' || this.roleName == 'DCAO' || this.roleName == 'FA') {
      this.roleBasedCondition = true;
    }
    else {
      this.roleBasedCondition = false;
    }

    this.divisionNameSelect = 'all'
    this.roleFilterDropdown = 'All'

    if (this.paramsValue.beRbe == 'be') {
      this.getViewAllMethodBE();
    }
    else if (this.paramsValue.beRbe == 'rbe') {
      this.getViewAllMethodRBE();
    }

    console.log(this.roleFilterDropdown, 'this.roleFilterDropdown ');

    if (this.paramsValue.countOfDatas == 'Revenue' || this.paramsValue.countOfDatas == 'Work' || this.paramsValue.countOfDatas == 'Admin') {
      this.budgetTypeOrNumber = false;
    }
  }

  typeName: any;

  getAllByDivision(event: any, type: any) {
    console.log(type);
    this.typeName = type;
    console.log(this.typeName, 'typename');
    this.divisionNameSelect = event.target.value;
    console.log(this.divisionNameSelect, 'divisionNameSelect');

    if (this.divisionNameSelect && this.typeName == 'BE') {
      this.getViewAllMethodBE();
    }
    else if (this.divisionNameSelect && this.typeName == 'RBE') {
      this.getViewAllMethodRBE();
    }

  }

  divisionDropDown: any;

  divisionDropDownFun() {
    this.apiCall.apiGetCall('api/user/getAllDivision').subscribe(
      (responce) => {
        let dropDownValue = responce.responseObject
        this.divisionDropDown = dropDownValue
        // this.divisionDropDown = responce.responseObject;

        console.log(this.divisionDropDown, 'this.divisionDropDown');

        if (this.roleName == 'AO' || this.roleName == 'DCAO' || this.roleName == 'FA' || this.roleName == 'MD') {
          this.divisionDropDownLength = (responce.responseObject.length) * 3;
        }
        else {
          this.divisionDropDownLength = responce.responseObject.length;
        }
        console.log(this.divisionDropDown, 'this.divisionDropDown');
        console.log(this.divisionDropDownLength, 'this.divisionDropDownLength ');

      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  proposedTab: boolean;
  resourcesData: any[] = [];
  commitmentsData: any[] = [];
  creatorsPresent: boolean = false;
  creatorsPresentRbe: boolean = false;

  daIsActiveBe: any;
  daIsActiveRbe: any;

  flowFilter(event: any) {
    this.roleFilterDropdown = event.target.value;
    console.log(this.roleFilterDropdown, 'this.roleFilterDropdown');
    if (this.roleFilterDropdown) {
      if (this.paramsValue.beRbe == 'be') {
        this.getViewAllMethodBE();
      }
      else {
        this.getViewAllMethodRBE();
      }
    }
  }

  getViewAllMethodBE() {
    console.log('192', 'view method BE');
    console.log(this.divisionNameSelect, 'svfef');
    if (this.id) {
      var params: { [key: string]: string } = {};

      if (this.paramsValue.divisionName != 'Head_office') {
        params['division'] = this.paramsValue.divisionName;
      }
      else {
        if (this.divisionNameSelect != 'all') {
          params['division'] = this.divisionNameSelect;
        }
      }

      // --------role
      if (this.roleName == 'MMS_Division') {
        params['roll'] = 'ARO_Division';
      }
      else if (this.roleName == 'AE_Planning') {
        params['roll'] = 'AEE_Division';
      }
      else if (this.roleName == 'DA_Division' || this.roleName == 'EE_Division') {
        if (this.roleFilterDropdown == 'All') {
          params['roll'] = this.roleName
        }
        else {
          params['roll'] = this.roleFilterDropdown;
        }
      }
      else if (this.roleName == 'CRO') {
        params['roll'] = 'RO';
      }
      else if (this.roleName == 'SE' ||
        this.roleName == 'CE') {
        params['roll'] = 'EE_T_CELL';
      }
      else if (this.roleName == 'AO' || this.roleName == 'DCAO' || this.roleName == 'FA') {
        if (this.roleFilterDropdown == 'All') {
          params['roll'] = this.roleName
        }
        else {
          params['roll'] = this.roleFilterDropdown;
        }
      }
      else {
        params['roll'] = this.roleName;
      }

      // list page routing roll

      if (this.paramsValue.divisionName != 'Head_office') {
        if (this.paramsValue.countOfDatas == 'Revenue') {
          params['roll'] = 'ARO_Division';
        }
        else if (this.paramsValue.countOfDatas == 'Work') {
          params['roll'] = 'AEE_Division';
        }
        else if (this.paramsValue.countOfDatas == 'Admin') {
          params['roll'] = 'ACC_Clerk';
        }
      }
      else {
        if (this.paramsValue.countOfDatas == 'Revenue') {
          params['roll'] = 'RO';
        }
        else if (this.paramsValue.countOfDatas == 'Work') {
          params['roll'] = 'EE_T_CELL';
        }
        else if (this.paramsValue.countOfDatas == 'Admin') {
          params['roll'] = 'AO';
        }
      }

      // ---------- division

      if (this.id) {
        params['beLastYear'] = this.id;
      }

      this.apiCall.apiPostCall_beRbe('api/be/getByFilter', params).subscribe(
        (responce) => {
          let i_index;
          this.getYearData = responce.responseObject;
          this.getYearDataDecimal = responce.responseObject;

          this.getYearDataDecimalLen = this.getYearDataDecimal.length;
          this.getYearDataLen = this.getYearData.length;
          console.log(this.getYearDataDecimalLen, 'getYearDataDecimalLen');
          console.log(this.getYearDataLen, 'getYearDataLen');
          this.filteredBudgetDateSourceBE = responce.responseObject;

          if (this.mode == 'edit') {
            this.getYearData.forEach((value, i) => {
              this.getYearDataDecimal[i].actuals = (parseFloat(value.actuals)).toFixed(2);
              this.getYearDataDecimal[i].rbe = (parseFloat(value.rbe)).toFixed(2);
              this.getYearDataDecimal[i].actualsUpTo = (parseFloat(value.actualsUpTo)).toFixed(2);
              this.getYearDataDecimal[i].beLastYearProposed = (parseFloat(value.beLastYearProposed)).toFixed(2);
              this.getYearDataDecimal[i].beLastYearFixed = (parseFloat(value.beLastYearFixed)).toFixed(2);
            });
          }

          console.log(this.getYearDataDecimal, 'this.getYearDataDecimal');
          console.log(this.getYearData, 'getYearData');

          let approveStatus = this.getYearData.approvalStatus;

          if (this.userDivision != 'Head_office' && approveStatus == 'Approved') {
            this.proposedTab = false;
          } else {
            this.proposedTab = true;
          }
          console.log(responce.responseObject, '339');

          for (let i = 0; i < responce.responseObject.length; i++) {
            // i_index = i

            this.yearMonthFormBE.patchValue({
              actualsYear: responce.responseObject[i].actualsYear,
              beYear: responce.responseObject[i].beYear,
              rbeYear: responce.responseObject[i].rbeYear,
              actualsUpToYear: responce.responseObject[i].actualsUpToYear,
              beLastYear: responce.responseObject[i].beLastYear,
              codeId: responce.responseObject[i].code.id,
              actualsUpToMonths: responce.responseObject[i].actualsUpToMonths,

              actualstotal: responce.responseObject[i].actualstotal,
              beTotal: responce.responseObject[i].beTotal,
              rbeTotal: responce.responseObject[i].rbeTotal,
              actualsUpToTotal: responce.responseObject[i].actualsUpToTotal,
              beLastTotal: responce.responseObject[i].beLastTotal,
              beLastYearProposedTotal: responce.responseObject[i].beLastYearProposedTotal,
              beLastYearFixedTotal: responce.responseObject[i].beLastYearFixedTotal,
            });

            if (this.roleName == 'ARO_Division') {
              const requiredCreators = [
                'ARO_Division',
                // 'AEE_Division',
                // 'ACC_Clerk',
              ];

              if (responce.responseObject[i].aroDivisionStatus == 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else {
                this.daIsActiveBe = responce.responseObject[i].aroDivisionStatus
              }

              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );
              if (responce.responseObject[i].aroDivisionStatus === 'Active' || responce.responseObject[i].aroDivisionStatus === 'Approved') {
                console.log('424');
                this.aroPanel = true;
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks: responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature: responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
                this.AROremarksForm.disable();
              } else if (responce.responseObject[i].aroDivisionStatus === 'Draft') {
                console.log('436');
                this.aroPanel = true;
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks: responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature: responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
                this.AROremarksForm.get('aroDivisionRemarks').enable();
                this.AROremarksForm.get('aroDivisionSignature').enable();
                this.AROremarksForm.get('aroDivisionDate').enable();
              }
            }

            if (this.roleName == 'MMS_Division') {
              const requiredCreators = [
                'ARO_Division',
                // 'AEE_Division',
                // 'ACC_Clerk',
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].mmsDivisionStatus == 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else {
                this.daIsActiveBe = responce.responseObject[i].aroDivisionStatus
              }

              if (responce.responseObject[i].mmsDivisionStatus === 'Active' || responce.responseObject[i].mmsDivisionStatus === 'Approved') {
                console.log('424');
                this.aroPanel = true;
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks:
                    responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature:
                    responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
                this.AROremarksForm.disable();

                this.mmsPanel = true;
                this.MMSremarksForm.patchValue({
                  mmsDivisionRemarks:
                    responce.responseObject[i].mmsDivisionRemarks,
                  mmsDivisionSignature:
                    responce.responseObject[i].mmsDivisionSignature,
                  mmsDivisionDate: responce.responseObject[i].mmsDivisionDate,
                });
                this.MMSremarksForm.disable();
              } else if (
                responce.responseObject[i].mmsDivisionStatus === 'Draft' ||
                responce.responseObject[i].mmsDivisionStatus === ''
              ) {
                console.log('436');
                this.aroPanel = true;
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks:
                    responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature:
                    responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
                this.AROremarksForm.disable();

                this.mmsPanel = true;
                this.MMSremarksForm.patchValue({
                  mmsDivisionRemarks:
                    responce.responseObject[i].mmsDivisionRemarks,
                  mmsDivisionSignature:
                    responce.responseObject[i].mmsDivisionSignature,
                  mmsDivisionDate: responce.responseObject[i].mmsDivisionDate,
                });

                this.MMSremarksForm.get('mmsDivisionRemarks').enable();
                this.MMSremarksForm.get('mmsDivisionSignature').enable();
                this.MMSremarksForm.get('mmsDivisionDate').enable();
              }
            }

            if (this.roleName == 'AEE_Division') {
              const requiredCreators = [
                // 'ARO_Division',
                'AEE_Division',
                // 'ACC_Clerk',
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );
              if (responce.responseObject[i].aeeDivisionStatus == 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else {
                this.daIsActiveBe = responce.responseObject[i].aeeDivisionStatus
              }
              if (responce.responseObject[i].aeeDivisionStatus === 'Active' || responce.responseObject[i].aeeDivisionStatus === 'Approved') {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
                this.AEEremarksForm.disable();
              } else if (
                responce.responseObject[i].aeeDivisionStatus == 'Draft'
              ) {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
                this.AEEremarksForm.get('aeeDivisionRemarks').enable();
                this.AEEremarksForm.get('aeeDivisionSignature').enable();
                this.AEEremarksForm.get('aeeDivisionDate').enable();
              }
            }

            if (this.roleName == 'AE_Planning') {
              const requiredCreators = [
                // 'ARO_Division',
                'AEE_Division',
                // 'ACC_Clerk',
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].aePlanDivisionStatus == 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else {
                this.daIsActiveBe = responce.responseObject[i].aeeDivisionStatus
              }

              if (
                responce.responseObject[i].aePlanDivisionStatus === 'Active' || responce.responseObject[i].aePlanDivisionStatus === 'Approved'
              ) {
                console.log('424');
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
                this.AEEremarksForm.disable();

                this.aePlanPanel = true;

                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDate:
                    responce.responseObject[i].aePlanDivisionDate,
                });
                this.AE_PLANremarksForm.disable();
              } else if (
                responce.responseObject[i].aePlanDivisionStatus === 'Draft' ||
                responce.responseObject[i].aePlanDivisionStatus === ''
              ) {
                console.log('436');
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
                this.AEEremarksForm.disable();

                this.aePlanPanel = true;
                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDateRbe:
                    responce.responseObject[i].aePlanDivisionDateRbe,
                });

                this.AE_PLANremarksForm.get('aePlanDivisionRemarks').enable();
                this.AE_PLANremarksForm.get('aePlanDivisionSignature').enable();
                // this.AE_PLANremarksForm.get('aroDivisionDate').reset();
                this.AE_PLANremarksForm.get('aePlanDivisionDate').enable();
              }
            }

            if (this.roleName == 'ACC_Clerk') {
              const requiredCreators = [
                // 'ARO_Division',
                // 'AEE_Division',
                'ACC_Clerk',
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].accClerkStatus === 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else {
                this.daIsActiveBe = responce.responseObject[i].accClerkStatus
              }

              if (responce.responseObject[i].accClerkStatus === 'Active' || responce.responseObject[i].accClerkStatus === 'Approved') {
                this.accClerkPanel = true;
                this.ACCremarksForm.patchValue({
                  accClerkRemarks: responce.responseObject[i].accClerkRemarks,
                  accDivisionSignature:
                    responce.responseObject[i].accDivisionSignature,
                  accDivisionDate: responce.responseObject[i].accDivisionDate,
                });
                this.ACCremarksForm.disable();
              } else if (responce.responseObject[i].accClerkStatus == 'Draft') {
                this.accClerkPanel = true;

                this.ACCremarksForm.patchValue({
                  accClerkRemarks: responce.responseObject[i].accClerkRemarks,
                  accDivisionSignature: responce.responseObject[i].accDivisionSignature,
                  accDivisionDate: responce.responseObject[i].accDivisionDate,
                });

                // accClerkRemarks
                // accDivisionSignature
                // accDivisionDate

                // this.AEEremarksForm.get('accClerkRemarks').enable();
                // this.AEEremarksForm.get('accDivisionSignature').enable();
                // this.AEEremarksForm.get('accDivisionDate').enable();

                this.ACCremarksForm.get('accClerkRemarks').enable();
                this.ACCremarksForm.get('accDivisionSignature').enable();
                this.ACCremarksForm.get('accDivisionDate').enable();
              }
            }

            if (this.roleName == 'DA_Division') {
              if (this.viewMode) {
                this.DAremarksForm.disable();
              }

              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );
              console.log(this.creatorsPresent, '532');
              if (responce.responseObject[i].daDivisionStatus == 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else if (responce.responseObject[i].mmsDivisionStatus == 'Active' || responce.responseObject[i].aeeDivisionStatus == 'Active' || responce.responseObject[i].accClerkStatus == 'Active') {
                this.daIsActiveBe = 'Active'
              }

              if (responce.responseObject[i].aroDivisionStatus === 'Active' || responce.responseObject[i].aroDivisionStatus === 'Approved') {
                this.aroPanel = true;
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks:
                    responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature:
                    responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
              }

              if (responce.responseObject[i].mmsDivisionStatus === 'Active' || responce.responseObject[i].mmsDivisionStatus === 'Approved') {
                this.mmsPanel = true;
                this.MMSremarksForm.patchValue({
                  mmsDivisionRemarks:
                    responce.responseObject[i].mmsDivisionRemarks,
                  mmsDivisionSignature:
                    responce.responseObject[i].mmsDivisionSignature,
                  mmsDivisionDate: responce.responseObject[i].mmsDivisionDate,
                });
              }

              if (responce.responseObject[i].aeeDivisionStatus === 'Active' || responce.responseObject[i].aeeDivisionStatus === 'Approved') {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatus === 'Active' || responce.responseObject[i].aePlanDivisionStatus === 'Approved'
              ) {
                this.aePlanPanel = true;
                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDate:
                    responce.responseObject[i].aePlanDivisionDate,
                });
              }

              if (responce.responseObject[i].accClerkStatus === 'Active' || responce.responseObject[i].accClerkStatus === 'Approved') {
                this.accClerkPanel = true;
                this.ACCremarksForm.patchValue({
                  accClerkRemarks: responce.responseObject[i].accClerkRemarks,
                  accDivisionSignature:
                    responce.responseObject[i].accDivisionSignature,
                  accDivisionDate: responce.responseObject[i].accDivisionDate,
                });
              }

              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();

              if (
                responce.responseObject[i].daDivisionStatus === '' ||
                responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved'
              ) {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              } else if (
                responce.responseObject[i].daDivisionStatus === 'Draft'
              ) {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }
            }

            if (this.roleName == 'EE_Division') {
              if (this.viewMode) {
                this.EEremarksForm.disable();
              }
              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
                // 'DA_Division'
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );
              let daStatus = responce.responseObject[i].daDivisionStatus;
              this.daIsActiveBe = daStatus;
              // this.daPanel = true;

              if (responce.responseObject[i].aroDivisionStatus === 'Active' || responce.responseObject[i].aroDivisionStatus === 'Approved') {
                this.aroPanel = true;
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks:
                    responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature:
                    responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
              }

              if (responce.responseObject[i].mmsDivisionStatus === 'Active' || responce.responseObject[i].mmsDivisionStatus === 'Approved') {
                this.mmsPanel = true;
                this.MMSremarksForm.patchValue({
                  mmsDivisionRemarks:
                    responce.responseObject[i].mmsDivisionRemarks,
                  mmsDivisionSignature:
                    responce.responseObject[i].mmsDivisionSignature,
                  mmsDivisionDate: responce.responseObject[i].mmsDivisionDate,
                });
              }

              if (responce.responseObject[i].aeeDivisionStatus === 'Active' || responce.responseObject[i].aeeDivisionStatus === 'Approved') {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatus === 'Active' || responce.responseObject[i].aePlanDivisionStatus === 'Approved'
              ) {
                this.aePlanPanel = true;
                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDate:
                    responce.responseObject[i].aePlanDivisionDate,
                });
              }

              if (responce.responseObject[i].accClerkStatus === 'Active' || responce.responseObject[i].accClerkStatus === 'Approved') {
                this.accClerkPanel = true;
                this.ACCremarksForm.patchValue({
                  accClerkRemarks: responce.responseObject[i].accClerkRemarks,
                  accDivisionSignature:
                    responce.responseObject[i].accDivisionSignature,
                  accDivisionDate: responce.responseObject[i].accDivisionDate,
                });
              }

              if (responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved') {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }

              this.DAremarksForm.disable();
              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();

              if (
                responce.responseObject[i].eeDivisionStatus === '' ||
                responce.responseObject[i].eeDivisionStatus === 'Active' || responce.responseObject[i].eeDivisionStatus === 'Approved'
              ) {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              } else if (
                responce.responseObject[i].eeDivisionStatus === 'Draft'
              ) {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              }
            }

            if (this.roleName == 'RO') {
              if (this.viewMode) {
                this.ROremarksForm.disable();
              }

              const requiredCreators = ['ARO_Division', 'RO'];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].roStatus == 'Draft') {
                this.daIsActiveBe = 'Active';
              }
              else {
                this.daIsActiveBe = responce.responseObject[i].eeDivisionStatus
              }


              console.log(this.creatorsPresent, 'this.creatorsPresent');
              console.log(this.daIsActiveBe, 'this.daIsActiveBe');

              if (responce.responseObject[i].aroDivisionStatus === 'Active' || responce.responseObject[i].aroDivisionStatus === 'Approved') {
                this.aroPanel = true;
                console.log('dfbfsdgbfdbdfbdfbrdtbnhrstry434562456t');
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks:
                    responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature:
                    responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
              }

              if (responce.responseObject[i].mmsDivisionStatus === 'Active' || responce.responseObject[i].mmsDivisionStatus === 'Approved') {
                this.mmsPanel = true;
                this.MMSremarksForm.patchValue({
                  mmsDivisionRemarks:
                    responce.responseObject[i].mmsDivisionRemarks,
                  mmsDivisionSignature:
                    responce.responseObject[i].mmsDivisionSignature,
                  mmsDivisionDate: responce.responseObject[i].mmsDivisionDate,
                });
              }

              // if (responce.responseObject[i].aeeDivisionStatus === 'Active') {
              //   this.aeePanel = true;
              //   this.AEEremarksForm.patchValue({
              //     aeeDivisionRemarks:
              //       responce.responseObject[i].aeeDivisionRemarks,
              //     aeeDivisionSignature:
              //       responce.responseObject[i].aeeDivisionSignature,
              //     aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
              //   });
              // }

              // if (
              //   responce.responseObject[i].aePlanDivisionStatus === 'Active'
              // ) {
              //   this.aePlanPanel = true;
              //   this.AE_PLANremarksForm.patchValue({
              //     aePlanDivisionRemarks:
              //       responce.responseObject[i].aePlanDivisionRemarks,
              //     aePlanDivisionSignature:
              //       responce.responseObject[i].aePlanDivisionSignature,
              //     aePlanDivisionDate:
              //       responce.responseObject[i].aePlanDivisionDate,
              //   });
              // }

              // if (responce.responseObject[i].accClerkStatus === 'Active') {
              //   this.accClerkPanel = true;
              //   this.ACCremarksForm.patchValue({
              //     accClerkRemarks: responce.responseObject[i].accClerkRemarks,
              //     accDivisionSignature:
              //       responce.responseObject[i].accDivisionSignature,
              //     accDivisionDate: responce.responseObject[i].accDivisionDate,
              //   });
              // }

              if (responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved') {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }

              if (responce.responseObject[i].eeDivisionStatus === 'Active' || responce.responseObject[i].eeDivisionStatus === 'Approved') {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              }

              this.DAremarksForm.disable();
              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();
              this.EEremarksForm.disable();

              if (
                responce.responseObject[i].roStatus === '' ||
                responce.responseObject[i].roStatus === 'Active' || responce.responseObject[i].roStatus === 'Approved'
              ) {
                this.roPanel = true;
                this.ROremarksForm.patchValue({
                  roRemarks: responce.responseObject[i].roRemarks,
                  roSignature: responce.responseObject[i].roSignature,
                  roDate: responce.responseObject[i].roDate,
                });
              } else if (responce.responseObject[i].roStatus === 'Draft') {
                this.roPanel = true;
                this.ROremarksForm.patchValue({
                  roRemarks: responce.responseObject[i].roRemarks,
                  roSignature: responce.responseObject[i].roSignature,
                  roDate: responce.responseObject[i].roDate,
                });
              }
            }

            if (this.roleName == 'CRO') {
              if (this.viewMode) {
                this.CROremarksForm.disable();
              }

              const requiredCreators = ['ARO_Division', 'RO'
                // , 'RO_Headoffice'
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              let daStatus = responce.responseObject[i].roStatus;
              this.daIsActiveBe = daStatus;

              console.log(this.creatorsPresent, 'this.creatorsPresent');
              console.log(this.daIsActiveBe, 'this.daIsActiveBe');

              if (responce.responseObject[i].aroDivisionStatus === 'Active' || responce.responseObject[i].aroDivisionStatus === 'Approved') {
                this.aroPanel = true;
                console.log('dfbfsdgbfdbdfbdfbrdtbnhrstry434562456t');
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks:
                    responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature:
                    responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
              }

              if (responce.responseObject[i].mmsDivisionStatus === 'Active' || responce.responseObject[i].mmsDivisionStatus === 'Approved') {
                this.mmsPanel = true;
                this.MMSremarksForm.patchValue({
                  mmsDivisionRemarks:
                    responce.responseObject[i].mmsDivisionRemarks,
                  mmsDivisionSignature:
                    responce.responseObject[i].mmsDivisionSignature,
                  mmsDivisionDate: responce.responseObject[i].mmsDivisionDate,
                });
              }

              // if (responce.responseObject[i].aeeDivisionStatus === 'Active') {
              //   this.aeePanel = true;
              //   this.AEEremarksForm.patchValue({
              //     aeeDivisionRemarks:
              //       responce.responseObject[i].aeeDivisionRemarks,
              //     aeeDivisionSignature:
              //       responce.responseObject[i].aeeDivisionSignature,
              //     aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
              //   });
              // }

              // if (
              //   responce.responseObject[i].aePlanDivisionStatus === 'Active'
              // ) {
              //   this.aePlanPanel = true;
              //   this.AE_PLANremarksForm.patchValue({
              //     aePlanDivisionRemarks:
              //       responce.responseObject[i].aePlanDivisionRemarks,
              //     aePlanDivisionSignature:
              //       responce.responseObject[i].aePlanDivisionSignature,
              //     aePlanDivisionDate:
              //       responce.responseObject[i].aePlanDivisionDate,
              //   });
              // }

              // if (responce.responseObject[i].accClerkStatus === 'Active') {
              //   this.accClerkPanel = true;
              //   this.ACCremarksForm.patchValue({
              //     accClerkRemarks: responce.responseObject[i].accClerkRemarks,
              //     accDivisionSignature:
              //       responce.responseObject[i].accDivisionSignature,
              //     accDivisionDate: responce.responseObject[i].accDivisionDate,
              //   });
              // }

              if (responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved') {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }

              if (responce.responseObject[i].eeDivisionStatus === 'Active' || responce.responseObject[i].eeDivisionStatus === 'Approved') {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              }

              if (responce.responseObject[i].roStatus === 'Active' || responce.responseObject[i].roStatus === 'Approved') {
                this.roPanel = true;
                this.ROremarksForm.patchValue({
                  roRemarks: responce.responseObject[i].roRemarks,
                  roSignature: responce.responseObject[i].roSignature,
                  roDate: responce.responseObject[i].roDate,
                });
              }

              this.DAremarksForm.disable();
              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();
              this.EEremarksForm.disable();
              this.ROremarksForm.disable();

              if (
                responce.responseObject[i].croStatus === '' ||
                responce.responseObject[i].croStatus === 'Active' || responce.responseObject[i].croStatus === 'Approved'
              ) {
                this.croPanel = true;
                this.CROremarksForm.patchValue({
                  croRemarks: responce.responseObject[i].croRemarks,
                  croSignature: responce.responseObject[i].croSignature,
                  croDate: responce.responseObject[i].croDate,
                });
              } else if (responce.responseObject[i].croStatus === 'Draft') {
                this.croPanel = true;
                this.CROremarksForm.patchValue({
                  croRemarks: responce.responseObject[i].croRemarks,
                  croSignature: responce.responseObject[i].croSignature,
                  croDate: responce.responseObject[i].croDate,
                });
              }
            }

            if (this.roleName == 'EE_T_CELL') {
              if (this.viewMode) {
                this.eeTcellremarksForm.disable();
              }

              const requiredCreators = ['AEE_Division', 'EE_T_CELL'];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].eeTCellStatus == 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else {
                this.daIsActiveBe = responce.responseObject[i].eeTCellStatus;
              }

              console.log(this.creatorsPresent, 'this.creatorsPresent');
              console.log(this.daIsActiveBe, 'this.daIsActiveBe');

              if (responce.responseObject[i].aeeDivisionStatus === 'Active' || responce.responseObject[i].aeeDivisionStatus === 'Approved') {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatus === 'Active' || responce.responseObject[i].aePlanDivisionStatus === 'Approved'
              ) {
                this.aePlanPanel = true;
                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDate:
                    responce.responseObject[i].aePlanDivisionDate,
                });
              }

              if (responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved') {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }

              if (responce.responseObject[i].eeDivisionStatus === 'Active' || responce.responseObject[i].eeDivisionStatus === 'Approved') {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              }

              this.DAremarksForm.disable();
              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();
              this.EEremarksForm.disable();
              this.ROremarksForm.disable();
              this.CROremarksForm.disable();

              if (
                responce.responseObject[i].eeTCellStatus === '' ||
                responce.responseObject[i].eeTCellStatus === 'Active' || responce.responseObject[i].eeTCellStatus === 'Approved'
              ) {
                this.eeTcellPanel = true;
                this.eeTcellremarksForm.patchValue({
                  eeTCellRemarks: responce.responseObject[i].eeTCellRemarks,
                  eeTCellSignature: responce.responseObject[i].eeTCellSignature,
                  eeTCellDate: responce.responseObject[i].eeTCellDate,
                });
              } else if (responce.responseObject[i].eeTCellStatus === 'Draft') {
                this.eeTcellPanel = true;
                this.eeTcellremarksForm.patchValue({
                  eeTCellRemarks: responce.responseObject[i].eeTCellRemarks,
                  eeTCellSignature: responce.responseObject[i].eeTCellSignature,
                  eeTCellDate: responce.responseObject[i].eeTCellDate,
                });
              }
            }

            if (this.roleName == 'SE') {
              if (this.viewMode) {
                this.seremarksForm.disable();
              }

              const requiredCreators = ['AEE_Division', 'EE_T_CELL'
                // , 'EE_T_CELL_Headoffice'
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].seStatus == 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else {
                this.daIsActiveBe = responce.responseObject[i].eeTCellStatus;
              }

              if (responce.responseObject[i].aeeDivisionStatus === 'Active' || responce.responseObject[i].aeeDivisionStatus === 'Approved') {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatus === 'Active' || responce.responseObject[i].aePlanDivisionStatus === 'Approved'
              ) {
                this.aePlanPanel = true;
                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDate:
                    responce.responseObject[i].aePlanDivisionDate,
                });
              }

              // if (responce.responseObject[i].accClerkStatus === 'Active') {
              //   this.accClerkPanel = true;
              //   this.ACCremarksForm.patchValue({
              //     accClerkRemarks: responce.responseObject[i].accClerkRemarks,
              //     accDivisionSignature:
              //       responce.responseObject[i].accDivisionSignature,
              //     accDivisionDate: responce.responseObject[i].accDivisionDate,
              //   });
              // }

              if (responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved') {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }

              if (responce.responseObject[i].eeDivisionStatus === 'Active' || responce.responseObject[i].eeDivisionStatus === 'Approved') {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              }

              // if (responce.responseObject[i].roStatus === 'Active') {
              //   this.roPanel = true;
              //   this.ROremarksForm.patchValue({
              //     roRemarks: responce.responseObject[i].roRemarks,
              //     roSignature: responce.responseObject[i].roSignature,
              //     roDate: responce.responseObject[i].roDate,
              //   });
              // }

              if (responce.responseObject[i].eeTCellStatus === 'Active' || responce.responseObject[i].eeTCellStatus === 'Approved') {
                this.eeTcellPanel = true;
                this.eeTcellremarksForm.patchValue({
                  eeTCellRemarks: responce.responseObject[i].eeTCellRemarks,
                  eeTCellSignature: responce.responseObject[i].eeTCellSignature,
                  eeTCellDate: responce.responseObject[i].eeTCellDate,
                });
              }

              this.DAremarksForm.disable();
              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();
              this.EEremarksForm.disable();
              this.ROremarksForm.disable();
              this.eeTcellremarksForm.disable();

              if (
                responce.responseObject[i].seStatus === '' ||
                responce.responseObject[i].seStatus === 'Active' || responce.responseObject[i].seStatus === 'Approved'
              ) {
                this.sePanel = true;
                this.seremarksForm.patchValue({
                  seRemarks: responce.responseObject[i].seRemarks,
                  seSignature: responce.responseObject[i].seSignature,
                  seDate: responce.responseObject[i].seDate,
                });
              } else if (responce.responseObject[i].seStatus === 'Draft') {
                this.sePanel = true;
                this.seremarksForm.patchValue({
                  seRemarks: responce.responseObject[i].seRemarks,
                  seSignature: responce.responseObject[i].seSignature,
                  seDate: responce.responseObject[i].seDate,
                });
              }
            }

            if (this.roleName == 'CE') {
              if (this.viewMode) {
                this.CEremarksForm.disable();
              }

              const requiredCreators = ['AEE_Division', 'EE_T_CELL'
                // , 'SE_Headoffice'
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].ceStatus == 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else {
                this.daIsActiveBe = responce.responseObject[i].seStatus;
              }

              if (responce.responseObject[i].aeeDivisionStatus === 'Active' || responce.responseObject[i].aeeDivisionStatus === 'Approved') {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatus === 'Active' || responce.responseObject[i].aePlanDivisionStatus === 'Approved'
              ) {
                this.aePlanPanel = true;
                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDate:
                    responce.responseObject[i].aePlanDivisionDate,
                });
              }

              // if (responce.responseObject[i].accClerkStatus === 'Active') {
              //   this.accClerkPanel = true;
              //   this.ACCremarksForm.patchValue({
              //     accClerkRemarks: responce.responseObject[i].accClerkRemarks,
              //     accDivisionSignature:
              //       responce.responseObject[i].accDivisionSignature,
              //     accDivisionDate: responce.responseObject[i].accDivisionDate,
              //   });
              // }

              if (responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved') {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }

              if (responce.responseObject[i].eeDivisionStatus === 'Active' || responce.responseObject[i].eeDivisionStatus === 'Approved') {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              }

              // if (responce.responseObject[i].roStatus === 'Active') {
              //   this.roPanel = true;
              //   this.ROremarksForm.patchValue({
              //     roRemarks: responce.responseObject[i].roRemarks,
              //     roSignature: responce.responseObject[i].roSignature,
              //     roDate: responce.responseObject[i].roDate,
              //   });
              // }

              if (responce.responseObject[i].eeTCellStatus === 'Active' || responce.responseObject[i].eeTCellStatus === 'Approved') {
                this.eeTcellPanel = true;
                this.eeTcellremarksForm.patchValue({
                  eeTCellRemarks: responce.responseObject[i].eeTCellRemarks,
                  eeTCellSignature: responce.responseObject[i].eeTCellSignature,
                  eeTCellDate: responce.responseObject[i].eeTCellDate,
                });
              }

              if (responce.responseObject[i].seStatus === 'Active' || responce.responseObject[i].seStatus === 'Approved') {
                this.sePanel = true;
                this.seremarksForm.patchValue({
                  seRemarks: responce.responseObject[i].seRemarks,
                  seSignature: responce.responseObject[i].seSignature,
                  seDate: responce.responseObject[i].seDate,
                });
              }

              this.DAremarksForm.disable();
              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();
              this.EEremarksForm.disable();
              this.ROremarksForm.disable();
              this.eeTcellremarksForm.disable();
              this.seremarksForm.disable()

              if (
                responce.responseObject[i].ceStatus === '' ||
                responce.responseObject[i].ceStatus === 'Active' || responce.responseObject[i].ceStatus === 'Approved'
              ) {
                this.cePanel = true;
                this.CEremarksForm.patchValue({
                  ceRemarks: responce.responseObject[i].ceRemarks,
                  ceSignature: responce.responseObject[i].ceSignature,
                  ceDate: responce.responseObject[i].ceDate,
                });
              } else if (responce.responseObject[i].ceStatus === 'Draft') {
                this.cePanel = true;
                this.CEremarksForm.patchValue({
                  ceRemarks: responce.responseObject[i].ceRemarks,
                  ceSignature: responce.responseObject[i].ceSignature,
                  ceDate: responce.responseObject[i].ceDate,
                });
              }
            }

            if (this.roleName == 'AO') {
              if (this.viewMode) {
                this.AOremarksForm.disable();
              }
              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
                'RO',
                'EE_T_CELL',
                'AO'
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].croStatus == 'Active' || responce.responseObject[i].ceStatus == 'Active' || responce.responseObject[i].aoStatus == 'Active') {
                this.daIsActiveBe = 'Active'
              }

              if (responce.responseObject[i].aroDivisionStatus === 'Active' || responce.responseObject[i].aroDivisionStatus === 'Approved') {
                this.aroPanel = true;
                console.log('dfbfsdgbfdbdfbdfbrdtbnhrstry434562456t');
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks:
                    responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature:
                    responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
              }

              if (responce.responseObject[i].mmsDivisionStatus === 'Active' || responce.responseObject[i].mmsDivisionStatus === 'Approved') {
                this.mmsPanel = true;
                this.MMSremarksForm.patchValue({
                  mmsDivisionRemarks:
                    responce.responseObject[i].mmsDivisionRemarks,
                  mmsDivisionSignature:
                    responce.responseObject[i].mmsDivisionSignature,
                  mmsDivisionDate: responce.responseObject[i].mmsDivisionDate,
                });
              }

              if (responce.responseObject[i].aeeDivisionStatus === 'Active' || responce.responseObject[i].aeeDivisionStatus === 'Approved') {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatus === 'Active' || responce.responseObject[i].aePlanDivisionStatus === 'Approved'
              ) {
                this.aePlanPanel = true;
                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDate:
                    responce.responseObject[i].aePlanDivisionDate,
                });
              }

              if (responce.responseObject[i].accClerkStatus === 'Active' || responce.responseObject[i].accClerkStatus === 'Approved') {
                this.accClerkPanel = true;
                this.ACCremarksForm.patchValue({
                  accClerkRemarks: responce.responseObject[i].accClerkRemarks,
                  accDivisionSignature:
                    responce.responseObject[i].accDivisionSignature,
                  accDivisionDate: responce.responseObject[i].accDivisionDate,
                });
              }

              if (responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved') {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }

              if (responce.responseObject[i].eeDivisionStatus === 'Active' || responce.responseObject[i].eeDivisionStatus === 'Approved') {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              }

              if (responce.responseObject[i].roStatus === 'Active' || responce.responseObject[i].roStatus === 'Approved') {
                this.roPanel = true;
                this.ROremarksForm.patchValue({
                  roRemarks: responce.responseObject[i].roRemarks,
                  roSignature: responce.responseObject[i].roSignature,
                  roDate: responce.responseObject[i].roDate,
                });
              }

              if (responce.responseObject[i].croStatus === 'Active' || responce.responseObject[i].croStatus === 'Approved') {
                this.croPanel = true;
                this.CROremarksForm.patchValue({
                  croRemarks: responce.responseObject[i].croRemarks,
                  croSignature: responce.responseObject[i].croSignature,
                  croDate: responce.responseObject[i].croDate,
                });
              }


              if (responce.responseObject[i].eeTCellStatus === 'Active' || responce.responseObject[i].eeTCellStatus === 'Approved') {
                this.eeTcellPanel = true;
                this.eeTcellremarksForm.patchValue({
                  eeTCellRemarks: responce.responseObject[i].eeTCellRemarks,
                  eeTCellSignature: responce.responseObject[i].eeTCellSignature,
                  eeTCellDate: responce.responseObject[i].eeTCellDate,
                });
              }

              if (responce.responseObject[i].seStatus === 'Active' || responce.responseObject[i].seStatus === 'Approved') {
                this.sePanel = true;
                this.seremarksForm.patchValue({
                  seRemarks: responce.responseObject[i].seRemarks,
                  seSignature: responce.responseObject[i].seSignature,
                  seDate: responce.responseObject[i].seDate,
                });
              }

              if (responce.responseObject[i].ceStatus === 'Active' || responce.responseObject[i].ceStatus === 'Approved') {
                this.cePanel = true;
                this.CEremarksForm.patchValue({
                  ceRemarks: responce.responseObject[i].ceRemarks,
                  ceSignature: responce.responseObject[i].ceSignature,
                  ceDate: responce.responseObject[i].ceDate,
                });
              }

              this.DAremarksForm.disable();
              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();
              this.EEremarksForm.disable();
              this.ROremarksForm.disable();
              this.CROremarksForm.disable()
              this.eeTcellremarksForm.disable();
              this.seremarksForm.disable()
              this.CEremarksForm.disable()

              if (
                responce.responseObject[i].aoStatus === '' ||
                responce.responseObject[i].aoStatus === 'Active' || responce.responseObject[i].aoStatus === 'Approved'
              ) {
                this.aoPanel = true;
                this.AOremarksForm.patchValue({
                  aoRemarks: responce.responseObject[i].aoRemarks,
                  aoSignature: responce.responseObject[i].aoSignature,
                  aoDate: responce.responseObject[i].aoDate,
                });
              } else if (responce.responseObject[i].aoStatus === 'Draft') {
                this.aoPanel = true;
                this.AOremarksForm.patchValue({
                  aoRemarks: responce.responseObject[i].aoRemarks,
                  aoSignature: responce.responseObject[i].aoSignature,
                  aoDate: responce.responseObject[i].aoDate,
                });
              }
            }

            if (this.roleName == 'DCAO') {
              if (this.viewMode) {
                this.DCAOremarksForm.disable();
              }

              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
                'RO',
                'EE_T_CELL',
                'AO'
              ];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].dcAoStatus == 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else {
                this.daIsActiveBe = responce.responseObject[i].aoStatus
              }

              if (responce.responseObject[i].aroDivisionStatus === 'Active' || responce.responseObject[i].aroDivisionStatus === 'Approved') {
                this.aroPanel = true;
                console.log('dfbfsdgbfdbdfbdfbrdtbnhrstry434562456t');
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks:
                    responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature:
                    responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
              }

              if (responce.responseObject[i].mmsDivisionStatus === 'Active' || responce.responseObject[i].mmsDivisionStatus === 'Approved') {
                this.mmsPanel = true;
                this.MMSremarksForm.patchValue({
                  mmsDivisionRemarks:
                    responce.responseObject[i].mmsDivisionRemarks,
                  mmsDivisionSignature:
                    responce.responseObject[i].mmsDivisionSignature,
                  mmsDivisionDate: responce.responseObject[i].mmsDivisionDate,
                });
              }

              if (responce.responseObject[i].aeeDivisionStatus === 'Active' || responce.responseObject[i].aeeDivisionStatus === 'Approved') {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatus === 'Active' || responce.responseObject[i].aePlanDivisionStatus === 'Approved'
              ) {
                this.aePlanPanel = true;
                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDate:
                    responce.responseObject[i].aePlanDivisionDate,
                });
              }

              if (responce.responseObject[i].accClerkStatus === 'Active' || responce.responseObject[i].accClerkStatus === 'Approved') {
                this.accClerkPanel = true;
                this.ACCremarksForm.patchValue({
                  accClerkRemarks: responce.responseObject[i].accClerkRemarks,
                  accDivisionSignature:
                    responce.responseObject[i].accDivisionSignature,
                  accDivisionDate: responce.responseObject[i].accDivisionDate,
                });
              }

              if (responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved') {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }

              if (responce.responseObject[i].eeDivisionStatus === 'Active' || responce.responseObject[i].eeDivisionStatus === 'Approved') {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              }

              if (responce.responseObject[i].roStatus === 'Active' || responce.responseObject[i].roStatus === 'Approved') {
                this.roPanel = true;
                this.ROremarksForm.patchValue({
                  roRemarks: responce.responseObject[i].roRemarks,
                  roSignature: responce.responseObject[i].roSignature,
                  roDate: responce.responseObject[i].roDate,
                });
              }

              if (responce.responseObject[i].croStatus === 'Active' || responce.responseObject[i].croStatus === 'Approved') {
                this.croPanel = true;
                this.CROremarksForm.patchValue({
                  croRemarks: responce.responseObject[i].croRemarks,
                  croSignature: responce.responseObject[i].croSignature,
                  croDate: responce.responseObject[i].croDate,
                });
              }


              if (responce.responseObject[i].eeTCellStatus === 'Active' || responce.responseObject[i].eeTCellStatus === 'Approved') {
                this.eeTcellPanel = true;
                this.eeTcellremarksForm.patchValue({
                  eeTCellRemarks: responce.responseObject[i].eeTCellRemarks,
                  eeTCellSignature: responce.responseObject[i].eeTCellSignature,
                  eeTCellDate: responce.responseObject[i].eeTCellDate,
                });
              }

              if (responce.responseObject[i].seStatus === 'Active' || responce.responseObject[i].seStatus === 'Approved') {
                this.sePanel = true;
                this.seremarksForm.patchValue({
                  seRemarks: responce.responseObject[i].seRemarks,
                  seSignature: responce.responseObject[i].seSignature,
                  seDate: responce.responseObject[i].seDate,
                });
              }

              if (responce.responseObject[i].ceStatus === 'Active' || responce.responseObject[i].ceStatus === 'Approved') {
                this.cePanel = true;
                this.CEremarksForm.patchValue({
                  ceRemarks: responce.responseObject[i].ceRemarks,
                  ceSignature: responce.responseObject[i].ceSignature,
                  ceDate: responce.responseObject[i].ceDate,
                });
              }

              if (responce.responseObject[i].aoStatus === 'Active' || responce.responseObject[i].aoStatus === 'Approved') {
                this.aoPanel = true;
                this.AOremarksForm.patchValue({
                  aoRemarks: responce.responseObject[i].aoRemarks,
                  aoSignature: responce.responseObject[i].aoSignature,
                  aoDate: responce.responseObject[i].aoDate,
                });
              }

              this.DAremarksForm.disable();
              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();
              this.EEremarksForm.disable();
              this.ROremarksForm.disable();
              this.CROremarksForm.disable()
              this.eeTcellremarksForm.disable();
              this.seremarksForm.disable()
              this.CEremarksForm.disable()
              this.AOremarksForm.disable()

              if (
                responce.responseObject[i].dcAoStatus === '' ||
                responce.responseObject[i].dcAoStatus === 'Active' || responce.responseObject[i].dcAoStatus === 'Approved'
              ) {
                this.dcaoPanel = true;
                this.DCAOremarksForm.patchValue({
                  dcAoRemarks: responce.responseObject[i].dcAoRemarks,
                  dcAoSignature: responce.responseObject[i].dcAoSignature,
                  dcAoDate: responce.responseObject[i].dcAoDate,
                });
              } else if (responce.responseObject[i].dcAoStatus === 'Draft') {
                this.dcaoPanel = true;
                this.DCAOremarksForm.patchValue({
                  dcAoRemarks: responce.responseObject[i].dcAoRemarks,
                  dcAoSignature: responce.responseObject[i].dcAoSignature,
                  dcAoDate: responce.responseObject[i].dcAoDate,
                });
              }
            }

            if (this.roleName == 'FA') {
              if (this.viewMode) {
                this.FAremarksForm.disable();
              }

              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
                'RO',
                'EE_T_CELL',
                'AO'
              ];

              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].faStatus == 'Draft') {
                this.daIsActiveBe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].dcAoStatus
              }

              let daStatus = responce.responseObject[i].dcAoStatus;
              this.daIsActiveBe = daStatus;

              if (responce.responseObject[i].aroDivisionStatus === 'Active' || responce.responseObject[i].aroDivisionStatus === 'Approved') {
                this.aroPanel = true;
                console.log('dfbfsdgbfdbdfbdfbrdtbnhrstry434562456t');
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks:
                    responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature:
                    responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
              }

              if (responce.responseObject[i].mmsDivisionStatus === 'Active' || responce.responseObject[i].mmsDivisionStatus === 'Approved') {
                this.mmsPanel = true;
                this.MMSremarksForm.patchValue({
                  mmsDivisionRemarks:
                    responce.responseObject[i].mmsDivisionRemarks,
                  mmsDivisionSignature:
                    responce.responseObject[i].mmsDivisionSignature,
                  mmsDivisionDate: responce.responseObject[i].mmsDivisionDate,
                });
              }

              if (responce.responseObject[i].aeeDivisionStatus === 'Active' || responce.responseObject[i].aeeDivisionStatus === 'Approved') {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatus === 'Active' || responce.responseObject[i].aePlanDivisionStatus === 'Approved'
              ) {
                this.aePlanPanel = true;
                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDate:
                    responce.responseObject[i].aePlanDivisionDate,
                });
              }

              if (responce.responseObject[i].accClerkStatus === 'Active' || responce.responseObject[i].accClerkStatus === 'Approved') {
                this.accClerkPanel = true;
                this.ACCremarksForm.patchValue({
                  accClerkRemarks: responce.responseObject[i].accClerkRemarks,
                  accDivisionSignature:
                    responce.responseObject[i].accDivisionSignature,
                  accDivisionDate: responce.responseObject[i].accDivisionDate,
                });
              }

              if (responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved') {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }

              if (responce.responseObject[i].eeDivisionStatus === 'Active' || responce.responseObject[i].eeDivisionStatus === 'Approved') {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              }

              if (responce.responseObject[i].roStatus === 'Active' || responce.responseObject[i].roStatus === 'Approved') {
                this.roPanel = true;
                this.ROremarksForm.patchValue({
                  roRemarks: responce.responseObject[i].roRemarks,
                  roSignature: responce.responseObject[i].roSignature,
                  roDate: responce.responseObject[i].roDate,
                });
              }

              if (responce.responseObject[i].croStatus === 'Active' || responce.responseObject[i].croStatus === 'Approved') {
                this.croPanel = true;
                this.CROremarksForm.patchValue({
                  croRemarks: responce.responseObject[i].croRemarks,
                  croSignature: responce.responseObject[i].croSignature,
                  croDate: responce.responseObject[i].croDate,
                });
              }


              if (responce.responseObject[i].eeTCellStatus === 'Active' || responce.responseObject[i].eeTCellStatus === 'Approved') {
                this.eeTcellPanel = true;
                this.eeTcellremarksForm.patchValue({
                  eeTCellRemarks: responce.responseObject[i].eeTCellRemarks,
                  eeTCellSignature: responce.responseObject[i].eeTCellSignature,
                  eeTCellDate: responce.responseObject[i].eeTCellDate,
                });
              }

              if (responce.responseObject[i].seStatus === 'Active' || responce.responseObject[i].seStatus === 'Approved') {
                this.sePanel = true;
                this.seremarksForm.patchValue({
                  seRemarks: responce.responseObject[i].seRemarks,
                  seSignature: responce.responseObject[i].seSignature,
                  seDate: responce.responseObject[i].seDate,
                });
              }

              if (responce.responseObject[i].ceStatus === 'Active' || responce.responseObject[i].ceStatus === 'Approved') {
                this.cePanel = true;
                this.CEremarksForm.patchValue({
                  ceRemarks: responce.responseObject[i].ceRemarks,
                  ceSignature: responce.responseObject[i].ceSignature,
                  ceDate: responce.responseObject[i].ceDate,
                });
              }

              if (responce.responseObject[i].aoStatus === 'Active' || responce.responseObject[i].aoStatus === 'Approved') {
                this.aoPanel = true;
                this.AOremarksForm.patchValue({
                  aoRemarks: responce.responseObject[i].aoRemarks,
                  aoSignature: responce.responseObject[i].aoSignature,
                  aoDate: responce.responseObject[i].aoDate,
                });
              }

              if (responce.responseObject[i].dcAoStatus === 'Active' || responce.responseObject[i].dcAoStatus === 'Approved') {
                this.dcaoPanel = true;
                this.DCAOremarksForm.patchValue({
                  dcAoRemarks: responce.responseObject[i].dcAoRemarks,
                  dcAoSignature: responce.responseObject[i].dcAoSignature,
                  dcAoDate: responce.responseObject[i].dcAoDate,
                });
              }

              this.DAremarksForm.disable();
              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();
              this.EEremarksForm.disable();
              this.ROremarksForm.disable();
              this.CROremarksForm.disable()
              this.eeTcellremarksForm.disable();
              this.seremarksForm.disable()
              this.CEremarksForm.disable()
              this.AOremarksForm.disable()
              this.DCAOremarksForm.disable()

              if (
                responce.responseObject[i].faStatus === '' ||
                responce.responseObject[i].faStatus === 'Active' || responce.responseObject[i].faStatus === 'Approved'
              ) {
                this.faPanel = true;
                this.FAremarksForm.patchValue({
                  faRemarks: responce.responseObject[i].faRemarks,
                  faSignature: responce.responseObject[i].faSignature,
                  faDate: responce.responseObject[i].faDate,
                });
              } else if (responce.responseObject[i].faStatus === 'Draft') {
                this.faPanel = true;
                this.FAremarksForm.patchValue({
                  faRemarks: responce.responseObject[i].faRemarks,
                  faSignature: responce.responseObject[i].faSignature,
                  faDate: responce.responseObject[i].faDate,
                });
              }
            }

            if (this.roleName == 'MD') {
              if (this.viewMode) {
                this.MDremarksForm.disable();
              }

              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
                'RO',
                'EE_T_CELL',
                'AO'];
              this.creatorsPresent = requiredCreators.every((creator) =>
                this.getYearData.some((item) => item.creator === creator)
              );

              let daStatus = responce.responseObject[i].faStatus;
              this.daIsActiveBe = daStatus;

              if (responce.responseObject[i].aroDivisionStatus === 'Active' || responce.responseObject[i].aroDivisionStatus === 'Approved') {
                this.aroPanel = true;
                console.log('dfbfsdgbfdbdfbdfbrdtbnhrstry434562456t');
                this.AROremarksForm.patchValue({
                  aroDivisionRemarks:
                    responce.responseObject[i].aroDivisionRemarks,
                  aroDivisionSignature:
                    responce.responseObject[i].aroDivisionSignature,
                  aroDivisionDate: responce.responseObject[i].aroDivisionDate,
                });
              }

              if (responce.responseObject[i].mmsDivisionStatus === 'Active' || responce.responseObject[i].mmsDivisionStatus === 'Approved') {
                this.mmsPanel = true;
                this.MMSremarksForm.patchValue({
                  mmsDivisionRemarks:
                    responce.responseObject[i].mmsDivisionRemarks,
                  mmsDivisionSignature:
                    responce.responseObject[i].mmsDivisionSignature,
                  mmsDivisionDate: responce.responseObject[i].mmsDivisionDate,
                });
              }

              if (responce.responseObject[i].aeeDivisionStatus === 'Active' || responce.responseObject[i].aeeDivisionStatus === 'Approved') {
                this.aeePanel = true;
                this.AEEremarksForm.patchValue({
                  aeeDivisionRemarks:
                    responce.responseObject[i].aeeDivisionRemarks,
                  aeeDivisionSignature:
                    responce.responseObject[i].aeeDivisionSignature,
                  aeeDivisionDate: responce.responseObject[i].aeeDivisionDate,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatus === 'Active' || responce.responseObject[i].aePlanDivisionStatus === 'Approved'
              ) {
                this.aePlanPanel = true;
                this.AE_PLANremarksForm.patchValue({
                  aePlanDivisionRemarks:
                    responce.responseObject[i].aePlanDivisionRemarks,
                  aePlanDivisionSignature:
                    responce.responseObject[i].aePlanDivisionSignature,
                  aePlanDivisionDate:
                    responce.responseObject[i].aePlanDivisionDate,
                });
              }

              if (responce.responseObject[i].accClerkStatus === 'Active' || responce.responseObject[i].accClerkStatus === 'Approved') {
                this.accClerkPanel = true;
                this.ACCremarksForm.patchValue({
                  accClerkRemarks: responce.responseObject[i].accClerkRemarks,
                  accDivisionSignature:
                    responce.responseObject[i].accDivisionSignature,
                  accDivisionDate: responce.responseObject[i].accDivisionDate,
                });
              }

              if (responce.responseObject[i].daDivisionStatus === 'Active' || responce.responseObject[i].daDivisionStatus === 'Approved') {
                this.daPanel = true;
                this.DAremarksForm.patchValue({
                  daDivisionRemarks:
                    responce.responseObject[i].daDivisionRemarks,
                  daDivisionSignature:
                    responce.responseObject[i].daDivisionSignature,
                  daDivisionDate: responce.responseObject[i].daDivisionDate,
                });
              }

              if (responce.responseObject[i].eeDivisionStatus === 'Active' || responce.responseObject[i].eeDivisionStatus === 'Approved') {
                this.eePanel = true;
                this.EEremarksForm.patchValue({
                  eeDivisionRemarks:
                    responce.responseObject[i].eeDivisionRemarks,
                  eeDivisionSignature:
                    responce.responseObject[i].eeDivisionSignature,
                  eeDivisionDate: responce.responseObject[i].eeDivisionDate,
                });
              }

              if (responce.responseObject[i].roStatus === 'Active' || responce.responseObject[i].roStatus === 'Approved') {
                this.roPanel = true;
                this.ROremarksForm.patchValue({
                  roRemarks: responce.responseObject[i].roRemarks,
                  roSignature: responce.responseObject[i].roSignature,
                  roDate: responce.responseObject[i].roDate,
                });
              }

              if (responce.responseObject[i].croStatus === 'Active' || responce.responseObject[i].croStatus === 'Approved') {
                this.croPanel = true;
                this.CROremarksForm.patchValue({
                  croRemarks: responce.responseObject[i].croRemarks,
                  croSignature: responce.responseObject[i].croSignature,
                  croDate: responce.responseObject[i].croDate,
                });
              }


              if (responce.responseObject[i].eeTCellStatus === 'Active' || responce.responseObject[i].eeTCellStatus === 'Approved') {
                this.eeTcellPanel = true;
                this.eeTcellremarksForm.patchValue({
                  eeTCellRemarks: responce.responseObject[i].eeTCellRemarks,
                  eeTCellSignature: responce.responseObject[i].eeTCellSignature,
                  eeTCellDate: responce.responseObject[i].eeTCellDate,
                });
              }

              if (responce.responseObject[i].seStatus === 'Active' || responce.responseObject[i].seStatus === 'Approved') {
                this.sePanel = true;
                this.seremarksForm.patchValue({
                  seRemarks: responce.responseObject[i].seRemarks,
                  seSignature: responce.responseObject[i].seSignature,
                  seDate: responce.responseObject[i].seDate,
                });
              }

              if (responce.responseObject[i].ceStatus === 'Active' || responce.responseObject[i].ceStatus === 'Approved') {
                this.cePanel = true;
                this.CEremarksForm.patchValue({
                  ceRemarks: responce.responseObject[i].ceRemarks,
                  ceSignature: responce.responseObject[i].ceSignature,
                  ceDate: responce.responseObject[i].ceDate,
                });
              }

              if (responce.responseObject[i].aoStatus === 'Active' || responce.responseObject[i].aoStatus === 'Approved') {
                this.aoPanel = true;
                this.AOremarksForm.patchValue({
                  aoRemarks: responce.responseObject[i].aoRemarks,
                  aoSignature: responce.responseObject[i].aoSignature,
                  aoDate: responce.responseObject[i].aoDate,
                });
              }

              if (responce.responseObject[i].dcAoStatus === 'Active' || responce.responseObject[i].dcAoStatus === 'Approved') {
                this.dcaoPanel = true;
                this.DCAOremarksForm.patchValue({
                  dcAoRemarks: responce.responseObject[i].dcAoRemarks,
                  dcAoSignature: responce.responseObject[i].dcAoSignature,
                  dcAoDate: responce.responseObject[i].dcAoDate,
                });
              }

              if (responce.responseObject[i].faStatus === 'Active' || responce.responseObject[i].faStatus === 'Approved') {
                this.faPanel = true;
                this.FAremarksForm.patchValue({
                  faRemarks: responce.responseObject[i].faRemarks,
                  faSignature: responce.responseObject[i].faSignature,
                  faDate: responce.responseObject[i].faDate,
                });
              }

              this.DAremarksForm.disable();
              this.AEEremarksForm.disable();
              this.MMSremarksForm.disable();
              this.AE_PLANremarksForm.disable();
              this.ACCremarksForm.disable();
              this.AROremarksForm.disable();
              this.EEremarksForm.disable();
              this.ROremarksForm.disable();
              this.CROremarksForm.disable()
              this.eeTcellremarksForm.disable();
              this.seremarksForm.disable()
              this.CEremarksForm.disable()
              this.AOremarksForm.disable()
              this.DCAOremarksForm.disable()
              this.FAremarksForm.disable()

              if (
                responce.responseObject[i].mdStatus === '' ||
                responce.responseObject[i].mdStatus === 'Active' || responce.responseObject[i].mdStatus === 'Approved'
              ) {
                this.mdPanel = true;
                this.MDremarksForm.patchValue({
                  mdRemarks: responce.responseObject[i].mdRemarks,
                  mdSignature: responce.responseObject[i].mdSignature,
                  mdDate: responce.responseObject[i].mdDate,
                });
              } else if (responce.responseObject[i].mdStatus === 'Draft') {
                this.mdPanel = true;
                this.MDremarksForm.patchValue({
                  mdRemarks: responce.responseObject[i].mdRemarks,
                  mdSignature: responce.responseObject[i].mdSignature,
                  mdDate: responce.responseObject[i].mdDate,
                });
              }
            }
          }

          this.calculateTotals();

        });

    } else {
      console.log('API Error:');
    }
  }

  getViewAllMethodRBE() {
    console.log('RBE 486');
    if (this.id) {
      var params: { [key: string]: string } = {};

      if (this.paramsValue.divisionName != 'Head_office') {
        params['division'] = this.paramsValue.divisionName;
      }
      else {
        if (this.divisionNameSelect != 'all') {
          params['division'] = this.divisionNameSelect;
        }
      }

      if (this.roleName == 'MMS_Division') {
        params['roll'] = 'ARO_Division';
      }
      else if (this.roleName == 'AE_Planning') {
        params['roll'] = 'AEE_Division';
      }
      else if (this.roleName == 'CRO') {
        params['roll'] = 'RO';
      }
      else if (this.roleName == 'SE' ||
        this.roleName == 'CE') {
        params['roll'] = 'EE_T_CELL';
      }
      else if (this.roleName == 'DA_Division' || this.roleName == 'EE_Division') {
        if (this.roleFilterDropdown == 'All') {
          params['roll'] = this.roleName
        }
        else {
          params['roll'] = this.roleFilterDropdown;
        }
      }
      else if (this.roleName == 'AO' || this.roleName == 'DCAO' || this.roleName == 'FA') {
        if (this.roleFilterDropdown == 'All') {
          params['roll'] = this.roleName
        }
        else {
          params['roll'] = this.roleFilterDropdown;
        }
      }
      else {
        params['roll'] = this.roleName;
      }

      // list page routing roll

      if (this.paramsValue.divisionName != 'Head_office') {
        if (this.paramsValue.countOfDatas == 'Revenue') {
          params['roll'] = 'ARO_Division';
        }
        else if (this.paramsValue.countOfDatas == 'Work') {
          params['roll'] = 'AEE_Division';
        }
        else if (this.paramsValue.countOfDatas == 'Admin') {
          params['roll'] = 'ACC_Clerk';
        }
      }
      else {
        if (this.paramsValue.countOfDatas == 'Revenue') {
          params['roll'] = 'RO';
        }
        else if (this.paramsValue.countOfDatas == 'Work') {
          params['roll'] = 'EE_T_CELL';
        }
        else if (this.paramsValue.countOfDatas == 'Admin') {
          params['roll'] = 'AO';
        }
      }

      if (this.id) {
        params['rbeYear'] = this.id;
      }

      this.apiCall.apiPostCall_beRbe('api/rbe/getByFilter', params).subscribe(
        (responce) => {
          console.log(responce);
          this.getYearDataRBE = responce.responseObject;
          this.getYearDataLen = this.getYearDataRBE.length;

          this.getYearDataDecimal = responce.responseObject;
          this.getYearDataDecimalLen = this.getYearDataDecimal.length;
          console.log(this.getYearDataDecimalLen, 'getYearDataDecimalLen');
          console.log(this.getYearDataLen, 'getYearDataLen');

          this.filteredBudgetDateSourceRBE = responce.responseObject;
          console.log(this.getYearDataRBE, 'getYearDataRBE');

          if (this.mode == 'edit') {
            this.getYearDataRBE.forEach((value, i) => {
              this.getYearDataDecimal[i].actualsRbe = (parseFloat(value.actualsRbe)).toFixed(2);
              this.getYearDataDecimal[i].beRbe = (parseFloat(value.beRbe)).toFixed(2);
              this.getYearDataDecimal[i].actualsUpToRbe = (parseFloat(value.actualsUpToRbe)).toFixed(2);
              this.getYearDataDecimal[i].lastRbeProposed = (parseFloat(value.lastRbeProposed)).toFixed(2);
              this.getYearDataDecimal[i].lastRbeFixed = (parseFloat(value.lastRbeFixed)).toFixed(2);
            });
          }


          let approveStatus = this.getYearDataRBE.approvalStatus;

          if (
            this.userDivision != 'Head_office' &&
            approveStatus == 'Approved'
          ) {
            this.proposedTab = false;
          } else {
            this.proposedTab = true;
          }

          for (let i = 0; i < this.getYearDataRBE.length; i++) {
            this.yearMonthRbeForm.patchValue({
              scheduleRbe: responce.responseObject[i].schedule,
              codeNumberRbe: responce.responseObject[i].code,
              codeNameRbe: responce.responseObject[i].codeName,
              codeId: responce.responseObject[i].code.id,
              actualsYearRbe: responce.responseObject[i].actualsYearRbe,
              beYearRbe: responce.responseObject[i].beYearRbe,
              actualsUpToYearRbe: responce.responseObject[i].actualsUpToYearRbe,
              lastRbeYear: responce.responseObject[i].rbeYear,
              actualsUpToMonthRbe: responce.responseObject[i].actualsUpToMonthRbe,
              actualTotalRbe: responce.responseObject[i].actualsTotalRbe,
              beTotalRbe: responce.responseObject[i].beTotalRbe,
              actualsUpToTotalRbe: responce.responseObject[i].actualsUpToTotalRbe,
              lastRbeProposedTotal: responce.responseObject[i].lastRbeProposedTotal,
              lastRbeFixedTotal: responce.responseObject[i].lastRbeFixedTotal,
            });

            if (this.roleName == 'ARO_Division') {
              const requiredCreators = [
                'ARO_Division',
                // 'AEE_Division',
                // 'ACC_Clerk',
              ];
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].aroDivisionStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].aroDivisionStatusRbe
              }

              console.log();

              if (
                responce.responseObject[i].aroDivisionStatusRbe === 'Active' || responce.responseObject[i].aroDivisionStatusRbe === 'Approved'
              ) {
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe:
                    responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe:
                    responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe:
                    responce.responseObject[i].aroDivisionDateRbe,
                });
                this.AROremarksFormRbe.disable();
              } else if (
                responce.responseObject[i].aroDivisionStatusRbe === 'Draft'
              ) {
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe:
                    responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe:
                    responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe:
                    responce.responseObject[i].aroDivisionDateRbe,
                });
                this.AROremarksFormRbe.get('aroDivisionRemarksRbe').enable();
                this.AROremarksFormRbe.get('aroDivisionSignatureRbe').enable();
                this.AROremarksFormRbe.get('aroDivisionDateRbe').enable();
              }
            }

            if (this.roleName == 'MMS_Division') {
              const requiredCreators = [
                'ARO_Division',
                // 'AEE_Division',
                // 'ACC_Clerk',
              ];
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].mmsDivisionStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].aroDivisionStatusRbe
              }

              console.log(this.creatorsPresentRbe, 'this.creatorsPresentRbe');

              if (
                responce.responseObject[i].mmsDivisionStatusRbe === 'Active' || responce.responseObject[i].mmsDivisionStatusRbe === 'Approved'
              ) {
                console.log('1089');
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe: responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe: responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe: responce.responseObject[i].aroDivisionDateRbe,
                });
                this.AROremarksFormRbe.disable();

                this.mmsPanelRbe = true;
                this.MMSremarksFormRbe.patchValue({
                  mmsDivisionRemarksRbe: responce.responseObject[i].mmsDivisionRemarksRbe,
                  mmsDivisionSignatureRbe: responce.responseObject[i].mmsDivisionSignatureRbe,
                  mmsDivisionDateRbe: responce.responseObject[i].mmsDivisionDateRbe,
                });
                this.MMSremarksFormRbe.disable();
              } else if (
                responce.responseObject[i].mmsDivisionStatusRbe === 'Draft' ||
                responce.responseObject[i].mmsDivisionStatusRbe === ''
              ) {
                console.log('1115');

                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe: responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe: responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe: responce.responseObject[i].aroDivisionDateRbe,
                });
                this.AROremarksFormRbe.disable();

                this.mmsPanelRbe = true;
                this.MMSremarksFormRbe.patchValue({
                  mmsDivisionRemarksRbe: responce.responseObject[i].mmsDivisionRemarksRbe,
                  mmsDivisionSignatureRbe: responce.responseObject[i].mmsDivisionSignatureRbe,
                  mmsDivisionDateRbe: responce.responseObject[i].mmsDivisionDateRbe,
                });
                // this.MMSremarksFormRbe.disable();
                this.MMSremarksFormRbe.get('mmsDivisionRemarksRbe').enable();
                this.MMSremarksFormRbe.get('mmsDivisionSignatureRbe').enable();
                this.MMSremarksFormRbe.get('mmsDivisionDateRbe').enable();
              }
            }

            if (this.roleName == 'AEE_Division') {
              const requiredCreators = [
                // 'ARO_Division',
                'AEE_Division',
                // 'ACC_Clerk',
              ];
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].aeeDivisionStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].aeeDivisionStatusRbe
              }

              if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Active' || responce.responseObject[i].aeeDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
                this.AEEremarksFormRbe.disable();
              } else if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Draft'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
                this.AEEremarksFormRbe.get('aeeDivisionRemarksRbe').enable();
                this.AEEremarksFormRbe.get('aeeDivisionSignatureRbe').enable();
                this.AEEremarksFormRbe.get('aeeDivisionDateRbe').enable();
              }
            }

            if (this.roleName == 'AE_Planning') {
              const requiredCreators = [
                // 'ARO_Division',
                'AEE_Division',
                // 'ACC_Clerk',
              ];
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].aePlanDivisionStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].aeeDivisionStatusRbe
              }

              console.log(this.creatorsPresentRbe, 'this.creatorsPresentRbe');
              console.log(this.daIsActiveRbe, 'this.daIsActiveRbe');
              if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Active' || responce.responseObject[i].aePlanDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
                this.AEEremarksFormRbe.disable();

                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
                this.AE_PLANremarksFormRbe.disable();
              } else if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Draft' ||
                responce.responseObject[i].aePlanDivisionStatusRbe === ''
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
                this.AEEremarksFormRbe.disable();

                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
                this.AE_PLANremarksFormRbe.get(
                  'aePlanDivisionRemarksRbe'
                ).enable();
                this.AE_PLANremarksFormRbe.get(
                  'aePlanDivisionSignatureRbe'
                ).enable();
                this.AE_PLANremarksFormRbe.get(
                  'aePlanDivisionDateRbe'
                ).enable();
              }
            }

            if (this.roleName == 'ACC_Clerk') {
              const requiredCreators = [
                // 'ARO_Division',
                // 'AEE_Division',
                'ACC_Clerk',
              ];
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (responce.responseObject[i].accClerkStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].accClerkStatusRbe
              }

              if (responce.responseObject[i].accClerkStatusRbe === 'Active' || responce.responseObject[i].accClerkStatusRbe === 'Approved') {
                console.log('55559993333');
                this.accClerkPanelRbe = true;
                this.ACCremarksFormRbe.patchValue({
                  accClerkRemarksRbe: responce.responseObject[i].accClerkRemarksRbe,
                  accDivisionSignatureRbe: responce.responseObject[i].accDivisionSignatureRbe,
                  accDivisionDateRbe: responce.responseObject[i].accDivisionDateRbe,
                });
                this.ACCremarksFormRbe.disable();
              } else if (
                responce.responseObject[i].accClerkStatusRbe === 'Draft'
              ) {
                console.log('55559993333');
                this.accClerkPanelRbe = true;
                this.ACCremarksFormRbe.patchValue({
                  accClerkRemarksRbe: responce.responseObject[i].accClerkRemarksRbe,
                  accDivisionSignatureRbe: responce.responseObject[i].accDivisionSignatureRbe,
                  accDivisionDateRbe: responce.responseObject[i].accDivisionDateRbe,
                });

                this.ACCremarksFormRbe.get('accClerkRemarksRbe').enable();
                this.ACCremarksFormRbe.get('accDivisionSignatureRbe').enable();
                this.ACCremarksFormRbe.get('accDivisionDateRbe').enable();
              }
            }

            if (this.roleName == 'DA_Division') {
              if (this.viewMode) {
                this.DAremarksFormRbe.disable();
              }

              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
              ];

              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );
              console.log(this.creatorsPresentRbe, 'creatorsPresentRbe');

              if (responce.responseObject[i].daDivisionStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else if (responce.responseObject[i].mmsDivisionStatusRbe == 'Active' || responce.responseObject[i].aeeDivisionStatusRbe == 'Active' || responce.responseObject[i].accClerkStatusRbe == 'Active') {
                this.daIsActiveRbe = 'Active'
              }

              if (
                responce.responseObject[i].aroDivisionStatusRbe === 'Active' || responce.responseObject[i].aroDivisionStatusRbe === 'Approved'
              ) {
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe: responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe: responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe: responce.responseObject[i].aroDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].mmsDivisionStatusRbe === 'Active' || responce.responseObject[i].mmsDivisionStatusRbe === 'Approved'
              ) {
                this.mmsPanelRbe = true;
                this.MMSremarksFormRbe.patchValue({
                  mmsDivisionRemarksRbe: responce.responseObject[i].mmsDivisionRemarksRbe,
                  mmsDivisionSignatureRbe: responce.responseObject[i].mmsDivisionSignatureRbe,
                  mmsDivisionDateRbe: responce.responseObject[i].mmsDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Active' || responce.responseObject[i].aeeDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Active' || responce.responseObject[i].aePlanDivisionStatusRbe === 'Approved'
              ) {
                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].accClerkStatusRbe === 'Active' || responce.responseObject[i].accClerkStatusRbe === 'Approved') {
                this.accClerkPanelRbe = true;
                this.ACCremarksFormRbe.patchValue({
                  accClerkRemarksRbe: responce.responseObject[i].accClerkRemarksRbe,
                  accDivisionSignatureRbe: responce.responseObject[i].accDivisionSignatureRbe,
                  accDivisionDateRbe: responce.responseObject[i].accDivisionDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();

              if (
                responce.responseObject[i].daDivisionStatusRbe === '' ||
                responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved'
              ) {
                this.daPanelRbe = true;

                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              } else if (
                responce.responseObject[i].daDivisionStatusRbe === 'Draft'
              ) {
                this.daPanelRbe = true;
                console.log('948');

                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }
            }

            if (this.roleName == 'EE_Division') {
              let daStatus = responce.responseObject[i].daDivisionStatusRbe;
              this.daIsActiveRbe = daStatus;
              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
              ];
              console.log(this.getYearDataRBE, 'fgbnxfgnfnghdn');
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              this.daIsActiveRbe = responce.responseObject[i].daDivisionStatusRbe

              if (
                responce.responseObject[i].aroDivisionStatusRbe === 'Active' || responce.responseObject[i].aroDivisionStatusRbe === 'Approved'
              ) {
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe: responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe: responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe: responce.responseObject[i].aroDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].mmsDivisionStatusRbe === 'Active' || responce.responseObject[i].mmsDivisionStatusRbe === 'Approved'
              ) {
                this.mmsPanelRbe = true;
                this.MMSremarksFormRbe.patchValue({
                  mmsDivisionRemarksRbe: responce.responseObject[i].mmsDivisionRemarksRbe,
                  mmsDivisionSignatureRbe: responce.responseObject[i].mmsDivisionSignatureRbe,
                  mmsDivisionDateRbe: responce.responseObject[i].mmsDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Active' || responce.responseObject[i].aeeDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Active' || responce.responseObject[i].aePlanDivisionStatusRbe === 'Approved'
              ) {
                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].accClerkStatusRbe === 'Active' || responce.responseObject[i].accClerkStatusRbe === 'Approved') {
                this.accClerkPanelRbe = true;
                this.ACCremarksFormRbe.patchValue({
                  accClerkRemarksRbe: responce.responseObject[i].accClerkRemarksRbe,
                  accDivisionSignatureRbe: responce.responseObject[i].accDivisionSignatureRbe,
                  accDivisionDateRbe: responce.responseObject[i].accDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved') {
                this.daPanelRbe = true;
                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();
              this.DAremarksFormRbe.disable();

              if (
                responce.responseObject[i].eeDivisionStatusRbe === '' ||
                responce.responseObject[i].eeDivisionStatusRbe === 'Active' || responce.responseObject[i].eeDivisionStatusRbe === 'Approved'
              ) {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              } else if (
                responce.responseObject[i].eeDivisionStatusRbe === 'Draft'
              ) {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              }
            }

            if (this.roleName == 'RO') {
              if (this.viewMode) {
                this.ROremarksFormRbe.disable();
              }

              if (responce.responseObject[i].roStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].eeDivisionStatusRbe;
              }

              const requiredCreators = ['ARO_Division', 'RO'
              ];
              console.log(this.getYearDataRBE, 'fgbnxfgnfnghdn');
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );
              console.log(this.creatorsPresentRbe, 'this.creatorsPresentRbe');
              console.log(this.daIsActiveRbe, 'this.daIsActiveRbe');

              if (
                responce.responseObject[i].aroDivisionStatusRbe === 'Active' || responce.responseObject[i].aroDivisionStatusRbe === 'Approved'
              ) {
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe: responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe: responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe: responce.responseObject[i].aroDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].mmsDivisionStatusRbe === 'Active' || responce.responseObject[i].mmsDivisionStatusRbe === 'Approved'
              ) {
                this.mmsPanelRbe = true;
                this.MMSremarksFormRbe.patchValue({
                  mmsDivisionRemarksRbe: responce.responseObject[i].mmsDivisionRemarksRbe,
                  mmsDivisionSignatureRbe: responce.responseObject[i].mmsDivisionSignatureRbe,
                  mmsDivisionDateRbe: responce.responseObject[i].mmsDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved') {
                this.daPanelRbe = true;
                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeDivisionStatusRbe === 'Active' || responce.responseObject[i].eeDivisionStatusRbe === 'Approved') {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();
              this.DAremarksFormRbe.disable();
              this.EEremarksFormRbe.disable();

              if (
                responce.responseObject[i].roStatusRbe === '' ||
                responce.responseObject[i].roStatusRbe === 'Active' || responce.responseObject[i].roStatusRbe === 'Approved'
              ) {
                this.roPanelRbe = true;
                this.ROremarksFormRbe.patchValue({
                  roRemarksRbe: responce.responseObject[i].roRemarksRbe,
                  roSignatureRbe: responce.responseObject[i].roSignatureRbe,
                  roDateRbe: responce.responseObject[i].roDateRbe,
                });
              } else if (responce.responseObject[i].roStatusRbe === 'Draft') {
                this.roPanelRbe = true;
                this.ROremarksFormRbe.patchValue({
                  roRemarksRbe: responce.responseObject[i].roRemarksRbe,
                  roSignatureRbe: responce.responseObject[i].roSignatureRbe,
                  roDateRbe: responce.responseObject[i].roDateRbe,
                });
              }
            }

            if (this.roleName == 'CRO') {
              if (this.viewMode) {
                this.CROremarksFormRbe.disable();
              }
              let daStatus = responce.responseObject[i].roStatusRbe;
              this.daIsActiveRbe = daStatus;
              const requiredCreators = ['ARO_Division', 'RO'
                // , 'RO_Headoffice'
              ];
              console.log(this.getYearDataRBE, 'fgbnxfgnfnghdn');
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (
                responce.responseObject[i].aroDivisionStatusRbe === 'Active' || responce.responseObject[i].aroDivisionStatusRbe === 'Approved'
              ) {
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe: responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe: responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe: responce.responseObject[i].aroDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].mmsDivisionStatusRbe === 'Active' || responce.responseObject[i].mmsDivisionStatusRbe === 'Approved'
              ) {
                this.mmsPanelRbe = true;
                this.MMSremarksFormRbe.patchValue({
                  mmsDivisionRemarksRbe: responce.responseObject[i].mmsDivisionRemarksRbe,
                  mmsDivisionSignatureRbe: responce.responseObject[i].mmsDivisionSignatureRbe,
                  mmsDivisionDateRbe: responce.responseObject[i].mmsDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved') {
                this.daPanelRbe = true;
                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeDivisionStatusRbe === 'Active' || responce.responseObject[i].eeDivisionStatusRbe === 'Approved') {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].roStatusRbe === 'Active' || responce.responseObject[i].roStatusRbe === 'Approved') {
                this.roPanelRbe = true;
                this.ROremarksFormRbe.patchValue({
                  roRemarksRbe: responce.responseObject[i].roRemarksRbe,
                  roSignatureRbe: responce.responseObject[i].roSignatureRbe,
                  roDateRbe: responce.responseObject[i].roDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();
              this.DAremarksFormRbe.disable();
              this.EEremarksFormRbe.disable();
              this.ROremarksFormRbe.disable();

              if (
                responce.responseObject[i].croStatusRbe === '' ||
                responce.responseObject[i].croStatusRbe === 'Active' || responce.responseObject[i].croStatusRbe === 'Approved'
              ) {
                this.croPanelRbe = true;
                this.CROremarksFormRbe.patchValue({
                  croRemarksRbe: responce.responseObject[i].croRemarksRbe,
                  croSignatureRbe: responce.responseObject[i].croSignatureRbe,
                  croDateRbe: responce.responseObject[i].croDateRbe,
                });
              } else if (responce.responseObject[i].croStatusRbe === 'Draft') {
                this.croPanelRbe = true;
                this.CROremarksFormRbe.patchValue({
                  croRemarksRbe: responce.responseObject[i].croRemarksRbe,
                  croSignatureRbe: responce.responseObject[i].croSignatureRbe,
                  croDateRbe: responce.responseObject[i].croDateRbe,
                });
              }
            }

            if (this.roleName == 'EE_T_CELL') {
              if (this.viewMode) {
                this.eeTcellremarksFormRbe.disable();
              }

              if (responce.responseObject[i].eeTCellStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].eeTCellStatusRbe;
              }

              const requiredCreators = ['AEE_Division', 'EE_T_CELL'];
              console.log(this.getYearDataRBE, 'fgbnxfgnfnghdn');
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Active' || responce.responseObject[i].aeeDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Active' || responce.responseObject[i].aePlanDivisionStatusRbe === 'Approved'
              ) {
                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved') {
                this.daPanelRbe = true;
                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeDivisionStatusRbe === 'Active' || responce.responseObject[i].eeDivisionStatusRbe === 'Approved') {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();
              this.DAremarksFormRbe.disable();
              this.EEremarksFormRbe.disable();
              this.ROremarksFormRbe.disable();
              this.CROremarksFormRbe.disable();

              if (
                responce.responseObject[i].eeTCellStatusRbe === '' ||
                responce.responseObject[i].eeTCellStatusRbe === 'Active' || responce.responseObject[i].eeTCellStatusRbe === 'Approved'
              ) {
                this.eeTcellPanelRbe = true;
                this.eeTcellremarksFormRbe.patchValue({
                  eeTCellRemarksRbe: responce.responseObject[i].eeTCellRemarksRbe,
                  eeTCellSignatureRbe: responce.responseObject[i].eeTCellSignatureRbe,
                  eeTCellDateRbe: responce.responseObject[i].eeTCellDateRbe,
                });
              } else if (
                responce.responseObject[i].eeTCellStatusRbe === 'Draft'
              ) {
                this.eeTcellPanelRbe = true;
                this.eeTcellremarksFormRbe.patchValue({
                  eeTCellRemarksRbe: responce.responseObject[i].eeTCellRemarksRbe,
                  eeTCellSignatureRbe: responce.responseObject[i].eeTCellSignatureRbe,
                  eeTCellDateRbe: responce.responseObject[i].eeTCellDateRbe,
                });
              }
            }

            if (this.roleName == 'SE') {
              if (this.viewMode) {
                this.seremarksFormRbe.disable();
              }

              if (responce.responseObject[i].seStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].eeTCellStatusRbe;
              }

              const requiredCreators = ['AEE_Division', 'EE_T_CELL'];
              console.log(this.getYearDataRBE, 'fgbnxfgnfnghdn');
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Active' || responce.responseObject[i].aeeDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Active' || responce.responseObject[i].aePlanDivisionStatusRbe === 'Approved'
              ) {
                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved') {
                this.daPanelRbe = true;
                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeDivisionStatusRbe === 'Active' || responce.responseObject[i].eeDivisionStatusRbe === 'Approved') {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeTCellStatusRbe === 'Active' || responce.responseObject[i].eeTCellStatusRbe === 'Approved') {
                this.eeTcellPanelRbe = true;
                this.eeTcellremarksFormRbe.patchValue({
                  eeTCellRemarksRbe:
                    responce.responseObject[i].eeTCellRemarksRbe,
                  eeTCellSignatureRbe:
                    responce.responseObject[i].eeTCellSignatureRbe,
                  eeTCellDateRbe: responce.responseObject[i].eeTCellDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();
              this.DAremarksFormRbe.disable();
              this.EEremarksFormRbe.disable();
              this.ROremarksFormRbe.disable();
              this.eeTcellremarksFormRbe.disable()

              if (
                responce.responseObject[i].seStatusRbe === '' ||
                responce.responseObject[i].seStatusRbe === 'Active' || responce.responseObject[i].seStatusRbe === 'Approved'
              ) {
                this.sePanelRbe = true;
                this.seremarksFormRbe.patchValue({
                  seRemarksRbe: responce.responseObject[i].seRemarksRbe,
                  seSignatureRbe: responce.responseObject[i].seSignatureRbe,
                  seDateRbe: responce.responseObject[i].seDateRbe,
                });
              } else if (responce.responseObject[i].seStatusRbe === 'Draft') {
                this.sePanelRbe = true;
                this.seremarksFormRbe.patchValue({
                  seRemarksRbe: responce.responseObject[i].seRemarksRbe,
                  seSignatureRbe: responce.responseObject[i].seSignatureRbe,
                  seDateRbe: responce.responseObject[i].seDateRbe,
                });
              }
            }

            if (this.roleName == 'CE') {
              if (this.viewMode) {
                this.CEremarksFormRbe.disable();
              }

              if (responce.responseObject[i].ceStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].seStatusRbe;
              }

              const requiredCreators = ['AEE_Division', 'EE_T_CELL'
                // , 'SE_Headoffice'
              ];
              console.log(this.getYearDataRBE, 'fgbnxfgnfnghdn');
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Active' || responce.responseObject[i].aeeDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Active' || responce.responseObject[i].aePlanDivisionStatusRbe === 'Approved'
              ) {
                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved') {
                this.daPanelRbe = true;
                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeDivisionStatusRbe === 'Active' || responce.responseObject[i].eeDivisionStatusRbe === 'Approved') {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeTCellStatusRbe === 'Active' || responce.responseObject[i].eeTCellStatusRbe === 'Approved') {
                this.eeTcellPanelRbe = true;
                this.eeTcellremarksFormRbe.patchValue({
                  eeTCellRemarksRbe: responce.responseObject[i].eeTCellRemarksRbe,
                  eeTCellSignatureRbe: responce.responseObject[i].eeTCellSignatureRbe,
                  eeTCellDateRbe: responce.responseObject[i].eeTCellDateRbe,
                });
              }

              if (responce.responseObject[i].seStatusRbe === 'Active' || responce.responseObject[i].seStatusRbe === 'Approved') {
                this.sePanelRbe = true;
                this.seremarksFormRbe.patchValue({
                  seRemarksRbe: responce.responseObject[i].seRemarksRbe,
                  seSignatureRbe: responce.responseObject[i].seSignatureRbe,
                  seDateRbe: responce.responseObject[i].seDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();
              this.DAremarksFormRbe.disable();
              this.EEremarksFormRbe.disable();
              this.ROremarksFormRbe.disable();
              this.eeTcellremarksFormRbe.disable()
              this.seremarksFormRbe.disable()

              if (
                responce.responseObject[i].ceStatusRbe === '' ||
                responce.responseObject[i].ceStatusRbe === 'Active' || responce.responseObject[i].ceStatusRbe === 'Approved'
              ) {
                this.cePanelRbe = true;
                this.CEremarksFormRbe.patchValue({
                  ceRemarksRbe: responce.responseObject[i].ceRemarksRbe,
                  ceSignatureRbe: responce.responseObject[i].ceSignatureRbe,
                  ceDateRbe: responce.responseObject[i].ceDateRbe,
                });
              } else if (responce.responseObject[i].ceStatusRbe === 'Draft') {
                this.cePanelRbe = true;
                this.CEremarksFormRbe.patchValue({
                  ceRemarksRbe: responce.responseObject[i].ceRemarksRbe,
                  ceSignatureRbe: responce.responseObject[i].ceSignatureRbe,
                  ceDateRbe: responce.responseObject[i].ceDateRbe,
                });
              }
            }

            if (this.roleName == 'AO') {
              if (this.viewMode) {
                this.AOremarksFormRbe.disable();
              }

              if (responce.responseObject[i].croStatusRbe == 'Active' || responce.responseObject[i].ceStatusRbe == 'Active' || responce.responseObject[i].aoStatusRbe == 'Active') {
                this.daIsActiveRbe = 'Active'
              }

              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
                'RO',
                'EE_T_CELL',
                'AO'
              ];
              console.log(this.getYearDataRBE, 'fgbnxfgnfnghdn');
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (
                responce.responseObject[i].aroDivisionStatusRbe === 'Active' || responce.responseObject[i].aroDivisionStatusRbe === 'Approved'
              ) {
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe: responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe: responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe: responce.responseObject[i].aroDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].mmsDivisionStatusRbe === 'Active' || responce.responseObject[i].mmsDivisionStatusRbe === 'Approved'
              ) {
                this.mmsPanelRbe = true;
                this.MMSremarksFormRbe.patchValue({
                  mmsDivisionRemarksRbe: responce.responseObject[i].mmsDivisionRemarksRbe,
                  mmsDivisionSignatureRbe: responce.responseObject[i].mmsDivisionSignatureRbe,
                  mmsDivisionDateRbe: responce.responseObject[i].mmsDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Active' || responce.responseObject[i].aeeDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Active' || responce.responseObject[i].aePlanDivisionStatusRbe === 'Approved'
              ) {
                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].accClerkStatusRbe === 'Active' || responce.responseObject[i].accClerkStatusRbe === 'Approved') {
                this.accClerkPanelRbe = true;
                this.ACCremarksFormRbe.patchValue({
                  accClerkRemarksRbe: responce.responseObject[i].accClerkRemarksRbe,
                  accDivisionSignatureRbe: responce.responseObject[i].accDivisionSignatureRbe,
                  accDivisionDateRbe: responce.responseObject[i].accDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved') {
                this.daPanelRbe = true;
                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeDivisionStatusRbe === 'Active' || responce.responseObject[i].eeDivisionStatusRbe === 'Approved') {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].roStatusRbe === 'Active' || responce.responseObject[i].roStatusRbe === 'Approved') {
                this.roPanelRbe = true;
                this.ROremarksFormRbe.patchValue({
                  roRemarksRbe: responce.responseObject[i].roRemarksRbe,
                  roSignatureRbe: responce.responseObject[i].roSignatureRbe,
                  roDateRbe: responce.responseObject[i].roDateRbe,
                });
              }

              if (responce.responseObject[i].croStatusRbe === 'Active' || responce.responseObject[i].croStatusRbe === 'Approved') {
                this.croPanelRbe = true;
                this.CROremarksFormRbe.patchValue({
                  croRemarksRbe: responce.responseObject[i].croRemarksRbe,
                  croSignatureRbe: responce.responseObject[i].croSignatureRbe,
                  croDateRbe: responce.responseObject[i].croDateRbe,
                });
              }

              if (responce.responseObject[i].eeTCellStatusRbe === 'Active' || responce.responseObject[i].eeTCellStatusRbe === 'Approved') {
                this.eeTcellPanelRbe = true;
                this.eeTcellremarksFormRbe.patchValue({
                  eeTCellRemarksRbe: responce.responseObject[i].eeTCellRemarksRbe,
                  eeTCellSignatureRbe: responce.responseObject[i].eeTCellSignatureRbe,
                  eeTCellDateRbe: responce.responseObject[i].eeTCellDateRbe,
                });
              }

              if (responce.responseObject[i].seStatusRbe === 'Active' || responce.responseObject[i].seStatusRbe === 'Approved') {
                this.sePanelRbe = true;
                this.seremarksFormRbe.patchValue({
                  seRemarksRbe: responce.responseObject[i].seRemarksRbe,
                  seSignatureRbe: responce.responseObject[i].seSignatureRbe,
                  seDateRbe: responce.responseObject[i].seDateRbe,
                });
              }

              if (responce.responseObject[i].ceStatusRbe === 'Active' || responce.responseObject[i].ceStatusRbe === 'Approved') {
                this.cePanelRbe = true;
                this.CEremarksFormRbe.patchValue({
                  ceRemarksRbe: responce.responseObject[i].ceRemarksRbe,
                  ceSignatureRbe: responce.responseObject[i].ceSignatureRbe,
                  ceDateRbe: responce.responseObject[i].ceDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();
              this.DAremarksFormRbe.disable();
              this.EEremarksFormRbe.disable();
              this.ROremarksFormRbe.disable();
              this.CROremarksFormRbe.disable()
              this.eeTcellremarksFormRbe.disable()
              this.seremarksFormRbe.disable()
              this.CEremarksFormRbe.disable()

              if (
                responce.responseObject[i].aoStatusRbe === '' ||
                responce.responseObject[i].aoStatusRbe === 'Active' || responce.responseObject[i].aoStatusRbe === 'Approved'
              ) {
                this.aoPanelRbe = true;
                this.AOremarksFormRbe.patchValue({
                  aoRemarksRbe: responce.responseObject[i].aoRemarksRbe,
                  aoSignatureRbe: responce.responseObject[i].aoSignatureRbe,
                  aoDateRbe: responce.responseObject[i].aoDateRbe,
                });
              } else if (responce.responseObject[i].aoStatusRbe === 'Draft') {
                this.aoPanelRbe = true;
                this.AOremarksFormRbe.patchValue({
                  aoRemarksRbe: responce.responseObject[i].aoRemarksRbe,
                  aoSignatureRbe: responce.responseObject[i].aoSignatureRbe,
                  aoDateRbe: responce.responseObject[i].aoDateRbe,
                });;
              }
            }

            if (this.roleName == 'DCAO') {
              if (this.viewMode) {
                this.DCAOremarksFormRbe.disable();
              }

              if (responce.responseObject[i].dcAoStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].aoStatusRbe;
              }

              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
                'RO',
                'EE_T_CELL',
                'AO'
              ];
              console.log(this.getYearDataRBE, 'fgbnxfgnfnghdn');
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (
                responce.responseObject[i].aroDivisionStatusRbe === 'Active' || responce.responseObject[i].aroDivisionStatusRbe === 'Approved'
              ) {
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe: responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe: responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe: responce.responseObject[i].aroDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].mmsDivisionStatusRbe === 'Active' || responce.responseObject[i].mmsDivisionStatusRbe === 'Approved'
              ) {
                this.mmsPanelRbe = true;
                this.MMSremarksFormRbe.patchValue({
                  mmsDivisionRemarksRbe: responce.responseObject[i].mmsDivisionRemarksRbe,
                  mmsDivisionSignatureRbe: responce.responseObject[i].mmsDivisionSignatureRbe,
                  mmsDivisionDateRbe: responce.responseObject[i].mmsDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Active' || responce.responseObject[i].aeeDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Active' || responce.responseObject[i].aePlanDivisionStatusRbe === 'Approved'
              ) {
                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].accClerkStatusRbe === 'Active' || responce.responseObject[i].accClerkStatusRbe === 'Approved') {
                this.accClerkPanelRbe = true;
                this.ACCremarksFormRbe.patchValue({
                  accClerkRemarksRbe: responce.responseObject[i].accClerkRemarksRbe,
                  accDivisionSignatureRbe: responce.responseObject[i].accDivisionSignatureRbe,
                  accDivisionDateRbe: responce.responseObject[i].accDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved') {
                this.daPanelRbe = true;
                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeDivisionStatusRbe === 'Active' || responce.responseObject[i].eeDivisionStatusRbe === 'Approved') {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].roStatusRbe === 'Active' || responce.responseObject[i].roStatusRbe === 'Approved') {
                this.roPanelRbe = true;
                this.ROremarksFormRbe.patchValue({
                  roRemarksRbe: responce.responseObject[i].roRemarksRbe,
                  roSignatureRbe: responce.responseObject[i].roSignatureRbe,
                  roDateRbe: responce.responseObject[i].roDateRbe,
                });
              }

              if (responce.responseObject[i].croStatusRbe === 'Active' || responce.responseObject[i].croStatusRbe === 'Approved') {
                this.croPanelRbe = true;
                this.CROremarksFormRbe.patchValue({
                  croRemarksRbe: responce.responseObject[i].croRemarksRbe,
                  croSignatureRbe: responce.responseObject[i].croSignatureRbe,
                  croDateRbe: responce.responseObject[i].croDateRbe,
                });
              }

              if (responce.responseObject[i].eeTCellStatusRbe === 'Active' || responce.responseObject[i].eeTCellStatusRbe === 'Approved') {
                this.eeTcellPanelRbe = true;
                this.eeTcellremarksFormRbe.patchValue({
                  eeTCellRemarksRbe: responce.responseObject[i].eeTCellRemarksRbe,
                  eeTCellSignatureRbe: responce.responseObject[i].eeTCellSignatureRbe,
                  eeTCellDateRbe: responce.responseObject[i].eeTCellDateRbe,
                });
              }

              if (responce.responseObject[i].seStatusRbe === 'Active' || responce.responseObject[i].seStatusRbe === 'Approved') {
                this.sePanelRbe = true;
                this.seremarksFormRbe.patchValue({
                  seRemarksRbe: responce.responseObject[i].seRemarksRbe,
                  seSignatureRbe: responce.responseObject[i].seSignatureRbe,
                  seDateRbe: responce.responseObject[i].seDateRbe,
                });
              }

              if (responce.responseObject[i].ceStatusRbe === 'Active' || responce.responseObject[i].ceStatusRbe === 'Approved') {
                this.cePanelRbe = true;
                this.CEremarksFormRbe.patchValue({
                  ceRemarksRbe: responce.responseObject[i].ceRemarksRbe,
                  ceSignatureRbe: responce.responseObject[i].ceSignatureRbe,
                  ceDateRbe: responce.responseObject[i].ceDateRbe,
                });
              }

              if (responce.responseObject[i].aoStatusRbe === 'Active' || responce.responseObject[i].aoStatusRbe === 'Approved') {
                this.aoPanelRbe = true;
                this.AOremarksFormRbe.patchValue({
                  aoRemarksRbe: responce.responseObject[i].aoRemarksRbe,
                  aoSignatureRbe: responce.responseObject[i].aoSignatureRbe,
                  aoDateRbe: responce.responseObject[i].aoDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();
              this.DAremarksFormRbe.disable();
              this.EEremarksFormRbe.disable();
              this.ROremarksFormRbe.disable();
              this.CROremarksFormRbe.disable()
              this.eeTcellremarksFormRbe.disable()
              this.seremarksFormRbe.disable()
              this.CEremarksFormRbe.disable()
              this.AOremarksFormRbe.disable()

              if (
                responce.responseObject[i].dcAoStatusRbe === '' ||
                responce.responseObject[i].dcAoStatusRbe === 'Active' || responce.responseObject[i].dcAoStatusRbe === 'Approved'
              ) {
                this.dcaoPanelRbe = true;
                this.DCAOremarksFormRbe.patchValue({
                  dcAoRemarksRbe: responce.responseObject[i].dcAoRemarksRbe,
                  dcAoSignatureRbe: responce.responseObject[i].dcAoSignatureRbe,
                  dcAoDateRbe: responce.responseObject[i].dcAoDateRbe,
                });
              } else if (responce.responseObject[i].dcAoStatusRbe === 'Draft') {
                this.dcaoPanelRbe = true;
                this.DCAOremarksFormRbe.patchValue({
                  dcAoRemarksRbe: responce.responseObject[i].dcAoRemarksRbe,
                  dcAoSignatureRbe: responce.responseObject[i].dcAoSignatureRbe,
                  dcAoDateRbe: responce.responseObject[i].dcAoDateRbe,
                });
              }
            }

            if (this.roleName == 'FA') {
              if (this.viewMode) {
                this.FAremarksFormRbe.disable();
              }

              if (responce.responseObject[i].faStatusRbe == 'Draft') {
                this.daIsActiveRbe = 'Active'
              }
              else {
                this.daIsActiveRbe = responce.responseObject[i].dcAoStatusRbe;
              }

              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
                'RO',
                'EE_T_CELL',
                'AO'
              ];
              console.log(this.getYearDataRBE, 'fgbnxfgnfnghdn');
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (
                responce.responseObject[i].aroDivisionStatusRbe === 'Active' || responce.responseObject[i].aroDivisionStatusRbe === 'Approved'
              ) {
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe: responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe: responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe: responce.responseObject[i].aroDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].mmsDivisionStatusRbe === 'Active' || responce.responseObject[i].mmsDivisionStatusRbe === 'Approved'
              ) {
                this.mmsPanelRbe = true;
                this.MMSremarksFormRbe.patchValue({
                  mmsDivisionRemarksRbe: responce.responseObject[i].mmsDivisionRemarksRbe,
                  mmsDivisionSignatureRbe: responce.responseObject[i].mmsDivisionSignatureRbe,
                  mmsDivisionDateRbe: responce.responseObject[i].mmsDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Active' || responce.responseObject[i].aeeDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Active' || responce.responseObject[i].aePlanDivisionStatusRbe === 'Approved'
              ) {
                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].accClerkStatusRbe === 'Active' || responce.responseObject[i].accClerkStatusRbe === 'Approved') {
                this.accClerkPanelRbe = true;
                this.ACCremarksFormRbe.patchValue({
                  accClerkRemarksRbe: responce.responseObject[i].accClerkRemarksRbe,
                  accDivisionSignatureRbe: responce.responseObject[i].accDivisionSignatureRbe,
                  accDivisionDateRbe: responce.responseObject[i].accDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved') {
                this.daPanelRbe = true;
                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeDivisionStatusRbe === 'Active' || responce.responseObject[i].eeDivisionStatusRbe === 'Approved') {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].roStatusRbe === 'Active' || responce.responseObject[i].roStatusRbe === 'Approved') {
                this.roPanelRbe = true;
                this.ROremarksFormRbe.patchValue({
                  roRemarksRbe: responce.responseObject[i].roRemarksRbe,
                  roSignatureRbe: responce.responseObject[i].roSignatureRbe,
                  roDateRbe: responce.responseObject[i].roDateRbe,
                });
              }

              if (responce.responseObject[i].croStatusRbe === 'Active' || responce.responseObject[i].croStatusRbe === 'Approved') {
                this.croPanelRbe = true;
                this.CROremarksFormRbe.patchValue({
                  croRemarksRbe: responce.responseObject[i].croRemarksRbe,
                  croSignatureRbe: responce.responseObject[i].croSignatureRbe,
                  croDateRbe: responce.responseObject[i].croDateRbe,
                });
              }

              if (responce.responseObject[i].eeTCellStatusRbe === 'Active' || responce.responseObject[i].eeTCellStatusRbe === 'Approved') {
                this.eeTcellPanelRbe = true;
                this.eeTcellremarksFormRbe.patchValue({
                  eeTCellRemarksRbe: responce.responseObject[i].eeTCellRemarksRbe,
                  eeTCellSignatureRbe: responce.responseObject[i].eeTCellSignatureRbe,
                  eeTCellDateRbe: responce.responseObject[i].eeTCellDateRbe,
                });
              }

              if (responce.responseObject[i].seStatusRbe === 'Active' || responce.responseObject[i].seStatusRbe === 'Approved') {
                this.sePanelRbe = true;
                this.seremarksFormRbe.patchValue({
                  seRemarksRbe: responce.responseObject[i].seRemarksRbe,
                  seSignatureRbe: responce.responseObject[i].seSignatureRbe,
                  seDateRbe: responce.responseObject[i].seDateRbe,
                });
              }

              if (responce.responseObject[i].ceStatusRbe === 'Active' || responce.responseObject[i].ceStatusRbe === 'Approved') {
                this.cePanelRbe = true;
                this.CEremarksFormRbe.patchValue({
                  ceRemarksRbe: responce.responseObject[i].ceRemarksRbe,
                  ceSignatureRbe: responce.responseObject[i].ceSignatureRbe,
                  ceDateRbe: responce.responseObject[i].ceDateRbe,
                });
              }

              if (responce.responseObject[i].aoStatusRbe === 'Active' || responce.responseObject[i].aoStatusRbe === 'Approved') {
                this.aoPanelRbe = true;
                this.AOremarksFormRbe.patchValue({
                  aoRemarksRbe: responce.responseObject[i].aoRemarksRbe,
                  aoSignatureRbe: responce.responseObject[i].aoSignatureRbe,
                  aoDateRbe: responce.responseObject[i].aoDateRbe,
                });
              }

              if (responce.responseObject[i].dcAoStatusRbe === 'Active' || responce.responseObject[i].dcAoStatusRbe === 'Approved') {
                this.dcaoPanelRbe = true;
                this.DCAOremarksFormRbe.patchValue({
                  dcAoRemarksRbe: responce.responseObject[i].dcAoRemarksRbe,
                  dcAoSignatureRbe: responce.responseObject[i].dcAoSignatureRbe,
                  dcAoDateRbe: responce.responseObject[i].dcAoDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();
              this.DAremarksFormRbe.disable();
              this.EEremarksFormRbe.disable();
              this.ROremarksFormRbe.disable();
              this.CROremarksFormRbe.disable()
              this.eeTcellremarksFormRbe.disable()
              this.seremarksFormRbe.disable()
              this.CEremarksFormRbe.disable()
              this.AOremarksFormRbe.disable()
              this.DCAOremarksFormRbe.disable()

              if (
                responce.responseObject[i].faStatusRbe === '' ||
                responce.responseObject[i].faStatusRbe === 'Active' || responce.responseObject[i].faStatusRbe === 'Approved'
              ) {
                this.faPanelRbe = true;
                this.FAremarksFormRbe.patchValue({
                  faRemarksRbe: responce.responseObject[i].faRemarksRbe,
                  faSignatureRbe: responce.responseObject[i].faSignatureRbe,
                  faDateRbe: responce.responseObject[i].faDateRbe,
                });
              } else if (responce.responseObject[i].faStatusRbe === 'Draft') {
                this.faPanelRbe = true;
                this.FAremarksFormRbe.patchValue({
                  faRemarksRbe: responce.responseObject[i].faRemarksRbe,
                  faSignatureRbe: responce.responseObject[i].faSignatureRbe,
                  faDateRbe: responce.responseObject[i].faDateRbe,
                });
              }
            }

            if (this.roleName == 'MD') {
              if (this.viewMode) {
                this.MDremarksFormRbe.disable();
              }
              let daStatus = responce.responseObject[i].faStatusRbe;
              this.daIsActiveRbe = daStatus;
              const requiredCreators = [
                'ARO_Division',
                'AEE_Division',
                'ACC_Clerk',
                'RO',
                'EE_T_CELL',
                'AO'
                // 'FA_Headoffice'
              ];
              console.log(this.getYearDataRBE, 'fgbnxfgnfnghdn');
              this.creatorsPresentRbe = requiredCreators.every((creator) =>
                this.getYearDataRBE.some((item) => item.creator === creator)
              );

              if (
                responce.responseObject[i].aroDivisionStatusRbe === 'Active' || responce.responseObject[i].aroDivisionStatusRbe === 'Approved'
              ) {
                this.aroPanelRbe = true;
                this.AROremarksFormRbe.patchValue({
                  aroDivisionRemarksRbe: responce.responseObject[i].aroDivisionRemarksRbe,
                  aroDivisionSignatureRbe: responce.responseObject[i].aroDivisionSignatureRbe,
                  aroDivisionDateRbe: responce.responseObject[i].aroDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].mmsDivisionStatusRbe === 'Active' || responce.responseObject[i].mmsDivisionStatusRbe === 'Approved'
              ) {
                this.mmsPanelRbe = true;
                this.MMSremarksFormRbe.patchValue({
                  mmsDivisionRemarksRbe: responce.responseObject[i].mmsDivisionRemarksRbe,
                  mmsDivisionSignatureRbe: responce.responseObject[i].mmsDivisionSignatureRbe,
                  mmsDivisionDateRbe: responce.responseObject[i].mmsDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aeeDivisionStatusRbe === 'Active' || responce.responseObject[i].aeeDivisionStatusRbe === 'Approved'
              ) {
                this.aeePanelRbe = true;
                this.AEEremarksFormRbe.patchValue({
                  aeeDivisionRemarksRbe: responce.responseObject[i].aeeDivisionRemarksRbe,
                  aeeDivisionSignatureRbe: responce.responseObject[i].aeeDivisionSignatureRbe,
                  aeeDivisionDateRbe: responce.responseObject[i].aeeDivisionDateRbe,
                });
              }

              if (
                responce.responseObject[i].aePlanDivisionStatusRbe === 'Active' || responce.responseObject[i].aePlanDivisionStatusRbe === 'Approved'
              ) {
                this.aePlanPanelRbe = true;
                this.AE_PLANremarksFormRbe.patchValue({
                  aePlanDivisionRemarksRbe: responce.responseObject[i].aePlanDivisionRemarksRbe,
                  aePlanDivisionSignatureRbe: responce.responseObject[i].aePlanDivisionSignatureRbe,
                  aePlanDivisionDateRbe: responce.responseObject[i].aePlanDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].accClerkStatusRbe === 'Active' || responce.responseObject[i].accClerkStatusRbe === 'Approved') {
                this.accClerkPanelRbe = true;
                this.ACCremarksFormRbe.patchValue({
                  accClerkRemarksRbe:
                    responce.responseObject[i].accClerkRemarksRbe,
                  accDivisionSignatureRbe:
                    responce.responseObject[i].accDivisionSignatureRbe,
                  accDivisionDateRbe:
                    responce.responseObject[i].accDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].daDivisionStatusRbe === 'Active' || responce.responseObject[i].daDivisionStatusRbe === 'Approved') {
                this.daPanelRbe = true;
                this.DAremarksFormRbe.patchValue({
                  daDivisionRemarksRbe: responce.responseObject[i].daDivisionRemarksRbe,
                  daDivisionSignatureRbe: responce.responseObject[i].daDivisionSignatureRbe,
                  daDivisionDateRbe: responce.responseObject[i].daDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].eeDivisionStatusRbe === 'Active' || responce.responseObject[i].eeDivisionStatusRbe === 'Approved') {
                this.eePanelRbe = true;
                this.EEremarksFormRbe.patchValue({
                  eeDivisionRemarksRbe: responce.responseObject[i].eeDivisionRemarksRbe,
                  eeDivisionSignatureRbe: responce.responseObject[i].eeDivisionSignatureRbe,
                  eeDivisionDateRbe: responce.responseObject[i].eeDivisionDateRbe,
                });
              }

              if (responce.responseObject[i].roStatusRbe === 'Active' || responce.responseObject[i].roStatusRbe === 'Approved') {
                this.roPanelRbe = true;
                this.ROremarksFormRbe.patchValue({
                  roRemarksRbe: responce.responseObject[i].roRemarksRbe,
                  roSignatureRbe: responce.responseObject[i].roSignatureRbe,
                  roDateRbe: responce.responseObject[i].roDateRbe,
                });
              }

              if (responce.responseObject[i].croStatusRbe === 'Active' || responce.responseObject[i].croStatusRbe === 'Approved') {
                this.croPanelRbe = true;
                this.CROremarksFormRbe.patchValue({
                  croRemarksRbe: responce.responseObject[i].croRemarksRbe,
                  croSignatureRbe: responce.responseObject[i].croSignatureRbe,
                  croDateRbe: responce.responseObject[i].croDateRbe,
                });
              }

              if (responce.responseObject[i].eeTCellStatusRbe === 'Active' || responce.responseObject[i].eeTCellStatusRbe === 'Approved') {
                this.eeTcellPanelRbe = true;
                this.eeTcellremarksFormRbe.patchValue({
                  eeTCellRemarksRbe: responce.responseObject[i].eeTCellRemarksRbe,
                  eeTCellSignatureRbe: responce.responseObject[i].eeTCellSignatureRbe,
                  eeTCellDateRbe: responce.responseObject[i].eeTCellDateRbe,
                });
              }

              if (responce.responseObject[i].seStatusRbe === 'Active' || responce.responseObject[i].seStatusRbe === 'Approved') {
                this.sePanelRbe = true;
                this.seremarksFormRbe.patchValue({
                  seRemarksRbe: responce.responseObject[i].seRemarksRbe,
                  seSignatureRbe: responce.responseObject[i].seSignatureRbe,
                  seDateRbe: responce.responseObject[i].seDateRbe,
                });
              }

              if (responce.responseObject[i].ceStatusRbe === 'Active' || responce.responseObject[i].ceStatusRbe === 'Approved') {
                this.cePanelRbe = true;
                this.CEremarksFormRbe.patchValue({
                  ceRemarksRbe: responce.responseObject[i].ceRemarksRbe,
                  ceSignatureRbe: responce.responseObject[i].ceSignatureRbe,
                  ceDateRbe: responce.responseObject[i].ceDateRbe,
                });
              }

              if (responce.responseObject[i].aoStatusRbe === 'Active' || responce.responseObject[i].aoStatusRbe === 'Approved') {
                this.aoPanelRbe = true;
                this.AOremarksFormRbe.patchValue({
                  aoRemarksRbe: responce.responseObject[i].aoRemarksRbe,
                  aoSignatureRbe: responce.responseObject[i].aoSignatureRbe,
                  aoDateRbe: responce.responseObject[i].aoDateRbe,
                });
              }

              if (responce.responseObject[i].dcAoStatusRbe === 'Active' || responce.responseObject[i].dcAoStatusRbe === 'Approved') {
                this.dcaoPanelRbe = true;
                this.DCAOremarksFormRbe.patchValue({
                  dcAoRemarksRbe: responce.responseObject[i].dcAoRemarksRbe,
                  dcAoSignatureRbe: responce.responseObject[i].dcAoSignatureRbe,
                  dcAoDateRbe: responce.responseObject[i].dcAoDateRbe,
                });
              }

              if (responce.responseObject[i].faStatusRbe === 'Active' || responce.responseObject[i].faStatusRbe === 'Approved') {
                this.faPanelRbe = true;
                this.FAremarksFormRbe.patchValue({
                  faRemarksRbe: responce.responseObject[i].faRemarksRbe,
                  faSignatureRbe: responce.responseObject[i].faSignatureRbe,
                  faDateRbe: responce.responseObject[i].faDateRbe,
                });
              }

              this.AEEremarksFormRbe.disable();
              this.MMSremarksFormRbe.disable();
              this.AE_PLANremarksFormRbe.disable();
              this.ACCremarksFormRbe.disable();
              this.AROremarksFormRbe.disable();
              this.DAremarksFormRbe.disable();
              this.EEremarksFormRbe.disable();
              this.ROremarksFormRbe.disable();
              this.CROremarksFormRbe.disable()
              this.eeTcellremarksFormRbe.disable()
              this.seremarksFormRbe.disable()
              this.CEremarksFormRbe.disable()
              this.AOremarksFormRbe.disable()
              this.DCAOremarksFormRbe.disable()
              this.FAremarksFormRbe.disable()

              if (
                responce.responseObject[i].mdStatusRbe === '' ||
                responce.responseObject[i].mdStatusRbe === 'Active' || responce.responseObject[i].mdStatusRbe === 'Approved'
              ) {
                this.mdPanelRbe = true;
                this.MDremarksFormRbe.patchValue({
                  mdRemarksRbe: responce.responseObject[i].mdRemarksRbe,
                  mdSignatureRbe: responce.responseObject[i].mdSignatureRbe,
                  mdDateRbe: responce.responseObject[i].mdDateRbe,
                });
              } else if (responce.responseObject[i].mdStatusRbe === 'Draft') {
                this.mdPanelRbe = true;
                this.MDremarksFormRbe.patchValue({
                  mdRemarksRbe: responce.responseObject[i].mdRemarksRbe,
                  mdSignatureRbe: responce.responseObject[i].mdSignatureRbe,
                  mdDateRbe: responce.responseObject[i].mdDateRbe,
                });
              }
            }
            this.calculateTotalsRBE();
          }
        });
    }
  }

  formatDate_dd(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
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

  beUpdate() {
    this.isLoading = true;
    let forwardMessage = '';
    if (this.divisionNameSelect == 'Head_office' && this.userDivision == 'Head_office') {
      this.statusUpdate = 'Approved';
    } else if (this.divisionNameSelect != 'Head_office' && this.userDivision == 'Head_office') {
      this.statusUpdate = 'Approved';
    } else {
      this.statusUpdate = 'Active';
    }

    let dataToUpdateBE = [];

    console.log(this.getYearData, 'getYearData');

    if (this.roleName == 'ARO_Division') {
      forwardMessage = 'BE Forward To MMS_Division Successfully'
      console.log('ARO');
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,

          aroDivisionStatus: 'Active',
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          faStatus: element.faStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          aroDivisionRemarks: this.AROremarksForm.controls['aroDivisionRemarks'].value,
          aroDivisionSignature: this.AROremarksForm.controls['aroDivisionSignature'].value,
          aroDivisionDate: this.formatDate(this.AROremarksForm.controls['aroDivisionDate'].value),

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,
          status: '',

          subCodeBES: subCodes

        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'MMS_Division') {
      forwardMessage = 'BE Forward To DA_Division Successfully'
      console.log(this.getYearData, 'this.getYearData');

      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: 'Active',
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          faStatus: element.faStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          aroDivisionRemarks: this.AROremarksForm.controls['aroDivisionRemarks'].value,
          aroDivisionSignature: this.AROremarksForm.controls['aroDivisionSignature'].value,
          aroDivisionDate: this.AROremarksForm.controls['aroDivisionDate'].value,

          mmsDivisionRemarks: this.MMSremarksForm.controls['mmsDivisionRemarks'].value,
          mmsDivisionSignature: this.MMSremarksForm.controls['mmsDivisionSignature'].value,
          mmsDivisionDate: this.formatDate(this.MMSremarksForm.controls['mmsDivisionDate'].value),
          status: '',

          subCodeBES: subCodes,
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'AEE_Division') {
      forwardMessage = 'BE Forward To AE_Planning Successfully'
      console.log('AEE');
      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: 'Active',
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          faStatus: element.faStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          aeeDivisionRemarks:
            this.AEEremarksForm.controls['aeeDivisionRemarks'].value,
          aeeDivisionSignature:
            this.AEEremarksForm.controls['aeeDivisionSignature'].value,
          aeeDivisionDate: this.formatDate(
            this.AEEremarksForm.controls['aeeDivisionDate'].value
          ),
          status: '',

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,
          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'AE_Planning') {
      forwardMessage = 'BE Forward To DA_Division Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: 'Active',
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          faStatus: element.faStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          aeeDivisionRemarks: this.AEEremarksForm.controls['aeeDivisionRemarks'].value,
          aeeDivisionSignature: this.AEEremarksForm.controls['aeeDivisionSignature'].value,
          aeeDivisionDate: this.AEEremarksForm.controls['aeeDivisionDate'].value,

          aePlanDivisionRemarks: this.AE_PLANremarksForm.controls['aePlanDivisionRemarks'].value,
          aePlanDivisionSignature: this.AE_PLANremarksForm.controls['aePlanDivisionSignature'].value,
          aePlanDivisionDate: this.formatDate(this.AE_PLANremarksForm.controls['aePlanDivisionDate'].value),
          status: '',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'ACC_Clerk') {
      forwardMessage = 'BE Forward To DA_Division Successfully'

      console.log('ACC');
      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: 'Active',
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          accClerkRemarks: this.ACCremarksForm.controls['accClerkRemarks'].value,
          accDivisionSignature: this.ACCremarksForm.controls['accDivisionSignature'].value,
          accDivisionDate: this.formatDate(this.ACCremarksForm.controls['accDivisionDate'].value),
          status: '',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'DA_Division') {
      forwardMessage = 'BE Forward To EE_Division Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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
          approvalStatus: this.statusUpdate,
          division: element.division,

          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsCreatorTotal: element.actualsCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,
          beLastYearProposedCreatorTotal: element.beLastYearProposedCreatorTotal,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: 'Active',
          eeDivisionStatus: element.eeDivisionStatus,
          faStatus: element.faStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          aroDivisionRemarks: this.AROremarksForm.controls['aroDivisionRemarks'].value,
          aroDivisionSignature: this.AROremarksForm.controls['aroDivisionSignature'].value,
          aroDivisionDate: this.AROremarksForm.controls['aroDivisionDate'].value,

          mmsDivisionRemarks: this.MMSremarksForm.controls['mmsDivisionRemarks'].value,
          mmsDivisionSignature: this.MMSremarksForm.controls['mmsDivisionSignature'].value,
          mmsDivisionDate: this.MMSremarksForm.controls['mmsDivisionDate'].value,

          aeeDivisionRemarks: this.AEEremarksForm.controls['aeeDivisionRemarks'].value,
          aeeDivisionSignature: this.AEEremarksForm.controls['aeeDivisionSignature'].value,
          aeeDivisionDate: this.AEEremarksForm.controls['aeeDivisionDate'].value,

          aePlanDivisionRemarks: this.AE_PLANremarksForm.controls['aePlanDivisionRemarks'].value,
          aePlanDivisionSignature: this.AE_PLANremarksForm.controls['aePlanDivisionSignature'].value,
          aePlanDivisionDate: this.AE_PLANremarksForm.controls['aePlanDivisionDate'].value,

          accClerkRemarks: this.ACCremarksForm.controls['accClerkRemarks'].value,
          accDivisionSignature: this.ACCremarksForm.controls['accDivisionSignature'].value,
          accDivisionDate: this.ACCremarksForm.controls['accDivisionDate'].value,

          daDivisionRemarks: this.DAremarksForm.controls['daDivisionRemarks'].value,
          daDivisionSignature: this.DAremarksForm.controls['daDivisionSignature'].value,
          daDivisionDate: this.formatDate(this.DAremarksForm.controls['daDivisionDate'].value),
          status: '',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'EE_Division') {
      forwardMessage = 'BE Forward To RO_HeadOffice Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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
          approvalStatus: this.statusUpdate,
          division: element.division,
          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsCreatorTotal: element.actualsCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,
          beLastYearProposedCreatorTotal: element.beLastYearProposedCreatorTotal,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: 'Active',
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          aroDivisionRemarks: this.AROremarksForm.controls['aroDivisionRemarks'].value,
          aroDivisionSignature: this.AROremarksForm.controls['aroDivisionSignature'].value,
          aroDivisionDate: this.AROremarksForm.controls['aroDivisionDate'].value,

          mmsDivisionRemarks: this.MMSremarksForm.controls['mmsDivisionRemarks'].value,
          mmsDivisionSignature: this.MMSremarksForm.controls['mmsDivisionSignature'].value,
          mmsDivisionDate: this.MMSremarksForm.controls['mmsDivisionDate'].value,

          aeeDivisionRemarks: this.AEEremarksForm.controls['aeeDivisionRemarks'].value,
          aeeDivisionSignature: this.AEEremarksForm.controls['aeeDivisionSignature'].value,
          aeeDivisionDate: this.AEEremarksForm.controls['aeeDivisionDate'].value,

          aePlanDivisionRemarks: this.AE_PLANremarksForm.controls['aePlanDivisionRemarks'].value,
          aePlanDivisionSignature: this.AE_PLANremarksForm.controls['aePlanDivisionSignature'].value,
          aePlanDivisionDate: this.AE_PLANremarksForm.controls['aePlanDivisionDate'].value,

          accClerkRemarks: this.ACCremarksForm.controls['accClerkRemarks'].value,
          accDivisionSignature: this.ACCremarksForm.controls['accDivisionSignature'].value,
          accDivisionDate: this.ACCremarksForm.controls['accDivisionDate'].value,

          daDivisionRemarks: this.DAremarksForm.controls['daDivisionRemarks'].value,
          daDivisionSignature: this.DAremarksForm.controls['daDivisionSignature'].value,
          daDivisionDate: this.DAremarksForm.controls['daDivisionDate'].value,
          eeDivisionRemarks: this.EEremarksForm.controls['eeDivisionRemarks'].value,
          eeDivisionSignature: this.EEremarksForm.controls['eeDivisionSignature'].value,
          eeDivisionDate: this.formatDate(this.EEremarksForm.controls['eeDivisionDate'].value),
          status: '',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'RO') {
      forwardMessage = 'BE Forward To CRO_HeadOffice Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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
          approvalStatus: this.statusUpdate,
          // approvalStatus: '',
          division: element.division,

          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: 'Active',
          // roStatus: '',
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: this.ROremarksForm.controls['roRemarks'].value,
          roSignature: this.ROremarksForm.controls['roSignature'].value,
          roDate: this.formatDate(this.ROremarksForm.controls['roDate'].value),
          status: '',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'CRO') {
      forwardMessage = 'BE Forward To EE_T_CELL_HeadOffice Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,
          // approvalStatus: '',

          division: element.division,

          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: 'Active',
          // croStatus: '',
          eeTCellStatus: element.eeTCellStatus,

          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: this.CROremarksForm.controls['croRemarks'].value,
          croSignature: this.CROremarksForm.controls['croSignature'].value,
          croDate: this.formatDate(this.CROremarksForm.controls['croDate'].value),
          status: '',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'EE_T_CELL') {
      forwardMessage = 'BE Forward To SE_HeadOffice Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsCreatorTotal: this.yearMonthFormBE.controls['actualstotal'].value,
          actualsUpToCreatorTotal: this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearFixedCreatorTotal: this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,
          beLastYearProposedCreatorTotal: this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: 'Active',

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          eeTCellRemarks: this.eeTcellremarksForm.controls['eeTCellRemarks'].value,
          eeTCellSignature: this.eeTcellremarksForm.controls['eeTCellSignature'].value,
          eeTCellDate: this.formatDate(this.eeTcellremarksForm.controls['eeTCellDate'].value),
          status: '',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'SE') {
      forwardMessage = 'BE Forward To CE_HeadOffice Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,
          seStatus: 'Active',

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          seRemarks:
            this.seremarksForm.controls['seRemarks'].value,
          seSignature:
            this.seremarksForm.controls['seSignature'].value,
          seDate: this.formatDate(
            this.seremarksForm.controls['seDate'].value
          ),
          status: '',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'CE') {
      forwardMessage = 'BE Forward To AO_HeadOffice Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,
          seStatus: element.seStatus,
          ceStatus: 'Active',

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          seRemarks: element.seRemarks,
          seSignature: element.seSignature,
          seDate: element.seDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          ceRemarks:
            this.CEremarksForm.controls['ceRemarks'].value,
          ceSignature:
            this.CEremarksForm.controls['ceSignature'].value,
          ceDate: this.formatDate(
            this.CEremarksForm.controls['ceDate'].value
          ),
          status: '',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'AO') {

      forwardMessage = 'BE Forward To DCAO_HeadOffice Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsCreatorTotal: element.actualsCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,
          beLastYearProposedCreatorTotal:
            element.beLastYearProposedCreatorTotal,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,
          seStatus: element.seStatus,
          ceStatus: element.ceStatus,
          aoStatus: 'Active',

          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          accClerkRemarks: element.accClerkRemarks,
          accDivisionSignature: element.accDivisionSignature,
          accDivisionDate: element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          seRemarks: element.seRemarks,
          seSignature: element.seSignature,
          seDate: element.seDate,

          ceRemarks: element.ceRemarks,
          ceSignature: element.ceSignature,
          ceDate: element.ceDate,

          aoRemarks: this.AOremarksForm.controls['aoRemarks'].value,
          aoSignature: this.AOremarksForm.controls['aoSignature'].value,
          aoDate: this.formatDate(this.AOremarksForm.controls['aoDate'].value),
          status: '',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'DCAO') {

      forwardMessage = 'BE Forward To FA_HeadOffice Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsCreatorTotal: element.actualsCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,
          beLastYearProposedCreatorTotal:
            element.beLastYearProposedCreatorTotal,

          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,
          seStatus: element.seStatus,
          ceStatus: element.ceStatus,
          aoStatus: element.aoStatus,
          dcAoStatus: 'Active',

          aroDivisionRemarks:
            element.aroDivisionRemarks,
          aroDivisionSignature:
            element.aroDivisionSignature,
          aroDivisionDate:
            element.aroDivisionDate,

          mmsDivisionRemarks:
            element.mmsDivisionRemarks,
          mmsDivisionSignature:
            element.mmsDivisionSignature,
          mmsDivisionDate:
            element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          accClerkRemarks:
            element.accClerkRemarks,
          accDivisionSignature:
            element.accDivisionSignature,
          accDivisionDate:
            element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          seRemarks: element.seRemarks,
          seSignature: element.seSignature,
          seDate: element.seDate,

          ceRemarks: element.ceRemarks,
          ceSignature: element.ceSignature,
          ceDate: element.ceDate,

          aoRemarks: element.aoRemarks,
          aoSignature: element.aoSignature,
          aoDate: element.aoDate,

          dcAoRemarks:
            this.DCAOremarksForm.controls['dcAoRemarks'].value,
          dcAoSignature:
            this.DCAOremarksForm.controls['dcAoSignature'].value,
          dcAoDate: this.formatDate(
            this.DCAOremarksForm.controls['dcAoDate'].value
          ),
          status: '',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'FA') {
      forwardMessage = 'BE Forward To MD Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsCreatorTotal: element.actualsCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,
          beLastYearProposedCreatorTotal:
            element.beLastYearProposedCreatorTotal,

          // aroDivisionStatus: element.aroDivisionStatus,
          // mmsDivisionStatus: element.mmsDivisionStatus,
          // aeeDivisionStatus: element.aeeDivisionStatus,
          // aePlanDivisionStatus: element.aePlanDivisionStatus,
          // accClerkStatus: element.accClerkStatus,
          // daDivisionStatus: element.daDivisionStatus,
          // eeDivisionStatus: element.eeDivisionStatus,
          // roStatus: element.roStatus,
          // croStatus: element.croStatus,
          // eeTCellStatus: element.eeTCellStatus,
          // seStatus: element.seStatus,
          // ceStatus: element.ceStatus,
          // aoStatus: element.aoStatus,
          // dcAoStatus: element.dcAoStatus,
          // faStatus: 'Active',

          aroDivisionStatus: 'Approved',
          mmsDivisionStatus: 'Approved',
          aeeDivisionStatus: 'Approved',
          aePlanDivisionStatus: 'Approved',
          accClerkStatus: 'Approved',
          daDivisionStatus: 'Approved',
          eeDivisionStatus: 'Approved',
          roStatus: 'Approved',
          croStatus: 'Approved',
          eeTCellStatus: 'Approved',
          seStatus: 'Approved',
          ceStatus: 'Approved',
          aoStatus: 'Approved',
          dcAoStatus: 'Approved',
          faStatus: 'Approved',
          mdStatus: 'Approved',

          aroDivisionRemarks:
            element.aroDivisionRemarks,
          aroDivisionSignature:
            element.aroDivisionSignature,
          aroDivisionDate:
            element.aroDivisionDate,

          mmsDivisionRemarks:
            element.mmsDivisionRemarks,
          mmsDivisionSignature:
            element.mmsDivisionSignature,
          mmsDivisionDate:
            element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          accClerkRemarks:
            element.accClerkRemarks,
          accDivisionSignature:
            element.accDivisionSignature,
          accDivisionDate:
            element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          seRemarks: element.seRemarks,
          seSignature: element.seSignature,
          seDate: element.seDate,

          ceRemarks: element.ceRemarks,
          ceSignature: element.ceSignature,
          ceDate: element.ceDate,

          aoRemarks: element.aoRemarks,
          aoSignature: element.aoSignature,
          aoDate: element.aoDate,

          dcAoRemarks: element.dcAoRemarks,
          dcAoSignature: element.dcAoSignature,
          dcAoDate: element.dcAoDate,

          faRemarks:
            this.FAremarksForm.controls['faRemarks'].value,
          faSignature:
            this.FAremarksForm.controls['faSignature'].value,
          faDate: this.formatDate(
            this.FAremarksForm.controls['faDate'].value
          ),
          status: '',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'MD') {
      forwardMessage = 'BE Approved Successfully'

      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, 'dsfvdfvdfv');
        let data = {
          id: element.id,

          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          codeId: element.code.id,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,
          creator: element.creator,
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

          approvalStatus: this.statusUpdate,

          division: element.division,

          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsCreatorTotal: element.actualsCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,
          beLastYearProposedCreatorTotal:
            element.beLastYearProposedCreatorTotal,

          aroDivisionStatus: 'Approved',
          mmsDivisionStatus: 'Approved',
          aeeDivisionStatus: 'Approved',
          aePlanDivisionStatus: 'Approved',
          accClerkStatus: 'Approved',
          daDivisionStatus: 'Approved',
          eeDivisionStatus: 'Approved',
          roStatus: 'Approved',
          croStatus: 'Approved',
          eeTCellStatus: 'Approved',
          seStatus: 'Approved',
          ceStatus: 'Approved',
          aoStatus: 'Approved',
          dcAoStatus: 'Approved',
          faStatus: 'Approved',
          mdStatus: 'Approved',

          aroDivisionRemarks:
            element.aroDivisionRemarks,
          aroDivisionSignature:
            element.aroDivisionSignature,
          aroDivisionDate:
            element.aroDivisionDate,

          mmsDivisionRemarks:
            element.mmsDivisionRemarks,
          mmsDivisionSignature:
            element.mmsDivisionSignature,
          mmsDivisionDate:
            element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          accClerkRemarks:
            element.accClerkRemarks,
          accDivisionSignature:
            element.accDivisionSignature,
          accDivisionDate:
            element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          seRemarks: element.seRemarks,
          seSignature: element.seSignature,
          seDate: element.seDate,

          ceRemarks: element.ceRemarks,
          ceSignature: element.ceSignature,
          ceDate: element.ceDate,

          aoRemarks: element.aoRemarks,
          aoSignature: element.aoSignature,
          aoDate: element.aoDate,

          dcAoRemarks: element.dcAoRemarks,
          dcAoSignature: element.dcAoSignature,
          dcAoDate: element.dcAoDate,

          faRemarks: element.faRemarks,
          faSignature: element.faSignature,
          faDate: element.faDate,

          mdRemarks:
            this.MDremarksForm.controls['mdRemarks'].value,
          mdSignature:
            this.MDremarksForm.controls['mdSignature'].value,
          mdDate: this.formatDate(
            this.MDremarksForm.controls['mdDate'].value
          ),
          status: '',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    }

    console.log('BE save data ================= ', dataToUpdateBE);

    if (this.searchFilterValue == '') {
      this.apiCall.apiPostCall('api/be/edit', dataToUpdateBE).subscribe(
        (responce) => {
          if (responce) {
            this.isLoading = false;
          }
          console.log('save all the years form for BBBBEEE', responce.data);
          this.snackBar.open(forwardMessage, 'Close', { duration: 3000 })
          this.route.navigate(['/famodule/home/budget']);
        },
        (error) => {
          console.log(error.message);
          this.isLoading = false;
          this.snackBar.open('Check All fields are filled', 'Close', { duration: 3000 })
        }
      );
    }
    else {
      this.isLoading = false;
      this.snackBar.open('Clear The Search Filter', 'Close', { duration: 3000 })
    }
  }

  DraftBeUpdate() {
    if (
      this.userDivision == 'Head_office' &&
      this.divisionNameSelect != 'Head_office'
    ) {
      this.statusUpdate = 'Pending';
    } else if (this.userDivision != 'Head_office') {
      this.statusUpdate = 'Draft';
    }

    let dataToUpdateBE = [];
    this.getYearData.forEach((element) => {
      element.status = 'Yes'
    });

    if (this.roleName == 'ARO_Division') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

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

          division: element.division,
          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: 'Draft',
          aeeDivisionStatus: '',
          accClerkStatus: '',
          mmsDivisionStatus: '',
          aePlanDivisionStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          faStatus: '',
          roStatus: '',
          croStatus: '',
          eeTCellStatus: '',

          aroDivisionRemarks:
            this.AROremarksForm.controls['aroDivisionRemarks'].value,
          aroDivisionSignature:
            this.AROremarksForm.controls['aroDivisionSignature'].value,
          aroDivisionDate: this.formatDate(
            this.AROremarksForm.controls['aroDivisionDate'].value
          ),

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,
          status: 'Yes',

          subCodeBES: subCodes

        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'MMS_Division') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        let data = {
          id: element.id,

          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,
          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          division: element.division,
          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: 'Draft',
          aeeDivisionStatus: '',
          aePlanDivisionStatus: '',
          accClerkStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          faStatus: '',
          roStatus: '',
          croStatus: '',
          eeTCellStatus: '',

          aroDivisionRemarks:
            this.AROremarksForm.controls['aroDivisionRemarks'].value,
          aroDivisionSignature:
            this.AROremarksForm.controls['aroDivisionSignature'].value,
          aroDivisionDate:
            this.AROremarksForm.controls['aroDivisionDate'].value,
          mmsDivisionRemarks:
            this.MMSremarksForm.controls['mmsDivisionRemarks'].value,
          mmsDivisionSignature:
            this.MMSremarksForm.controls['mmsDivisionSignature'].value,
          mmsDivisionDate: this.formatDate(
            this.MMSremarksForm.controls['mmsDivisionDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }


        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'AEE_Division') {
      this.getYearData.forEach((element) => {
        let subCodes = [];
        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          division: element.division,
          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: '',
          mmsDivisionStatus: '',
          aeeDivisionStatus: 'Draft',
          aePlanDivisionStatus: '',
          accClerkStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          faStatus: '',
          roStatus: '',
          croStatus: '',
          eeTCellStatus: '',

          aeeDivisionRemarks:
            this.AEEremarksForm.controls['aeeDivisionRemarks'].value,
          aeeDivisionSignature:
            this.AEEremarksForm.controls['aeeDivisionSignature'].value,
          aeeDivisionDate: this.formatDate(
            this.AEEremarksForm.controls['aeeDivisionDate'].value
          ),

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,
          status: 'Yes',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }


        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'AE_Planning') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          division: element.division,
          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: '',
          mmsDivisionStatus: '',
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: 'Draft',
          accClerkStatus: '',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          faStatus: '',
          roStatus: '',
          croStatus: '',
          eeTCellStatus: '',

          aeeDivisionRemarks:
            this.AEEremarksForm.controls['aeeDivisionRemarks'].value,
          aeeDivisionSignature:
            this.AEEremarksForm.controls['aeeDivisionSignature'].value,
          aeeDivisionDate:
            this.AEEremarksForm.controls['aeeDivisionDate'].value,
          aePlanDivisionRemarks:
            this.AE_PLANremarksForm.controls['aePlanDivisionRemarks'].value,
          aePlanDivisionSignature:
            this.AE_PLANremarksForm.controls['aePlanDivisionSignature'].value,
          aePlanDivisionDate: this.formatDate(
            this.AE_PLANremarksForm.controls['aePlanDivisionDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };


        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'ACC_Clerk') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          division: element.division,
          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: '',
          mmsDivisionStatus: '',
          aeeDivisionStatus: '',
          aePlanDivisionStatus: '',
          accClerkStatus: 'Draft',
          daDivisionStatus: '',
          eeDivisionStatus: '',
          faStatus: '',
          roStatus: '',
          croStatus: '',
          eeTCellStatus: '',

          accClerkRemarks:
            this.ACCremarksForm.controls['accClerkRemarks'].value,
          accDivisionSignature:
            this.ACCremarksForm.controls['accDivisionSignature'].value,
          accDivisionDate: this.formatDate(
            this.ACCremarksForm.controls['accDivisionDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'DA_Division') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, '1804');
        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: element.actualsCreatorTotal,
          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearProposedCreatorTotal:
            element.beLastYearProposedCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,

          division: element.division,
          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: 'Draft',
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          accClerkRemarks: element.accClerkRemarks,
          accDivisionSignature: element.accDivisionSignature,
          accDivisionDate: element.accDivisionDate,

          daDivisionRemarks:
            this.DAremarksForm.controls['daDivisionRemarks'].value,
          daDivisionSignature:
            this.DAremarksForm.controls['daDivisionSignature'].value,
          daDivisionDate: this.formatDate(
            this.DAremarksForm.controls['daDivisionDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'EE_Division') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, '1804');

        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: element.actualsCreatorTotal,
          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearProposedCreatorTotal:
            element.beLastYearProposedCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,

          division: element.division,
          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: 'Draft',
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          accClerkRemarks: element.accClerkRemarks,
          accDivisionSignature: element.accDivisionSignature,
          accDivisionDate: element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks:
            this.EEremarksForm.controls['eeDivisionRemarks'].value,
          eeDivisionSignature:
            this.EEremarksForm.controls['eeDivisionSignature'].value,
          eeDivisionDate: this.formatDate(
            this.EEremarksForm.controls['eeDivisionDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'RO') {
      this.getYearData.forEach((element) => {
        let subCodes = [];
        console.log(element, '1804');

        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          division: element.division,
          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: 'Draft',
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,

          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: this.ROremarksForm.controls['roRemarks'].value,
          roSignature: this.ROremarksForm.controls['roSignature'].value,
          roDate: this.formatDate(this.ROremarksForm.controls['roDate'].value),
          status: 'Yes',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'CRO') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, '1804');

        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          division: element.division,

          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: 'Draft',
          eeTCellStatus: element.eeTCellStatus,

          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          // aeeDivisionRemarks: element.aeeDivisionRemarks,
          // aeeDivisionSignature: element.aeeDivisionSignature,
          // aeeDivisionDate: element.aeeDivisionDate,

          // aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          // aePlanDivisionSignature: element.aePlanDivisionSignature,
          // aePlanDivisionDate: element.aePlanDivisionDate,

          // accClerkRemarks: element.accClerkRemarks,
          // accDivisionSignature: element.accDivisionSignature,
          // accDivisionDate: element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: this.CROremarksForm.controls['croRemarks'].value,
          croSignature: this.CROremarksForm.controls['croSignature'].value,
          croDate: this.formatDate(
            this.CROremarksForm.controls['croDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };

        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }

        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'EE_T_CELL') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, '1804');

        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          division: element.division,

          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: 'Draft',

          // aroDivisionRemarks: element.aroDivisionRemarks,
          // aroDivisionSignature: element.aroDivisionSignature,
          // aroDivisionDate: element.aroDivisionDate,

          // mmsDivisionRemarks: element.mmsDivisionRemarks,
          // mmsDivisionSignature: element.mmsDivisionSignature,
          // mmsDivisionDate: element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          // accClerkRemarks: element.accClerkRemarks,
          // accDivisionSignature: element.accDivisionSignature,
          // accDivisionDate: element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          // roRemarks: element.roRemarks,
          // roSignature: element.roSignature,
          // roDate: element.roDate,

          // croRemarks: element.croRemarks,
          // croSignature: element.croSignature,
          // croDate: element.croDate,

          eeTCellRemarks:
            this.eeTcellremarksForm.controls['eeTCellRemarks'].value,
          eeTCellSignature:
            this.eeTcellremarksForm.controls['eeTCellSignature'].value,
          eeTCellDate: this.formatDate(
            this.eeTcellremarksForm.controls['eeTCellDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'SE') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, '1804');

        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,


          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          division: element.division,

          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,
          seStatus: 'Draft',

          // aroDivisionRemarks: element.aroDivisionRemarks,
          // aroDivisionSignature: element.aroDivisionSignature,
          // aroDivisionDate: element.aroDivisionDate,

          // mmsDivisionRemarks: element.mmsDivisionRemarks,
          // mmsDivisionSignature: element.mmsDivisionSignature,
          // mmsDivisionDate: element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          // accClerkRemarks: element.accClerkRemarks,
          // accDivisionSignature: element.accDivisionSignature,
          // accDivisionDate: element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          // roRemarks: element.roRemarks,
          // roSignature: element.roSignature,
          // roDate: element.roDate,

          // croRemarks: element.croRemarks,
          // croSignature: element.croSignature,
          // croDate: element.croDate,

          seRemarks:
            this.seremarksForm.controls['seRemarks'].value,
          seSignature:
            this.seremarksForm.controls['seSignature'].value,
          seDate: this.formatDate(
            this.seremarksForm.controls['seDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'CE') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, '1804');

        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,


          actualsCreatorTotal:
            this.yearMonthFormBE.controls['actualstotal'].value,
          rbeCreatorTotal: this.yearMonthFormBE.controls['rbeTotal'].value,
          actualsUpToCreatorTotal:
            this.yearMonthFormBE.controls['actualsUpToTotal'].value,
          beLastYearProposedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearProposedTotal'].value,
          beLastYearFixedCreatorTotal:
            this.yearMonthFormBE.controls['beLastYearFixedTotal'].value || 0,

          division: element.division,

          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,
          seStatus: element.seStatus,
          ceStatus: 'Draft',

          // aroDivisionRemarks: element.aroDivisionRemarks,
          // aroDivisionSignature: element.aroDivisionSignature,
          // aroDivisionDate: element.aroDivisionDate,

          // mmsDivisionRemarks: element.mmsDivisionRemarks,
          // mmsDivisionSignature: element.mmsDivisionSignature,
          // mmsDivisionDate: element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          // accClerkRemarks: element.accClerkRemarks,
          // accDivisionSignature: element.accDivisionSignature,
          // accDivisionDate: element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          seRemarks: element.seRemarks,
          seSignature: element.seSignature,
          seDate: element.seDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          ceRemarks:
            this.CEremarksForm.controls['ceRemarks'].value,
          ceSignature:
            this.CEremarksForm.controls['ceSignature'].value,
          ceDate: this.formatDate(
            this.CEremarksForm.controls['ceDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'AO') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, '1804');

        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear: this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths: this.yearMonthFormBE.controls['actualsUpToMonths'].value,

          actualsCreatorTotal: element.actualsCreatorTotal,
          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearProposedCreatorTotal:
            element.beLastYearProposedCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,

          division: element.division,

          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,
          seStatus: element.seStatus,
          ceStatus: element.ceStatus,
          aoStatus: 'Draft',

          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          accClerkRemarks: element.accClerkRemarks,
          accDivisionSignature: element.accDivisionSignature,
          accDivisionDate: element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          seRemarks: element.seRemarks,
          seSignature: element.seSignature,
          seDate: element.seDate,

          ceRemarks: element.ceRemarks,
          ceSignature: element.ceSignature,
          ceDate: element.ceDate,

          aoRemarks: this.AOremarksForm.controls['aoRemarks'].value,
          aoSignature: this.AOremarksForm.controls['aoSignature'].value,
          aoDate: this.formatDate(this.AOremarksForm.controls['aoDate'].value),
          status: 'Yes',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'DCAO') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, '1804');

        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,


          actualsCreatorTotal: element.actualsCreatorTotal,
          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearProposedCreatorTotal:
            element.beLastYearProposedCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,

          division: element.division,

          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,
          seStatus: element.seStatus,
          ceStatus: element.ceStatus,
          aoStatus: element.aoStatus,
          dcAoStatus: 'Draft',


          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          accClerkRemarks: element.accClerkRemarks,
          accDivisionSignature: element.accDivisionSignature,
          accDivisionDate: element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          seRemarks: element.seRemarks,
          seSignature: element.seSignature,
          seDate: element.seDate,

          ceRemarks: element.ceRemarks,
          ceSignature: element.ceSignature,
          ceDate: element.ceDate,

          aoRemarks: element.aoRemarks,
          aoSignature: element.aoSignature,
          aoDate: element.aoDate,

          dcAoRemarks:
            this.DCAOremarksForm.controls['dcAoRemarks'].value,
          dcAoSignature:
            this.DCAOremarksForm.controls['dcAoSignature'].value,
          dcAoDate: this.formatDate(
            this.DCAOremarksForm.controls['dcAoDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'FA') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, '1804');

        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,


          actualsCreatorTotal: element.actualsCreatorTotal,
          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearProposedCreatorTotal:
            element.beLastYearProposedCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,

          division: element.division,

          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,
          seStatus: element.seStatus,
          ceStatus: element.ceStatus,
          aoStatus: element.aoStatus,
          dcAoStatus: element.dcAoStatus,
          faStatus: 'Draft',


          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          accClerkRemarks: element.accClerkRemarks,
          accDivisionSignature: element.accDivisionSignature,
          accDivisionDate: element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          seRemarks: element.seRemarks,
          seSignature: element.seSignature,
          seDate: element.seDate,

          ceRemarks: element.ceRemarks,
          ceSignature: element.ceSignature,
          ceDate: element.ceDate,

          aoRemarks: element.aoRemarks,
          aoSignature: element.aoSignature,
          aoDate: element.aoDate,

          dcAoRemarks: element.dcAoRemarks,
          dcAoSignature: element.dcAoSignature,
          dcAoDate: element.dcAoDate,

          faRemarks:
            this.FAremarksForm.controls['faRemarks'].value,
          faSignature:
            this.FAremarksForm.controls['faSignature'].value,
          faDate: this.formatDate(
            this.FAremarksForm.controls['faDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    } else if (this.roleName == 'MD') {
      this.getYearData.forEach((element) => {
        let subCodes = []
        console.log(element, '1804');

        let data = {
          id: element.id,
          codeId: element.code.id,
          budgetHead: element.budgetHead,
          schedule: element.schedule,
          scheduleName: element.scheduleName,
          codeName: element.codeName,
          code: element.code,

          actuals: +element.actuals,
          be: +element.be,
          rbe: +element.rbe,
          actualsUpTo: +element.actualsUpTo,
          beLastYearProposed: +element.beLastYearProposed,
          beLastYearFixed: +element.beLastYearFixed,

          actualsYear: this.yearMonthFormBE.controls['actualsYear'].value,
          beYear: this.yearMonthFormBE.controls['beYear'].value,
          rbeYear: this.yearMonthFormBE.controls['rbeYear'].value,
          actualsUpToYear:
            this.yearMonthFormBE.controls['actualsUpToYear'].value,
          beLastYear: this.yearMonthFormBE.controls['beLastYear'].value,

          actualsUpToMonths:
            this.yearMonthFormBE.controls['actualsUpToMonths'].value,


          actualsCreatorTotal: element.actualsCreatorTotal,
          rbeCreatorTotal: element.rbeCreatorTotal,
          actualsUpToCreatorTotal: element.actualsUpToCreatorTotal,
          beLastYearProposedCreatorTotal:
            element.beLastYearProposedCreatorTotal,
          beLastYearFixedCreatorTotal: element.beLastYearFixedCreatorTotal,

          division: element.division,

          approvalStatus: 'Draft',
          creator: element.creator,
          aroDivisionStatus: element.aroDivisionStatus,
          mmsDivisionStatus: element.mmsDivisionStatus,
          aeeDivisionStatus: element.aeeDivisionStatus,
          aePlanDivisionStatus: element.aePlanDivisionStatus,
          accClerkStatus: element.accClerkStatus,
          daDivisionStatus: element.daDivisionStatus,
          eeDivisionStatus: element.eeDivisionStatus,
          roStatus: element.roStatus,
          croStatus: element.croStatus,
          eeTCellStatus: element.eeTCellStatus,
          seStatus: element.seStatus,
          ceStatus: element.ceStatus,
          aoStatus: element.aoStatus,
          dcAoStatus: element.dcAoStatus,
          faStatus: element.faStatus,
          mdStatus: 'Draft',

          aroDivisionRemarks: element.aroDivisionRemarks,
          aroDivisionSignature: element.aroDivisionSignature,
          aroDivisionDate: element.aroDivisionDate,

          mmsDivisionRemarks: element.mmsDivisionRemarks,
          mmsDivisionSignature: element.mmsDivisionSignature,
          mmsDivisionDate: element.mmsDivisionDate,

          aeeDivisionRemarks: element.aeeDivisionRemarks,
          aeeDivisionSignature: element.aeeDivisionSignature,
          aeeDivisionDate: element.aeeDivisionDate,

          aePlanDivisionRemarks: element.aePlanDivisionRemarks,
          aePlanDivisionSignature: element.aePlanDivisionSignature,
          aePlanDivisionDate: element.aePlanDivisionDate,

          accClerkRemarks: element.accClerkRemarks,
          accDivisionSignature: element.accDivisionSignature,
          accDivisionDate: element.accDivisionDate,

          daDivisionRemarks: element.daDivisionRemarks,
          daDivisionSignature: element.daDivisionSignature,
          daDivisionDate: element.daDivisionDate,

          eeDivisionRemarks: element.eeDivisionRemarks,
          eeDivisionSignature: element.eeDivisionSignature,
          eeDivisionDate: element.eeDivisionDate,

          roRemarks: element.roRemarks,
          roSignature: element.roSignature,
          roDate: element.roDate,

          croRemarks: element.croRemarks,
          croSignature: element.croSignature,
          croDate: element.croDate,

          eeTCellRemarks: element.eeTCellRemarks,
          eeTCellSignature: element.eeTCellSignature,
          eeTCellDate: element.eeTCellDate,

          seRemarks: element.seRemarks,
          seSignature: element.seSignature,
          seDate: element.seDate,

          ceRemarks: element.ceRemarks,
          ceSignature: element.ceSignature,
          ceDate: element.ceDate,

          aoRemarks: element.aoRemarks,
          aoSignature: element.aoSignature,
          aoDate: element.aoDate,

          dcAoRemarks: element.dcAoRemarks,
          dcAoSignature: element.dcAoSignature,
          dcAoDate: element.dcAoDate,

          faRemarks: element.faRemarks,
          faSignature: element.faSignature,
          faDate: element.faDate,

          mdRemarks:
            this.MDremarksForm.controls['mdRemarks'].value,
          mdSignature:
            this.MDremarksForm.controls['mdSignature'].value,
          mdDate: this.formatDate(
            this.MDremarksForm.controls['mdDate'].value
          ),
          status: 'Yes',

          subCodeBES: subCodes
        };
        if (element.subCodeBES && element.subCodeBES.length > 0) {
          element.subCodeBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdBE: items.subCodeGetDTO.id,
              subActuals: items.subActuals,
              subRbe: items.subRbe,
              subActualsUpto: items.subActualsUpto,
              subBeProposed: items.subBeProposed,
              subBeFixed: items.subBeFixed,
            };
            subCodes.push(subCodeArray);
            console.log(subCodes, 'subCodes');
          });
        }
        dataToUpdateBE.push(data);
      });
    }

    console.log('BE save data ================= ', dataToUpdateBE);

    console.log('this.statusUpdate == == == ', this.statusUpdate);

    console.log(this.getYearData, 'this.getYearData');

    if (this.searchFilterValue == '') {
      this.apiCall.apiPostCall('api/be/edit', dataToUpdateBE).subscribe(
        (responce) => {
          if (responce) {
            this.isLoading = false;
          }
          console.log('save all the years form for BBBBEEE', responce.data);
          this.snackBar.open('BE Drafted Successfully', 'Close', { duration: 3000 });
          this.route.navigate(['/famodule/home/budget']);
        },
        (error) => {
          console.log(error.message);
          this.isLoading = false;
          this.snackBar.open('Check All Fields Are Filled', 'Close', { duration: 3000 });
        }
      );
    }
    else {
      this.isLoading = false;
      this.snackBar.open('Clear The Search Filter', 'Close', { duration: 3000 })
    }
  }

  dataStore: any;

  patchTableTotal() {
    this.yearMonthFormBE.patchValue({
      actualstotal: this.totalActual,
      beTotal: this.totalBe,
      rbeTotal: this.totalRbe,
      actualsUpToTotal: this.totalActualUpto,
      beLastYearProposedTotal: this.totalBeProposed,
      beLastYearFixedTotal: this.totalBeFixed,
    });
  }

  // -------------------RBE-------------------------------------RBE----------------------------------RBE-------------------

  rbeUpdate() {
    this.isLoading = true;
    let dataToSaveRBE = [];
    let forwardMessage = ''

    if (
      this.divisionNameSelect == 'Head_office' &&
      this.userDivision == 'Head_office'
    ) {
      this.statusUpdate = 'Approved';
    } else if (
      this.divisionNameSelect != 'Head_office' &&
      this.userDivision == 'Head_office'
    ) {
      this.statusUpdate = 'Approved';
    } else {
      this.statusUpdate = 'Active';
    }

    if (this.roleName == 'ARO_Division') {
      forwardMessage = 'RBE Forward To MMS_Division Successfully'
      console.log('ARO RBE');
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = [];
        let rbeData = {
          id: rbeElement.id,

          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe: this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe: this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal: this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal: this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe: this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe: this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal: this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal: this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          aroDivisionStatusRbe: 'Active',
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,

          aroDivisionRemarksRbe:
            this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          aroDivisionSignatureRbe:
            this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          aroDivisionDateRbe: this.formatDate(
            this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value
          ),

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,
          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'MMS_Division') {
      forwardMessage = 'RBE Forward To DA_Division Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,

          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: 'Active',
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,

          aroDivisionRemarksRbe:
            this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          aroDivisionSignatureRbe:
            this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          aroDivisionDateRbe:
            this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value,

          mmsDivisionRemarksRbe:
            this.MMSremarksFormRbe.controls['mmsDivisionRemarksRbe'].value,
          mmsDivisionSignatureRbe:
            this.MMSremarksFormRbe.controls['mmsDivisionSignatureRbe'].value,
          mmsDivisionDateRbe: this.formatDate(
            this.MMSremarksFormRbe.controls['mmsDivisionDateRbe'].value
          ),

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'AEE_Division') {
      forwardMessage = 'RBE Forward To AE_Planning Successfully'

      console.log('AEE RBE');
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,

          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: 'Active',
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          faStatusRbe: rbeElement.faStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,

          aeeDivisionRemarksRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionRemarksRbe'].value,
          aeeDivisionSignatureRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionSignatureRbe'].value,
          aeeDivisionDateRbe: this.formatDate(
            this.AEEremarksFormRbe.controls['aeeDivisionDateRbe'].value
          ),

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          subCodeRBES: subCodeRbe
        };
        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }
        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'AE_Planning') {
      forwardMessage = 'RBE Forward To DA_Division Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,

          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: 'Active',
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          faStatusRbe: rbeElement.faStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,

          aeeDivisionRemarksRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionRemarksRbe'].value,
          aeeDivisionSignatureRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionSignatureRbe'].value,
          aeeDivisionDateRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionDateRbe'].value,

          aePlanDivisionRemarksRbe:
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionRemarksRbe']
              .value,
          aePlanDivisionSignatureRbe:
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionSignatureRbe']
              .value,
          aePlanDivisionDateRbe: this.formatDate(
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionDateRbe'].value
          ),
          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }
        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'ACC_Clerk') {
      forwardMessage = 'RBE Forward To DA_Division Successfully'

      console.log('ACC RBE');
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,

          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: 'Active',
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          faStatusRbe: rbeElement.faStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,

          accClerkRemarksRbe:
            this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          accDivisionSignatureRbe:
            this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          accDivisionDateRbe: this.formatDate(
            this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value
          ),
          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'DA_Division') {
      forwardMessage = 'RBE Forward To EE_Division Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,

          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: 'Active',
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          faStatusRbe: rbeElement.faStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,

          aroDivisionRemarksRbe:
            this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          aroDivisionSignatureRbe:
            this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          aroDivisionDateRbe:
            this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value,

          mmsDivisionRemarksRbe:
            this.MMSremarksFormRbe.controls['mmsDivisionRemarksRbe'].value,
          mmsDivisionSignatureRbe:
            this.MMSremarksFormRbe.controls['mmsDivisionSignatureRbe'].value,
          mmsDivisionDateRbe:
            this.MMSremarksFormRbe.controls['mmsDivisionDateRbe'].value,

          aeeDivisionRemarksRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionRemarksRbe'].value,
          aeeDivisionSignatureRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionSignatureRbe'].value,
          aeeDivisionDateRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionDateRbe'].value,

          aePlanDivisionRemarksRbe:
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionRemarksRbe']
              .value,
          aePlanDivisionSignatureRbe:
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionSignatureRbe']
              .value,
          aePlanDivisionDateRbe:
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionDateRbe'].value,

          accClerkRemarksRbe:
            this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          accDivisionSignatureRbe:
            this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          accDivisionDateRbe:
            this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value,

          daDivisionRemarksRbe:
            this.DAremarksFormRbe.controls['daDivisionRemarksRbe'].value,
          daDivisionSignatureRbe:
            this.DAremarksFormRbe.controls['daDivisionSignatureRbe'].value,
          daDivisionDateRbe: this.formatDate(
            this.DAremarksFormRbe.controls['daDivisionDateRbe'].value
          ),

          eeDivisionRemarksRbe:
            this.EEremarksFormRbe.controls['eeDivisionRemarksRbe'].value,
          eeDivisionSignatureRbe:
            this.EEremarksFormRbe.controls['eeDivisionSignatureRbe'].value,
          eeDivisionDateRbe:
            this.EEremarksFormRbe.controls['eeDivisionDateRbe'].value,
          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'EE_Division') {
      forwardMessage = 'RBE Forward To RO_HeadOffice Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,

          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,
          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: 'Active',
          faStatusRbe: rbeElement.faStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,

          aroDivisionRemarksRbe:
            this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          aroDivisionSignatureRbe:
            this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          aroDivisionDateRbe:
            this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value,

          mmsDivisionRemarksRbe:
            this.MMSremarksFormRbe.controls['mmsDivisionRemarksRbe'].value,
          mmsDivisionSignatureRbe:
            this.MMSremarksFormRbe.controls['mmsDivisionSignatureRbe'].value,
          mmsDivisionDateRbe:
            this.MMSremarksFormRbe.controls['mmsDivisionDateRbe'].value,

          aeeDivisionRemarksRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionRemarksRbe'].value,
          aeeDivisionSignatureRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionSignatureRbe'].value,
          aeeDivisionDateRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionDateRbe'].value,

          aePlanDivisionRemarksRbe:
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionRemarksRbe']
              .value,
          aePlanDivisionSignatureRbe:
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionSignatureRbe']
              .value,
          aePlanDivisionDateRbe:
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionDateRbe'].value,

          accClerkRemarksRbe:
            this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          accDivisionSignatureRbe:
            this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          accDivisionDateRbe:
            this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value,

          daDivisionRemarksRbe:
            this.DAremarksFormRbe.controls['daDivisionRemarksRbe'].value,
          daDivisionSignatureRbe:
            this.DAremarksFormRbe.controls['daDivisionSignatureRbe'].value,
          daDivisionDateRbe:
            this.DAremarksFormRbe.controls['daDivisionDateRbe'].value,
          eeDivisionRemarksRbe:
            this.EEremarksFormRbe.controls['eeDivisionRemarksRbe'].value,
          eeDivisionSignatureRbe:
            this.EEremarksFormRbe.controls['eeDivisionSignatureRbe'].value,
          eeDivisionDateRbe: this.formatDate(
            this.EEremarksFormRbe.controls['eeDivisionDateRbe'].value
          ),
          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'RO') {
      forwardMessage = 'RBE Forward To CRO_HeadOffice Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,

          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          approvalStatus: this.statusUpdate,
          division: rbeElement.division,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: 'Active',
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          faStatusRbe: rbeElement.faStatusRbe,

          aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          // aeeDivisionRemarksRbe:
          //   this.AEEremarksFormRbe.controls['aeeDivisionRemarksRbe'].value,
          // aeeDivisionSignatureRbe:
          //   this.AEEremarksFormRbe.controls['aeeDivisionSignatureRbe'].value,
          // aeeDivisionDateRbe:
          //   this.AEEremarksFormRbe.controls['aeeDivisionDateRbe'].value,

          // aePlanDivisionRemarksRbe:
          //   this.AE_PLANremarksFormRbe.controls['aePlanDivisionRemarksRbe']
          //     .value,
          // aePlanDivisionSignatureRbe:
          //   this.AE_PLANremarksFormRbe.controls['aePlanDivisionSignatureRbe']
          //     .value,
          // aePlanDivisionDateRbe:
          //   this.AE_PLANremarksFormRbe.controls['aePlanDivisionDateRbe'].value,

          // accClerkRemarksRbe:
          //   this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          // accDivisionSignatureRbe:
          //   this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          // accDivisionDateRbe:
          //   this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: this.ROremarksFormRbe.controls['roRemarksRbe'].value,
          roSignatureRbe: this.ROremarksFormRbe.controls['roSignatureRbe'].value,
          roDateRbe: this.formatDate(this.ROremarksFormRbe.controls['roDateRbe'].value),

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'CRO') {
      forwardMessage = 'RBE Forward To EE_T_CELL_HeadOffice Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,

          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: 'Active',
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          faStatusRbe: rbeElement.faStatusRbe,

          aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          // aeeDivisionRemarksRbe:
          //   this.AEEremarksFormRbe.controls['aeeDivisionRemarksRbe'].value,
          // aeeDivisionSignatureRbe:
          //   this.AEEremarksFormRbe.controls['aeeDivisionSignatureRbe'].value,
          // aeeDivisionDateRbe:
          //   this.AEEremarksFormRbe.controls['aeeDivisionDateRbe'].value,

          // aePlanDivisionRemarksRbe:
          //   this.AE_PLANremarksFormRbe.controls['aePlanDivisionRemarksRbe']
          //     .value,
          // aePlanDivisionSignatureRbe:
          //   this.AE_PLANremarksFormRbe.controls['aePlanDivisionSignatureRbe']
          //     .value,
          // aePlanDivisionDateRbe:
          //   this.AE_PLANremarksFormRbe.controls['aePlanDivisionDateRbe'].value,

          // accClerkRemarksRbe:
          //   this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          // accDivisionSignatureRbe:
          //   this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          // accDivisionDateRbe:
          //   this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe: rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: this.CROremarksFormRbe.controls['croRemarksRbe'].value,
          croSignatureRbe:
            this.CROremarksFormRbe.controls['croSignatureRbe'].value,
          croDateRbe: this.formatDate(
            this.CROremarksFormRbe.controls['croDateRbe'].value
          ),
          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'EE_T_CELL') {
      forwardMessage = 'RBE Forward To SE_HeadOffice Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: 'Active',
          faStatusRbe: rbeElement.faStatusRbe,

          // aroDivisionRemarksRbe:
          //   this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          // aroDivisionSignatureRbe:
          //   this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          // aroDivisionDateRbe:
          //   this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value,

          // mmsDivisionRemarksRbe:
          //   this.MMSremarksFormRbe.controls['mmsDivisionRemarksRbe'].value,
          // mmsDivisionSignatureRbe:
          //   this.MMSremarksFormRbe.controls['mmsDivisionSignatureRbe'].value,
          // mmsDivisionDateRbe:
          //   this.MMSremarksFormRbe.controls['mmsDivisionDateRbe'].value,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          // accClerkRemarksRbe:
          //   this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          // accDivisionSignatureRbe:
          //   this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          // accDivisionDateRbe:
          //   this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          // roRemarksRbe: this.ROremarksFormRbe.controls['roRemarksRbe'].value,
          // roSignatureRbe:
          //   this.ROremarksFormRbe.controls['roSignatureRbe'].value,
          // roDateRbe: this.ROremarksFormRbe.controls['roDateRbe'].value,

          // croRemarksRbe: this.CROremarksFormRbe.controls['croRemarksRbe'].value,
          // croSignatureRbe:
          //   this.CROremarksFormRbe.controls['croSignatureRbe'].value,
          // croDateRbe: this.CROremarksFormRbe.controls['croDateRbe'].value,

          eeTCellRemarksRbe:
            this.eeTcellremarksFormRbe.controls['eeTCellRemarksRbe'].value,
          eeTCellSignatureRbe:
            this.eeTcellremarksFormRbe.controls['eeTCellSignatureRbe'].value,
          eeTCellDateRbe: this.formatDate(
            this.eeTcellremarksFormRbe.controls['eeTCellDateRbe'].value
          ),

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'SE') {
      forwardMessage = 'RBE Forward To SE_HeadOffice Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          seStatusRbe: 'Active',
          faStatusRbe: rbeElement.faStatusRbe,

          // aroDivisionRemarksRbe:
          //   this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          // aroDivisionSignatureRbe:
          //   this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          // aroDivisionDateRbe:
          //   this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value,

          // mmsDivisionRemarksRbe:
          //   this.MMSremarksFormRbe.controls['mmsDivisionRemarksRbe'].value,
          // mmsDivisionSignatureRbe:
          //   this.MMSremarksFormRbe.controls['mmsDivisionSignatureRbe'].value,
          // mmsDivisionDateRbe:
          //   this.MMSremarksFormRbe.controls['mmsDivisionDateRbe'].value,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          // accClerkRemarksRbe:
          //   this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          // accDivisionSignatureRbe:
          //   this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          // accDivisionDateRbe:
          //   this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe:
            rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: rbeElement.croRemarksRbe,
          croSignatureRbe:
            rbeElement.croSignatureRbe,
          croDateRbe: rbeElement.croDateRbe,

          seRemarksRbe:
            this.seremarksFormRbe.controls['seRemarksRbe'].value,
          seSignatureRbe:
            this.seremarksFormRbe.controls['seSignatureRbe'].value,
          seDateRbe: this.formatDate(
            this.seremarksFormRbe.controls['seDateRbe'].value
          ),
          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'CE') {
      forwardMessage = 'RBE Forward To AO_HeadOffice Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          seStatusRbe: rbeElement.seStatusRbe,
          ceStatusRbe: 'Active',
          faStatusRbe: rbeElement.faStatusRbe,

          // aroDivisionRemarksRbe:
          //   this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          // aroDivisionSignatureRbe:
          //   this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          // aroDivisionDateRbe:
          //   this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value,

          // mmsDivisionRemarksRbe:
          //   this.MMSremarksFormRbe.controls['mmsDivisionRemarksRbe'].value,
          // mmsDivisionSignatureRbe:
          //   this.MMSremarksFormRbe.controls['mmsDivisionSignatureRbe'].value,
          // mmsDivisionDateRbe:
          //   this.MMSremarksFormRbe.controls['mmsDivisionDateRbe'].value,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          // accClerkRemarksRbe:
          //   this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          // accDivisionSignatureRbe:
          //   this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          // accDivisionDateRbe:
          //   this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          seRemarksRbe: rbeElement.seRemarksRbe,
          seSignatureRbe: rbeElement.seSignatureRbe,
          seDateRbe: rbeElement.seDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe:
            rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: rbeElement.croRemarksRbe,
          croSignatureRbe:
            rbeElement.croSignatureRbe,
          croDateRbe: rbeElement.croDateRbe,

          ceRemarksRbe:
            this.CEremarksFormRbe.controls['ceRemarksRbe'].value,
          ceSignatureRbe:
            this.CEremarksFormRbe.controls['ceSignatureRbe'].value,
          ceDateRbe: this.formatDate(
            this.CEremarksFormRbe.controls['ceDateRbe'].value
          ),
          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'AO') {
      forwardMessage = 'RBE Forward To DCAO_HeadOffice Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          seStatusRbe: rbeElement.seStatusRbe,
          ceStatusRbe: rbeElement.ceStatusRbe,
          aoStatusRbe: 'Active',
          faStatusRbe: rbeElement.faStatusRbe,

          aroDivisionRemarksRbe:
            rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe:
            rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe:
            rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe:
            rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe:
            rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe:
            rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          accClerkRemarksRbe:
            rbeElement.accClerkRemarksRbe,
          accDivisionSignatureRbe:
            rbeElement.accDivisionSignatureRbe,
          accDivisionDateRbe:
            rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe:
            rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: rbeElement.croRemarksRbe,
          croSignatureRbe:
            rbeElement.croSignatureRbe,
          croDateRbe: rbeElement.croDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          seRemarksRbe: rbeElement.seRemarksRbe,
          seSignatureRbe: rbeElement.seSignatureRbe,
          seDateRbe: rbeElement.seDateRbe,

          ceRemarksRbe: rbeElement.ceRemarksRbe,
          ceSignatureRbe: rbeElement.ceSignatureRbe,
          ceDateRbe: rbeElement.ceDateRbe,

          aoRemarksRbe:
            this.AOremarksFormRbe.controls['aoRemarksRbe'].value,
          aoSignatureRbe:
            this.AOremarksFormRbe.controls['aoSignatureRbe'].value,
          aoDateRbe: this.formatDate(
            this.AOremarksFormRbe.controls['aoDateRbe'].value
          ),
          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'DCAO') {
      forwardMessage = 'RBE Forward To FA_HeadOffice Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          seStatusRbe: rbeElement.seStatusRbe,
          ceStatusRbe: rbeElement.ceStatusRbe,
          aoStatusRbe: rbeElement.aoStatusRbe,
          dcAoStatusRbe: 'Active',
          faStatusRbe: rbeElement.faStatusRbe,

          aroDivisionRemarksRbe:
            rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe:
            rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe:
            rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe:
            rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe:
            rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe:
            rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          accClerkRemarksRbe:
            rbeElement.accClerkRemarksRbe,
          accDivisionSignatureRbe:
            rbeElement.accDivisionSignatureRbe,
          accDivisionDateRbe:
            rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe:
            rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: rbeElement.croRemarksRbe,
          croSignatureRbe:
            rbeElement.croSignatureRbe,
          croDateRbe: rbeElement.croDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          seRemarksRbe: rbeElement.seRemarksRbe,
          seSignatureRbe: rbeElement.seSignatureRbe,
          seDateRbe: rbeElement.seDateRbe,

          ceRemarksRbe: rbeElement.ceRemarksRbe,
          ceSignatureRbe: rbeElement.ceSignatureRbe,
          ceDateRbe: rbeElement.ceDateRbe,

          aoRemarksRbe: rbeElement.aoRemarksRbe,
          aoSignatureRbe: rbeElement.aoSignatureRbe,
          aoDateRbe: rbeElement.aoDateRbe,

          dcAoRemarksRbe:
            this.DCAOremarksFormRbe.controls['dcAoRemarksRbe'].value,
          dcAoSignatureRbe:
            this.DCAOremarksFormRbe.controls['dcAoSignatureRbe'].value,
          dcAoDateRbe: this.formatDate(
            this.DCAOremarksFormRbe.controls['dcAoDateRbe'].value
          ),
          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'FA') {
      forwardMessage = 'RBE Forward To MD Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,
          // beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          // actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          // actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          // lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          // lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          // aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          // mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          // aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          // aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          // accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          // daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          // eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          // roStatusRbe: rbeElement.roStatusRbe,
          // croStatusRbe: rbeElement.croStatusRbe,
          // eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          // seStatusRbe: rbeElement.seStatusRbe,
          // ceStatusRbe: rbeElement.ceStatusRbe,
          // aoStatusRbe: rbeElement.aoStatusRbe,
          // dcAoStatusRbe: rbeElement.dcAoStatusRbe,
          // faStatusRbe: 'Active',

          aroDivisionStatusRbe: 'Approved',
          mmsDivisionStatusRbe: 'Approved',
          aeeDivisionStatusRbe: 'Approved',
          aePlanDivisionStatusRbe: 'Approved',
          accClerkStatusRbe: 'Approved',
          daDivisionStatusRbe: 'Approved',
          eeDivisionStatusRbe: 'Approved',
          roStatusRbe: 'Approved',
          croStatusRbe: 'Approved',
          eeTCellStatusRbe: 'Approved',
          seStatusRbe: 'Approved',
          ceStatusRbe: 'Approved',
          aoStatusRbe: 'Approved',
          dcAoStatusRbe: 'Approved',
          faStatusRbe: 'Approved',
          mdStatusRbe: 'Approved',

          aroDivisionRemarksRbe:
            rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe:
            rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe:
            rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe:
            rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe:
            rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe:
            rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          accClerkRemarksRbe:
            rbeElement.accClerkRemarksRbe,
          accDivisionSignatureRbe:
            rbeElement.accDivisionSignatureRbe,
          accDivisionDateRbe:
            rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe:
            rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: rbeElement.croRemarksRbe,
          croSignatureRbe:
            rbeElement.croSignatureRbe,
          croDateRbe: rbeElement.croDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          seRemarksRbe: rbeElement.seRemarksRbe,
          seSignatureRbe: rbeElement.seSignatureRbe,
          seDateRbe: rbeElement.seDateRbe,

          ceRemarksRbe: rbeElement.ceRemarksRbe,
          ceSignatureRbe: rbeElement.ceSignatureRbe,
          ceDateRbe: rbeElement.ceDateRbe,

          aoRemarksRbe: rbeElement.aoRemarksRbe,
          aoSignatureRbe: rbeElement.aoSignatureRbe,
          aoDateRbe: rbeElement.aoDateRbe,

          dcAoRemarksRbe: rbeElement.dcAoRemarksRbe,
          dcAoSignatureRbe: rbeElement.dcAoSignatureRbe,
          dcAoDateRbe: rbeElement.dcAoDateRbe,

          faRemarksRbe:
            this.FAremarksFormRbe.controls['faRemarksRbe'].value,
          faSignatureRbe:
            this.FAremarksFormRbe.controls['faSignatureRbe'].value,
          faDateRbe: this.formatDate(
            this.FAremarksFormRbe.controls['faDateRbe'].value
          ),

          subCodeRBES: subCodeRbe
        };


        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    } else if (this.roleName == 'MD') {
      forwardMessage = 'RBE Approved Successfully'

      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,
          creator: rbeElement.creator,
          codeId: rbeElement.code.id,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe: this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe: this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe: this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe: this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe: this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal: this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal: this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          aroDivisionStatusRbe: 'Approved',
          mmsDivisionStatusRbe: 'Approved',
          aeeDivisionStatusRbe: 'Approved',
          aePlanDivisionStatusRbe: 'Approved',
          accClerkStatusRbe: 'Approved',
          daDivisionStatusRbe: 'Approved',
          eeDivisionStatusRbe: 'Approved',
          roStatusRbe: 'Approved',
          croStatusRbe: 'Approved',
          eeTCellStatusRbe: 'Approved',
          seStatusRbe: 'Approved',
          ceStatusRbe: 'Approved',
          aoStatusRbe: 'Approved',
          dcAoStatusRbe: 'Approved',
          faStatusRbe: 'Approved',
          mdStatusRbe: 'Approved',


          aroDivisionRemarksRbe:
            rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe:
            rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe:
            rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe:
            rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe:
            rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe:
            rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          accClerkRemarksRbe:
            rbeElement.accClerkRemarksRbe,
          accDivisionSignatureRbe:
            rbeElement.accDivisionSignatureRbe,
          accDivisionDateRbe:
            rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe:
            rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: rbeElement.croRemarksRbe,
          croSignatureRbe:
            rbeElement.croSignatureRbe,
          croDateRbe: rbeElement.croDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          seRemarksRbe: rbeElement.seRemarksRbe,
          seSignatureRbe: rbeElement.seSignatureRbe,
          seDateRbe: rbeElement.seDateRbe,

          ceRemarksRbe: rbeElement.ceRemarksRbe,
          ceSignatureRbe: rbeElement.ceSignatureRbe,
          ceDateRbe: rbeElement.ceDateRbe,

          aoRemarksRbe: rbeElement.aoRemarksRbe,
          aoSignatureRbe: rbeElement.aoSignatureRbe,
          aoDateRbe: rbeElement.aoDateRbe,

          dcAoRemarksRbe: rbeElement.dcAoRemarksRbe,
          dcAoSignatureRbe: rbeElement.dcAoSignatureRbe,
          dcAoDateRbe: rbeElement.dcAoDateRbe,

          faRemarksRbe: rbeElement.faRemarksRbe,
          faSignatureRbe: rbeElement.faSignatureRbe,
          faDateRbe: rbeElement.faDateRbe,

          mdRemarksRbe:
            this.MDremarksFormRbe.controls['mdRemarksRbe'].value,
          mdSignatureRbe:
            this.MDremarksFormRbe.controls['mdSignatureRbe'].value,
          mdDateRbe: this.formatDate(
            this.MDremarksFormRbe.controls['mdDateRbe'].value
          ),

          subCodeRBES: subCodeRbe
        };
        console.log(rbeElement.subCodeRBES, 'rbeElement.subCodeRBES');

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToSaveRBE.push(rbeData);
      });
    }

    console.log('RBE  === data ================= ', dataToSaveRBE);

    if (this.searchFilterValue == '') {
      this.apiCall.apiPostCall('api/rbe/edit', dataToSaveRBE).subscribe(
        (res) => {
          if (res) {
            this.isLoading = false;
          }
          console.log('save all the years form for RRRBBBBEEE', res.responseObject);
          this.snackBar.open(forwardMessage, 'Close', {
            duration: 3000,
          });
          this.route.navigate(['/famodule/home/budget']);
        },
        (error) => {
          this.isLoading = false;
          console.log(error.message);
        }
      );
    }
    else {
      this.isLoading = false;
      this.snackBar.open('Clear The Search Filter', 'Close', { duration: 3000 })
    }
  }

  DraftRbeUpdate() {
    this.isLoading = true;
    let dataToUpdateRBE = [];
    if (
      this.userDivision == 'Head_office' &&
      this.divisionNameSelect != 'Head_office'
    ) {
      this.statusUpdate = 'Pending';
    } else if (this.userDivision != 'Head_office') {
      this.statusUpdate = 'Draft';
    }

    if (this.roleName == 'ARO_Division') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          codeId: rbeElement.code.id,
          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

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
          creator: rbeElement.creator,
          aroDivisionStatusRbe: 'Draft',
          mmsDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          aePlanDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          faStatusRbe: '',
          roStatusRbe: '',
          croStatusRbe: '',
          eeTCellStatusRbe: '',

          aroDivisionRemarksRbe:
            this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          aroDivisionSignatureRbe:
            this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          aroDivisionDateRbe: this.formatDate(
            this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value
          ),

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'MMS_Division') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          codeId: rbeElement.code.id,
          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

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
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: 'Draft',
          aeeDivisionStatusRbe: '',
          aePlanDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          faStatusRbe: '',
          roStatusRbe: '',
          croStatusRbe: '',
          eeTCellStatusRbe: '',

          aroDivisionRemarksRbe:
            this.AROremarksFormRbe.controls['aroDivisionRemarksRbe'].value,
          aroDivisionSignatureRbe:
            this.AROremarksFormRbe.controls['aroDivisionSignatureRbe'].value,
          aroDivisionDateRbe:
            this.AROremarksFormRbe.controls['aroDivisionDateRbe'].value,

          mmsDivisionRemarksRbe:
            this.MMSremarksFormRbe.controls['mmsDivisionRemarksRbe'].value,
          mmsDivisionSignatureRbe:
            this.MMSremarksFormRbe.controls['mmsDivisionSignatureRbe'].value,
          mmsDivisionDateRbe: this.formatDate(
            this.MMSremarksFormRbe.controls['mmsDivisionDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'AEE_Division') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = [];
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

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
          creator: rbeElement.creator,
          aroDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',
          aeeDivisionStatusRbe: 'Draft',
          aePlanDivisionStatusRbe: '',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          faStatusRbe: '',
          roStatusRbe: '',
          croStatusRbe: '',
          eeTCellStatusRbe: '',

          aeeDivisionRemarksRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionRemarksRbe'].value,
          aeeDivisionSignatureRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionSignatureRbe'].value,
          aeeDivisionDateRbe: this.formatDate(
            this.AEEremarksFormRbe.controls['aeeDivisionDateRbe'].value
          ),
          status: 'Yes',

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }
        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'AE_Planning') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

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
          creator: rbeElement.creator,
          aroDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: 'Draft',
          accClerkStatusRbe: '',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          faStatusRbe: '',
          roStatusRbe: '',
          croStatusRbe: '',
          eeTCellStatusRbe: '',

          aeeDivisionRemarksRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionRemarksRbe'].value,
          aeeDivisionSignatureRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionSignatureRbe'].value,
          aeeDivisionDateRbe:
            this.AEEremarksFormRbe.controls['aeeDivisionDateRbe'].value,

          aePlanDivisionRemarksRbe:
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionRemarksRbe']
              .value,
          aePlanDivisionSignatureRbe:
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionSignatureRbe']
              .value,
          aePlanDivisionDateRbe: this.formatDate(
            this.AE_PLANremarksFormRbe.controls['aePlanDivisionDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };
        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }
        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'ACC_Clerk') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

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
          creator: rbeElement.creator,
          aroDivisionStatusRbe: '',
          mmsDivisionStatusRbe: '',
          aeeDivisionStatusRbe: '',
          aePlanDivisionStatusRbe: '',
          accClerkStatusRbe: 'Draft',
          daDivisionStatusRbe: '',
          eeDivisionStatusRbe: '',
          faStatusRbe: '',
          roStatusRbe: '',
          croStatusRbe: '',
          eeTCellStatusRbe: '',

          accClerkRemarksRbe:
            this.ACCremarksFormRbe.controls['accClerkRemarksRbe'].value,
          accDivisionSignatureRbe:
            this.ACCremarksFormRbe.controls['accDivisionSignatureRbe'].value,
          accDivisionDateRbe: this.formatDate(
            this.ACCremarksFormRbe.controls['accDivisionDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'DA_Division') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe: this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe: this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe: this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,


          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: 'Draft',
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          faStatusRbe: rbeElement.faStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,

          aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe:
            this.DAremarksFormRbe.controls['daDivisionRemarksRbe'].value,
          daDivisionSignatureRbe:
            this.DAremarksFormRbe.controls['daDivisionSignatureRbe'].value,
          daDivisionDateRbe: this.formatDate(
            this.DAremarksFormRbe.controls['daDivisionDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'EE_Division') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,


          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: 'Draft',
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,

          aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe:
            this.EEremarksFormRbe.controls['eeDivisionRemarksRbe'].value,
          eeDivisionSignatureRbe:
            this.EEremarksFormRbe.controls['eeDivisionSignatureRbe'].value,
          eeDivisionDateRbe: this.formatDate(
            this.EEremarksFormRbe.controls['eeDivisionDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };
        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }
        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'RO') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: 'Draft',
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,

          aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          // aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          // aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          // aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          // aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          // aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          // aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          // accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          // accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          // accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: this.ROremarksFormRbe.controls['roRemarksRbe'].value,
          roSignatureRbe:
            this.ROremarksFormRbe.controls['roSignatureRbe'].value,
          roDateRbe: this.formatDate(
            this.ROremarksFormRbe.controls['roDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'CRO') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          croStatusRbe: 'Draft',

          aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          // aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          // aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          // aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          // aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          // aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          // aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          // accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          // accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          // accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe: rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: this.CROremarksFormRbe.controls['croRemarksRbe'].value,
          croSignatureRbe:
            this.CROremarksFormRbe.controls['croSignatureRbe'].value,
          croDateRbe: this.formatDate(
            this.CROremarksFormRbe.controls['croDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'EE_T_CELL') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: 'Draft',

          // aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          // aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          // aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          // mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          // mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          // mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          // accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          // accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          // accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          // roRemarksRbe: rbeElement.roRemarksRbe,
          // roSignatureRbe: rbeElement.roSignatureRbe,
          // roDateRbe: rbeElement.roDateRbe,

          // croRemarksRbe: rbeElement.croRemarksRbe,
          // croSignatureRbe: rbeElement.croSignatureRbe,
          // croDateRbe: rbeElement.croDateRbe,

          eeTCellRemarksRbe:
            this.eeTcellremarksFormRbe.controls['eeTCellRemarksRbe'].value,
          eeTCellSignatureRbe:
            this.eeTcellremarksFormRbe.controls['eeTCellSignatureRbe'].value,
          eeTCellDateRbe: this.formatDate(
            this.eeTcellremarksFormRbe.controls['eeTCellDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'SE') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          seStatusRbe: 'Draft',


          // aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          // aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          // aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          // mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          // mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          // mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          // accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          // accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          // accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          // roRemarksRbe: rbeElement.roRemarksRbe,
          // roSignatureRbe: rbeElement.roSignatureRbe,
          // roDateRbe: rbeElement.roDateRbe,

          // croRemarksRbe: rbeElement.croRemarksRbe,
          // croSignatureRbe: rbeElement.croSignatureRbe,
          // croDateRbe: rbeElement.croDateRbe,

          seRemarksRbe:
            this.seremarksFormRbe.controls['seRemarksRbe'].value,
          seSignatureRbe:
            this.seremarksFormRbe.controls['seSignatureRbe'].value,
          seDateRbe: this.formatDate(
            this.seremarksFormRbe.controls['seDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'CE') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          actualsUpToCreatorTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeFixedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,
          lastRbeProposedCreatorTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          seStatusRbe: rbeElement.seStatusRbe,
          ceStatusRbe: 'Draft',


          // aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          // aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          // aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          // mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          // mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          // mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          // accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          // accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          // accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          seRemarksRbe: rbeElement.seRemarksRbe,
          seSignatureRbe: rbeElement.seSignatureRbe,
          seDateRbe: rbeElement.seDateRbe,

          // roRemarksRbe: rbeElement.roRemarksRbe,
          // roSignatureRbe: rbeElement.roSignatureRbe,
          // roDateRbe: rbeElement.roDateRbe,

          // croRemarksRbe: rbeElement.croRemarksRbe,
          // croSignatureRbe: rbeElement.croSignatureRbe,
          // croDateRbe: rbeElement.croDateRbe,

          ceRemarksRbe:
            this.CEremarksFormRbe.controls['ceRemarksRbe'].value,
          ceSignatureRbe:
            this.CEremarksFormRbe.controls['ceSignatureRbe'].value,
          ceDateRbe: this.formatDate(
            this.CEremarksFormRbe.controls['ceDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'AO') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          seStatusRbe: rbeElement.seStatusRbe,
          ceStatusRbe: rbeElement.ceStatusRbe,
          aoStatusRbe: 'Draft',

          aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe: rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: rbeElement.croRemarksRbe,
          croSignatureRbe: rbeElement.croSignatureRbe,
          croDateRbe: rbeElement.croDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          seRemarksRbe: rbeElement.seRemarksRbe,
          seSignatureRbe: rbeElement.seSignatureRbe,
          seDateRbe: rbeElement.seDateRbe,

          ceRemarksRbe: rbeElement.ceRemarksRbe,
          ceSignatureRbe: rbeElement.ceSignatureRbe,
          ceDateRbe: rbeElement.ceDateRbe,

          aoRemarksRbe:
            this.AOremarksFormRbe.controls['aoRemarksRbe'].value,
          aoSignatureRbe:
            this.AOremarksFormRbe.controls['aoSignatureRbe'].value,
          aoDateRbe: this.formatDate(
            this.AOremarksFormRbe.controls['aoDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };
        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }
        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'DCAO') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          seStatusRbe: rbeElement.seStatusRbe,
          ceStatusRbe: rbeElement.ceStatusRbe,
          aoStatusRbe: rbeElement.aoStatusRbe,
          dcAoStatusRbe: 'Draft',

          aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe: rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: rbeElement.croRemarksRbe,
          croSignatureRbe: rbeElement.croSignatureRbe,
          croDateRbe: rbeElement.croDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          seRemarksRbe: rbeElement.seRemarksRbe,
          seSignatureRbe: rbeElement.seSignatureRbe,
          seDateRbe: rbeElement.seDateRbe,

          ceRemarksRbe: rbeElement.ceRemarksRbe,
          ceSignatureRbe: rbeElement.ceSignatureRbe,
          ceDateRbe: rbeElement.ceDateRbe,

          aoRemarksRbe: rbeElement.aoRemarksRbe,
          aoSignatureRbe: rbeElement.aoSignatureRbe,
          aoDateRbe: rbeElement.aoDateRbe,

          dcAoRemarksRbe:
            this.DCAOremarksFormRbe.controls['dcAoRemarksRbe'].value,
          dcAoSignatureRbe:
            this.DCAOremarksFormRbe.controls['dcAoSignatureRbe'].value,
          dcAoDateRbe: this.formatDate(
            this.DCAOremarksFormRbe.controls['dcAoDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }
        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'FA') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          seStatusRbe: rbeElement.seStatusRbe,
          ceStatusRbe: rbeElement.ceStatusRbe,
          aoStatusRbe: rbeElement.aoStatusRbe,
          dcAoStatusRbe: rbeElement.dcAoStatusRbe,
          faStatusRbe: 'Draft',

          aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe: rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: rbeElement.croRemarksRbe,
          croSignatureRbe: rbeElement.croSignatureRbe,
          croDateRbe: rbeElement.croDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          seRemarksRbe: rbeElement.seRemarksRbe,
          seSignatureRbe: rbeElement.seSignatureRbe,
          seDateRbe: rbeElement.seDateRbe,

          ceRemarksRbe: rbeElement.ceRemarksRbe,
          ceSignatureRbe: rbeElement.ceSignatureRbe,
          ceDateRbe: rbeElement.ceDateRbe,

          aoRemarksRbe: rbeElement.aoRemarksRbe,
          aoSignatureRbe: rbeElement.aoSignatureRbe,
          aoDateRbe: rbeElement.aoDateRbe,

          dcAoRemarksRbe: rbeElement.dcAoRemarksRbe,
          dcAoSignatureRbe: rbeElement.dcAoSignatureRbe,
          dcAoDateRbe: rbeElement.dcAoDateRbe,

          faRemarksRbe:
            this.FAremarksFormRbe.controls['faRemarksRbe'].value,
          faSignatureRbe:
            this.FAremarksFormRbe.controls['faSignatureRbe'].value,
          faDateRbe: this.formatDate(
            this.FAremarksFormRbe.controls['faDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };
        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }
        dataToUpdateRBE.push(rbeData);
      });
    } else if (this.roleName == 'MD') {
      this.getYearDataRBE.forEach((rbeElement) => {
        let subCodeRbe = []
        let rbeData = {
          id: rbeElement.id,
          codeId: rbeElement.code.id,
          budgetHeadRBE: rbeElement.budgetHeadRBE,
          schedule: rbeElement.schedule,
          scheduleName: rbeElement.scheduleName,
          code: rbeElement.code,
          codeName: rbeElement.codeName,

          actualsRbe: +rbeElement.actualsRbe,
          beRbe: +rbeElement.beRbe,
          actualsUpToRbe: +rbeElement.actualsUpToRbe,
          lastRbeProposed: +rbeElement.lastRbeProposed,
          lastRbeFixed: +rbeElement.lastRbeFixed,

          actualsYearRbe:
            this.yearMonthRbeForm.controls['actualsYearRbe'].value,
          beYearRbe: this.yearMonthRbeForm.controls['beYearRbe'].value,
          actualsUpToYearRbe:
            this.yearMonthRbeForm.controls['actualsUpToYearRbe'].value,
          rbeYear: this.yearMonthRbeForm.controls['lastRbeYear'].value,

          actualsUpToMonthRbe:
            this.yearMonthRbeForm.controls['actualsUpToMonthRbe'].value,

          actualsTotalRbe:
            this.yearMonthRbeForm.controls['actualTotalRbe'].value,
          beTotalRbe: this.yearMonthRbeForm.controls['beTotalRbe'].value,
          actualsUpToTotalRbe:
            this.yearMonthRbeForm.controls['actualsUpToTotalRbe'].value,
          lastRbeProposedTotal:
            this.yearMonthRbeForm.controls['lastRbeProposedTotal'].value,
          lastRbeFixedTotal:
            this.yearMonthRbeForm.controls['lastRbeFixedTotal'].value,

          beCreatorTotalRbe: rbeElement.beCreatorTotalRbe,
          actualsCreatorTotalRbe: rbeElement.actualsCreatorTotalRbe,
          actualsUpToCreatorTotalRbe: rbeElement.actualsUpToCreatorTotalRbe,
          lastRbeFixedCreatorTotal: rbeElement.lastRbeFixedCreatorTotal,
          lastRbeProposedCreatorTotal: rbeElement.lastRbeProposedCreatorTotal,

          // approvalStatus: this.statusUpdate,

          division: rbeElement.division,

          approvalStatus: 'Draft',
          creator: rbeElement.creator,
          aroDivisionStatusRbe: rbeElement.aroDivisionStatusRbe,
          mmsDivisionStatusRbe: rbeElement.mmsDivisionStatusRbe,
          aeeDivisionStatusRbe: rbeElement.aeeDivisionStatusRbe,
          aePlanDivisionStatusRbe: rbeElement.aePlanDivisionStatusRbe,
          accClerkStatusRbe: rbeElement.accClerkStatusRbe,
          daDivisionStatusRbe: rbeElement.daDivisionStatusRbe,
          eeDivisionStatusRbe: rbeElement.eeDivisionStatusRbe,
          roStatusRbe: rbeElement.roStatusRbe,
          croStatusRbe: rbeElement.croStatusRbe,
          eeTCellStatusRbe: rbeElement.eeTCellStatusRbe,
          seStatusRbe: rbeElement.seStatusRbe,
          ceStatusRbe: rbeElement.ceStatusRbe,
          aoStatusRbe: rbeElement.aoStatusRbe,
          dcAoStatusRbe: rbeElement.dcAoStatusRbe,
          faStatusRbe: rbeElement.faStatusRbe,
          mdStatusRbe: 'Draft',


          aroDivisionRemarksRbe: rbeElement.aroDivisionRemarksRbe,
          aroDivisionSignatureRbe: rbeElement.aroDivisionSignatureRbe,
          aroDivisionDateRbe: rbeElement.aroDivisionDateRbe,

          mmsDivisionRemarksRbe: rbeElement.mmsDivisionRemarksRbe,
          mmsDivisionSignatureRbe: rbeElement.mmsDivisionSignatureRbe,
          mmsDivisionDateRbe: rbeElement.mmsDivisionDateRbe,

          aeeDivisionRemarksRbe: rbeElement.aeeDivisionRemarksRbe,
          aeeDivisionSignatureRbe: rbeElement.aeeDivisionSignatureRbe,
          aeeDivisionDateRbe: rbeElement.aeeDivisionDateRbe,

          aePlanDivisionRemarksRbe: rbeElement.aePlanDivisionRemarksRbe,
          aePlanDivisionSignatureRbe: rbeElement.aePlanDivisionSignatureRbe,
          aePlanDivisionDateRbe: rbeElement.aePlanDivisionDateRbe,

          accClerkRemarksRbe: rbeElement.accClerkRemarksRbe,
          accDivisionSignatureRbe: rbeElement.accDivisionSignatureRbe,
          accDivisionDateRbe: rbeElement.accDivisionDateRbe,

          daDivisionRemarksRbe: rbeElement.daDivisionRemarksRbe,
          daDivisionSignatureRbe: rbeElement.daDivisionSignatureRbe,
          daDivisionDateRbe: rbeElement.daDivisionDateRbe,

          eeDivisionRemarksRbe: rbeElement.eeDivisionRemarksRbe,
          eeDivisionSignatureRbe: rbeElement.eeDivisionSignatureRbe,
          eeDivisionDateRbe: rbeElement.eeDivisionDateRbe,

          roRemarksRbe: rbeElement.roRemarksRbe,
          roSignatureRbe: rbeElement.roSignatureRbe,
          roDateRbe: rbeElement.roDateRbe,

          croRemarksRbe: rbeElement.croRemarksRbe,
          croSignatureRbe: rbeElement.croSignatureRbe,
          croDateRbe: rbeElement.croDateRbe,

          eeTCellRemarksRbe: rbeElement.eeTCellRemarksRbe,
          eeTCellSignatureRbe: rbeElement.eeTCellSignatureRbe,
          eeTCellDateRbe: rbeElement.eeTCellDateRbe,

          seRemarksRbe: rbeElement.seRemarksRbe,
          seSignatureRbe: rbeElement.seSignatureRbe,
          seDateRbe: rbeElement.seDateRbe,

          ceRemarksRbe: rbeElement.ceRemarksRbe,
          ceSignatureRbe: rbeElement.ceSignatureRbe,
          ceDateRbe: rbeElement.ceDateRbe,

          aoRemarksRbe: rbeElement.aoRemarksRbe,
          aoSignatureRbe: rbeElement.aoSignatureRbe,
          aoDateRbe: rbeElement.aoDateRbe,

          dcAoRemarksRbe: rbeElement.dcAoRemarksRbe,
          dcAoSignatureRbe: rbeElement.dcAoSignatureRbe,
          dcAoDateRbe: rbeElement.dcAoDateRbe,

          faRemarksRbe: rbeElement.faRemarksRbe,
          faSignatureRbe: rbeElement.faSignatureRbe,
          faDateRbe: rbeElement.faDateRbe,

          mdRemarksRbe:
            this.MDremarksFormRbe.controls['mdRemarksRbe'].value,
          mdSignatureRbe:
            this.MDremarksFormRbe.controls['mdSignatureRbe'].value,
          mdDateRbe: this.formatDate(
            this.MDremarksFormRbe.controls['mdDateRbe'].value
          ),
          status: 'Yes',

          subCodeRBES: subCodeRbe
        };

        if (rbeElement.subCodeRBES && rbeElement.subCodeRBES.length > 0) {
          rbeElement.subCodeRBES.forEach((items) => {
            let subCodeArray = {
              id: items.id,
              subCodeIdRBE: items.subCodeGetDTO.id,
              subActualsRbe: items.subActualsRbe,
              subBeRbe: items.subBeRbe,
              subActualsUptoRbe: items.subActualsUptoRbe,
              subRbeProposed: items.subRbeProposed,
              subRbeFixed: items.subRbeFixed,
            };
            subCodeRbe.push(subCodeArray);
            console.log(subCodeRbe, 'subCodes');
          });
        }

        dataToUpdateRBE.push(rbeData);
      });
    }

    console.log('RBE  === data ================= ', dataToUpdateRBE);

    if (this.searchFilterValue == '') {
      this.apiCall.apiPostCall('api/rbe/edit', dataToUpdateRBE).subscribe(
        (res) => {
          if (res) {
            this.isLoading = false;
          }
          console.log('Draft all the years form for RRRBBBBEEE', res.data);
          this.route.navigate(['/famodule/home/budget']);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
    else {
      this.isLoading = false;
      this.snackBar.open('Clear The Search Filter', 'Close', { duration: 3000 })
    }
  }

  calculateTotalsRBE() {
    console.log(this.getYearDataRBE, 'RBE Total');
    let totalActual = 0;
    let totalbe = 0;
    let totalActualsUpTo = 0;
    let totalBELastYearProposed = 0;
    let totalBELastYearFixed = 0;

    for (let item of this.getYearDataRBE) {
      totalActual += +item.actualsRbe || 0;
      totalbe += +item.beRbe || 0;
      totalActualsUpTo += +item.actualsUpToRbe || 0;
      totalBELastYearProposed += +item.lastRbeProposed || 0;
      totalBELastYearFixed += +item.lastRbeFixed || 0;
    }

    this.yearMonthRbeForm.patchValue({
      actualTotalRbe: totalActual.toFixed(2),
      beTotalRbe: totalbe.toFixed(2),
      actualsUpToTotalRbe: totalActualsUpTo.toFixed(2),
      lastRbeProposedTotal: totalBELastYearProposed.toFixed(2),
      lastRbeFixedTotal: totalBELastYearFixed.toFixed(2)
    });
  }

  calculateTotals() {
    let totalActual = 0;
    let totalRbe = 0;
    let totalActualsUpTo = 0;
    let totalBELastYearProposed = 0;
    let totalBELastYearFixed = 0;

    for (let item of this.getYearData || []) {
      totalActual += +item.actuals || 0;
      totalRbe += +item.rbe || 0;
      totalActualsUpTo += +item.actualsUpTo || 0;
      totalBELastYearProposed += +item.beLastYearProposed || 0;
      totalBELastYearFixed += +item.beLastYearFixed || 0;
    }

    this.yearMonthFormBE.patchValue({
      actualstotal: totalActual.toFixed(2),
      rbeTotal: totalRbe.toFixed(2),
      actualsUpToTotal: totalActualsUpTo.toFixed(2),
      beLastYearProposedTotal: totalBELastYearProposed.toFixed(2),
      beLastYearFixedTotal: totalBELastYearFixed.toFixed(2),
    });
  }

  searchFilters(event: Event) {
    let value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchFilterValue = (event.target as HTMLInputElement).value;
    console.log(value, 'value');

    if (this.beRbe == 'be') {
      if (value == '') {
        this.getYearData = [...this.filteredBudgetDateSourceBE];
        this.getYearDataLen = this.getYearData.length;
        console.log(this.getYearDataLen, 'this.getYearDataLen');

      } else {
        this.getYearData = this.filteredBudgetDateSourceBE.filter(item =>
          item.code.codeName.toLowerCase().includes(value) ||
          item.code.codeNumber.toLowerCase().includes(value)
        );
        this.getYearDataLen = this.getYearData.length;
        console.log(this.getYearDataLen, 'this.getYearDataLen');
      }
      this.applyDecimalFormattingBE();
      this.calculateTotals();


    } else if (this.beRbe == 'rbe') {
      if (value == '') {
        this.getYearDataRBE = [...this.filteredBudgetDateSourceRBE];
        this.getYearDataLen = this.getYearDataRBE.length;
        console.log(this.getYearDataLen, 'this.getYearDataLen');
      }
      else {
        this.getYearDataRBE = this.filteredBudgetDateSourceRBE.filter(item =>
          item.code.codeName.toLowerCase().includes(value) ||
          item.code.codeNumber.toLowerCase().includes(value)
        );
        this.getYearDataLen = this.getYearDataRBE.length;
        console.log(this.getYearDataLen, 'this.getYearDataLen');
      }
      this.applyDecimalFormattingRBE();
      this.calculateTotalsRBE();
    }

  }

  applyDecimalFormattingBE() {
    this.getYearData.forEach((item, i) => {
      if (item.actuals !== undefined) {
        item.actuals = (+item.actuals).toFixed(2);
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
      this.calculateTotals();
    });
  }

  applyDecimalFormattingRBE() {
    this.getYearDataRBE.forEach((item, i) => {
      if (item.actualsRbe !== undefined) {
        item.actualsRbe = (+item.actualsRbe).toFixed(2);
      }
      if (item.beRbe !== undefined) {
        item.beRbe = (+item.beRbe).toFixed(2);
      }
      if (item.actualsUpToRbe !== undefined) {
        item.actualsUpToRbe = (+item.actualsUpToRbe).toFixed(2);
      }
      if (item.lastRbeProposed !== undefined) {
        item.lastRbeProposed = (+item.lastRbeProposed).toFixed(2);
      }
      if (item.lastRbeFixed !== undefined) {
        item.lastRbeFixed = (+item.lastRbeFixed).toFixed(2);
      }
    });
  }

  fiveDigitsWarning(event: any) {
    if (event.target.value.length > 7) {
      console.log(event.target.value.length, 'length');
      this.snackBar.open('Your Amount is Above 5 digits', 'close', { duration: 2000 });
    }
  }

  formatAmountOnBlur(value: any, element: any) {
    const inputValue = value || element.target.value;
    if (!isNaN(inputValue) && inputValue !== '') {
      const formattedValue = (+inputValue).toFixed(2);
      element.target ? element.target.value = formattedValue : (element.value = formattedValue);
    }
  }

  actualsGrandTotal() {
    const actualsTotal = this.yearMonthFormBE.get('actuals').value;
    const beTotal = this.yearMonthFormBE.get('be').value;
    const rbeTotal = this.yearMonthFormBE.get('rbe').value;
    const actualsUpToTotal = this.yearMonthFormBE.get('actualsUpTo').value;
    const beLastYearProposedTotal = this.yearMonthFormBE.get('beLastYearProposed').value;
    const beLastYearFixedTotal = this.yearMonthFormBE.get('beLastYearFixed').value;

    // Calculate totals
    this.totalActuals = this.totalActual + actualsTotal;
    this.totalBE = this.totalBE + beTotal;
    this.totalRBE = this.totalRBE + rbeTotal;
    this.totalActualsUpTo = this.totalActualUpto + actualsUpToTotal;
    this.totalBELastYearProposed = this.totalBELastYearProposed + beLastYearProposedTotal;
    this.totalBELastYearFixed = this.totalBELastYearFixed + beLastYearFixedTotal;

    this.yearMonthFormBE.patchValue({
      actualstotal: this.totalActuals,
      beTotal: this.totalBE,
      rbeTotal: this.totalRBE,
      actualsUpToTotal: this.totalActualsUpTo,
      beLastYearProposedTotal: this.totalBELastYearProposed,
      beLastYearFixedTotal: this.totalBELastYearFixed,
    });
  }

  backButtonClick() {
    this.route.navigate(['/famodule/home/budget']);
  }

  openPanelSubCode(responce: any, i: any, type: any, beRbe: any) {
    let beRbeValue = beRbe;

    let openDialogBox = this.dialog.open(SubCodePopupformComponent, {
      width: '1500px',
      height: '500px',
      data: {
        index: i,
        userDivision: this.userDivision,
        responce: responce,
        type: type,
        beRbe: beRbe
      }
    });

    openDialogBox.afterClosed().subscribe((data) => {
      let id = data.id;
      let index = data.index;
      let type = data.type;
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
      console.log(data.type, 'data.type');
      console.log(subCodeResponce, 'subCodeResponce');
      console.log(id, 'id');
      console.log(index, 'index');

      // BE

      if (beRbeValue == 'be') {

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
        console.log(this.getYearData, 'this.getYearData[index]');
        if (type == 'create') {

          this.getYearData[index].actual = (subActualsSum).toFixed(2);
          this.getYearData[index].rbe = (subRbeSum).toFixed(2);
          this.getYearData[index].actualsUpTo = (subActualsUptoSum).toFixed(2);
          this.getYearData[index].beLastYearProposed = (subBeProposedSum).toFixed(2);
          this.getYearData[index].beLastYearFixed = (subBeFixedSum).toFixed(2);
          this.getYearData[index].subCodeBES = subCodeBESArray;
          console.log(this.getYearData[index], 'this.getYearData[index]');
          this.calculateTotals();

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
        else if (type == 'edit' || type == 'view') {
          this.getYearData[index].actuals = (subActualsSum).toFixed(2);
          this.getYearData[index].rbe = (subRbeSum).toFixed(2);
          this.getYearData[index].actualsUpTo = (subActualsUptoSum).toFixed(2);
          this.getYearData[index].beLastYearProposed = (subBeProposedSum).toFixed(2);
          this.getYearData[index].beLastYearFixed = (subBeFixedSum).toFixed(2);
          this.getYearData[index].subCodeBES = subCodeBESArray;
          console.log(this.getYearData[index], 'this.getYearData[index]');
          this.calculateTotals();

          subCodeResponce.forEach((x) => {
            subCodeBESArray.push({
              id: x.id,
              subActuals: x.subActuals,
              subActualsUpto: x.subActualsUpto,
              subBeProposed: x.subBeProposed,
              subBeFixed: x.subBeFixed,
              subCodeGetDTO: {
                id: x.subCodeGetDTO.id,
                subCode: x.subCodeGetDTO.subCode,
                subCodeDescription: x.subCodeGetDTO.subCodeDescription
              },
              subRbe: x.subRbe,
            });
          })
        }
      }

      // RBE 

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

        if (type == 'create') {
          this.getYearDataRBE[index].actualsRbe = (subActualsRBESum).toFixed(2);
          this.getYearDataRBE[index].beRbe = (subBeRBESum).toFixed(2);
          this.getYearDataRBE[index].actualsUpToRbe = (subActualsUptoRBESum).toFixed(2);
          this.getYearDataRBE[index].lastRbeProposed = (subBeProposedRBESum).toFixed(2);
          this.getYearDataRBE[index].lastRbeFixed = (subBeFixedRBESum).toFixed(2);
          this.getYearDataRBE[index].subCodeRBES = subCodeRBESArray;
          console.log(this.getYearDataRBE[index], 'this.getYearDataRBE[index]');
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
        else if (type == 'edit' || type == 'view') {
          this.getYearDataRBE[index].actualsRbe = (subActualsRBESum).toFixed(2);
          this.getYearDataRBE[index].beRbe = (subBeRBESum).toFixed(2);
          this.getYearDataRBE[index].actualsUpToRbe = (subActualsUptoRBESum).toFixed(2);
          this.getYearDataRBE[index].lastRbeProposed = (subBeProposedRBESum).toFixed(2);
          this.getYearDataRBE[index].lastRbeFixed = (subBeFixedRBESum).toFixed(2);
          this.getYearDataRBE[index].subCodeRBES = subCodeRBESArray;
          console.log(this.getYearDataRBE[index], 'this.getYearDataRBE[index]');
          this.calculateTotalsRBE();

          subCodeResponce.forEach((x) => {
            subCodeRBESArray.push({
              id: x.id,
              subActualsRbe: x.subActualsRbe,
              subBeRbe: x.subBeRbe,
              subActualsUptoRbe: x.subActualsUptoRbe,
              subRbeProposed: x.subRbeProposed,
              subRbeFixed: x.subRbeFixed,
              subCodeGetDTO: {
                id: x.subCodeGetDTO.id,
                subCode: x.subCodeGetDTO.subCode,
                subCodeDescription: x.subCodeGetDTO.subCodeDescription
              },
            });
          })
        }

      }

    });

  }

  buttonName() {
    // Division
    if (this.roleName == 'ARO_Division') {
      this.buttonNameValue = 'Forward To MMS';
    }
    else if (this.roleName == 'MMS_Division') {
      this.buttonNameValue = 'Forward To DA';
    }
    else if (this.roleName == 'AEE_Division') {
      this.buttonNameValue = 'Forward To AE_Plan';
    }
    else if (this.roleName == 'AE_Planning') {
      this.buttonNameValue = 'Forward To DA';
    }
    else if (this.roleName == 'ACC_Clerk') {
      this.buttonNameValue = 'Forward To DA';
    }
    else if (this.roleName == 'DA_Division') {
      this.buttonNameValue = 'Forward To EE';
    }
    else if (this.roleName == 'EE_Division') {
      this.buttonNameValue = 'Forward To Board';
    }

    // head office

    else if (this.roleName == 'RO') {
      this.buttonNameValue = 'Forward To CRO';
    }
    else if (this.roleName == 'CRO') {
      this.buttonNameValue = 'Forward To AO';
    }
    else if (this.roleName == 'EE_T_CELL') {
      this.buttonNameValue = 'Forward To SE';
    }
    else if (this.roleName == 'SE') {
      this.buttonNameValue = 'Forward To CE';
    }
    else if (this.roleName == 'CE') {
      this.buttonNameValue = 'Forward To AO';
    }
    else if (this.roleName == 'AO') {
      this.buttonNameValue = 'Forward To DCAO';
    }
    else if (this.roleName == 'DCAO') {
      this.buttonNameValue = 'Forward To FA';
    }
    else if (this.roleName == 'FA') {
      this.buttonNameValue = 'Approve';
    }
    else if (this.roleName == 'MD') {
      this.buttonNameValue = 'Approve';
    }
  }

  isInNineSeries(value: number): boolean {
    return value % 9 === 0;
  }

}
