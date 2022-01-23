import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/shared/model/category.model';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  form: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category) { 
      
    }

  ngOnInit(): void {  
    this.form = this.fb.group({
      Name: [this.data.Name, []],  
      id: [this.data.id, []],   
      Subject_idSubject: [this.data.Subject_idSubject, []],      
  }); 
  }  

  save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}



}
