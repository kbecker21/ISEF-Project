import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Course } from '../shared/model/course.model';
import { Category } from '../shared/model/category.model';
import { User } from '../shared/model/user.model';
import { CourseService } from '../shared/services/course.service';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  selectedCourse = null;
  selectedCategory = null;

  dataSource: Course[] = [];
  categoriesofCourse: Category[] = [];
  displayedColumns: string[] = ['Name', 'ShortName', 'actions'];
  categorieColumns: string[] = ['Name', 'CreateDate', 'actions'];

  loggedInUser: User = null;
  userSub: Subscription = null;
  allCourses: Subscription = null;
  allCategories: Subscription = null;
  
  constructor(private auth: AuthService, private courseService: CourseService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });    
    this.resetSelectedCourse();
    this.loadCourses();
  }

  resetSelectedCourse() {
    const emptyCourse = {
      id: null,
      Name: '',
      Creator: '',
      ShortName: '',
      Active: false    
    }
    this.selectedCourse = emptyCourse;
  }


  selectCourse(course) {
    this.selectedCourse = course;

    this.loadCategories(course.id);  
  }

  selectCategorie(categorie) {
    this.selectedCategory = categorie;
 
  }

  loadCourses() {
    this.allCourses = this.courseService.all(this.loggedInUser).subscribe(response => {
      this.dataSource = response;      
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  loadCategories(courseID) {
    this.allCategories = this.categoryService.find(this.loggedInUser, courseID).subscribe(response => {
      this.categoriesofCourse = response;      
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }

  deleteCourse2(courseId) {
    this.courseService.delete(this.loggedInUser, courseId).subscribe(result => this.refreshCourses())
  }


  deleteCourse(id: number) {
    if (confirm('Möchtest du sicher den Kurs löschen?')) {
      this.courseService.delete(this.loggedInUser, id).subscribe(response => {
        this.refreshCourses();
      },
        errorMessage => {
          console.log(errorMessage);
        });
    }

  }

  saveCourse(course) {
    if(course.id) {
      this.courseService.update(this.loggedInUser, course)
        .subscribe(result => this.refreshCourses())
      
    } else  {
      this.courseService.create(this.loggedInUser, course)
        .subscribe(result => this.refreshCourses())     
        
    }
  }


  saveCategory(category) {
    if(category.id) {
      this.categoryService.update(this.loggedInUser, category)
        .subscribe(result => this.refreshCategories(category.idSubject))
      
    } else  {
      this.categoryService.create(this.loggedInUser, category)
        .subscribe(result => this.refreshCategories(category.idSubject))
      
        
    }
  }

  deleteCategory(category) {
    if (confirm('Möchtest du sicher die Kategorie löschen?')) {
      this.categoryService.delete(this.loggedInUser, category.id).subscribe(response => {
        this.refreshCategories(category.idSubject);
      },
        errorMessage => {
          console.log(errorMessage);
        });
    }

  }

  refreshCourses() {    
    this.resetSelectedCourse();
    this.loadCourses();
  }

  refreshCategories(courseID) {    
    this.loadCategories(courseID);
  }

  cancel() {
    this.resetSelectedCourse();
  }

}
