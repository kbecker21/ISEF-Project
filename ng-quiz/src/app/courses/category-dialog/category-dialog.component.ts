import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export interface CategoryDialogData {
  Name: string;
  id: number;
  idSubject: number;
}

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  form: FormGroup;
  name: string;
  id: number;
  SubjectId: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryDialogData) { 
      
    }

  ngOnInit(): void {  
    this.form = this.fb.group({
      Name: [this.data.Name, []],  
      id: [this.data.id, []],   
      Subject_idSubject: [this.data.idSubject, []],      
  }); 
  }

  save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}



}
