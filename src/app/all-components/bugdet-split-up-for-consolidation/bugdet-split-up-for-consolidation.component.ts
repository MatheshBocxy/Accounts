import { Component, Inject, OnInit } from '@angular/core';
import { ApiservicesService } from '../../service/apiservices.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenSubGroupInConsolidationComponent } from '../open-sub-group-in-consolidation/open-sub-group-in-consolidation.component';

@Component({
  selector: 'app-bugdet-split-up-for-consolidation',
  templateUrl: './bugdet-split-up-for-consolidation.component.html',
  styleUrl: './bugdet-split-up-for-consolidation.component.css'
})
export class BugdetSplitUpForConsolidationComponent implements OnInit {
  actualyear: any = '';
  beRbeYear: any = '';
  actualUpToYear: any = '';
  beRbeLastYear: any = '';

  proposedYear: any;
  fixedYear: any;

  actualTotal: number = 0;
  beRbeTotal: number = 0;
  actualUpToTotal: number = 0;
  proposedTotal: number = 0;
  fixedTotal: number = 0;
  budgetHead: any;

  beFixed: number = 0;
  asBeFixed: number = 0;
  totalFixed: number = 0;
  asBeProposed: number = 0;

  constructor(
    private apiCall: ApiservicesService,
    private dialogRef: MatDialogRef<BugdetSplitUpForConsolidationComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.data.splitUp);

    this.getYears();
    this.allOverTotal();
  }

  getYears() {
    this.budgetHead = this.data.splitUp[0]?.code.budgetHead
    if (this.data.beRbe == 'BE') {
      this.actualyear = this.data.splitUp[0].actualsYear
      this.beRbeYear = this.data.splitUp[0].rbeYear
      this.actualUpToYear = this.data.splitUp[0].actualsUpToYear
      this.beRbeLastYear = this.data.splitUp[0].beLastYear
    }
    else if ((this.data.beRbe == 'RBE')) {
      this.actualyear = this.data.splitUp[0].actualsYearRbe
      this.beRbeYear = this.data.splitUp[0].beYearRbe
      this.actualUpToYear = this.data.splitUp[0].actualsUpToYearRbe
      this.beRbeLastYear = this.data.splitUp[0].rbeYear
    }
    else if ((this.data.beRbe == 'AS-BE')) {
      this.beRbeLastYear = this.data.splitUp[0].beLastYear
    }
    else if ((this.data.beRbe == 'AS-RBE')) {
      this.beRbeLastYear = this.data.splitUp[0].rbeYear
    }
  }

  allOverTotal() {
    if (this.data.beRbe == 'BE') {
      this.data.splitUp.forEach(element => {
        this.actualTotal += element.actuals
        this.beRbeTotal += element.rbe
        this.actualUpToTotal += element.actualsUpTo
        this.proposedTotal += element.beLastYearProposed
        this.fixedTotal += element.beLastYearFixed
      });
    }
    else if (this.data.beRbe == 'RBE') {
      this.data.splitUp.forEach(element => {
        this.actualTotal += element.actualsRbe
        this.beRbeTotal += element.beRbe
        this.actualUpToTotal += element.actualsUpToRbe
        this.proposedTotal += element.lastRbeProposed
        this.fixedTotal += element.lastRbeFixed
      });
    }
    else if (this.data.beRbe == 'AS-BE') {
      this.data.splitUp.forEach(element => {
        this.beFixed += element.beLastFixed
        this.asBeProposed += element.asBeProposed
        this.asBeFixed += element.asBeFixed
        this.totalFixed += (parseInt(element.beLastFixed) + parseInt(element.asBeFixed))
      });
    }
    else if (this.data.beRbe == 'AS-RBE') {
      this.data.splitUp.forEach(element => {
        this.beFixed += element.rbeLastFixed
        this.asBeProposed += element.asRbeProposed
        this.asBeFixed += element.asRbeFixed
        this.totalFixed += (parseInt(element.rbeLastFixed) + parseInt(element.asRbeFixed))
      });
    }

  }

  subCodePopUp(subCode: any, beRbe: any) {
    let subCodeValue: any;
    if (beRbe == 'BE') {
      subCodeValue = subCode.subCodeBES
    }
    else if (beRbe == 'RBE') {
      subCodeValue = subCode.subCodeRBES
    }
    else if (beRbe == 'AS-BE') {
      subCodeValue = subCode.subCodeASBES
    }
    else if (beRbe == 'AS-RBE') {
      subCodeValue = subCode.subCodeASRBES
    }
    if (subCodeValue == null || subCodeValue == undefined || subCodeValue.length == 0) {
      this.snackbar.open('No Data Found', 'Close', { duration: 3000 });
    } else {
      let openDialogBox = this.dialog.open(OpenSubGroupInConsolidationComponent, {
        width: '1000px',
        height: '450px',
        disableClose: true,
        data: {
          subCode: subCode,
          beRbe: beRbe,
        }
      });
    }

  }

}
