import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingScreenService } from '../shared/services/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css'],
})

export class LoadingScreenComponent implements AfterViewInit, OnDestroy {
  debounceTime = 200;
  loading = false;
  loadingSubscription: Subscription;

  constructor(
    private loadingScreenService: LoadingScreenService,
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('hallo')
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.loading = value;
    });
  }

  ngAfterViewInit(): void {

    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loadingScreenService.loadingStatus
      .pipe(debounceTime(this.debounceTime))
      .subscribe((status: boolean) => {
        this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
        this._changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}