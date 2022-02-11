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
 * @Vorgang BI-007
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
   * @Vorgang BI-007
   */
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.loggedInUser = user;
    });

    this.initTable();
  }

  /**
   * Initialisiert die Tabelle
   * @Vorgang BI-007
   */
  initTable() {
    this.allSearchUsers = this.rankingService.getRanking(this.loggedInUser).subscribe(response => {

      // Map Null auf 0
      response.forEach(element => {
        if (element.TotalWins == null) {
          element.TotalWins = 0;
        }
      });

      // Sortierung
      response = response.sort((a, b) => a.FirstName < b.FirstName);
      response = response.sort((a, b) => a.LastName < b.LastName);
      response = response.sort((a, b) => a.TotalPoints < b.TotalPoints);
      response = response.sort((a, b) => a.TotalWins < b.TotalWins);

      this.dataSource = response;

    },
      errorMessage => {
        console.log(errorMessage);
      });
  }


}
