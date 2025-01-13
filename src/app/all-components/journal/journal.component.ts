import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent implements OnInit {
  allGstDataSource = new MatTableDataSource<any>();
  gstTableColumns: string[] = ['S.No', 'userDivision', 'jvNo', 'jvDate', 'totalDebit', 'totalCredit', 'ACTION'];
  id: any;

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  userDivision: string;
  division: string;

  constructor(
    private apiCall: ApiservicesService,
    private router: Router,
    private deleteDialog: MatDialog,

  ) {
    // this.division = sessionStorage.getItem('division');
    // console.log("bwegyue",this.division);
    
    // this.division = sessionStorage.getItem('role');
  }

  ngOnInit() {
    this.getAllJVtableData();
  }

  // getAllJVtableData() {
  //   this.apiCall.apiPostCall('api/journal/getAll', {}).subscribe(
  //     (response) => {
  //       console.log(response);
  
  //       if (response.responseStatus && response.responseObject) {
  //         const division = sessionStorage.getItem('division'); 
  
  //         response.responseObject.forEach((entry: any) => {
  //           entry.userDivision = division; 
  //         });
  
  //         console.log('Modified response data:', response.responseObject);
  
  //         // this.allGstDataSource.paginator = this.paginator; // Assign paginator
  //         this.allGstDataSource.sort = this.sort; 
  //       } else {
  //         console.error('Unexpected response format:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
  
  getAllJVtableData() {
    this.apiCall.apiPostCall('api/journal/getAll', {}).subscribe(
      (response) => {
        console.log(response);
  
        if (response && response.responseStatus && response.responseObject) {
          const division = sessionStorage.getItem('division');
  
          response.responseObject.forEach((entry: any) => {
            entry.userDivision = division;
  
            if (entry.jvDate) {
              const [day, month, year] = entry.jvDate.split('-');
              entry.jvDate = new Date(`${year}-${month}-${day}`).toISOString();
            }
          });
  
          console.log('Modified response data:', response.responseObject);
  
          this.allGstDataSource.data = response.responseObject;
          this.allGstDataSource.sort = this.sort;
          this.allGstDataSource.paginator = this.paginatior; // Assign paginator
        } else {
          console.error('Unexpected response format or null response:', response);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
    

  editmode(mode: string, id: number) {
    this.router.navigate(['/famodule/home/jv-listView', mode, id]);
  }

  viewmode(mode: string, id: number) {
    this.router.navigate(['/famodule/home/jv-listView', mode, id]);
  }

 

  



}
