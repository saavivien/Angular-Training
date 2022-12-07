import { Component, OnInit } from '@angular/core';
import { FaceSnapsService } from '../../services/face-snaps.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { FaceSnap } from '../../models/face-snap.model';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;

  constructor(private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.buttonText = 'Oh Snap!';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onSnap() {
    this.faceSnap$.pipe(
      take(1),
      map(faceSnap => {
        if (this.buttonText === 'Oh Snap!') {
          faceSnap = { ...faceSnap, snaps: ++faceSnap.snaps };
          this.buttonText = 'Oops, unSnap!';
          return faceSnap
        } else {
          faceSnap = { ...faceSnap, snaps: --faceSnap.snaps };
          this.buttonText = 'Oh Snap!';
          return faceSnap;
        }
      }),
      switchMap(
        faceSnap => this.faceSnapsService.updadeFaceSnap(faceSnap)
      ),
      tap(faceSnap => this.faceSnap$ = of(faceSnap))
    ).subscribe();
  }
}
