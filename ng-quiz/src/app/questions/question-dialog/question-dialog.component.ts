import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../shared/model/question.model';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css'],
})
/**
 * Klasse zum editieren und Hinzufügen von Fragen
 *
 * @Vorgang: BI-016, BI-017
 * 
 * {@link QuestionsComponent}
 */
export class QuestionDialogComponent implements OnInit {
  @Input() data: Question;
  @Output() focusOut: EventEmitter<Question> = new EventEmitter<Question>();

  editMode = false;
  constructor() {}

  ngOnInit(): void {}

  /**
   * Sobald das Form verlassen wird, wird die Änderung an den Server gesendet
   * @Vorgang BI-015
   * @returns null
   */
  onFocusOut() {
    this.focusOut.emit(this.data);
  }
}
