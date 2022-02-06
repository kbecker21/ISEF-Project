import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/shared/model/course.model';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
})

/**
 * Klasse zum editieren und Hinzufügen von Kursen/Modulen
 *
 * @Vorgang: BI-015
 *
 * {@link QuestionsComponent}
 */
export class CourseDialogComponent implements OnInit {
  form: FormGroup;
  selectedCourse;
  originalName;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Name: [this.data.Name, []],
      id: [this.data.id, []],
      ShortName: [this.data.ShortName, []],
      isActive: [this.data.isActive, []],
    });
  }

  /**
   * Speichert das Formular und schliesst den Dialog
   * @Vorgang BI-015
   * @returns null
   */
  save() {
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

  /**
   * Schliesst den Dialog ohne Änderungen
   * @Vorgang BI-015
   * @returns null
   */
  close() {
    this.dialogRef.close();
  }
}
