import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() dataSource;
  @Input() displayedColumns;

  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() refresh = new EventEmitter();
}
