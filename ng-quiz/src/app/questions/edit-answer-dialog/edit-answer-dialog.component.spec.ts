import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnswerDialogComponent } from './edit-answer-dialog.component';

describe('EditAnswerDialogComponent', () => {
  let component: EditAnswerDialogComponent;
  let fixture: ComponentFixture<EditAnswerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnswerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
