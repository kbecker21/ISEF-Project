import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/shared/model/course.model';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  form: FormGroup;
  selectedCourse;
  originalName;
  

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course) {       
    }

    ngOnInit(): void {  
      this.form = this.fb.group({
        Name: [this.data.Name, []],  
        id: [this.data.id, []],   
        ShortName: [this.data.ShortName, []],   
        isActive: [this.data.isActive, []],   
    }); 
    }

    save() {
      console.log(this.form.value);
      this.dialogRef.close(this.form.value);
  }
  
  close() {
      this.dialogRef.close();
  }

}
