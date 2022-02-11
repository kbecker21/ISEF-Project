import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
 * Diese Komponente implementiert die Startseite.
 * @Vorgang BI-001
 */
export class HomeComponent {
  name = 'Angular 6';
  safeSrc: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/HtmKZdyrV4E");
  }

}
