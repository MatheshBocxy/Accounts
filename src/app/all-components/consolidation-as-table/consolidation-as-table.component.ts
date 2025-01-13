import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BugdetSplitUpForConsolidationComponent } from '../bugdet-split-up-for-consolidation/bugdet-split-up-for-consolidation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consolidation-as-table',
  templateUrl: './consolidation-as-table.component.html',
  styleUrl: './consolidation-as-table.component.css'
})
export class ConsolidationAsTableComponent implements OnInit {
  paramsValue: any;
  CashFlow: boolean;
  WorkFlow: boolean;
  be: boolean;
  rbe: boolean;

  asBeRbeYears: any;
  asBeConsolidationCashValue: any;

  allConsolidationCash_BE: any

  filteredResources_A: any;
  filteredResources_B: any;
  filteredResources_C: any;
  filteredResources_Others: any;

  filteredWork_A: any;
  filteredWork_B: any;
  filteredWork_C: any;
  filteredWork_Others: any;

  filteredCommitments_A: any;
  filteredCommitments_B: any;
  filteredCommitments_C: any;
  filteredCommitments_Others: any;

  consolidationResourceValues_A: any;
  consolidationResourceValues_B: any;
  consolidationResourceValues_C: any;
  consolidationResourceValues_Others: any;

  consolidationWorkValues_A: any;
  consolidationWorkValues_B: any;
  consolidationWorkValues_C: any;
  consolidationWorkValues_Others: any;

  consolidationCommitmentsValues_A: any;
  consolidationCommitmentsValues_B: any;
  consolidationCommitmentsValues_C: any;
  consolidationCommitmentsValues_Others: any;

  allSubGroupsResource_A: any[] = [];
  allSubGroupsResource_B: any[] = [];
  allSubGroupsResource_C: any[] = [];
  allSubGroupsResource_Others: any[] = [];

  allSubGroupsWork_A: any[] = [];
  allSubGroupsWork_B: any[] = [];
  allSubGroupsWork_C: any[] = [];
  allSubGroupsWork_Others: any[] = [];

  allSubGroupsCommitments_A: any[] = [];
  allSubGroupsCommitments_B: any[] = [];
  allSubGroupsCommitments_C: any[] = [];
  allSubGroupsCommitments_Others: any[] = [];

  allResourceSubGroup_A = [];
  allResourceSubGroup_B = [];
  allResourceSubGroup_C = [];

  allWorkSubGroup_A = [];
  allWorkSubGroup_B = [];
  allWorkSubGroup_C = [];

  allCommitmentsSubGroup_A = [];
  allCommitmentsSubGroup_B = [];
  allCommitmentsSubGroup_C = [];

  fixedResource_A: number = 0;
  fixedResource_B: number = 0;
  fixedResource_C: number = 0;

  fixedWorkTotal_A: number = 0;
  fixedWorkTotal_B: number = 0;
  fixedWorkTotal_C: number = 0;

  fixedCommitments_A: number = 0;
  fixedCommitments_B: number = 0;
  fixedCommitments_C: number = 0;

  asProposedResource_A: number = 0;
  asProposedResource_B: number = 0;
  asProposedResource_C: number = 0;

  asProposedCommitments_A: number = 0;
  asProposedCommitments_B: number = 0;
  asProposedCommitments_C: number = 0;

  asProposedWorkTotal_A: number = 0;
  asProposedWorkTotal_B: number = 0;
  asProposedWorkTotal_C: number = 0;

  asFixedResource_A: number = 0;
  asFixedResource_B: number = 0;
  asFixedResource_C: number = 0;

  asFixedCommitments_A: number = 0;
  asFixedCommitments_B: number = 0;
  asFixedCommitments_C: number = 0;

  asFixedWorkTotal_A: number = 0;
  asFixedWorkTotal_B: number = 0;
  asFixedWorkTotal_C: number = 0;

  fixedResourceTotal: number = 0;
  asProposedResourceTotal: number = 0;
  asFixedResourceTotal: number = 0;

  fixedCommitmentsTotal: number = 0;
  asProposedCommitmentsTotal: number = 0;
  asFixedCommitmentsTotal: number = 0;

  fixedWorkTotal: number = 0;
  asProposedWorkTotal: number = 0;
  asFixedWorkTotal: number = 0;

  fixedAllTotal: number = 0;
  asProposedAllTotal: number = 0;
  asFixedAllTotal: number = 0;
  lenthOfCommitments_C: any;

  fixedTotalWork: any;
  asProposedTotalWork: any;
  asFixedTotalWork: any;

  allDivisions: any;
  loginDivision: any;
  loginRole: any;
  isPreviousBeRbe: boolean;
  selectedDivision = 'All';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiCall: ApiservicesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.loginDivision = sessionStorage.getItem('division');
    this.loginRole = sessionStorage.getItem('role');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params, 'params');
      this.paramsValue = params
      this.asBeRbeYears = this.paramsValue.year
      this.getAllBudget();
    });
    this.getAllDivision();
  }

  backButtonClick() {
    this.router.navigate(['/famodule/home/consolidationAs']);
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
      this.getAllBudget();
    }
    if (event.target.value && this.paramsValue.beRbe == 'BE') {
      if (this.paramsValue.budgetType == 'Cash Budget') {
        this.cashBudgetAsBE();
        this.calculateCash();
      }
      else {
        this.workBudgetAsBE();
        this.calculateWork();
      }
    }
    else if (event.target.value && this.paramsValue.beRbe == 'RBE') {
      if (this.paramsValue.budgetType == 'Cash Budget') {
        this.cashBudgetAsRBE();
        this.calculateCash();
      }
      else {
        this.workBudgetAsRBE();
        this.calculateWork();
      }
    }
  }

  getAllBudget() {

    if (this.paramsValue.beRbe == 'BE') {
      if (this.paramsValue.budgetType == 'Cash Budget') {
        this.CashFlow = true;
        this.WorkFlow = false;
        this.be = true;
        this.rbe = false;
        var params: { [key: string]: string } = {}
        params['budgetType'] = this.paramsValue.budgetType;
        this.apiCall.apiPostCall_Query(`api/budget/getBudgetGroupWise`, params).subscribe(
          (response) => {
            this.allConsolidationCash_BE = response.responseObject
            console.log(this.allConsolidationCash_BE, 'this.allConsolidationCash_BE');
            this.filteredResources_A = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'A' && item.mainGroup === 'Resources');

            this.filteredResources_B = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'B' && item.mainGroup === 'Resources');

            this.filteredResources_C = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'C' && item.mainGroup === 'Resources');

            this.filteredResources_Others = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'Others' && item.mainGroup === 'Resources');
            console.log(this.filteredResources_A, 'this.filteredResources_A');
            console.log(this.filteredResources_B, 'this.filteredResources_B');
            console.log(this.filteredResources_C, 'this.filteredResources_C');
            console.log(this.filteredResources_Others, 'this.filteredResources_Others');

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
            if (response) {
              this.cashBudgetAsBE();
              this.listWorkBE();
            }
          }
        );
      }
      else if (this.paramsValue.budgetType == 'Work Budget') {
        this.CashFlow = false;
        this.WorkFlow = true;
        this.be = true;
        this.rbe = false;
        var params: { [key: string]: string } = {}
        params['budgetType'] = this.paramsValue.budgetType;
        this.apiCall.apiPostCall_Query(`api/budget/getBudgetGroupWise`, params).subscribe(
          (response) => {
            this.allConsolidationCash_BE = response.responseObject;

            this.filteredResources_A = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'A' && item.mainGroup === 'A.Capital Outlay');

            this.filteredResources_B = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'B' && item.mainGroup === 'B.Deposit-Works');

            this.filteredResources_C = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'C' && item.mainGroup === 'C.Revenue');
            console.log(this.filteredResources_A, 'filteredResources_A');
            console.log(this.filteredResources_B, 'filteredResources_B');
            console.log(this.filteredResources_C, 'filteredResources_C');
            if (response) {
              this.workBudgetAsBE();
            }
          }
        );

      }
    }

    else if (this.paramsValue.beRbe == 'RBE') {
      if (this.paramsValue.budgetType == 'Cash Budget') {
        this.CashFlow = true;
        this.WorkFlow = false;
        this.be = false;
        this.rbe = true;
        var params: { [key: string]: string } = {}
        params['budgetType'] = this.paramsValue.budgetType;
        this.apiCall.apiPostCall_Query(`api/budget/getBudgetGroupWise`, params).subscribe(
          (response) => {
            this.allConsolidationCash_BE = response.responseObject
            console.log(this.allConsolidationCash_BE, 'this.allConsolidationCash_BE');
            this.filteredResources_A = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'A' && item.mainGroup === 'Resources');

            this.filteredResources_B = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'B' && item.mainGroup === 'Resources');

            this.filteredResources_C = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'C' && item.mainGroup === 'Resources');

            this.filteredResources_Others = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'Others' && item.mainGroup === 'Resources');
            console.log(this.filteredResources_A, 'this.filteredResources_A');
            console.log(this.filteredResources_B, 'this.filteredResources_B');
            console.log(this.filteredResources_C, 'this.filteredResources_C');
            console.log(this.filteredResources_Others, 'this.filteredResources_Others');

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

            this.cashBudgetAsRBE();
            this.listWorkRBE();
          }
        );
      }
      else if (this.paramsValue.budgetType == 'Work Budget') {
        this.CashFlow = false;
        this.WorkFlow = true;
        this.be = false;
        this.rbe = true;
        var params: { [key: string]: string } = {}
        params['budgetType'] = this.paramsValue.budgetType;
        this.apiCall.apiPostCall_Query(`api/budget/getBudgetGroupWise`, params).subscribe(
          (response) => {
            this.allConsolidationCash_BE = response.responseObject;

            this.filteredResources_A = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'A' && item.mainGroup === 'A.Capital Outlay');

            this.filteredResources_B = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'B' && item.mainGroup === 'B.Deposit-Works');

            this.filteredResources_C = this.allConsolidationCash_BE.filter(
              (item) => item.groupTotal === 'C' && item.mainGroup === 'C.Revenue');
            console.log(this.filteredResources_A, 'filteredResources_A');
            console.log(this.filteredResources_B, 'filteredResources_B');
            console.log(this.filteredResources_C, 'filteredResources_C');
            if (response) {
              this.workBudgetAsRBE();
            }
          }
        );
      }
    }

  }

  cashBudgetAsBE() {

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

    var param: { [key: string]: string } = {}
    param['budgetType'] = 'Cash Budget'
    param['beLastYear'] = this.paramsValue.year;

    if (this.loginDivision != 'Head_office') {
      param['division'] = this.loginDivision;
    }
    else {
      if (this.selectedDivision != 'All') {
        param['division'] = this.selectedDivision;
      }
    }

    var previousParam: { [key: string]: string } = {}
    previousParam['budgetType'] = 'Cash Budget'
    previousParam['beLastYear'] = this.getPreviousYearRange(this.paramsValue.year)

    if (this.loginDivision != 'Head_office') {
      previousParam['division'] = this.loginDivision;
    }
    else {
      if (this.selectedDivision != 'All') {
        previousParam['division'] = this.selectedDivision;
      }
    }

    this.apiCall.apiPostCall_beRbe(`api/asbe/getAllConsolidationView`, param).subscribe(
      (viewResponse) => {


        this.consolidationResourceValues_A = viewResponse.responseObject.filter(x => x.groupTotal === 'A' && x.mainGroup === 'Resources');
        this.consolidationResourceValues_B = viewResponse.responseObject.filter(x => x.groupTotal === 'B' && x.mainGroup === 'Resources');
        this.consolidationResourceValues_C = viewResponse.responseObject.filter(x => x.groupTotal === 'C' && x.mainGroup === 'Resources');

        this.consolidationCommitmentsValues_A = viewResponse.responseObject.filter(x => x.groupTotal === 'A' && x.mainGroup === 'Commitments');
        this.consolidationCommitmentsValues_B = viewResponse.responseObject.filter(x => x.groupTotal === 'B' && x.mainGroup === 'Commitments');
        this.consolidationCommitmentsValues_C = viewResponse.responseObject.filter(x => x.groupTotal === 'C' && x.mainGroup === 'Commitments');

        console.log(this.consolidationResourceValues_A, 'consolidationResourceValues_A');
        console.log(this.consolidationResourceValues_B, 'consolidationResourceValues_B');
        console.log(this.consolidationResourceValues_C, 'consolidationResourceValues_C');

        console.log(this.consolidationCommitmentsValues_A, 'consolidationCommitmentsValues_A');
        console.log(this.consolidationCommitmentsValues_B, 'consolidationCommitmentsValues_B');
        console.log(this.consolidationCommitmentsValues_C, 'consolidationCommitmentsValues_C');
        // Resource A Patch skull
        this.filteredResources_A.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,

          }));
          this.allSubGroupsResource_A.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allResourceSubGroup_A.push(...subGroups);
          console.log(this.allResourceSubGroup_A, 'this.allResourceSubGroup_A');
          console.log(this.allSubGroupsResource_A, 'this.allSubGroupsResource_A');
        });
        // Resource B Patch skull
        this.filteredResources_B.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,

          }));
          this.allSubGroupsResource_B.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allResourceSubGroup_B.push(...subGroups);
          console.log(this.allResourceSubGroup_B, 'this.allResourceSubGroup_B');
          console.log(this.allSubGroupsResource_B, 'this.allSubGroupsResource_B');
        });
        // Resource C Patch skull
        this.filteredResources_C.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsResource_C.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allResourceSubGroup_C.push(...subGroups);
          console.log(this.allResourceSubGroup_C, 'this.allResourceSubGroup_C');
          console.log(this.allSubGroupsResource_C, 'this.allSubGroupsResource_C');
        });

        // Resource A Patch Request values

        this.consolidationResourceValues_A.forEach(element => {
          let mainGroupMatch = this.allSubGroupsResource_A.find(group =>
            group.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()
          );

          this.allSubGroupsResource_A.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                subGroupItem.fixed = element.beLastFixed;
                subGroupItem.asProposed = element.asBeProposed;
                subGroupItem.asFixed = element.asBeFixed;
                subGroupItem.subCodeBES = element.subCodeBES;
                subGroupItem.status = element.status;
                subGroupItem.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.beLastFixed;
            mainGroupMatch.asProposed = element.asBeProposed;
            mainGroupMatch.asFixed = element.asBeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeBES;
            mainGroupMatch.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });

        // Resource B Patch Request values

        this.consolidationResourceValues_B.forEach(element => {
          let mainGroupMatch = this.allSubGroupsResource_B.find(group =>
            group.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()
          );

          this.allSubGroupsResource_B.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                subGroupItem.fixed = element.beLastFixed;
                subGroupItem.asProposed = element.asBeProposed;
                subGroupItem.asFixed = element.asBeFixed;
                subGroupItem.subCodeBES = element.subCodeBES;
                subGroupItem.status = element.status;
                subGroupItem.remarks = element.remarks;
                subGroupItem.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.beLastFixed;
            mainGroupMatch.asProposed = element.asBeProposed;
            mainGroupMatch.asFixed = element.asBeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeBES;
            mainGroupMatch.remarks = element.remarks;
            mainGroupMatch.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });

        // Resource C Patch Request values

        this.consolidationResourceValues_C.forEach(element => {
          let mainGroupMatch = this.allSubGroupsResource_C.find(group =>
            group.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()
          );

          this.allSubGroupsResource_C.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                subGroupItem.fixed = element.beLastFixed;
                subGroupItem.asProposed = element.asBeProposed;
                subGroupItem.asFixed = element.asBeFixed;
                subGroupItem.subCodeBES = element.subCodeBES;
                subGroupItem.status = element.status;
                subGroupItem.remarks = element.remarks;
                subGroupItem.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.beLastFixed;
            mainGroupMatch.asProposed = element.asBeProposed;
            mainGroupMatch.asFixed = element.asBeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeBES;
            mainGroupMatch.remarks = element.remarks;
            mainGroupMatch.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });

        // Commitments A patch Skull

        this.filteredCommitments_A.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsCommitments_A.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allCommitmentsSubGroup_A.push(...subGroups);
          console.log(this.allCommitmentsSubGroup_A, 'this.allCommitmentsSubGroup_A');
          console.log(this.allSubGroupsCommitments_A, 'this.allSubGroupsCommitments_A');
        });

        // Commitments B patch Skull

        this.filteredCommitments_B.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsCommitments_B.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allCommitmentsSubGroup_B.push(...subGroups);
          console.log(this.allCommitmentsSubGroup_B, 'this.allCommitmentsSubGroup_B');
          console.log(this.allSubGroupsCommitments_B, 'this.allSubGroupsCommitments_B');
        });

        // Commitments C patch Skull

        this.filteredCommitments_C.forEach((element) => {
          if (element.group != 'Works expenditure & Maintenance') {
            let subGroups = element.subGroup.map(sub => ({
              heading: sub,
              fixed: null,
              asProposed: null,
              asFixed: null,
              status: null,
              subCodeBES: null,
              remarks: null,
              fixedTotal: null,
              asBeRbeDto: null,
            }));
            this.allSubGroupsCommitments_C.push({
              heading: element.group,
              subGroup: subGroups,
              status: null,
              fixed: null,
              asProposed: null,
              asFixed: null,
              subCodeBES: null,
              remarks: null,
              fixedTotal: null,
              asBeRbeDto: null,
            });
            this.allCommitmentsSubGroup_C.push(...subGroups);

          }
          console.log(this.allCommitmentsSubGroup_C, 'this.allCommitmentsSubGroup_C');
          console.log(this.allSubGroupsCommitments_C, 'this.allSubGroupsCommitments_C');
        });


        // Commitments A Patch Request values

        this.consolidationCommitmentsValues_A?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsCommitments_A.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHead?.trim().toLowerCase()
          );

          this.allSubGroupsCommitments_A.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHead?.trim().toLowerCase()) {
                subGroupItem.fixed = element.beLastFixed;
                subGroupItem.asProposed = element.asBeProposed;
                subGroupItem.asFixed = element.asBeFixed;
                subGroupItem.subCodeBES = element.subCodeBES;
                subGroupItem.status = element.status;
                subGroupItem.remarks = element.remarks;
                subGroupItem.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.beLastFixed;
            mainGroupMatch.asProposed = element.asBeProposed;
            mainGroupMatch.asFixed = element.asBeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeBES;
            mainGroupMatch.remarks = element.remarks;
            mainGroupMatch.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });

        // Commitments B Patch Request values

        this.consolidationCommitmentsValues_B?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsCommitments_B.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHead?.trim().toLowerCase()
          );

          this.allSubGroupsCommitments_B.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHead?.trim().toLowerCase()) {
                subGroupItem.fixed = element.beLastFixed;
                subGroupItem.asProposed = element.asBeProposed;
                subGroupItem.asFixed = element.asBeFixed;
                subGroupItem.subCodeBES = element.subCodeBES;
                subGroupItem.status = element.status;
                subGroupItem.remarks = element.remarks;
                subGroupItem.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.beLastFixed;
            mainGroupMatch.asProposed = element.asBeProposed;
            mainGroupMatch.asFixed = element.asBeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeBES;
            mainGroupMatch.remarks = element.remarks;
            mainGroupMatch.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });

        // Commitments C Patch Request values

        this.consolidationCommitmentsValues_C?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsCommitments_C.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHead?.trim().toLowerCase()
          );

          this.allSubGroupsCommitments_C.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHead?.trim().toLowerCase()) {
                subGroupItem.fixed = element.beLastFixed;
                subGroupItem.asProposed = element.asBeProposed;
                subGroupItem.asFixed = element.asBeFixed;
                subGroupItem.subCodeBES = element.subCodeBES;
                subGroupItem.status = element.status;
                subGroupItem.remarks = element.remarks;
                subGroupItem.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.beLastFixed;
            mainGroupMatch.asProposed = element.asBeProposed;
            mainGroupMatch.asFixed = element.asBeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeBES;
            mainGroupMatch.remarks = element.remarks;
            mainGroupMatch.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });

        this.calculateCash();
        this.lengthOfWorkapi();

      }
    );
  }

  cashBudgetAsRBE() {

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

    var param: { [key: string]: string } = {}
    param['budgetType'] = 'Cash Budget'
    param['beLastYear'] = this.paramsValue.year

    if (this.loginDivision != 'Head_office') {
      param['division'] = this.loginDivision;
    }
    else {
      if (this.selectedDivision != 'All') {
        param['division'] = this.selectedDivision;
      }
    }
    this.apiCall.apiPostCall_beRbe(`api/asrbe/getAllConsolidationView`, param).subscribe(
      (viewResponse) => {
        console.log(viewResponse);
        this.asBeConsolidationCashValue = viewResponse.responseObject

        this.consolidationResourceValues_A = viewResponse.responseObject.filter(x => x.groupTotalRBE === 'A' && x.mainGroupRBE === 'Resources');
        this.consolidationResourceValues_B = viewResponse.responseObject.filter(x => x.groupTotalRBE === 'B' && x.mainGroupRBE === 'Resources');
        this.consolidationResourceValues_C = viewResponse.responseObject.filter(x => x.groupTotalRBE === 'C' && x.mainGroupRBE === 'Resources');

        this.consolidationCommitmentsValues_A = viewResponse.responseObject.filter(x => x.groupTotalRBE === 'A' && x.mainGroupRBE === 'Commitments');
        this.consolidationCommitmentsValues_B = viewResponse.responseObject.filter(x => x.groupTotalRBE === 'B' && x.mainGroupRBE === 'Commitments');
        this.consolidationCommitmentsValues_C = viewResponse.responseObject.filter(x => x.groupTotalRBE === 'C' && x.mainGroupRBE === 'Commitments');

        console.log(this.consolidationResourceValues_A, 'consolidationResourceValues_A');
        console.log(this.consolidationResourceValues_B, 'consolidationResourceValues_B');
        console.log(this.consolidationResourceValues_C, 'consolidationResourceValues_C');

        console.log(this.consolidationCommitmentsValues_A, 'consolidationCommitmentsValues_A');
        console.log(this.consolidationCommitmentsValues_B, 'consolidationCommitmentsValues_B');
        console.log(this.consolidationCommitmentsValues_C, 'consolidationCommitmentsValues_C');

        // Resource A Patch skull
        this.filteredResources_A.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsResource_A.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allResourceSubGroup_A.push(...subGroups);
          console.log(this.allResourceSubGroup_A, 'this.allResourceSubGroup_A');
          console.log(this.allSubGroupsResource_A, 'this.allSubGroupsResource_A');
        });
        // Resource B Patch skull
        this.filteredResources_B.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,

          }));
          this.allSubGroupsResource_B.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allResourceSubGroup_B.push(...subGroups);
          console.log(this.allResourceSubGroup_B, 'this.allResourceSubGroup_B');
          console.log(this.allSubGroupsResource_B, 'this.allSubGroupsResource_B');
        });
        // Resource C Patch skull
        this.filteredResources_C.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsResource_C.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allResourceSubGroup_C.push(...subGroups);
          console.log(this.allResourceSubGroup_C, 'this.allResourceSubGroup_C');
          console.log(this.allSubGroupsResource_C, 'this.allSubGroupsResource_C');
        });

        // Resource A Patch Request values
        this.consolidationResourceValues_A?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsResource_A.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()
          );

          this.allSubGroupsResource_A.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()) {
                subGroupItem.fixed = element.rbeLasFixed || 0;
                subGroupItem.asProposed = element.asRbeProposed || 0;
                subGroupItem.asFixed = element.asRbeFixed || 0;
                subGroupItem.subCodeBES = element.subCodeRBES || null;
                subGroupItem.status = element.status || null;
                subGroupItem.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.rbeLasFixed || 0;
            mainGroupMatch.asProposed = element.asRbeProposed || 0;
            mainGroupMatch.asFixed = element.asRbeFixed || 0;
            mainGroupMatch.status = element.status || null;
            mainGroupMatch.subCodeBES = element.subCodeRBES || null;
            mainGroupMatch.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });
        // Resource B Patch Request values
        this.consolidationResourceValues_B?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsResource_B.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()
          );

          this.allSubGroupsResource_B.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()) {
                subGroupItem.fixed = element.rbeLasFixed || 0;
                subGroupItem.asProposed = element.asRbeProposed || 0;
                subGroupItem.asFixed = element.asRbeFixed || 0;
                subGroupItem.subCodeBES = element.subCodeRBES || null;
                subGroupItem.status = element.status || null;
                subGroupItem.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.rbeLasFixed || 0;
            mainGroupMatch.asProposed = element.asRbeProposed || 0;
            mainGroupMatch.asFixed = element.asRbeFixed || 0;
            mainGroupMatch.status = element.status || null;
            mainGroupMatch.subCodeBES = element.subCodeRBES || null;
            mainGroupMatch.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });
        // Resource C Patch Request values
        this.consolidationResourceValues_C?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsResource_C.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()
          );

          this.allSubGroupsResource_C.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()) {
                subGroupItem.fixed = element.rbeLasFixed || 0;
                subGroupItem.asProposed = element.asRbeProposed || 0;
                subGroupItem.asFixed = element.asRbeFixed || 0;
                subGroupItem.subCodeBES = element.subCodeRBES || null;
                subGroupItem.status = element.status || null;
                subGroupItem.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.rbeLasFixed || 0;
            mainGroupMatch.asProposed = element.asRbeProposed || 0;
            mainGroupMatch.asFixed = element.asRbeFixed || 0;
            mainGroupMatch.status = element.status || null;
            mainGroupMatch.subCodeBES = element.subCodeRBES || null;
            mainGroupMatch.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });

        // Commitments A patch Skull
        this.filteredCommitments_A.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsCommitments_A.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allCommitmentsSubGroup_A.push(...subGroups);
          console.log(this.allCommitmentsSubGroup_A, 'this.allCommitmentsSubGroup_A');
          console.log(this.allSubGroupsCommitments_A, 'this.allSubGroupsCommitments_A');
        });
        // Commitments B patch Skull
        this.filteredCommitments_B.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsCommitments_B.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allCommitmentsSubGroup_B.push(...subGroups);
          console.log(this.allCommitmentsSubGroup_B, 'this.allCommitmentsSubGroup_B');
          console.log(this.allSubGroupsCommitments_B, 'this.allSubGroupsCommitments_B');
        });
        // Commitments C patch Skull
        this.filteredCommitments_C.forEach((element) => {
          if (element.group != 'Works expenditure & Maintenance') {
            let subGroups = element.subGroup.map(sub => ({
              heading: sub,
              fixed: null,
              asProposed: null,
              asFixed: null,
              status: null,
              subCodeBES: null,
              remarks: null,
              fixedTotal: null,
              asBeRbeDto: null,
            }));
            this.allSubGroupsCommitments_C.push({
              heading: element.group,
              subGroup: subGroups,
              status: null,
              fixed: null,
              asProposed: null,
              asFixed: null,
              subCodeBES: null,
              remarks: null,
              fixedTotal: null,
              asBeRbeDto: null,
            });
            this.allCommitmentsSubGroup_C.push(...subGroups);
          }
          console.log(this.allCommitmentsSubGroup_C, 'this.allCommitmentsSubGroup_C');
          console.log(this.allSubGroupsCommitments_C, 'this.allSubGroupsCommitments_C');
        });


        // Commitments A Patch Request values

        this.consolidationCommitmentsValues_A?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsCommitments_A.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()
          );

          this.allSubGroupsCommitments_A.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()) {
                subGroupItem.fixed = element.rbeLasFixed || 0;
                subGroupItem.asProposed = element.asRbeProposed || 0;
                subGroupItem.asFixed = element.asRbeFixed || 0;
                subGroupItem.subCodeBES = element.subCodeRBES || null;
                subGroupItem.status = element.status || null;
                subGroupItem.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.rbeLasFixed || 0;
            mainGroupMatch.asProposed = element.asRbeProposed || 0;
            mainGroupMatch.asFixed = element.asRbeFixed || 0;
            mainGroupMatch.status = element.status || null;
            mainGroupMatch.subCodeBES = element.subCodeRBES || null;
            mainGroupMatch.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });

        // Commitments B Patch Request values

        this.consolidationCommitmentsValues_B?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsCommitments_B.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()
          );

          this.allSubGroupsCommitments_B.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()) {
                subGroupItem.fixed = element.rbeLasFixed || 0;
                subGroupItem.asProposed = element.asRbeProposed || 0;
                subGroupItem.asFixed = element.asRbeFixed || 0;
                subGroupItem.subCodeBES = element.subCodeRBES || null;
                subGroupItem.status = element.status || null;
                subGroupItem.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.rbeLasFixed || 0;
            mainGroupMatch.asProposed = element.asRbeProposed || 0;
            mainGroupMatch.asFixed = element.asRbeFixed || 0;
            mainGroupMatch.status = element.status || null;
            mainGroupMatch.subCodeBES = element.subCodeRBES || null;
            mainGroupMatch.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });

        // Commitments C Patch Request values

        this.consolidationCommitmentsValues_C?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsCommitments_C.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()
          );

          this.allSubGroupsCommitments_C.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()) {
                subGroupItem.fixed = element.rbeLasFixed || 0;
                subGroupItem.asProposed = element.asRbeProposed || 0;
                subGroupItem.asFixed = element.asRbeFixed || 0;
                subGroupItem.subCodeBES = element.subCodeRBES || null;
                subGroupItem.status = element.status || null;
                subGroupItem.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.rbeLasFixed || 0;
            mainGroupMatch.asProposed = element.asRbeProposed || 0;
            mainGroupMatch.asFixed = element.asRbeFixed || 0;
            mainGroupMatch.status = element.status || null;
            mainGroupMatch.subCodeBES = element.subCodeRBES || null;
            mainGroupMatch.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });

        this.calculateCash();
        this.lengthOfWorkapi();

      }
    );
  }

  workBudgetAsBE() {
    this.consolidationWorkValues_A = [];
    this.consolidationWorkValues_B = [];
    this.consolidationWorkValues_C = [];

    this.allSubGroupsWork_A = [];
    this.allSubGroupsWork_B = [];
    this.allSubGroupsWork_C = [];

    var param: { [key: string]: string } = {}
    param['budgetType'] = 'Work Budget';
    param['beLastYear'] = this.paramsValue.year

    if (this.loginDivision != 'Head_office') {
      param['division'] = this.loginDivision;
    }
    else {
      if (this.selectedDivision != 'All') {
        param['division'] = this.selectedDivision;
      }
    }

    this.apiCall.apiPostCall_beRbe(`api/asbe/getAllConsolidationView`, param).subscribe(
      (viewResponse) => {
        console.log(viewResponse);
        this.asBeConsolidationCashValue = viewResponse.responseObject

        this.consolidationWorkValues_A = viewResponse.responseObject.filter(x => x.groupTotal === 'A' && x.mainGroup === 'A.Capital Outlay');
        this.consolidationWorkValues_B = viewResponse.responseObject.filter(x => x.groupTotal === 'B' && x.mainGroup === 'B.Deposit-Works');
        this.consolidationWorkValues_C = viewResponse.responseObject.filter(x => x.groupTotal === 'C' && x.mainGroup === 'C.Revenue');

        console.log(this.consolidationWorkValues_A, 'this.consolidationWorkValues_A');
        console.log(this.consolidationWorkValues_B, 'this.consolidationWorkValues_B');
        console.log(this.consolidationWorkValues_C, 'this.consolidationWorkValues_C');

        // Work A Patch skull
        this.filteredResources_A.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsWork_A.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allWorkSubGroup_A.push(...subGroups);
          console.log(this.allResourceSubGroup_A, 'this.allResourceSubGroup_A');
          console.log(this.allSubGroupsWork_A, 'this.allSubGroupsWork_A');
        });
        // Work B Patch skull
        this.filteredResources_B.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,

          }));
          this.allSubGroupsWork_B.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allWorkSubGroup_B.push(...subGroups);
          console.log(this.allResourceSubGroup_B, 'this.allResourceSubGroup_B');
          console.log(this.allSubGroupsResource_B, 'this.allSubGroupsResource_B');
        });
        // Work C Patch skull
        this.filteredResources_C.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsWork_C.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allWorkSubGroup_C.push(...subGroups);
          console.log(this.allResourceSubGroup_C, 'this.allResourceSubGroup_C');
          console.log(this.allSubGroupsResource_C, 'this.allSubGroupsResource_C');
        });

        // Work A Patch Request values
        this.consolidationWorkValues_A.forEach(element => {
          let mainGroupMatch = this.allSubGroupsWork_A.find(group =>
            group.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()
          );

          this.allSubGroupsWork_A.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                subGroupItem.fixed = element.beLastFixed;
                subGroupItem.asProposed = element.asBeProposed;
                subGroupItem.asFixed = element.asBeFixed;
                subGroupItem.subCodeBES = element.subCodeBES;
                subGroupItem.status = element.status;
                subGroupItem.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.beLastFixed;
            mainGroupMatch.asProposed = element.asBeProposed;
            mainGroupMatch.asFixed = element.asBeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeBES;
            mainGroupMatch.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });
        // Work B Patch Request values
        this.consolidationWorkValues_B.forEach(element => {
          let mainGroupMatch = this.allSubGroupsWork_B.find(group =>
            group.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()
          );

          this.allSubGroupsWork_B.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                subGroupItem.fixed = element.beLastFixed;
                subGroupItem.asProposed = element.asBeProposed;
                subGroupItem.asFixed = element.asBeFixed;
                subGroupItem.subCodeBES = element.subCodeBES;
                subGroupItem.status = element.status;
                subGroupItem.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.beLastFixed;
            mainGroupMatch.asProposed = element.asBeProposed;
            mainGroupMatch.asFixed = element.asBeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeBES;
            mainGroupMatch.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });
        // Work C Patch Request values
        this.consolidationWorkValues_C.forEach(element => {
          let mainGroupMatch = this.allSubGroupsWork_C.find(group =>
            group.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()
          );

          this.allSubGroupsWork_C.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading.trim().toLowerCase() === element.budgetHead.trim().toLowerCase()) {
                subGroupItem.fixed = element.beLastFixed;
                subGroupItem.asProposed = element.asBeProposed;
                subGroupItem.asFixed = element.asBeFixed;
                subGroupItem.subCodeBES = element.subCodeBES;
                subGroupItem.status = element.status;
                subGroupItem.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.beLastFixed;
            mainGroupMatch.asProposed = element.asBeProposed;
            mainGroupMatch.asFixed = element.asBeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeBES;
            mainGroupMatch.fixedTotal = parseInt(element.beLastFixed) + parseInt(element.asBeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });
        this.calculateWork();
      }
    );
  }

  workBudgetAsRBE() {
    this.consolidationWorkValues_A = [];
    this.consolidationWorkValues_B = [];
    this.consolidationWorkValues_C = [];

    this.allSubGroupsWork_A = [];
    this.allSubGroupsWork_B = [];
    this.allSubGroupsWork_C = [];

    var param: { [key: string]: string } = {}
    param['budgetType'] = 'Work Budget';
    param['beLastYear'] = this.paramsValue.year

    if (this.loginDivision != 'Head_office') {
      param['division'] = this.loginDivision;
    }
    else {
      if (this.selectedDivision != 'All') {
        param['division'] = this.selectedDivision;
      }
    }

    this.apiCall.apiPostCall_beRbe(`api/asrbe/getAllConsolidationView`, param).subscribe(
      (viewResponse) => {
        console.log(viewResponse);
        this.asBeConsolidationCashValue = viewResponse.responseObject;

        this.consolidationWorkValues_A = viewResponse.responseObject.filter(x => x.groupTotalRBE === 'A' && x.mainGroupRBE === 'A.Capital Outlay');
        this.consolidationWorkValues_B = viewResponse.responseObject.filter(x => x.groupTotalRBE === 'B' && x.mainGroupRBE === 'B.Deposit-Works');
        this.consolidationWorkValues_C = viewResponse.responseObject.filter(x => x.groupTotalRBE === 'C' && x.mainGroupRBE === 'C.Revenue');

        console.log(this.consolidationWorkValues_A, 'this.consolidationWorkValues_A');
        console.log(this.consolidationWorkValues_B, 'this.consolidationWorkValues_B');
        console.log(this.consolidationWorkValues_C, 'this.consolidationWorkValues_C');

        // Work A Patch skull
        this.filteredResources_A.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsWork_A.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allWorkSubGroup_A.push(...subGroups);
          console.log(this.allSubGroupsWork_A, 'this.allSubGroupsWork_A');
          console.log(this.allWorkSubGroup_A, 'this.allWorkSubGroup_A');
        });
        // Work B Patch skull
        this.filteredResources_B.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,

          }));
          this.allSubGroupsWork_B.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allWorkSubGroup_B.push(...subGroups);
          console.log(this.allWorkSubGroup_B, 'this.allWorkSubGroup_B');
          console.log(this.allSubGroupsWork_B, 'this.allSubGroupsWork_B');
        });
        // Work C Patch skull
        this.filteredResources_C.forEach((element) => {
          let subGroups = element.subGroup.map(sub => ({
            heading: sub,
            fixed: null,
            asProposed: null,
            asFixed: null,
            status: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          }));
          this.allSubGroupsWork_C.push({
            heading: element.group,
            subGroup: subGroups,
            status: null,
            fixed: null,
            asProposed: null,
            asFixed: null,
            subCodeBES: null,
            remarks: null,
            fixedTotal: null,
            asBeRbeDto: null,
          });
          this.allWorkSubGroup_C.push(...subGroups);
          console.log(this.allWorkSubGroup_C, 'this.allWorkSubGroup_C');
          console.log(this.allSubGroupsWork_C, 'this.allSubGroupsWork_C');
        });


        // Work A Patch Request values
        this.consolidationWorkValues_A?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsWork_A.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()
          );

          this.allSubGroupsWork_A?.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()) {
                subGroupItem.fixed = element.rbeLasFixed;
                subGroupItem.asProposed = element.asRbeProposed;
                subGroupItem.asFixed = element.asRbeFixed;
                subGroupItem.subCodeBES = element.subCodeRBES;
                subGroupItem.status = element.status;
                subGroupItem.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.rbeLasFixed;
            mainGroupMatch.asProposed = element.asRbeProposed;
            mainGroupMatch.asFixed = element.asRbeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeRBES;
            mainGroupMatch.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });
        // Work B Patch Request values
        this.consolidationWorkValues_B?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsWork_B.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()
          );

          this.allSubGroupsWork_B?.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()) {
                subGroupItem.fixed = element.rbeLasFixed;
                subGroupItem.asProposed = element.asRbeProposed;
                subGroupItem.asFixed = element.asRbeFixed;
                subGroupItem.subCodeBES = element.subCodeRBES;
                subGroupItem.status = element.status;
                subGroupItem.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.rbeLasFixed;
            mainGroupMatch.asProposed = element.asRbeProposed;
            mainGroupMatch.asFixed = element.asRbeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeRBES;
            mainGroupMatch.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });
        // Work C Patch Request values
        this.consolidationWorkValues_C?.forEach(element => {
          let mainGroupMatch = this.allSubGroupsWork_C.find(group =>
            group.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()
          );

          this.allSubGroupsWork_C?.forEach(group => {
            group.subGroup.forEach(subGroupItem => {
              if (subGroupItem.heading?.trim().toLowerCase() === element.budgetHeadRBE?.trim().toLowerCase()) {
                subGroupItem.fixed = element.rbeLasFixed;
                subGroupItem.asProposed = element.asRbeProposed;
                subGroupItem.asFixed = element.asRbeFixed;
                subGroupItem.subCodeBES = element.subCodeRBES;
                subGroupItem.status = element.status;
                subGroupItem.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
                subGroupItem.asBeRbeDto = element.asBeRbeDto;
              }
            });
          });

          if (mainGroupMatch) {
            mainGroupMatch.fixed = element.rbeLasFixed;
            mainGroupMatch.asProposed = element.asRbeProposed;
            mainGroupMatch.asFixed = element.asRbeFixed;
            mainGroupMatch.status = element.status;
            mainGroupMatch.subCodeBES = element.subCodeRBES;
            mainGroupMatch.fixedTotal = parseInt(element.rbeLasFixed) + parseInt(element.asRbeFixed);
            mainGroupMatch.asBeRbeDto = element.asBeRbeDto;
          }
        });
        this.calculateWork();
      }
    );
  }

  calculateCash() {
    // Resource
    let beLastFixedResource_A: any[] = [];
    let asProposedResource_A: any[] = [];
    let asFixedResource_A: any[] = [];

    let beLastFixedResource_B: any[] = [];
    let asProposedResource_B: any[] = [];
    let asFixedResource_B: any[] = [];

    let beLastFixedResource_C: any[] = [];
    let asProposedResource_C: any[] = [];
    let asFixedResource_C: any[] = [];
    // commitments
    let beLastFixedCommitments_A: any[] = [];
    let asProposedCommitments_A: any[] = [];
    let asFixedCommitments_A: any[] = [];

    let beLastFixedCommitments_B: any[] = [];
    let asProposedCommitments_B: any[] = [];
    let asFixedCommitments_B: any[] = [];

    let beLastFixedCommitments_C: any[] = [];
    let asProposedCommitments_C: any[] = [];
    let asFixedCommitments_C: any[] = [];

    // Resource
    this.fixedResource_A = 0
    this.fixedResource_B = 0
    this.fixedResource_C = 0

    this.asProposedResource_A = 0
    this.asProposedResource_B = 0
    this.asProposedResource_C = 0

    this.asFixedResource_A = 0
    this.asFixedResource_B = 0
    this.asFixedResource_C = 0

    // Commitments
    this.fixedCommitments_A = 0
    this.fixedCommitments_B = 0
    this.fixedCommitments_C = 0

    this.asProposedCommitments_A = 0
    this.asProposedCommitments_B = 0
    this.asProposedCommitments_C = 0

    this.asFixedCommitments_A = 0
    this.asFixedCommitments_B = 0
    this.asFixedCommitments_C = 0

    console.log(this.allSubGroupsResource_A, 'allSubGroupsResource_A');
    console.log(this.allSubGroupsResource_B, 'allSubGroupsResource_B');
    console.log(this.allSubGroupsResource_C, 'allSubGroupsResource_C');
    // RESOURCE
    this.allSubGroupsResource_A.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          // resources A
          beLastFixedResource_A.push(element.fixed)
          asProposedResource_A.push(element.asProposed)
          asFixedResource_A.push(element.asFixed)
        });
      }
      else {
        beLastFixedResource_A.push(items.fixed)
        asProposedResource_A.push(items.asProposed)
        asFixedResource_A.push(items.asFixed)
      }
    });
    console.log(beLastFixedResource_A, 'beLastFixedResource_A');
    console.log(asProposedResource_A, 'asProposedResource_A');
    console.log(asFixedResource_A, 'beLastFixedResource_A');

    this.allSubGroupsResource_B.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          // resources A
          beLastFixedResource_B.push(element.fixed)
          asProposedResource_B.push(element.asProposed)
          asFixedResource_B.push(element.asFixed)
        });
      }
      else {
        beLastFixedResource_B.push(items.fixed)
        asProposedResource_B.push(items.asProposed)
        asFixedResource_B.push(items.asFixed)
      }
    });
    console.log(beLastFixedResource_B, 'beLastFixedResource_B');
    console.log(asProposedResource_B, 'asProposedResource_B');
    console.log(asFixedResource_B, 'beLastFixedResource_B');

    this.allSubGroupsResource_C.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          // resources A
          beLastFixedResource_C.push(element.fixed)
          asProposedResource_C.push(element.asProposed)
          asFixedResource_C.push(element.asFixed)
        });
      }
      else {
        beLastFixedResource_C.push(items.fixed)
        asProposedResource_C.push(items.asProposed)
        asFixedResource_C.push(items.asFixed)
      }
    });
    console.log(beLastFixedResource_C, 'beLastFixedResource_C');
    console.log(asProposedResource_C, 'asProposedResource_C');
    console.log(asFixedResource_C, 'beLastFixedResource_C');
    // res A
    beLastFixedResource_A.forEach((element) => {
      this.fixedResource_A += element
    });
    asProposedResource_A.forEach((element) => {
      this.asProposedResource_A += element
    });
    asFixedResource_A.forEach((element) => {
      this.asFixedResource_A += element
    });
    // res B
    beLastFixedResource_B.forEach((element) => {
      this.fixedResource_B += element
    });
    asProposedResource_B.forEach((element) => {
      this.asProposedResource_B += element
    });
    asFixedResource_B.forEach((element) => {
      this.asFixedResource_B += element
    });
    // res C
    beLastFixedResource_C.forEach((element) => {
      this.fixedResource_C += element
    });
    asProposedResource_C.forEach((element) => {
      this.asProposedResource_C += element
    });
    asFixedResource_C.forEach((element) => {
      this.asFixedResource_C += element
    });

    console.log(this.allSubGroupsCommitments_A, 'allSubGroupsCommitments_A');
    console.log(this.allSubGroupsCommitments_B, 'allSubGroupsCommitments_B');
    console.log(this.allSubGroupsCommitments_C, 'allSubGroupsCommitments_C');
    // COMMITMENTS
    this.allSubGroupsCommitments_A.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          beLastFixedCommitments_A.push(element.fixed)
          asProposedCommitments_A.push(element.asProposed)
          asFixedCommitments_A.push(element.asFixed)
        });
      }
      else {
        beLastFixedCommitments_A.push(items.fixed)
        asProposedCommitments_A.push(items.asProposed)
        asFixedCommitments_A.push(items.asFixed)
      }
    });
    console.log(beLastFixedCommitments_A, 'beLastFixedCommitments_A');
    console.log(asProposedCommitments_A, 'asProposedCommitments_A');
    console.log(asFixedCommitments_A, 'asFixedCommitments_A');

    this.allSubGroupsCommitments_B.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          beLastFixedCommitments_B.push(element.fixed)
          asProposedCommitments_B.push(element.asProposed)
          asFixedCommitments_B.push(element.asFixed)
        });
      }
      else {
        beLastFixedCommitments_B.push(items.fixed)
        asProposedCommitments_B.push(items.asProposed)
        asFixedCommitments_B.push(items.asFixed)
      }
    });
    console.log(beLastFixedCommitments_B, 'beLastFixedCommitments_B');
    console.log(asProposedCommitments_B, 'asProposedCommitments_B');
    console.log(asFixedCommitments_B, 'asFixedCommitments_B');

    this.allSubGroupsCommitments_C.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          // resources A
          beLastFixedCommitments_C.push(element.fixed)
          asProposedCommitments_C.push(element.asProposed)
          asFixedCommitments_C.push(element.asFixed)
        });
      }
      else {
        beLastFixedCommitments_C.push(items.fixed)
        asProposedCommitments_C.push(items.asProposed)
        asFixedCommitments_C.push(items.asFixed)
      }
    });
    console.log(beLastFixedCommitments_C, 'beLastFixedCommitments_C');
    console.log(asProposedCommitments_C, 'asProposedCommitments_C');
    console.log(asFixedCommitments_C, 'asFixedCommitments_C');
    // comm A
    beLastFixedCommitments_A.forEach((element) => {
      this.fixedCommitments_A += element
    });
    asProposedCommitments_A.forEach((element) => {
      this.asProposedCommitments_A += element
    });
    asFixedCommitments_A.forEach((element) => {
      this.asFixedCommitments_A += element
    });
    // Comm B
    beLastFixedCommitments_B.forEach((element) => {
      this.fixedCommitments_B += element
    });
    asProposedCommitments_B.forEach((element) => {
      this.asProposedCommitments_B += element
    });
    asFixedCommitments_B.forEach((element) => {
      this.asFixedCommitments_B += element
    });
    // comm C
    beLastFixedCommitments_C.forEach((element) => {
      this.fixedCommitments_C += element
    });
    asProposedCommitments_C.forEach((element) => {
      this.asProposedCommitments_C += element
    });
    asFixedCommitments_C.forEach((element) => {
      this.asFixedCommitments_C += element
    });

    this.fixedCommitments_C = this.fixedCommitments_C + this.fixedTotalWork;
    this.asProposedCommitments_C = this.asProposedCommitments_C + this.asProposedTotalWork;
    this.asFixedCommitments_C = this.asFixedCommitments_C + this.asFixedTotalWork;

    this.fixedResourceTotal = this.fixedResource_A + this.fixedResource_B + this.fixedResource_C
    this.asProposedResourceTotal = this.asProposedResource_A + this.asProposedResource_B + this.asProposedResource_C
    this.asFixedResourceTotal = this.asFixedResource_A + this.asFixedResource_B + this.asFixedResource_C

    this.fixedCommitmentsTotal = this.fixedCommitments_A + this.fixedCommitments_B + this.fixedCommitments_C
    this.asProposedCommitmentsTotal = this.asProposedCommitments_A + this.asProposedCommitments_B + this.asProposedCommitments_C
    this.asFixedCommitmentsTotal = this.asFixedCommitments_A + this.asFixedCommitments_B + this.asFixedCommitments_C

    this.fixedAllTotal = this.fixedResourceTotal + this.fixedCommitmentsTotal
    this.asProposedAllTotal = this.asProposedResourceTotal + this.asProposedCommitmentsTotal
    this.asFixedAllTotal = this.asFixedResourceTotal + this.asFixedCommitmentsTotal

  }

  calculateWork() {
    let beLastFixedWork_A: any[] = [];
    let asProposedWork_A: any[] = [];
    let asFixedWork_A: any[] = [];

    let beLastFixedWork_B: any[] = [];
    let asProposedWork_B: any[] = [];
    let asFixedWork_B: any[] = [];

    let beLastFixedWork_C: any[] = [];
    let asProposedWork_C: any[] = [];
    let asFixedWork_C: any[] = [];

    this.fixedWorkTotal_A = 0;
    this.fixedWorkTotal_B = 0;
    this.fixedWorkTotal_C = 0;

    this.asProposedWorkTotal_A = 0;
    this.asProposedWorkTotal_B = 0;
    this.asProposedWorkTotal_C = 0;

    this.asFixedWorkTotal_A = 0;
    this.asFixedWorkTotal_B = 0;
    this.asFixedWorkTotal_C = 0;

    console.log(this.allSubGroupsWork_A, 'allSubGroupsResource_A');
    console.log(this.allSubGroupsWork_B, 'allSubGroupsResource_B');
    console.log(this.allSubGroupsWork_C, 'allSubGroupsResource_C');

    this.allSubGroupsWork_A.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          beLastFixedWork_A.push(element.fixed)
          asProposedWork_A.push(element.asProposed)
          asFixedWork_A.push(element.asFixed)
        });
      }
      else {
        beLastFixedWork_A.push(items.fixed)
        asProposedWork_A.push(items.asProposed)
        asFixedWork_A.push(items.asFixed)
      }
    });
    console.log(beLastFixedWork_A, 'beLastFixedResource_A');
    console.log(asProposedWork_A, 'asProposedWork_A');
    console.log(asFixedWork_A, 'asFixedWork_A');

    this.allSubGroupsWork_B.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          // resources A
          beLastFixedWork_B.push(element.fixed)
          asProposedWork_B.push(element.asProposed)
          asFixedWork_B.push(element.asFixed)
        });
      }
      else {
        beLastFixedWork_B.push(items.fixed)
        asProposedWork_B.push(items.asProposed)
        asFixedWork_B.push(items.asFixed)
      }
    });
    console.log(beLastFixedWork_B, 'beLastFixedWork_B');
    console.log(asProposedWork_B, 'asProposedWork_B');
    console.log(asFixedWork_B, 'asFixedWork_B');

    this.allSubGroupsWork_C.forEach((items: any) => {
      if (items.subGroup.length !== 0) {
        items.subGroup.forEach((element) => {
          // resources A
          beLastFixedWork_C.push(element.fixed)
          asProposedWork_C.push(element.asProposed)
          asFixedWork_C.push(element.asFixed)
        });
      }
      else {
        beLastFixedWork_C.push(items.fixed)
        asProposedWork_C.push(items.asProposed)
        asFixedWork_C.push(items.asFixed)
      }
    });
    console.log(beLastFixedWork_C, 'beLastFixedWork_C');
    console.log(asProposedWork_C, 'asProposedWork_C');
    console.log(asFixedWork_C, 'asFixedWork_C');
    // Work A
    beLastFixedWork_A.forEach((element) => {
      this.fixedWorkTotal_A += element
    });
    asProposedWork_A.forEach((element) => {
      this.asProposedWorkTotal_A += element
    });
    asFixedWork_A.forEach((element) => {
      this.asFixedWorkTotal_A += element
    });
    // Work B
    beLastFixedWork_B.forEach((element) => {
      this.fixedWorkTotal_B += element
    });
    asProposedWork_B.forEach((element) => {
      this.asProposedWorkTotal_B += element
    });
    asFixedWork_B.forEach((element) => {
      this.asFixedWorkTotal_B += element
    });
    // Work C
    beLastFixedWork_C.forEach((element) => {
      this.fixedWorkTotal_C += element
    });
    asProposedWork_C.forEach((element) => {
      this.asProposedWorkTotal_C += element
    });
    asFixedWork_C.forEach((element) => {
      this.asFixedWorkTotal_C += element
    });

    this.fixedWorkTotal = this.fixedWorkTotal_A + this.fixedWorkTotal_B + this.fixedWorkTotal_C
    this.asProposedWorkTotal = this.asProposedWorkTotal_A + this.asProposedWorkTotal_B + this.asProposedWorkTotal_B
    this.asFixedWorkTotal = this.asFixedWorkTotal_A + this.asFixedWorkTotal_B + this.asFixedWorkTotal_C
  }

  lengthOfWorkapi() {
    this.lenthOfCommitments_C = this.allSubGroupsCommitments_C.length + 1
    console.log(this.lenthOfCommitments_C, 'this.lenthOfCommitments_C');
  }

  listWorkBE() {
    var param: { [key: string]: string } = {};
    param['budgetType'] = 'Work Budget';
    param['beLastYear'] = this.paramsValue.year
    this.apiCall.apiPostCall_beRbe(`api/asbe/getListViewBEConsolidation`, param).subscribe(
      (viewResponse) => {
        console.log(viewResponse.responseObject, 'viewResponse.responseObject BE');
        this.fixedTotalWork = viewResponse.responseObject[0].beLastFixedTotal
        this.asProposedTotalWork = viewResponse.responseObject[0].asBeProposedTotal
        this.asFixedTotalWork = viewResponse.responseObject[0].asBeFixedTotal
      }
    );
  }

  listWorkRBE() {
    var param: { [key: string]: string } = {};
    param['budgetType'] = 'Work Budget';
    param['rbeYear'] = this.paramsValue.year
    this.apiCall.apiPostCall_beRbe(`api/asrbe/getListViewRBEConsolidation`, param).subscribe(
      (viewResponse) => {
        console.log(viewResponse.responseObject, 'viewResponse.responseObject RBE');
        this.fixedTotalWork = viewResponse.responseObject[0].rbeLastFixedTotal
        this.asProposedTotalWork = viewResponse.responseObject[0].asRbeProposedTotal
        this.asFixedTotalWork = viewResponse.responseObject[0].asRbeFixedTotal
      }
    );
  }

  budgetSplitUpPopUp(asBeRbeDto: any, beRbe: any) {
    if (asBeRbeDto == null || asBeRbeDto == undefined) {
      this.snackbar.open('No Data Exit In This Budget', 'Close', { duration: 3000 });
    }
    else {
      let dialogBox = this.dialog.open(BugdetSplitUpForConsolidationComponent, {
        width: '2000px',
        height: '500px',
        disableClose: true,
        data: {
          splitUp: asBeRbeDto,
          beRbe: beRbe,
          flow: this.paramsValue.budgetType
        }
      })
    }
  }

  cashToWorkRoute(asBeRbe: string) {
    if (asBeRbe != null || asBeRbe != undefined || asBeRbe != '') {
      this.router.navigate([`/famodule/home/consolidationAsTable/Work Budget/${asBeRbe}/${this.paramsValue.year}`]);
    }
  }

}
