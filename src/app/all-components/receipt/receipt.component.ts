import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../../service/apiservices.service';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent implements OnInit {

  userDivision: any;
  userRole: any;
  filterByDivision: any[] = [];
  pageSize: number = 10;
  pageNo: number = 0;
  searchTerm: string;
  totalRecords: any;
  searchValue: any
  fromDateValue: string | null = null;
  toDateValue: string | null = null;
  divisionApi: any
  selectedOption: string | null = null;
  selectedValue: any
  constructor(
    private router: Router,
    private ActiveRoute: ActivatedRoute,
    private apiCall: ApiservicesService,
  ) {
    this.userDivision = sessionStorage.getItem('division');
    this.userRole = sessionStorage.getItem('role');
  }

  ngOnInit() {

    this.selectedOption = 'All'
    if (this.userDivision != 'Head_office') {
      this.getAllReceiptsData(this.pageNo, this.pageSize, this.userDivision);
    }
    else {
      this.getAllReceiptsData(this.pageNo, this.pageSize, this.selectedOption);
    }
    this.divisionDropDownFun();

  }

  allGstDataSource = new MatTableDataSource<any>([]);

  gstTableColumns: string[] = ['S.No', 'division', 'Date of receipt', 'Receipt No', 'Receipt For', 'Amount', 'ACTION'];
  id: any;

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  onPageChange(event: PageEvent): void {

    this.pageNo = event.pageIndex; // MatPaginator uses 0-based indexing
    this.pageSize = event.pageSize;

    let selectedDivision = '';
    if (this.selectedOption == 'Head_office') {
      selectedDivision = 'HO Cashier'
    }
    else {
      selectedDivision = this.selectedOption
    }

    // Fetch the data for the current page
    if (this.userDivision != 'Head_office') {
      this.getAllReceiptsData(this.pageNo, this.pageSize, this.userDivision, this.searchValue);
    }
    else {
      this.getAllReceiptsData(this.pageNo, this.pageSize, selectedDivision, this.searchValue);
    }

  }

  getAllReceiptsData(pageNo: number, pageSize: number, division: string, search?: string, fromDate?: string, toDate?: string): void {
    const params: any = {
      pageNo,
      pageSize,
      division,
    };

    if (search && search.trim() !== '') {
      params.search = search.trim();
    }
    if (fromDate) {
      params.fromDate = this.formatDateManually(fromDate);
    }
    if (toDate) {
      params.toDate = this.formatDateManually(toDate);
    }
    this.apiCall.apiGetCall_receipt('api/receipts/getAll', params).subscribe(
      (res: any) => {
        if (res && res.responseObject && res.responseObject.content) {
          this.totalRecords = res.responseObject.totalElements || 0;
          this.filterByDivision = res.responseObject.content;

          this.allGstDataSource = new MatTableDataSource(this.filterByDivision);
        } else {
          this.totalRecords = 0;
          this.filterByDivision = [];
          this.allGstDataSource = new MatTableDataSource([]);
        }
      },
      (err: any) => {
        console.error('Error fetching data:', err);
        this.totalRecords = 0;
        this.filterByDivision = [];
        this.allGstDataSource = new MatTableDataSource([]);
      }
    );
  }

  onFromDateChange() {
    this.toDateValue = null;
  }

  onToDateChange(): void {
    let selectedDivision = ''
    if (this.userDivision != 'Head_office') {
      this.getAllReceiptsData(
        this.paginatior?.pageIndex || 0,
        this.paginatior?.pageSize || 10,
        this.userDivision,
        undefined,
        this.fromDateValue,
        this.toDateValue
      );
    }
    else {
      if (this.selectedOption == 'Head_office') {
        selectedDivision = 'HO Cashier'
      }
      else {
        selectedDivision = this.selectedOption
      }

      this.getAllReceiptsData(
        this.paginatior?.pageIndex || 0,
        this.paginatior?.pageSize || 10,
        selectedDivision,
        undefined,
        this.fromDateValue,
        this.toDateValue
      );
    }

  }
  formatDateManually(date: any | null): any | null {
    if (!date) {
      return null;
    }

    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits for month
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`; // Combine as 'DD-MM-YYYY'
  }

  applyFilter(event: any): void {
    const searchValue = event.target.value.trim();
    console.log("value", searchValue)

    let selectedDivision = ''

    if (this.selectedOption == 'Head_office') {
      selectedDivision = 'HO Cashier'
    }
    else {
      selectedDivision = this.selectedOption
    }

    if (this.userDivision != 'Head_office') {
      this.getAllReceiptsData(
        this.paginatior?.pageIndex || 0,
        this.paginatior?.pageSize || 10,
        this.userDivision,
        searchValue,
        this.fromDateValue,
        this.toDateValue
      );
    }
    else {
      this.getAllReceiptsData(
        this.paginatior?.pageIndex || 0,
        this.paginatior?.pageSize || 10,
        selectedDivision,
        searchValue,
        this.fromDateValue,
        this.toDateValue
      );
    }

  }


  veiwReceipt(id: any) {
    this.router.navigate([`/famodule/home/create-receipt/${id}`]);
  }
  divisionDropDownFun() {
    this.apiCall.apiGetCall('api/user/getAllDivision').subscribe(
      (responce) => {
        this.divisionApi = ['All', ...responce.responseObject];
        console.log(this.divisionApi);
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  dropdown(event: any) {

    console.log(this.selectedOption);
    let selectedDivision = ''

    if (this.selectedOption == 'Head_office') {
      selectedDivision = 'HO Cashier'
    }
    else {
      selectedDivision = this.selectedOption
    }

    this.getAllReceiptsData(
      this.paginatior?.pageIndex || 0,
      this.paginatior?.pageSize || 10,
      selectedDivision,
      undefined,
      this.fromDateValue,
      this.toDateValue
    );

    this.selectedValue = event.target.value
    console.log("selecteddddddd", this.selectedValue)
  }
  exportToPdf(): void {
    const doc = new jsPDF();

    const logoPath = '../../../assets/assets/images/tnhb_logo.png';

    const image = new Image();
    image.src = logoPath;

    image.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const imgWidth = 80;
      const imgHeight = 20;
      const imgX = (pageWidth - imgWidth) / 2;
      doc.addImage(image, 'PNG', imgX, 10, imgWidth, imgHeight);

      doc.setFontSize(14);
      doc.text('Receipts Table', pageWidth / 2, 60, { align: 'center' });

      // Table data
      const tableData = this.filterByDivision.map((receipt, index) => [
        index + 1,
        receipt.division,
        receipt.receiptNo,
        receipt.receiptDate,
        receipt.paymentType,
        receipt.amount,
      ]);

      // Table headers
      const tableHeaders = [
        [
          { content: 'S.No.', styles: { fillColor: '#161F6D', textColor: '#FFFFFF' } },
          { content: 'Division', styles: { fillColor: '#161F6D', textColor: '#FFFFFF' } },
          { content: 'Receipt No', styles: { fillColor: '#161F6D', textColor: '#FFFFFF' } },
          { content: 'Receipt Date', styles: { fillColor: '#161F6D', textColor: '#FFFFFF' } },
          { content: 'Receipt For', styles: { fillColor: '#161F6D', textColor: '#FFFFFF' } },
          { content: 'Amount', styles: { fillColor: '#161F6D', textColor: '#FFFFFF' } },
        ],
      ];

      // Add table
      (doc as any).autoTable({
        head: tableHeaders,
        body: tableData,
        startY: 70, // Start below the title
        headStyles: {
          fillColor: '#161F6D',
          textColor: '#FFFFFF',
          fontSize: 12,
        },
        bodyStyles: { fontSize: 10 },
        alternateRowStyles: { fillColor: '#F5F5F5' },
      });

      // Save the PDF
      doc.save('Receipts.pdf');
    };

    image.onerror = () => {
      console.error('Error loading logo image.');
    };
  }

  exportToExcel(): void {
    // Define the table data
    const data: any[] = this.filterByDivision.map((receipt, index) => ({
      'S.No.': index + 1,
      Division: receipt.division,
      'Receipt No': receipt.receiptNo,
      'Receipt Date': new Date(receipt.receiptDate).toLocaleDateString('en-GB'),
      'Receipt For': receipt.paymentType,
      Amount: receipt.amount,
    }));

    // Create a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook and add the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Receipts');

    // Save the Excel file
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Receipts.xlsx');
  }


}
