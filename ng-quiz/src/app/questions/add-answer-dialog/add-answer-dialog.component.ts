import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Answer } from 'src/app/shared/model/answer.model';

@Component({
  selector: 'app-add-answer-dialog',
  templateUrl: './add-answer-dialog.component.html',
  styleUrls: ['./add-answer-dialog.component.css']
})
export class AddAnswerDialogComponent implements OnInit {

  form: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Answer) {       
    }

    ngOnInit(): void {  
      this.form = this.fb.group({
        Description: [this.data.Description, []],  
        idAnswers: [this.data.idAnswers, []],   
        Question_idQuestion: [this.data.Question_idQuestion, []],   
        Truth: [this.data.Truth, []],   
    }); 
    }

    save() {
      this.dialogRef.close(this.form.value);
  }
  
  close() {
      this.dialogRef.close();
  }

}
