import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Question } from '../../shared/model/question.model';


@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent implements OnInit {

  form: FormGroup;
  QuestionDescription: string;
  idQuestion: number;
  category_idcategory: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question) { 
      
    }

    ngOnInit(): void {  
      this.form = this.fb.group({
        QuestionDescription: [this.data.QuestionDescription, []],  
        idQuestion: [this.data.idQuestion, []],   
        category_idcategory: [this.data.category_idcategory, []],      
    }); 
    }
  
    save() {
      this.dialogRef.close(this.form.value);
  }
  
  close() {
      this.dialogRef.close();
  }

}
