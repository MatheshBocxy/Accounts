import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-open-sub-group-in-consolidation',
  templateUrl: './open-sub-group-in-consolidation.component.html',
  styleUrl: './open-sub-group-in-consolidation.component.css'
})
export class OpenSubGroupInConsolidationComponent implements OnInit {
  actualyear: any;
  beRbeYear: any;
  actualUpToYear: any;
  beRbeLastYear: any;
  getAllData: any;

  constructor(
    private dialogRef: MatDialogRef<OpenSubGroupInConsolidationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    console.log(this.data.subCode);
    console.log(this.data, 'this.data');

    this.getAllData = this.data.subCode
    console.log(this.data.subCode.subCodeBES, 'subCodeBES');
    console.log(this.data.subCode.subCodeRBES, 'subCodeRBES');

    this.getYears()
  }

  getYears() {
    if (this.data.beRbe == 'BE') {
      this.actualyear = this.data.subCode.actualsYear
      this.beRbeYear = this.data.subCode.rbeYear
      this.actualUpToYear = this.data.subCode.actualsUpToYear
      this.beRbeLastYear = this.data.subCode.beLastYear
    }
    else if (this.data.beRbe == 'RBE') {
      this.actualyear = this.data.subCode.actualsYearRbe
      this.beRbeYear = this.data.subCode.beYearRbe
      this.actualUpToYear = this.data.subCode.actualsUpToYearRbe
      this.beRbeLastYear = this.data.subCode.rbeYear
    }
    else if (this.data.beRbe == 'AS-BE') {
      this.beRbeLastYear = this.data.subCode.beLastYear
    }
    else if (this.data.beRbe == 'AS-RBE') {
      this.beRbeLastYear = this.data.subCode.rbeYear
    }

  }

}
