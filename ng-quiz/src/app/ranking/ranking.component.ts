import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user.model';
import { AuthService } from '../shared/services/auth.service';
import { RankingService } from '../shared/services/ranking.service';


interface Ranking {
  FirstName: string,
  LastName: string,
  TotalPoints: number,
  TotalWins: number,
  User_idUser: number
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})


/**
 * Diese Komponente implementiert die Rangliste.
 */
export class RankingComponent implements OnInit {

  displayedColumns: string[] = ['FirstName', 'LastName', 'TotalPoints', 'TotalWins'];

  loggedInUser: User = null;
  userSub: Subscription = null;

  allSearchUsers: Subscription = null;
  dataSource: Ranking[] = [];

  constructor(private auth: AuthService, private rankingService: RankingService) { }

  /**
   * Initialisiert die Rangliste
   */
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });

    this.initTable();
  }

  /**
   * Initialisiert die Tabelle
   */
  initTable() {
    this.allSearchUsers = this.rankingService.getRanking(this.loggedInUser).subscribe(response => {

      response = response.sort((a, b) => a.FirstName < b.FirstName);
      response = response.sort((a, b) => a.LastName < b.LastName);
      response = response.sort((a, b) => a.TotalPoints < b.TotalPoints);
      this.dataSource = response.sort((a, b) => a.TotalWins < b.TotalWins);
    },
      errorMessage => {
        console.log(errorMessage);
      });
  }


}
