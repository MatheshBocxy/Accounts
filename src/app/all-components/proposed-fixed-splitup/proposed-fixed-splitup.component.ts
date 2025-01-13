import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';

@Component({
  selector: 'app-proposed-fixed-splitup',
  templateUrl: './proposed-fixed-splitup.component.html',
  styleUrl: './proposed-fixed-splitup.component.css'
})
export class ProposedFixedSplitupComponent implements OnInit {
  loginDivision: string;
  loginRole: string;
  boxValues: any;
  revenueValue: any;
  workValue: any;
  adminValue: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiCall: ApiservicesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ProposedFixedSplitupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loginDivision = sessionStorage.getItem('division');
    this.loginRole = sessionStorage.getItem('role');
  }

  ngOnInit(): void {
    console.log(this.data, 'data');
    if (this.data.beRbe == 'BE') {
      this.beApiValues();
    }
    else {
      this.rbeApiValues();
    }
    this.boxValues = this.data.response;
  }

  // BE

  beApiValues() {
    var params: { [key: string]: string } = {};

    if (this.loginDivision != 'Head_office') {
      params['division'] = this.loginDivision;
    }
    params['beLastYear'] = this.data.response.beLastYear;
    params['roll'] = this.loginRole;

    this.apiCall.apiPostCall_beRbe(`api/be/getListViewBE`, params).subscribe(
      (res) => {
        console.log(res.responseObject);
        let revenue = res.responseObject.filter(r => r.creator == 'ARO_Division');
        let work = res.responseObject.filter(r => r.creator == 'AEE_Division');
        let admin = res.responseObject.filter(r => r.creator == 'ACC_Clerk');
        console.log(revenue, 'revenue');
        console.log(work, 'work');
        console.log(admin, 'admin');

        this.revenueValue = revenue[0]
        this.workValue = work[0]
        this.adminValue = admin[0]
      }
    );

  }

  // RBE

  rbeApiValues() {
    var params: { [key: string]: string } = {};

    if (this.loginDivision != 'Head_office') {
      params['division'] = this.loginDivision;
    }
    params['rbeYear'] = this.data.response.rbeYear;
    params['roll'] = this.loginRole;

    this.apiCall.apiPostCall_beRbe(`api/rbe/getListViewRBE`, params).subscribe(
      (res) => {
        console.log(res.responseObject);
        let revenue = res.responseObject.filter(r => r.creator == 'ARO_Division');
        let work = res.responseObject.filter(r => r.creator == 'AEE_Division');
        let admin = res.responseObject.filter(r => r.creator == 'ACC_Clerk');

        this.revenueValue = revenue[0]
        this.workValue = work[0]
        this.adminValue = admin[0]
      }
    );

  }

  goToviewPage(beRbe: string, year: string, type: string) {
    this.router.navigate([`/famodule/home/NewBudget-list-view/${this.loginDivision}/${beRbe}/view/${year}/${type}`]);
  }



}
