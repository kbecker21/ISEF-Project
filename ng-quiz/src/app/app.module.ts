import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FaqComponent } from './faq/faq.component';
import { RankingComponent } from "./ranking/ranking.component";
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AccountLevelPipe } from './shared/pipe/account-level.pipe';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';


import { QuestionsComponent } from './questions/questions.component';
import { QuestionDialogComponent } from './questions/question-dialog/question-dialog.component';
import { AutofocusDirective } from './autofocus.directive';
import { AddQuestionDialogComponent } from './questions/add-question-dialog/add-question-dialog.component';
import { AddAnswerDialogComponent } from './questions/add-answer-dialog/add-answer-dialog.component';
import { EditAnswerDialogComponent } from './questions/edit-answer-dialog/edit-answer-dialog.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

import { LoadingScreenInterceptor } from './shared/helpers/loading.interceptors';
import { CourseDialogComponent } from './questions/course-dialog/course-dialog.component';
import { CategoryDialogComponent } from './questions/category-dialog/category-dialog.component';
import { DialogComponent } from './game/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ErrorPageComponent,
    FaqComponent,
    RankingComponent,
    AccountComponent,
    AuthComponent,
    AdminComponent,
    UserEditComponent,
    AccountLevelPipe,
    LobbyComponent,
    GameComponent,
    CategoryDialogComponent,
    QuestionsComponent,
    QuestionDialogComponent,
    AutofocusDirective,
    AddQuestionDialogComponent,
    AddAnswerDialogComponent,
    EditAnswerDialogComponent,
    LoadingScreenComponent,
    CourseDialogComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    MatListModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSidenavModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
