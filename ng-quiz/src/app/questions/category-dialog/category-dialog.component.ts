import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/shared/model/category.model';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css'],
})
/**
 * Klasse zum editieren und Hinzufügen von Kategorien
 *
 * @Vorgang: BI-015
 *
 * {@link QuestionsComponent}
 */
export class CategoryDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      Name: [this.data.Name, []],
      id: [this.data.id, []],
      Subject_idSubject: [this.data.Subject_idSubject, []],
    });
  }

  /**
   * Speichert das Formular und schliesst den Dialog
   * @Vorgang BI-015
   * @returns null
   */
  save() {
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
