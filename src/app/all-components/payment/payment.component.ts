import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {


  allPaymentData: any;
  budgetAllocationValue: any;
  paymentForm: FormGroup;
  panelOpenState = false;
  division: string;
  role: string;
  Pending = 'Pending'

  constructor(
    private apiCall: ApiservicesService,
    private router: Router,
    private deleteDialog: MatDialog,
  ) {
    this.division = sessionStorage.getItem('division');
    this.role = sessionStorage.getItem('role');
  }

  ngOnInit() {
    // this.getAllPaymentData();
    this.getTableData();
    console.log(this.division);
  }

  saPaymentDataSource = new MatTableDataSource<any>();
  soPaymentDataSource = new MatTableDataSource<any>();
  asPaymentDataSource = new MatTableDataSource<any>();
  dsPaymentDataSource = new MatTableDataSource<any>();
  spoPaymentDataSource = new MatTableDataSource<any>();
  daPaymentDataSource = new MatTableDataSource<any>();
  dcaoPaymentDataSource = new MatTableDataSource<any>();
  faPaymentDataSource = new MatTableDataSource<any>();
  aroPaymentDataSource=new MatTableDataSource<any>();
  aoPaymentDataSource = new MatTableDataSource<any>();

  sapaymentTableColumns: string[] = ['S.No', 'payment', 'head', 'group', 'payment1', 'payment2', 'status', 'ACTION'];
  sopaymentTableColumns: string[] = ['S.No', 'payment', 'head', 'group', 'payment1', 'payment2', 'status', 'ACTION'];
  aspaymentTableColumns: string[] = ['S.No', 'payment', 'head', 'group', 'payment1', 'payment2', 'status', 'ACTION'];
  dspaymentTableColumns: string[] = ['S.No', 'payment', 'head', 'group', 'payment1', 'payment2', 'status', 'ACTION'];
  spopaymentTableColumns: string[] = ['S.No', 'payment', 'head', 'group', 'payment1', 'payment2', 'status', 'ACTION'];
  dapaymentTableColumns: string[] = ['S.No', 'payment', 'head', 'group', 'payment1', 'payment2', 'status', 'ACTION'];
  dcaopaymentTableColumns: string[] = ['S.No', 'payment', 'head', 'group', 'payment1', 'payment2', 'status', 'ACTION'];
  fapaymentTableColumns: string[] = ['S.No', 'payment', 'head', 'group', 'payment1', 'payment2', 'status', 'ACTION'];
  aroPaymentTableColumns: string[] = ['S.No', 'payment', 'head', 'group', 'payment1', 'payment2', 'status', 'ACTION'];


  aopaymentTableColumns: string[] = ['S.No', 'payment', 'head', 'group', 'payment1', 'payment2', 'status', 'ACTION'];

  id: any;

  // getAllPaymentData() {
  //   let payload
  //   if (this.division != 'Head_office') {
  //     if (this.role == 'Assistant_Division' || this.role == 'Assistant2_Division') {
  //       payload = {
  //         division: this.division,
  //         divisionUser: this.role,
  //         billRiseMember: this.role,
 
  //       }
  //       console.log('bill number');
        
  //     } else {
  //       payload = {
  //         division: this.division,
  //         divisionUser: this.role,
  //         billRiseMember: '',
  //       }
  //     }
  //   } else {
  //     if (this.role == 'DA_Head_office' || this.role == 'SA_Head_office') {
  //       payload = {
  //         division: this.division,
  //         divisionUser: this.role,
  //         billRiseMember: this.role,
  //       }
  //     } else {
  //       payload = {
  //         division: this.division,
  //         divisionUser: this.role,
  //         billRiseMember: '',
  //       }
  //     }

  //   }
  //   this.apiCall.apiPostCall('finance/getAllPayment', payload).subscribe(
  //     (responce) => {
  //       this.allPaymentData = responce.data
  //       console.log(this.allPaymentData);
  //       this.saPaymentDataSource.data = responce.data
  //       this.soPaymentDataSource.data = responce.data
  //       this.asPaymentDataSource.data = responce.data
  //       this.dsPaymentDataSource.data = responce.data
  //       this.spoPaymentDataSource.data = responce.data
  //       this.daPaymentDataSource.data = responce.data
  //       this.dcaoPaymentDataSource.data = responce.data
  //       this.faPaymentDataSource.data = responce.data


  //       this.aoPaymentDataSource.data = responce.data
  //     },
  //     (err) => {
  //       console.error(err.message);
  //     });
  // }

  editMethod(mode: string, id: number) {
    this.router.navigate(['/famodule/home/payment-list-view/', mode, id]);
  }
  viewMethod(mode: string, id: number) {
    this.router.navigate(['/famodule/home/payment-list-view/', mode, id]);
  }

  openDelete(id) {
    const dilogRef = this.deleteDialog.open(DeletePopupComponent, {
      width: '290px',
      height: '140px',
    });
    dilogRef.afterClosed().subscribe(data => {
      if (data) {
        this.apiCall.apiDeleteCall('finance/deletePayment/', id).subscribe(data => {
          console.log("Data deleted successfully" + id)
          // this.getAllPaymentData()
        });
      }
    });
  }
  getTableData() {
    this.apiCall.apiPostCall('api/payment/getAll', {}).subscribe((data) => {
      console.log("data for table", data);
      this.aroPaymentDataSource = data.responseObject;  
      console.log("dataaaaaaaaaaaaa",this.aroPaymentDataSource);
      
    });
  }
}
