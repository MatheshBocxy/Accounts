import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatTableDataSource } from '@angular/material/table';
import { SubCodePopupformComponent } from '../sub-code-popupform/sub-code-popupform.component';
import { BugdetSplitUpForConsolidationComponent } from '../bugdet-split-up-for-consolidation/bugdet-split-up-for-consolidation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-cash-works',
  templateUrl: './create-cash-works.component.html',
  styleUrl: './create-cash-works.component.css',
})

export class CreateCashWorksComponent implements OnInit {

  actualsUpToYear: any;
  actualsYear: any;
  beLastYear: any;
  beYear: any;
  rbeYear: any;

  workFlowGroupArrayA: any[] = [];
  workFlowGroupArrayB: any[] = [];
  workFlowGroupArrayC: any[] = [];
  workFlowGroupArrayOthers: any[] = [];

  cashFlowGroupArrayCommitOthers: any[] = [];
  cashFlowGroupArrayResOthers: any[] = [];

  cashGroupTotalA: string = 'A';
  cashGroupTotalB: string = 'B';
  cashGroupTotalC: string = 'C';
  cashGroupTotalOther: string = '';

  workGroupTotalA: string = 'A';
  workGroupTotalB: string = 'B';
  workGroupTotalC: string = 'C';
  workGroupTotalOther: string = '';

  CashFlowGroupRbeA: any;
  CashFlowGroupRbeB: any;
  CashFlowGroupRbeC: any;

  CashFlowGroupArrayRbeA: any[] = [];
  CashFlowGroupArrayRbeB: any[] = [];
  CashFlowGroupArrayRbeC: any[] = [];
  workFlowGroupArrayRbeA: any[] = [];
  workFlowGroupArrayRbeB: any[] = [];
  workFlowGroupArrayRbeC: any[] = [];

  cashBudgetForHeadingSub: any;
  cashBudgetForHeadingSubRBE: any;
  resourceData: any = [];
  commitsmentData: any = [];

  CashFlowGroupArrayA: any[] = [];
  CashFlowGroupArrayB: any[] = [];
  CashFlowGroupArrayC: any[] = [];
  CashFlowGroupArrayOthers: any[] = [];

  CashFlowGroupArrayA_COMMITMENTS: any[] = [];
  CashFlowGroupArrayB_COMMITMENTS: any[] = [];
  CashFlowGroupArrayC_COMMITMENTS: any[] = [];
  CashFlowGroupArrayOthers_COMMITMENTS: any[] = [];

  CashFlowGroupArrayRbeA_Resources: any[] = [];
  CashFlowGroupArrayRbeB_Resources: any[] = [];
  CashFlowGroupArrayRbeC_Resources: any[] = [];
  CashFlowGroupArrayRbeOthers_Resources: any[] = [];

  CashFlowGroupArrayRbeA_COMMITMENTS: any[] = [];
  CashFlowGroupArrayRbeB_COMMITMENTS: any[] = [];
  CashFlowGroupArrayRbeC_COMMITMENTS: any[] = [];
  CashFlowGroupArrayRbeOthers_COMMITMENTS: any[] = [];

  divisionDropDown: any;
  divisionValue: any;
  actualsYearRBE: any;
  beYearRBE: any;
  actualsUpToYearRBE: any;
  lastRbeYear: any;

  budgetType: any;
  budgetYear: any;
  valueType: any;

  ActualsYearValue: any;
  rbeYearValue: any;
  beRbePreviousYear: any;
  ActualsUpToYearValue: any;
  beLastYearValue: any;

  ActualsYearRbeValue: any;
  rbePreviousYearRbeValue: any;
  rbeYearRbeValue: any;
  ActualsUpToYearRbeValue: any;
  beLastYearRbeValue: any;

  allSubGroupsResource_A: any[] = [];
  allSubGroupsResource_B: any[] = [];
  allSubGroupsResource_C: any[] = [];
  allSubGroupsResource_Others: any[] = [];

  allSubGroupsCommitments_A: any[] = [];
  allSubGroupsCommitments_B: any[] = [];
  allSubGroupsCommitments_C: any[] = [];
  allSubGroupsCommitments_Others: any[] = [];

  filteredResources_A: any[] = [];
  filteredResources_B: any[] = [];
  filteredResources_C: any[] = [];
  filteredResources_Others: any[] = [];

  filteredCommitments_A: any[] = [];
  filteredCommitments_B: any[] = [];
  filteredCommitments_C: any[] = [];
  filteredCommitments_Others: any[] = [];
  x
  consolidationResourceValues_A: any[];
  consolidationResourceValues_B: any[];
  consolidationResourceValues_C: any[];
  consolidationResourceValues_Others: any[];

  consolidationCommitmentsValues_A: any[];
  consolidationCommitmentsValues_B: any[];
  consolidationCommitmentsValues_C: any[];
  consolidationCommitmentsValues_Others: any[];

  allResourceSubGroup_A = [];
  allResourceSubGroup_B = [];
  allResourceSubGroup_C = [];

  allCommitmentsSubGroup_A = [];
  allCommitmentsSubGroup_B = [];
  allCommitmentsSubGroup_C = [];
  allCommitmentsSubGroup_Others = [];

  // calculating the total A,B,C,Others for resource in cash flow

  actualsResource_A: number = 0;
  actualsResource_B: number = 0;
  actualsResource_C: number = 0;
  actualsResource_Others: number = 0;

  rbeResource_A: number = 0;
  rbeResource_B: number = 0;
  rbeResource_C: number = 0;
  rbeResource_Others: number = 0;

  rbePreviousResource_A: number = 0;
  rbePreviousResource_B: number = 0;
  rbePreviousResource_C: number = 0;
  rbePreviousResource_Others: number = 0;

  beResource_A: number = 0;
  beResource_B: number = 0;
  beResource_C: number = 0;
  beResource_Others: number = 0;

  actualUpToResource_A: number = 0;
  actualUpToResource_B: number = 0;
  actualUpToResource_C: number = 0;
  actualUpToResource_Others: number = 0;

  beProposedResource_A: number = 0;
  beProposedResource_B: number = 0;
  beProposedResource_C: number = 0;
  beProposedResource_Others: number = 0;

  beFixedResource_A: number = 0;
  beFixedResource_B: number = 0;
  beFixedResource_C: number = 0;
  beFixedResource_Others: number = 0;

  // calculating the total A,B,C,Others for Commitments in cash flow

  actualsCommitments_A: number = 0;
  actualsCommitments_B: number = 0;
  actualsCommitments_C: number = 0;
  actualsCommitments_Others: number = 0;

  rbeCommitments_A: number = 0;
  rbeCommitments_B: number = 0;
  rbeCommitments_C: number = 0;
  rbeCommitments_Others: number = 0;

  rbePreviousCommitments_A: number = 0;
  rbePreviousCommitments_B: number = 0;
  rbePreviousCommitments_C: number = 0;
  rbePreviousCommitments_Others: number = 0;

  beCommitments_A: number = 0;
  beCommitments_B: number = 0;
  beCommitments_C: number = 0;
  beCommitments_Others: number = 0;

  actualUpToCommitments_A: number = 0;
  actualUpToCommitments_B: number = 0;
  actualUpToCommitments_C: number = 0;
  actualUpToCommitments_Others: number = 0;

  beProposedCommitments_A: number = 0;
  beProposedCommitments_B: number = 0;
  beProposedCommitments_C: number = 0;
  beProposedCommitments_Others: number = 0;

  beFixedCommitments_A: number = 0;
  beFixedCommitments_B: number = 0;
  beFixedCommitments_C: number = 0;
  beFixedCommitments_Others: number = 0;

  // calculating the total A,B,C,Others for work flow

  actualsWorkFlow_A: number = 0;
  actualsWorkFlow_B: number = 0;
  actualsWorkFlow_C: number = 0;
  actualsWorkFlow_Others: number = 0;

  rbeWorkFlow_A: number = 0;
  rbeWorkFlow_B: number = 0;
  rbeWorkFlow_C: number = 0;
  rbeWorkFlow_Others: number = 0;

  beWorkFlow_A: number = 0;
  beWorkFlow_B: number = 0;
  beWorkFlow_C: number = 0;
  beWorkFlow_Others: number = 0;

  actualUpToWorkFlow_A: number = 0;
  actualUpToWorkFlow_B: number = 0;
  actualUpToWorkFlow_C: number = 0;
  actualUpToWorkFlow_Others: number = 0;

  beProposedWorkFlow_A: number = 0;
  beProposedWorkFlow_B: number = 0;
  beProposedWorkFlow_C: number = 0;
  beProposedWorkFlow_Others: number = 0;

  beFixedWorkFlow_A: number = 0;
  beFixedWorkFlow_B: number = 0;
  beFixedWorkFlow_C: number = 0;
  beFixedWorkFlow_Others: number = 0;

  // total Resource A,B,C
  actualsResourceTotal: number = 0;
  rbeResourceTotal: number = 0;
  rbePreviousResourceTotal: number = 0;
  beResourceTotal: number = 0;
  actualUpToResourceTotal: number = 0;
  proposedResourceTotal: number = 0;
  fixedResourceTotal: number = 0;

  // total Resource A,B,C
  actualsCommitmentsTotal: number = 0;
  rbeCommitmentsTotal: number = 0;
  rbePerviousCommitmentsTotal: number = 0;
  beCommitmentsTotal: number = 0;
  actualUpToCommitmentsTotal: number = 0;
  proposedCommitmentsTotal: number = 0;
  fixedCommitmentsTotal: number = 0;

  division: string;
  roleName: string;
  divisionParams: any;
  workFlowValueBE: any;
  workFlowValueRBE: any;
  lenthOfCommitments_C: number;

  workToCashActualsTotal: any;
  workToCashActualsUpToTotal: any;
  workToCashBeRbeTotal: any;
  workToCashBeRbePreviousTotal: any;
  workToCashProposedTotal: any;
  workToCashFixedTotal: any;
  allDivisions: any;

  actualOverAllTotal: number = 0;
  beRbeOverAllTotal: number = 0;
  beRbePerviousOverAllTotal: number = 0;
  actualUpToOverAllTotal: number = 0;
  proposedOverAllTotal: number = 0;
  fixedOverAllTotal: number = 0;

  selectedDivision = 'All';
  isPreviousBeRbe: boolean;

  constructor(
    private apiCall: ApiservicesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.division = sessionStorage.getItem('division');
    this.roleName = sessionStorage.getItem('role');
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {
      console.log(params, 'params');
      this.divisionValue = params['division'];
      console.log(this.divisionValue);
      this.budgetType = params.type;
      this.budgetYear = params.year;
      this.valueType = params.value;
      this.divisionParams = params.division;
      this.getCashWorksData();
    });

    if (this.valueType == 'BE' && this.budgetType == 'cash') {
      this.workToCashFlowValuesBE();
    }
    else if (this.valueType == 'RBE' && this.budgetType == 'cash') {
      this.workToCashFlowValuesRBE();
    }

    this.getAllDivision();

  }

  getPreviousYearRange = (yearRange: string): string => {
    const [startYear, endYear] = yearRange.split("-").map(Number); // Split and convert to numbers
    const previousStartYear = startYear - 1;
    const previousEndYear = endYear - 1;
    return `${previousStartYear}-${previousEndYear}`;
  };

  getAllDivision() {
    this.apiCall.apiGetCall('api/user/getAllDivision').subscribe(
      (response) => {
        let allDivisions = response.responseObject;
        this.allDivisions = allDivisions
        console.log(this.allDivisions, 'this.allDivisions');
      }
    );
  }

  selectDivisionDropdown(event: any) {
    this.selectedDivision = event.target.value;
    console.log(this.selectedDivision, 'this.selectedDivision');
    if (event.target.value && event.target.value == 'All') {
      this.getCashWorksData();
    }
    if (event.target.value && this.valueType == 'BE') {
      if (this.budgetType == 'cash') {
        this.beCashValues();
        this.cashBeCalculation();
      }
      else {
        this.beWorkValues();
        this.workBeCalculation();
      }
    }
    else if (event.target.value && this.valueType == 'RBE') {
      if (this.budgetType == 'cash') {
        this.rbeCashValues();
        this.cashRbeCalculation();
      }
      else {
        this.rbeWorkValues();
        this.workRbeCalculation();
      }
    }
  }

  CashFlow: boolean;
  WorkFlow: boolean;
  be: boolean;
  rbe: boolean;
  allConsolidationCash_BE: any = []; // The response data
  resourcesGroupA: any[] = [];

  otherData: any[] = [];
  consolidationViewData: any;

  resourceMergeData: any;

  workToCashFlowValuesBE() {
    var paramValue: { [key: string]: string } = {};
    paramValue['budgetType'] = "Work Budget";
    paramValue['beLastYear'] = this.budgetYear;
    // paramValue['division'] = this.division;

    var perviousValue: { [key: string]: string } = {};
    perviousValue['budgetType'] = "Work Budget";
    perviousValue['beLastYear'] = this.getPreviousYearRange(this.budgetYear);
    perviousValue['division'] = this.division;

    this.apiCall.apiPostCall_Query(`api/be/getListViewBEConsolidation`, paramValue).subscribe(
      (res: any) => {

        this.apiCall.apiPostCall_Query(`api/be/getListViewBEConsolidation`, perviousValue).subscribe(
          (perviousRes: any) => {

            console.log(res, "response");
            this.workFlowValueBE = res.responseObject;

            this.workToCashActualsTotal = res.responseObject[0]?.actulasTotal || 0
            this.workToCashBeRbePreviousTotal = perviousRes.responseObject[0]?.rbeTotal || 0
            this.workToCashBeRbeTotal = res.responseObject[0]?.rbeTotal || 0
            this.workToCashActualsUpToTotal = res.responseObject[0]?.actualsUptoTotal || 0
            this.workToCashProposedTotal = res.responseObject[0]?.beLastYearPropossedTotal || 0
            this.workToCashFixedTotal = res.responseObject[0]?.beLastYearFixedTotal || 0
          }
        );
      }
    );
  }

  workToCashFlowValuesRBE() {
    var paramValue: { [key: string]: string } = {};
    paramValue['budgetType'] = "Work Budget";
    paramValue['rbeyear'] = this.budgetYear;
    // paramValue['division'] = this.division;

    var perviousValue: { [key: string]: string } = {};
    perviousValue['budgetType'] = "Work Budget";
    perviousValue['rbeyear'] = this.getPreviousYearRange(this.budgetYear);
    // perviousValue['division'] = this.division;

    this.apiCall.apiPostCall_Query(`api/rbe/getListViewRBEConsolidation`, paramValue).subscribe(
      (res: any) => {
        this.apiCall.apiPostCall_Query(`api/rbe/getListViewRBEConsolidation`, perviousValue).subscribe(
          (perviousRes: any) => {
            console.log(res, "response");
            this.workFlowValueRBE = res.responseObject;
            this.workToCashActualsTotal = res.responseObject[0]?.actualsRbeTotal || 0
            this.workToCashBeRbePreviousTotal = perviousRes.responseObject[0]?.beRbeTotal || 0
            this.workToCashBeRbeTotal = res.responseObject[0]?.beRbeTotal || 0
            this.workToCashActualsUpToTotal = res.responseObject[0]?.actualsUpToRbeTotal || 0
            this.workToCashProposedTotal = res.responseObject[0]?.rbeLastPropossedTotal || 0
            this.workToCashFixedTotal = res.responseObject[0]?.rbeLastFixedTotal || 0
          }
        );
      }
    );
  }

  getCashWorksData() {
    this.divisionParams
    this.allConsolidationCash_BE
    this.filteredResources_A = [];
    this.filteredResources_B = [];
    this.filteredResources_C = [];
    this.filteredResources_Others = [];

    this.filteredCommitments_A = [];
    this.filteredCommitments_B = [];
    this.filteredCommitments_C = [];
    this.filteredCommitments_Others = [];

    // Only BE and Cash and Work
    if (this.valueType == 'BE') {

      if (this.budgetType == 'cash') {
        this.CashFlow = true;
        this.WorkFlow = false;
        this.be = true;
        this.rbe = false;
        var param: { [key: string]: string } = {};
        param['budgetType'] = 'Cash Budget';

        this.apiCall.apiPostCall_Query(`api/budget/getBudgetGroupWise`, param).subscribe(
          (response) => {
            if (response) {
              this.allConsolidationCash_BE = response.responseObject;

              this.filteredResources_A = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'A' && item.mainGroup === 'Resources');

              this.filteredResources_B = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'B' && item.mainGroup === 'Resources');

              this.filteredResources_C = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'C' && item.mainGroup === 'Resources');

              this.filteredResources_Others = this.allConsolidationCash_BE.filter((item) => {
                return (item.groupTotal === 'Others' && item.mainGroup === 'Resources');
              });

              console.log(this.filteredResources_A, 'filteredResources_A');
              console.log(this.filteredResources_B, 'filteredResources_B');
              console.log(this.filteredResources_C, 'filteredResources_C');
              console.log(this.filteredResources_Others, 'filteredResources_Others');

              //Commitments

              this.filteredCommitments_A = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'A' && item.mainGroup === 'Commitments');

              this.filteredCommitments_B = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'B' && item.mainGroup === 'Commitments');

              this.filteredCommitments_C = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'C' && item.mainGroup === 'Commitments');

              this.filteredCommitments_Others = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'Others' && item.mainGroup === 'Commitments');

              console.log(this.filteredCommitments_A, 'filteredCommitments_A');
              console.log(this.filteredCommitments_B, 'filteredCommitments_B');
              console.log(this.filteredCommitments_C, 'filteredCommitments_C');
              console.log(this.filteredCommitments_Others, 'filteredCommitments_Others');

              // second api for consolidation values
            }
            if (response.responseObject) {
              this.beCashValues();
            }
          }
        );
      }

      else if (this.budgetType == 'work') {

        this.CashFlow = false;
        this.WorkFlow = true;
        this.be = true;
        this.rbe = false;
        var param: { [key: string]: string } = {};
        param['budgetType'] = 'Work Budget';

        this.apiCall.apiPostCall_Query(`api/budget/getBudgetGroupWise`, param).subscribe(
          (response) => {
            if (response) {
              this.allConsolidationCash_BE = response.responseObject;
              console.log(this.allConsolidationCash_BE, 'this.allConsolidationCash_BE');

              // Assuming `this.allConsolidationCash_BE` is assigned with the response data

              this.filteredResources_A = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'A' && item.mainGroup === 'A.Capital Outlay');

              this.filteredResources_B = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'B' && item.mainGroup === 'B.Deposit-Works');

              this.filteredResources_C = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'C' && item.mainGroup === 'C.Revenue');

              console.log(this.filteredResources_A, 'filteredResources_A');
              console.log(this.filteredResources_B, 'filteredResources_B');
              console.log(this.filteredResources_C, 'filteredResources_C');
              console.log(this.filteredResources_Others, 'filteredResources_Others');

              // second api for consolidation values

              if (response.responseObject) {
                this.beWorkValues();
              }
            }
          }
        );
      }

    }

    // Only RBE and Cash and Work
    else if (this.valueType == 'RBE') {

      if (this.budgetType == 'cash') {
        this.CashFlow = true;
        this.WorkFlow = false;
        this.be = false;
        this.rbe = true;
        var param: { [key: string]: string } = {};
        param['budgetType'] = 'Cash Budget';

        this.apiCall.apiPostCall_Query(`api/budget/getBudgetGroupWise`, param).subscribe(
          (response) => {
            if (response) {
              this.allConsolidationCash_BE = response.responseObject;

              this.filteredResources_A = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'A' && item.mainGroup === 'Resources');

              this.filteredResources_B = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'B' && item.mainGroup === 'Resources');

              this.filteredResources_C = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'C' && item.mainGroup === 'Resources');

              this.filteredResources_Others = this.allConsolidationCash_BE.filter((item) => {
                return (item.groupTotal === 'Others' && item.mainGroup === 'Resources');
              });

              console.log(this.filteredResources_A, 'filteredResources_A');
              console.log(this.filteredResources_B, 'filteredResources_B');
              console.log(this.filteredResources_C, 'filteredResources_C');
              console.log(this.filteredResources_Others, 'filteredResources_Others');

              //Commitments

              this.filteredCommitments_A = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'A' && item.mainGroup === 'Commitments');

              this.filteredCommitments_B = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'B' && item.mainGroup === 'Commitments');

              this.filteredCommitments_C = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'C' && item.mainGroup === 'Commitments');

              this.filteredCommitments_Others = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'Others' && item.mainGroup === 'Commitments');

              console.log(this.filteredCommitments_A, 'filteredCommitments_A');
              console.log(this.filteredCommitments_B, 'filteredCommitments_B');
              console.log(this.filteredCommitments_C, 'filteredCommitments_C');
              console.log(this.filteredCommitments_Others, 'filteredCommitments_Others');

              // second api for consolidation values

              if (response.responseObject) {
                this.rbeCashValues();
              }
            }
          }
        );
      }

      else if (this.budgetType == 'work') {
        this.CashFlow = false;
        this.WorkFlow = true;
        this.be = false;
        this.rbe = true;
        var param: { [key: string]: string } = {};
        param['budgetType'] = 'Work Budget';

        this.apiCall.apiPostCall_Query(`api/budget/getBudgetGroupWise`, param).subscribe(
          (response) => {
            if (response) {
              this.allConsolidationCash_BE = response.responseObject;

              // Assuming `this.allConsolidationCash_BE` is assigned with the response data

              this.filteredResources_A = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'A' && item.mainGroup === 'A.Capital Outlay');

              this.filteredResources_B = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'B' && item.mainGroup === 'B.Deposit-Works');

              this.filteredResources_C = this.allConsolidationCash_BE.filter(
                (item) => item.groupTotal === 'C' && item.mainGroup === 'C.Revenue');

              console.log(this.filteredResources_A, 'filteredResources_A');
              console.log(this.filteredResources_B, 'filteredResources_B');
              console.log(this.filteredResources_C, 'filteredResources_C');
              console.log(this.filteredResources_Others, 'filteredResources_Others');

              if (response.responseObject) {
                this.rbeWorkValues();
              }
            }
          }
        );
      }
    }
  }


  beCashValues() {
    this.consolidationResourceValues_A = [];
    this.consolidationResourceValues_B = [];
    this.consolidationResourceValues_C = [];
    this.consolidationResourceValues_Others = [];

    this.allSubGroupsResource_A = [];
    this.allSubGroupsResource_B = [];
    this.allSubGroupsResource_C = [];
    this.allSubGroupsResource_Others = [];

    this.consolidationCommitmentsValues_A = [];
    this.consolidationCommitmentsValues_B = [];
    this.consolidationCommitmentsValues_C = [];
    this.consolidationCommitmentsValues_Others = [];

    this.allSubGroupsCommitments_A = [];
    this.allSubGroupsCommitments_B = [];
    this.allSubGroupsCommitments_C = [];
    this.allSubGroupsCommitments_Others = [];

    var paramValue: { [key: string]: string } = {};
    paramValue['budgetType'] = 'Cash Budget';
    paramValue['beLastYear'] = this.budgetYear;

    if (this.division != 'Head_office') {
      paramValue['division'] = this.division;
    }
    else {
      if (this.selectedDivision != 'All') {
        paramValue['division'] = this.selectedDivision;
      }
    }

    var previousValue: { [key: string]: string } = {};
    previousValue['budgetType'] = 'Cash Budget';
    previousValue['beLastYear'] = this.getPreviousYearRange(this.budgetYear);
    if (this.division != 'Head_office') {
      previousValue['division'] = this.division;
    }
    else {
      if (this.selectedDivision != 'All') {
        previousValue['division'] = this.selectedDivision;
      }
    }

    this.apiCall.apiPostCall_Query(`api/be/getAllConsolidationView`, previousValue).subscribe(
      (previousYearResponse: any) => {

        this.apiCall.apiPostCall_Query(`api/be/getAllConsolidationView`, paramValue).subscribe(
          (viewResponse: any) => {
            console.log(previousYearResponse.responseObject);

            console.log(viewResponse, 'viewResponse');

            this.ActualsYearValue = viewResponse.responseObject[0]?.actualsYear
            this.rbeYearValue = viewResponse.responseObject[0]?.rbeYear
            this.beRbePreviousYear = previousYearResponse.responseObject[0]?.rbeYear
            this.ActualsUpToYearValue = viewResponse.responseObject[0]?.actualsUpToYear
            this.beLastYearValue = viewResponse.responseObject[0]?.beLastYear

            this.consolidationViewData = viewResponse.responseObject;
            let combindDataConsolidation = [];

            console.log(this.consolidationViewData, 'this.consolidationViewData');

            if (previousYearResponse.responseObject.length > 0 && viewResponse.responseObject.length > 0) {
              this.isPreviousBeRbe = true;
              previousYearResponse.responseObject.forEach((previous) => {
                viewResponse.responseObject.forEach((current) => {

                  if (current.budgetHead == previous.budgetHead) {

                    current.previousRbe = previous.rbe
                    current.previousRbeYear = previous.rbeYear

                    current.bedto.forEach(currentBedto => {
                      previous.bedto.forEach(previousBedto => {

                        currentBedto.previousRbeYear = previousBedto.rbeYear
                        currentBedto.previousRbe = currentBedto.rbe

                        previousBedto.subCodeBES.forEach(previousSubcode => {
                          currentBedto.subCodeBES.forEach(currentSubcode => {
                            currentSubcode.previousRbe = previousSubcode.subRbe
                          });
                        });

                      });
                    });
                    combindDataConsolidation = viewResponse.responseObject
                  }
                });
              });
            } else {
              combindDataConsolidation = viewResponse.responseObject
              this.isPreviousBeRbe = false;
            }
            console.log(combindDataConsolidation, 'combindDataConsolidation');

            this.consolidationResourceValues_A = combindDataConsolidation.filter(x => x.groupTotal === 'A' && x.mainGroup === 'Resources');
            this.consolidationResourceValues_B = combindDataConsolidation.filter(x => x.groupTotal === 'B' && x.mainGroup === 'Resources');
            this.consolidationResourceValues_C = combindDataConsolidation.filter(x => x.groupTotal === 'C' && x.mainGroup === 'Resources');

            this.consolidationCommitmentsValues_A = combindDataConsolidation.filter(x => x.groupTotal === 'A' && x.mainGroup === 'Commitments');
            this.consolidationCommitmentsValues_B = combindDataConsolidation.filter(x => x.groupTotal === 'B' && x.mainGroup === 'Commitments');
            this.consolidationCommitmentsValues_C = combindDataConsolidation.filter(x => x.groupTotal === 'C' && x.mainGroup === 'Commitments');

            console.log(this.consolidationResourceValues_A, 'this.consolidationResourceValues_A');
            console.log(this.filteredResources_A, 'this.filteredResources_A');
            console.log(this.consolidationResourceValues_B, 'this.consolidationResourceValues_B');
            console.log(this.filteredResources_B, 'this.filteredResources_B');
            console.log(this.consolidationResourceValues_C, 'this.consolidationResourceValues_C');
            console.log(this.filteredResources_C, 'this.filteredResources_C');

            console.log(this.consolidationCommitmentsValues_A, 'this.consolidationCommitmentsValues_A');
            console.log(this.filteredCommitments_A, 'this.filteredCommitments_A');
            console.log(this.consolidationCommitmentsValues_B, 'this.consolidationCommitmentsValues_B');
            console.log(this.filteredCommitments_B, 'this.filteredCommitments_B');
            console.log(this.consolidationCommitmentsValues_C, 'this.consolidationCommitmentsValues_C');
            console.log(this.filteredCommitments_C, 'this.filteredCommitments_C');


            // All resources filtering setting the Values
            // Resource A Patch Request
            this.filteredResources_A.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                status: null,
                subCodeBES: null,
                bedto: null
              }));

              this.allSubGroupsResource_A.push({
                heading: item.group,
                subGroup: subGroups,
                status: null,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                bedto: null
              });

              this.allResourceSubGroup_A.push(...subGroups);
              console.log(this.allResourceSubGroup_A, 'this.allResourceSubGroup_A');
              console.log(this.allSubGroupsResource_A, 'this.allSubGroupsResource_A');

            });

            // Resource B Patch Request

            this.filteredResources_B.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                status: null,
                bedto: null
              }));

              this.allSubGroupsResource_B.push({
                heading: item.group,
                subGroup: subGroups,
                status: null,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                bedto: null
              });

              this.allResourceSubGroup_B.push(...subGroups);
              console.log(this.allResourceSubGroup_B, 'this.allResourceSubGroup_B');
              console.log(this.allSubGroupsResource_B, 'this.allSubGroupsResource_B');

            });

            // Resource C Patch Request

            this.filteredResources_C.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                status: null,
                bedto: null


              }));

              this.allSubGroupsResource_C.push({
                heading: item.group,
                subGroup: subGroups,
                status: null,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                bedto: null

              });

              this.allResourceSubGroup_C.push(...subGroups);
              console.log(this.allResourceSubGroup_C, 'this.allResourceSubGroup_C');
              console.log(this.allSubGroupsResource_C, 'this.allSubGroupsResource_C');

            });

            // Resource A Patch Request values

            this.consolidationResourceValues_A.forEach((element) => {
              let matchingBothApiValues_A = this.allSubGroupsResource_A.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));
              console.log(matchingBothApiValues_A, 'matchingBothApiValues_A');

              // Resource A Patch Request values

              this.allSubGroupsResource_A.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.be = element.be;
                    subGroupItem.actuals = element.actuals;
                    subGroupItem.actualsUpTo = element.actualsUpTo;
                    subGroupItem.rbe = element.rbe;
                    subGroupItem.previousRbe = element.previousRbe;
                    subGroupItem.beLastYearProposed = element.beLastYearProposed;
                    subGroupItem.beLastYearFixed = element.beLastYearFixed;
                    subGroupItem.subCodeBES = element.subCodeBES;
                    subGroupItem.status = element.code.status;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_A) {
                matchingBothApiValues_A.be = element.be;
                matchingBothApiValues_A.actuals = element.actuals;
                matchingBothApiValues_A.actualsUpTo = element.actualsUpTo;
                matchingBothApiValues_A.rbe = element.rbe;
                matchingBothApiValues_A.previousRbe = element.previousRbe;
                matchingBothApiValues_A.beLastYearProposed = element.beLastYearProposed;
                matchingBothApiValues_A.beLastYearFixed = element.beLastYearFixed;
                matchingBothApiValues_A.status = element.code.status;
                matchingBothApiValues_A.subCodeBES = element.subCodeBES;
                matchingBothApiValues_A.bedto = element.bedto;
              }
              console.log(matchingBothApiValues_A, 'matchingBothApiValues_A');
              console.log(this.allSubGroupsResource_A, 'this.allSubGroupsResource_A');

            });

            // Resource B Patch Request values

            this.consolidationResourceValues_B.forEach((element) => {
              let matchingBothApiValues_B = this.allSubGroupsResource_B.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsResource_B.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.be = element.be;
                    subGroupItem.actuals = element.actuals;
                    subGroupItem.actualsUpTo = element.actualsUpTo;
                    subGroupItem.rbe = element.rbe;
                    subGroupItem.previousRbe = element.previousRbe;
                    subGroupItem.beLastYearProposed = element.beLastYearProposed;
                    subGroupItem.beLastYearFixed = element.beLastYearFixed;
                    subGroupItem.subCodeBES = element.subCodeBES;
                    subGroupItem.status = element.code.status;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_B) {
                matchingBothApiValues_B.be = element.be;
                matchingBothApiValues_B.actuals = element.actuals;
                matchingBothApiValues_B.actualsUpTo = element.actualsUpTo;
                matchingBothApiValues_B.rbe = element.rbe;
                matchingBothApiValues_B.beLastYearProposed = element.beLastYearProposed;
                matchingBothApiValues_B.beLastYearFixed = element.beLastYearFixed;
                matchingBothApiValues_B.status = element.code.status;
                matchingBothApiValues_B.subCodeBES = element.subCodeBES;
                matchingBothApiValues_B.bedto = element.bedto;

              }
            });

            // Resource C Patch Request values

            this.consolidationResourceValues_C.forEach((element) => {
              let matchingBothApiValues_C = this.allSubGroupsResource_C.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsResource_C.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.be = element.be;
                    subGroupItem.actuals = element.actuals;
                    subGroupItem.actualsUpTo = element.actualsUpTo;
                    subGroupItem.rbe = element.rbe;
                    subGroupItem.previousRbe = element.previousRbe;
                    subGroupItem.beLastYearProposed = element.beLastYearProposed;
                    subGroupItem.beLastYearFixed = element.beLastYearFixed;
                    subGroupItem.subCodeBES = element.subCodeBES;
                    subGroupItem.status = element.code.status;
                    subGroupItem.bedto = element.bedto;

                  }
                });
              });

              if (matchingBothApiValues_C) {
                matchingBothApiValues_C.be = element.be;
                matchingBothApiValues_C.actuals = element.actuals;
                matchingBothApiValues_C.actualsUpTo = element.actualsUpTo;
                matchingBothApiValues_C.rbe = element.rbe;
                matchingBothApiValues_C.previousRbe = element.previousRbe;
                matchingBothApiValues_C.beLastYearProposed = element.beLastYearProposed;
                matchingBothApiValues_C.beLastYearFixed = element.beLastYearFixed;
                matchingBothApiValues_C.status = element.code.status;
                matchingBothApiValues_C.subCodeBES = element.subCodeBES;
                matchingBothApiValues_C.bedto = element.bedto;
              }

              console.log(this.allSubGroupsResource_C, 'this.allSubGroupsResource_C');

            });

            // Commitments

            // Commitments setting Variables A,B,C and Others

            this.filteredCommitments_A.forEach(item => {

              let subGroups = (item.subGroup || []).map(sub => ({
                heading: sub,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                status: null,
                bedto: null

              }));

              this.allSubGroupsCommitments_A.push({
                heading: item.group,
                subGroup: subGroups,
                status: null,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                bedto: null

              });

              this.allCommitmentsSubGroup_A.push(...subGroups);
              console.log(this.allCommitmentsSubGroup_A, 'this.allCommitmentsSubGroup_A');
              console.log(this.allSubGroupsCommitments_A, 'this.allSubGroupsCommitments_A');

            });

            this.filteredCommitments_B.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                status: null,
                bedto: null

              }));

              this.allSubGroupsCommitments_B.push({
                heading: item.group,
                subGroup: subGroups,
                status: null,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                bedto: null

              });

              this.allCommitmentsSubGroup_B.push(...subGroups);
              console.log(this.allCommitmentsSubGroup_B, 'this.allCommitmentsSubGroup_B');
              console.log(this.allSubGroupsCommitments_B, 'this.allSubGroupsCommitments_B');

            });

            this.filteredCommitments_C.forEach(item => {

              if (item.group != 'Works expenditure & Maintenance') {
                let subGroups = item.subGroup.map(sub => ({
                  heading: sub,
                  be: null,
                  actuals: null,
                  actualsUpTo: null,
                  rbe: null,
                  previousRbe: null,
                  beLastYearProposed: null,
                  beLastYearFixed: null,
                  subCodeBES: null,
                  status: null,
                  bedto: null

                }));

                this.allSubGroupsCommitments_C.push({
                  heading: item.group,
                  subGroup: subGroups,
                  status: null,
                  be: null,
                  actuals: null,
                  actualsUpTo: null,
                  rbe: null,
                  previousRbe: null,
                  beLastYearProposed: null,
                  beLastYearFixed: null,
                  subCodeBES: null,
                  bedto: null

                });
                this.allCommitmentsSubGroup_C.push(...subGroups);
              }

              console.log(this.allCommitmentsSubGroup_C, 'this.allCommitmentsSubGroup_C');
              console.log(this.allSubGroupsCommitments_C, 'this.allSubGroupsCommitments_C');

            });

            this.filteredCommitments_Others.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                status: null,
                bedto: null

              }));

              this.allSubGroupsCommitments_Others.push({
                heading: item.group,
                subGroup: subGroups,
                status: null,
                be: null,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                bedto: null

              });

              this.allCommitmentsSubGroup_Others.push(...subGroups);
              console.log(this.allCommitmentsSubGroup_Others, 'this.allCommitmentsSubGroup_B');
              console.log(this.allSubGroupsCommitments_Others, 'this.allSubGroupsCommitments_B');

            });

            // Commitments assigning values for Variables A,B,C and Others

            this.consolidationCommitmentsValues_A?.forEach((element) => {
              let matchingBothApiValues_A = this.allSubGroupsCommitments_A.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsCommitments_A.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if ((subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) && group.subGroup.length !== 0) {
                    subGroupItem.be = element.be;
                    subGroupItem.actuals = element.actuals;
                    subGroupItem.actualsUpTo = element.actualsUpTo;
                    subGroupItem.rbe = element.rbe;
                    subGroupItem.previousRbe = element.previousRbe;
                    subGroupItem.beLastYearProposed = element.beLastYearProposed;
                    subGroupItem.beLastYearFixed = element.beLastYearFixed;
                    subGroupItem.subCodeBES = element.subCodeBES;
                    subGroupItem.status = element.code.status;
                    subGroupItem.bedto = element.bedto;

                  }
                });
              });

              if (matchingBothApiValues_A) {
                matchingBothApiValues_A.be = element.be;
                matchingBothApiValues_A.actuals = element.actuals;
                matchingBothApiValues_A.actualsUpTo = element.actualsUpTo;
                matchingBothApiValues_A.rbe = element.rbe;
                matchingBothApiValues_A.previousRbe = element.previousRbe;
                matchingBothApiValues_A.beLastYearProposed = element.beLastYearProposed;
                matchingBothApiValues_A.beLastYearFixed = element.beLastYearFixed;
                matchingBothApiValues_A.status = element.code.status;
                matchingBothApiValues_A.subCodeBES = element.subCodeBES;
                matchingBothApiValues_A.bedto = element.bedto;
              }
            });

            this.consolidationCommitmentsValues_B?.forEach((element) => {
              let matchingBothApiValues_B = this.allSubGroupsCommitments_B.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsCommitments_B.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.be = element.be;
                    subGroupItem.actuals = element.actuals;
                    subGroupItem.actualsUpTo = element.actualsUpTo;
                    subGroupItem.rbe = element.rbe;
                    subGroupItem.previousRbe = element.previousRbe;
                    subGroupItem.beLastYearProposed = element.beLastYearProposed;
                    subGroupItem.beLastYearFixed = element.beLastYearFixed;
                    subGroupItem.subCodeBES = element.subCodeBES;
                    subGroupItem.status = element.code.status;
                    subGroupItem.bedto = element.bedto;

                  }
                });
              });

              if (matchingBothApiValues_B) {
                matchingBothApiValues_B.be = element.be;
                matchingBothApiValues_B.actuals = element.actuals;
                matchingBothApiValues_B.actualsUpTo = element.actualsUpTo;
                matchingBothApiValues_B.rbe = element.rbe;
                matchingBothApiValues_B.previousRbe = element.previousRbe;
                matchingBothApiValues_B.beLastYearProposed = element.beLastYearProposed;
                matchingBothApiValues_B.beLastYearFixed = element.beLastYearFixed;
                matchingBothApiValues_B.status = element.code.status;
                matchingBothApiValues_B.subCodeBES = element.subCodeBES;
                matchingBothApiValues_B.bedto = element.bedto;
              }
            });

            this.consolidationCommitmentsValues_C?.forEach((element) => {

              let matchingBothApiValues_C = this.allSubGroupsCommitments_C.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsCommitments_C.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.be = element.be;
                    subGroupItem.actuals = element.actuals;
                    subGroupItem.actualsUpTo = element.actualsUpTo;
                    subGroupItem.rbe = element.rbe;
                    subGroupItem.previousRbe = element.previousRbe;
                    subGroupItem.beLastYearProposed = element.beLastYearProposed;
                    subGroupItem.beLastYearFixed = element.beLastYearFixed;
                    subGroupItem.subCodeBES = element.subCodeBES;
                    subGroupItem.status = element.code.status;
                    subGroupItem.bedto = element.bedto;

                  }
                });
              });

              if (matchingBothApiValues_C) {
                matchingBothApiValues_C.be = element.be;
                matchingBothApiValues_C.actuals = element.actuals;
                matchingBothApiValues_C.actualsUpTo = element.actualsUpTo;
                matchingBothApiValues_C.rbe = element.rbe;
                matchingBothApiValues_C.previousRbe = element.previousRbe;
                matchingBothApiValues_C.beLastYearProposed = element.beLastYearProposed;
                matchingBothApiValues_C.beLastYearFixed = element.beLastYearFixed;
                matchingBothApiValues_C.status = element.code.status;
                matchingBothApiValues_C.subCodeBES = element.subCodeBES;
                matchingBothApiValues_C.bedto = element.bedto;
              }
            });

            this.consolidationCommitmentsValues_Others?.forEach((element) => {
              let matchingBothApiValues_Others = this.allSubGroupsCommitments_Others.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsCommitments_Others.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.be = element.be;
                    subGroupItem.actuals = element.actuals;
                    subGroupItem.actualsUpTo = element.actualsUpTo;
                    subGroupItem.rbe = element.rbe;
                    subGroupItem.previousRbe = element.previousRbe;
                    subGroupItem.beLastYearProposed = element.beLastYearProposed;
                    subGroupItem.beLastYearFixed = element.beLastYearFixed;
                    subGroupItem.subCodeBES = element.subCodeBES;
                    subGroupItem.status = element.code.status;
                    subGroupItem.bedto = element.bedto;

                  }
                });
              });

              if (matchingBothApiValues_Others) {
                matchingBothApiValues_Others.be = element.be;
                matchingBothApiValues_Others.actuals = element.actuals;
                matchingBothApiValues_Others.actualsUpTo = element.actualsUpTo;
                matchingBothApiValues_Others.rbe = element.rbe;
                matchingBothApiValues_Others.previousRbe = element.previousRbe;
                matchingBothApiValues_Others.beLastYearProposed = element.beLastYearProposed;
                matchingBothApiValues_Others.beLastYearFixed = element.beLastYearFixed;
                matchingBothApiValues_Others.status = element.code.status;
                matchingBothApiValues_Others.subCodeBES = element.subCodeBES;
                matchingBothApiValues_Others.bedto = element.bedto;
              }
            });

            console.log(this.allSubGroupsCommitments_A, 'allSubGroupsCommitments_A');
            console.log(this.allSubGroupsCommitments_B, 'allSubGroupsCommitments_B');
            console.log(this.allSubGroupsCommitments_C, 'allSubGroupsCommitments_C');
            console.log(this.allSubGroupsCommitments_Others, 'allSubGroupsCommitments_Others');
            console.log(this.allSubGroupsResource_A, 'allSubGroupsResource_A');
            this.cashBeCalculation();
            this.lengthOfWorkapi();
          });
      });

  }

  beWorkValues() {

    this.consolidationResourceValues_A = [];
    this.consolidationResourceValues_B = [];
    this.consolidationResourceValues_C = [];
    this.consolidationResourceValues_Others = [];

    this.allSubGroupsResource_A = [];
    this.allSubGroupsResource_B = [];
    this.allSubGroupsResource_C = [];
    this.allSubGroupsResource_Others = [];

    var paramValue: { [key: string]: string } = {};
    paramValue['budgetType'] = 'Work Budget';
    paramValue['beLastYear'] = this.budgetYear;

    if (this.division != 'Head_office') {
      paramValue['division'] = this.division;
    }
    else {
      if (this.selectedDivision != 'All') {
        paramValue['division'] = this.selectedDivision;
      }
    }

    var previousValue: { [key: string]: string } = {};
    previousValue['budgetType'] = 'Work Budget';
    previousValue['beLastYear'] = this.getPreviousYearRange(this.budgetYear);
    if (this.division != 'Head_office') {
      previousValue['division'] = this.division;
    }
    else {
      if (this.selectedDivision != 'All') {
        previousValue['division'] = this.selectedDivision;
      }
    }

    this.apiCall.apiPostCall_Query(`api/be/getAllConsolidationView`, paramValue).subscribe(
      (viewResponse: any) => {

        this.apiCall.apiPostCall_Query(`api/be/getAllConsolidationView`, previousValue).subscribe(
          (previousYearResponse: any) => {

            this.ActualsYearValue = viewResponse.responseObject[0]?.actualsYear
            this.rbeYearValue = viewResponse.responseObject[0]?.rbeYear
            this.beRbePreviousYear = previousYearResponse.responseObject[0]?.rbeYear
            this.ActualsUpToYearValue = viewResponse.responseObject[0]?.actualsUpToYear
            this.beLastYearValue = viewResponse.responseObject[0]?.beLastYear

            this.consolidationViewData = viewResponse.responseObject;

            console.log(this.consolidationViewData, 'this.consolidationViewData');
            let combindDataConsolidation = [];

            if (previousYearResponse.responseObject.length > 0 && viewResponse.responseObject.length > 0) {
              this.isPreviousBeRbe = true;
              previousYearResponse.responseObject.forEach((previous) => {
                viewResponse.responseObject.forEach((current) => {

                  if (current.budgetHead == previous.budgetHead) {

                    current.previousRbe = previous.rbe
                    current.previousRbeYear = previous.rbeYear

                    current.bedto.forEach(currentBedto => {
                      previous.bedto.forEach(previousBedto => {

                        currentBedto.previousRbeYear = previousBedto.rbeYear
                        currentBedto.previousRbe = currentBedto.rbe

                        previousBedto.subCodeBES.forEach(previousSubcode => {
                          currentBedto.subCodeBES.forEach(currentSubcode => {
                            currentSubcode.previousRbe = previousSubcode.subRbe
                          });
                        });

                      });
                    });

                    combindDataConsolidation = viewResponse.responseObject
                  }
                });
              });
            } else {
              combindDataConsolidation = viewResponse.responseObject
              this.isPreviousBeRbe = false;
            }

            console.log(combindDataConsolidation, 'combindDataConsolidation');



            this.consolidationResourceValues_A = combindDataConsolidation.filter(x => x.groupTotal === 'A' && x.mainGroup === 'A.Capital Outlay');
            this.consolidationResourceValues_B = combindDataConsolidation.filter(x => x.groupTotal === 'B' && x.mainGroup === 'B.Deposit-Works');
            this.consolidationResourceValues_C = combindDataConsolidation.filter(x => x.groupTotal === 'C' && x.mainGroup === 'C.Revenue');

            console.log(this.consolidationResourceValues_A, 'consolidationResourceValues_A');
            console.log(this.filteredResources_A, 'filteredResources_A');

            console.log(this.consolidationResourceValues_B, 'consolidationResourceValues_B');
            console.log(this.filteredResources_B, 'filteredResources_B');

            console.log(this.consolidationResourceValues_C, 'consolidationResourceValues_C');
            console.log(this.filteredResources_C, 'filteredResources_C');

            // All resources filtering setting the Values
            // Resource A Patch Request
            this.filteredResources_A.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                be: null,
                actuals: null,
                actualsUpTo: null,
                previousRbe: null,
                rbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                status: null,
                bedto: null
              }));

              this.allSubGroupsResource_A.push({
                heading: item.group,
                subGroup: subGroups,
                status: null,
                be: null,
                actuals: null,
                actualsUpTo: null,
                previousRbe: null,
                rbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                bedto: null

              });

              this.allResourceSubGroup_A.push(...subGroups);
              console.log(this.allResourceSubGroup_A, 'this.allResourceSubGroup_A');
              console.log(this.allSubGroupsResource_A, 'this.allSubGroupsResource_A');

            });

            // Resource B Patch Request

            this.filteredResources_B.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                be: null,
                actuals: null,
                actualsUpTo: null,
                previousRbe: null,
                rbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                status: null,
                bedto: null
              }));

              this.allSubGroupsResource_B.push({
                heading: item.group,
                subGroup: subGroups,
                status: null,
                be: null,
                actuals: null,
                actualsUpTo: null,
                previousRbe: null,
                rbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                bedto: null

              });

              this.allResourceSubGroup_B.push(...subGroups);
              console.log(this.allResourceSubGroup_B, 'this.allResourceSubGroup_B');

            });

            // Resource C Patch Request

            this.filteredResources_C.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                be: null,
                actuals: null,
                actualsUpTo: null,
                previousRbe: null,
                rbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                status: null,
                bedto: null

              }));

              this.allSubGroupsResource_C.push({
                heading: item.group,
                subGroup: subGroups,
                status: null,
                be: null,
                actuals: null,
                actualsUpTo: null,
                previousRbe: null,
                rbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                subCodeBES: null,
                bedto: null

              });

              this.allResourceSubGroup_C.push(...subGroups);
              console.log(this.allResourceSubGroup_C, 'this.allResourceSubGroup_C');

            });

            // Resource A Patch Request values

            this.consolidationResourceValues_A.forEach((element) => {
              let matchingBothApiValues_A = this.allSubGroupsResource_A.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              // Resource A Patch Request values

              console.log(matchingBothApiValues_A, 'matchingBothApiValues_A');

              this.allSubGroupsResource_A.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.be = element.be;
                    subGroupItem.actuals = element.actuals;
                    subGroupItem.actualsUpTo = element.actualsUpTo;
                    subGroupItem.previousRbe = element.previousRbe;
                    subGroupItem.rbe = element.rbe;
                    subGroupItem.beLastYearProposed = element.beLastYearProposed;
                    subGroupItem.beLastYearFixed = element.beLastYearFixed;
                    subGroupItem.subCodeBES = element.subCodeBES;
                    subGroupItem.status = element.code.status;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_A) {
                matchingBothApiValues_A.be = element.be;
                matchingBothApiValues_A.actuals = element.actuals;
                matchingBothApiValues_A.actualsUpTo = element.actualsUpTo;
                matchingBothApiValues_A.previousRbe = element.previousRbe;
                matchingBothApiValues_A.rbe = element.rbe;
                matchingBothApiValues_A.beLastYearProposed = element.beLastYearProposed;
                matchingBothApiValues_A.beLastYearFixed = element.beLastYearFixed;
                matchingBothApiValues_A.status = element.code.status;
                matchingBothApiValues_A.subCodeBES = element.subCodeBES;
                matchingBothApiValues_A.bedto = element.bedto;
              }
            });

            // Resource B Patch Request values

            this.consolidationResourceValues_B.forEach((element) => {
              let matchingBothApiValues_B = this.allSubGroupsResource_B.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsResource_B.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.be = element.be;
                    subGroupItem.actuals = element.actuals;
                    subGroupItem.actualsUpTo = element.actualsUpTo;
                    subGroupItem.previousRbe = element.previousRbe;
                    subGroupItem.rbe = element.rbe;
                    subGroupItem.beLastYearProposed = element.beLastYearProposed;
                    subGroupItem.beLastYearFixed = element.beLastYearFixed;
                    subGroupItem.subCodeBES = element.subCodeBES;
                    subGroupItem.status = element.code.status;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_B) {
                matchingBothApiValues_B.be = element.be;
                matchingBothApiValues_B.actuals = element.actuals;
                matchingBothApiValues_B.actualsUpTo = element.actualsUpTo;
                matchingBothApiValues_B.previousRbe = element.previousRbe;
                matchingBothApiValues_B.rbe = element.rbe;
                matchingBothApiValues_B.beLastYearProposed = element.beLastYearProposed;
                matchingBothApiValues_B.beLastYearFixed = element.beLastYearFixed;
                matchingBothApiValues_B.status = element.code.status;
                matchingBothApiValues_B.subCodeBES = element.subCodeBES;
                matchingBothApiValues_B.bedto = element.bedto;
              }
            });

            // Resource C Patch Request values

            this.consolidationResourceValues_C.forEach((element) => {
              let matchingBothApiValues_C = this.allSubGroupsResource_C.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsResource_C.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.be = element.be;
                    subGroupItem.actuals = element.actuals;
                    subGroupItem.actualsUpTo = element.actualsUpTo;
                    subGroupItem.previousRbe = element.previousRbe;
                    subGroupItem.rbe = element.rbe;
                    subGroupItem.beLastYearProposed = element.beLastYearProposed;
                    subGroupItem.beLastYearFixed = element.beLastYearFixed;
                    subGroupItem.subCodeBES = element.subCodeBES;
                    subGroupItem.status = element.code.status;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_C) {
                matchingBothApiValues_C.be = element.be;
                matchingBothApiValues_C.actuals = element.actuals;
                matchingBothApiValues_C.actualsUpTo = element.actualsUpTo;
                matchingBothApiValues_C.previousRbe = element.previousRbe;
                matchingBothApiValues_C.rbe = element.rbe;
                matchingBothApiValues_C.beLastYearProposed = element.beLastYearProposed;
                matchingBothApiValues_C.beLastYearFixed = element.beLastYearFixed;
                matchingBothApiValues_C.status = element.code.status;
                matchingBothApiValues_C.subCodeBES = element.subCodeBES;
                matchingBothApiValues_C.bedto = element.bedto;
              }
            });

            this.workBeCalculation();
            console.log(this.allSubGroupsResource_A, 'allSubGroupsResource_A');
            console.log(this.allSubGroupsResource_B, 'allSubGroupsResource_B');
            console.log(this.allSubGroupsResource_C, 'allSubGroupsResource_C');
          }
        );
      }
    );
  }

  rbeCashValues() {

    this.consolidationResourceValues_A = [];
    this.consolidationResourceValues_B = [];
    this.consolidationResourceValues_C = [];
    this.consolidationResourceValues_Others = [];

    this.allSubGroupsResource_A = [];
    this.allSubGroupsResource_B = [];
    this.allSubGroupsResource_C = [];
    this.allSubGroupsResource_Others = [];

    this.consolidationCommitmentsValues_A = [];
    this.consolidationCommitmentsValues_B = [];
    this.consolidationCommitmentsValues_C = [];
    this.consolidationCommitmentsValues_Others = [];

    this.allSubGroupsCommitments_A = [];
    this.allSubGroupsCommitments_B = [];
    this.allSubGroupsCommitments_C = [];
    this.allSubGroupsCommitments_Others = [];

    var paramValue: { [key: string]: string } = {};
    paramValue['budgetType'] = 'Cash Budget';
    paramValue['rbeYear'] = this.budgetYear;

    if (this.division != 'Head_office') {
      paramValue['division'] = this.division;
    }
    else {
      if (this.selectedDivision != 'All') {
        paramValue['division'] = this.selectedDivision;
      }
    }

    var previousValue: { [key: string]: string } = {};
    previousValue['budgetType'] = 'Cash Budget';
    previousValue['rbeYear'] = this.getPreviousYearRange(this.budgetYear);

    if (this.division != 'Head_office') {
      previousValue['division'] = this.division;
    }
    else {
      if (this.selectedDivision != 'All') {
        previousValue['division'] = this.selectedDivision;
      }
    }

    this.apiCall.apiPostCall_Query(`api/rbe/getAllConsolidationView`, paramValue).subscribe(

      (viewResponse: any) => {
        this.apiCall.apiPostCall_Query(`api/rbe/getAllConsolidationView`, previousValue).subscribe(

          (previousResponse: any) => {

            console.log(viewResponse, 'viewResponse');

            this.ActualsYearRbeValue = viewResponse.responseObject[0]?.actualsYearRbe;
            this.rbePreviousYearRbeValue = previousResponse.responseObject[0]?.rbeYear;
            this.rbeYearRbeValue = viewResponse.responseObject[0]?.rbeYear;
            this.ActualsUpToYearRbeValue = viewResponse.responseObject[0]?.actualsUpToYearRbe;
            this.beLastYearRbeValue = viewResponse.responseObject[0]?.beYearRbe;

            this.consolidationViewData = viewResponse.responseObject;

            console.log(this.consolidationViewData, 'this.consolidationViewData');

            let combindDataConsolidation = [];

            if (viewResponse.responseObject.length > 0 && previousResponse.responseObject.length > 0) {
              this.isPreviousBeRbe = true;
              previousResponse.responseObject.forEach((previousYear) => {
                viewResponse.responseObject.forEach((currentYear) => {
                  if (currentYear.budgetHead == previousYear.budgetHead) {
                    currentYear.previousBeRbe = previousYear.beRbe
                    currentYear.previousBeYearRbe = previousYear.beYearRbe

                    currentYear.bedto.forEach(currentBedto => {
                      previousYear.bedto.forEach(previousBedto => {

                        currentBedto.previousRbeYear = previousBedto.rbeYear
                        currentBedto.previousBeRbe = previousBedto.beRbe

                        previousBedto.subCodeRBES.forEach(previousSubcode => {
                          currentBedto.subCodeRBES.forEach(currentSubcode => {
                            currentSubcode.previousRbe = previousSubcode.subBeRbe
                          });
                        });

                      });
                    });
                  }
                  combindDataConsolidation = viewResponse.responseObject

                });
              });
            }
            else {
              this.isPreviousBeRbe = false;
              combindDataConsolidation = viewResponse.responseObject
            }

            console.log(combindDataConsolidation, 'combindDataConsolidation');

            this.consolidationResourceValues_A = combindDataConsolidation.filter(x => x.groupTotal === 'A' && x.mainGroup === 'Resources');
            this.consolidationResourceValues_B = combindDataConsolidation.filter(x => x.groupTotal === 'B' && x.mainGroup === 'Resources');
            this.consolidationResourceValues_C = combindDataConsolidation.filter(x => x.groupTotal === 'C' && x.mainGroup === 'Resources');

            this.consolidationCommitmentsValues_A = combindDataConsolidation.filter(x => x.groupTotal === 'A' && x.mainGroup === 'Commitments');
            this.consolidationCommitmentsValues_B = combindDataConsolidation.filter(x => x.groupTotal === 'B' && x.mainGroup === 'Commitments');
            this.consolidationCommitmentsValues_C = combindDataConsolidation.filter(x => x.groupTotal === 'C' && x.mainGroup === 'Commitments');

            console.log(this.consolidationResourceValues_A, 'this.consolidationResourceValues_A');
            console.log(this.consolidationResourceValues_B, 'this.consolidationResourceValues_B');
            console.log(this.consolidationResourceValues_C, 'this.consolidationResourceValues_C');

            console.log(this.consolidationCommitmentsValues_A, 'this.consolidationCommitmentsValues_A');
            console.log(this.consolidationCommitmentsValues_B, 'this.consolidationCommitmentsValues_B');
            console.log(this.consolidationCommitmentsValues_C, 'this.consolidationCommitmentsValues_C');


            // All resources filtering setting the Values
            // Resource A Patch Request
            this.filteredResources_A.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,
              }));

              this.allSubGroupsResource_A.push({
                heading: item.group,
                subGroup: subGroups,
                status: null,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                subCodeRBES: null,
                bedto: null,
              });

              this.allResourceSubGroup_A.push(...subGroups);
              console.log(this.allResourceSubGroup_A, 'this.allResourceSubGroup_A');

            });

            // Resource B Patch Request

            this.filteredResources_B.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,

              }));

              this.allSubGroupsResource_B.push({
                heading: item.group,
                subGroup: subGroups,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,

              });

              this.allResourceSubGroup_B.push(...subGroups);
              console.log(this.allResourceSubGroup_B, 'this.allResourceSubGroup_B');

            });

            // Resource C Patch Request

            this.filteredResources_C.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,

              }));

              this.allSubGroupsResource_C.push({
                heading: item.group,
                subGroup: subGroups,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,

              });

              this.allResourceSubGroup_C.push(...subGroups);

            });

            console.log(this.allSubGroupsResource_A, 'this.allSubGroupsResource_A');
            console.log(this.allSubGroupsResource_B, 'this.allSubGroupsResource_B');
            console.log(this.allSubGroupsResource_C, 'this.allSubGroupsResource_C');


            // Resource A Patch Request values

            this.consolidationResourceValues_A.forEach((element) => {
              let matchingBothApiValues_A = this.allSubGroupsResource_A.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              // Resource A Patch Request values

              this.allSubGroupsResource_A.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.actualsRbe = element.actualsRbe;
                    subGroupItem.previousBeRbe = element.previousBeRbe;
                    subGroupItem.beRbe = element.beRbe;
                    subGroupItem.actualsUpToRbe = element.actualsUpToRbe;
                    subGroupItem.lastRbeProposed = element.lastRbeProposed;
                    subGroupItem.lastRbeFixed = element.lastRbeFixed;
                    subGroupItem.status = element.status;
                    subGroupItem.subCodeRBES = element.subCodeRBES;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_A) {
                matchingBothApiValues_A.actualsRbe = element.actualsRbe;
                matchingBothApiValues_A.previousBeRbe = element.previousBeRbe;
                matchingBothApiValues_A.beRbe = element.beRbe;
                matchingBothApiValues_A.actualsUpToRbe = element.actualsUpToRbe;
                matchingBothApiValues_A.lastRbeProposed = element.lastRbeProposed;
                matchingBothApiValues_A.lastRbeFixed = element.lastRbeFixed;
                matchingBothApiValues_A.status = element.code.status;
                matchingBothApiValues_A.subCodeRBES = element.code.subCodeRBES;
                matchingBothApiValues_A.bedto = element.bedto;

              }
            });

            // Resource B Patch Request values

            this.consolidationResourceValues_B.forEach((element) => {
              let matchingBothApiValues_B = this.allSubGroupsResource_B.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsResource_B.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.actualsRbe = element.actualsRbe;
                    subGroupItem.beRbe = element.beRbe;
                    subGroupItem.previousBeRbe = element.previousBeRbe;
                    subGroupItem.actualsUpToRbe = element.actualsUpToRbe;
                    subGroupItem.lastRbeProposed = element.lastRbeProposed;
                    subGroupItem.lastRbeFixed = element.lastRbeFixed;
                    subGroupItem.status = element.status;
                    subGroupItem.subCodeRBES = element.subCodeRBES;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_B) {
                matchingBothApiValues_B.actualsRbe = element.actualsRbe;
                matchingBothApiValues_B.previousBeRbe = element.previousBeRbe;
                matchingBothApiValues_B.beRbe = element.beRbe;
                matchingBothApiValues_B.actualsUpToRbe = element.actualsUpToRbe;
                matchingBothApiValues_B.lastRbeProposed = element.lastRbeProposed;
                matchingBothApiValues_B.lastRbeFixed = element.lastRbeFixed;
                matchingBothApiValues_B.status = element.code.status;
                matchingBothApiValues_B.subCodeRBES = element.code.subCodeRBES;
                matchingBothApiValues_B.bedto = element.bedto;

              }
            });

            // Resource C Patch Request values

            this.consolidationResourceValues_C.forEach((element) => {
              let matchingBothApiValues_C = this.allSubGroupsResource_C.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsResource_C.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.actualsRbe = element.actualsRbe;
                    subGroupItem.previousBeRbe = element.previousBeRbe;
                    subGroupItem.beRbe = element.beRbe;
                    subGroupItem.actualsUpToRbe = element.actualsUpToRbe;
                    subGroupItem.lastRbeProposed = element.lastRbeProposed;
                    subGroupItem.lastRbeFixed = element.lastRbeFixed;
                    subGroupItem.status = element.status;
                    subGroupItem.subCodeRBES = element.subCodeRBES;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_C) {
                matchingBothApiValues_C.actualsRbe = element.actualsRbe;
                matchingBothApiValues_C.previousBeRbe = element.previousBeRbe;
                matchingBothApiValues_C.beRbe = element.beRbe;
                matchingBothApiValues_C.actualsUpToRbe = element.actualsUpToRbe;
                matchingBothApiValues_C.lastRbeProposed = element.lastRbeProposed;
                matchingBothApiValues_C.lastRbeFixed = element.lastRbeFixed;
                matchingBothApiValues_C.status = element.code.status;
                matchingBothApiValues_C.subCodeRBES = element.code.subCodeRBES;
                matchingBothApiValues_C.bedto = element.bedto;

              }
            });

            // Commitments

            // Commitments setting Variables A,B,C and Others

            this.filteredCommitments_A.forEach(item => {

              let subGroups = (item.subGroup || []).map(sub => ({
                heading: sub,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,
              }));

              this.allSubGroupsCommitments_A.push({
                heading: item.group,
                subGroup: subGroups,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,

              });

              this.allCommitmentsSubGroup_A.push(...subGroups);
              console.log(this.allCommitmentsSubGroup_A, 'this.allCommitmentsSubGroup_A');
              console.log(this.allSubGroupsCommitments_A, 'this.allSubGroupsCommitments_A');

            });

            this.filteredCommitments_B.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,

              }));

              this.allSubGroupsCommitments_B.push({
                heading: item.group,
                subGroup: subGroups,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,

              });

              this.allCommitmentsSubGroup_B.push(...subGroups);
              console.log(this.allCommitmentsSubGroup_B, 'this.allCommitmentsSubGroup_B');
              console.log(this.allSubGroupsCommitments_B, 'this.allSubGroupsCommitments_B');

            });

            this.filteredCommitments_C.forEach(item => {
              if (item.group != 'Works expenditure & Maintenance') {
                let subGroups = item.subGroup.map(sub => ({
                  heading: sub,
                  actualsRbe: null,
                  beRbe: null,
                  previousBeRbe: null,
                  actualsUpToRbe: null,
                  lastRbeProposed: null,
                  lastRbeFixed: null,
                  status: null,
                  subCodeRBES: null,
                  bedto: null,

                }));

                this.allSubGroupsCommitments_C.push({
                  heading: item.group,
                  subGroup: subGroups,
                  actualsRbe: null,
                  beRbe: null,
                  previousBeRbe: null,
                  actualsUpToRbe: null,
                  lastRbeProposed: null,
                  lastRbeFixed: null,
                  status: null,
                  subCodeRBES: null,
                  bedto: null,

                });

                this.allCommitmentsSubGroup_B.push(...subGroups);
              }

              console.log(this.allCommitmentsSubGroup_B, 'this.allCommitmentsSubGroup_B');
              console.log(this.allSubGroupsCommitments_B, 'this.allSubGroupsCommitments_B');

            });

            this.filteredCommitments_Others.forEach(item => {

              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,

              }));

              this.allSubGroupsCommitments_Others.push({
                heading: item.group,
                subGroup: subGroups,
                actualsRbe: null,
                beRbe: null,
                previousBeRbe: null,
                actualsUpToRbe: null,
                lastRbeProposed: null,
                lastRbeFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null,

              });

              this.allCommitmentsSubGroup_Others.push(...subGroups);
              console.log(this.allCommitmentsSubGroup_Others, 'this.allCommitmentsSubGroup_B');
              console.log(this.allSubGroupsCommitments_Others, 'this.allSubGroupsCommitments_B');

            });

            // Commitments assigning values for Variables A,B,C and Others

            this.consolidationCommitmentsValues_A?.forEach((element) => {
              let matchingBothApiValues_A = this.allSubGroupsCommitments_A.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsCommitments_A.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.actualsRbe = element.actualsRbe;
                    subGroupItem.beRbe = element.beRbe;
                    subGroupItem.previousBeRbe = element.previousBeRbe;
                    subGroupItem.actualsUpToRbe = element.actualsUpToRbe;
                    subGroupItem.lastRbeProposed = element.lastRbeProposed;
                    subGroupItem.lastRbeFixed = element.lastRbeFixed;
                    subGroupItem.status = element.status;
                    subGroupItem.subCodeRBES = element.subCodeRBES;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_A) {
                matchingBothApiValues_A.actualsRbe = element.actualsRbe;
                matchingBothApiValues_A.beRbe = element.beRbe;
                matchingBothApiValues_A.previousBeRbe = element.previousBeRbe;
                matchingBothApiValues_A.actualsUpToRbe = element.actualsUpToRbe;
                matchingBothApiValues_A.lastRbeProposed = element.lastRbeProposed;
                matchingBothApiValues_A.lastRbeFixed = element.lastRbeFixed;
                matchingBothApiValues_A.status = element.code.status;
                matchingBothApiValues_A.subCodeRBES = element.subCodeRBES;
                matchingBothApiValues_A.bedto = element.bedto;
              }
            });

            this.consolidationCommitmentsValues_B?.forEach((element) => {
              let matchingBothApiValues_B = this.allSubGroupsCommitments_B.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsCommitments_B.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.actualsRbe = element.actualsRbe;
                    subGroupItem.beRbe = element.beRbe;
                    subGroupItem.previousBeRbe = element.previousBeRbe;
                    subGroupItem.actualsUpToRbe = element.actualsUpToRbe;
                    subGroupItem.lastRbeProposed = element.lastRbeProposed;
                    subGroupItem.lastRbeFixed = element.lastRbeFixed;
                    subGroupItem.status = element.status;
                    subGroupItem.subCodeRBES = element.subCodeRBES;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_B) {
                matchingBothApiValues_B.actualsRbe = element.actualsRbe;
                matchingBothApiValues_B.previousBeRbe = element.previousBeRbe;
                matchingBothApiValues_B.beRbe = element.beRbe;
                matchingBothApiValues_B.actualsUpToRbe = element.actualsUpToRbe;
                matchingBothApiValues_B.lastRbeProposed = element.lastRbeProposed;
                matchingBothApiValues_B.lastRbeFixed = element.lastRbeFixed;
                matchingBothApiValues_B.status = element.code.status;
                matchingBothApiValues_B.subCodeRBES = element.subCodeRBES;
                matchingBothApiValues_B.bedto = element.bedto;
              }
            });

            this.consolidationCommitmentsValues_C?.forEach((element) => {
              let matchingBothApiValues_C = this.allSubGroupsCommitments_C.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsCommitments_C.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.actualsRbe = element.actualsRbe;
                    subGroupItem.previousBeRbe = element.previousBeRbe;
                    subGroupItem.beRbe = element.beRbe;
                    subGroupItem.actualsUpToRbe = element.actualsUpToRbe;
                    subGroupItem.lastRbeProposed = element.lastRbeProposed;
                    subGroupItem.lastRbeFixed = element.lastRbeFixed;
                    subGroupItem.status = element.status;
                    subGroupItem.subCodeRBES = element.subCodeRBES;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_C) {
                matchingBothApiValues_C.actualsRbe = element.actualsRbe;
                matchingBothApiValues_C.previousBeRbe = element.previousBeRbe;
                matchingBothApiValues_C.beRbe = element.beRbe;
                matchingBothApiValues_C.actualsUpToRbe = element.actualsUpToRbe;
                matchingBothApiValues_C.lastRbeProposed = element.lastRbeProposed;
                matchingBothApiValues_C.lastRbeFixed = element.lastRbeFixed;
                matchingBothApiValues_C.status = element.code.status;
                matchingBothApiValues_C.subCodeRBES = element.subCodeRBES;
                matchingBothApiValues_C.bedto = element.bedto;
              }
            });

            this.consolidationCommitmentsValues_Others?.forEach((element) => {
              let matchingBothApiValues_Others = this.allSubGroupsCommitments_Others.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsCommitments_Others.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.actualsRbe = element.actualsRbe;
                    subGroupItem.previousBeRbe = element.previousBeRbe;
                    subGroupItem.beRbe = element.beRbe;
                    subGroupItem.actualsUpToRbe = element.actualsUpToRbe;
                    subGroupItem.lastRbeProposed = element.lastRbeProposed;
                    subGroupItem.lastRbeFixed = element.lastRbeFixed;
                    subGroupItem.status = element.status;
                    subGroupItem.subCodeRBES = element.subCodeRBES;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_Others) {
                matchingBothApiValues_Others.actualsRbe = element.actualsRbe;
                matchingBothApiValues_Others.previousBeRbe = element.previousBeRbe;
                matchingBothApiValues_Others.beRbe = element.beRbe;
                matchingBothApiValues_Others.actualsUpToRbe = element.actualsUpToRbe;
                matchingBothApiValues_Others.lastRbeProposed = element.lastRbeProposed;
                matchingBothApiValues_Others.lastRbeFixed = element.lastRbeFixed;
                matchingBothApiValues_Others.status = element.code.status;
                matchingBothApiValues_Others.subCodeRBES = element.subCodeRBES;
                matchingBothApiValues_Others.bedto = element.bedto;
              }
            });

            console.log(this.allSubGroupsCommitments_A, 'allSubGroupsCommitments_A');
            console.log(this.allSubGroupsCommitments_B, 'allSubGroupsCommitments_B');
            console.log(this.allSubGroupsCommitments_C, 'allSubGroupsCommitments_C');
            console.log(this.allSubGroupsCommitments_Others, 'allSubGroupsCommitments_Others');
            console.log(this.allSubGroupsResource_A, 'allSubGroupsResource_A');
            console.log(this.allSubGroupsResource_B, 'allSubGroupsResource_B');
            console.log(this.allSubGroupsResource_C, 'allSubGroupsResource_C');
            this.cashRbeCalculation();
            this.lengthOfWorkapi();
          }
        );
      }
    );

  }

  rbeWorkValues() {

    this.consolidationResourceValues_A = [];
    this.consolidationResourceValues_B = [];
    this.consolidationResourceValues_C = [];
    this.consolidationResourceValues_Others = [];

    this.allSubGroupsResource_A = [];
    this.allSubGroupsResource_B = [];
    this.allSubGroupsResource_C = [];
    this.allSubGroupsResource_Others = [];

    var paramValue: { [key: string]: string } = {};
    paramValue['budgetType'] = 'Work Budget';
    paramValue['rbeYear'] = this.budgetYear;

    if (this.division != 'Head_office') {
      paramValue['division'] = this.division;
    }
    else {
      if (this.selectedDivision != 'All') {
        paramValue['division'] = this.selectedDivision;
      }
    }

    var previousValue: { [key: string]: string } = {};
    previousValue['budgetType'] = 'Work Budget';
    previousValue['rbeYear'] = this.getPreviousYearRange(this.budgetYear);

    if (this.division != 'Head_office') {
      previousValue['division'] = this.division;
    }
    else {
      if (this.selectedDivision != 'All') {
        previousValue['division'] = this.selectedDivision;
      }
    }

    this.apiCall.apiPostCall_Query(`api/rbe/getAllConsolidationView`, paramValue).subscribe(
      (viewResponse: any) => {

        this.apiCall.apiPostCall_Query(`api/rbe/getAllConsolidationView`, previousValue).subscribe(
          (previousResponse: any) => {

            console.log(viewResponse, 'viewResponse');
            this.consolidationViewData = viewResponse.responseObject;
            console.log(this.consolidationViewData, 'this.consolidationViewData');

            this.ActualsYearRbeValue = viewResponse.responseObject[0].actualsYearRbe;
            this.rbeYearRbeValue = viewResponse.responseObject[0].rbeYear;
            this.rbePreviousYearRbeValue = previousResponse.responseObject[0]?.rbeYear
            this.ActualsUpToYearRbeValue = viewResponse.responseObject[0].actualsUpToYearRbe;
            this.beLastYearRbeValue = viewResponse.responseObject[0].beYearRbe;

            let combindDataConsolidation = [];
            if (viewResponse.responseObject.length > 0 && previousResponse.responseObject.length > 0) {
              this.isPreviousBeRbe = true;
              previousResponse.responseObject.forEach((previousYear) => {
                viewResponse.responseObject.forEach((currentYear) => {
                  if (currentYear.budgetHead == previousYear.budgetHead) {
                    let data = {
                      actualsRbe: currentYear.actualsRbe,
                      actualsTotalRbe: currentYear.actualsTotalRbe,
                      actualsUpToMonthRbe: currentYear.actualsUpToMonthRbe,
                      actualsUpToRbe: currentYear.actualsUpToRbe,
                      actualsUpToTotalRbe: currentYear.actualsUpToTotalRbe,
                      actualsUpToYearRbe: currentYear.actualsUpToYearRbe,
                      actualsYearRbe: currentYear.actualsYearRbe,
                      approvalStatus: currentYear.approvalStatus,
                      beRbe: currentYear.beRbe,
                      beYearRbe: currentYear.beYearRbe,
                      previousBeRbe: previousYear.beRbe,
                      previousBeYearRbe: previousYear.beYearRbe,
                      beTotalRbe: currentYear.beTotalRbe,
                      bedto: currentYear.bedto,
                      budgetHead: currentYear.budgetHead,
                      budgetType: currentYear.budgetType,
                      code: currentYear.code,
                      division: currentYear.division,
                      groupTotal: currentYear.groupTotal,
                      lastRbeFixed: currentYear.lastRbeFixed,
                      lastRbeFixedTotal: currentYear.lastRbeFixedTotal,
                      lastRbeProposed: currentYear.lastRbeProposed,
                      lastRbeProposedTotal: currentYear.lastRbeProposedTotal,
                      mainGroup: currentYear.mainGroup,
                      rbeYear: currentYear.rbeYear,
                      subCodeRBES: currentYear.subCodeRBES,
                    }
                    combindDataConsolidation.push(data);
                  }
                });
              });
            }
            else {
              this.isPreviousBeRbe = false;
              combindDataConsolidation = this.consolidationViewData
            }
            console.log(combindDataConsolidation, 'combindDataConsolidation');


            this.consolidationResourceValues_A = combindDataConsolidation.filter(x => x.groupTotal === 'A' && x.mainGroup === 'A.Capital Outlay');
            this.consolidationResourceValues_B = combindDataConsolidation.filter(x => x.groupTotal === 'B' && x.mainGroup === 'B.Deposit-Works');
            this.consolidationResourceValues_C = combindDataConsolidation.filter(x => x.groupTotal === 'C' && x.mainGroup === 'C.Revenue');

            console.log(this.consolidationResourceValues_A, 'this.consolidationResourceValues_A');
            console.log(this.consolidationResourceValues_B, 'this.consolidationResourceValues_B');
            console.log(this.consolidationResourceValues_C, 'this.consolidationResourceValues_C');


            // All resources filtering setting the Values
            // Commitments A Patch Request
            this.filteredResources_A.forEach(item => {
              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                actuals: null,
                actualsUpTo: null,
                previousBeRbe: null,
                rbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null
              }));

              this.allSubGroupsResource_A.push({
                heading: item.group,
                subGroup: subGroups,
                actuals: null,
                actualsUpTo: null,
                previousBeRbe: null,
                rbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null
              });

              this.allResourceSubGroup_A.push(...subGroups);
              console.log(this.allResourceSubGroup_A, 'this.allResourceSubGroup_A');
              console.log(this.allSubGroupsResource_A, 'this.allSubGroupsResource_A');

            });

            // Resource B Patch Request

            this.filteredResources_B.forEach(item => {
              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousBeRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null

              }));

              this.allSubGroupsResource_B.push({
                heading: item.group,
                subGroup: subGroups,
                actuals: null,
                actualsUpTo: null,
                previousBeRbe: null,
                rbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null

              });

              this.allResourceSubGroup_B.push(...subGroups);
              console.log(this.allResourceSubGroup_B, 'this.allResourceSubGroup_B');
              console.log(this.allSubGroupsResource_B, 'allSubGroupsResource_B');


            });

            // Resource C Patch Request

            this.filteredResources_C.forEach(item => {
              let subGroups = item.subGroup.map(sub => ({
                heading: sub,
                actuals: null,
                actualsUpTo: null,
                rbe: null,
                previousBeRbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null

              }));

              this.allSubGroupsResource_C.push({
                heading: item.group,
                subGroup: subGroups,
                actuals: null,
                actualsUpTo: null,
                previousBeRbe: null,
                rbe: null,
                beLastYearProposed: null,
                beLastYearFixed: null,
                status: null,
                subCodeRBES: null,
                bedto: null

              });

              this.allResourceSubGroup_C.push(...subGroups);
              console.log(this.allResourceSubGroup_C, 'this.allResourceSubGroup_C');
              console.log(this.allSubGroupsResource_B, 'allSubGroupsResource_B');


            });

            // Resource A Patch Request values

            this.consolidationResourceValues_A.forEach((element) => {
              let matchingBothApiValues_A = this.allSubGroupsResource_A.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              // Resource A Patch Request values

              console.log(matchingBothApiValues_A, 'matchingBothApiValues_A');

              this.allSubGroupsResource_A.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.actuals = element.actualsRbe;
                    subGroupItem.actualsUpTo = element.actualsUpToRbe;
                    subGroupItem.previousBeRbe = element.previousBeRbe;
                    subGroupItem.rbe = element.beRbe;
                    subGroupItem.beLastYearProposed = element.lastRbeProposed;
                    subGroupItem.beLastYearFixed = element.lastRbeFixed;
                    subGroupItem.status = element.status;
                    subGroupItem.subCodeRBES = element.subCodeRBES;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_A) {
                matchingBothApiValues_A.actuals = element.actualsRbe;
                matchingBothApiValues_A.actualsUpTo = element.actualsUpToRbe;
                matchingBothApiValues_A.previousBeRbe = element.previousBeRbe;
                matchingBothApiValues_A.rbe = element.beRbe;
                matchingBothApiValues_A.beLastYearProposed = element.lastRbeProposed;
                matchingBothApiValues_A.beLastYearFixed = element.lastRbeFixed;
                matchingBothApiValues_A.status = element.code.status;
                matchingBothApiValues_A.subCodeRBES = element.subCodeRBES;
                matchingBothApiValues_A.bedto = element.bedto;
              }
            });

            // Resource B Patch Request values

            this.consolidationResourceValues_B.forEach((element) => {
              let matchingBothApiValues_B = this.allSubGroupsResource_B.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsResource_B.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.actuals = element.actualsRbe;
                    subGroupItem.actualsUpTo = element.actualsUpToRbe;
                    subGroupItem.rbe = element.beRbe;
                    subGroupItem.previousBeRbe = element.previousBeRbe;
                    subGroupItem.beLastYearProposed = element.lastRbeProposed;
                    subGroupItem.beLastYearFixed = element.lastRbeFixed;
                    subGroupItem.status = element.status;
                    subGroupItem.subCodeRBES = element.subCodeRBES;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_B) {
                matchingBothApiValues_B.actuals = element.actualsRbe;
                matchingBothApiValues_B.actualsUpTo = element.actualsUpToRbe;
                matchingBothApiValues_B.rbe = element.beRbe;
                matchingBothApiValues_B.previousBeRbe = element.previousBeRbe;
                matchingBothApiValues_B.beLastYearProposed = element.lastRbeProposed;
                matchingBothApiValues_B.beLastYearFixed = element.lastRbeFixed;
                matchingBothApiValues_B.status = element.code.status;
                matchingBothApiValues_B.subCodeRBES = element.subCodeRBES;
                matchingBothApiValues_B.bedto = element.bedto;
              }
            });

            // Resource C Patch Request values

            this.consolidationResourceValues_C.forEach((element) => {
              let matchingBothApiValues_C = this.allSubGroupsResource_C.find((data) => ((data.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase())));

              this.allSubGroupsResource_C.forEach(group => {
                group.subGroup.forEach(subGroupItem => {
                  if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                    subGroupItem.actuals = element.actualsRbe;
                    subGroupItem.actualsUpTo = element.actualsUpToRbe;
                    subGroupItem.previousBeRbe = element.previousBeRbe;
                    subGroupItem.rbe = element.beRbe;
                    subGroupItem.beLastYearProposed = element.lastRbeProposed;
                    subGroupItem.beLastYearFixed = element.lastRbeFixed;
                    subGroupItem.status = element.status;
                    subGroupItem.subCodeRBES = element.subCodeRBES;
                    subGroupItem.bedto = element.bedto;
                  }
                });
              });

              if (matchingBothApiValues_C) {
                matchingBothApiValues_C.actuals = element.actualsRbe;
                matchingBothApiValues_C.actualsUpTo = element.actualsUpToRbe;
                matchingBothApiValues_C.previousBeRbe = element.previousBeRbe;
                matchingBothApiValues_C.rbe = element.beRbe;
                matchingBothApiValues_C.beLastYearProposed = element.lastRbeProposed;
                matchingBothApiValues_C.beLastYearFixed = element.lastRbeFixed;
                matchingBothApiValues_C.status = element.code.status;
                matchingBothApiValues_C.subCodeRBES = element.subCodeRBES;
                matchingBothApiValues_C.bedto = element.bedto;
              }
            });
            this.workRbeCalculation();
          }
        );
      }
    );

  }

  lengthOfWorkapi() {
    this.lenthOfCommitments_C = this.allSubGroupsCommitments_C.length + 1
    console.log(this.lenthOfCommitments_C, 'this.lenthOfCommitments_C');
  }

  cashBeCalculation() {
    // Resource calculation
    let actualsGroupResource_A: any[] = [];
    let beRbeGroupResource_A: any[] = [];
    let beRbeGroupPreviousResource_A: any[] = [];
    let actualsUpToGroupResource_A: any[] = [];
    let beLastYearProposedGroupResource_A: any[] = [];
    let beLastYearFixedGroupResource_A: any[] = [];

    let actualsGroupResource_B: any[] = [];
    let beRbeGroupResource_B: any[] = [];
    let beRbeGroupPreviousResource_B: any[] = [];
    let actualsUpToGroupResource_B: any[] = [];
    let beLastYearProposedGroupResource_B: any[] = [];
    let beLastYearFixedGroupResource_B: any[] = [];

    let actualsGroupResource_C: any[] = [];
    let beRbeGroupResource_C: any[] = [];
    let beRbeGroupPreviousResource_C: any[] = [];
    let actualsUpToGroupResource_C: any[] = [];
    let beLastYearProposedGroupResource_C: any[] = [];
    let beLastYearFixedGroupResource_C: any[] = [];

    // Commitments calculation

    let actualsGroupCommitments_A: any[] = [];
    let beRbeGroupCommitments_A: any[] = [];
    let beRbeGroupPreviousCommitments_A: any[] = [];
    let actualsUpToGroupCommitments_A: any[] = [];
    let beLastYearProposedGroupCommitments_A: any[] = [];
    let beLastYearFixedGroupCommitments_A: any[] = [];

    let actualsGroupCommitments_B: any[] = [];
    let beRbeGroupCommitments_B: any[] = [];
    let beRbeGroupPreviousCommitments_B: any[] = [];
    let actualsUpToGroupCommitments_B: any[] = [];
    let beLastYearProposedGroupCommitments_B: any[] = [];
    let beLastYearFixedGroupCommitments_B: any[] = [];

    let actualsGroupCommitments_C: any[] = [];
    let beRbeGroupCommitments_C: any[] = [];
    let beRbeGroupPreviousCommitments_C: any[] = [];
    let actualsUpToGroupCommitments_C: any[] = [];
    let beLastYearProposedGroupCommitments_C: any[] = [];
    let beLastYearFixedGroupCommitments_C: any[] = [];

    this.actualsResource_A = 0;
    this.actualsResource_B = 0;
    this.actualsResource_C = 0;
    this.actualsResource_Others = 0;

    this.rbeResource_A = 0;
    this.rbeResource_B = 0;
    this.rbeResource_C = 0;
    this.rbeResource_Others = 0;

    this.rbePreviousResource_A = 0;
    this.rbePreviousResource_B = 0;
    this.rbePreviousResource_C = 0;
    this.rbePreviousResource_Others = 0;

    this.actualUpToResource_A = 0;
    this.actualUpToResource_B = 0;
    this.actualUpToResource_C = 0;
    this.actualUpToResource_Others = 0;

    this.beProposedResource_A = 0;
    this.beProposedResource_B = 0;
    this.beProposedResource_C = 0;
    this.beProposedResource_Others = 0;

    this.beFixedResource_A = 0;
    this.beFixedResource_B = 0;
    this.beFixedResource_C = 0;
    this.beFixedResource_Others = 0;

    this.actualsCommitments_A = 0;
    this.actualsCommitments_B = 0;
    this.actualsCommitments_C = 0;
    this.actualsCommitments_Others = 0;

    this.rbeCommitments_A = 0;
    this.rbeCommitments_B = 0;
    this.rbeCommitments_C = 0;
    this.rbeCommitments_Others = 0;

    this.rbePreviousCommitments_A = 0;
    this.rbePreviousCommitments_B = 0;
    this.rbePreviousCommitments_C = 0;
    this.rbePreviousCommitments_Others = 0;

    // Commitments

    this.actualUpToCommitments_A = 0;
    this.actualUpToCommitments_B = 0;
    this.actualUpToCommitments_C = 0;
    this.actualUpToCommitments_Others = 0;

    this.beProposedCommitments_A = 0;
    this.beProposedCommitments_B = 0;
    this.beProposedCommitments_C = 0;
    this.beProposedCommitments_Others = 0;

    this.beFixedCommitments_A = 0;
    this.beFixedCommitments_B = 0;
    this.beFixedCommitments_C = 0;
    this.beFixedCommitments_Others = 0;

    this.actualOverAllTotal = 0;
    this.beRbeOverAllTotal = 0;
    this.beRbePerviousOverAllTotal = 0;
    this.actualUpToOverAllTotal = 0;
    this.proposedOverAllTotal = 0;
    this.fixedOverAllTotal = 0;

    //  adding all resources total A
    console.log(this.allSubGroupsResource_A, 'allSubGroupsResource_A');
    console.log(this.allSubGroupsResource_B, 'allSubGroupsResource_B');
    console.log(this.allSubGroupsResource_C, 'allSubGroupsResource_C');

    // resources A
    this.allSubGroupsResource_A.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          // resources A
          actualsGroupResource_A.push(element.actuals);
          beRbeGroupResource_A.push(element.rbe);
          beRbeGroupPreviousResource_A.push(element.previousRbe);
          actualsUpToGroupResource_A.push(element.actualsUpTo);
          beLastYearProposedGroupResource_A.push(element.beLastYearProposed);
          beLastYearFixedGroupResource_A.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupResource_A.push(items.actuals);
        beRbeGroupResource_A.push(items.rbe);
        beRbeGroupPreviousResource_A.push(items.previousRbe);
        actualsUpToGroupResource_A.push(items.actualsUpTo);
        beLastYearProposedGroupResource_A.push(items.beLastYearProposed);
        beLastYearFixedGroupResource_A.push(items.beLastYearFixed);
      }
      console.log(actualsGroupResource_A, 'actualsGroupResource_A');
      console.log(beRbeGroupResource_A, 'beGroupResource_A');
    });

    // resources B
    this.allSubGroupsResource_B.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupResource_B.push(element.actuals);
          beRbeGroupResource_B.push(element.rbe);
          beRbeGroupPreviousResource_B.push(element.previousRbe);
          actualsUpToGroupResource_B.push(element.actualsUpTo);
          beLastYearProposedGroupResource_B.push(element.beLastYearProposed);
          beLastYearFixedGroupResource_B.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupResource_B.push(items.actuals);
        beRbeGroupResource_B.push(items.rbe);
        beRbeGroupPreviousResource_B.push(items.previousRbe);
        actualsUpToGroupResource_B.push(items.actualsUpTo);
        beLastYearProposedGroupResource_B.push(items.beLastYearProposed);
        beLastYearFixedGroupResource_B.push(items.beLastYearFixed);
      }
    });

    // resources C
    this.allSubGroupsResource_C.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupResource_C.push(element.actuals);
          beRbeGroupResource_C.push(element.rbe);
          beRbeGroupPreviousResource_C.push(element.previousRbe);
          actualsUpToGroupResource_C.push(element.actualsUpTo);
          beLastYearProposedGroupResource_C.push(element.beLastYearProposed);
          beLastYearFixedGroupResource_C.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupResource_C.push(items.actuals);
        beRbeGroupResource_C.push(items.rbe);
        beRbeGroupPreviousResource_C.push(items.previousRbe);
        actualsUpToGroupResource_C.push(items.actualsUpTo);
        beLastYearProposedGroupResource_C.push(items.beLastYearProposed);
        beLastYearFixedGroupResource_C.push(items.beLastYearFixed);
      }
    });


    // Resource A

    actualsGroupResource_A.forEach((element) => {
      this.actualsResource_A += element
    });
    beRbeGroupResource_A.forEach((element) => {
      this.rbeResource_A += element
    });
    beRbeGroupPreviousResource_A.forEach((element) => {
      this.rbePreviousResource_A += element
    });
    actualsUpToGroupResource_A.forEach((element) => {
      this.actualUpToResource_A += element
    });
    beLastYearProposedGroupResource_A.forEach((element) => {
      this.beProposedResource_A += element
    });
    beLastYearFixedGroupResource_A.forEach((element) => {
      this.beFixedResource_A += element
    });

    // Resource B
    actualsGroupResource_B.forEach((element) => {
      this.actualsResource_B += element
    });
    beRbeGroupResource_B.forEach((element) => {
      this.rbeResource_B += element
    });
    beRbeGroupPreviousResource_B.forEach((element) => {
      this.rbePreviousResource_B += element
    });
    console.log(this.rbePreviousResource_B, 'this.rbePreviousResource_B');

    actualsUpToGroupResource_B.forEach((element) => {
      this.actualUpToResource_B += element
    });
    beLastYearProposedGroupResource_B.forEach((element) => {
      this.beProposedResource_B += element
    });
    beLastYearFixedGroupResource_B.forEach((element) => {
      this.beFixedResource_B += element
    });

    // Resource C
    actualsGroupResource_C.forEach((element) => {
      this.actualsResource_C += element
    });
    beRbeGroupResource_C.forEach((element) => {
      this.rbeResource_C += element
    });
    beRbeGroupPreviousResource_C.forEach((element) => {
      this.rbePreviousResource_C += element
    });
    actualsUpToGroupResource_C.forEach((element) => {
      this.actualUpToResource_C += element
    });
    beLastYearProposedGroupResource_C.forEach((element) => {
      this.beProposedResource_C += element
    });
    beLastYearFixedGroupResource_C.forEach((element) => {
      this.beFixedResource_C += element
    });

    // Commitmentss All totals

    console.log(this.allSubGroupsCommitments_A, 'allSubGroupsCommitments_A');
    console.log(this.allSubGroupsCommitments_B, 'allSubGroupsCommitments_B');
    console.log(this.allSubGroupsCommitments_C, 'allSubGroupsCommitments_C');

    // Commitments A
    this.allSubGroupsCommitments_A.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupCommitments_A.push(element.actuals);
          beRbeGroupCommitments_A.push(element.rbe);
          beRbeGroupPreviousCommitments_A.push(element.previousRbe);
          actualsUpToGroupCommitments_A.push(element.actualsUpTo);
          beLastYearProposedGroupCommitments_A.push(element.beLastYearProposed);
          beLastYearFixedGroupCommitments_A.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupCommitments_A.push(items.actuals);
        beRbeGroupCommitments_A.push(items.rbe);
        beRbeGroupPreviousCommitments_A.push(items.previousRbe);
        actualsUpToGroupCommitments_A.push(items.actualsUpTo);
        beLastYearProposedGroupCommitments_A.push(items.beLastYearProposed);
        beLastYearFixedGroupCommitments_A.push(items.beLastYearFixed);
      }
      console.log(actualsGroupResource_A, 'actualsGroupResource_A');
      console.log(beRbeGroupResource_A, 'beGroupResource_A');
    });

    // Commitments B
    this.allSubGroupsCommitments_B.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupCommitments_B.push(element.actuals);
          beRbeGroupCommitments_B.push(element.rbe);
          beRbeGroupPreviousCommitments_B.push(element.previousRbe);
          actualsUpToGroupCommitments_B.push(element.actualsUpTo);
          beLastYearProposedGroupCommitments_B.push(element.beLastYearProposed);
          beLastYearFixedGroupCommitments_B.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupCommitments_B.push(items.actuals);
        beRbeGroupCommitments_B.push(items.rbe);
        beRbeGroupPreviousCommitments_B.push(items.previousRbe);
        actualsUpToGroupCommitments_B.push(items.actualsUpTo);
        beLastYearProposedGroupCommitments_B.push(items.beLastYearProposed);
        beLastYearFixedGroupCommitments_B.push(items.beLastYearFixed);
      }
    });

    // Commitments C
    this.allSubGroupsCommitments_C.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupCommitments_C.push(element.actuals);
          beRbeGroupCommitments_C.push(element.rbe);
          beRbeGroupPreviousCommitments_C.push(element.previousRbe);
          actualsUpToGroupCommitments_C.push(element.actualsUpTo);
          beLastYearProposedGroupCommitments_C.push(element.beLastYearProposed);
          beLastYearFixedGroupCommitments_C.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupCommitments_C.push(items.actuals);
        beRbeGroupCommitments_C.push(items.rbe);
        beRbeGroupPreviousCommitments_C.push(items.previousRbe);
        actualsUpToGroupCommitments_C.push(items.actualsUpTo);
        beLastYearProposedGroupCommitments_C.push(items.beLastYearProposed);
        beLastYearFixedGroupCommitments_C.push(items.beLastYearFixed);
      }
    });

    // Commitments A
    actualsGroupCommitments_A.forEach((element) => {
      this.actualsCommitments_A += element
    });
    beRbeGroupCommitments_A.forEach((element) => {
      this.rbeCommitments_A += element
    });
    beRbeGroupPreviousCommitments_A.forEach((element) => {
      this.rbePreviousCommitments_A += element
    });
    actualsUpToGroupCommitments_A.forEach((element) => {
      this.actualUpToCommitments_A += element
    });
    beLastYearProposedGroupCommitments_A.forEach((element) => {
      this.beProposedCommitments_A += element
    });
    beLastYearFixedGroupCommitments_A.forEach((element) => {
      this.beFixedCommitments_A += element
    });

    // Commitments B
    actualsGroupCommitments_B.forEach((element) => {
      this.actualsCommitments_B += element
    });
    beRbeGroupCommitments_B.forEach((element) => {
      this.rbeCommitments_B += element
    });
    beRbeGroupPreviousCommitments_B.forEach((element) => {
      this.rbePreviousCommitments_B += element
    });
    actualsUpToGroupCommitments_B.forEach((element) => {
      this.actualUpToCommitments_B += element
    });
    beLastYearProposedGroupCommitments_B.forEach((element) => {
      this.beProposedCommitments_B += element
    });
    beLastYearFixedGroupCommitments_B.forEach((element) => {
      this.beFixedCommitments_B += element
    });

    let addActualsCommitments_C: number = 0;
    let addRbeCommitments_C: number = 0;
    let addRbePreviousCommitments_C: number = 0;
    let addActualUpToCommitments_C: number = 0;
    let addBeProposedCommitments_C: number = 0;
    let addBeFixedCommitments_C: number = 0;

    // Commitments C
    actualsGroupCommitments_C.forEach((element) => {
      addActualsCommitments_C += element
    });
    beRbeGroupCommitments_C.forEach((element) => {
      addRbeCommitments_C += element
    });
    beRbeGroupPreviousCommitments_C.forEach((element) => {
      addRbePreviousCommitments_C += element
    });
    actualsUpToGroupCommitments_C.forEach((element) => {
      addActualUpToCommitments_C += element
    });
    beLastYearProposedGroupCommitments_C.forEach((element) => {
      addBeProposedCommitments_C += element
    });
    beLastYearFixedGroupCommitments_C.forEach((element) => {
      addBeFixedCommitments_C += element
    });

    this.actualsCommitments_C = addActualsCommitments_C + this.workToCashActualsTotal
    this.rbeCommitments_C = addRbeCommitments_C + this.workToCashBeRbeTotal
    this.rbePreviousCommitments_C = addRbePreviousCommitments_C + this.workToCashBeRbePreviousTotal
    this.actualUpToCommitments_C = addActualUpToCommitments_C + this.workToCashActualsUpToTotal
    this.beProposedCommitments_C = addBeProposedCommitments_C + this.workToCashProposedTotal
    this.beFixedCommitments_C = addBeFixedCommitments_C + this.workToCashFixedTotal

    this.actualsResourceTotal = this.actualsResource_A + this.actualsResource_B + this.actualsResource_C;
    this.actualsCommitmentsTotal = this.actualsCommitments_A + this.actualsCommitments_B + this.actualsCommitments_C;

    this.rbeResourceTotal = this.rbeResource_A + this.rbeResource_B + this.rbeResource_C;
    this.rbeCommitmentsTotal = this.rbeCommitments_A + this.rbeCommitments_B + this.rbeCommitments_C;

    this.rbePreviousResourceTotal = this.rbePreviousResource_A + this.rbePreviousResource_B + this.rbePreviousResource_C;
    this.rbePerviousCommitmentsTotal = this.rbePreviousCommitments_A + this.rbePreviousCommitments_B + this.rbePreviousCommitments_C;

    console.log(this.rbePreviousCommitments_A, 'this.rbePreviousCommitments_A ');
    console.log(this.rbePreviousCommitments_B, 'this.rbePreviousCommitments_B ');
    console.log(this.rbePreviousCommitments_C, 'this.rbePreviousCommitments_C ');


    this.actualUpToResourceTotal = this.actualUpToResource_A + this.actualUpToResource_B + this.actualUpToResource_C;
    this.actualUpToCommitmentsTotal = this.actualUpToCommitments_A + this.actualUpToCommitments_B + this.actualUpToCommitments_C;

    this.proposedResourceTotal = this.beProposedResource_A + this.beProposedResource_B + this.beProposedResource_C;
    this.proposedCommitmentsTotal = this.beProposedCommitments_A + this.beProposedCommitments_B + this.beProposedCommitments_C;

    this.fixedResourceTotal = this.beFixedResource_A + this.beFixedResource_B + this.beFixedResource_C;
    this.fixedCommitmentsTotal = this.beFixedCommitments_A + this.beFixedCommitments_B + this.beFixedCommitments_C;

    this.actualOverAllTotal = this.actualsResourceTotal + this.actualsCommitmentsTotal;
    this.beRbeOverAllTotal = this.rbeResourceTotal + this.rbeCommitmentsTotal;
    this.beRbePerviousOverAllTotal = this.rbePreviousResourceTotal + this.rbePerviousCommitmentsTotal;
    this.actualUpToOverAllTotal = this.actualUpToResourceTotal + this.actualUpToCommitmentsTotal;
    this.proposedOverAllTotal = this.proposedResourceTotal + this.proposedCommitmentsTotal;
    this.fixedOverAllTotal = this.fixedResourceTotal + this.fixedCommitmentsTotal

  }

  cashRbeCalculation() {
    // Resource calculation
    let actualsGroupResource_A: any[] = [];
    let beRbeGroupResource_A: any[] = [];
    let beRbeGroupPreviousResource_A: any[] = [];
    let actualsUpToGroupResource_A: any[] = [];
    let beLastYearProposedGroupResource_A: any[] = [];
    let beLastYearFixedGroupResource_A: any[] = [];

    let actualsGroupResource_B: any[] = [];
    let beRbeGroupResource_B: any[] = [];
    let beRbeGroupPreviousResource_B: any[] = [];
    let actualsUpToGroupResource_B: any[] = [];
    let beLastYearProposedGroupResource_B: any[] = [];
    let beLastYearFixedGroupResource_B: any[] = [];

    let actualsGroupResource_C: any[] = [];
    let beRbeGroupResource_C: any[] = [];
    let beRbeGroupPreviousResource_C: any[] = [];
    let actualsUpToGroupResource_C: any[] = [];
    let beLastYearProposedGroupResource_C: any[] = [];
    let beLastYearFixedGroupResource_C: any[] = [];

    // Commitments calculation

    let actualsGroupCommitments_A: any[] = [];
    let beRbeGroupCommitments_A: any[] = [];
    let beRbeGroupPreviousCommitments_A: any[] = [];
    let actualsUpToGroupCommitments_A: any[] = [];
    let beLastYearProposedGroupCommitments_A: any[] = [];
    let beLastYearFixedGroupCommitments_A: any[] = [];

    let actualsGroupCommitments_B: any[] = [];
    let beRbeGroupCommitments_B: any[] = [];
    let beRbeGroupPreviousCommitments_B: any[] = [];
    let actualsUpToGroupCommitments_B: any[] = [];
    let beLastYearProposedGroupCommitments_B: any[] = [];
    let beLastYearFixedGroupCommitments_B: any[] = [];

    let actualsGroupCommitments_C: any[] = [];
    let beRbeGroupCommitments_C: any[] = [];
    let beRbeGroupPreviousCommitments_C: any[] = [];
    let actualsUpToGroupCommitments_C: any[] = [];
    let beLastYearProposedGroupCommitments_C: any[] = [];
    let beLastYearFixedGroupCommitments_C: any[] = [];

    this.actualsResource_A = 0;
    this.actualsResource_B = 0;
    this.actualsResource_C = 0;
    this.actualsResource_Others = 0;

    this.rbeResource_A = 0;
    this.rbeResource_B = 0;
    this.rbeResource_C = 0;
    this.rbeResource_Others = 0;

    this.rbePreviousResource_A = 0;
    this.rbePreviousResource_B = 0;
    this.rbePreviousResource_C = 0;
    this.rbePreviousResource_Others = 0;

    this.actualUpToResource_A = 0;
    this.actualUpToResource_B = 0;
    this.actualUpToResource_C = 0;
    this.actualUpToResource_Others = 0;

    this.beProposedResource_A = 0;
    this.beProposedResource_B = 0;
    this.beProposedResource_C = 0;
    this.beProposedResource_Others = 0;

    this.beFixedResource_A = 0;
    this.beFixedResource_B = 0;
    this.beFixedResource_C = 0;
    this.beFixedResource_Others = 0;

    // Commitsment

    this.actualsCommitments_A = 0;
    this.actualsCommitments_B = 0;
    this.actualsCommitments_C = 0;
    this.actualsCommitments_Others = 0;

    this.rbeCommitments_A = 0;
    this.rbeCommitments_B = 0;
    this.rbeCommitments_C = 0;
    this.rbeCommitments_Others = 0;

    this.rbePreviousCommitments_A = 0;
    this.rbePreviousCommitments_B = 0;
    this.rbePreviousCommitments_C = 0;
    this.rbePreviousCommitments_Others = 0;


    this.actualUpToCommitments_A = 0;
    this.actualUpToCommitments_B = 0;
    this.actualUpToCommitments_C = 0;
    this.actualUpToCommitments_Others = 0;

    this.beProposedCommitments_A = 0;
    this.beProposedCommitments_B = 0;
    this.beProposedCommitments_C = 0;
    this.beProposedCommitments_Others = 0;

    this.beFixedCommitments_A = 0;
    this.beFixedCommitments_B = 0;
    this.beFixedCommitments_C = 0;
    this.beFixedCommitments_Others = 0;

    this.actualOverAllTotal = 0;
    this.beRbeOverAllTotal = 0;
    this.beRbePerviousOverAllTotal = 0;
    this.actualUpToOverAllTotal = 0;
    this.proposedOverAllTotal = 0;
    this.fixedOverAllTotal = 0;

    //  adding all resources total A
    console.log(this.allSubGroupsResource_A, 'allSubGroupsResource_A');
    console.log(this.allSubGroupsResource_B, 'allSubGroupsResource_B');
    console.log(this.allSubGroupsResource_C, 'allSubGroupsResource_C');

    // resources A
    this.allSubGroupsResource_A.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          // resources A
          actualsGroupResource_A.push(element.actualsRbe);
          beRbeGroupResource_A.push(element.beRbe);
          beRbeGroupPreviousResource_A.push(element.previousBeRbe);
          actualsUpToGroupResource_A.push(element.actualsUpToRbe);
          beLastYearProposedGroupResource_A.push(element.lastRbeProposed);
          beLastYearFixedGroupResource_A.push(element.lastRbeFixed);
        });
      }
      else {
        actualsGroupResource_A.push(items.actualsRbe);
        beRbeGroupResource_A.push(items.beRbe);
        beRbeGroupPreviousResource_A.push(items.previousBeRbe);
        actualsUpToGroupResource_A.push(items.actualsUpToRbe);
        beLastYearProposedGroupResource_A.push(items.lastRbeProposed);
        beLastYearFixedGroupResource_A.push(items.lastRbeFixed);
      }
      console.log(actualsGroupResource_A, 'actualsGroupResource_A');
      console.log(beRbeGroupResource_A, 'beGroupResource_A');
      console.log(beRbeGroupPreviousResource_A, 'beRbeGroupPreviousResource_A');
    });

    // resources B
    this.allSubGroupsResource_B.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupResource_B.push(element.actualsRbe);
          beRbeGroupResource_B.push(element.beRbe);
          beRbeGroupPreviousResource_B.push(element.previousBeRbe);
          actualsUpToGroupResource_B.push(element.actualsUpToRbe);
          beLastYearProposedGroupResource_B.push(element.lastRbeProposed);
          beLastYearFixedGroupResource_B.push(element.lastRbeFixed);
        });
      }
      else {
        actualsGroupResource_B.push(items.actualsRbe);
        beRbeGroupResource_B.push(items.beRbe);
        beRbeGroupPreviousResource_B.push(items.previousBeRbe);
        actualsUpToGroupResource_B.push(items.actualsUpToRbe);
        beLastYearProposedGroupResource_B.push(items.lastRbeProposed);
        beLastYearFixedGroupResource_B.push(items.lastRbeFixed);
      }
    });

    // resources C
    this.allSubGroupsResource_C.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupResource_C.push(element.actualsRbe);
          beRbeGroupPreviousResource_C.push(element.previousBeRbe);
          beRbeGroupResource_C.push(element.beRbe);
          actualsUpToGroupResource_C.push(element.actualsUpToRbe);
          beLastYearProposedGroupResource_C.push(element.lastRbeProposed);
          beLastYearFixedGroupResource_C.push(element.lastRbeFixed);
        });
      }
      else {
        actualsGroupResource_C.push(items.actualsRbe);
        beRbeGroupResource_C.push(items.beRbe);
        beRbeGroupPreviousResource_C.push(items.previousBeRbe);
        actualsUpToGroupResource_C.push(items.actualsUpToRbe);
        beLastYearProposedGroupResource_C.push(items.lastRbeProposed);
        beLastYearFixedGroupResource_C.push(items.lastRbeFixed);
      }
    });


    // Resource A
    actualsGroupResource_A.forEach((element) => {
      this.actualsResource_A += element
    });
    beRbeGroupResource_A.forEach((element) => {
      this.rbeResource_A += element
    });
    beRbeGroupPreviousResource_A.forEach((element) => {
      this.rbePreviousResource_A += element
    });
    actualsUpToGroupResource_A.forEach((element) => {
      this.actualUpToResource_A += element
    });
    beLastYearProposedGroupResource_A.forEach((element) => {
      this.beProposedResource_A += element
    });
    beLastYearFixedGroupResource_A.forEach((element) => {
      this.beFixedResource_A += element
    });

    console.log(this.rbePreviousResource_A, 'rbePreviousResource_A');


    // Resource B
    actualsGroupResource_B.forEach((element) => {
      this.actualsResource_B += element
    });
    beRbeGroupResource_B.forEach((element) => {
      this.rbeResource_B += element
    });
    beRbeGroupPreviousResource_B.forEach((element) => {
      this.rbePreviousResource_B += element
    });
    actualsUpToGroupResource_B.forEach((element) => {
      this.actualUpToResource_B += element
    });
    beLastYearProposedGroupResource_B.forEach((element) => {
      this.beProposedResource_B += element
    });
    beLastYearFixedGroupResource_B.forEach((element) => {
      this.beFixedResource_B += element
    });

    // Resource C
    actualsGroupResource_C.forEach((element) => {
      this.actualsResource_C += element
    });
    beRbeGroupResource_C.forEach((element) => {
      this.rbeResource_C += element
    });
    beRbeGroupPreviousResource_C.forEach((element) => {
      this.rbePreviousResource_C += element
    });
    actualsUpToGroupResource_C.forEach((element) => {
      this.actualUpToResource_C += element
    });
    beLastYearProposedGroupResource_C.forEach((element) => {
      this.beProposedResource_C += element
    });
    beLastYearFixedGroupResource_C.forEach((element) => {
      this.beFixedResource_C += element
    });

    // Commitmentss All totals

    console.log(this.allSubGroupsCommitments_A, 'allSubGroupsCommitments_A');
    console.log(this.allSubGroupsCommitments_B, 'allSubGroupsCommitments_B');
    console.log(this.allSubGroupsCommitments_C, 'allSubGroupsCommitments_C');

    // Commitments A
    this.allSubGroupsCommitments_A.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupCommitments_A.push(element.actualsRbe);
          beRbeGroupCommitments_A.push(element.beRbe);
          beRbeGroupPreviousCommitments_A.push(element.previousBeRbe);
          actualsUpToGroupCommitments_A.push(element.actualsUpToRbe);
          beLastYearProposedGroupCommitments_A.push(element.lastRbeProposed);
          beLastYearFixedGroupCommitments_A.push(element.lastRbeFixed);
        });
      }
      else {
        actualsGroupCommitments_A.push(items.actualsRbe);
        beRbeGroupCommitments_A.push(items.beRbe);
        beRbeGroupPreviousCommitments_A.push(items.previousBeRbe);
        actualsUpToGroupCommitments_A.push(items.actualsUpToRbe);
        beLastYearProposedGroupCommitments_A.push(items.lastRbeProposed);
        beLastYearFixedGroupCommitments_A.push(items.lastRbeFixed);
      }
    });

    // Commitments B
    this.allSubGroupsCommitments_B.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupCommitments_B.push(element.actualsRbe);
          beRbeGroupCommitments_B.push(element.beRbe);
          beRbeGroupPreviousCommitments_B.push(element.previousBeRbe);
          actualsUpToGroupCommitments_B.push(element.actualsUpToRbe);
          beLastYearProposedGroupCommitments_B.push(element.lastRbeProposed);
          beLastYearFixedGroupCommitments_B.push(element.lastRbeFixed);
        });
      }
      else {
        actualsGroupCommitments_B.push(items.actualsRbe);
        beRbeGroupCommitments_B.push(items.beRbe);
        beRbeGroupPreviousCommitments_B.push(items.previousBeRbe);
        actualsUpToGroupCommitments_B.push(items.actualsUpToRbe);
        beLastYearProposedGroupCommitments_B.push(items.lastRbeProposed);
        beLastYearFixedGroupCommitments_B.push(items.lastRbeFixed);
      }
    });

    // Commitments C
    this.allSubGroupsCommitments_C.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupCommitments_C.push(element.actualsRbe);
          beRbeGroupCommitments_C.push(element.beRbe);
          beRbeGroupPreviousCommitments_C.push(element.previousBeRbe);
          actualsUpToGroupCommitments_C.push(element.actualsUpToRbe);
          beLastYearProposedGroupCommitments_C.push(element.lastRbeProposed);
          beLastYearFixedGroupCommitments_C.push(element.lastRbeFixed);
        });
      }
      else {
        actualsGroupCommitments_C.push(items.actualsRbe);
        beRbeGroupCommitments_C.push(items.beRbe);
        beRbeGroupPreviousCommitments_C.push(items.previousBeRbe);
        actualsUpToGroupCommitments_C.push(items.actualsUpToRbe);
        beLastYearProposedGroupCommitments_C.push(items.lastRbeProposed);
        beLastYearFixedGroupCommitments_C.push(items.lastRbeFixed);
      }
    });


    // Commitments A
    actualsGroupCommitments_A.forEach((element) => {
      this.actualsCommitments_A += element
    });
    beRbeGroupCommitments_A.forEach((element) => {
      this.rbeCommitments_A += element
    });
    beRbeGroupPreviousCommitments_A.forEach((element) => {
      this.rbePreviousCommitments_A += element
    });
    actualsUpToGroupCommitments_A.forEach((element) => {
      this.actualUpToCommitments_A += element
    });
    beLastYearProposedGroupCommitments_A.forEach((element) => {
      this.beProposedCommitments_A += element
    });
    beLastYearFixedGroupCommitments_A.forEach((element) => {
      this.beFixedCommitments_A += element
    });
    console.log(actualsGroupCommitments_A, 'actualsGroupCommitments_A');


    // Commitments B
    actualsGroupCommitments_B.forEach((element) => {
      this.actualsCommitments_B += element
    });
    beRbeGroupCommitments_B.forEach((element) => {
      this.rbeCommitments_B += element
    });
    beRbeGroupPreviousCommitments_B.forEach((element) => {
      this.rbePreviousCommitments_B += element
    });
    actualsUpToGroupCommitments_B.forEach((element) => {
      this.actualUpToCommitments_B += element
    });
    beLastYearProposedGroupCommitments_B.forEach((element) => {
      this.beProposedCommitments_B += element
    });
    beLastYearFixedGroupCommitments_B.forEach((element) => {
      this.beFixedCommitments_B += element
    });

    // Commitments C
    actualsGroupCommitments_C.forEach((element) => {
      this.actualsCommitments_C += element
    });
    beRbeGroupCommitments_C.forEach((element) => {
      this.rbeCommitments_C += element
    });
    beRbeGroupPreviousCommitments_C.forEach((element) => {
      this.rbePreviousCommitments_C += element
    });
    actualsUpToGroupCommitments_C.forEach((element) => {
      this.actualUpToCommitments_C += element
    });
    beLastYearProposedGroupCommitments_C.forEach((element) => {
      this.beProposedCommitments_C += element
    });
    beLastYearFixedGroupCommitments_C.forEach((element) => {
      this.beFixedCommitments_C += element
    });

    this.actualsResourceTotal = this.actualsResource_A + this.actualsResource_B + this.actualsResource_C;
    this.actualsCommitmentsTotal = this.actualsCommitments_A + this.actualsCommitments_B + this.actualsCommitments_C;

    this.rbeResourceTotal = this.rbeResource_A + this.rbeResource_B + this.rbeResource_C;
    this.rbeCommitmentsTotal = this.rbeCommitments_A + this.rbeCommitments_B + this.rbeCommitments_C;

    this.rbePreviousResourceTotal = this.rbePreviousResource_A + this.rbePreviousResource_B + this.rbePreviousResource_C;
    this.rbePerviousCommitmentsTotal = this.rbePreviousCommitments_A + this.rbePreviousCommitments_B + this.rbePreviousCommitments_C;

    this.actualUpToResourceTotal = this.actualUpToResource_A + this.actualUpToResource_B + this.actualUpToResource_C;
    this.actualUpToCommitmentsTotal = this.actualUpToCommitments_A + this.actualUpToCommitments_B + this.actualUpToCommitments_C;

    this.proposedResourceTotal = this.beProposedResource_A + this.beProposedResource_B + this.beProposedResource_C;
    this.proposedCommitmentsTotal = this.beProposedCommitments_A + this.beProposedCommitments_B + this.beProposedCommitments_C;

    this.fixedResourceTotal = this.beFixedResource_A + this.beFixedResource_B + this.beFixedResource_C;
    this.fixedCommitmentsTotal = this.beFixedCommitments_A + this.beFixedCommitments_B + this.beFixedCommitments_C;

    this.actualOverAllTotal = this.actualsResourceTotal + this.actualsCommitmentsTotal;
    this.beRbeOverAllTotal = this.rbeResourceTotal + this.rbeCommitmentsTotal;
    this.beRbePerviousOverAllTotal = this.rbePreviousResourceTotal + this.rbePerviousCommitmentsTotal;
    this.actualUpToOverAllTotal = this.actualUpToResourceTotal + this.actualUpToCommitmentsTotal;
    this.proposedOverAllTotal = this.proposedResourceTotal + this.proposedCommitmentsTotal;
    this.fixedOverAllTotal = this.fixedResourceTotal + this.fixedCommitmentsTotal
  }

  workBeCalculation() {
    // Resource calculation
    let actualsGroupResource_A: any[] = [];
    let beRbeGroupResource_A: any[] = [];
    let beRbeGroupPreviousResource_A: any[] = [];
    let actualsUpToGroupResource_A: any[] = [];
    let beLastYearProposedGroupResource_A: any[] = [];
    let beLastYearFixedGroupResource_A: any[] = [];

    let actualsGroupResource_B: any[] = [];
    let beRbeGroupResource_B: any[] = [];
    let beRbeGroupPreviousResource_B: any[] = [];
    let actualsUpToGroupResource_B: any[] = [];
    let beLastYearProposedGroupResource_B: any[] = [];
    let beLastYearFixedGroupResource_B: any[] = [];

    let actualsGroupResource_C: any[] = [];
    let beRbeGroupResource_C: any[] = [];
    let beRbeGroupPreviousResource_C: any[] = [];
    let actualsUpToGroupResource_C: any[] = [];
    let beLastYearProposedGroupResource_C: any[] = [];
    let beLastYearFixedGroupResource_C: any[] = [];

    this.actualsResource_A = 0;
    this.actualsResource_B = 0;
    this.actualsResource_C = 0;
    this.actualsResource_Others = 0;

    this.rbeResource_A = 0;
    this.rbeResource_B = 0;
    this.rbeResource_C = 0;
    this.rbeResource_Others = 0;

    this.rbePreviousResource_A = 0;
    this.rbePreviousResource_B = 0;
    this.rbePreviousResource_C = 0;
    this.rbePreviousResource_Others = 0;

    this.actualUpToResource_A = 0;
    this.actualUpToResource_B = 0;
    this.actualUpToResource_C = 0;
    this.actualUpToResource_Others = 0;

    this.beProposedResource_A = 0;
    this.beProposedResource_B = 0;
    this.beProposedResource_C = 0;
    this.beProposedResource_Others = 0;

    this.beFixedResource_A = 0;
    this.beFixedResource_B = 0;
    this.beFixedResource_C = 0;
    this.beFixedResource_Others = 0;

    //  adding all resources total A
    console.log(this.allSubGroupsResource_A, 'allSubGroupsResource_A');
    console.log(this.allSubGroupsResource_B, 'allSubGroupsResource_B');
    console.log(this.allSubGroupsResource_C, 'allSubGroupsResource_C');

    // resources A
    this.allSubGroupsResource_A.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          // resources A
          actualsGroupResource_A.push(element.actuals);
          beRbeGroupPreviousResource_A.push(element.previousRbe);
          beRbeGroupResource_A.push(element.rbe);
          actualsUpToGroupResource_A.push(element.actualsUpTo);
          beLastYearProposedGroupResource_A.push(element.beLastYearProposed);
          beLastYearFixedGroupResource_A.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupResource_A.push(items.actuals);
        beRbeGroupPreviousResource_A.push(items.previousRbe);
        beRbeGroupResource_A.push(items.rbe);
        actualsUpToGroupResource_A.push(items.actualsUpTo);
        beLastYearProposedGroupResource_A.push(items.beLastYearProposed);
        beLastYearFixedGroupResource_A.push(items.beLastYearFixed);

      }
    });

    // resources B
    this.allSubGroupsResource_B.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupResource_B.push(element.actuals);
          beRbeGroupPreviousResource_B.push(element.previousRbe);
          beRbeGroupResource_B.push(element.rbe);
          actualsUpToGroupResource_B.push(element.actualsUpTo);
          beLastYearProposedGroupResource_B.push(element.beLastYearProposed);
          beLastYearFixedGroupResource_B.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupResource_B.push(items.actuals);
        beRbeGroupPreviousResource_B.push(items.previousRbe);
        beRbeGroupResource_B.push(items.rbe);
        actualsUpToGroupResource_B.push(items.actualsUpTo);
        beLastYearProposedGroupResource_B.push(items.beLastYearProposed);
        beLastYearFixedGroupResource_B.push(items.beLastYearFixed);
      }
    });

    // resources C
    this.allSubGroupsResource_C.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupResource_C.push(element.actuals);
          beRbeGroupPreviousResource_C.push(element.previousRbe);
          beRbeGroupResource_C.push(element.rbe);
          actualsUpToGroupResource_C.push(element.actualsUpTo);
          beLastYearProposedGroupResource_C.push(element.beLastYearProposed);
          beLastYearFixedGroupResource_C.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupResource_C.push(items.actuals);
        beRbeGroupPreviousResource_A.push(items.previousRbe);
        beRbeGroupResource_C.push(items.rbe);
        actualsUpToGroupResource_C.push(items.actualsUpTo);
        beLastYearProposedGroupResource_C.push(items.beLastYearProposed);
        beLastYearFixedGroupResource_C.push(items.beLastYearFixed);
      }
    });

    // Resource A

    actualsGroupResource_A.forEach((element) => {
      this.actualsResource_A += element
    });
    beRbeGroupResource_A.forEach((element) => {
      this.rbeResource_A += element
    });
    beRbeGroupPreviousResource_A.forEach((element) => {
      this.rbePreviousResource_A += element
    });
    actualsUpToGroupResource_A.forEach((element) => {
      this.actualUpToResource_A += element
    });
    beLastYearProposedGroupResource_A.forEach((element) => {
      this.beProposedResource_A += element
    });
    beLastYearFixedGroupResource_A.forEach((element) => {
      this.beFixedResource_A += element
    });

    // Resource B
    actualsGroupResource_B.forEach((element) => {
      this.actualsResource_B += element
    });
    beRbeGroupPreviousResource_B.forEach((element) => {
      this.rbePreviousResource_B += element
    });
    beRbeGroupResource_B.forEach((element) => {
      this.rbeResource_B += element
    });
    actualsUpToGroupResource_B.forEach((element) => {
      this.actualUpToResource_B += element
    });
    beLastYearProposedGroupResource_B.forEach((element) => {
      this.beProposedResource_B += element
    });
    beLastYearFixedGroupResource_B.forEach((element) => {
      this.beFixedResource_B += element
    });

    // Resource C
    actualsGroupResource_C.forEach((element) => {
      this.actualsResource_C += element
    });
    beRbeGroupPreviousResource_C.forEach((element) => {
      this.rbePreviousResource_C += element
    });
    beRbeGroupResource_C.forEach((element) => {
      this.rbeResource_C += element
    });
    actualsUpToGroupResource_C.forEach((element) => {
      this.actualUpToResource_C += element
    });
    beLastYearProposedGroupResource_C.forEach((element) => {
      this.beProposedResource_C += element
    });
    beLastYearFixedGroupResource_C.forEach((element) => {
      this.beFixedResource_C += element
    });

    this.actualsResourceTotal = this.actualsResource_A + this.actualsResource_B + this.actualsResource_C;
    this.rbeResourceTotal = this.rbeResource_A + this.rbeResource_B + this.rbeResource_C;
    this.rbePreviousResourceTotal = this.rbePreviousResource_A + this.rbePreviousResource_B + this.rbePreviousResource_C
    this.actualUpToResourceTotal = this.actualUpToResource_A + this.actualUpToResource_B + this.actualUpToResource_C;
    this.proposedResourceTotal = this.beProposedResource_A + this.beProposedResource_B + this.beProposedResource_C;
    this.fixedResourceTotal = this.beFixedResource_A + this.beFixedResource_B + this.beFixedResource_C;

  }

  workRbeCalculation() {
    // Resource calculation
    let actualsGroupResource_A: any[] = [];
    let beRbeGroupResource_A: any[] = [];
    let beRbeGroupPreviousResource_A: any[] = [];
    let actualsUpToGroupResource_A: any[] = [];
    let beLastYearProposedGroupResource_A: any[] = [];
    let beLastYearFixedGroupResource_A: any[] = [];

    let actualsGroupResource_B: any[] = [];
    let beRbeGroupResource_B: any[] = [];
    let beRbeGroupPreviousResource_B: any[] = [];
    let actualsUpToGroupResource_B: any[] = [];
    let beLastYearProposedGroupResource_B: any[] = [];
    let beLastYearFixedGroupResource_B: any[] = [];

    let actualsGroupResource_C: any[] = [];
    let beRbeGroupResource_C: any[] = [];
    let beRbeGroupPreviousResource_C: any[] = [];
    let actualsUpToGroupResource_C: any[] = [];
    let beLastYearProposedGroupResource_C: any[] = [];
    let beLastYearFixedGroupResource_C: any[] = [];

    this.actualsResource_A = 0;
    this.actualsResource_B = 0;
    this.actualsResource_C = 0;
    this.actualsResource_Others = 0;

    this.rbePreviousResource_A = 0;
    this.rbePreviousResource_B = 0;
    this.rbePreviousResource_C = 0;
    this.rbePreviousResource_Others = 0;

    this.rbeResource_A = 0;
    this.rbeResource_B = 0;
    this.rbeResource_C = 0;
    this.rbeResource_Others = 0;

    this.actualUpToResource_A = 0;
    this.actualUpToResource_B = 0;
    this.actualUpToResource_C = 0;
    this.actualUpToResource_Others = 0;

    this.beProposedResource_A = 0;
    this.beProposedResource_B = 0;
    this.beProposedResource_C = 0;
    this.beProposedResource_Others = 0;

    this.beFixedResource_A = 0;
    this.beFixedResource_B = 0;
    this.beFixedResource_C = 0;
    this.beFixedResource_Others = 0;

    //  adding all resources total A
    console.log(this.allSubGroupsResource_A, 'allSubGroupsResource_A');
    console.log(this.allSubGroupsResource_B, 'allSubGroupsResource_B');
    console.log(this.allSubGroupsResource_C, 'allSubGroupsResource_C');

    // resources A
    this.allSubGroupsResource_A.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          // resources A
          actualsGroupResource_A.push(element.actuals);
          beRbeGroupPreviousResource_A.push(element.previousBeRbe);
          beRbeGroupResource_A.push(element.rbe);
          actualsUpToGroupResource_A.push(element.actualsUpTo);
          beLastYearProposedGroupResource_A.push(element.beLastYearProposed);
          beLastYearFixedGroupResource_A.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupResource_A.push(items.actuals);
        beRbeGroupPreviousResource_A.push(items.previousBeRbe);
        beRbeGroupResource_A.push(items.rbe);
        actualsUpToGroupResource_A.push(items.actualsUpTo);
        beLastYearProposedGroupResource_A.push(items.beLastYearProposed);
        beLastYearFixedGroupResource_A.push(items.beLastYearFixed);

      }
    });

    // resources B
    this.allSubGroupsResource_B.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupResource_B.push(element.actuals);
          beRbeGroupResource_B.push(element.rbe);
          beRbeGroupPreviousResource_B.push(element.previousBeRbe);
          actualsUpToGroupResource_B.push(element.actualsUpTo);
          beLastYearProposedGroupResource_B.push(element.beLastYearProposed);
          beLastYearFixedGroupResource_B.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupResource_B.push(items.actuals);
        beRbeGroupResource_B.push(items.rbe);
        beRbeGroupPreviousResource_B.push(items.previousBeRbe);
        actualsUpToGroupResource_B.push(items.actualsUpTo);
        beLastYearProposedGroupResource_B.push(items.beLastYearProposed);
        beLastYearFixedGroupResource_B.push(items.beLastYearFixed);
      }
    });

    // resources C
    this.allSubGroupsResource_C.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          actualsGroupResource_C.push(element.actuals);
          beRbeGroupResource_C.push(element.rbe);
          beRbeGroupPreviousResource_C.push(element.previousBeRbe);
          actualsUpToGroupResource_C.push(element.actualsUpTo);
          beLastYearProposedGroupResource_C.push(element.beLastYearProposed);
          beLastYearFixedGroupResource_C.push(element.beLastYearFixed);
        });
      }
      else {
        actualsGroupResource_C.push(items.actuals);
        beRbeGroupResource_C.push(items.rbe);
        beRbeGroupPreviousResource_C.push(items.previousBeRbe);
        actualsUpToGroupResource_C.push(items.actualsUpTo);
        beLastYearProposedGroupResource_C.push(items.beLastYearProposed);
        beLastYearFixedGroupResource_C.push(items.beLastYearFixed);
      }
    });

    // Resource A

    actualsGroupResource_A.forEach((element) => {
      this.actualsResource_A += element
    });
    beRbeGroupResource_A.forEach((element) => {
      this.rbeResource_A += element
    });
    beRbeGroupPreviousResource_A.forEach((element) => {
      this.rbePreviousResource_A += element
    });
    actualsUpToGroupResource_A.forEach((element) => {
      this.actualUpToResource_A += element
    });
    beLastYearProposedGroupResource_A.forEach((element) => {
      this.beProposedResource_A += element
    });
    beLastYearFixedGroupResource_A.forEach((element) => {
      this.beFixedResource_A += element
    });

    // Resource B
    actualsGroupResource_B.forEach((element) => {
      this.actualsResource_B += element
    });
    beRbeGroupPreviousResource_B.forEach((element) => {
      this.rbePreviousResource_B += element
    });
    beRbeGroupResource_B.forEach((element) => {
      this.rbeResource_B += element
    });
    actualsUpToGroupResource_B.forEach((element) => {
      this.actualUpToResource_B += element
    });
    beLastYearProposedGroupResource_B.forEach((element) => {
      this.beProposedResource_B += element
    });
    beLastYearFixedGroupResource_B.forEach((element) => {
      this.beFixedResource_B += element
    });

    // Resource C
    actualsGroupResource_C.forEach((element) => {
      this.actualsResource_C += element
    });
    beRbeGroupResource_C.forEach((element) => {
      this.rbeResource_C += element
    });
    beRbeGroupPreviousResource_C.forEach((element) => {
      this.rbePreviousResource_C += element
    });
    actualsUpToGroupResource_C.forEach((element) => {
      this.actualUpToResource_C += element
    });
    beLastYearProposedGroupResource_C.forEach((element) => {
      this.beProposedResource_C += element
    });
    beLastYearFixedGroupResource_C.forEach((element) => {
      this.beFixedResource_C += element
    });

    this.actualsResourceTotal = this.actualsResource_A + this.actualsResource_B + this.actualsResource_C;
    this.rbeResourceTotal = this.rbeResource_A + this.rbeResource_B + this.rbeResource_C;
    this.rbePreviousResourceTotal = this.rbePreviousResource_A + this.rbePreviousResource_B + this.rbePreviousResource_C
    this.actualUpToResourceTotal = this.actualUpToResource_A + this.actualUpToResource_B + this.actualUpToResource_C;
    this.proposedResourceTotal = this.beProposedResource_A + this.beProposedResource_B + this.beProposedResource_C;
    this.fixedResourceTotal = this.beFixedResource_A + this.beFixedResource_B + this.beFixedResource_C;

  }

  backButtonClick() {
    this.router.navigate(['/famodule/home/cash-works']);
  }

  budgetSplitUpPopUp(bedto: any, beRbe: any) {
    if (bedto == null || bedto == undefined) {
      this.snackbar.open('No Data Found', 'Close', { duration: 3000 });
    }
    else {
      let dialogBox = this.dialog.open(BugdetSplitUpForConsolidationComponent, {
        width: '2000px',
        height: '500px',
        disableClose: true,
        data: {
          splitUp: bedto,
          beRbe: beRbe,
          flow: this.budgetType
        }
      })
    }
  }

  cashToWorkRoute(year: string, beRbe: any) {
    this.router.navigate([`/famodule/home/create-cash-works/work/${year}/${beRbe}`]);
  }
}
