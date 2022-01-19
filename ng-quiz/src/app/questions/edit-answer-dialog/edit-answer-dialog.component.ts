import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/shared/model/answer.model';

@Component({
  selector: 'app-edit-answer-dialog',
  templateUrl: './edit-answer-dialog.component.html',
  styleUrls: ['./edit-answer-dialog.component.css']
})
export class EditAnswerDialogComponent implements OnInit {

  @Input() data: Answer;
  @Output() focusOut: EventEmitter<Answer> = new EventEmitter<Answer>();

  editMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  onFocusOut() {
    console.log(this.data);
    this.focusOut.emit(this.data);
  }

}
