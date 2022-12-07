import { Xliff2 } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, interval, observable, Observable, Subject, Subscription } from 'rxjs';
import { concatMap, filter, map, mergeMap, take, takeUntil } from 'rxjs/operators';
import { FaceSnap } from '../../models/face-snap.model';
import { FaceSnapsService } from '../../services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  faceSnaps$!: Observable<FaceSnap[]>;

  interval1$!: Observable<number>;
  interval2$!: Observable<number>;
  interval3$!: Observable<number>;

  private subject$!: Subject<number>;
  private subscription!: Subscription;

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {

    this.subject$ = new Subject<number>();
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();

    interval(1500)
      .pipe(
        take(5),
        concatMap(v => this.paire(v))
      ).subscribe(v => console.log(v));


    // combineLatest([this.interval1$, this.interval2$, this.interval3$]).pipe(
    //   takeUntil(this.subject$),
    //   map(([x1, x2, x3]) => ({ x: x1, y: x2, z: x3 }))
    // ).subscribe(v => console.log(v))

    // this.subscription = this.interval$.subscribe(v=> console.log(v))

    // setTimeout(()=> {this.interval$.subscribe(v=> console.log(v))}, 10000)

  }

  paire(n1: number): Observable<string> {
    return interval(1000).pipe(
      take(5),
      filter(x => x % 2 === 0),
      map(v => ` l'observable externe est à ${n1} et l'observable interne est à ${v}`)
    )
  }
  ngOnDestroy(): void {
    this.subject$.next(1);
    // this.subscription.unsubscribe();
  }

}
