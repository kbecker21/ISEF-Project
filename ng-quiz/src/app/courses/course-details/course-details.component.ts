import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {

  selectedCourse;
  originalName;
 
 
  @Output() saved = new EventEmitter;
  @Output() canceled = new EventEmitter;
  @Output() selectCategory = new EventEmitter;
  @Output() deleteCategory = new EventEmitter;

  @Input() set course(value) {
    if(value) {
      this.selectedCourse = Object.assign({}, value)
      this.originalName = value.Name;     
    }
  }

  @Input() categories;

  

}
