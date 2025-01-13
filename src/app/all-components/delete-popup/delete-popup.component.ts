import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.css'
})
export class DeletePopupComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public deleteDialogBox : MatDialogRef<DeletePopupComponent>){
  }

  ngOnInit(): void {
    // console.log(this.data.from);
  }

  confirmDelete(){
    this.deleteDialogBox.close(true);
  }

  cancelDelete(){
    this.deleteDialogBox.close(false);
  }
}
