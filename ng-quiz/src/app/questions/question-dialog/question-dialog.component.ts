import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../shared/model/question.model';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {
  @Input() data: Question;
  @Output() focusOut: EventEmitter<Question> = new EventEmitter<Question>();

  editMode = false;
  constructor() { }

  ngOnInit(): void {
  
  }

  onFocusOut() {
    console.log(this.data);
    this.focusOut.emit(this.data);
  }

}
