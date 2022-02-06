import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/user.model';
import { QuestionList } from '../shared/model/questionlist.model';
import { QuestionsService } from '../shared/services/questions.service';
import { AnswerService } from '../shared/services/answer.service';
import { Question } from '../shared/model/question.model';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { AddAnswerDialogComponent } from './add-answer-dialog/add-answer-dialog.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { Category } from '../shared/model/category.model';
import { CategoryService } from '../shared/services/category.service';
import { filter } from 'rxjs/operators';
import { Answer } from '../shared/model/answer.model';
import { Course } from '../shared/model/course.model';
import { CourseService } from '../shared/services/course.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
/**
 * Komponente zur Verwaltung der Module, Kategorien,  Fragen und Antworten
 *
 * @Vorgang: BI-015, BI-016, BI-017, BI-018
 */
export class QuestionsComponent implements OnInit {
  userSub: Subscription = null;
  allQuestions: Subscription = null;
  allFlaggedQuestions: Subscription = null;
  loggedInUser: User = null;
  dataSource: QuestionList[] = [];
  flaggedQuestions: QuestionList[] = [];
  allCourses: Subscription = null;
  courseList: Course[] = [];

  onlyFlagged = false;
  countFlagged: number = 0;

  displayedCourseColumns: string[] = ['Name', 'ShortName'];

  courseID: number;
  editMode = false;
  panel = 0;

  courseName: string;
  courseShort: string;

  nav_position: string = 'start';

  private routeSub: Subscription;

  constructor(
    private auth: AuthService,
    private questionsService: QuestionsService,
    private answerService: AnswerService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe((user) => {
      this.loggedInUser = user;
    });

    this.loadCourses();
  }

  /**
   * Lädt alle Kurse
   * @param loggedInUser eingeloggter User
   * @Vorgang BI-015
   * @returns Course
   */
  loadCourses() {
    this.allCourses = this.courseService.all(this.loggedInUser).subscribe(
      (response) => {
        this.courseList = response;
        this.courseID = null;
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
  }

  /**
   * Lädt alle Kategorien sowie die zugehörigen Fragen & Antworten zu einem Modul
   * @param Name Name des Modules
   * @param ShortName Kurzname des Modules
   * @param courseID ID des Modules
   * @Vorgang BI-015
   * @returns QuestionList
   */
  getbyCourse(Name: string, shortName: string, courseId: number) {
    if (this.onlyFlagged) {
      this.getbyCourseFlagged(courseId);
    } else {
      this.allQuestions = this.questionsService
        .getByCourse(this.loggedInUser, courseId)
        .subscribe((data) => {
          if (data.status === 204) {
            this.courseName = Name;
            this.courseShort = shortName;
            this.courseID = courseId;
            this.dataSource = [];
          } else {
            this.courseName = Name;
            this.courseShort = shortName;
            this.courseID = courseId;
            this.dataSource = data;
          }
          this.Countflagged(courseId);
        });
    }
  }

  /**
   * Lädt alle Kategorien sowie die zugehörigen Markierten Fragen & Antworten zu einem Modul
   * @param courseID ID des Modules
   * @Vorgang BI-018
   * @returns QuestionList
   */
  getbyCourseFlagged(courseId: number) {
    this.allFlaggedQuestions = this.questionsService
      .getByCourseFlagged(this.loggedInUser, courseId)
      .subscribe((data) => {
        if (data.status === 204) {
          this.courseID = courseId;
          this.dataSource = [];
        } else {
          this.courseID = courseId;
          this.dataSource = data;
        }
        this.Countflagged(courseId);
      });
  }

  /**
   * Gibt die Anzahl der markierten Fragen zurück
   * @param courseID ID des Modules
   * @Vorgang BI-018
   * @returns Integer
   */
  Countflagged(courseId: number) {
    this.allFlaggedQuestions = this.questionsService
      .countFlagged(this.loggedInUser, courseId)
      .subscribe((data) => {
        this.countFlagged = data;
      });
  }

  /**
   * Speichert eine neue Frage
   * @param question Frage Modell
   * @Vorgang BI-016, BI-017
   * @returns null
   */
  saveQuestion(question: Question) {
    if (question.idQuestion) {
      this.questionsService
        .update(this.loggedInUser, question)
        .subscribe((data) => {
          this.getbyCourse(this.courseName, this.courseShort, this.courseID);
        });
    } else {
      this.questionsService
        .create(this.loggedInUser, question)
        .subscribe((data) => {
          this.getbyCourse(this.courseName, this.courseShort, this.courseID);
        });
    }
  }

  /**
   * Speichert eine neue Antwort
   * @param answer Antwort Modell
   * @Vorgang BI-016, BI-017
   * @returns null
   */
  saveAnswer(answer: Answer) {
    if (answer.idAnswers) {
      this.answerService.update(this.loggedInUser, answer).subscribe((data) => {
        this.getbyCourse(this.courseName, this.courseShort, this.courseID);
      });
    } else {
      this.answerService.create(this.loggedInUser, answer).subscribe((data) => {
        this.getbyCourse(this.courseName, this.courseShort, this.courseID);
      });
    }
  }

  /**
   * Speichert ein neues Modul
   * @param course Course Modell
   * @Vorgang BI-015
   * @returns null
   */
  saveCourse(course) {
    if (course.id) {
      this.courseService
        .update(this.loggedInUser, course)
        .subscribe((result) => {
          this.courseName = course.Name;
          this.courseShort = course.ShortName;
          this.getbyCourse(this.courseName, this.courseShort, this.courseID);
        });
    } else {
      this.courseService
        .create(this.loggedInUser, course)
        .subscribe((result) => this.refreshCourses());
    }
  }

  /**
   *  Löscht ein Modul
   * @param id Id des Modules
   * @Vorgang BI-015
   * @returns null
   */
  deleteCourse(id: number) {
    if (confirm('Möchtest du sicher den Kurs löschen?')) {
      this.courseService.delete(this.loggedInUser, id).subscribe(
        (response) => {
          this.refreshCourses();
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
    }
  }

  /**
   *  Löscht eine Frage
   * @param question Question Modell
   * @Vorgang BI-016, BI-017
   * @returns null
   */
  deleteQuestion(question: Question) {
    if (confirm('Möchtest du die Frage wirklich löschen?')) {
      this.questionsService
        .delete(this.loggedInUser, question.idQuestion)
        .subscribe(
          (data) => {
            console.log(data);
            this.getbyCourse(this.courseName, this.courseShort, this.courseID);
          },
          (errorMessage) => {
            console.log(errorMessage);
          }
        );
    }
  }

  /**
   *  Löscht eine Antwort
   * @param answer Answer Modell
   * @Vorgang BI-016, BI-017
   * @returns null
   */
  deleteAnswer(answer: Answer) {
    if (confirm('Möchtest du die Antwort wirklich löschen?')) {
      this.answerService.delete(this.loggedInUser, answer.idAnswers).subscribe(
        (data) => {
          console.log(data);
          this.getbyCourse(this.courseName, this.courseShort, this.courseID);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
    }
  }

  /**
   *  Speichert eine neue Katgorie
   * @param category Category Modell
   * @Vorgang BI-015
   * @returns null
   */
  saveCategory(category) {
    if (category.id) {
      this.categoryService
        .update(this.loggedInUser, category)
        .subscribe((result) =>
          this.getbyCourse(this.courseName, this.courseShort, this.courseID)
        );
    } else {
      this.categoryService
        .create(this.loggedInUser, category)
        .subscribe((result) =>
          this.getbyCourse(this.courseName, this.courseShort, this.courseID)
        );
    }
  }

  /**
   *  Löscht eine Katgorie
   * @param categoryID Id der Katgorie
   * @Vorgang BI-015
   * @returns null
   */
  deleteCategory(categoryID: number) {
    if (confirm('Möchtest du sicher die Kategorie löschen?')) {
      this.categoryService.delete(this.loggedInUser, categoryID).subscribe(
        (response) => {
          this.getbyCourse(this.courseName, this.courseShort, this.courseID);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
    }
  }

  /**
   * Setzt den Flagged Slider auf true oder false und triggert die Methode zum Anzeigen der geflaggten Fragen
   * @Vorgang BI-018
   * @returns null
   */
  toggleOnlyFlagged() {
    this.onlyFlagged = !this.onlyFlagged;
    if (this.onlyFlagged) {
      this.getbyCourseFlagged(this.courseID);
    } else {
      this.getbyCourse(this.courseName, this.courseShort, this.courseID);
    }
  }

  /**
   * aktiviert oder deaktiviert eine Frage
   * @param question Question Modell
   * @Vorgang BI-016
   * @returns null
   */
  toggleActivate(question: Question) {
    if (question.Approved == 1) {
      question.Approved = 0;
    } else {
      question.Approved = 1;
    }

    this.questionsService
      .update(this.loggedInUser, question)
      .subscribe((data) => {
        console.log(question);
        this.getbyCourse(this.courseName, this.courseShort, this.courseID);
      });
  }

  /**
   * Entfernt das Flagged Tag einer Frage
   * @param question Question Modell
   * @Vorgang BI-018
   * @returns null
   */
  toggleFlagged(question: Question) {
    if (confirm('Möchtest du die Meldung der Frage auflösen?')) {
      if (question.Flagged == 1) {
        question.Flagged = 0;
      } else {
        question.Flagged = 1;
      }

      this.questionsService
        .update(this.loggedInUser, question)
        .subscribe((data) => {
          console.log(question);
          this.getbyCourse(this.courseName, this.courseShort, this.courseID);
        });
    }
  }

  /**
   * Setzt die Antwort auf richtig oder falsch
   * @param answer Answer Modell
   * @Vorgang BI-018
   * @returns null
   */
  toggleTruth(answer: Answer) {
    this.answerService
      .checkUniqueAnswer(
        this.loggedInUser,
        answer.Question_idQuestion,
        answer.idAnswers
      )
      .subscribe((data) => {
        if (data > 0) {
          alert('Es darf nur eine richtige Antwort geben');
          answer.Truth = 0;
          this.getbyCourse(this.courseName, this.courseShort, this.courseID);
        } else {
          if (answer.Truth == 1) {
            answer.Truth = 0;
          } else {
            answer.Truth = 1;
          }
          this.answerService
            .update(this.loggedInUser, answer)
            .subscribe((data) => {
              console.log(answer);
              this.getbyCourse(
                this.courseName,
                this.courseShort,
                this.courseID
              );
            });
        }
      });
  }

  /**
   * Fügt eine neue Frage hinzu
   * @param categoryID Id der Katgorie
   * @Vorgang BI-016, BI-017
   * @returns null
   */
  newQuestion(categoryID) {
    console.log(categoryID);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      category_idcategory: categoryID,
    };

    const dialogRef = this.dialog.open(
      AddQuestionDialogComponent,
      dialogConfig
    );

    dialogRef
      .afterClosed()
      .pipe(filter((data) => data))
      .subscribe((data) => this.saveQuestion(data));
  }

  /**
   * Fügt eine neue Antwort hinzu
   * @param questionID Id der Frage
   * @Vorgang BI-016, BI-017
   * @returns null
   */
  newAnswer(questionID) {
    console.log(questionID);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      Question_idQuestion: questionID,
    };

    const dialogRef = this.dialog.open(AddAnswerDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(filter((data) => data))
      .subscribe((data) => this.saveAnswer(data));
  }

  /**
   * Fügt einen neuen Kurs/Modul hinzu
   * @Vorgang BI-015
   * @returns null
   */
  newCourse() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(filter((data) => data))
      .subscribe((data) => this.saveCourse(data));
  }

  /**
   * Aktuallisiert einen Kurs/Modul
   * @param courseID Id des Kurses
   * @Vorgang BI-015
   * @returns null
   */
  editCourse(courseID: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      Name: this.courseName,
      id: courseID,
      ShortName: this.courseShort,
    };

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(filter((data) => data))
      .subscribe((data) => this.saveCourse(data));
  }

  /**
   * fügt eine neue Katgorie hinzu
   * @param courseID Id des Kurses
   * @Vorgang BI-015
   * @returns null
   */
  newCategory(courseID) {
    console.log(courseID);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      Subject_idSubject: courseID,
    };

    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(filter((data) => data))
      .subscribe((data) => this.saveCategory(data));
  }

  /**
   * aktualisiert eine Katgorie
   * @param categoryID Id der Katgorie
   * @name Name des Kurses
   * @Vorgang BI-015
   * @returns null
   */
  editCategory(categoryID: number, Name: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: categoryID,
      Name: Name,
      Subject_idSubject: this.courseID,
    };

    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(filter((data) => data))
      .subscribe((data) => this.saveCategory(data));
  }

  /**
   * Setzt das Anzeige Panel auf die aktuell bearbeitete Kategorie
   * @param categoryID Id der Katgorie
   * @Vorgang BI-015
   * @returns null
   */
  setPanelID(panelid: number) {
    this.panel = panelid;
  }

  /**
   * Lädt die Kurse neu
   * @Vorgang BI-015
   * @returns null
   */
  refreshCourses() {
    this.loadCourses();
  }
}
